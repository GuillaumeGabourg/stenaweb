"use client";

import { motion, useReducedMotion } from "motion/react";

/** Content rises in softly from a light blur the first time it enters the viewport. */
export function BlurFade({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  // Same markup on server and client; reduced motion only collapses the timing.
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={reduced ? { duration: 0 } : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
