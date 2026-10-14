import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/offer";

export const metadata: Metadata = { title: "Politique de confidentialité", robots: { index: false } };

export default function Page() {
  return (
    <LegalPage title="Confidentialité">
      <section>
        <h2>Données collectées</h2>
        <p>
          Le formulaire de contact recueille votre nom, votre entreprise, votre adresse e-mail, votre téléphone et votre
          message. Ces informations servent uniquement à répondre à votre demande et à établir un devis.
        </p>
      </section>
      <section>
        <h2>Durée de conservation</h2>
        <p>Les demandes sont conservées au maximum trois ans après le dernier échange, puis supprimées.</p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p>Ce site n&apos;utilise ni cookie publicitaire ni outil de suivi tiers.</p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez accéder à vos données, les rectifier ou demander leur suppression en écrivant à{" "}
          <a href={`mailto:${site.email}`} className="text-text underline">
            {site.email}
          </a>
          . Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </section>
    </LegalPage>
  );
}
