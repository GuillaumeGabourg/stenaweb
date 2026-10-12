"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { TransitionLink } from "../fx/PageTransition";
import { Magnetic } from "../fx/Magnetic";
import { useLenis } from "../fx/SmoothScroll";

const links = [
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#services", label: "Services" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = bar.current;
    let tween: gsap.core.Tween | undefined;
    const off = onReady(() => {
      tween = gsap.fromTo(el, { yPercent: -120 }, { yPercent: 0, duration: 1.2, ease: "expo.out", delay: 0.5 });
    });
    return () => {
      off();
      tween?.kill();
      gsap.set(el, { yPercent: 0 });
    };
  }, []);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 300 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-out)] ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <nav ref={bar} className="flex items-center justify-between px-5 py-4 md:px-8 md:py-5" aria-label="Navigation principale">
          <TransitionLink href="/" className="display text-2xl leading-none text-bone mix-blend-difference md:text-[28px]" aria-label="Stenaweb, accueil">
            Stenaweb
          </TransitionLink>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-ink/60 p-1 backdrop-blur-md lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="block rounded-full px-4 py-2 text-sm text-bone-dim transition-colors hover:bg-bone/10 hover:text-bone">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic>
              <TransitionLink
                href="/#contact"
                className="hidden h-11 items-center rounded-full bg-lime px-5 text-sm font-medium text-ink transition-colors hover:bg-bone sm:inline-flex"
              >
                Demander un devis
              </TransitionLink>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              className="grid size-11 place-items-center rounded-full border border-line bg-ink/60 backdrop-blur-md lg:hidden"
            >
              <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-bone transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-bone transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu"
        className={`fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-10 transition-[clip-path] duration-700 ease-[var(--ease-out)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <ul className="space-y-1">
          {[...links, { href: "/#contact", label: "Contact" }].map((l, i) => (
            <li key={l.href} className="line-mask">
              <TransitionLink
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`display block text-[15vw] transition-transform duration-700 ease-[var(--ease-out)] ${open ? "translate-y-0" : "translate-y-full"}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                {l.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-xs uppercase tracking-wide text-bone-dim">Sites vitrines · Mayenne · Sarthe</p>
      </div>
    </>
  );
}
