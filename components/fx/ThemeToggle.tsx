"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const apply = (t: Theme) => {
  if (t === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem("theme", t);
  } catch {}
};

const Moon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round">
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
  </svg>
);
const Sun = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const options: { value: Theme; label: string; Icon: () => React.JSX.Element }[] = [
  { value: "dark", label: "Sombre", Icon: Moon },
  { value: "light", label: "Clair", Icon: Sun },
];

/**
 * Labelled dark / light switch. The highlight slides to the chosen side, and the new theme
 * spreads from the clicked button in a circle where the browser supports view transitions.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const choose = (next: Theme, e: React.MouseEvent<HTMLButtonElement>) => {
    if (next === theme) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || reduced) {
      apply(next);
      setTheme(next);
      return;
    }
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(() => {
      apply(next);
      setTheme(next);
    });
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <div role="group" aria-label="Thème d'affichage" className={`flex h-11 items-center gap-0.5 rounded-xl border border-line bg-surface p-1 ${className ?? ""}`}>
      {options.map(({ value, label, Icon }) => {
        const on = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            onClick={(e) => choose(value, e)}
            className={`relative flex h-full items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium transition-colors duration-300 ${
              on ? "text-accent-ink" : "text-muted hover:text-text"
            }`}
          >
            {on && (
              <motion.span
                layoutId="theme-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg bg-accent"
              />
            )}
            <span className="relative">
              <Icon />
            </span>
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
