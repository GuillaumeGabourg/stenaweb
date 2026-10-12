import clsx from "clsx";
import type { ComponentProps } from "react";
import { Magnetic } from "./fx/Magnetic";
import { TransitionLink } from "./fx/PageTransition";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-[1em]", className)} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-[1em]", className)} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type PillProps = ComponentProps<typeof TransitionLink> & { tone?: "lime" | "ghost" | "ink"; size?: "md" | "lg" };

/** Primary pill: label slides up and is replaced by its twin on hover. */
export function Pill({ tone = "lime", size = "md", className, children, ...rest }: PillProps) {
  return (
    <Magnetic>
      <TransitionLink
        {...rest}
        className={clsx(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium transition-colors duration-500",
          size === "lg" ? "h-16 px-8 text-lg" : "h-12 px-6 text-[15px]",
          tone === "lime" && "bg-lime text-ink hover:bg-bone",
          tone === "ghost" && "border border-bone/25 text-bone hover:border-bone hover:bg-bone hover:text-ink",
          tone === "ink" && "bg-ink text-bone hover:bg-ink-3",
          className
        )}
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">{children}</span>
          <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0">
            {children}
          </span>
        </span>
        <Arrow className="transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-45" />
      </TransitionLink>
    </Magnetic>
  );
}

export function SectionHead({ title, aside, className }: { title: React.ReactNode; aside?: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">{title}</div>
      {aside && <div className="text-base leading-relaxed text-bone-dim md:col-span-4 md:justify-self-end">{aside}</div>}
    </div>
  );
}
