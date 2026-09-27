"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { lerp, smoothstep } from "@/components/story/math";
import { storyPhotoSources } from "@/components/story/photos";
import { storyTime } from "@/components/story/timeline";
import { makeGlowTexture } from "@/components/story/textures";

type PlateMaps = {
  fibre: THREE.Texture;
  blur: THREE.Texture;
  burn: THREE.Texture;
  rice: THREE.Texture;
  sheet: THREE.Texture;
};

const _dir = new THREE.Vector3();
const _white = new THREE.Color("#ffffff");
const _dusk = new THREE.Color("#c4784a");
const _rice = new THREE.Color("#ffffff");

function useStoryPhotos() {
  const [photos, setPhotos] = useState<PlateMaps | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const sources = storyPhotoSources(mobile);
    const loader = new THREE.TextureLoader();
    const loaded: Partial<PlateMaps> = {};
    let pending = Object.keys(sources).length;
    let dropped = false;
    let published = false;

    const finish = () => {
      pending -= 1;
      if (dropped || pending > 0) return;
      if (loaded.fibre && loaded.blur && loaded.burn && loaded.rice && loaded.sheet) {
        published = true;
        setPhotos(loaded as PlateMaps);
      }
    };

    (Object.keys(sources) as Array<keyof typeof sources>).forEach((key) => {
      loader.load(
        sources[key],
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 8;
          loaded[key] = texture;
          finish();
        },
        undefined,
        () => finish(),
      );
    });

    return () => {
      dropped = true;
      if (!published) Object.values(loaded).forEach((texture) => texture?.dispose());
    };
  }, []);

  return photos;
}

function placeCover(mesh: THREE.Mesh, camera: THREE.PerspectiveCamera, zoom: number) {
  const distance = 0.72;
  camera.getWorldDirection(_dir);
  mesh.position.copy(camera.position).addScaledVector(_dir, distance);
  mesh.quaternion.copy(camera.quaternion);
  const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance * zoom;
  const width = height * (camera.aspect || 1);
  mesh.scale.set(Math.max(width, 0.001), Math.max(height, 0.001), 1);
}

function setPlate(mesh: THREE.Mesh | null, opacity: number, depthTest: boolean) {
  if (!mesh) return;
  const material = mesh.material as THREE.MeshBasicMaterial;
  material.opacity = opacity;
  material.depthTest = depthTest;
  mesh.visible = opacity > 0.02;
}

export function CinematicPlates({ progressRef }: { progressRef: RefObject<number> }) {
  const photos = useStoryPhotos();
  const glow = useState(() => makeGlowTexture())[0];
  const fibreRef = useRef<THREE.Mesh>(null);
  const blurRef = useRef<THREE.Mesh>(null);
  const burnRef = useRef<THREE.Mesh>(null);
  const riceRef = useRef<THREE.Mesh>(null);
  const sheetRef = useRef<THREE.Mesh>(null);
  const flareRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    const cam = camera as THREE.PerspectiveCamera;
    const t = storyTime(progressRef.current);

    const fibreIn = smoothstep(0.4, 0.58, t);
    const fibreHold = 1 - smoothstep(0.7, 0.84, t);
    const fibreOpacity = fibreIn * fibreHold;
    const blurMix = smoothstep(0.58, 0.8, t);
    const sharp = fibreOpacity * (1 - blurMix * 0.8);
    const blur = fibreOpacity * lerp(0.12, 0.9, blurMix);
    const burn = smoothstep(0.66, 0.76, t) * (1 - smoothstep(0.94, 1.08, t));
    const rice = smoothstep(0.9, 1.02, t) * (1 - smoothstep(1.08, 1.26, t));
    const sheet = smoothstep(2.72, 2.98, t) * (1 - smoothstep(3.22, 3.52, t));
    const flare =
      Math.max(
        smoothstep(0.18, 0.32, t) * (1 - smoothstep(0.4, 0.55, t)) * 0.35,
        smoothstep(0.64, 0.76, t) * (1 - smoothstep(0.84, 0.96, t)) * 0.55,
        smoothstep(0.9, 1.0, t) * (1 - smoothstep(1.08, 1.2, t)) * 0.4,
        sheet * 0.22,
      );

    const fibreZoom = lerp(1.04, 1.58, smoothstep(0.4, 0.82, t));
    const burnZoom = lerp(1.1, 1.42, smoothstep(0.66, 1.02, t));
    const riceZoom = lerp(1.24, 1.02, smoothstep(0.92, 1.24, t));
    const sheetZoom = lerp(1.04, 1.3, smoothstep(2.72, 3.45, t));

    if (fibreRef.current && sharp > 0.02) placeCover(fibreRef.current, cam, fibreZoom);
    if (blurRef.current && blur > 0.02) placeCover(blurRef.current, cam, fibreZoom * 1.08);
    if (burnRef.current && burn > 0.02) placeCover(burnRef.current, cam, burnZoom);
    if (riceRef.current && rice > 0.02) placeCover(riceRef.current, cam, riceZoom);
    if (sheetRef.current && sheet > 0.02) placeCover(sheetRef.current, cam, sheetZoom);
    if (flareRef.current && flare > 0.02) placeCover(flareRef.current, cam, 1.65);

    setPlate(fibreRef.current, sharp, sharp < 0.88);
    setPlate(blurRef.current, blur, false);
    setPlate(burnRef.current, burn, false);
    setPlate(riceRef.current, rice, false);
    setPlate(sheetRef.current, sheet, false);
    setPlate(flareRef.current, flare, false);

    if (riceRef.current) {
      const warm = smoothstep(1.02, 1.24, t);
      _rice.copy(_white).lerp(_dusk, warm);
      (riceRef.current.material as THREE.MeshBasicMaterial).color.copy(_rice);
    }
  });

  if (!photos) return null;

  return (
    <>
      <mesh ref={fibreRef} visible={false} renderOrder={2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={photos.fibre} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={blurRef} visible={false} renderOrder={3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={photos.blur} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={burnRef} visible={false} renderOrder={4}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={photos.burn} transparent depthWrite={false} toneMapped={false} color="#ffe6cc" />
      </mesh>
      <mesh ref={riceRef} visible={false} renderOrder={5}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={photos.rice} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={sheetRef} visible={false} renderOrder={6}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={photos.sheet} transparent depthWrite={false} toneMapped={false} color="#cbb892" />
      </mesh>
      <mesh ref={flareRef} visible={false} renderOrder={7}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          color="#ffc48a"
        />
      </mesh>
    </>
  );
}
