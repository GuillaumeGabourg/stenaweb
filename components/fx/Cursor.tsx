"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Dot + ring cursor. The ring swells over interactive elements and shows a label from data-cursor. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const d = dot.current!;
    const r = ring.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.08 });
    const dy = gsap.quickTo(d, "y", { duration: 0.08 });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      gsap.to([d, r], { opacity: 1, duration: 0.3, overwrite: "auto" });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      const text = target?.dataset.cursor ?? "";
      label.current!.textContent = text;
      gsap.to(r, {
        width: text ? 96 : target ? 56 : 32,
        height: text ? 96 : target ? 56 : 32,
        backgroundColor: text ? "rgba(197,255,51,1)" : "rgba(197,255,51,0)",
        borderColor: target ? "rgba(197,255,51,1)" : "rgba(242,241,234,0.5)",
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(d, { scale: target ? 0 : 1, duration: 0.3 });
    };
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-lime mix-blend-difference" />
      <div
        ref={ring}
        className="fixed left-0 top-0 grid size-8 place-items-center rounded-full border border-bone/50"
      >
        <span ref={label} className="font-mono text-[11px] font-medium uppercase tracking-wide text-ink" />
      </div>
    </div>
  );
}
