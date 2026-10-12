import { rating, testimonials } from "@/content/offer";
import { SplitReveal } from "../fx/SplitReveal";

function Stars({ className }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className ?? ""}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-[1em]">
          <path fill="currentColor" d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  );
}

/** The studio's own rating up top, then reviews on a slow double band. */
export function Proof() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="overflow-hidden py-16 md:py-40" aria-labelledby="proof-title">
      <div className="grid gap-10 px-5 md:grid-cols-12 md:px-8">
        <SplitReveal as="h2" id="proof-title" className="display text-[clamp(3rem,7.6vw,8rem)] md:col-span-7">
          Ils nous
          <br />
          ont fait
          <br />
          confiance
        </SplitReveal>
        <div className="flex items-end gap-5 self-end rounded-[16px] border border-line bg-ink-2 p-6 md:col-span-5 md:justify-self-end">
          <p className="display tabular text-[5.5rem] leading-[0.8] text-lime">{rating.score}</p>
          <div className="pb-1">
            <Stars className="text-xl text-lime" />
            <p className="mt-2 text-bone">
              {rating.count} avis {rating.source}
            </p>
            <p className="sr-only">
              Note de {rating.score} sur 5 sur {rating.count} avis
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-4 md:mt-24" aria-label="Avis clients">
        {[0, 1].map((r) => (
          <div key={r} className="group flex overflow-hidden" aria-hidden={r === 1}>
            <ul
              className={`flex w-max shrink-0 gap-4 pr-4 [animation:marquee_70s_linear_infinite] group-hover:[animation-play-state:paused] ${
                r === 1 ? "[animation-direction:reverse]" : ""
              }`}
            >
              {[...row, ...row].map((t, i) => (
                <li key={i} className="flex w-[min(82vw,440px)] shrink-0 flex-col rounded-[16px] border border-line bg-ink-2 p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-lime font-medium text-ink">{t.who[0]}</span>
                    <span className="flex-1 text-sm">
                      <span className="block font-medium text-bone">{t.who}</span>
                      <span className="text-bone-dim">{t.role}</span>
                    </span>
                  </div>
                  <p className="mt-5 flex items-center gap-3 text-sm text-bone-dim">
                    <Stars className="text-base text-lime" />
                    {t.when}
                  </p>
                  <blockquote className="mt-3 text-lg leading-snug text-bone">{t.quote}</blockquote>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
