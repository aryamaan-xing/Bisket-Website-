import { ButtonLink } from "@/components/ButtonLink";
import { PROOF_CALLOUTS, STORY_BEATS, STORY_CTA, STORY_NOTE } from "@/components/story/copy";
import { FrameArt } from "@/components/story/StoryFrames";

export function StoryFallback() {
  return (
    <section className="story-static bg-forest text-beige" aria-labelledby="story-static-heading">
      <h2 id="story-static-heading" className="sr-only">
        The Bisket story
      </h2>
      <ol>
        {STORY_BEATS.map((beat, index) => (
          <li key={beat.title} className="border-t border-beige/10">
            <div className="mx-auto grid min-h-[80svh] max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2 md:gap-12 md:px-8 md:py-20">
              <FrameArt beat={index} />
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-lime uppercase">
                  {String(index + 1).padStart(2, "0")} · {beat.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-beige md:text-4xl">{beat.title}</h3>
                {index === 5 ? (
                  <ul className="mt-6 space-y-2">
                    {PROOF_CALLOUTS.map((item) => (
                      <li key={item} className="border-l-2 border-lime pl-3 text-sm text-beige/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {index === STORY_BEATS.length - 1 ? (
                  <div className="mt-8">
                    <ButtonLink href="/contact">{STORY_CTA}</ButtonLink>
                    <p className="mt-4 text-sm text-beige/70">{STORY_NOTE}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
