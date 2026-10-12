"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/content/projects";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { SplitReveal } from "./fx/SplitReveal";
import { TransitionLink } from "./fx/PageTransition";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { Arrow, ArrowUpRight } from "./ui";
import { markReady } from "@/lib/ready";

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      markReady();
      if (prefersReducedMotion()) return;
      // The cover grows from a framed card to full-bleed as you scroll into it.
      gsap.fromTo(
        ".cs-cover",
        { clipPath: "inset(8% 14% 8% 14% round 16px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: ".cs-cover-wrap", start: "top 85%", end: "top top", scrub: true },
        }
      );
      gsap.fromTo(".cs-cover img", { scale: 1.2 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".cs-cover-wrap", start: "top bottom", end: "bottom top", scrub: true },
      });
      // The full site scrolls inside the browser while the section is pinned.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const img = root.current!.querySelector<HTMLElement>(".cs-full-img")!;
        const view = root.current!.querySelector<HTMLElement>(".cs-full-view")!;
        gsap.to(img, {
          y: () => Math.min(0, view.offsetHeight - img.offsetHeight),
          ease: "none",
          scrollTrigger: {
            trigger: ".cs-full",
            start: "top top",
            end: "+=1800",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      gsap.utils.toArray<HTMLElement>(".cs-phone").forEach((el, i) => {
        gsap.from(el, {
          y: 120 + i * 60,
          rotate: i % 2 ? 4 : -4,
          ease: "none",
          scrollTrigger: { trigger: ".cs-phones", start: "top bottom", end: "center center", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <main
      ref={root}
      id="main"
      className="relative z-10 bg-ink"
      style={{ ["--accent" as string]: p.accent, ["--accent-ink" as string]: p.accentInk }}
    >
      <header className="px-5 pb-16 pt-32 md:px-8 md:pt-44">
        <SplitReveal as="h1" className="display text-[clamp(3.5rem,14vw,15rem)]">
          {p.name}
        </SplitReveal>
        <div className="mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-2xl leading-snug md:text-3xl">{p.summary}</p>
            <p className="mt-4 text-bone-dim">
              {p.sector} · {p.place}
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2 md:col-span-4 md:col-start-8">
            {p.services.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1.5 text-sm text-bone-dim">
                {s}
              </li>
            ))}
          </ul>
          <a
            href={p.url}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 self-start justify-self-start rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-ink)] md:col-span-2 md:justify-self-end"
          >
            Site en ligne <ArrowUpRight className="transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </header>

      <div className="cs-cover-wrap h-[70svh] md:h-[100svh]">
        <div className="cs-cover relative h-full overflow-hidden">
          <Image src={`/projects/${p.slug}/desktop.png`} alt={`Page d'accueil de ${p.name}`} fill priority sizes="100vw" className="object-cover object-top" />
        </div>
      </div>

      <section className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-40">
        <h2 className="display text-5xl md:col-span-4 md:text-7xl">Le défi</h2>
        <p className="text-2xl leading-snug md:col-span-7 md:col-start-6 md:text-3xl">{p.challenge}</p>
      </section>

      <section className="cs-full flex min-h-[100svh] items-center px-5 md:px-8" aria-label={`Parcourir le site ${p.name}`}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="overflow-hidden rounded-[14px] border border-line bg-ink-3">
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-bone/20" />
                <span className="size-2.5 rounded-full bg-bone/20" />
                <span className="size-2.5 rounded-full bg-bone/20" />
              </span>
              <span className="truncate rounded-md bg-ink/60 px-3 py-1 font-mono text-[11px] text-bone-dim">{p.url.replace(/^https?:\/\//, "")}</span>
            </div>
            <div className="cs-full-view relative h-[62svh] overflow-hidden md:h-[72svh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/projects/${p.slug}/full.png`} alt={`Le site ${p.name} en entier`} className="cs-full-img absolute left-0 top-0 w-full" onLoad={() => ScrollTrigger.refresh()} />
            </div>
          </div>
          <p className="mt-4 hidden font-mono text-xs uppercase tracking-wide text-bone-dim md:block">Faites défiler pour parcourir le site</p>
        </div>
      </section>

      <section className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-40">
        <h2 className="display text-5xl md:col-span-4 md:text-7xl">Ce qu&apos;on a fait</h2>
        <ol className="space-y-0 border-t border-line md:col-span-7 md:col-start-6">
          {p.solution.map((s, i) => (
            <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 text-xl leading-snug md:text-2xl">
              <span className="font-mono text-sm text-[var(--accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-phones flex justify-center gap-4 overflow-hidden px-5 pb-16 md:gap-10 md:pb-40">
        <PhoneFrame src={`/projects/${p.slug}/mobile.png`} alt={`${p.name} sur mobile`} className="cs-phone w-[46%] max-w-[300px] md:mt-24" />
        <div className="cs-phone hidden w-full max-w-[640px] self-start md:block">
          <BrowserFrame src={`/projects/${p.slug}/desktop.png`} alt={`${p.name} sur ordinateur`} url={p.url} sizes="50vw" />
        </div>
      </section>

      <section className="mx-5 rounded-[16px] bg-[var(--accent)] px-6 py-16 text-[var(--accent-ink)] md:mx-8 md:px-12 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="display text-5xl md:text-7xl">Le résultat</h2>
            <p className="mt-6 max-w-xl text-xl leading-snug md:text-2xl">{p.result}</p>
          </div>
          {p.proof && (
            <p className="md:col-span-4 md:col-start-9">
              <span className="display tabular block text-[clamp(5rem,12vw,10rem)] leading-[0.8]">{p.proof.value}</span>
              <span className="mt-3 block text-base">{p.proof.label}</span>
            </p>
          )}
        </div>
      </section>

      <TransitionLink href={`/projets/${next.slug}`} data-cursor="Suivant" className="group block px-5 pb-10 pt-32 md:px-8 md:pt-44">
        <p className="display flex items-end justify-between gap-6 text-[clamp(3.5rem,13vw,14rem)] transition-colors duration-500 group-hover:text-lime">
          {next.name}
          <Arrow className="mb-[0.1em] shrink-0 text-[0.4em] transition-transform duration-500 group-hover:translate-x-4" />
        </p>
        <p className="mt-4 border-t border-line pt-4 text-bone-dim">Projet suivant · {next.sector}</p>
      </TransitionLink>

      <div className="flex justify-center px-5 pb-16 md:px-8">
        <TransitionLink href="/#contact" className="rounded-full bg-lime px-8 py-5 text-lg font-medium text-ink transition-colors hover:bg-bone">
          Un projet similaire ? Parlons-en
        </TransitionLink>
      </div>
    </main>
  );
}
