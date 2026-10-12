import { Footer } from "./sections/Footer";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <main id="main" className="relative z-10 bg-ink px-5 pb-32 pt-36 md:px-8 md:pt-48">
        <h1 className="display text-[clamp(3rem,10vw,9rem)]">{title}</h1>
        <div className="mt-16 max-w-[68ch] space-y-10 text-lg leading-relaxed text-bone-dim [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-bone [&_mark]:rounded [&_mark]:bg-lime/15 [&_mark]:px-1 [&_mark]:text-lime">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
