import { specs } from "@/lib/specs";

const impact = [
  {
    title: "Crop residue, put to work",
    body: "Our resin system has been formulated and tested with rice straw, sugarcane bagasse, bamboo and napier grass: agricultural residues that are often burned or left to rot.",
  },
  {
    title: "No glass fibre",
    body: "The laminate needs no woven fibreglass or fossil epoxy, which reduces reliance on imported glass fabric and petrochemical resins.",
  },
  {
    title: "Halogen-free, UL94 V-0",
    body: "Top-tier flame retardancy without the brominated flame retardants used in conventional FR-4.",
  },
  {
    title: "Controlled end-of-life",
    body: "Boards are designed with a planned end-of-life route from day one, instead of becoming e-waste that lingers in landfill.",
  },
  {
    title: "Ready for ecodesign rules",
    body: "The EU's Ecodesign for Sustainable Products Regulation (ESPR) is raising the bar on materials and circularity. A bio-based, halogen-free laminate helps OEMs get ahead of it.",
  },
  {
    title: "Made in India",
    body: "Made from Indian agricultural feedstock and processed with PCB fabrication partners in Bengaluru and Chennai, building a domestic supply chain for PCB laminates.",
  },
];

export function ImpactCards() {
  return (
    <section className="bg-ink text-beige" aria-labelledby="impact-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Also better for the planet</p>
        <h2
          id="impact-heading"
          className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl"
        >
          One material that takes on both problems.
        </h2>
        <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-beige/70">
          Bisket turns an agricultural waste stream into the base of the circuit board,
          then designs that board for a better ending.
        </p>
        <ul className="mt-12 grid gap-px bg-beige/10 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item, i) => (
            <li key={item.title} className="bg-ink p-6 md:p-8">
              <span className="text-xs font-semibold tabular-nums text-lime">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-beige">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-beige/65">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeSpecs() {
  return (
    <section className="bg-beige-deep/60" aria-labelledby="specs-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">Measured performance</p>
        <h2 id="specs-heading" className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-forest md:text-4xl">
          Bio-based, and tougher, lighter and more arc-resistant than FR-4.
        </h2>
        <dl className="mt-12 grid gap-px bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s) => (
            <div key={s.label} className="bg-beige p-6 md:p-8">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/55">{s.label}</dt>
              <dd className="mt-3">
                <span className="text-3xl font-semibold tracking-tight text-forest">{s.value}</span>
                {s.unit ? <span className="ml-1.5 text-base font-medium text-forest/60">{s.unit}</span> : null}
                <p className="mt-2 text-sm text-forest/65">{s.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
