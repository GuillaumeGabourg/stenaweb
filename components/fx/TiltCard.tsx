"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/**
 * A card that leans toward the pointer, with a faint light following it on the surface and border.
 * On leave the tilt eases back to flat while the light just fades where it is (it never slides back to the centre).
 */
export function TiltCard({ children, className, max = 5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduced = useReducedMotion();
  // Tilt target: springs back to flat on leave
  const tx = useMotionValue(0.5);
  const ty = useMotionValue(0.5);
  const rx = useSpring(useTransform(ty, [0, 1], [max, -max]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(tx, [0, 1], [-max, max]), { stiffness: 120, damping: 20 });
  // Light position: only updated while the pointer is inside
  const lx = useMotionValue(50);
  const ly = useMotionValue(50);
  const light = useMotionTemplate`radial-gradient(420px circle at ${lx}% ${ly}%, rgb(var(--glow) / 0.05), transparent 70%)`;
  const ring = useMotionTemplate`radial-gradient(240px circle at ${lx}% ${ly}%, rgb(var(--glow) / 0.22), transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width;
    const y = (e.clientY - b.top) / b.height;
    tx.set(x);
    ty.set(y);
    lx.set(x * 100);
    ly.set(y * 100);
  };
  const onLeave = () => {
    tx.set(0.5);
    ty.set(0.5);
  };

  return (
    <div className="h-full [perspective:1100px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div style={reduced ? undefined : { rotateX: rx, rotateY: ry }} className={`group/tilt relative h-full ${className ?? ""}`}>
        {children}
        <motion.span
          aria-hidden
          style={{ background: light }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 ease-out group-hover/tilt:opacity-100"
        />
        <motion.span
          aria-hidden
          style={{ background: ring }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-700 ease-out [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] group-hover/tilt:opacity-100"
        />
      </motion.div>
    </div>
  );
}
