"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Anchor links (/#services…) land with the section's top edge exactly under the fixed header,
 * so no strip of the previous section is left visible above it.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const go = (id: string, smooth: boolean) => {
      const el = document.getElementById(id);
      if (!el) return false;
      // The bar itself, not the whole header: an open mobile menu must not count.
      const bar = document.querySelector("header > nav")?.getBoundingClientRect().height ?? 0;
      const header = bar ? bar + 1 : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : header);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: smooth && !reduced ? "smooth" : "auto" });
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !url.hash) return;
      // Only same-page anchors; links to another page keep their normal navigation.
      if (url.pathname.replace(/\/$/, "") !== location.pathname.replace(/\/$/, "")) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      // preventDefault stops Next's Link navigation; the click still reaches onClick handlers (closing the menu).
      e.preventDefault();
      history.pushState(null, "", url.hash);
      requestAnimationFrame(() => go(id, true));
    };
    // Capture phase, so it runs before Next's Link handler.
    document.addEventListener("click", onClick, true);

    // Arriving from another page with a hash: align once the layout has settled.
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => go(id, false));
      const t = setTimeout(() => go(id, false), 400);
      return () => {
        document.removeEventListener("click", onClick, true);
        clearTimeout(t);
      };
    }
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
