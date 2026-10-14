import { services } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { Check, SectionHead } from "../ui";

const icons = [
  // Design: a pen nib
  <path key="d" d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  // Development: code brackets
  <path key="c" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  // Local SEO: map pin
  <path key="s" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  // Hosting & follow-up: shield
  <path key="h" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />,
];

export function Services() {
  return (
    <section id="services" className="border-y border-line bg-surface/50" aria-labelledby="services-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="services-title"
            title="Ce qu'on fait pour vous"
            intro="Tout ce qu'il faut pour exister en ligne, sans avoir à gérer la technique. Vous nous parlez de votre métier, on s'occupe du reste."
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <BlurFade as="li" key={s.title} delay={i * 0.06} className="rounded-2xl border border-line bg-bg p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                  {icons[i]}
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              <ul className="mt-4 space-y-1.5 text-[15px]">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <Check className="text-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  );
}
