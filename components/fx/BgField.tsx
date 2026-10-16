"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide background, drawn by CSS only (see `.bgf` in globals.css): a dot grid in the dark theme,
 * flowing wavy lines in the light one. A slow light drifts across it, and around the mouse the pattern
 * warms up to amber under a wide faint glow.
 *
 * The bright patches are "windows": an outer disc moved with transform, and inside it the same pattern
 * moved the opposite way so it stays aligned with the grid. Everything runs on the compositor; the only
 * script is a pointer listener that sets two transforms (CSS transitions do the easing, no animation loop).
 */
export function BgField() {
  const spot = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    let on = false;
    const apply = () => {
      raf = 0;
      spot.current!.style.transform = `translate3d(${x - 170}px, ${y - 170}px, 0)`;
      inner.current!.style.transform = `translate3d(${170 - x}px, ${170 - y}px, 0)`;
      glow.current!.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      // Only touch the class once: re-setting it on <html> would restyle the whole page on every move.
      if (!on) {
        on = true;
        document.documentElement.classList.add("bgf-on");
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      on = false;
      document.documentElement.classList.remove("bgf-on");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="bgf">
      <div className="bgf-pat bgf-base" />
      <div className="bgf-win bgf-wave">
        <div className="bgf-counter">
          <div className="bgf-pat bgf-bright" />
        </div>
      </div>
      <div ref={spot} className="bgf-win bgf-spot">
        <div ref={inner} className="bgf-counter bgf-follow">
          <div className="bgf-pat bgf-amber" />
        </div>
      </div>
      <div ref={glow} className="bgf-glow" />
    </div>
  );
}
