"use client";

import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "../fx/BlurFade";
import { Button, SectionHead } from "../ui";

const steps = [
  {
    title: "On s'appelle",
    text: "Un appel ou un café pour comprendre votre métier, vos clients et ce que le site doit vous apporter. Gratuit et sans engagement.",
  },
  {
    title: "Vous validez la maquette",
    text: "Vous voyez votre futur site avant qu'il soit construit. On ajuste ensemble jusqu'à ce qu'il vous ressemble.",
  },
  {
    title: "Votre site est en ligne",
    text: "Il est publié sur votre nom de domaine, testé sur téléphone et ordinateur. On vous montre comment le faire vivre.",
  },
];

/** Three steps joined by a line that fills from one to the next the first time the section is seen. */
export function Steps() {
  const reduced = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="etapes" className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20" aria-labelledby="steps-title">
      <SectionHead id="steps-title" title="Comment ça se passe" intro="Trois étapes, un seul interlocuteur du début à la fin. Vous n'avez rien de technique à gérer." />

      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {/* The connecting line (desktop: horizontal through the numbers; mobile: vertical) */}
        <span aria-hidden className="absolute left-[23px] top-6 bottom-6 w-px bg-line md:inset-x-[calc(16.66%)] md:top-[23px] md:bottom-auto md:h-px md:w-auto" />
        <motion.span
          aria-hidden
          className="absolute left-[22.5px] top-6 bottom-6 w-0.5 origin-top bg-accent md:hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
          transition={{ duration: reduced ? 0 : 1.6, ease }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-x-[16.66%] top-[22.5px] hidden h-0.5 origin-left bg-accent md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
          transition={{ duration: reduced ? 0 : 1.6, ease }}
        />

        {steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[48px_1fr] gap-5 md:grid-cols-1 md:justify-items-center md:text-center">
            <motion.span
              className="relative z-10 grid size-12 place-items-center rounded-full border border-accent/40 bg-bg font-display text-2xl text-accent"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -120px 0px" }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 18, delay: 0.15 + i * 0.5 }}
            >
              {i + 1}
              {/* A ring pulses out once when the line reaches this step */}
              {!reduced && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-accent"
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                  viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.5 }}
                />
              )}
            </motion.span>
            <BlurFade delay={0.25 + i * 0.5}>
              <h3 className="text-xl font-semibold md:mt-2">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted sm:text-[15px]">{s.text}</p>
            </BlurFade>
          </li>
        ))}
      </ol>

      <BlurFade className="mt-12 flex justify-center">
        <Button href="/#contact" size="lg">
          Commencer par un appel gratuit
        </Button>
      </BlurFade>
    </section>
  );
}
