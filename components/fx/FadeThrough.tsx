"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Cycles through words with a short crossfade. */
export function FadeThrough({ words, interval = 2200, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduced, words.length, interval]);

  return (
    <span className={`relative inline-grid ${className ?? ""}`}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
