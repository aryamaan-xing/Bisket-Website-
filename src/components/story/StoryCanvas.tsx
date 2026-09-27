"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, type RefObject } from "react";
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
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  return (
    <Canvas
      className="h-full w-full"
      style={{ width: "100%", height: "100%", touchAction: "pan-y", pointerEvents: "none" }}
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{
        position: [...OPENING_CAMERA.position],
        fov: OPENING_CAMERA.fov,
        near: 0.035,
        far: 60,
      }}
      gl={{
        antialias: true,
        alpha: false,
        stencil: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#0c1a14", 1);
      }}
    >
      <PerformanceMonitor
        ms={250}
        iterations={10}
        flipflops={2}
        bounds={() => [28, 50]}
        onDecline={() => setDpr((current) => (current[1] === 1.25 ? current : [1, 1.25]))}
        onIncline={() => setDpr((current) => (current[1] === 2 ? current : [1, 2]))}
      />
      <StoryWorld progressRef={progressRef} onReady={onReady} />
    </Canvas>
  );
}
