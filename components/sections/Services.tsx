"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/content/offer";
import { SplitReveal } from "../fx/SplitReveal";

/** Sticky panels that stack: each one settles while the next slides over it and the previous recedes. */
export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const panels = gsap.utils.toArray<HTMLElement>(".svc-panel");
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) return;
        // Only recede once the next panel actually starts covering this one (panels span 19svh → 81svh).
        // Explicit start values: tweening from "filter: none" makes GSAP start at brightness(0) (a black flash).
        gsap.fromTo(
          panel.querySelector(".svc-inner"),
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 0.92,
            filter: "brightness(0.5)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 81%", end: "top 20%", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-40" aria-labelledby="services-title">
      <div className="mb-14 md:mb-20">
        <SplitReveal as="h2" id="services-title" className="display text-[clamp(3rem,9vw,8.5rem)]">
          Ce qu&apos;on fait
          <br />
          pour vous
        </SplitReveal>
        <p className="mt-6 text-lg leading-snug text-bone-dim md:mt-8 md:text-xl">
          Tout ce qu&apos;il faut pour exister en ligne, sans avoir à gérer la technique.
        </p>
      </div>

      {/* The gap between panels is the time each one stays alone and fully lit while sticky. */}
      <div className="space-y-6 motion-safe:space-y-[22svh] md:motion-safe:space-y-[38svh]">
        {services.map((s, i) => (
          // 62svh panels centred in the viewport; the 18px steps of the stack are centred too.
          <div
            key={s.title}
            className="svc-panel sticky"
            style={{ top: `calc(19svh + ${i * 18 - ((services.length - 1) * 18) / 2}px)` }}
          >
            <div
              className={`svc-inner grid min-h-[62svh] origin-top content-center items-center gap-8 rounded-[16px] p-6 md:grid-cols-12 md:p-10 ${
                i === services.length - 1 ? "bg-lime text-ink" : "border border-line bg-ink-2"
              }`}
            >
              <div className="flex flex-col justify-center gap-10 md:col-span-7">
                <h3 className="display text-[clamp(2rem,8.6vw,7rem)] md:text-[clamp(2.75rem,6.4vw,7rem)]">{s.title}</h3>
              </div>
              <div className="flex flex-col justify-center gap-8 md:col-span-5">
                <p className={`text-xl leading-snug ${i === services.length - 1 ? "text-ink" : "text-bone"}`}>{s.text}</p>
                <ul className={`divide-y border-y ${i === services.length - 1 ? "divide-ink/15 border-ink/15" : "divide-line border-line"}`}>
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center justify-between py-3 text-[15px]">
                      {it}
                      <svg viewBox="0 0 20 20" aria-hidden className="size-4">
                        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
