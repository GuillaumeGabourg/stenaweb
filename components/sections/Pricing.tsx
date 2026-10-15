"use client";

import { motion, useReducedMotion } from "motion/react";
import { pricing } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { TiltCard } from "../fx/TiltCard";
import { Button, Check, SectionHead } from "../ui";

/** Three offers that tilt toward the pointer; stars twinkle, features tick in, the recommended one carries a border light. */
export function Pricing() {
  const reduced = useReducedMotion();

  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="pricing-title">
      <SectionHead
        id="pricing-title"
        title="Nos formules"
        intro="Des prix clairs, avec une offre de lancement. Chaque projet commence par un devis gratuit : le prix est fixé avant de commencer."
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
                <p className="mt-2 min-h-[3.2em] text-base sm:text-[15px] leading-relaxed text-muted">{p.pitch}</p>

                <div className="mt-6 min-h-[118px] border-t border-line pt-6">
                  {p.price ? (
                    <>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {/* Regular price, struck through once the card is seen */}
                        <span className="relative font-display text-2xl text-muted">
                          <span className="sr-only">Prix normal :</span>
                          {p.price.regular} €
                          <motion.span
                            aria-hidden
                            className="absolute left-[-4%] top-1/2 h-0.5 w-[108%] origin-left -rotate-6 rounded-full bg-accent"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </span>
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[13px] font-medium text-accent">Offre de lancement</span>
                      </div>
                      <motion.p
                        className="mt-1 flex items-baseline gap-1.5"
                        initial={{ opacity: 0, y: 10, scale: 0.92 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18, delay: 0.85 + i * 0.12 }}
                      >
                        <span className="sr-only">Prix de lancement :</span>
                        <span className="font-display text-5xl text-text">{p.price.launch}</span>
                        <span className="font-display text-3xl text-text">€</span>
                      </motion.p>
                    </>
                  ) : (
                    <p className="flex h-[88px] items-end font-display text-5xl">Sur devis</p>
                  )}
                  <p className="mt-2 text-[14px] text-muted">{p.priceNote}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5 text-base sm:text-[15px]">
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

    </section>
  );
}
