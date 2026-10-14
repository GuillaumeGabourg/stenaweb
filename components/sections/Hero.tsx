import { BlurFade } from "../fx/BlurFade";
import { FadeThrough } from "../fx/FadeThrough";
import { BrowserFrame, PhoneFrame } from "../Frames";
import { Button, Check } from "../ui";

const trades = ["artisans", "commerçants", "indépendants", "restaurateurs", "professions libérales"];
const promises = ["Devis gratuit et sans engagement", "Un seul interlocuteur, près de chez vous", "Site adapté au téléphone et à Google"];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-14" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title" className="text-[clamp(2.3rem,4.6vw,3.9rem)] font-semibold leading-[1.06]">
          Des sites vitrines qui font venir des <span className="text-accent">clients</span>
        </h1>
        <BlurFade delay={0.08}>
          <p className="mt-6 max-w-[34rem] text-lg text-muted md:text-xl md:leading-relaxed">
            On conçoit et on code des sites sur-mesure, beaux, rapides et faciles à trouver sur Google. En Mayenne et en Sarthe, pour les{" "}
            <FadeThrough words={trades} className="font-medium text-text" />.
          </p>
        </BlurFade>
        <BlurFade delay={0.16} className="mt-8 flex flex-wrap gap-3">
          <Button href="/#contact" size="lg">
            Demander un devis
          </Button>
          <Button href="/#realisations" size="lg" tone="secondary">
            Voir nos réalisations
          </Button>
        </BlurFade>
        <BlurFade delay={0.24}>
          <ul className="mt-9 space-y-2.5 text-[15px] text-muted">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Check className="text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>

      <BlurFade delay={0.15} className="relative pb-10 pr-6 sm:pr-14">
        <BrowserFrame
          src="/projects/hk-conseil/desktop.png"
          alt="Le site de HK Conseil, réalisé par Stenaweb"
          url="https://guillaumegabourg.github.io/m/hk-conseil-d8a9d364/"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />
        <PhoneFrame
          src="/projects/pc-assist/mobile.png"
          alt="Le site de PC Assist sur mobile, réalisé par Stenaweb"
          className="absolute bottom-0 right-0 w-[30%] max-w-[170px]"
          eager
        />
      </BlurFade>
    </section>
  );
}
