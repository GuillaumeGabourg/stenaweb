"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { faq, site } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { SectionHead } from "../ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="faq" className="border-y border-line bg-surface/50" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="faq-title" title="Vos questions" intro="Une autre question ? Écrivez-nous, on répond à tout." />
          <a href={`mailto:${site.email}`} className="mt-4 inline-block font-medium text-accent underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>

        <ul className="space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <BlurFade as="li" key={item.q} delay={i * 0.05}>
                <div
                  className={`relative overflow-hidden rounded-2xl border transition-colors duration-500 ${
                    isOpen ? "border-accent/30 bg-surface" : "border-line bg-bg hover:border-text/20"
                  }`}
                >
                  {/* A warm light settles behind the open question */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.8, ease }}
                        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.1),transparent)]"
                      />
                    )}
                  </AnimatePresence>
                  <h3 className="relative font-sans">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[17px] font-medium tracking-normal"
                    >
                      <span className={`transition-[color,transform] duration-300 group-hover:translate-x-1 ${isOpen ? "text-accent" : "group-hover:text-text"}`}>
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          isOpen ? "rotate-45 border-accent bg-accent text-accent-ink" : "border-line text-muted group-hover:border-text/30 group-hover:text-text"
                        }`}
                      >
                        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    className={`relative grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <motion.p
                        animate={isOpen ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -6, filter: "blur(4px)" }}
                        transition={{ duration: reduced ? 0 : 0.5, delay: isOpen && !reduced ? 0.1 : 0, ease }}
                        className="px-6 pb-6 text-base sm:text-[15px] leading-relaxed text-muted"
                      >
                        {item.a}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
