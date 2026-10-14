/** Small looping illustrations, one per service. Pure CSS; loops stop under reduced motion. */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden className="relative h-44 overflow-hidden rounded-xl border border-line bg-bg">
      {children}
    </div>
  );
}

/** Design: a little site mock whose colour scheme keeps changing, as if we were trying options. */
export function DesignVisual() {
  return (
    <Frame>
      <div className="absolute inset-4 [animation:hue_9s_ease-in-out_infinite]">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-14 rounded-full bg-accent" />
          <span className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-text/20" />
            <span className="h-1.5 w-6 rounded-full bg-text/20" />
            <span className="h-1.5 w-6 rounded-full bg-text/20" />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-4">
          <div className="space-y-2">
            <span className="block h-3 w-[90%] rounded-full bg-text/70" />
            <span className="block h-3 w-[70%] rounded-full bg-text/70" />
            <span className="block h-1.5 w-[85%] rounded-full bg-text/20" />
            <span className="block h-1.5 w-[60%] rounded-full bg-text/20" />
            <span className="mt-3 block h-6 w-20 rounded-md bg-accent" />
          </div>
          <div className="rounded-lg bg-gradient-to-br from-accent/80 to-[#d6785f]/60" />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {["#efb45f", "#7fb3e6", "#8fd18a", "#e58f7a"].map((c, i) => (
          <span key={c} className="size-3.5 rounded-full ring-2 ring-bg [animation:swatch_9s_ease-in-out_infinite]" style={{ background: c, animationDelay: `${i * 2.25}s` }} />
        ))}
      </div>
    </Frame>
  );
}

const code = [
  { w: "62%", c: "bg-accent/80" },
  { w: "78%", c: "bg-text/30", indent: true },
  { w: "54%", c: "bg-[#7fb3e6]/70", indent: true },
  { w: "70%", c: "bg-text/30", indent: true },
  { w: "40%", c: "bg-[#8fd18a]/70", indent: true },
  { w: "28%", c: "bg-accent/80" },
];

/** Development: lines of code typing themselves out, then starting again. */
export function DevVisual() {
  return (
    <Frame>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-text/15" />
        <span className="size-2 rounded-full bg-text/15" />
        <span className="size-2 rounded-full bg-text/15" />
        <span className="ml-2 text-[11px] text-muted">votre-site.fr</span>
      </div>
      <div className="space-y-2.5 p-4">
        {code.map((l, i) => (
          <div key={i} className={`flex items-center gap-2 ${l.indent ? "pl-5" : ""}`}>
            <span className="w-3 text-right text-[10px] text-muted/60">{i + 1}</span>
            <span
              className={`block h-2 w-[var(--w)] rounded-full ${l.c} [animation:type_6s_steps(14)_infinite]`}
              style={{ ["--w" as string]: l.w, animationDelay: `${i * 0.45}s` }}
            />
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** Local SEO: a search for a trade nearby, where "your business" climbs to the top result. */
export function SeoVisual() {
  return (
    <Frame>
      <div className="m-3 flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-muted">
        <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="9" cy="9" r="6" />
          <path d="M14 14l4 4" strokeLinecap="round" />
        </svg>
        plombier près de chez moi
      </div>
      <div className="relative mx-3 h-[104px]">
        {[0, 1].map((n) => (
          <div
            key={n}
            className="absolute inset-x-0 flex h-8 items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 [animation:other_7s_ease-in-out_infinite]"
            style={{ top: `${n * 36}px` }}
          >
            <span className="size-3 rounded-sm bg-text/20" />
            <span className="h-1.5 w-24 rounded-full bg-text/20" />
          </div>
        ))}
        <div className="absolute inset-x-0 top-[72px] z-10 flex h-8 items-center gap-2 rounded-lg border border-accent/50 bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] px-3 shadow-[0_8px_20px_-8px_rgb(var(--glow)/0.4)] [animation:climb_7s_ease-in-out_infinite]">
          <span className="size-3 rounded-sm bg-accent" />
          <span className="text-[12px] font-medium text-text">Votre entreprise</span>
          <span className="ml-auto flex gap-0.5 text-accent">
            {[0, 1, 2, 3, 4].map((k) => (
              <svg key={k} viewBox="0 0 20 20" className="size-2.5">
                <path fill="currentColor" d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
              </svg>
            ))}
          </span>
        </div>
      </div>
    </Frame>
  );
}

/** Hosting & follow-up: the site is live, and small requests get ticked off one by one. */
export function CareVisual() {
  const tasks = ["Nom de domaine", "Certificat HTTPS", "Nouvelles photos", "Horaires d'été"];
  return (
    <Frame>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[12px]">
        <span className="text-muted">votre-site.fr</span>
        <span className="inline-flex items-center gap-1.5 text-[#8fd18a]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#8fd18a] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#8fd18a]" />
          </span>
          En ligne
        </span>
      </div>
      <ul className="space-y-2 p-4">
        {tasks.map((t, i) => (
          <li key={t} className="flex items-center gap-2.5 text-[13px] text-muted">
            <span
              className="grid size-4 place-items-center rounded border border-accent bg-accent text-accent-ink [animation:tick_8s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              <svg viewBox="0 0 20 20" className="size-3" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t}
          </li>
        ))}
      </ul>
    </Frame>
  );
}
