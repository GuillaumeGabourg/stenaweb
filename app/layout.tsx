import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { Curtain } from "@/components/fx/PageTransition";
import { Nav } from "@/components/sections/Nav";
import { site } from "@/content/offer";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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

export const viewport: Viewport = { themeColor: "#0a0a0a", colorScheme: "dark" };

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
    <html lang="fr" id="top" className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
            Aller au contenu
          </a>
          <Nav />
          {children}
          <Curtain />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
