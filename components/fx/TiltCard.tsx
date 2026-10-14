"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/** A card that leans toward the pointer, with a soft light following it across the surface and border. */
export function TiltCard({ children, className, max = 5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const lx = useTransform(x, (v) => `${v * 100}%`);
  const ly = useTransform(y, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(420px circle at ${lx} ${ly}, rgb(237 236 232 / 0.035), transparent 70%)`;
  const ring = useMotionTemplate`radial-gradient(220px circle at ${lx} ${ly}, rgb(239 180 95 / 0.32), transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - b.left) / b.width);
    y.set((e.clientY - b.top) / b.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="h-full [perspective:1100px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div style={reduced ? undefined : { rotateX: rx, rotateY: ry }} className={`group/tilt relative h-full ${className ?? ""}`}>
        {children}
        {/* Light on the surface and on the 1px border, visible while hovered */}
        <motion.span
          aria-hidden
          style={{ background: light }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 ease-out group-hover/tilt:opacity-100"
        />
        <motion.span
          aria-hidden
          style={{ background: ring }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] group-hover/tilt:opacity-100"
        />
      </motion.div>
    </div>
  );
}
