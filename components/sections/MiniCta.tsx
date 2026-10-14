import { BlurFade } from "../fx/BlurFade";
import { Button } from "../ui";

/** A one-line nudge toward the quote between two sections. */
export function MiniCta({ text, button = "Demander un devis", className }: { text: string; button?: string; className?: string }) {
  return (
    <BlurFade className={`mx-auto max-w-6xl px-5 md:px-8 ${className ?? ""}`}>
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-accent/35 bg-accent-soft/40 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl leading-tight md:text-[1.7rem]">{text}</p>
        <Button href="/#contact" className="shrink-0">
          {button}
        </Button>
      </div>
    </BlurFade>
  );
}
