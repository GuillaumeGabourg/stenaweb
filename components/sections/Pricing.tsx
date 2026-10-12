"use client";

import { care, pricing } from "@/content/offer";
import { SplitReveal } from "../fx/SplitReveal";
import { Pill } from "../ui";

/** Three offers; a light follows the pointer across each card's surface and border. */
export function Pricing() {
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  return (
    <section id="tarifs" className="px-5 py-16 md:px-8 md:py-40" aria-labelledby="pricing-title">
      <div className="mb-14 md:mb-20">
        <SplitReveal as="h2" id="pricing-title" className="display text-[clamp(3rem,9vw,8.5rem)]">
          Des prix
          <br />
          clairs
        </SplitReveal>
        <p className="mt-6 text-lg leading-snug text-bone-dim md:mt-8 md:text-xl">
          Un devis gratuit et détaillé, un prix fixé avant de commencer. Pas de mauvaise surprise.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricing.map((p) => (
          <article
            key={p.name}
            onPointerMove={track}
            className={`group relative flex flex-col overflow-hidden rounded-[16px] p-7 md:p-9 ${
              p.featured ? "bg-lime text-ink lg:-my-6 lg:py-14" : "bg-ink-2 text-bone"
            }`}
            style={{ ["--mx" as string]: "50%", ["--my" as string]: "-200px" }}
          >
            {/* pointer light on the surface */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(420px circle at var(--mx) var(--my), ${
                  p.featured ? "rgba(255,255,255,0.45)" : "rgba(197,255,51,0.09)"
                }, transparent 60%)`,
              }}
            />
            {/* pointer light on the border */}
            {!p.featured && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[16px] p-px"
                style={{
                  background: "radial-gradient(260px circle at var(--mx) var(--my), rgba(197,255,51,0.9), rgba(242,241,234,0.12) 70%)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            )}

            <div className="relative flex items-center justify-between">
              <h3 className="display text-3xl">{p.name}</h3>
              {p.featured && <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-lime">Recommandé</span>}
            </div>
            <p className={`relative mt-3 min-h-[3lh] text-[15px] leading-snug ${p.featured ? "text-ink/75" : "text-bone-dim"}`}>{p.pitch}</p>

            <p className="relative mt-8 flex items-baseline gap-2">
              {p.prefix && <span className="text-lg">{p.prefix}</span>}
              <span className="display tabular text-[clamp(4rem,7vw,6rem)]">{p.price}</span>
              <span className="text-2xl font-medium">€</span>
              <span className={`text-sm ${p.featured ? "text-ink/60" : "text-bone-dim"}`}>HT</span>
            </p>

            <ul className={`relative mt-8 flex-1 divide-y border-y ${p.featured ? "divide-ink/15 border-ink/15" : "divide-line border-line"}`}>
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 py-3 text-[15px]">
                  <svg viewBox="0 0 20 20" aria-hidden className={`mt-0.5 size-4 shrink-0 ${p.featured ? "" : "text-lime"}`}>
                    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="relative mt-8">
              <Pill href="/#contact" tone={p.featured ? "ink" : "ghost"}>
                Choisir {p.name}
              </Pill>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-12 text-center text-[15px] text-bone-dim lg:mt-16">{care}</p>
    </section>
  );
}
