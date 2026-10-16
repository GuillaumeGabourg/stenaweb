import Link from "next/link";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";
import { BlurFade } from "./fx/BlurFade";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { Arrow, ArrowUpRight, Button, Check } from "./ui";

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  return (
    <main id="main" style={{ ["--client" as string]: p.accent, ["--client-ink" as string]: p.accentInk }}>
      <header className="mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pt-36">
        <Link href="/realisations" className="inline-flex items-center gap-1.5 text-base sm:text-[15px] text-muted transition-colors hover:text-text">
          <Arrow className="rotate-180" /> Toutes les réalisations
        </Link>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(2.6rem,5.2vw,4.2rem)] leading-[1.02]">{p.name}</h1>
            <p className="mt-5 text-lg text-muted md:text-xl md:leading-relaxed">{p.summary}</p>
            <p className="mt-4 text-base sm:text-[15px] text-muted">
              {p.sector} · {p.place}
            </p>
          </div>
          <div className="space-y-5 lg:justify-self-end">
            <ul className="flex flex-wrap gap-2">
              {p.services.map((s) => (
                <li key={s} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[14px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
            <a
              href={p.url}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--client)] px-5 font-medium text-[var(--client-ink)] transition-opacity hover:opacity-90"
            >
              Voir le site en ligne <ArrowUpRight />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <BrowserFrame src={`/projects/${p.slug}/desktop.png`} alt={`Page d'accueil de ${p.name}`} url={p.url} sizes="(min-width: 1152px) 1088px, 100vw" priority />
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16" aria-label="Le projet">
        <BlurFade>
          <h2 className="font-display text-3xl md:text-4xl">Le défi</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{p.challenge}</p>
        </BlurFade>
        <BlurFade delay={0.08}>
          <h2 className="font-display text-3xl md:text-4xl">Ce qu&apos;on a fait</h2>
          <ul className="mt-4 space-y-3">
            {p.solution.map((s, i) => (
              <li key={i} className="flex gap-3 text-lg leading-relaxed text-muted">
                <Check className="mt-1.5 text-accent" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </BlurFade>
      </section>

      <section className="border-y border-line bg-surface/50" aria-label={`Le site ${p.name} en entier`}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_260px]">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Le site en entier</h2>
            <p className="mt-2 text-muted">Faites défiler dans la fenêtre pour parcourir la page d&apos;accueil.</p>
            <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface-2">
              <div className="max-h-[70svh] overflow-y-auto overscroll-contain" tabIndex={0} aria-label={`Capture complète du site ${p.name}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(`/projects/${p.slug}/full.png`)} alt={`Le site ${p.name} en entier`} className="block w-full" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="mx-auto w-[220px] lg:mt-[92px] lg:w-full">
            <PhoneFrame src={`/projects/${p.slug}/mobile.png`} alt={`${p.name} sur mobile`} />
            <p className="mt-3 text-center text-[14px] text-muted">Sur téléphone</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 rounded-2xl border border-line bg-surface p-7 md:p-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Le résultat</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{p.result}</p>
          </div>
          {p.proof && (
            <p className="lg:justify-self-end lg:text-right">
              <span className="block font-display text-6xl text-accent">{p.proof.value}</span>
              <span className="mt-1 block text-base sm:text-[15px] text-muted">{p.proof.label}</span>
            </p>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/projets/${next.slug}`} className="group">
            <span className="text-[14px] text-muted">Projet suivant</span>
            <span className="mt-1 flex items-center gap-2 text-2xl font-semibold transition-colors group-hover:text-accent">
              {next.name} <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
          <Button href="/#contact" size="lg">
            Un projet similaire ? Parlons-en
          </Button>
        </div>
      </section>
    </main>
  );
}
