import { Footer } from "./sections/Footer";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <main id="main" className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <h1 className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-tight">{title}</h1>
        <div className="mt-10 max-w-[68ch] space-y-8 leading-relaxed text-muted [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text [&_mark]:rounded [&_mark]:bg-accent-soft [&_mark]:px-1 [&_mark]:text-accent">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
