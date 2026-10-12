"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const words = ["Sites vitrines", "Design sur-mesure", "Référencement local", "Rapides sur mobile", "Livrés en quelques semaines"];

/** Infinite band whose speed and skew follow scroll velocity; reverses with scroll direction. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>(".mq-track")!;
      const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const v = self.getVelocity();
          const dir = self.direction;
          gsap.to(loop, {
            timeScale: dir * (1 + Math.min(Math.abs(v) / 250, 6)),
            duration: 0.25,
            overwrite: true,
            onComplete: () => void gsap.to(loop, { timeScale: dir, duration: 1.2 }),
          });
          skew(gsap.utils.clamp(-12, 12, v / -180));
        },
      });
    },
    { scope: root }
  );

  const row = (
    <>
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-[4vw] pr-[4vw]">
          <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--bone)]" : ""}>{w}</span>
          <svg viewBox="0 0 40 40" aria-hidden className="size-[0.55em] shrink-0 text-lime">
            <path d="M20 0l4.8 15.2L40 20l-15.2 4.8L20 40l-4.8-15.2L0 20l15.2-4.8z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );

  return (
    <div ref={root} className="overflow-hidden border-y border-line py-6 md:py-9" aria-label={words.join(", ")} role="img">
      <div className="mq-track display flex w-max whitespace-nowrap text-[clamp(2.75rem,8vw,8.5rem)] will-change-transform">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
