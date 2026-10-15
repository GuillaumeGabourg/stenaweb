"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, telHref, whatsappHref } from "@/content/offer";
import { PhoneIcon, WhatsAppIcon } from "../ContactLinks";
import { Button } from "../ui";

/**
 * Phones only: once the hero's buttons have scrolled away, call, WhatsApp and quote buttons stay within thumb reach
 * at the bottom of the screen. It hides again when the contact form is on screen.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const footer = document.querySelector("footer");
      const nearForm = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearForm && !atFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 sm:hidden"
        >
          <div className="flex gap-2">
            <a href={telHref} aria-label={`Appeler le ${site.phone}`} className="grid size-13 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
              <PhoneIcon />
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp" className="grid size-13 shrink-0 place-items-center rounded-xl border border-line bg-surface text-[#25d366]">
              <WhatsAppIcon />
            </a>
            <Button href="/#contact" size="lg" className="min-w-0 flex-1">
              Devis gratuit
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
