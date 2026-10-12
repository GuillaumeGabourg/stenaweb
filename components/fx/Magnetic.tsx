"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Pulls its child toward the pointer and springs back on leave. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactElement; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      x((e.clientX - (b.left + b.width / 2)) * strength);
      y((e.clientY - (b.top + b.height / 2)) * strength);
    };
    const reset = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
