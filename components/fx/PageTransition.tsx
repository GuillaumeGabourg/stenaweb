"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ComponentProps } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

const CURTAIN_ID = "page-curtain";

/** Lime curtain that covers the page on navigation and lifts off the next one. */
export function Curtain() {
  const pathname = usePathname();
  const lenis = useLenis();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = document.getElementById(CURTAIN_ID);
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    const hash = window.location.hash;
    if (hash.length > 1) {
      // Arriving on an anchor of another page: land on it once pins are measured.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return;
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
        else target.scrollIntoView();
      });
    }
    if (!el || el.dataset.state !== "covered") return;
    gsap.to(el, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
      delay: 0.1,
      onComplete: () => {
        gsap.set(el, { yPercent: 100, visibility: "hidden" });
        el.dataset.state = "idle";
      },
    });
  }, [pathname, lenis]);

  return (
    <div
      id={CURTAIN_ID}
      aria-hidden
      data-state="idle"
      className="pointer-events-none fixed inset-0 z-[80] flex items-end bg-lime p-5 text-ink md:p-8"
      style={{ transform: "translateY(100%)", visibility: "hidden" }}
    >
      <span className="display text-[18vw] leading-[0.8]">Stenaweb</span>
    </div>
  );
}

export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        const [path, hash] = href.split("#");
        if (!path || path === pathname) {
          // Same page: glide to the anchor instead of jumping.
          if (hash !== undefined) {
            e.preventDefault();
            const target = !hash || hash === "top" ? 0 : `#${hash}`;
            if (lenis) lenis.scrollTo(target, { duration: 1.6 });
            else if (target === 0) window.scrollTo({ top: 0 });
            else document.getElementById(hash)?.scrollIntoView();
          }
          return;
        }
        if (prefersReducedMotion()) return;
        const el = document.getElementById(CURTAIN_ID);
        if (!el) return;
        e.preventDefault();
        el.dataset.state = "covered";
        gsap.fromTo(
          el,
          { yPercent: 100, visibility: "visible" },
          { yPercent: 0, duration: 0.75, ease: "expo.inOut", onComplete: () => router.push(href) }
        );
      }}
    />
  );
}
