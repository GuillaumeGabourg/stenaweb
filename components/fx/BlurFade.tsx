/**
 * Content fades and rises in the first time it enters the viewport.
 * Pure CSS (`.reveal` in globals.css); the shared observer in RevealObserver adds `.in`.
 */
export function BlurFade({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag className={`reveal ${className ?? ""}`} style={delay ? ({ "--d": `${delay}s` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
