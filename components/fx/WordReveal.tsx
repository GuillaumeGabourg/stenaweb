"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

type Part = string | { text: string; className: string };

/**
 * Words rise out of a blur one after the other.
 * `trigger="load"` plays on mount (hero), `"view"` the first time the heading enters the viewport.
 */
export function WordReveal({
  parts,
  trigger = "view",
  delay = 0,
  stagger = 0.05,
}: {
  parts: Part[];
  trigger?: "load" | "view";
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = parts.flatMap((p) =>
    (typeof p === "string" ? p : p.text)
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text, className: typeof p === "string" ? undefined : p.className }))
  );
  const hidden = { opacity: 0, y: "0.35em", filter: "blur(8px)" };
  const shown = { opacity: 1, y: "0em", filter: "blur(0px)" };

  return (
    <>
      <span className="sr-only">{words.map((w) => w.text).join(" ")}</span>
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden
            className={`inline-block ${w.className ?? ""}`}
            initial={hidden}
            {...(trigger === "load" ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: "0px 0px -40px 0px" } })}
            transition={reduced ? { duration: 0 } : { duration: 0.8, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w.text}
          </motion.span>{" "}
        </Fragment>
      ))}
    </>
  );
}
