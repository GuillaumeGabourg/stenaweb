"use client";

import { pricing } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { Button, Check, HiddenPrice, SectionHead } from "../ui";

/** Three offers. A soft light follows the pointer on each card; the recommended one carries a travelling border light. */
export function Pricing() {
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="pricing-title">
      <SectionHead
        id="pricing-title"
        title="Nos formules"
        intro="Chaque projet reçoit un devis gratuit et détaillé, avec un prix fixé avant de commencer. Pas de mauvaise surprise."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {pricing.map((p, i) => (
          <BlurFade key={p.name} delay={i * 0.08}>
            <article
              onPointerMove={track}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface p-7 ${
                p.featured ? "beam border-accent/30" : "border-line"
              }`}
              style={{ ["--mx" as string]: "50%", ["--my" as string]: "-300px" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), rgb(239 180 95 / 0.07), transparent 60%)" }}
              />
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                {p.featured && <span className="rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent">Recommandé</span>}
              </div>
              <p className="mt-2 min-h-[3.2em] text-[15px] leading-relaxed text-muted">{p.pitch}</p>

              <div className="mt-6 border-t border-line pt-6">
                <p className="flex items-baseline gap-2 font-display text-4xl font-semibold">
                  {p.prefix && <span className="text-base font-normal text-muted">{p.prefix}</span>}
                  <HiddenPrice className="text-accent" />
                  <span>€</span>
                </p>
                <p className="mt-2 text-[14px] text-muted">Sur devis · tarif bientôt disponible</p>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5 text-[15px]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-1 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button href="/#contact" tone={p.featured ? "primary" : "secondary"} className="relative mt-8 w-full">
                Demander un devis
              </Button>
            </article>
          </BlurFade>
        ))}
      </div>

      <p className="mt-8 rounded-2xl border border-line px-6 py-4 text-[15px] text-muted">
        <span className="font-medium text-text">Hébergement, nom de domaine et petites modifications :</span>{" "}
        <HiddenPrice count={2} className="text-accent" /> € par mois, sans engagement.
      </p>
    </section>
  );
}
