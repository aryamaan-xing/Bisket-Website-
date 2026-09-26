"use client";

import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import { OPENING_CAMERA, StoryWorld } from "@/components/story/StoryWorld";

export function StoryCanvas({
  progressRef,
  active,
  onReady,
}: {
  progressRef: RefObject<number>;
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{
        position: [...OPENING_CAMERA.position],
        fov: OPENING_CAMERA.fov,
        near: 0.08,
        far: 60,
      }}
      gl={{ antialias: true, alpha: false, stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor("#0c1a14", 1);
      }}
    >
      <StoryWorld progressRef={progressRef} onReady={onReady} />
    </Canvas>
  );
}
