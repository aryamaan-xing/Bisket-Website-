import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";

const CONTACT_EMAIL = "founder@bisketlabs.com";

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/* ------------------------------------------------------------------ */
/* Buyer concerns: what a side-by-side trial on the fabricator's line proves */
/* ------------------------------------------------------------------ */

const concerns = [
  {
    title: "Process compatibility",
    question: "Can I run this on my existing line?",
    body: "Bisket is designed to run on existing FR-4 lines, with no new capex or retraining as the goal. In the trial we check lamination, imaging and etching, drilling and routing, and tool wear against your FR-4 baseline.",
  },
  {
    title: "Yield",
    question: "Will my yield drop?",
    body: "Same design, same line, same operators. We compare first-pass yield, scrap and rework directly with your FR-4 run, so you judge with your own numbers.",
  },
  {
    title: "Cost",
    question: "What does it cost per board?",
    body: "We look at cost per finished board on your line: material, cycle time and any process adjustments, not just sheet price.",
  },
  {
    title: "Supply",
    question: "Can you deliver when I need it?",
    body: "Our feedstock is Indian agricultural residue, processed with fabrication partners in Bengaluru and Chennai. We share sample availability and volume plans for your programme upfront.",
  },
];

export function BuyerConcerns({ id = "evaluation" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 bg-beige" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">
            For PCB fabricators
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-forest md:text-4xl"
          >
            What we&apos;ll prove together in a side-by-side trial on your line.
          </h2>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-forest/70">
            Bisket panels and your FR-4, same design, same line. You keep the data.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-px bg-forest/10 sm:grid-cols-2">
          {concerns.map((c, i) => (
            <li key={c.title} className="bg-beige p-6 md:p-8">
              <span className="text-xs font-semibold tabular-nums text-purple">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-forest">{c.title}</h3>
              <p className="mt-1 text-sm font-medium italic text-forest/75">&ldquo;{c.question}&rdquo;</p>
              <p className="mt-3 text-sm leading-relaxed text-forest/70">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trial steps                                                         */
/* ------------------------------------------------------------------ */

const trialSteps = [
  {
    title: "Share your board",
    body: "Tell us the design, stack-up and application. Single-layer, low-power boards fit best today.",
  },
  {
    title: "Receive evaluation panels",
    body: "We supply Bisket panels sized for your process, with handling guidance.",
  },
  {
    title: "Run side by side",
    body: "Build the same design on Bisket and on FR-4, on the same line.",
  },
  {
    title: "Review together",
    body: "Compare process behaviour, yield and cost per board, then decide on next steps.",
  },
];

export function TrialSteps() {
  return (
    <section className="bg-forest text-beige" aria-labelledby="trial-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
            How a trial works
          </p>
          <h2 id="trial-heading" className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Four steps, on your line.
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-px bg-beige/10 sm:grid-cols-2 lg:grid-cols-4">
          {trialSteps.map((s, i) => (
            <li key={s.title} className="bg-forest p-6">
              <span className="text-2xl font-semibold tabular-nums text-lime">{i + 1}</span>
              <h3 className="mt-3 font-semibold text-beige">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-beige/70">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ButtonLink href="/contact">Request a side-by-side trial</ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Target applications                                                 */
/* ------------------------------------------------------------------ */

const applications = [
  { title: "LED lighting", body: "Driver and module boards for low-power LED products." },
  { title: "IoT devices", body: "Sensor nodes, trackers and connected low-power electronics." },
  { title: "Wearables", body: "Where a lighter board matters: density 1.1–1.28 g/cm³ vs ~1.9 for FR-4." },
];

export function TargetApplications() {
  return (
    <section className="bg-beige-deep/60" aria-labelledby="applications-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">
            Target applications
          </p>
          <h2
            id="applications-heading"
            className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-forest md:text-3xl"
          >
            Built first for low-power electronics.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-forest/70">
            Single-layer boards are available now, a natural fit for low-power designs.
            Multilayer is in development; HDI, high-speed and automotive programmes are
            not our focus yet.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-px bg-forest/10 sm:grid-cols-3">
          {applications.map((a) => (
            <li key={a.title} className="bg-beige p-6">
              <h3 className="font-semibold text-forest">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest/70">{a.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Qualification roadmap                                               */
/* ------------------------------------------------------------------ */

type Qualification = { name: string; detail: string };

const achieved: Qualification[] = [
  { name: "UL94 V-0", detail: "Flame rating, achieved halogen-free" },
];

const inProgress: Qualification[] = [
  { name: "IPC-4101", detail: "Base material specification" },
  { name: "IPC-6012", detail: "Rigid board qualification and performance" },
  { name: "IPC-A-600", detail: "Printed board acceptability" },
  { name: "RoHS / REACH", detail: "Regulatory compliance for export markets" },
  { name: "Thermal cycling (IPC-TM-650)", detail: "Long-term thermal reliability" },
  { name: "CAF resistance", detail: "Conductive anodic filament reliability" },
  { name: "Solder float, 260 °C", detail: "Solder heat exposure" },
  { name: "LCA / carbon footprint", detail: "Life-cycle assessment" },
];

export function QualificationRoadmap({ id = "qualification" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 bg-ink text-beige" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
            Qualification roadmap
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Certifications: where we are, and what&apos;s next.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-beige/70">
            We publish status plainly. Items marked in progress or planned are not yet
            certified.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              Achieved
            </h3>
            <ul className="mt-4 space-y-3">
              {achieved.map((q) => (
                <li key={q.name} className="border-l-2 border-lime bg-beige/5 p-4">
                  <p className="font-semibold text-beige">{q.name}</p>
                  <p className="mt-1 text-sm text-beige/70">{q.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-beige/70">
              In progress / planned
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {inProgress.map((q) => (
                <li key={q.name} className="border-l-2 border-beige/25 bg-beige/5 p-4">
                  <p className="font-semibold text-beige">{q.name}</p>
                  <p className="mt-1 text-sm text-beige/70">{q.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Resources                                                           */
/* ------------------------------------------------------------------ */

const resources = [
  {
    title: "Whitepaper",
    body: "The material platform, how it is made, and how it compares with FR-4.",
    subject: "Whitepaper request",
  },
  {
    title: "Reliability test results",
    body: "Reports from completed tests, with updates as qualification progresses.",
    subject: "Reliability test results request",
  },
  {
    title: "Technical data for evaluation",
    body: "Detailed material data and processing guidance for your engineering team.",
    subject: "Technical data request",
  },
];

export function Resources({ id = "resources" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 bg-beige" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple">
            Resources
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-3 text-2xl font-semibold tracking-tight text-forest md:text-3xl"
          >
            Whitepapers and test results, on request.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-forest/70">
            We share documents directly with engineering and procurement teams. Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-forest underline decoration-lime decoration-2 underline-offset-4 hover:text-purple"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-px bg-forest/10 md:grid-cols-3">
          {resources.map((r) => (
            <li key={r.title} className="flex flex-col bg-beige p-6">
              <h3 className="font-semibold text-forest">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-forest/70">{r.body}</p>
              <a
                href={mailto(r.subject)}
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-purple hover:text-forest"
              >
                Request by email →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
