"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { ShaderField } from "../fx/ShaderField";
import { SplitReveal } from "../fx/SplitReveal";
import { Pill } from "../ui";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The field's own entrance (zoom + fade from ink) runs inside the shader, see ShaderField introOnReady.
      gsap.set(".hero-fade", { opacity: 0, y: 24 });
      const off = onReady(() => {
        gsap.to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, delay: 0.7 });
      });
      // Leaving: the field sinks and the type drifts up slower than the page.
      gsap.to(".hero-field", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-title", {
        yPercent: -22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return off;
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden" aria-labelledby="hero-title">
      <div className="hero-field absolute inset-0">
        <ShaderField className="size-full" introOnReady />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-6 md:px-8 md:pb-8">
        <div className="mb-auto" aria-hidden />

        <SplitReveal
          as="h1"
          when="ready"
          delay={0.35}
          id="hero-title"
          className="hero-title display text-[min(15vw,9.5svh)] md:text-[clamp(2.6rem,min(9.4vw,15.5svh),11rem)] text-bone"
        >
          Sites vitrines
          <br />
          qui font venir
          <br />
          <span className="text-lime">des clients</span>
        </SplitReveal>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="hero-fade text-lg leading-snug text-bone md:col-span-7 md:text-xl">
            On conçoit et code des sites sur-mesure pour les artisans, commerçants et indépendants de Mayenne et de la Sarthe. Beaux,
            rapides, trouvés sur Google.
          </p>
          <div className="hero-fade flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
            <Pill href="/#contact" size="lg">
              Demander un devis
            </Pill>
            <Pill href="/#realisations" tone="ghost" size="lg">
              Voir les réalisations
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
