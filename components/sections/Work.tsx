"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "../Frames";
import { TransitionLink } from "../fx/PageTransition";
import { ArrowUpRight } from "../ui";

/** Desktop: the section pins and the three real sites travel past horizontally. Mobile: a vertical run. */
export function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = root.current!.querySelector<HTMLElement>(".work-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".work-shot").forEach((el) => {
          gsap.fromTo(el, { scale: 0.86, rotate: -2 }, {
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: el, containerAnimation: tween, start: "left right", end: "center center", scrub: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".work-phone").forEach((el) => {
          gsap.fromTo(el, { yPercent: 30 }, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: el, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
        gsap.fromTo(".work-progress", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-shot").forEach((el) => {
          gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="realisations" className="relative overflow-hidden lg:motion-safe:h-[100svh]" aria-labelledby="work-title">
      <div className="work-track flex flex-col gap-16 px-5 py-12 md:px-8 md:py-24 lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[8vw] lg:motion-safe:pb-16 lg:motion-safe:pt-20 lg:motion-safe:pr-[12vw]">
        <div className="lg:motion-safe:w-[44vw] lg:motion-safe:shrink-0">
          <h2 id="work-title" className="display text-[clamp(2.8rem,11.5vw,6rem)] lg:text-[6.4vw]">
            Nos
            <br />
            réalisations
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-snug text-bone-dim">
            Trois entreprises de Mayenne et de la Sarthe, trois sites en ligne. Faites défiler, puis ouvrez celui qui vous parle.
          </p>
          <p className="mt-8 hidden font-mono text-xs uppercase tracking-wide text-bone-dim lg:block">Faites défiler →</p>
        </div>

        {projects.map((p) => (
          <article key={p.slug} className="relative lg:motion-safe:w-[min(62vw,calc((100svh-360px)*1.6))] lg:motion-safe:shrink-0 lg:motion-reduce:max-w-5xl">
            <TransitionLink href={`/projets/${p.slug}`} data-cursor="Voir" className="group block" aria-label={`Étude de cas ${p.name}`}>
              <div className="relative">
                <div className="work-shot origin-bottom-left">
                  <BrowserFrame src={`/projects/${p.slug}/desktop.png`} alt={`Page d'accueil du site ${p.name}`} url={p.url} eager />
                </div>
                <PhoneFrame
                  src={`/projects/${p.slug}/mobile.png`}
                  alt={`Le site ${p.name} sur mobile`}
                  eager
                  className="work-phone absolute -bottom-10 right-4 w-[26%] max-w-[210px] md:-right-6"
                />
              </div>
              <div className="mt-14 grid gap-4 border-t border-line pt-5 md:grid-cols-12 md:items-start">
                <h3 className="display text-4xl transition-colors duration-300 group-hover:text-lime md:col-span-7 md:text-[2.6rem] xl:text-5xl">{p.name}</h3>
                <p className="text-sm leading-relaxed text-bone-dim md:col-span-4">
                  <span className="block text-bone">{p.sector}</span>
                  {p.place}
                </p>
                <ArrowUpRight className="hidden text-2xl transition-transform duration-500 group-hover:rotate-45 md:col-span-1 md:block md:justify-self-end" />
              </div>
            </TransitionLink>
          </article>
        ))}
      </div>
      <div className="absolute inset-x-8 bottom-8 hidden h-px bg-line lg:motion-safe:block" aria-hidden>
        <div className="work-progress h-full origin-left bg-lime" />
      </div>
    </section>
  );
}
