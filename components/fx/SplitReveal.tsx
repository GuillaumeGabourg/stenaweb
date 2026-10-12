"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "scroll" reveals when entering the viewport; "ready" waits for the preloader. */
  when?: "scroll" | "ready";
  delay?: number;
  by?: "lines" | "words";
  id?: string;
};

/** Masked line-by-line (or word-by-word) reveal, expo-out. Text stays visible without JS. */
export function SplitReveal({ as: Tag = "div", children, className, when = "scroll", delay = 0, by = "lines", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      let cleanupReady = () => {};
      const split = SplitText.create(el, {
        type: by === "lines" ? "lines" : "words,lines",
        mask: by === "lines" ? "lines" : "words",
        linesClass: "line",
        autoSplit: true,
        onSplit(self) {
          const targets = by === "lines" ? self.lines : self.words;
          gsap.set(targets, { yPercent: 110 });
          const play = () =>
            gsap.to(targets, {
              yPercent: 0,
              duration: 1.25,
              ease: "expo.out",
              stagger: by === "lines" ? 0.09 : 0.035,
              delay,
            });
          if (when === "ready") {
            cleanupReady = onReady(play);
            return;
          }
          return gsap.to(targets, {
            yPercent: 0,
            duration: 1.15,
            ease: "expo.out",
            stagger: by === "lines" ? 0.08 : 0.03,
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
      return () => {
        cleanupReady();
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
