"use client";

import { useEffect, useRef } from "react";

/**
 * A grid of small dots behind the hero. A slow wave of light drifts across it on its own,
 * and the dots near the pointer light up in amber and lean away from it.
 */
export function DotField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 26;
    let w = 0,
      h = 0,
      dpr = 1;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    // Dot and highlight colours come from the theme tokens, re-read when the theme switches.
    let dot = "237,236,232";
    let glow = "239,180,95";
    let boost = 1;
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      dot = cs.getPropertyValue("--dot").trim().split(/s+/).join(",") || dot;
      glow = cs.getPropertyValue("--glow").trim().split(/s+/).join(",") || glow;
      // Dark dots on a light ground read stronger: keep them a little fainter.
      boost = document.documentElement.dataset.theme === "light" ? 0.45 : 1;
      if (reduced) draw(0);
    };
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // The idle wave centre wanders slowly across the field.
      const wx = w * (0.55 + 0.35 * Math.sin(t * 0.00012));
      const wy = h * (0.45 + 0.35 * Math.cos(t * 0.00009));
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const near = Math.max(0, 1 - d / 170);
          const wave = 0.5 + 0.5 * Math.sin(Math.hypot(x - wx, y - wy) * 0.018 - t * 0.0016);
          const push = near * near * 7;
          const px = x + (d > 0 ? (dx / d) * push : 0);
          const py = y + (d > 0 ? (dy / d) * push : 0);
          const a = 0.07 + wave * 0.09 + near * 0.75;
          ctx.fillStyle = near > 0.05 ? `rgba(${glow},${a})` : `rgba(${dot},${a * boost})`;
          ctx.beginPath();
          ctx.arc(px, py, 1 + near * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduced)
      return () => {
        ro.disconnect();
        mo.disconnect();
      };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - b.left;
      pointer.ty = e.clientY - b.top;
      if (pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = -9999;
      pointer.x = pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      draw(t);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
