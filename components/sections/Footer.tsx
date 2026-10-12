import { projects } from "@/content/projects";
import { site } from "@/content/offer";
import { TransitionLink } from "../fx/PageTransition";
import { Arrow } from "../ui";

/** Revealed from underneath the page: the wrapper clips a fixed footer. */
export function Footer() {
  return (
    <div className="relative h-[620px] md:h-[560px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
      <footer className="fixed bottom-0 flex overflow-hidden h-[620px] w-full flex-col justify-between bg-ink px-5 pb-6 pt-16 md:h-[560px] md:px-8">
        <div className="grid gap-10 text-[15px] sm:grid-cols-2 md:grid-cols-12">
          <div className="space-y-3 md:col-span-4">
            <p className="text-bone-dim">Un projet, une question ?</p>
            <a href={`mailto:${site.email}`} className="text-2xl font-medium hover:text-lime">
              {site.email}
            </a>
          </div>
          <nav aria-label="Réalisations" className="md:col-span-3 md:col-start-7">
            <p className="mb-3 text-bone-dim">Réalisations</p>
            <ul className="space-y-1.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <TransitionLink href={`/projets/${p.slug}`} className="hover:text-lime">
                    {p.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Informations" className="md:col-span-3">
            <p className="mb-3 text-bone-dim">Informations</p>
            <ul className="space-y-1.5">
              <li>
                <TransitionLink href="/#tarifs" className="hover:text-lime">Tarifs</TransitionLink>
              </li>
              <li>
                <TransitionLink href="/mentions-legales" className="hover:text-lime">Mentions légales</TransitionLink>
              </li>
              <li>
                <TransitionLink href="/confidentialite" className="hover:text-lime">Confidentialité</TransitionLink>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <p className="display select-none whitespace-nowrap text-[19.2vw] md:text-[20.2vw] leading-[0.78] tracking-[-0.02em] [font-variation-settings:'wdth'_84] text-lime" aria-hidden>
            Stenaweb
          </p>
          <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wide text-bone-dim">
            <span>© {new Date().getFullYear()} Stenaweb · Sites vitrines sur-mesure</span>
            <span>{site.area}</span>
            <TransitionLink href="#top" className="inline-flex items-center gap-1.5 hover:text-lime">
              Retour en haut <Arrow className="-rotate-90" />
            </TransitionLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
