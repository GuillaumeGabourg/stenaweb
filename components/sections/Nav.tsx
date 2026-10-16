"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../fx/ThemeToggle";
import { site, telHref } from "@/content/offer";
import { CallButtons, PhoneIcon } from "../ContactLinks";
import { Button } from "../ui";

const links = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/#services", label: "Services" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "Questions" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  // Highlight the section currently under the header (home page only).
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    // Sections without a nav link (steps, zone, contact) clear the highlight when they reach the header.
    const ids = ["realisations", "services", "etapes", "zone", "tarifs", "faq", "contact"];
    const onScroll = () => {
      const line = 120;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-bg/95" : "border-transparent bg-bg/0"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8" aria-label="Navigation principale">
        <Link href="/" className="font-display text-2xl leading-none" aria-label="Tersel Web, accueil" onClick={() => setOpen(false)}>
          Tersel <span className="italic text-accent">web</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const on = l.href.includes("#") ? active === l.href.split("#")[1] : pathname.startsWith(l.href) || (l.href === "/realisations" && pathname.startsWith("/projets"));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={on ? "location" : undefined}
                  className={`relative block rounded-lg px-3 py-2 text-[15px] transition-colors ${on ? "text-text" : "text-muted hover:text-text"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-surface"
                    >
                      <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />
                    </motion.span>
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={telHref}
            aria-label={`Appeler le ${site.phone}`}
            title={site.phone}
            className="hidden h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-[15px] text-text transition-colors duration-300 hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            <PhoneIcon className="size-[18px] text-accent" />
            <span className="hidden tabular-nums xl:inline">{site.phone}</span>
          </a>
          <span className="hidden sm:block">
            <Button href="/#contact">Demander un devis</Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            className="grid size-11 place-items-center rounded-xl border border-line bg-surface lg:hidden"
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-text transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-text transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="menu"
        hidden={!open}
        className="border-t border-line bg-bg px-5 pb-6 pt-2 lg:hidden"
      >
        <ul>
          {[...links, { href: "/#contact", label: "Contact" }].map((l) => (
            <li key={l.href} className="border-b border-line">
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-4 text-lg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href="/#contact" size="lg" className="mt-6 w-full" onClick={() => setOpen(false)}>
          Demander un devis
        </Button>
        <CallButtons quiet className="mt-3" />
      </div>
    </header>
  );
}
