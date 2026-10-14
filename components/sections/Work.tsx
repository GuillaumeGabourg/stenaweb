import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { asset } from "@/lib/asset";
import { BlurFade } from "../fx/BlurFade";
import { Arrow, ArrowUpRight, SectionHead } from "../ui";

export function Work() {
  return (
    <section id="realisations" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        title="Nos réalisations"
        intro="Trois entreprises de la région, trois sites en ligne. Cliquez pour voir comment on les a construits."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <BlurFade as="li" key={p.slug} delay={i * 0.08}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-text/20">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                <Image
                  src={asset(`/projects/${p.slug}/desktop.png`)}
                  alt={`Page d'accueil du site ${p.name}`}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
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
                    Voir le projet <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
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
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
