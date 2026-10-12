"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Display type width breathes with scroll velocity (the signature).
    const root = document.documentElement;
    const state = { wdth: 84 };
    const setWdth = gsap.quickTo(state, "wdth", {
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => root.style.setProperty("--wdth", state.wdth.toFixed(2)),
    });
    instance.on("scroll", ({ velocity }: Lenis) => {
      const v = Math.min(Math.abs(velocity), 40);
      setWdth(84 + v * 0.3);
    });

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
