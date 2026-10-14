import { services } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { CareVisual, DesignVisual, DevVisual, SeoVisual } from "../fx/ServiceVisuals";
import { TiltCard } from "../fx/TiltCard";
import { Check, SectionHead } from "../ui";

const visuals = [DesignVisual, DevVisual, SeoVisual, CareVisual];

export function Services() {
  return (
    <section id="services" className="border-y border-line bg-surface/50" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHead
          id="services-title"
          title="Ce qu'on fait pour vous"
          intro="Tout ce qu'il faut pour exister en ligne, sans avoir à gérer la technique. Vous nous parlez de votre métier, on s'occupe du reste."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Visual = visuals[i];
            return (
              <BlurFade as="li" key={s.title} delay={(i % 2) * 0.1}>
                <TiltCard className="rounded-2xl" max={3}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-5 md:p-6">
                    <Visual />
                    <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[15px]">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <Check className="text-accent" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </BlurFade>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
