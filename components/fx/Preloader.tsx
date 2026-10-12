"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

/** Count to 100 in giant type, then the curtain lifts off the hero. Once per session. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("stena-preloaded") === "1";
      sessionStorage.setItem("stena-preloaded", "1");
    } catch {}

    if (seen || prefersReducedMotion()) {
      setDone(true);
      markReady();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setDone(true);
      },
    });
    tl.to(state, {
      n: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(state.n)).padStart(3, "0");
      },
    })
      .to(".pl-meta", { opacity: 0, duration: 0.3 }, "-=0.15")
      .to(count.current, { yPercent: -110, duration: 0.7, ease: "expo.in" }, "<")
      .add(markReady, "-=0.1")
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.2");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-lime p-5 text-ink md:p-8"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="pl-meta flex justify-between font-mono text-xs uppercase tracking-wide">
        <span>Stenaweb</span>
        <span>Sites vitrines sur-mesure</span>
      </div>
      <div className="line-mask">
        <span ref={count} className="display tabular block text-[34vw] leading-[0.8] md:text-[26vw]">
          000
        </span>
      </div>
    </div>
  );
}
