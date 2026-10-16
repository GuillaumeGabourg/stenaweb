"use client";

import { useRef } from "react";

/**
 * A card that leans toward the mouse, with a faint light following it on the surface and border.
 * No animation loop: pointer moves set four CSS variables (at most once per frame) and CSS transitions
 * ease the tilt. On leave the tilt returns to flat while the light fades where it is.
 * Off on touch screens, with reduced motion and in the light mode for slow computers (`html.lite`).
 */
export function TiltCard({ children, className, max = 5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = ref.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      const x = (clientX - b.left) / b.width;
      const y = (clientY - b.top) / b.height;
      el.style.setProperty("--rx", `${(0.5 - y) * 2 * max}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * 2 * max}deg`);
      el.style.setProperty("--lx", `${x * 100}%`);
      el.style.setProperty("--ly", `${y * 100}%`);
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="h-full [perspective:1100px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={`tilt group/tilt relative h-full ${className ?? ""}`}>
        {children}
        <span aria-hidden className="tilt-light pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 ease-out group-hover/tilt:opacity-100" />
        <span
          aria-hidden
          className="tilt-ring pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-700 ease-out [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] group-hover/tilt:opacity-100"
        />
      </div>
    </div>
  );
}
