"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { PROOF_CALLOUTS, STORY_BEATS, STORY_CTA, STORY_NOTE } from "@/components/story/copy";
import { FrameArt } from "@/components/story/StoryFrames";

export function StoryFallback() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (getComputedStyle(list).display === "none") return;
      const cards = [...list.querySelectorAll<HTMLElement>(".story-stack-card")];
      const reduce = motion.matches;
      cards.forEach((card, index) => {
        const face = card.querySelector<HTMLElement>(".story-stack-face");
        if (!face) return;
        if (reduce) {
          face.style.removeProperty("--cover");
          return;
        }
        const next = cards[index + 1];
        if (!next) {
          face.style.setProperty("--cover", "0");
          return;
        }
        const current = card.getBoundingClientRect();
        const upcoming = next.getBoundingClientRect();
        if (current.height < 8) return;
        const cover = Math.min(1, Math.max(0, (current.bottom - upcoming.top) / current.height));
        face.style.setProperty("--cover", cover.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    motion.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="story-static bg-forest text-beige" aria-labelledby="story-static-heading">
      <h2 id="story-static-heading" className="sr-only">
        The Bisket story
      </h2>
      <ol ref={listRef} className="story-stack">
        {STORY_BEATS.map((beat, index) => (
          <li
            key={beat.title}
            className="story-stack-card"
            style={{ ["--stack" as string]: index }}
          >
            <div className="story-stack-face mx-auto grid w-full max-w-6xl items-center gap-5 px-5 py-8 sm:gap-8 sm:px-8 sm:py-12 md:grid-cols-2 md:gap-12">
              <div className="story-stack-art">
                <FrameArt beat={index} className="h-full" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-lime uppercase">
                  {String(index + 1).padStart(2, "0")} · {beat.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-beige sm:text-3xl md:text-4xl">
                  {beat.title}
                </h3>
                {index === 5 ? (
                  <ul className="mt-5 space-y-2">
                    {PROOF_CALLOUTS.map((item) => (
                      <li key={item} className="border-l-2 border-lime pl-3 text-sm text-beige/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {index === STORY_BEATS.length - 1 ? (
                  <div className="mt-6">
                    <ButtonLink href="/contact">{STORY_CTA}</ButtonLink>
                    <p className="mt-4 text-sm text-beige/70">{STORY_NOTE}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
