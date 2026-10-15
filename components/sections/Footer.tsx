import Link from "next/link";
import { projects } from "@/content/projects";
import { site, telHref } from "@/content/offer";
import { SocialLinks } from "../ContactLinks";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 text-base sm:text-[15px] sm:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl leading-none">
            Tersel <span className="italic text-accent">web</span>
          </p>
          <p className="mt-3 text-muted">Des sites sur-mesure pour les entreprises, basés en Sarthe, réalisés à distance partout en France.</p>
          <a href={telHref} className="mt-4 block w-fit font-medium tabular-nums text-text underline-offset-4 hover:underline">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="mt-1 block w-fit font-medium text-accent underline-offset-4 hover:underline">
            {site.email}
          </a>
          <SocialLinks className="mt-5" />
        </div>
        <nav aria-label="Réalisations">
          <p className="mb-3 font-medium">Réalisations</p>
          <ul className="space-y-2 text-muted">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projets/${p.slug}`} className="transition-colors hover:text-text">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Informations">
          <p className="mb-3 font-medium">Informations</p>
          <ul className="space-y-2 text-muted">
            {[
              { href: "/#tarifs", label: "Formules" },
              { href: "/#contact", label: "Contact" },
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/confidentialite", label: "Confidentialité" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-5 text-[13px] text-muted md:px-8">
          <span>© {new Date().getFullYear()} Tersel Web</span>
          <a href="#top" className="transition-colors hover:text-text">
            Retour en haut
          </a>
        </div>
      </div>
    </footer>
  );
}
