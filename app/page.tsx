import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { MiniCta } from "@/components/sections/MiniCta";
import { Steps } from "@/components/sections/Steps";
import { Zone } from "@/components/sections/Zone";
import { Guarantees } from "@/components/sections/Guarantees";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Work />
        <MiniCta text="Un site comme ça pour votre entreprise ?" className="pb-10 md:pb-14" />
        <Services />
        <MiniCta text="On s'occupe de tout, vous gardez la main." button="En parler avec nous" className="pt-10 md:pt-14" />
        <Steps />
        <Zone />
        <Guarantees />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
