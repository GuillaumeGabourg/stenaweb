import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/sections/Nav";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { DotField } from "@/components/fx/DotField";
import { HashScroll } from "@/components/fx/HashScroll";
import { MobileCta } from "@/components/fx/MobileCta";
import { site } from "@/content/offer";
import "./globals.css";

const serif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description =
  "Tersel Web conçoit des sites internet sur-mesure pour les artisans, commerçants et indépendants. Basés en Sarthe, on travaille aussi en Mayenne et dans les départements voisins. Design, développement et référencement local.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Tersel Web · Création de sites internet en Sarthe et alentours", template: "%s · Tersel Web" },
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Tersel Web",
    title: "Tersel Web · Des sites qui font venir des clients",
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#161619", colorScheme: "dark light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tersel Web",
  url: site.url,
  email: site.email,
  description,
  areaServed: [
    ...["Sarthe", "Mayenne", "Orne", "Eure-et-Loir", "Loir-et-Cher", "Indre-et-Loire", "Maine-et-Loire"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  ],
  knowsAbout: ["Création de site internet", "Webdesign", "Référencement local"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" id="top" className={`${serif.variable} ${geistSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before the first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}" }} />
      </head>
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
        <MobileCta />
      </body>
    </html>
  );
}
