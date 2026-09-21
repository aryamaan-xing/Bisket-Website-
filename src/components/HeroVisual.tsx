"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden md:min-h-0">
      <motion.div
        className="absolute inset-0 hero-mesh"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-grain" />

      {/* Abstract board + biomass suggestion */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden
      >
        <g stroke="#b4f01b" strokeWidth="1.2" opacity="0.7">
          <path d="M120 120h180v120H120z" />
          <path d="M140 150h40M140 170h60M140 190h28" />
          <circle cx="260" cy="160" r="6" fill="#b4f01b" stroke="none" />
          <path d="M266 160h80v40h-40" />
          <circle cx="346" cy="200" r="5" fill="#7a568f" stroke="none" />
        </g>
        <g stroke="#f0ebe1" strokeWidth="1" opacity="0.35">
          <path d="M420 80c40 60 20 120-10 160s-20 90 30 140" />
          <path d="M460 90c30 50 40 100 10 150s10 80 40 120" />
          <path d="M500 100c20 70 50 90 20 150" />
        </g>
        <rect
          x="480"
          y="280"
          width="220"
          height="160"
          rx="2"
          stroke="#b4f01b"
          strokeWidth="1.5"
          fill="color-mix(in srgb, #142e24 60%, transparent)"
        />
        <path
          d="M500 320h60M500 340h90M500 360h40M580 320h40M620 340v40"
          stroke="#b4f01b"
          strokeWidth="2"
        />
        <circle cx="640" cy="380" r="8" fill="#5c3d6e" />
      </svg>

      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
        <p className="max-w-xs text-sm font-medium tracking-wide text-beige/85">
          Agricultural biomass → engineered electronic substrate
        </p>
      </div>
    </div>
  );
}
