import { BlurFade } from "../fx/BlurFade";
import { FadeThrough } from "../fx/FadeThrough";
import { HeroShowcase } from "../fx/HeroShowcase";
import { WordReveal } from "../fx/WordReveal";
import { Button, Check } from "../ui";

const trades = ["artisans", "commerçants", "indépendants", "restaurateurs", "professions libérales"];
const promises = ["Devis gratuit et sans engagement", "Tout à distance : téléphone, visio ou e-mail", "Site adapté au téléphone et à Google"];
const band = [
  "Plombiers",
  "Électriciens",
  "Boulangeries",
  "Garages",
  "Coiffeurs",
  "Paysagistes",
  "Restaurants",
  "Menuisiers",
  "Esthéticiennes",
  "Maîtres d'œuvre",
  "Dépanneurs",
  "Fleuristes",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Background: drifting warm glows (the dot field runs behind the whole site) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] -top-[20%] size-[55vw] max-w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.16),transparent)] [animation:drift-a_18s_ease-in-out_infinite]" />
        <div className="absolute -right-[10%] top-[10%] size-[50vw] max-w-[700px] rounded-full bg-[radial-gradient(closest-side,rgb(214_120_96/0.11),transparent)] [animation:drift-b_22s_ease-in-out_infinite]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 id="hero-title" className="font-display text-[clamp(2.8rem,5.6vw,4.75rem)] leading-[1.0]">
            <WordReveal trigger="load" delay={0.1} stagger={0.07} parts={["Votre métier mérite un", { text: "beau site", className: "italic text-accent" }]} />
          </h1>
          <BlurFade delay={0.45}>
            <p className="mt-6 text-lg text-muted md:text-xl md:leading-relaxed">
              On conçoit des sites sur-mesure, rapides et faciles à trouver sur Google, et on s&apos;occupe de tout. Basés en Sarthe, pour les{" "}
              <FadeThrough words={trades} className="font-medium text-text" />.
            </p>
          </BlurFade>
          <BlurFade delay={0.55} className="mt-8 flex flex-wrap gap-3">
            <Button href="/#contact" size="lg">
              Demander un devis
            </Button>
            <Button href="/#realisations" size="lg" tone="secondary">
              Voir nos réalisations
            </Button>
          </BlurFade>
          <BlurFade delay={0.65}>
            <ul className="mt-9 space-y-2.5 text-base sm:text-[15px] text-muted">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <Check className="text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        <BlurFade delay={0.3}>
          <HeroShowcase />
        </BlurFade>
      </div>

      {/* Who we build for: a slow band, readable size, fading at both ends */}
      <div className="relative border-y border-line bg-surface/40 py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <span className="sr-only">Pour tous les métiers : {band.join(", ")}.</span>
        <ul aria-hidden className="flex w-max [animation:marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[...band, ...band].map((t, n) => (
            <li key={n} className="flex items-center gap-6 pr-6 text-base sm:text-[15px] text-muted">
              {t}
              <svg viewBox="0 0 10 10" className="size-1.5 text-accent">
                <circle cx="5" cy="5" r="5" fill="currentColor" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
