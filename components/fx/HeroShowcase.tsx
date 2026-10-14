"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { projects } from "@/content/projects";
import { asset } from "@/lib/asset";

const DURATION = 5000;

const badges = [
  { label: "Adapté au mobile", className: "-left-4 top-[18%] sm:-left-8", delay: 0 },
  { label: "Visible sur Google", className: "-right-2 top-[6%] sm:-right-6", delay: 1.2 },
  { label: "Livré clé en main", className: "-left-2 bottom-[16%] sm:-left-10", delay: 2.4 },
];

/** The three client sites take turns in a browser and a phone that tilt toward the pointer. */
export function HeroShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const p = projects[i];

  useEffect(() => {
    if (reduced || paused) return;
    const id = setTimeout(() => setI((n) => (n + 1) % projects.length), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, reduced]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setPaused(false);
  };

  return (
    <div onPointerMove={onMove} onPointerEnter={() => setPaused(true)} onPointerLeave={onLeave} className="[perspective:1400px]">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative pb-10 pr-6 [transform-style:preserve-3d] sm:pr-14">
        {/* Browser */}
        <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]">
          <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-text/20" />
              <span className="size-2.5 rounded-full bg-text/20" />
              <span className="size-2.5 rounded-full bg-text/20" />
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={p.slug}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="truncate rounded-md bg-bg/70 px-3 py-1 text-[12px] text-muted"
              >
                {p.url.replace(/^https?:\/\//, "").replace(/\/index\.html$|\/$/, "")}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            {projects.map((q, n) => (
              <Image
                key={q.slug}
                src={asset(`/projects/${q.slug}/desktop.png`)}
                alt={n === i ? `Le site ${q.name}, réalisé par Stenaweb` : ""}
                fill
                priority={n === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={`object-cover object-top transition-[opacity,transform] duration-700 ease-[var(--ease-out)] ${
                  n === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Phone */}
        <div
          className="absolute bottom-0 right-0 w-[30%] max-w-[170px] rounded-[30px] border border-text/15 bg-bg p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="relative aspect-[390/844] overflow-hidden rounded-[24px]">
            {projects.map((q, n) => (
              <Image
                key={q.slug}
                src={asset(`/projects/${q.slug}/mobile.png`)}
                alt=""
                fill
                sizes="170px"
                className={`object-cover object-top transition-opacity delay-150 duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

        {/* Floating badges */}
        {badges.map((b) => (
          <span
            key={b.label}
            aria-hidden
            className={`float absolute hidden items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 text-[13px] font-medium shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:inline-flex ${b.className}`}
            style={{ transform: "translateZ(90px)", animationDelay: `${b.delay}s` }}
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {b.label}
          </span>
        ))}
      </motion.div>

      {/* Which site is showing */}
      <div className="mt-6 flex gap-3 pr-6 sm:pr-14" role="tablist" aria-label="Sites présentés">
        {projects.map((q, n) => (
          <button
            key={q.slug}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className="group flex-1 text-left"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-text/10">
              <span
                key={n === i ? `${i}-on` : `${n}-off`}
                className={`block h-full rounded-full bg-accent ${n === i ? (reduced || paused ? "w-full" : "progress") : "w-0"}`}
                style={{ animationDuration: `${DURATION}ms` }}
              />
            </span>
            <span className={`mt-2 block text-[13px] transition-colors ${n === i ? "text-text" : "text-muted group-hover:text-text"}`}>{q.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
