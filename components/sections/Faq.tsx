"use client";

import { useState } from "react";
import { faq } from "@/content/offer";
import { SplitReveal } from "../fx/SplitReveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-16 md:px-8 md:py-40" aria-labelledby="faq-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <SplitReveal as="h2" id="faq-title" className="display text-[clamp(3rem,6.4vw,6.5rem)] md:sticky md:top-28">
            Vos
            <br />
            questions
          </SplitReveal>
        </div>
        <ul className="border-t border-line md:col-span-8">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium tracking-[-0.01em] md:py-7 md:text-2xl"
                  >
                    <span className="transition-colors group-hover:text-lime">{item.q}</span>
                    <span
                      aria-hidden
                      className={`relative grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                        isOpen ? "border-lime bg-lime text-ink" : "border-line"
                      }`}
                    >
                      <span className="absolute h-[1.5px] w-3.5 bg-current" />
                      <span className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-500 ${isOpen ? "rotate-90 scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-lg leading-relaxed text-bone-dim">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
