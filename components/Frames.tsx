import Image from "next/image";
import clsx from "clsx";
import { asset } from "@/lib/asset";

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
    <div className={clsx("overflow-hidden rounded-xl border border-line bg-surface-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]", className)}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-text/20" />
          <span className="size-2.5 rounded-full bg-text/20" />
          <span className="size-2.5 rounded-full bg-text/20" />
        </span>
        <span className="truncate rounded-md bg-bg/70 px-3 py-1 font-mono text-[11px] text-muted">{host}</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={asset(src)} alt={alt} fill sizes={sizes} priority={priority} loading={eager || priority ? "eager" : "lazy"} className="object-cover object-top" />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={clsx("rounded-[34px] border border-text/15 bg-bg p-1.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)]", className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[26px]">
        <Image src={asset(src)} alt={alt} fill sizes="(min-width: 1024px) 14vw, 40vw" loading={eager ? "eager" : "lazy"} className="object-cover object-top" />
      </div>
    </div>
  );
}
