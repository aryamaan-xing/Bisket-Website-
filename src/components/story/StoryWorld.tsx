"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { lerp, seeded, smoothstep } from "@/components/story/math";
import {
  boardOpacity,
  etchAmount,
  ledAmount,
  seatedAmount,
  storyTime,
} from "@/components/story/timeline";
import {
  makeFr4Texture,
  makeGlowTexture,
  makeGroundTexture,
  makeLaminateTexture,
  makeSkyTexture,
} from "@/components/story/textures";

export const OPENING_CAMERA = {
  position: [0.72, 0.52, 1.2] as const,
  fov: 32,
};

const CAMERAS: Array<{
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}> = [
  { pos: [0.72, 0.52, 1.2], look: [0, 0.02, 0], fov: 32 },
  { pos: [0.2, 2.55, 5.5], look: [0, 0.3, -0.3], fov: 46 },
  { pos: [-0.15, 1.65, 3.7], look: [0, 0.65, 0], fov: 44 },
  { pos: [1.45, 1.02, 2.25], look: [0, 0.1, 0], fov: 40 },
  { pos: [0.88, 0.74, 1.72], look: [0, 0.04, 0], fov: 36 },
  { pos: [0.95, 0.68, 1.9], look: [0, 0.08, 0], fov: 36 },
  { pos: [0, 1.32, 4.2], look: [0, 0.24, 0], fov: 42 },
  { pos: [0.2, 1.12, 2.65], look: [0, 0.12, 0], fov: 42 },
  { pos: [0.72, 0.52, 1.2], look: [0, 0.02, 0], fov: 32 },
];

const BG = [
  "#0c1a14",
  "#2a1822",
  "#14120e",
  "#101614",
  "#0c1a14",
  "#0c1a14",
  "#14120f",
  "#1c1712",
  "#0c1a14",
].map((hex) => new THREE.Color(hex));

const TRACES: Array<{
  position: [number, number, number];
  args: [number, number, number];
  along: "x" | "z";
  delay: number;
}> = [
  { position: [-0.22, 0.066, -0.3], args: [0.72, 0.012, 0.04], along: "x", delay: 0 },
  { position: [0.12, 0.066, -0.08], args: [0.038, 0.012, 0.46], along: "z", delay: 0.06 },
  { position: [0.34, 0.066, 0.14], args: [0.48, 0.012, 0.036], along: "x", delay: 0.1 },
  { position: [-0.28, 0.066, 0.2], args: [0.52, 0.012, 0.036], along: "x", delay: 0.04 },
  { position: [-0.04, 0.066, 0.02], args: [0.034, 0.012, 0.38], along: "z", delay: 0.12 },
  { position: [0.5, 0.066, 0.28], args: [0.2, 0.012, 0.032], along: "x", delay: 0.16 },
  { position: [-0.46, 0.066, -0.08], args: [0.28, 0.012, 0.03], along: "x", delay: 0.14 },
];

const PARTS: Array<{
  position: [number, number, number];
  args: [number, number, number];
  color: string;
  delay: number;
}> = [
  { position: [-0.36, 0.1, 0.02], args: [0.34, 0.07, 0.26], color: "#161816", delay: 0 },
  { position: [0.18, 0.08, -0.28], args: [0.14, 0.045, 0.055], color: "#2a241c", delay: 0.08 },
  { position: [-0.08, 0.085, -0.2], args: [0.09, 0.06, 0.09], color: "#3a342c", delay: 0.14 },
  { position: [0.36, 0.078, 0.02], args: [0.12, 0.04, 0.05], color: "#241e1a", delay: 0.18 },
];

const HOLES: Array<[number, number, number]> = [
  [-0.7, 0.06, -0.4],
  [0.7, 0.06, -0.4],
  [-0.7, 0.06, 0.4],
  [0.7, 0.06, 0.4],
];

const FIBRE_COUNT = 240;
const STALK_COUNT = 110;
const SMOKE_COUNT = 28;

const FIBRE_COLORS = ["#e2c56a", "#c6a15a", "#8ea04a", "#d8d2b0", "#6f8f45", "#b7c46a"].map(
  (hex) => new THREE.Color(hex),
);
const STALK_COLORS = ["#c4a15a", "#a88448", "#d2c08a", "#6d7a3e", "#8b6a38"].map(
  (hex) => new THREE.Color(hex),
);

type FibreSeed = {
  bx: number;
  by: number;
  bz: number;
  fx: number;
  fz: number;
  sx: number;
  sz: number;
  soilx: number;
  soilz: number;
  phase: number;
  swirl: number;
  len: number;
  thick: number;
};

type StalkSeed = {
  x: number;
  z: number;
  h: number;
  lean: number;
  rot: number;
  thick: number;
};

type SmokeSeed = { x: number; z: number; phase: number; scale: number };

const JUNK: Array<{
  position: [number, number, number];
  args: [number, number, number];
  rotation: [number, number, number];
  color: string;
}> = [
  { position: [-0.35, 0.12, 0.15], args: [0.55, 0.22, 0.4], rotation: [0.1, 0.4, 0.2], color: "#3d4a3a" },
  { position: [0.2, 0.16, -0.1], args: [0.48, 0.28, 0.36], rotation: [-0.2, 0.2, 0.4], color: "#2c2c28" },
  { position: [0.05, 0.34, 0.05], args: [0.36, 0.16, 0.3], rotation: [0.3, -0.5, 0.1], color: "#1e4d32" },
  { position: [-0.1, 0.08, -0.35], args: [0.7, 0.14, 0.32], rotation: [0, 0.6, 0], color: "#5c5346" },
  { position: [0.42, 0.1, 0.22], args: [0.32, 0.18, 0.28], rotation: [0.4, 0.1, -0.3], color: "#6a6248" },
  { position: [-0.55, 0.1, -0.05], args: [0.28, 0.16, 0.4], rotation: [0.2, -0.3, 0.5], color: "#243028" },
  { position: [0.15, 0.22, 0.32], args: [0.22, 0.1, 0.22], rotation: [0.6, 0.2, 0.2], color: "#4a4034" },
  { position: [-0.2, 0.28, -0.18], args: [0.24, 0.1, 0.18], rotation: [-0.4, 0.8, 0.3], color: "#173524" },
];

const CHUNKS: Array<{ x: number; z: number; w: number; d: number; spin: number }> = [
  { x: -0.42, z: -0.2, w: 0.52, d: 0.38, spin: 0.6 },
  { x: 0.18, z: -0.22, w: 0.5, d: 0.36, spin: -0.4 },
  { x: 0.48, z: 0.08, w: 0.38, d: 0.4, spin: 0.8 },
  { x: -0.36, z: 0.22, w: 0.46, d: 0.32, spin: -0.7 },
  { x: 0.08, z: 0.24, w: 0.44, d: 0.3, spin: 0.3 },
];

function cameraAt(t: number) {
  const clamped = Math.min(8, Math.max(0, t));
  const i = Math.min(7, Math.floor(clamped));
  const f = clamped >= 8 ? 1 : clamped - i;
  const a = CAMERAS[i];
  const b = CAMERAS[i + 1];
  return {
    px: lerp(a.pos[0], b.pos[0], f),
    py: lerp(a.pos[1], b.pos[1], f),
    pz: lerp(a.pos[2], b.pos[2], f),
    lx: lerp(a.look[0], b.look[0], f),
    ly: lerp(a.look[1], b.look[1], f),
    lz: lerp(a.look[2], b.look[2], f),
    fov: lerp(a.fov, b.fov, f),
  };
}

function fadeTree(root: THREE.Object3D | null, opacity: number) {
  if (!root) return;
  root.visible = opacity > 0.02;
  if (!root.visible) return;
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      material.opacity = opacity;
    }
  });
}

export function StoryWorld({
  progressRef,
  onReady,
}: {
  progressRef: RefObject<number>;
  onReady: () => void;
}) {
  const readyOnce = useRef(false);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const textures = useMemo(
    () => ({
      laminate: makeLaminateTexture(),
      fr4: makeFr4Texture(),
      glow: makeGlowTexture(),
      sky: makeSkyTexture(),
      ground: makeGroundTexture(),
    }),
    [],
  );

  const fibres = useMemo<FibreSeed[]>(() => {
    const rand = seeded(11);
    return Array.from({ length: FIBRE_COUNT }, () => ({
      bx: (rand() - 0.5) * 1.45,
      by: 0.16 + rand() * 0.08,
      bz: (rand() - 0.5) * 0.9,
      fx: (rand() - 0.5) * 7.2,
      fz: (rand() - 0.5) * 5.2 - 0.4,
      sx: (rand() - 0.5) * 1.55,
      sz: (rand() - 0.5) * 0.95,
      soilx: (rand() - 0.5) * 1.4,
      soilz: (rand() - 0.5) * 1.1,
      phase: rand() * Math.PI * 2,
      swirl: rand() * Math.PI * 2,
      len: 0.08 + rand() * 0.16,
      thick: 0.012 + rand() * 0.018,
    }));
  }, []);

  const stalks = useMemo<StalkSeed[]>(() => {
    const rand = seeded(29);
    return Array.from({ length: STALK_COUNT }, () => ({
      x: (rand() - 0.5) * 9,
      z: (rand() - 0.5) * 6.5 - 0.2,
      h: 0.28 + rand() * 0.95,
      lean: (rand() - 0.5) * 0.35,
      rot: rand() * Math.PI,
      thick: 0.7 + rand() * 0.8,
    }));
  }, []);

  const smokes = useMemo<SmokeSeed[]>(() => {
    const rand = seeded(47);
    return Array.from({ length: SMOKE_COUNT }, () => ({
      x: (rand() - 0.5) * 6,
      z: (rand() - 0.5) * 4 - 0.3,
      phase: rand(),
      scale: 0.18 + rand() * 0.28,
    }));
  }, []);

  const fibreGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const fibreMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.72, metalness: 0.02 }),
    [],
  );
  const stalkGeo = useMemo(() => new THREE.CylinderGeometry(0.018, 0.028, 1, 5), []);
  const smokeGeo = useMemo(() => new THREE.SphereGeometry(1, 6, 5), []);
  const stalkMat = useRef<THREE.MeshStandardMaterial>(null);
  const smokeMat = useRef<THREE.MeshBasicMaterial>(null);

  const boardRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const traceRefs = useRef<Array<THREE.Mesh | null>>([]);
  const partRefs = useRef<Array<THREE.Mesh | null>>([]);
  const ledMat = useRef<THREE.MeshStandardMaterial>(null);
  const haloMat = useRef<THREE.SpriteMaterial>(null);
  const ledSpriteMat = useRef<THREE.SpriteMaterial>(null);
  const limeLight = useRef<THREE.PointLight>(null);
  const fibreRef = useRef<THREE.InstancedMesh>(null);
  const stalkRef = useRef<THREE.InstancedMesh>(null);
  const smokeRef = useRef<THREE.InstancedMesh>(null);
  const fieldRef = useRef<THREE.Group>(null);
  const topPlate = useRef<THREE.Group>(null);
  const bottomPlate = useRef<THREE.Group>(null);
  const sheetRef = useRef<THREE.Mesh>(null);
  const sheetMat = useRef<THREE.MeshStandardMaterial>(null);
  const fr4Ref = useRef<THREE.Group>(null);
  const heapRef = useRef<THREE.Group>(null);
  const chunkRefs = useRef<Array<THREE.Mesh | null>>([]);
  const chunkGroup = useRef<THREE.Group>(null);
  const soilRef = useRef<THREE.Group>(null);
  const sproutRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shadowMat = useRef<THREE.MeshBasicMaterial>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const skyRef = useRef<THREE.Mesh>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const bgRef = useRef<THREE.Color>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const warmRef = useRef<THREE.DirectionalLight>(null);
  const splitRef = useRef(false);
  const [showSplit, setShowSplit] = useState(false);
  const [labelsReady, setLabelsReady] = useState(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const bgColor = useMemo(() => new THREE.Color(), []);

  useLayoutEffect(() => {
    const hide = (mesh: THREE.InstancedMesh | null, count: number) => {
      if (!mesh) return;
      dummy.position.set(0, -10, 0);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      for (let i = 0; i < count; i++) mesh.setMatrixAt(i, dummy.matrix);
      mesh.instanceMatrix.needsUpdate = true;
    };
    hide(fibreRef.current, FIBRE_COUNT);
    hide(stalkRef.current, STALK_COUNT);
    hide(smokeRef.current, SMOKE_COUNT);

    const paint = (mesh: THREE.InstancedMesh | null, colors: THREE.Color[], count: number) => {
      if (!mesh) return;
      for (let i = 0; i < count; i++) mesh.setColorAt(i, colors[i % colors.length]);
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };
    paint(fibreRef.current, FIBRE_COLORS, FIBRE_COUNT);
    paint(stalkRef.current, STALK_COLORS, STALK_COUNT);
  }, [dummy]);

  useFrame((state) => {
    const t = storyTime(progressRef.current);
    const time = state.clock.elapsedTime;
    const cam = state.camera as THREE.PerspectiveCamera;
    const shot = cameraAt(t);
    cam.position.set(shot.px, shot.py, shot.pz);
    cam.lookAt(shot.lx, shot.ly, shot.lz);
    if (Math.abs(cam.fov - shot.fov) > 0.05) {
      cam.fov = shot.fov;
      cam.updateProjectionMatrix();
    }

    const fieldAmt = smoothstep(0.55, 0.95, t) * (1 - smoothstep(1.85, 2.45, t));
    const i = Math.min(7, Math.max(0, Math.floor(Math.min(t, 7.999))));
    bgColor.copy(BG[i]).lerp(BG[i + 1], t >= 8 ? 1 : t - i);
    bgRef.current?.copy(bgColor);
    if (fogRef.current) {
      fogRef.current.color.copy(bgColor);
      fogRef.current.near = lerp(7, 3.5, fieldAmt);
      fogRef.current.far = lerp(26, 13, fieldAmt);
    }
    if (ambRef.current) ambRef.current.intensity = lerp(0.22, 0.4, fieldAmt);
    if (keyRef.current) keyRef.current.intensity = lerp(1.25, 0.55, fieldAmt);
    if (warmRef.current) warmRef.current.intensity = lerp(0.12, 1.4, fieldAmt);

    const opacity = boardOpacity(t);
    const led = ledAmount(t);
    const hero = Math.max(1 - smoothstep(0, 0.75, t), smoothstep(7.25, 8, t));
    const split = smoothstep(5.2, 5.85, t) * (1 - smoothstep(6.5, 7.05, t));
    const sink = smoothstep(6.55, 7.25, t) * (1 - smoothstep(7.45, 7.9, t));
    const yaw = lerp(0.35 + Math.sin(t * 0.7) * 0.15, 0.55 + Math.sin(time * 0.45) * 0.28, hero);
    const tilt = lerp(0.2, 0.48, hero);
    const boardX = 1.12 * split;
    const boardY = 0.12 - sink * 0.75;

    if (boardRef.current) {
      boardRef.current.visible = opacity > 0.02;
      boardRef.current.position.set(boardX, boardY, 0);
      boardRef.current.rotation.order = "YXZ";
      boardRef.current.rotation.y = yaw;
      boardRef.current.rotation.x = tilt;
    }
    fadeTree(bodyRef.current, opacity);

    for (let n = 0; n < TRACES.length; n++) {
      const mesh = traceRefs.current[n];
      if (!mesh) continue;
      const amount = etchAmount(t, TRACES[n].delay);
      mesh.scale.x = TRACES[n].along === "x" ? amount : 1;
      mesh.scale.z = TRACES[n].along === "z" ? amount : 1;
      mesh.visible = amount > 0.03;
    }
    for (let n = 0; n < PARTS.length; n++) {
      const mesh = partRefs.current[n];
      if (!mesh) continue;
      const seat = seatedAmount(t, PARTS[n].delay);
      mesh.position.y = PARTS[n].position[1] + (1 - seat) * 1.25;
      mesh.visible = seat > 0.02;
    }
    if (ledMat.current) ledMat.current.emissiveIntensity = 0.35 + led * 3.4;
    if (haloMat.current) haloMat.current.opacity = led * opacity * 0.42;
    if (ledSpriteMat.current) ledSpriteMat.current.opacity = led * opacity * 0.95;
    if (limeLight.current) limeLight.current.intensity = led * opacity * 7;

    if (shadowRef.current && shadowMat.current) {
      shadowRef.current.position.set(boardX, 0.015, 0);
      shadowRef.current.visible = opacity > 0.35 && sink < 0.4;
      shadowMat.current.opacity = 0.38 * opacity;
    }

    const fibreMesh = fibreRef.current;
    if (fibreMesh) {
      for (let n = 0; n < fibres.length; n++) {
        const f = fibres[n];
        const wEarly = (1 - smoothstep(0.2, 0.95, t)) * smoothstep(0.18, 0.5, t);
        const wFall = smoothstep(0.35, 0.75, t) * (1 - smoothstep(1.15, 1.7, t));
        const wSwirl = smoothstep(1.4, 1.9, t) * (1 - smoothstep(2.55, 3.2, t));
        const wSheet = smoothstep(2.35, 2.9, t) * (1 - smoothstep(3.4, 3.95, t));
        const wSoil = smoothstep(6.45, 7.0, t) * (1 - smoothstep(7.4, 7.9, t));
        const wLate = smoothstep(7.35, 7.8, t) * (1 - smoothstep(7.9, 8, t));
        const sum = wEarly + wFall + wSwirl + wSheet + wSoil + wLate;
        if (sum < 0.02) {
          dummy.scale.setScalar(0);
          dummy.position.set(0, -5, 0);
          dummy.updateMatrix();
          fibreMesh.setMatrixAt(n, dummy.matrix);
          continue;
        }
        const fallU = smoothstep(0.4, 1.2, t);
        const fallX = lerp(f.bx, f.fx, fallU);
        const fallY = lerp(1.2, 0.05, fallU) + Math.sin(time * 1.4 + f.phase) * 0.04;
        const fallZ = lerp(f.bz, f.fz, fallU);
        const ang = f.swirl + time * 0.75 + t;
        const radius = lerp(1.55, 0.22, smoothstep(1.7, 2.85, t));
        const swirlX = Math.cos(ang) * radius;
        const swirlY = lerp(0.2, 0.9, smoothstep(1.45, 2.15, t)) + Math.sin(ang * 2) * 0.1;
        const swirlZ = Math.sin(ang) * radius * 0.62;
        const pressU = smoothstep(2.5, 3.15, t);
        const sheetX = f.sx * lerp(1.1, 0.92, pressU);
        const sheetY = lerp(0.5, 0.07, pressU);
        const sheetZ = f.sz * lerp(1.1, 0.92, pressU);
        const soilU = smoothstep(6.6, 7.25, t);
        const soilX = f.soilx;
        const soilY = lerp(0.65, 0.04, soilU);
        const soilZ = f.soilz;
        const assemble = smoothstep(7.35, 7.95, t);
        const lateX = lerp(f.soilx * 0.35, f.bx, assemble);
        const lateY = lerp(0.2 + Math.sin(time * 2 + f.phase) * 0.15, f.by, assemble);
        const lateZ = lerp(f.soilz * 0.35, f.bz, assemble);
        dummy.position.set(
          (f.bx * wEarly + fallX * wFall + swirlX * wSwirl + sheetX * wSheet + soilX * wSoil + lateX * wLate) / sum,
          (f.by * wEarly + fallY * wFall + swirlY * wSwirl + sheetY * wSheet + soilY * wSoil + lateY * wLate) / sum,
          (f.bz * wEarly + fallZ * wFall + swirlZ * wSwirl + sheetZ * wSheet + soilZ * wSoil + lateZ * wLate) / sum,
        );
        dummy.rotation.set(f.phase + time * 0.4, f.phase + time * 0.6, 0);
        const s = Math.min(1, sum);
        dummy.scale.set(f.thick * s, f.len * s, f.thick * s);
        dummy.updateMatrix();
        fibreMesh.setMatrixAt(n, dummy.matrix);
      }
      fibreMesh.instanceMatrix.needsUpdate = true;
    }

    const stalkMesh = stalkRef.current;
    const stalkAmt = smoothstep(0.7, 1.05, t) * (1 - smoothstep(2.05, 2.55, t));
    const lift = smoothstep(1.3, 2.1, t);
    if (stalkMesh) {
      if (stalkMat.current) stalkMat.current.opacity = stalkAmt;
      stalkMesh.visible = stalkAmt > 0.03;
      if (stalkMesh.visible) {
        for (let n = 0; n < stalks.length; n++) {
          const s = stalks[n];
          const height = s.h * (1 + lift * 0.65);
          const spread = 1 + lift * 0.45;
          dummy.position.set(s.x * spread, height * 0.5 + lift * (0.45 + (n % 5) * 0.05), s.z * spread);
          dummy.rotation.set(s.lean, s.rot + lift, s.lean * 0.5);
          dummy.scale.set(s.thick, height, s.thick);
          dummy.updateMatrix();
          stalkMesh.setMatrixAt(n, dummy.matrix);
        }
        stalkMesh.instanceMatrix.needsUpdate = true;
      }
    }

    const smokeMesh = smokeRef.current;
    const smokeAmt = smoothstep(0.75, 1.05, t) * (1 - smoothstep(1.5, 1.95, t));
    if (smokeMesh) {
      if (smokeMat.current) smokeMat.current.opacity = smokeAmt * 0.28;
      smokeMesh.visible = smokeAmt > 0.03;
      if (smokeMesh.visible) {
        for (let n = 0; n < smokes.length; n++) {
          const s = smokes[n];
          const cycle = (time * 0.08 + s.phase) % 1;
          dummy.position.set(s.x, 0.2 + cycle * 2.3, s.z);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.setScalar(s.scale * (0.6 + cycle));
          dummy.updateMatrix();
          smokeMesh.setMatrixAt(n, dummy.matrix);
        }
        smokeMesh.instanceMatrix.needsUpdate = true;
      }
    }

    if (fieldRef.current) fieldRef.current.visible = fieldAmt > 0.04;
    if (skyRef.current) {
      skyRef.current.visible = fieldAmt > 0.04;
      const mat = skyRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = fieldAmt;
    }
    if (sunRef.current) sunRef.current.visible = fieldAmt > 0.2;

    const plateAmt = smoothstep(2.15, 2.55, t) * (1 - smoothstep(3.7, 4.15, t));
    const closed = smoothstep(2.45, 3.05, t) * (1 - smoothstep(3.55, 4.05, t));
    if (topPlate.current) {
      topPlate.current.visible = plateAmt > 0.04;
      topPlate.current.position.y = lerp(1.45, 0.2, closed);
    }
    if (bottomPlate.current) {
      bottomPlate.current.visible = plateAmt > 0.04;
      bottomPlate.current.position.y = lerp(-1.15, -0.14, closed);
    }
    const sheetAmt = smoothstep(2.2, 2.75, t) * (1 - smoothstep(3.45, 4.0, t));
    if (sheetRef.current && sheetMat.current) {
      sheetRef.current.visible = sheetAmt > 0.04;
      sheetRef.current.scale.y = lerp(0.55, 0.08, closed);
      sheetMat.current.opacity = sheetAmt;
    }

    const fall = smoothstep(5.35, 5.95, t);
    const fr4Show = smoothstep(5.3, 5.65, t) * (1 - smoothstep(6.7, 7.15, t));
    if (fr4Ref.current) {
      fr4Ref.current.visible = fr4Show > 0.04;
      fr4Ref.current.position.set(-1.18, lerp(2.35, 0.42, fall), 0);
      fr4Ref.current.rotation.set(lerp(0.7, 0.32, fall), lerp(-0.4, 0.55, fall), lerp(0.2, 0.42, fall));
    }
    if (heapRef.current) heapRef.current.visible = fr4Show > 0.04;
    if (floorRef.current) floorRef.current.visible = split > 0.08;

    if (split > 0.45 !== splitRef.current) {
      splitRef.current = split > 0.45;
      setShowSplit(splitRef.current);
    }

    const chunkAmt = smoothstep(6.4, 6.7, t) * (1 - smoothstep(6.95, 7.25, t));
    if (chunkGroup.current) chunkGroup.current.visible = chunkAmt > 0.04;
    const sinkU = smoothstep(6.5, 7.15, t);
    for (let n = 0; n < CHUNKS.length; n++) {
      const mesh = chunkRefs.current[n];
      if (!mesh) continue;
      const c = CHUNKS[n];
      mesh.position.set(c.x * (1 + sinkU * 0.4), lerp(0.18, -0.12, sinkU), c.z);
      mesh.rotation.set(c.spin * sinkU, c.spin * sinkU * 1.4, c.spin * 0.6 * sinkU);
      mesh.scale.setScalar(chunkAmt);
    }

    const soilAmt = smoothstep(6.45, 6.9, t) * (1 - smoothstep(7.65, 7.98, t));
    if (soilRef.current) soilRef.current.visible = soilAmt > 0.04;
    const sprout = smoothstep(6.8, 7.2, t) * (1 - smoothstep(7.4, 7.85, t));
    if (sproutRef.current) {
      sproutRef.current.visible = sprout > 0.02;
      sproutRef.current.scale.setScalar(Math.max(sprout, 0.001));
    }

    if (!readyOnce.current) {
      readyOnce.current = true;
      onReadyRef.current();
      setLabelsReady(true);
    }
  });

  return (
    <>
      <color ref={bgRef} attach="background" args={["#0c1a14"]} />
      <fog ref={fogRef} attach="fog" args={["#0c1a14", 7, 26]} />
      <ambientLight ref={ambRef} intensity={0.22} />
      <hemisphereLight args={["#e7f2c8", "#24180f", 0.38]} />
      <directionalLight ref={keyRef} position={[4.2, 6.2, 3.2]} intensity={1.25} color="#fff6e8" />
      <directionalLight ref={warmRef} position={[-5, 1.4, -4]} intensity={0.12} color="#ff9a45" />

      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#161512" roughness={1} />
      </mesh>
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[0.95, 24]} />
        <meshBasicMaterial ref={shadowMat} color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>

      <group ref={fieldRef} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.4]}>
          <planeGeometry args={[18, 14]} />
          <meshStandardMaterial map={textures.ground} color="#ffffff" roughness={1} />
        </mesh>
        <mesh position={[-3.2, 0.35, -4.5]} scale={[2.4, 0.7, 1.4]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#2a1c22" roughness={1} />
        </mesh>
        <mesh position={[2.6, 0.28, -5]} scale={[3, 0.55, 1.6]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#241820" roughness={1} />
        </mesh>
      </group>
      <mesh ref={skyRef} position={[0, 3.4, -7.5]} visible={false}>
        <planeGeometry args={[28, 10]} />
        <meshBasicMaterial map={textures.sky} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={sunRef} position={[4.6, 1.7, -7.2]} visible={false}>
        <sphereGeometry args={[0.45, 12, 10]} />
        <meshBasicMaterial color="#ffb060" toneMapped={false} />
      </mesh>

      <instancedMesh ref={stalkRef} args={[stalkGeo, undefined, STALK_COUNT]} frustumCulled={false}>
        <meshStandardMaterial ref={stalkMat} color="#ffffff" roughness={0.9} transparent opacity={1} />
      </instancedMesh>
      <instancedMesh ref={smokeRef} args={[smokeGeo, undefined, SMOKE_COUNT]} frustumCulled={false}>
        <meshBasicMaterial ref={smokeMat} color="#c4b8ae" transparent opacity={0} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={fibreRef} args={[fibreGeo, fibreMat, FIBRE_COUNT]} frustumCulled={false} />

      <group ref={topPlate} visible={false} position={[0, 1.45, 0]}>
        <RoundedBox args={[2.2, 0.1, 1.5]} radius={0.02} smoothness={2} bevelSegments={1}>
          <meshStandardMaterial color="#3e4642" metalness={0.62} roughness={0.38} />
        </RoundedBox>
      </group>
      <group ref={bottomPlate} visible={false} position={[0, -1.15, 0]}>
        <RoundedBox args={[2.2, 0.1, 1.5]} radius={0.02} smoothness={2} bevelSegments={1}>
          <meshStandardMaterial color="#343c38" metalness={0.62} roughness={0.4} />
        </RoundedBox>
      </group>
      <mesh ref={sheetRef} position={[0, 0.05, 0]} visible={false}>
        <boxGeometry args={[1.75, 1, 1.08]} />
        <meshStandardMaterial
          ref={sheetMat}
          map={textures.laminate}
          color="#ffffff"
          roughness={0.8}
          transparent
          opacity={0}
        />
      </mesh>

      <group ref={boardRef} position={[0, 0.12, 0]}>
        <group ref={bodyRef}>
          <RoundedBox args={[1.72, 0.08, 1.08]} radius={0.025} smoothness={2} bevelSegments={1}>
            <meshStandardMaterial color="#243528" roughness={0.86} transparent opacity={1} />
          </RoundedBox>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[1.6, 0.018, 0.98]} />
            <meshStandardMaterial map={textures.laminate} color="#ffffff" roughness={0.76} transparent opacity={1} />
          </mesh>
          {TRACES.map((trace, index) => (
            <mesh
              key={`${trace.position.join(":")}`}
              ref={(node) => {
                traceRefs.current[index] = node;
              }}
              position={trace.position}
            >
              <boxGeometry args={trace.args} />
              <meshStandardMaterial
                color="#e09a55"
                metalness={0.78}
                roughness={0.32}
                transparent
                opacity={1}
                polygonOffset
                polygonOffsetFactor={-1}
                polygonOffsetUnits={-1}
              />
            </mesh>
          ))}
          {PARTS.map((part, index) => (
            <mesh
              key={part.color + part.position.join(":")}
              ref={(node) => {
                partRefs.current[index] = node;
              }}
              position={part.position}
            >
              <boxGeometry args={part.args} />
              <meshStandardMaterial color={part.color} roughness={0.55} transparent opacity={1} />
            </mesh>
          ))}
          {HOLES.map((hole) => (
            <mesh key={hole.join(":")} position={hole} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.02, 8]} />
              <meshStandardMaterial color="#141816" roughness={0.8} transparent opacity={1} />
            </mesh>
          ))}
        </group>
        <mesh position={[0.58, 0.09, 0.3]}>
          <boxGeometry args={[0.09, 0.05, 0.09]} />
          <meshStandardMaterial
            ref={ledMat}
            color="#d9f7a0"
            emissive="#b4f01b"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        <sprite position={[0.58, 0.12, 0.3]} scale={[0.55, 0.55, 1]}>
          <spriteMaterial
            ref={ledSpriteMat}
            map={textures.glow}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
        <sprite position={[0, 0.05, 0]} scale={[2.5, 1.7, 1]}>
          <spriteMaterial
            ref={haloMat}
            map={textures.glow}
            transparent
            depthWrite={false}
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
        <pointLight ref={limeLight} position={[0.58, 0.25, 0.3]} color="#c6f54a" intensity={6} distance={3.2} decay={2} />
      </group>

      <group ref={heapRef} position={[-1.18, 0, 0]} visible={false}>
        {JUNK.map((piece) => (
          <mesh key={piece.position.join(":")} position={piece.position} rotation={piece.rotation}>
            <boxGeometry args={piece.args} />
            <meshStandardMaterial color={piece.color} roughness={0.9} />
          </mesh>
        ))}
      </group>
      <group ref={fr4Ref} visible={false}>
        <RoundedBox args={[1.6, 0.07, 1]} radius={0.02} smoothness={2} bevelSegments={1}>
          <meshStandardMaterial map={textures.fr4} color="#ffffff" roughness={0.55} />
        </RoundedBox>
        <mesh position={[-0.15, 0.05, -0.12]}>
          <boxGeometry args={[0.55, 0.012, 0.04]} />
          <meshStandardMaterial color="#d4b15a" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0.2, 0.05, 0.1]}>
          <boxGeometry args={[0.04, 0.012, 0.4]} />
          <meshStandardMaterial color="#d4b15a" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[-0.28, 0.08, 0.05]}>
          <boxGeometry args={[0.28, 0.06, 0.22]} />
          <meshStandardMaterial color="#1a1c1a" roughness={0.6} />
        </mesh>
      </group>

      {labelsReady ? (
        <>
          <Html position={[-1.18, 1.15, 0.2]} center zIndexRange={[12, 8]} pointerEvents="none">
            <div
              className={`bg-ink/80 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap text-beige/70 uppercase ${showSplit ? "opacity-100" : "opacity-0"}`}
            >
              FR-4
            </div>
          </Html>
          <Html position={[1.12, 1.05, 0.2]} center zIndexRange={[12, 8]} pointerEvents="none">
            <div
              className={`border border-lime/40 bg-forest/85 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-lime uppercase ${showSplit ? "opacity-100" : "opacity-0"}`}
            >
              Bisket
            </div>
          </Html>
        </>
      ) : null}

      <group ref={chunkGroup} visible={false}>
        {CHUNKS.map((chunk, index) => (
          <mesh
            key={`${chunk.x}:${chunk.z}`}
            ref={(node) => {
              chunkRefs.current[index] = node;
            }}
            position={[chunk.x, 0.18, chunk.z]}
          >
            <boxGeometry args={[chunk.w, 0.06, chunk.d]} />
            <meshStandardMaterial color="#6e8148" roughness={0.8} />
          </mesh>
        ))}
      </group>

      <group ref={soilRef} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[2.3, 28]} />
          <meshStandardMaterial color="#3a2a1c" roughness={1} />
        </mesh>
        <mesh position={[-0.4, 0.05, 0.3]} rotation={[0.2, 0.4, 0.3]}>
          <boxGeometry args={[0.22, 0.08, 0.16]} />
          <meshStandardMaterial color="#4a3424" roughness={1} />
        </mesh>
        <mesh position={[0.45, 0.04, -0.2]} rotation={[-0.2, 0.2, -0.4]}>
          <boxGeometry args={[0.18, 0.07, 0.14]} />
          <meshStandardMaterial color="#2e2118" roughness={1} />
        </mesh>
      </group>
      <group ref={sproutRef} visible={false}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.018, 0.032, 0.56, 6]} />
          <meshStandardMaterial color="#3f6b32" roughness={0.7} />
        </mesh>
        <mesh position={[-0.12, 0.4, 0]} rotation={[0, 0, 0.95]}>
          <coneGeometry args={[0.09, 0.28, 4]} />
          <meshStandardMaterial color="#6ea84a" roughness={0.6} />
        </mesh>
        <mesh position={[0.12, 0.48, 0.02]} rotation={[0.15, 0.3, -0.85]}>
          <coneGeometry args={[0.08, 0.24, 4]} />
          <meshStandardMaterial color="#8fbf3a" roughness={0.6} />
        </mesh>
        <mesh position={[0.02, 0.62, 0]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[0.07, 0.2, 4]} />
          <meshStandardMaterial color="#b4f01b" roughness={0.45} />
        </mesh>
      </group>

    </>
  );
}
