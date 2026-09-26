import * as THREE from "three";

function canvasTexture(
  width: number,
  height: number,
  paint: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create a 2D canvas context.");
  paint(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function makeLaminateTexture(): THREE.CanvasTexture {
  const texture = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#6e8148";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 36; i++) {
      ctx.fillStyle = `rgba(92, 72, 40, ${0.05 + (i % 5) * 0.015})`;
      ctx.beginPath();
      ctx.ellipse(
        (i * 97) % w,
        (i * 53) % h,
        28 + (i % 7) * 10,
        8 + (i % 4) * 6,
        (i % 6) * 0.4,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    for (let i = 0; i < 110; i++) {
      ctx.strokeStyle = `rgba(226, 206, 140, ${0.08 + (i % 4) * 0.04})`;
      ctx.lineWidth = 1;
      const y = (i * 4.7) % h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(140, y + ((i % 5) - 2) * 6, 340, y + ((i % 7) - 3) * 5, w, y + ((i % 3) - 1) * 4);
      ctx.stroke();
    }
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function makeFr4Texture(): THREE.CanvasTexture {
  const texture = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#0e6b3c";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(186, 214, 176, 0.22)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= w; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function makeGlowTexture(): THREE.CanvasTexture {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const grd = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2);
    grd.addColorStop(0, "rgba(180, 240, 27, 1)");
    grd.addColorStop(0.32, "rgba(180, 240, 27, 0.45)");
    grd.addColorStop(1, "rgba(180, 240, 27, 0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
  });
}

export function makeSkyTexture(): THREE.CanvasTexture {
  return canvasTexture(8, 256, (ctx, w, h) => {
    const grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, "#161228");
    grd.addColorStop(0.42, "#5c3044");
    grd.addColorStop(0.72, "#c56a3a");
    grd.addColorStop(1, "#e8a15a");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
  });
}

export function makeGroundTexture(): THREE.CanvasTexture {
  const texture = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#3a3424";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 180; i++) {
      ctx.fillStyle = i % 3 === 0 ? "rgba(196, 160, 90, 0.35)" : "rgba(40, 32, 22, 0.45)";
      const x = (i * 47) % w;
      const y = (i * 29) % h;
      ctx.fillRect(x, y, 2 + (i % 3), 6 + (i % 5));
    }
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}
