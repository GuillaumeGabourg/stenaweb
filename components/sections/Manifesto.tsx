"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";

const TEXT =
  "Votre site est souvent la première impression que vous donnez. On le conçoit pour qu'elle soit la bonne : codé à la main, rapide sur un téléphone, pensé pour vos clients. Pas de modèle, pas de jargon. Un seul interlocuteur, près de chez vous, un site livré vite et à un prix juste.";

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const p = root.current!.querySelector("p")!;
      const split = SplitText.create(p, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: p, start: "top 78%", end: "bottom 45%", scrub: true },
        }
      );
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-5 py-16 md:px-8 md:py-44" aria-label="Notre approche">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <svg viewBox="0 0 80 80" aria-hidden className="size-10 text-lime md:size-20">
            <path d="M40 0l9.6 30.4L80 40l-30.4 9.6L40 80l-9.6-30.4L0 40l30.4-9.6z" fill="currentColor" />
          </svg>
        </div>
        <p className="text-[clamp(1.75rem,3.9vw,4rem)] font-medium leading-[1.08] tracking-[-0.025em] md:col-span-9">{TEXT}</p>
      </div>
    </section>
  );
}
