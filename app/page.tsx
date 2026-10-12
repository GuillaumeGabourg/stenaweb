import { Preloader } from "@/components/fx/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Proof } from "@/components/sections/Proof";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main" className="relative z-10 bg-ink">
        <Hero />
        <Marquee />
        <Manifesto />
        <Work />
        <Services />
        <Process />
        <Pricing />
        <Proof />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
