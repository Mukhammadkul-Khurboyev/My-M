/**
 * Professional Cartographic Overlay Renderer for 3D Earth Globe
 * Provides razor-sharp, elegant, high-contrast borders and refined territory highlights
 * adhering to high-end Apple Maps / Google Earth satellite standards (No cartoon/garish colors).
 */

export interface RenderOverlayOptions {
  highContrast: boolean;
  showBorders: boolean;
  hoveredId: string | null;
  selectedId: string | null;
  activeContinent?: string;
  countryContinentMap?: Record<string, string>;
}

/**
 * Traces a GeoJSON feature (Polygon or MultiPolygon) onto 2D Canvas
 */
export function traceFeaturePath(
  ctx: CanvasRenderingContext2D,
  feature: any,
  width: number,
  height: number
): void {
  if (!feature || !feature.geometry) return;
  const { type, coordinates } = feature.geometry;

  const traceRing = (ring: [number, number][]) => {
    if (ring.length < 2) return;
    const startX = ((ring[0][0] + 180) / 360) * width;
    const startY = ((90 - ring[0][1]) / 180) * height;
    ctx.moveTo(startX, startY);

    for (let i = 1; i < ring.length; i++) {
      const px = ((ring[i][0] + 180) / 360) * width;
      const py = ((90 - ring[i][1]) / 180) * height;
      ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  if (type === 'Polygon') {
    for (const ring of coordinates) {
      traceRing(ring);
    }
  } else if (type === 'MultiPolygon') {
    for (const poly of coordinates) {
      for (const ring of poly) {
        traceRing(ring);
      }
    }
  }
}

/**
 * Renders the clean, elegant world country borders and subtle territory highlights
 */
export function renderWorldMapOverlay(
  canvas: HTMLCanvasElement,
  geoJson: any,
  options: RenderOverlayOptions
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || !geoJson || !geoJson.features) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear entire canvas
  ctx.clearRect(0, 0, width, height);

  const {
    highContrast,
    showBorders,
    hoveredId,
    selectedId,
    activeContinent,
    countryContinentMap = {},
  } = options;

  // 1. Subtle, elegant continent ambient tint when filtered
  if (activeContinent && activeContinent !== 'ALL') {
    for (const feature of geoJson.features) {
      const id = feature.properties?.id || '';
      if (countryContinentMap[id] === activeContinent) {
        ctx.beginPath();
        traceFeaturePath(ctx, feature, width, height);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)'; // Very subtle, elegant cyan sheen
        ctx.fill();
      }
    }
  }

  // 2. Hovered Country: Delicate Amber/Gold Ambient Sheen + Outline
  if (hoveredId && hoveredId !== selectedId) {
    const hoveredFeature = geoJson.features.find(
      (f: any) => f.properties?.id === hoveredId || f.properties?.iso2 === hoveredId
    );

    if (hoveredFeature) {
      ctx.beginPath();
      traceFeaturePath(ctx, hoveredFeature, width, height);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.15)'; // Refined, translucent gold sheen
      ctx.fill();

      // Sharp golden boundary
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.95)';
      ctx.lineWidth = 2.6;
      ctx.stroke();
    }
  }

  // 3. Selected Country: Refined Emerald/Teal Sheen + Neon Boundary
  if (selectedId) {
    const selectedFeature = geoJson.features.find(
      (f: any) => f.properties?.id === selectedId || f.properties?.iso2 === selectedId
    );

    if (selectedFeature) {
      ctx.beginPath();
      traceFeaturePath(ctx, selectedFeature, width, height);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.20)'; // Refined emerald sheen
      ctx.fill();

      // Outer soft glow boundary
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.5)';
      ctx.lineWidth = 4.2;
      ctx.stroke();

      // Sharp emerald boundary
      ctx.strokeStyle = 'rgba(52, 211, 153, 1.0)';
      ctx.lineWidth = 2.4;
      ctx.stroke();
    }
  }

  // 4. Clean, Elegant National Borders (Crisp Antialiased Dual-Stroke)
  if (showBorders) {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Pass 1: Fine dark backing stroke for crisp separation on light terrain
    ctx.beginPath();
    for (const feature of geoJson.features) {
      traceFeaturePath(ctx, feature, width, height);
    }
    ctx.strokeStyle = 'rgba(2, 6, 23, 0.65)';
    ctx.lineWidth = highContrast ? 2.8 : 2.0;
    ctx.stroke();

    // Pass 2: Clean, refined silvery-white/sky vector line (Google Earth aesthetic)
    ctx.beginPath();
    for (const feature of geoJson.features) {
      traceFeaturePath(ctx, feature, width, height);
    }
    ctx.strokeStyle = highContrast ? 'rgba(241, 245, 249, 0.92)' : 'rgba(203, 213, 225, 0.72)';
    ctx.lineWidth = highContrast ? 1.4 : 1.0;
    ctx.stroke();
  }
}
