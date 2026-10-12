"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { steps } from "@/content/offer";
import { SplitReveal } from "../fx/SplitReveal";

/** A lime line draws down the timeline with the scroll; each step lights up as the line reaches it. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".proc-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc-list", start: "top 60%", end: "bottom 60%", scrub: true } }
      );
      gsap.utils.toArray<HTMLElement>(".proc-step").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25 },
          { opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" } }
        );
        gsap.fromTo(
          el.querySelector(".proc-dot"),
          { scale: 0.4, backgroundColor: "#2b2c28" },
          { scale: 1, backgroundColor: "#c5ff33", duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" } }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-5 py-16 md:px-8 md:py-40" aria-labelledby="process-title">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SplitReveal as="h2" id="process-title" className="display text-[clamp(3rem,6.2vw,6.5rem)]">
              Trois
              <br />
              semaines,
              <br />
              <span className="text-lime">zéro stress</span>
            </SplitReveal>
            <p className="mt-6 max-w-[52ch] text-lg leading-snug text-bone-dim">
              Une méthode simple, un seul interlocuteur du premier appel à la mise en ligne.
            </p>
          </div>
        </div>

        <ol className="proc-list relative md:col-span-7">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <span aria-hidden className="proc-line absolute bottom-2 left-[7px] top-2 w-px origin-top bg-lime" />
          {steps.map((s) => (
            <li key={s.title} className="proc-step relative grid gap-3 pb-16 pl-12 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-8">
              <span aria-hidden className="proc-dot absolute left-0 top-2 size-[15px] rounded-full bg-lime ring-4 ring-ink" />
              <span className="pt-1 font-mono text-xs uppercase tracking-wide text-bone-dim">{s.when}</span>
              <div>
                <h3 className="display text-4xl md:text-5xl">{s.title}</h3>
                <p className="mt-4 max-w-[60ch] text-lg leading-snug text-bone-dim">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
