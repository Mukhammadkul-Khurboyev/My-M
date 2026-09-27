import * as THREE from 'three';

// Cache for generated flag textures
const flagTextureCache: Record<string, THREE.CanvasTexture> = {};

/**
 * Creates an animated / crisp flag canvas texture for 3D waving flag
 */
export function getCountryFlagTexture(countryId: string, flagEmoji: string): THREE.CanvasTexture {
  const code = (countryId || 'UNKNOWN').toUpperCase();
  if (flagTextureCache[code]) {
    return flagTextureCache[code];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;

  // Default background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 256, 160);

  // Custom high-accuracy procedural flags for key countries
  if (code === 'UZB') {
    // Uzbekistan Flag
    // Blue top (width: 256, height: 50)
    ctx.fillStyle = '#0099b5';
    ctx.fillRect(0, 0, 256, 50);
    // Red stripe 1 (height: 5)
    ctx.fillStyle = '#ce1126';
    ctx.fillRect(0, 50, 256, 5);
    // White middle (height: 50)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 55, 256, 50);
    // Red stripe 2 (height: 5)
    ctx.fillStyle = '#ce1126';
    ctx.fillRect(0, 105, 256, 5);
    // Green bottom (height: 50)
    ctx.fillStyle = '#1eb53a';
    ctx.fillRect(0, 110, 256, 50);

    // Crescent Moon on Blue stripe
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(36, 25, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0099b5';
    ctx.beginPath();
    ctx.arc(41, 25, 12, 0, Math.PI * 2);
    ctx.fill();

    // 12 Stars (3 rows)
    ctx.fillStyle = '#ffffff';
    const drawStar = (cx: number, cy: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    };
    // Row 1 (3 stars)
    drawStar(72, 16); drawStar(82, 16); drawStar(92, 16);
    // Row 2 (4 stars)
    drawStar(62, 25); drawStar(72, 25); drawStar(82, 25); drawStar(92, 25);
    // Row 3 (5 stars)
    drawStar(52, 34); drawStar(62, 34); drawStar(72, 34); drawStar(82, 34); drawStar(92, 34);
  } else if (code === 'TUR') {
    // Turkey Flag
    ctx.fillStyle = '#e30a17';
    ctx.fillRect(0, 0, 256, 160);
    // White crescent
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(100, 80, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e30a17';
    ctx.beginPath();
    ctx.arc(112, 80, 32, 0, Math.PI * 2);
    ctx.fill();
    // Star
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(145, 80, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (code === 'DEU') {
    // Germany Flag: Black, Red, Gold
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 256, 53);
    ctx.fillStyle = '#dd0000';
    ctx.fillRect(0, 53, 256, 54);
    ctx.fillStyle = '#ffce00';
    ctx.fillRect(0, 107, 256, 53);
  } else if (code === 'FRA') {
    // France Flag: Blue, White, Red vertical
    ctx.fillStyle = '#002654';
    ctx.fillRect(0, 0, 85, 160);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(85, 0, 86, 160);
    ctx.fillStyle = '#ed2939';
    ctx.fillRect(171, 0, 85, 160);
  } else if (code === 'RUS') {
    // Russia: White, Blue, Red
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 53);
    ctx.fillStyle = '#0039a6';
    ctx.fillRect(0, 53, 256, 54);
    ctx.fillStyle = '#d52b1e';
    ctx.fillRect(0, 107, 256, 53);
  } else if (code === 'JPN') {
    // Japan: White with red sun disc
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 160);
    ctx.fillStyle = '#bc002d';
    ctx.beginPath();
    ctx.arc(128, 80, 48, 0, Math.PI * 2);
    ctx.fill();
  } else if (code === 'USA') {
    // USA: Red & White stripes + Blue canton
    for (let i = 0; i < 13; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#b22234' : '#ffffff';
      ctx.fillRect(0, (i * 160) / 13, 256, 160 / 13 + 1);
    }
    ctx.fillStyle = '#3c3b6e';
    ctx.fillRect(0, 0, 105, (7 * 160) / 13);
    // Stars placeholder dots
    ctx.fillStyle = '#ffffff';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        ctx.beginPath();
        ctx.arc(12 + c * 16, 10 + r * 14, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (code === 'KAZ') {
    // Kazakhstan: Sky blue with golden sun & eagle
    ctx.fillStyle = '#00afca';
    ctx.fillRect(0, 0, 256, 160);
    ctx.fillStyle = '#fec50c';
    ctx.beginPath();
    ctx.arc(128, 70, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(100, 100, 56, 8);
  } else if (code === 'KGZ') {
    // Kyrgyzstan: Red with yellow sun and tunduk
    ctx.fillStyle = '#e1131a';
    ctx.fillRect(0, 0, 256, 160);
    ctx.fillStyle = '#ffdf00';
    ctx.beginPath();
    ctx.arc(128, 80, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e1131a';
    ctx.beginPath();
    ctx.arc(128, 80, 24, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Render clean national flag with emoji and gradient background
    const grad = ctx.createLinearGradient(0, 0, 256, 160);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 160);

    // Border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 248, 152);

    // Large centered flag emoji
    ctx.font = '80px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(flagEmoji || '🏳️', 128, 80);
  }

  // Border frame for realistic cloth edge
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 256, 160);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;

  flagTextureCache[code] = texture;
  return texture;
}
