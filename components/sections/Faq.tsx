"use client";

import { useState } from "react";
import { faq, site } from "@/content/offer";
import { SectionHead } from "../ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-y border-line bg-surface/50" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="faq-title" title="Vos questions" intro="Une autre question ? Écrivez-nous, on répond à tout." />
          <a href={`mailto:${site.email}`} className="mt-4 inline-block font-medium text-accent underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>

        <ul className="divide-y divide-line rounded-2xl border border-line bg-bg">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3 className="font-sans">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[17px] font-medium tracking-normal"
                  >
                    <span className="transition-colors group-hover:text-accent">{item.q}</span>
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden
                      className={`size-5 shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] px-6 pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
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
