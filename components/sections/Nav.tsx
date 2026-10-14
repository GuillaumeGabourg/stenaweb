"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../fx/ThemeToggle";
import { Button } from "../ui";

const links = [
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#services", label: "Services" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "Questions" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/" className="font-display text-2xl leading-none" aria-label="Stenaweb, accueil" onClick={() => setOpen(false)}>
          Stena<span className="italic text-accent">web</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-lg px-3 py-2 text-[15px] text-muted transition-colors hover:bg-surface hover:text-text">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
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
      </div>
    </header>
  );
}
