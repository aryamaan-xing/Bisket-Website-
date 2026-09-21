import Image from "next/image";
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
  description:
    "From biomass to circuit board — bio-based PCB substrates engineered for real electronics manufacturing.",
};

export default function TechnologyPage() {
  return (
    <>
      <section className="relative min-h-[60svh] overflow-hidden bg-forest text-beige">
        <Image
          src="/images/product-resin-laminate.png"
          alt="Bio-based resin and laminate"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/50" />
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
          <Reveal delay={0.08} className="relative min-h-[280px] overflow-hidden">
            <Image
              src="/images/product-pcb-board.png"
              alt="Bisket bio-based PCB prototype"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-beige">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-lime">
                Technical depth
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-beige/85">
                Material data is shared privately — not published as a public datasheet.
              </p>
              <div className="mt-5">
                <ButtonLink href="/contact">Request a technical conversation</ButtonLink>
              </div>
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
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
              Prototypes
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-forest md:text-3xl">
              Boards that already run.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                src: "/images/product-pcb-board.png",
                caption: "Single-layer bio-based PCB",
              },
              {
                src: "/images/prototype-led.png",
                caption: "LED / thermal demo",
              },
              {
                src: "/images/prototype-sensor.png",
                caption: "Sensor board",
              },
              {
                src: "/images/product-working-electronics.png",
                caption: "Working electronics",
              },
            ].map((item, i) => (
              <Reveal key={item.caption} delay={i * 0.05}>
                <figure>
                  <div className="relative aspect-square overflow-hidden bg-forest">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-forest/70">{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest">
        <Image
          src="/images/product-working-electronics.png"
          alt="Working electronics on bio-based substrate"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-forest/70" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
          <Reveal>
            <p className="mx-auto max-w-lg text-base text-beige/80">
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
