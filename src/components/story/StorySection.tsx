"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { PROOF_CALLOUTS, STORY_BEATS, STORY_CTA } from "@/components/story/copy";
import { BOARD_ON } from "@/components/story/media";
import { StoryFallback } from "@/components/story/StoryFallback";
import { StoryFilm, canPlayFilm } from "@/components/story/StoryFilm";
import { copyIndex, proofIndex } from "@/components/story/timeline";

export function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [proof, setProof] = useState(-1);
  const [film, setFilm] = useState(false);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;
    const next = copyIndex(value);
    setBeat((current) => (current === next ? current : next));
    const nextProof = proofIndex(value);
    setProof((current) => (current === nextProof ? current : nextProof));
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = media.matches;
      const filmOk = !reduced && canPlayFilm();
      setFilm(filmOk);
      if (!filmOk) setReady(false);
      document.documentElement.classList.toggle("story-force-static", !filmOk);
    };
    apply();
    media.addEventListener("change", apply);
    return () => {
      media.removeEventListener("change", apply);
      document.documentElement.classList.remove("story-force-static");
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const current = STORY_BEATS[beat];

  return (
    <>
      <section
        ref={ref}
        id="bisket-story"
        className="story-scroll relative h-[1250svh] touch-pan-y bg-forest"
        aria-labelledby="story-heading"
        data-story-beat={beat}
        data-canvas-ready={ready ? "true" : "false"}
      >
        <h2 id="story-heading" className="sr-only">
          The Bisket story
        </h2>
        <div ref={stageRef} className="story-stage sticky top-0 z-10 touch-pan-y overflow-hidden bg-forest">
          <div
            className={`absolute inset-0 ${ready ? "opacity-0" : "opacity-100"}`}
            aria-hidden="true"
          >
            <Image
              src={BOARD_ON}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {film ? <StoryFilm progressRef={progressRef} stageRef={stageRef} active={near} onReady={markReady} /> : null}

          <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(8,16,12,0.55)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[68%] bg-gradient-to-t from-forest via-forest/85 to-transparent sm:h-3/5 sm:via-forest/70" />

          <div className="pointer-events-none absolute inset-x-4 top-[max(4.25rem,env(safe-area-inset-top))] z-20 flex items-center justify-between sm:inset-x-6 sm:top-20 md:top-24 md:right-10 md:left-10">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-lime uppercase">The loop</p>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-beige/60 tabular-nums">
              {String(beat + 1).padStart(2, "0")}
              <span className="text-beige/35"> / 09</span>
            </p>
          </div>

          {proof >= 0 ? (
            <div
              key={proof}
              className="story-orbit pointer-events-none absolute top-[42%] left-1/2 z-20"
              style={{ animationDelay: `${-proof * 2.6}s` }}
            >
              <p className="max-w-[18rem] border-l-2 border-lime bg-forest/90 px-3 py-2 text-center text-xs leading-snug font-semibold text-beige shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:max-w-none sm:text-left sm:text-sm sm:whitespace-nowrap">
                {PROOF_CALLOUTS[proof]}
              </p>
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-10 md:px-12 md:pb-14">
            <div key={beat} className="story-beat-copy max-w-xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-lime uppercase">{current.eyebrow}</p>
              <p aria-live="polite" className="mt-3 text-[1.65rem] leading-[1.12] font-semibold tracking-tight text-balance text-beige drop-shadow-[0_2px_16px_rgba(0,0,0,0.72)] sm:text-3xl md:text-5xl">
                {current.title}
              </p>
              {beat === 0 ? (
                <p className="mt-5 text-[10px] font-semibold tracking-[0.25em] text-beige/50 uppercase">Scroll</p>
              ) : null}
              {beat === STORY_BEATS.length - 1 ? (
                <div className="pointer-events-auto mt-6">
                  <ButtonLink href="/contact">{STORY_CTA}</ButtonLink>
                </div>
              ) : null}
            </div>
          </div>

          <div className="pointer-events-none absolute top-1/2 right-5 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex" aria-hidden="true">
            {STORY_BEATS.map((item, index) => (
              <span
                key={item.eyebrow}
                className={`h-1.5 w-1.5 rounded-full ${index === beat ? "scale-125 bg-lime" : "bg-beige/30"}`}
              />
            ))}
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left bg-lime"
            style={{ scaleX }}
          />
        </div>
      </section>
      <StoryFallback />
    </>
  );
}
