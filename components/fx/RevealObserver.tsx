"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every `.reveal` element (cheaper than one per block),
 * and the automatic light mode: on modest hardware, or if the page runs well under 60 images/s once loaded,
 * `html.lite` switches off the costliest decorative effects for the rest of the visit.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    const scan = (root: ParentNode) => root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    scan(document);
    // Blocks that appear later (form states, client navigation) join in too.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches(".reveal:not(.in)") ? io.observe(n) : scan(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("lite")) return;
    const lite = () => {
      root.classList.add("lite");
      try {
        sessionStorage.setItem("lite", "1");
      } catch {}
    };
    // Modest hardware is known up front: 4 GB of memory or less, or two cores or fewer.
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if ((mem && mem <= 4) || navigator.hardwareConcurrency <= 2) return lite();
    let frames = 0;
    let start = 0;
    let raf = 0;
    const count = (t: number) => {
      if (document.hidden) return; // a background tab is throttled: not a fair measure
      if (!start) start = t;
      frames++;
      if (t - start < 1500) {
        raf = requestAnimationFrame(count);
        return;
      }
      if ((frames * 1000) / (t - start) < 40) lite();
    };
    // Measure once the page has settled after load.
    const t = setTimeout(() => (raf = requestAnimationFrame(count)), 1200);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
