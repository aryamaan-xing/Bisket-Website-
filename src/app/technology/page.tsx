import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";

const moments = [
  {
    title: "Built for heat",
    line: "Formulated for electronics that need higher thermal tolerance.",
  },
  {
    title: "Made to manufacture",
    line: "Developed with PCB partners in Bengaluru and Chennai — not only in the lab.",
  },
  {
    title: "An FR-4 alternative",
    line: "Designed as a lower-impact substrate alternative — qualified per application.",
  },
];

export const metadata = {
  title: "Our technology",
};

export default function TechnologyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-beige">
        <div className="absolute inset-0 hero-mesh opacity-80" />
        <div className="absolute inset-0 bg-grain" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              Our technology
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              From biomass to circuit board.
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-beige/75 md:text-lg">
              Born from materials research at IIT Madras — a proprietary resin from
              agricultural biomass, engineered into substrates for electronics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-forest md:text-3xl">
              Where we are now
            </h2>
            <ul className="mt-8 space-y-5">
              <li className="border-l-2 border-lime pl-4">
                <p className="font-semibold text-forest">Single-layer boards demonstrated</p>
                <p className="mt-1 text-sm text-forest/65">Functional prototypes in real circuits</p>
              </li>
              <li className="border-l-2 border-purple pl-4">
                <p className="font-semibold text-forest">Two-layer in development</p>
                <p className="mt-1 text-sm text-forest/65">Achieved and being optimized</p>
              </li>
              <li className="border-l-2 border-forest/30 pl-4">
                <p className="font-semibold text-forest">~80% bio-based</p>
                <p className="mt-1 text-sm text-forest/65">Current formulation direction</p>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-center bg-forest px-8 py-10 text-beige">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-lime">
              Technical depth
            </p>
            <p className="mt-4 text-lg font-light leading-relaxed text-beige/85">
              Material data is shared privately with partners evaluating qualification
              and deployment — not published as a public datasheet.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact">Request a technical conversation</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-deep/50">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {moments.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <h3 className="text-lg font-semibold text-forest">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest/70">{m.line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
          <Reveal>
            <p className="mx-auto max-w-lg text-base text-forest/70">
              Evaluating with OEMs across practical electronics — ask us where it fits
              your product.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact">Partner with us</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
