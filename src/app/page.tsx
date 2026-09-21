import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { HeroVisual } from "@/components/HeroVisual";
import { Journey } from "@/components/Journey";
import { Reveal } from "@/components/Reveal";

const recognition = [
  "K-Tech Elevate",
  "SusCrunch Big Pi",
  "C-CAMP",
  "NIDHI PRAYAS",
  "Carbon Zero Challenge",
];

export default function HomePage() {
  return (
    <>
      {/* Hero — one composition, brand-first */}
      <section className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden bg-forest text-beige">
        <div className="absolute inset-0">
          <HeroVisual />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-end px-5 pb-14 pt-24 md:justify-center md:px-8 md:pb-20 md:pt-16">
          <div className="max-w-xl">
            <Image
              src="/logo.png"
              alt="Bisket Labs"
              width={280}
              height={93}
              className="mb-8 h-12 w-auto brightness-0 invert md:h-14"
              priority
            />
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-beige md:text-5xl lg:text-6xl">
              Electronics, engineered from biomass.
            </h1>
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-beige/75 md:text-lg">
              Bio-based PCB substrates for real electronics manufacturing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Partner with us</ButtonLink>
              <ButtonLink href="/technology" variant="secondary">
                See the technology
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Twin problem */}
      <section className="bg-beige">
        <div className="section-rule" />
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <Reveal className="border-b border-forest/10 px-5 py-16 md:border-b-0 md:border-r md:px-8 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
              The problem
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-forest md:text-3xl">
              E-waste has nowhere good to go.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="px-5 py-16 md:px-8 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
              And
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-forest md:text-3xl">
              Crop residue is still burned.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Solution + journey */}
      <section className="bg-beige-deep/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-forest md:text-4xl">
              We turn agricultural biomass into engineered electronic substrates.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <Journey />
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-forest text-beige">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              Recognised by
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {recognition.map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium tracking-wide text-beige/85 md:text-base"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-10 inline-flex items-center gap-3 border-l-2 border-purple-soft pl-4 text-sm text-beige/70">
              <span className="text-lime font-semibold">100+</span>
              PCB fabrication iterations with manufacturing partners
            </p>
          </Reveal>
        </div>
      </section>

      {/* Presence + CTA */}
      <section className="bg-beige">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
              Based in
            </p>
            <p className="mt-3 text-2xl font-semibold text-forest">
              Bangalore · Chennai
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ButtonLink href="/contact">Partner with us</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
