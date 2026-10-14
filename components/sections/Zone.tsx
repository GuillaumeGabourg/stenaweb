"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cities, departments, mapView } from "@/content/map";
import { BlurFade } from "../fx/BlurFade";
import { Check, SectionHead } from "../ui";

// Towns where a site we built is in use.
const clients: Record<string, string> = {
  "Villaines-la-Juhel": "HK Conseil",
  Mayenne: "Opti Maintenance",
  "Le Mans": "PC Assist",
};

/** Mayenne and Sarthe drawn from their real outlines; the borders trace themselves, towns light up one by one. */
export function Zone() {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const ease = [0.16, 1, 0.3, 1] as const;
  const once = { once: true, margin: "0px 0px -80px 0px" };

  return (
    <section id="zone" className="border-y border-line bg-surface/50" aria-labelledby="zone-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHead
            id="zone-title"
            title="Près de chez vous"
            intro="On est basés entre la Mayenne et la Sarthe : on peut se rencontrer sur place, chez vous ou autour d'un café. Et on travaille aussi à distance, partout en France."
          />
          <ul className="mt-8 space-y-3">
            {Object.entries(clients).map(([town, name], i) => (
              <BlurFade as="li" key={town} delay={0.1 + i * 0.08}>
                <button
                  type="button"
                  onMouseEnter={() => setHover(town)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(town)}
                  onBlur={() => setHover(null)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition-colors sm:text-[15px] ${
                    hover === town ? "border-accent/50 bg-surface" : "border-line bg-bg"
                  }`}
                >
                  <Check className="text-accent" />
                  <span>
                    <span className="font-medium">{name}</span> <span className="text-muted">· {town}</span>
                  </span>
                </button>
              </BlurFade>
            ))}
          </ul>
        </div>

        <BlurFade delay={0.1}>
          <svg viewBox={`0 0 ${mapView.width} ${mapView.height}`} className="h-auto w-full overflow-visible" role="img" aria-label="Carte de la Mayenne et de la Sarthe, avec les villes où nos clients sont installés">
            {departments.map((d, i) => (
              <g key={d.code}>
                <motion.path
                  d={d.d}
                  fill="var(--surface)"
                  initial={{ fillOpacity: 0 }}
                  whileInView={{ fillOpacity: 1 }}
                  viewport={once}
                  transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 1 + i * 0.2 }}
                />
                <motion.path
                  d={d.d}
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity={0.55}
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={once}
                  transition={{ duration: reduced ? 0 : 2.2, delay: i * 0.3, ease }}
                />
              </g>
            ))}
            {/* Department names */}
            <text x={58} y={268} className="fill-[var(--muted)] font-display text-[22px] italic">
              Mayenne
            </text>
            <text x={505} y={330} textAnchor="middle" className="fill-[var(--muted)] font-display text-[22px] italic">
              Sarthe
            </text>

            {cities.map((c, i) => {
              const client = clients[c.name];
              const on = hover === c.name;
              // Labels that would collide with a neighbour sit on the left of their dot.
              const left = c.name === "Château-Gontier";
              return (
                <motion.g
                  key={c.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={once}
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 16, delay: 1.4 + i * 0.12 }}
                  style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  onMouseEnter={() => client && setHover(c.name)}
                  onMouseLeave={() => setHover(null)}
                >
                  {client && !reduced && (
                    <circle cx={c.x} cy={c.y} r={7} fill="var(--accent)" className="origin-center [animation:ping-dot_2.4s_ease-out_infinite]" style={{ transformOrigin: `${c.x}px ${c.y}px`, animationDelay: `${i * 0.3}s` }} />
                  )}
                  <circle cx={c.x} cy={c.y} r={client ? (on ? 8 : 6) : 3.5} fill={client ? "var(--accent)" : "var(--muted)"} className="transition-all duration-300" />
                  <text
                    x={left ? c.x - 8 : c.x + (client ? 12 : 8)}
                    y={c.y + 5}
                    textAnchor={left ? "end" : "start"}
                    className={`text-[15px] transition-colors duration-300 ${client ? "fill-[var(--text)] font-medium" : "fill-[var(--muted)] text-[13px]"}`}
                  >
                    {c.name}
                  </text>
                  {client && (
                    <text x={c.x + 12} y={c.y + 23} className={`text-[13px] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"} fill-[var(--accent)]`}>
                      {client}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </BlurFade>
      </div>
    </section>
  );
}
