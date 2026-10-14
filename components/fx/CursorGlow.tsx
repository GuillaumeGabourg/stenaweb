"use client";

import { useEffect, useRef } from "react";

/** A wide, faint warm light that follows the mouse over the page background. Mouse only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const pos = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (pos.x < -900) {
        pos.x = pos.tx;
        pos.y = pos.ty;
      }
      el.style.opacity = "1";
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      pos.x += (pos.tx - pos.x) * 0.12;
      pos.y += (pos.ty - pos.y) * 0.12;
      el.style.transform = `translate3d(${pos.x - 350}px, ${pos.y - 350}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 size-[700px] rounded-full opacity-0 transition-opacity duration-700 [background:radial-gradient(closest-side,rgb(239_180_95/0.07),transparent)]"
    />
  );
}
