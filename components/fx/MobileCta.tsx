"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui";

/**
 * Phones only: once the hero's buttons have scrolled away, a quote button stays within thumb reach
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
          <Button href="/#contact" size="lg" className="w-full">
            Demander un devis gratuit
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
