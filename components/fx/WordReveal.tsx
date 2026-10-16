import { Fragment } from "react";

type Part = string | { text: string; className: string };

/**
 * Words rise in one after the other, in pure CSS (`.reveal.word`, see globals.css).
 * They play when the heading enters the viewport; above the fold that is on load.
 */
export function WordReveal({ parts, delay = 0, stagger = 0.05 }: { parts: Part[]; trigger?: "load" | "view"; delay?: number; stagger?: number }) {
  const words = parts.flatMap((p) =>
    (typeof p === "string" ? p : p.text)
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text, className: typeof p === "string" ? undefined : p.className }))
  );

  return (
    <>
      <span className="sr-only">{words.map((w) => w.text).join(" ")}</span>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden className={`reveal word inline-block ${w.className ?? ""}`} style={{ "--d": `${delay + i * stagger}s` } as React.CSSProperties}>
            {w.text}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
