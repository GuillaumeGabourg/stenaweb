import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Nav } from "@/components/sections/Nav";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { DotField } from "@/components/fx/DotField";
import { HashScroll } from "@/components/fx/HashScroll";
import { site } from "@/content/offer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description =
  "Stenaweb conçoit des sites vitrines sur-mesure pour les artisans, commerçants et indépendants de Mayenne et de la Sarthe. Design, développement et référencement local.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Stenaweb · Création de sites vitrines en Mayenne et Sarthe", template: "%s · Stenaweb" },
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Stenaweb",
    title: "Stenaweb · Des sites vitrines qui font venir des clients",
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#161619", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Stenaweb",
  url: site.url,
  email: site.email,
  description,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Mayenne" },
    { "@type": "AdministrativeArea", name: "Sarthe" },
  ],
  knowsAbout: ["Création de site vitrine", "Webdesign", "Référencement local"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" id="top" className={`${bricolage.variable} ${geistSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Aller au contenu
        </a>
        <DotField className="pointer-events-none fixed inset-0 z-0 size-full" />
        <CursorGlow />
        <HashScroll />
        <Nav />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
