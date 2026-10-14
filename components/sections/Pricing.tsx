"use client";

import { motion, useReducedMotion } from "motion/react";
import { pricing } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { TiltCard } from "../fx/TiltCard";
import { Button, Check, HiddenPrice, SectionHead } from "../ui";

/** Three offers that tilt toward the pointer; stars twinkle, features tick in, the recommended one carries a border light. */
export function Pricing() {
  const reduced = useReducedMotion();

  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="pricing-title">
      <SectionHead
        id="pricing-title"
        title="Nos formules"
        intro="Chaque projet reçoit un devis gratuit et détaillé, avec un prix fixé avant de commencer. Pas de mauvaise surprise."
      />

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
        {pricing.map((p, i) => (
          <BlurFade key={p.name} delay={i * 0.12} className="h-full">
            <TiltCard className="rounded-2xl" max={4}>
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 ${
                  p.featured ? "beam border-accent/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent)_9%,var(--surface)),var(--surface)_45%)]" : "border-line bg-surface"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  {p.featured && (
                    <span className="shine-loop relative overflow-hidden rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent">
                      Recommandé
                    </span>
                  )}
                </div>
                <p className="mt-2 min-h-[3.2em] text-[15px] leading-relaxed text-muted">{p.pitch}</p>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="flex items-baseline gap-2 font-display text-4xl font-semibold">
                    {p.prefix && <span className="text-base font-normal text-muted">{p.prefix}</span>}
                    <HiddenPrice className="text-accent" twinkle />
                    <span>€</span>
                  </p>
                  <p className="mt-2 text-[14px] text-muted">Sur devis · tarif bientôt disponible</p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5 text-[15px]">
                  {p.features.map((f, n) => (
                    <motion.li
                      key={f}
                      className="flex gap-2.5"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                      transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.25 + i * 0.12 + n * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.span
                        className="mt-1 inline-flex"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 14, delay: 0.35 + i * 0.12 + n * 0.07 }}
                      >
                        <Check className="text-accent" />
                      </motion.span>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <Button href="/#contact" tone={p.featured ? "primary" : "secondary"} className="relative mt-8 w-full">
                  Demander un devis
                </Button>
              </article>
            </TiltCard>
          </BlurFade>
        ))}
      </div>

      <BlurFade>
        <p className="mt-8 rounded-2xl border border-line bg-surface/60 px-6 py-4 text-[15px] text-muted">
          <span className="font-medium text-text">Hébergement, nom de domaine et petites modifications :</span>{" "}
          <HiddenPrice count={2} className="text-accent" twinkle /> € par mois, sans engagement.
        </p>
      </BlurFade>
    </section>
  );
}
