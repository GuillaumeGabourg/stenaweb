import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/offer";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false } };

// Les champs surlignés sont à compléter avec les informations réelles de l'entreprise.
export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Stenaweb, <mark>forme juridique (ex. entreprise individuelle)</mark>, représentée par <mark>prénom nom</mark>.
          <br />
          Adresse : <mark>adresse postale</mark>
          <br />
          SIRET : <mark>numéro SIRET</mark>
          <br />
          Contact : <a href={`mailto:${site.email}`} className="text-text underline">{site.email}</a>
        </p>
      </section>
      <section>
        <h2>Directeur de la publication</h2>
        <p>
          <mark>prénom nom</mark>
        </p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          <mark>Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis</mark> (à confirmer selon
          l&apos;hébergeur retenu).
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, design, code) est la propriété de Stenaweb. Les captures des sites
          réalisés sont présentées avec l&apos;accord des clients concernés et restent la propriété de leurs titulaires.
        </p>
      </section>
    </LegalPage>
  );
}
