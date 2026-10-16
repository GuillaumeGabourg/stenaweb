import type { Metadata } from "next";
import Link from "next/link";
import { BrowserFrame, PhoneFrame } from "@/components/Frames";
import { BlurFade } from "@/components/fx/BlurFade";
import { Footer } from "@/components/sections/Footer";
import { Arrow, ArrowUpRight, Button, Check } from "@/components/ui";
import { site } from "@/content/offer";
import { projects } from "@/content/projects";

const description =
  "Les sites internet réalisés par Tersel Web pour des entreprises de Mayenne et de Sarthe : maître d'œuvre, maintenance industrielle, dépannage informatique. Le projet, ce qu'on a fait et le site en ligne.";

export const metadata: Metadata = {
  title: "Nos réalisations · Sites internet en Mayenne et en Sarthe",
  description,
  alternates: { canonical: "/realisations" },
  openGraph: { title: "Nos réalisations · Tersel Web", description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Réalisations Tersel Web",
  url: `${site.url}/realisations`,
  description,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/projets/${p.slug}`,
      name: `${p.name}, ${p.sector} (${p.place.replace(" · ", ", ")})`,
    })),
  },
};

export default function RealisationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main">
        <header className="mx-auto max-w-6xl px-5 pb-6 pt-28 md:px-8 md:pt-32">
          <BlurFade>
            <h1 className="font-display text-[clamp(2.6rem,5.2vw,4.2rem)] leading-[1.02]">Nos réalisations</h1>
            <p className="mt-5 text-lg text-muted md:text-xl md:leading-relaxed">
              Trois entreprises de Mayenne et de Sarthe, trois sites en ligne. Pour chacune : ce dont elle avait besoin, ce que l&apos;on a fait, et le résultat que vous pouvez visiter.
            </p>
          </BlurFade>
        </header>

        <ol className="mx-auto max-w-6xl space-y-6 px-5 pb-10 md:px-8 md:pb-14">
          {projects.map((p, i) => (
            <BlurFade as="li" key={p.slug} delay={0.05}>
              <article
                aria-labelledby={`${p.slug}-title`}
                className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-line bg-surface p-5 md:p-8 lg:grid-cols-2 lg:gap-12"
              >
                {/* Device frames, alternating sides on large screens */}
                <div className={`relative pb-6 pr-10 ${i % 2 ? "lg:order-2" : ""}`}>
                  <BrowserFrame
                    src={`/projects/${p.slug}/desktop.png`}
                    alt={`Page d'accueil du site ${p.name} sur ordinateur`}
                    url={p.url.replace(/\/index\.html$/, "")}
                    sizes="(min-width: 1024px) 520px, 100vw"
                  />
                  <PhoneFrame src={`/projects/${p.slug}/mobile.png`} alt={`Le site ${p.name} sur téléphone`} className="absolute bottom-0 right-0 w-[26%]" />
                </div>

                <div>
                  <p className="text-[14px] text-muted">
                    {p.sector} · {p.place}
                  </p>
                  <h2 id={`${p.slug}-title`} className="mt-1 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05]">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-lg text-muted">{p.summary}</p>

                  <h3 className="mt-6 text-[15px] font-semibold">Le besoin</h3>
                  <p className="mt-1.5 text-base sm:text-[15px] leading-relaxed text-muted">{p.challenge}</p>

                  <h3 className="mt-5 text-[15px] font-semibold">Ce que l&apos;on a fait</h3>
                  <ul className="mt-2 space-y-2 text-base sm:text-[15px]">
                    {p.solution.map((s) => (
                      <li key={s} className="flex gap-2.5 text-muted">
                        <Check className="mt-1 text-accent" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/projets/${p.slug}`}
                      className="group inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline"
                    >
                      Voir l&apos;étude de cas <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-muted underline-offset-4 hover:text-text hover:underline"
                    >
                      Visiter le site <ArrowUpRight />
                      <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  </div>
                </div>
              </article>
            </BlurFade>
          ))}
        </ol>

        <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8 md:pb-16" aria-labelledby="next-title">
          <BlurFade>
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-dashed border-accent/35 bg-accent-soft/40 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h2 id="next-title" className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-tight">
                  Votre entreprise pourrait être la prochaine
                </h2>
                <p className="mt-2 text-muted">Devis gratuit, tout à distance, un site en ligne en deux à trois semaines.</p>
              </div>
              <Button href="/#contact" size="lg" className="shrink-0">
                Demander un devis
              </Button>
            </div>
          </BlurFade>
        </section>
      </main>
      <Footer />
    </>
  );
}
