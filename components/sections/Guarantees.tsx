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

/** Four commitments as small tilting tiles, content centred: icon, title, one line. */
export function Guarantees() {
  return (
    <section aria-label="Nos engagements" className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-24">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((it, i) => (
          <BlurFade as="li" key={it.title} delay={i * 0.07} className="h-full">
            <TiltCard className="rounded-2xl" max={6}>
              <div className="group/g flex h-full flex-col items-center rounded-2xl border border-line bg-surface px-3 py-6 text-center sm:px-6 sm:py-8">
                <span className="relative grid size-14 place-items-center rounded-full bg-accent-soft text-accent ring-1 ring-accent/25 transition-transform duration-500 ease-[var(--ease-out)] group-hover/g:-translate-y-1">
                  <span aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.25),transparent)] opacity-0 blur-md transition-opacity duration-500 group-hover/g:opacity-100" />
                  <svg viewBox="0 0 24 24" aria-hidden className="relative size-6" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                    {it.icon}
                  </svg>
                </span>
                <span className="mt-4 block text-base font-semibold sm:mt-5 sm:text-lg">{it.title}</span>
                <span className="mt-2 block max-w-[24ch] text-[15px] leading-snug text-muted">{it.text}</span>
              </div>
            </TiltCard>
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
