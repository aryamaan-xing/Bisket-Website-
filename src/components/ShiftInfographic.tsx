type Step = { label: string; detail: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const icons = {
  residue: (
    <Icon>
      <path {...stroke} d="M16 28V12M16 18c-4 0-7-3-7-8 4 0 7 3 7 8Zm0-4c4 0 7-3 7-8-4 0-7 3-7 8ZM6 28h20" />
    </Icon>
  ),
  laminate: (
    <Icon>
      <path {...stroke} d="M4 12 16 6l12 6-12 6-12-6Z" />
      <path {...stroke} d="m4 17 12 6 12-6M4 22l12 6 12-6" />
    </Icon>
  ),
  pcb: (
    <Icon>
      <rect {...stroke} x="5" y="5" width="22" height="22" rx="2" />
      <path {...stroke} d="M10 11h6v5h6M10 21h4M18 21h4" />
      <circle cx="10" cy="11" r="1.6" fill="currentColor" />
      <circle cx="22" cy="16" r="1.6" fill="currentColor" />
    </Icon>
  ),
  nature: (
    <Icon>
      <path {...stroke} d="M26 16a10 10 0 1 1-3-7.1" />
      <path {...stroke} d="M26 5v5h-5" />
      <path {...stroke} d="M16 21v-6m0 0c-2.5 0-4-1.7-4-4.5 2.5 0 4 1.7 4 4.5Zm0 0c2.5 0 4-1.7 4-4.5-2.5 0-4 1.7-4 4.5Z" />
    </Icon>
  ),
  fossil: (
    <Icon>
      <path {...stroke} d="M16 4c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15Z" />
      <path {...stroke} d="M11 24h10M13 19h6" />
    </Icon>
  ),
  landfill: (
    <Icon>
      <path {...stroke} d="M4 26h24M7 26l3-9 4 4 3-7 4 5 4 7" />
      <path {...stroke} d="m12 8 2 2m0-2-2 2M20 6l2 2m0-2-2 2" />
    </Icon>
  ),
};

const bisket: Step[] = [
  { label: "Crop residue", detail: "Rice straw, bagasse, bamboo, napier grass", icon: icons.residue },
  { label: "Bisket laminate", detail: "Lignocellulosic bio-resin, no glass fibre", icon: icons.laminate },
  { label: "Working PCB", detail: "Fabricated with PCB partners", icon: icons.pcb },
  { label: "Controlled end-of-life", detail: "A planned route back to nature", icon: icons.nature },
];

const fr4: Step[] = [
  { label: "Fossil resin + glass fibre", detail: "Petrochemical epoxy, woven fibreglass", icon: icons.fossil },
  { label: "FR-4 laminate", detail: "Often brominated flame retardants", icon: icons.laminate },
  { label: "PCB", detail: "Hard to separate at end of life", icon: icons.pcb },
  { label: "Landfill / e-waste", detail: "No good way back", icon: icons.landfill },
];

function Arrow({ tone }: { tone: "bisket" | "fr4" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center ${
        tone === "bisket" ? "text-lime-deep" : "text-forest/30"
      } h-6 md:h-auto md:w-8`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 md:rotate-0">
        <path {...stroke} strokeWidth={2} d="M4 12h15m-5-5 5 5-5 5" />
      </svg>
    </span>
  );
}

function Flow({
  title,
  tag,
  steps,
  tone,
}: {
  title: string;
  tag: string;
  steps: Step[];
  tone: "bisket" | "fr4";
}) {
  const isBisket = tone === "bisket";
  return (
    <div
      className={`relative p-5 md:p-7 ${
        isBisket ? "bg-forest text-beige" : "border border-dashed border-forest/25 bg-beige-deep/40 text-forest"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className={`text-sm font-semibold uppercase tracking-[0.2em] ${isBisket ? "text-lime" : "text-forest/60"}`}>
          {title}
        </h3>
        <span className={`text-xs ${isBisket ? "text-beige/60" : "text-forest/50"}`}>{tag}</span>
      </div>
      <ol className="mt-6 flex flex-col md:flex-row md:items-stretch" aria-label={`${title}: ${steps.map((s) => s.label).join(", then ")}`}>
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-col md:flex-1 md:flex-row">
            <div
              className={`flex flex-1 items-start gap-3 p-4 md:flex-col ${
                isBisket
                  ? i === steps.length - 1
                    ? "bg-lime text-ink"
                    : "bg-forest-mid"
                  : i === steps.length - 1
                    ? "bg-forest/10"
                    : "bg-surface"
              }`}
            >
              <span className={isBisket && i !== steps.length - 1 ? "text-lime" : isBisket ? "text-ink" : "text-forest/55"}>
                {step.icon}
              </span>
              <div>
                <p className="text-sm font-semibold leading-snug">{step.label}</p>
                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    isBisket ? (i === steps.length - 1 ? "text-ink/75" : "text-beige/65") : "text-forest/60"
                  }`}
                >
                  {step.detail}
                </p>
              </div>
            </div>
            {i < steps.length - 1 ? <Arrow tone={tone} /> : null}
          </li>
        ))}
      </ol>
      {isBisket ? (
        <p className="mt-4 flex items-center gap-2 text-xs text-beige/60">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-lime" aria-hidden="true">
            <path {...stroke} d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />
          </svg>
          Circular: residue in, back to nature out.
        </p>
      ) : (
        <p className="mt-4 text-xs text-forest/50">Linear: take, make, discard.</p>
      )}
    </div>
  );
}

export function ShiftInfographic() {
  return (
    <figure
      className="space-y-4"
      aria-labelledby="shift-infographic-caption"
    >
      <Flow title="Bisket" tag="Bio-based · halogen-free · glass-free" steps={bisket} tone="bisket" />
      <Flow title="Conventional FR-4" tag="Fossil-based · glass-reinforced" steps={fr4} tone="fr4" />
      <figcaption id="shift-infographic-caption" className="sr-only">
        Comparison of two material life cycles. Bisket: crop residue becomes a bio-based laminate,
        then a working PCB, then follows a controlled end-of-life back to nature. Conventional FR-4:
        fossil resin and glass fibre become a laminate, then a PCB, then end up in landfill as e-waste.
      </figcaption>
    </figure>
  );
}
