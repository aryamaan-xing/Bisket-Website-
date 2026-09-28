import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import {
  BuyerConcerns,
  QualificationRoadmap,
  Resources,
  TargetApplications,
  TrialSteps,
} from "@/components/FabricatorSections";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "For PCB fabricators",
  description:
    "Evaluate Bisket, a bio-based FR-4 alternative, in a side-by-side trial on your existing line: process compatibility, yield, cost and supply. Qualification roadmap and resources.",
  alternates: { canonical: "/fabricators" },
};

const secondary = [
  "Made from crop residue that is otherwise often burned in the field, helping tackle stubble burning.",
  "Halogen-free and glass-fibre-free, designed for a controlled end-of-life.",
  "A domestic, India-based supply chain for PCB laminates.",
];

export default function FabricatorsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-beige">
        <Image
          src="/images/product-pcb-board.png"
          alt="Bisket bio-based PCB panel"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/50" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            For PCB fabricators and OEMs
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            A next-generation FR-4 alternative, designed for your existing line.
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-beige/80 md:text-lg">
            Bisket is a bio-based laminate for circular electronics manufacturing. Our
            design goal: run on existing FR-4 lines with no new capex and no retraining.
            We&apos;ll show you on your own line.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request a trial</ButtonLink>
            <ButtonLink href="#qualification" variant="secondary">
              Qualification roadmap
            </ButtonLink>
          </div>
        </div>
      </section>

      <BuyerConcerns />
      <TrialSteps />
      <TargetApplications />
      <QualificationRoadmap />
      <Resources />

      <section className="bg-beige-deep/60" aria-labelledby="secondary-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">
              Also on the balance sheet
            </p>
            <h2
              id="secondary-heading"
              className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-forest md:text-3xl"
            >
              Sustainability, as a bonus for your OEM customers.
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {secondary.map((line) => (
              <li key={line} className="border-l-2 border-lime pl-4 text-sm leading-relaxed text-forest/75">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
