import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";

const moments = [
  {
    title: "Flame-retardant and heat-stable",
    line: "UL94 V-0 rated, with a measured Tg of 262 °C and copper peel strength up to 0.98 N/mm.",
  },
  {
    title: "Made to manufacture",
    line: "Processed with PCB fabrication partners in Bengaluru and Chennai — not just in the lab.",
  },
  {
    title: "Built for low-power, single-layer boards",
    line: "A lower-impact alternative to conventional laminates for toys and STEM kits, medical disposables and IoT — qualified application by application.",
  },
];

export const metadata = {
  title: "Our technology",
  description:
    "A lignocellulosic, UL94 V-0 single-layer PCB laminate from crop residue — Tg 262 °C, controlled end-of-life. Developed at IIT Madras.",
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
              An IIT Madras spinout. Our proprietary lignocellulosic resin turns
              agricultural residue into a single-layer PCB laminate — about 84% organic
              by volume, with a controlled end-of-life.
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
                <p className="mt-1 text-sm text-forest/65">Working prototypes running real circuits</p>
              </li>
              <li className="border-l-2 border-purple pl-4">
                <p className="font-semibold text-forest">Two-layer in development</p>
                <p className="mt-1 text-sm text-forest/65">Early builds, under development</p>
              </li>
              <li className="border-l-2 border-forest/30 pl-4">
                <p className="font-semibold text-forest">~84% organic by volume</p>
                <p className="mt-1 text-sm text-forest/65">Lignocellulosic resin system, UL94 V-0</p>
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
                Want the full dataset? We share detailed material data privately with evaluation partners.
              </p>
              <div className="mt-5">
                <ButtonLink href="/contact">Request technical data</ButtonLink>
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
              Boards that already work.
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
                caption: "LED demo board",
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
              Building low-power, single-layer electronics? Tell us about your board and
              we&apos;ll tell you honestly whether Bisket fits.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact">Evaluate Bisket for your board</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
