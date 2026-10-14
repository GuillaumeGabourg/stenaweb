import { BlurFade } from "../fx/BlurFade";
import { TiltCard } from "../fx/TiltCard";

const items = [
  {
    title: "Devis gratuit",
    text: "Sans engagement, détaillé ligne par ligne.",
    icon: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4" />,
  },
  {
    title: "Prix fixé à l'avance",
    text: "Le prix du devis est celui que vous payez.",
    icon: <path d="M20 12l-8 8-9-9V3h8zM7.5 7.5h.01" />,
  },
  {
    title: "Un seul interlocuteur",
    text: "La même personne du premier appel à la mise en ligne.",
    icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />,
  },
  {
    title: "Adapté au mobile",
    text: "Testé sur téléphone, tablette et ordinateur.",
    icon: <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" />,
  },
];

/** Four commitments, as a compact band of small tilting tiles. */
export function Guarantees() {
  return (
    <section aria-label="Nos engagements" className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-24">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <BlurFade as="li" key={it.title} delay={i * 0.07}>
            <TiltCard className="rounded-2xl" max={6}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                    {it.icon}
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold">{it.title}</span>
                  <span className="mt-1 block text-base leading-snug text-muted sm:text-[15px]">{it.text}</span>
                </span>
              </div>
            </TiltCard>
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
