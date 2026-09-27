import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  latLngToVector3, 
  vector3ToLatLng, 
  buildWorldBordersGeometry, 
  buildFeatureBorderGeometry 
} from '../utils/geo';
import { 
  loadGeoJsonAndCountries, 
  findCountryAtLatLng, 
  WorldCountryIndexItem 
} from '../data/countriesRegistry';
import { getCountryFlagTexture } from '../utils/flagTexture';

interface Globe3DProps {
  selectedCountry: WorldCountryIndexItem | null;
  onSelectCountry: (country: WorldCountryIndexItem) => void;
  onOpenCountryPortal?: (country: WorldCountryIndexItem) => void;
  autoRotate: boolean;
  showClouds: boolean;
  showBorders: boolean;
  highContrastBorders?: boolean;
  showLabels?: boolean;
  dayNightMode: 'cinematic' | 'daylight';
  activeContinent?: string;
  starBackgroundUrl?: string;
  zoomAction?: 'in' | 'out' | null;
  onZoomActionHandled?: () => void;
  resetViewTrigger?: number;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  selectedCountry,
  onSelectCountry,
  onOpenCountryPortal,
  autoRotate,
  showClouds,
  showBorders,
  highContrastBorders = false,
  showLabels = true,
  dayNightMode,
  activeContinent = 'ALL',
  starBackgroundUrl,
  zoomAction,
  onZoomActionHandled,
  resetViewTrigger,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<WorldCountryIndexItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allCountriesList, setAllCountriesList] = useState<WorldCountryIndexItem[]>([]);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const worldBordersRef = useRef<THREE.LineSegments | null>(null);
  const selectedBorderRef = useRef<THREE.LineSegments | null>(null);
  const hoveredBorderRef = useRef<THREE.LineSegments | null>(null);
  const flagPoleGroupRef = useRef<THREE.Group | null>(null);
  const flagClothMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geoJsonDataRef = useRef<any>(null);

  // Robust Orientation & Rotation System (Decoupled Pitch & Yaw)
  // Guarantees North Pole is ALWAYS pointing Up and globe NEVER inverts or flips upside-down
  const pitchRef = useRef<number>(0.35); // Latitude tilt (-1.42 to +1.42 rad)
  const yawRef = useRef<number>(-2.75);  // Longitude spin (radians)
  const targetPitchRef = useRef<number>(0.35);
  const targetYawRef = useRef<number>(-2.75);
  const isAnimatingToTargetRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const pointerStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const previousPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const showLabelsRef = useRef(showLabels);
  showLabelsRef.current = showLabels;

  // Handle Zoom In / Zoom Out
  useEffect(() => {
    if (!cameraRef.current || !zoomAction) return;
    if (zoomAction === 'in') {
      cameraRef.current.position.z = Math.max(3.2, cameraRef.current.position.z - 0.7);
    } else if (zoomAction === 'out') {
      cameraRef.current.position.z = Math.min(8.5, cameraRef.current.position.z + 0.7);
    }
    if (onZoomActionHandled) onZoomActionHandled();
  }, [zoomAction, onZoomActionHandled]);

  // Handle fly-to selected country
  const flyToCountry = useCallback((country: WorldCountryIndexItem) => {
    // Formula verified: brings (lat, lng) directly in front of camera (0, 0, 1) with North UP
    const targetPitch = country.lat * (Math.PI / 180);
    const targetYawUnwrapped = -(country.lng + 90) * (Math.PI / 180);

    targetPitchRef.current = Math.max(-1.4, Math.min(1.4, targetPitch));

    // Choose shortest angular path for yaw to avoid unnecessary full spins
    let diff = targetYawUnwrapped - yawRef.current;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    targetYawRef.current = yawRef.current + diff;

    isAnimatingToTargetRef.current = true;
    rotationVelocityRef.current = { x: 0, y: 0 };
  }, []);

  // Handle reset view
  useEffect(() => {
    if (!globeGroupRef.current || !cameraRef.current || resetViewTrigger === undefined || resetViewTrigger === 0) return;
    cameraRef.current.position.set(0, 0, 5.8);
    rotationVelocityRef.current = { x: 0, y: 0 };

    // Point towards Central Asia / Uzbekistan
    targetPitchRef.current = 41.3 * (Math.PI / 180);
    let diff = (-(69.2 + 90) * (Math.PI / 180)) - yawRef.current;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    targetYawRef.current = yawRef.current + diff;
    isAnimatingToTargetRef.current = true;
  }, [resetViewTrigger]);

  // Handle high contrast borders
  useEffect(() => {
    if (worldBordersRef.current) {
      const mat = worldBordersRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.color.setHex(highContrastBorders ? 0x67e8f9 : 0x38bdf8);
        mat.opacity = highContrastBorders ? 0.95 : 0.65;
      }
    }
  }, [highContrastBorders]);

  // Update selected country visual border, beacon, and 3D waving flag
  useEffect(() => {
    if (!selectedCountry) {
      if (selectedBorderRef.current) selectedBorderRef.current.visible = false;
      if (flagPoleGroupRef.current) flagPoleGroupRef.current.visible = false;
      return;
    }

    flyToCountry(selectedCountry);

    // Update 3D Waving Flag Position and Texture
    if (flagPoleGroupRef.current && globeGroupRef.current) {
      flagPoleGroupRef.current.visible = true;

      const surfacePos = latLngToVector3(selectedCountry.lat, selectedCountry.lng, 2.406);
      flagPoleGroupRef.current.position.copy(surfacePos);

      const normal = surfacePos.clone().normalize();
      flagPoleGroupRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      const flagTexture = getCountryFlagTexture(selectedCountry.id, selectedCountry.flagEmoji);
      if (flagClothMaterialRef.current) {
        flagClothMaterialRef.current.uniforms.uFlagTexture.value = flagTexture;
      }
    }

    // Highlight country border with 3D LineSegments as clean neon glow
    if (geoJsonDataRef.current && globeGroupRef.current) {
      const feature = geoJsonDataRef.current.features?.find(
        (f: any) => f.properties?.id === selectedCountry.id || f.properties?.iso2 === selectedCountry.iso2
      );

      if (feature) {
        if (selectedBorderRef.current) {
          globeGroupRef.current.remove(selectedBorderRef.current);
          selectedBorderRef.current.geometry.dispose();
        }

        const borderGeo = buildFeatureBorderGeometry(feature, 2.41);
        const borderMat = new THREE.LineBasicMaterial({
          color: 0x10b981, // Emerald neon
          linewidth: 2,
          transparent: true,
          opacity: 0.98,
        });

        const line = new THREE.LineSegments(borderGeo, borderMat);
        selectedBorderRef.current = line;
        globeGroupRef.current.add(line);
      }
    }
  }, [selectedCountry, flyToCountry]);

  // Dynamic Hover Country Border Highlight on the 3D Globe
  useEffect(() => {
    if (!globeGroupRef.current || !geoJsonDataRef.current) return;

    if (!hoveredCountry || (selectedCountry && hoveredCountry.id === selectedCountry.id)) {
      if (hoveredBorderRef.current) {
        globeGroupRef.current.remove(hoveredBorderRef.current);
        hoveredBorderRef.current.geometry.dispose();
        hoveredBorderRef.current = null;
      }
      return;
    }

    const feature = geoJsonDataRef.current.features?.find(
      (f: any) => f.properties?.id === hoveredCountry.id || f.properties?.iso2 === hoveredCountry.iso2
    );

    if (feature) {
      if (hoveredBorderRef.current) {
        globeGroupRef.current.remove(hoveredBorderRef.current);
        hoveredBorderRef.current.geometry.dispose();
      }

      const borderGeo = buildFeatureBorderGeometry(feature, 2.408);
      const borderMat = new THREE.LineBasicMaterial({
        color: 0xfbbf24, // Bright Amber/Gold outline
        linewidth: 2,
        transparent: true,
        opacity: 0.95,
      });

      const line = new THREE.LineSegments(borderGeo, borderMat);
      hoveredBorderRef.current = line;
      globeGroupRef.current.add(line);
    }
  }, [hoveredCountry, selectedCountry]);

  // Update cloud visibility
  useEffect(() => {
    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.visible = showClouds;
    }
  }, [showClouds]);

  // Update borders visibility
  useEffect(() => {
    if (worldBordersRef.current) {
      worldBordersRef.current.visible = showBorders;
    }
  }, [showBorders]);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.8);
    cameraRef.current = camera;

    // 3. Renderer with high color fidelity
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Apply initial clean orientation
    const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yawRef.current);
    const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitchRef.current);
    globeGroup.quaternion.copy(qX.multiply(qY));

    // 5. Classic, Simple & Beautiful Photorealistic NASA Earth Textures
    const textureLoader = new THREE.TextureLoader();
    const earthDayTexture = textureLoader.load('/textures/earth/earth_day_2048.jpg');
    earthDayTexture.colorSpace = THREE.SRGBColorSpace;

    const earthSpecularTexture = textureLoader.load('/textures/earth/earth_specular_2048.jpg');
    const earthNormalTexture = textureLoader.load('/textures/earth/earth_normal_2048.jpg');

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthDayTexture,
      roughness: 0.65,
      metalness: 0.08,
      roughnessMap: earthSpecularTexture,
      normalMap: earthNormalTexture,
      normalScale: new THREE.Vector2(0.28, 0.28),
    });

    const sphereGeo = new THREE.SphereGeometry(2.4, 64, 64);
    const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
    earthMesh.name = "EarthSurface";
    globeGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // 6. Natural Floating Clouds Mesh
    const cloudsTexture = textureLoader.load('/textures/earth/earth_clouds_1024.png');
    cloudsTexture.wrapS = THREE.RepeatWrapping;

    const cloudsMat = new THREE.MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.418, 64, 64),
      cloudsMat
    );
    globeGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // 7. Atmospheric Fresnel Glow Halo (Backside soft blue rim)
    const atmosVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const atmosFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float intensity = pow(0.68 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.8);
        vec3 skyColor = mix(vec3(0.12, 0.45, 0.95), vec3(0.4, 0.8, 1.0), intensity);
        gl_FragColor = vec4(skyColor, intensity * 0.85);
      }
    `;

    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosVertexShader,
      fragmentShader: atmosFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.52, 64, 64),
      atmosMaterial
    );
    scene.add(atmosphereMesh);

    // 8. 3D Particle Starfield
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = THREE.MathUtils.randFloat(30, 95);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.cos(phi);
      starPositions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.1,
      transparent: true,
      opacity: 0.75,
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    // 9. 3D Waving National Flag for Selected Country
    const flagPoleGroup = new THREE.Group();
    flagPoleGroup.visible = false;

    // Pole Cylinder
    const poleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.38, 16);
    poleGeo.translate(0, 0.19, 0);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Polished Gold
      metalness: 0.85,
      roughness: 0.25,
    });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    flagPoleGroup.add(poleMesh);

    // Finial Sphere
    const finialGeo = new THREE.SphereGeometry(0.024, 16, 16);
    finialGeo.translate(0, 0.38, 0);
    const finialMesh = new THREE.Mesh(finialGeo, poleMat);
    flagPoleGroup.add(finialMesh);

    // Flag Cloth Geometry
    const clothGeo = new THREE.PlaneGeometry(0.28, 0.18, 24, 16);
    clothGeo.translate(0.14, 0.27, 0);

    const clothVertexShader = `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave1 = sin(pos.x * 22.0 - uTime * 7.0) * 0.04 * (uv.x + 0.15);
        float wave2 = cos(pos.y * 14.0 + uTime * 4.2) * 0.02 * uv.x;
        pos.z += wave1 + wave2;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const clothFragmentShader = `
      uniform sampler2D uFlagTexture;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec4 flagColor = texture2D(uFlagTexture, vUv);
        float shadow = sin(vUv.x * 22.0 - uTime * 7.0) * 0.14;
        vec3 finalColor = flagColor.rgb * (0.92 + shadow);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const initialFlagTexture = getCountryFlagTexture('UZB', '🇺🇿');
    const clothMaterial = new THREE.ShaderMaterial({
      vertexShader: clothVertexShader,
      fragmentShader: clothFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFlagTexture: { value: initialFlagTexture },
      },
      side: THREE.DoubleSide,
    });
    flagClothMaterialRef.current = clothMaterial;

    const clothMesh = new THREE.Mesh(clothGeo, clothMaterial);
    flagPoleGroup.add(clothMesh);

    const baseBeaconGeo = new THREE.RingGeometry(0.04, 0.065, 32);
    baseBeaconGeo.rotateX(-Math.PI / 2);
    const baseBeaconMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const baseBeaconMesh = new THREE.Mesh(baseBeaconGeo, baseBeaconMat);
    flagPoleGroup.add(baseBeaconMesh);

    globeGroup.add(flagPoleGroup);
    flagPoleGroupRef.current = flagPoleGroup;

    // 10. Clean Balanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaee, 2.0);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    // 11. Load GeoJSON for Country Borders & Countries Index
    loadGeoJsonAndCountries().then(({ geoJson, countries }) => {
      geoJsonDataRef.current = geoJson;
      setAllCountriesList(countries);
      setIsLoading(false);

      if (geoJson && globeGroupRef.current) {
        // Clean vector borders lines
        const bordersGeo = buildWorldBordersGeometry(geoJson, 2.404);
        const bordersMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.72,
        });
        const bordersLines = new THREE.LineSegments(bordersGeo, bordersMat);
        globeGroupRef.current.add(bordersLines);
        worldBordersRef.current = bordersLines;
      }
    });

    // 12. Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (flagClothMaterialRef.current) {
        flagClothMaterialRef.current.uniforms.uTime.value = elapsed;
      }

      // Animate clouds slowly
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0003;
      }

      // Animate flagpole base beacon ring pulse
      if (flagPoleGroupRef.current && flagPoleGroupRef.current.visible) {
        const pulse = 1 + 0.28 * Math.sin(elapsed * 5.0);
        flagPoleGroupRef.current.children[3].scale.set(pulse, 1, pulse);
      }

      // Smooth interpolation to target country orientation
      if (isAnimatingToTargetRef.current) {
        yawRef.current += (targetYawRef.current - yawRef.current) * 0.075;
        pitchRef.current += (targetPitchRef.current - pitchRef.current) * 0.075;

        if (
          Math.abs(targetYawRef.current - yawRef.current) < 0.001 &&
          Math.abs(targetPitchRef.current - pitchRef.current) < 0.001
        ) {
          yawRef.current = targetYawRef.current;
          pitchRef.current = targetPitchRef.current;
          isAnimatingToTargetRef.current = false;
        }
      } else if (!isDraggingRef.current) {
        // Inertia damping
        if (Math.abs(rotationVelocityRef.current.x) > 0.0001 || Math.abs(rotationVelocityRef.current.y) > 0.0001) {
          yawRef.current += rotationVelocityRef.current.x;
          pitchRef.current += rotationVelocityRef.current.y;
          pitchRef.current = Math.max(-1.42, Math.min(1.42, pitchRef.current));

          rotationVelocityRef.current.x *= 0.93;
          rotationVelocityRef.current.y *= 0.93;
        } else if (autoRotateRef.current) {
          yawRef.current += 0.0011; // Natural counter-clockwise rotation (West to East)
        }
      }

      // Update globe quaternion cleanly using decoupled Yaw and Pitch
      // q = qX * qY: rotates around world Y (yaw), then tilts forward/backward around X (pitch)
      if (globeGroupRef.current) {
        const currentQY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yawRef.current);
        const currentQX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitchRef.current);
        globeGroupRef.current.quaternion.copy(currentQX.multiply(currentQY));
      }

      renderer.render(scene, camera);

      // 13. Minimal On-Globe Country Labels
      const labelsCanvas = labelsCanvasRef.current;
      if (labelsCanvas && globeGroupRef.current && cameraRef.current) {
        const labelsCtx = labelsCanvas.getContext('2d');
        if (labelsCtx) {
          labelsCtx.clearRect(0, 0, labelsCanvas.width, labelsCanvas.height);

          if (showLabelsRef.current && allCountriesList.length > 0) {
            const camPos = cameraRef.current.position;
            const camDir = camPos.clone().normalize();
            const zoomDist = camPos.length();

            const zoomThreshold = zoomDist < 4.2 ? 80 : zoomDist < 5.2 ? 45 : 20;
            const prominentList = allCountriesList.slice(0, zoomThreshold);

            for (const c of prominentList) {
              const localPos = latLngToVector3(c.lat, c.lng, 2.405);
              const worldPos = localPos.clone().applyMatrix4(globeGroupRef.current.matrixWorld);

              // Check if facing the camera
              const normal = worldPos.clone().normalize();
              const dot = normal.dot(camDir);

              if (dot > 0.18) {
                const screenPos = worldPos.project(cameraRef.current);
                const x = (screenPos.x * 0.5 + 0.5) * labelsCanvas.width;
                const y = (-(screenPos.y * 0.5) + 0.5) * labelsCanvas.height;

                const isSelected = selectedCountry?.id === c.id;
                const isHovered = hoveredCountry?.id === c.id;

                // Pin dot
                labelsCtx.shadowBlur = 0;
                labelsCtx.fillStyle = isSelected ? '#10b981' : isHovered ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)';
                labelsCtx.beginPath();
                labelsCtx.arc(x, y, isSelected || isHovered ? 4 : 2, 0, Math.PI * 2);
                labelsCtx.fill();

                // Country name text with flag emoji
                const text = `${c.flagEmoji} ${c.nameUz}`;
                labelsCtx.font = (isSelected || isHovered) 
                  ? 'bold 12px "Plus Jakarta Sans", sans-serif' 
                  : '500 10px "Plus Jakarta Sans", sans-serif';

                if (isSelected || isHovered) {
                  const textWidth = labelsCtx.measureText(text).width;
                  const padX = 6;
                  const padY = 3;
                  const pillX = x + 6;
                  const pillY = y - 10;
                  const pillW = textWidth + padX * 2;
                  const pillH = 20;

                  labelsCtx.fillStyle = isSelected ? 'rgba(6, 78, 59, 0.92)' : 'rgba(15, 23, 42, 0.92)';
                  labelsCtx.strokeStyle = isSelected ? '#10b981' : '#fbbf24';
                  labelsCtx.lineWidth = 1.2;

                  labelsCtx.beginPath();
                  const r = 4;
                  labelsCtx.moveTo(pillX + r, pillY);
                  labelsCtx.lineTo(pillX + pillW - r, pillY);
                  labelsCtx.quadraticCurveTo(pillX + pillW, pillY, pillX + pillW, pillY + r);
                  labelsCtx.lineTo(pillX + pillW, pillY + pillH - r);
                  labelsCtx.quadraticCurveTo(pillX + pillW, pillY, pillX + pillW - r, pillY + pillH);
                  labelsCtx.lineTo(pillX + r, pillY + pillH);
                  labelsCtx.quadraticCurveTo(pillX, pillY + pillH, pillX, pillY + pillH - r);
                  labelsCtx.lineTo(pillX, pillY + r);
                  labelsCtx.quadraticCurveTo(pillX, pillY, pillX + r, pillY);
                  labelsCtx.closePath();
                  labelsCtx.fill();
                  labelsCtx.stroke();

                  labelsCtx.fillStyle = '#ffffff';
                  labelsCtx.fillText(text, pillX + padX, pillY + 14);
                } else {
                  labelsCtx.shadowColor = 'rgba(0, 0, 0, 0.95)';
                  labelsCtx.shadowBlur = 4;
                  labelsCtx.shadowOffsetX = 1;
                  labelsCtx.shadowOffsetY = 1;
                  labelsCtx.fillStyle = 'rgba(241, 245, 249, 0.88)';
                  labelsCtx.fillText(text, x + 5, y + 3);
                  labelsCtx.shadowBlur = 0;
                  labelsCtx.shadowOffsetX = 0;
                  labelsCtx.shadowOffsetY = 0;
                }
              }
            }
          }
        }
      }
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (labelsCanvasRef.current) {
        labelsCanvasRef.current.width = w;
        labelsCanvasRef.current.height = h;
      }
    };

    if (labelsCanvasRef.current) {
      labelsCanvasRef.current.width = width;
      labelsCanvasRef.current.height = height;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Pointer & Touch Interaction Handlers
  // Smooth, completely natural drag that NEVER inverts or flips upside-down
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    isAnimatingToTargetRef.current = false;
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
    rotationVelocityRef.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!globeGroupRef.current || !cameraRef.current || !rendererRef.current) return;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousPointerPosRef.current.x;
      const deltaY = e.clientY - previousPointerPosRef.current.y;

      const rotSpeed = 0.0035;

      // Drag right -> rotate right. Drag left -> rotate left.
      yawRef.current += deltaX * rotSpeed;

      // Drag down -> tilt top toward camera. Drag up -> tilt top away.
      pitchRef.current += deltaY * rotSpeed;

      // Strictly clamp pitch to avoid flipping over poles (North is ALWAYS UP!)
      pitchRef.current = Math.max(-1.42, Math.min(1.42, pitchRef.current));

      rotationVelocityRef.current = {
        x: deltaX * rotSpeed,
        y: deltaY * rotSpeed,
      };

      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
      setTooltipPos(null);
      setHoveredCountry(null);
    } else {
      // Raycasting for hover detection
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const earthMesh = globeGroupRef.current.getObjectByName("EarthSurface");
      if (earthMesh) {
        const intersects = raycaster.intersectObject(earthMesh);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          const localPoint = globeGroupRef.current.worldToLocal(point.clone());
          const { lat, lng } = vector3ToLatLng(localPoint);
          const country = findCountryAtLatLng(lat, lng);
          if (country) {
            setHoveredCountry(country);
            setTooltipPos({ x: e.clientX, y: e.clientY });
            return;
          }
        }
      }
      setHoveredCountry(null);
      setTooltipPos(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }

    const dist = Math.hypot(
      e.clientX - pointerStartPosRef.current.x,
      e.clientY - pointerStartPosRef.current.y
    );

    // If it was a click (not a drag)
    if (dist < 6 && cameraRef.current && globeGroupRef.current && rendererRef.current) {
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const earthMesh = globeGroupRef.current.getObjectByName("EarthSurface");
      if (earthMesh) {
        const intersects = raycaster.intersectObject(earthMesh);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          const localPoint = globeGroupRef.current.worldToLocal(point.clone());
          const { lat, lng } = vector3ToLatLng(localPoint);
          const country = findCountryAtLatLng(lat, lng);
          if (country) {
            onSelectCountry(country);
          }
        }
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;
    const zoomSpeed = 0.0025;
    const newZ = cameraRef.current.position.z + e.deltaY * zoomSpeed;
    cameraRef.current.position.z = Math.max(3.2, Math.min(8.5, newZ));
  };

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden select-none touch-none"
      style={{
        backgroundImage: starBackgroundUrl ? `url(${starBackgroundUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 2D Canvas Overlay for crisp on-globe country name badges */}
      <canvas
        ref={labelsCanvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030712]/80 backdrop-blur-md z-30">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin mb-4" />
          <p className="text-sm font-medium text-slate-300">3D Interaktiv Globus yuklanmoqda...</p>
          <span className="text-xs text-slate-500 mt-1">Haqiqiy Yer yuzasi va davlat chegaralari tayyorlanmoqda</span>
        </div>
      )}

      {/* Hover Country Tooltip Card */}
      {hoveredCountry && tooltipPos && (
        <div
          className="fixed pointer-events-none z-40 transform -translate-x-1/2 -translate-y-14 bg-slate-950/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl rounded-xl px-3.5 py-2 flex items-center gap-3 animate-fadeIn"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <span className="text-2xl leading-none select-none">{hoveredCountry.flagEmoji}</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                {hoveredCountry.nameUz}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/40">
                {hoveredCountry.id}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-0.5">
              <span className="text-amber-300 font-medium">{hoveredCountry.capitalUz}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{hoveredCountry.continent}</span>
            </div>
            <span className="text-[10px] text-sky-400 font-medium mt-1">
              Bosing — video va audio mutolaa portali ochiladi →
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
