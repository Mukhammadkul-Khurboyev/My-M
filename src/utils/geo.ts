import * as THREE from 'three';

/**
 * Converts latitude and longitude in degrees to a 3D Cartesian position on a sphere.
 * Three.js coordinate system:
 * Y is up (North pole = +Y, South pole = -Y)
 * X/Z form the equatorial plane
 */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Converts a 3D Cartesian position on a sphere back to latitude and longitude.
 */
export function vector3ToLatLng(vector: THREE.Vector3): { lat: number; lng: number } {
  const norm = vector.clone().normalize();
  const lat = 90 - (Math.acos(norm.y) * 180) / Math.PI;
  // theta = (lng + 180) * (Math.PI / 180)
  // x = -sin(phi)*cos(theta), z = sin(phi)*sin(theta)
  const lng = ((Math.atan2(norm.z, -norm.x) * 180) / Math.PI) - 180;
  
  // Normalize lng between -180 and 180
  let normalizedLng = lng;
  while (normalizedLng < -180) normalizedLng += 360;
  while (normalizedLng > 180) normalizedLng -= 360;

  return { lat, lng: normalizedLng };
}

/**
 * Ray-casting algorithm to test if a 2D coordinate [lng, lat] is inside a polygon ring
 */
export function isPointInRing(point: [number, number], ring: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Checks if a [lng, lat] is inside a GeoJSON feature's geometry (Polygon or MultiPolygon)
 */
export function isPointInFeature(point: [number, number], feature: any): boolean {
  if (!feature || !feature.geometry) return false;
  const { type, coordinates } = feature.geometry;

  if (type === 'Polygon') {
    if (coordinates.length === 0) return false;
    // Outer ring must contain the point
    if (!isPointInRing(point, coordinates[0])) return false;
    // Inner rings (holes) must NOT contain the point
    for (let i = 1; i < coordinates.length; i++) {
      if (isPointInRing(point, coordinates[i])) return false;
    }
    return true;
  }

  if (type === 'MultiPolygon') {
    for (const poly of coordinates) {
      if (poly.length === 0) continue;
      if (isPointInRing(point, poly[0])) {
        let inHole = false;
        for (let i = 1; i < poly.length; i++) {
          if (isPointInRing(point, poly[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
    }
  }

  return false;
}

/**
 * Generates an optimized batched line geometry of all borders in the GeoJSON
 */
export function buildWorldBordersGeometry(geoJson: any, radius: number): THREE.BufferGeometry {
  const positions: number[] = [];

  function addRing(ring: [number, number][]) {
    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = latLngToVector3(ring[i][1], ring[i][0], radius);
      const p2 = latLngToVector3(ring[i + 1][1], ring[i + 1][0], radius);
      positions.push(p1.x, p1.y, p1.z);
      positions.push(p2.x, p2.y, p2.z);
    }
  }

  if (geoJson && geoJson.features) {
    for (const feature of geoJson.features) {
      if (!feature.geometry) continue;
      const { type, coordinates } = feature.geometry;
      if (type === 'Polygon') {
        for (const ring of coordinates) {
          addRing(ring);
        }
      } else if (type === 'MultiPolygon') {
        for (const poly of coordinates) {
          for (const ring of poly) {
            addRing(ring);
          }
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

/**
 * Generates line geometry for a single feature (e.g. for glowing selection border)
 */
export function buildFeatureBorderGeometry(feature: any, radius: number): THREE.BufferGeometry {
  const positions: number[] = [];

  function addRing(ring: [number, number][]) {
    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = latLngToVector3(ring[i][1], ring[i][0], radius);
      const p2 = latLngToVector3(ring[i + 1][1], ring[i + 1][0], radius);
      positions.push(p1.x, p1.y, p1.z);
      positions.push(p2.x, p2.y, p2.z);
    }
  }

  if (feature && feature.geometry) {
    const { type, coordinates } = feature.geometry;
    if (type === 'Polygon') {
      for (const ring of coordinates) {
        addRing(ring);
      }
    } else if (type === 'MultiPolygon') {
      for (const poly of coordinates) {
        for (const ring of poly) {
          addRing(ring);
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

/**
 * Calculates the centroid of a GeoJSON feature
 */
export function getFeatureCentroid(feature: any): { lat: number; lng: number } {
  if (!feature || !feature.geometry) return { lat: 0, lng: 0 };
  const { type, coordinates } = feature.geometry;
  let totalLng = 0, totalLat = 0, count = 0;

  function countRing(ring: [number, number][]) {
    for (const [lng, lat] of ring) {
      totalLng += lng;
      totalLat += lat;
      count++;
    }
  }

  if (type === 'Polygon') {
    coordinates.forEach(countRing);
  } else if (type === 'MultiPolygon') {
    coordinates.forEach((p: any) => p.forEach(countRing));
  }

  if (count === 0) return { lat: 0, lng: 0 };
  return {
    lat: totalLat / count,
    lng: totalLng / count,
  };
}
