import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact us",
};

export default function ContactPage() {
  return (
    <section className="bg-beige">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
            Contact us
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest md:text-5xl">
            Let&apos;s build the next board together.
          </h1>
          <p className="mt-5 max-w-sm text-base font-light leading-relaxed text-forest/70">
            Investors, OEMs, and partners — tell us who you are. We&apos;ll share the
            right next materials privately.
          </p>

          <div className="mt-10 space-y-6 text-sm">
            <div>
              <p className="font-semibold text-forest">Email</p>
              <a
                href="mailto:bisket.innovation@gmail.com"
                className="mt-1 inline-block text-forest/70 transition-colors hover:text-purple"
              >
                bisket.innovation@gmail.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-forest">Phone</p>
              <p className="mt-1 text-forest/70">
                <a href="tel:+918884888454" className="hover:text-purple">
                  +91 88848 88454
                </a>
                {" / "}
                <a href="tel:+919453981393" className="hover:text-purple">
                  +91 94539 81393
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-forest">Locations</p>
              <p className="mt-1 text-forest/70">Bangalore / KGF</p>
              <p className="text-forest/70">Chennai</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
