"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { ButtonLink } from "@/components/ButtonLink";

const recognition = [
  "K-Tech Elevate",
  "SusCrunch Big Pi",
  "C-CAMP",
  "NIDHI PRAYAS",
  "Carbon Zero Challenge",
];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export function ParallaxHome() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-beige">
      <Hero reduce={!!reduce} />
      <ImpactChapter
        reduce={!!reduce}
        eyebrow="Impact"
        title="E-waste has nowhere good to go."
        image="/images/impact-ewaste.png"
        imageAlt="Discarded circuit boards representing electronic waste"
        align="left"
        accent="lime"
      />
      <ImpactChapter
        reduce={!!reduce}
        eyebrow="Impact"
        title="Crop residue is still burned."
        image="/images/impact-crop-residue.png"
        imageAlt="Agricultural crop residue in a field at dusk"
        align="right"
        accent="purple"
      />
      <Transformation reduce={!!reduce} />
      <ProductReveal reduce={!!reduce} />
      <Proof />
      <ClosingCta />
    </div>
  );
}

function Hero({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden bg-forest text-beige"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-biomass-pcb.png"
          alt="Agricultural biomass beside a bio-based PCB substrate"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/70 to-forest/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/40" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24"
      >
        <div className="max-w-xl">
          <Image
            src="/logo-light.png"
            alt="Bisket Labs"
            width={280}
            height={42}
            className="mb-8 h-10 w-auto md:h-12"
            priority
          />
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-beige md:text-5xl lg:text-6xl">
            Electronics, engineered from biomass.
          </h1>
          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-beige/80 md:text-lg">
            Bio-based PCB substrates from agricultural biomass — built for real
            electronics manufacturing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Partner with us</ButtonLink>
            <ButtonLink href="/technology" variant="secondary">
              See the technology
            </ButtonLink>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-beige/50">
          Scroll the story
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-lime to-transparent" />
      </div>
    </section>
  );
}

function ImpactChapter({
  reduce,
  eyebrow,
  title,
  image,
  imageAlt,
  align,
  accent,
}: {
  reduce: boolean;
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  align: "left" | "right";
  accent: "lime" | "purple";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useParallax(scrollYProgress, reduce ? 0 : 120);
  const textY = useParallax(scrollYProgress, reduce ? 0 : -40);

  const accentClass = accent === "lime" ? "text-lime" : "text-purple-soft";

  return (
    <section ref={ref} className="relative min-h-[85svh] overflow-hidden bg-ink">
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-125">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className={`absolute inset-0 ${
            align === "left"
              ? "bg-gradient-to-r from-forest/95 via-forest/75 to-forest/25"
              : "bg-gradient-to-l from-forest/95 via-forest/75 to-forest/25"
          }`}
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-6xl items-center px-5 py-24 md:px-8">
        <motion.div
          style={{ y: textY }}
          className={`max-w-md ${align === "right" ? "md:ml-auto md:text-right" : ""}`}
        >
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-beige md:text-5xl">
            {title}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

function Transformation({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-80, 80]);
  const boardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7], [0.4, 1, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-beige py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <motion.div style={{ opacity }} className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">
            The shift
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-forest md:text-4xl">
            We turn agricultural biomass into engineered electronic substrates.
          </h2>
          <ol className="mt-10 space-y-4">
            {["Biomass", "Resin", "Board", "Electronics"].map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-xs font-semibold text-lime">
                  {i + 1}
                </span>
                <span className="text-sm font-medium tracking-wide text-forest">{step}</span>
                {i < 3 ? (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-lime via-purple-soft to-transparent sm:block" />
                ) : null}
              </li>
            ))}
          </ol>
        </motion.div>

        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-[-12%] ">
            <Image
              src="/images/product-resin-laminate.png"
              alt="Bio-based resin sample beside copper-clad laminate"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: boardY }}
            className="absolute bottom-4 right-4 h-36 w-36 overflow-hidden border border-beige/40 shadow-2xl md:h-44 md:w-44"
          >
            <Image
              src="/images/product-pcb-board.png"
              alt="Finished bio-based PCB prototype"
              fill
              sizes="176px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductReveal({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [100, -100]);
  const scale = useTransform(scrollYProgress, [0.2, 0.55], reduce ? [1, 1] : [1.08, 1]);

  return (
    <section ref={ref} className="relative min-h-[90svh] overflow-hidden bg-forest">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/product-working-electronics.png"
          alt="Working electronics on a bio-based PCB substrate"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/55 to-forest/30" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-6xl flex-col justify-end px-5 pb-20 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
          In the real world
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-beige md:text-5xl">
          From laboratory resin to working electronics.
        </h2>
        <p className="mt-4 max-w-md text-sm font-light text-beige/75 md:text-base">
          Single-layer boards demonstrated. Two-layer in development. Built with PCB
          partners in Bengaluru and Chennai.
        </p>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="bg-forest text-beige">
      <div className="section-rule opacity-40" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
          Recognised by
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          {recognition.map((name) => (
            <span key={name} className="text-sm font-medium tracking-wide text-beige/85 md:text-base">
              {name}
            </span>
          ))}
        </div>
        <p className="mt-10 inline-flex items-center gap-3 border-l-2 border-purple-soft pl-4 text-sm text-beige/70">
          <span className="font-semibold text-lime">100+</span>
          PCB fabrication iterations with manufacturing partners
        </p>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="bg-beige">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">
            Based in
          </p>
          <p className="mt-3 text-2xl font-semibold text-forest">Bangalore · Chennai</p>
          <p className="mt-3 max-w-sm text-sm text-forest/65">
            Investors and OEMs — let&apos;s qualify the next board together.
          </p>
        </div>
        <ButtonLink href="/contact">Partner with us</ButtonLink>
      </div>
    </section>
  );
}
