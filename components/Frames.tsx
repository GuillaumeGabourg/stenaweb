import Image from "next/image";
import clsx from "clsx";

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority,
  eager,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  eager?: boolean;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className={clsx("overflow-hidden rounded-[14px] border border-line bg-ink-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]", className)}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-bone/20" />
          <span className="size-2.5 rounded-full bg-bone/20" />
          <span className="size-2.5 rounded-full bg-bone/20" />
        </span>
        <span className="truncate rounded-md bg-ink/60 px-3 py-1 font-mono text-[11px] text-bone-dim">{host}</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} loading={eager || priority ? "eager" : "lazy"} className="object-cover object-top" />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={clsx("rounded-[34px] border border-bone/15 bg-ink p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]", className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[26px]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 14vw, 40vw" loading={eager ? "eager" : "lazy"} className="object-cover object-top" />
      </div>
    </div>
  );
}
