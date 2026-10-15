import clsx from "clsx";
import { site, socials, telHref, whatsappHref } from "@/content/offer";

type IconProps = { className?: string };

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-5 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-5 shrink-0", className)} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" />
    </svg>
  );
}

function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-5 shrink-0", className)} fill="currentColor">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.19-1.79 4.13-1.15 1.15-2.93 2.4-6.05 2.4-4.83 0-8.6-3.89-8.6-8.72s3.77-8.72 8.6-8.72c2.6 0 4.51 1.03 5.91 2.35l2.31-2.31C18.75 1.44 16.13 0 12.48 0 5.87 0 .31 5.39.31 12s5.56 12 12.17 12c3.57 0 6.27-1.17 8.37-3.36 2.16-2.16 2.84-5.21 2.84-7.67 0-.76-.05-1.47-.17-2.05H12.48z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-5 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("size-5 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

const socialIcons = { google: GoogleIcon, facebook: FacebookIcon, instagram: InstagramIcon };

/** Round icon links to the Google profile and social pages (list lives in content/offer.ts). */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={clsx("flex flex-wrap gap-2", className)}>
      {socials.map((s) => {
        const Icon = socialIcons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Tersel Web sur ${s.label} (nouvel onglet)`}
              title={s.label}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** "Appeler" and "WhatsApp" side by side, the two quickest ways to reach us. `quiet` keeps both neutral (next to another amber button). */
export function CallButtons({ className, quiet }: { className?: string; quiet?: boolean }) {
  const base =
    "group flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5";
  return (
    <div className={clsx("grid gap-3", quiet ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2", className)}>
      <a href={telHref} className={clsx(base, quiet ? "border-line bg-surface hover:border-accent/50" : "shine border-accent bg-accent text-accent-ink hover:bg-accent-hover")}>
        <PhoneIcon className={quiet ? "text-accent" : undefined} />
        <span className="leading-tight">
          {quiet ? (
            <>
              <span className="block whitespace-nowrap text-[13px] tabular-nums text-muted">{site.phone}</span>
              <span className="block font-medium">Appeler</span>
            </>
          ) : (
            <>
              <span className="block text-[13px] opacity-80">Appeler</span>
              <span className="block whitespace-nowrap font-medium tabular-nums">{site.phone}</span>
            </>
          )}
        </span>
      </a>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={clsx(base, "border-line bg-surface hover:border-[#25d366]/50")}>
        <WhatsAppIcon className="text-[#25d366]" />
        <span className="leading-tight">
          <span className="block text-[13px] text-muted">Écrire sur</span>
          <span className="block font-medium">WhatsApp</span>
        </span>
      </a>
    </div>
  );
}
