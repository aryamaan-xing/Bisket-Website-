import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";

const team = [
  {
    name: "Aryamaan Singh",
    role: "Co-founder & CEO",
    line: "Product, strategy, commercialization, and ecosystem.",
    initials: "AS",
  },
  {
    name: "Shereena P. Joy",
    role: "Co-founder & CTO",
    line: "Inventor and technology leadership.",
    initials: "SJ",
  },
  {
    name: "Dr. Prasana Kartik",
    role: "Senior Scientist",
    line: "Materials research and technical development.",
    initials: "PK",
  },
  {
    name: "Rohith Sharma",
    role: "Co-founder & COO",
    line: "Operations and execution.",
    initials: "RS",
  },
];

export const metadata = {
  title: "Our team",
};

export default function TeamPage() {
  return (
    <>
      <section className="bg-beige">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-soft">
              Our team
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-forest md:text-5xl">
              Building materials for a more circular electronics industry.
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.06}>
                <div className="group">
                  <div className="flex aspect-[4/5] items-end bg-forest p-6 transition-colors group-hover:bg-forest-mid">
                    <span className="text-5xl font-semibold text-lime/90">{person.initials}</span>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-forest">{person.name}</h2>
                  <p className="mt-1 text-sm font-medium text-purple">{person.role}</p>
                  <p className="mt-2 text-sm text-forest/65">{person.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest text-beige">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-8">
          <p className="text-xl font-medium tracking-tight md:text-2xl">
            Work with the people building it.
          </p>
          <ButtonLink href="/contact">Partner with us</ButtonLink>
        </div>
      </section>
    </>
  );
}
