import Link from "next/link";
import { projects } from "@/content/projects";
import { asset } from "@/lib/asset";
import { BlurFade } from "../fx/BlurFade";
import { TiltCard } from "../fx/TiltCard";
import { Arrow, ArrowUpRight, SectionHead } from "../ui";

export function Work() {
  return (
    <section id="realisations" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        title="Nos réalisations"
        intro="Trois entreprises de la région, trois sites en ligne. Cliquez sur un projet pour voir comment on l'a construit."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <BlurFade as="li" key={p.slug} delay={i * 0.1}>
            <TiltCard className="rounded-2xl">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                {/* On hover the whole home page scrolls past inside the frame */}
                <div className="relative aspect-[16/11] overflow-hidden border-b border-line bg-surface-2 [container-type:size]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(`/projects/${p.slug}/full.png`)}
                    alt={`Le site ${p.name}`}
                    loading="lazy"
                    className="absolute inset-x-0 top-0 w-full transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:translate-y-[calc(-100%+100cqh)] group-hover:duration-[16000ms] group-hover:ease-in-out motion-reduce:group-hover:translate-y-0 [@media(hover:none)]:[animation:peek_26s_ease-in-out_infinite]"
                  />
                  <span className="absolute bottom-3 left-3 hidden rounded-full [@media(hover:hover)]:block bg-bg/85 px-3 py-1 text-[12px] text-muted backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
                    Survolez pour défiler
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">
                    <Link href={`/projets/${p.slug}`} className="after:absolute after:inset-0">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[15px] text-muted">
                    {p.sector} · {p.place.split(" · ")[0]}
                  </p>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{p.summary}</p>
                  <div className="pointer-events-none relative z-10 mt-6 flex items-center justify-between gap-4 text-[15px]">
                    <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                      Voir le projet <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="pointer-events-auto inline-flex items-center gap-1 text-muted underline-offset-4 hover:text-text hover:underline"
                    >
                      Site en ligne <ArrowUpRight />
                      <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  </div>
                </div>
              </article>
            </TiltCard>
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
