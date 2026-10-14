import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import { WordReveal } from "./fx/WordReveal";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-[1.1em]", className)} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-[1.1em]", className)} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={clsx("size-[1.1em] shrink-0", className)} fill="none" stroke="currentColor" strokeWidth={1.9}>
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Placeholder for a price that is not set yet: small stars in place of the digits. */
export function HiddenPrice({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1", className)}>
      <span className="sr-only">Prix bientôt disponible</span>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden className="size-[0.7em]">
          <path fill="currentColor" d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { tone?: "primary" | "secondary"; size?: "md" | "lg" };

export function Button({ tone = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  return (
    <Link
      {...rest}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-300",
        size === "lg" ? "h-13 px-6 text-base" : "h-11 px-5 text-[15px]",
        tone === "primary" && "shine bg-accent text-accent-ink hover:bg-[#f5c47c]",
        tone === "secondary" && "border border-line bg-surface text-text hover:border-text/30 hover:bg-surface-2",
        className
      )}
    >
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SectionHead({ id, title, intro, className }: { id: string; title: string; intro?: string; className?: string }) {
  return (
    <div className={clsx("max-w-2xl", className)}>
      <h2 id={id} className="text-[clamp(1.85rem,3.2vw,2.6rem)] font-semibold leading-[1.12]">
        <WordReveal parts={[title]} />
      </h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}
