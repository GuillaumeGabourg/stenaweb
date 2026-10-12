"use client";

import { useActionState, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/content/offer";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "../ui";

const projectTypes = ["Nouveau site", "Refonte", "Une page", "Je ne sais pas encore"];
const budgets = ["< 1 000 €", "1 000 – 2 000 €", "2 000 € +"];

/** Letters swell along the width axis under the pointer. */
function StretchLine({ text }: { text: string }) {
  return (
    <span className="block whitespace-nowrap" aria-hidden>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="inline-block transition-[font-variation-settings] duration-500 ease-[var(--ease-out)] [font-variation-settings:'wdth'_var(--wdth)] hover:[font-variation-settings:'wdth'_125]"
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

function Choice({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => (
        <label key={o} className="cursor-pointer">
          <input type="radio" name={name} value={o} defaultChecked={i === 0} className="peer sr-only" />
          <span className="block rounded-full border border-ink/25 px-4 py-2 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-lime peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

const field =
  "peer w-full border-b border-ink/25 bg-transparent pb-3 pt-6 text-lg text-ink outline-none transition-colors placeholder:text-transparent focus:border-ink";
const label =
  "pointer-events-none absolute left-0 top-6 origin-left text-lg text-ink/55 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

export function Contact() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".ct-line", {
        yPercent: 105,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  const v = state.fields ?? {};

  return (
    <section ref={root} id="contact" className="rounded-t-[28px] bg-lime px-5 pb-16 pt-16 text-ink md:px-8 md:pb-20 md:pt-32" aria-labelledby="contact-title">
      <h2 id="contact-title" className="display text-[clamp(3.2rem,12vw,13rem)]">
        <span className="sr-only">Parlons de votre projet</span>
        <span className="line-mask block">
          <span className="ct-line block">
            <StretchLine text="Parlons de" />
          </span>
        </span>
        <span className="line-mask block">
          <span className="ct-line block">
            <StretchLine text="votre projet" />
          </span>
        </span>
      </h2>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
        <div className="space-y-8 md:col-span-5">
          <p className="text-xl leading-snug">
            Décrivez votre activité en quelques mots. On vous répond sous 24 h avec une première idée et un devis gratuit.
          </p>
          <div className="space-y-1 border-t border-ink/20 pt-6">
            <p className="text-sm text-ink/60">Écrivez-nous directement</p>
            <a href={`mailto:${site.email}`} className="text-2xl font-medium underline decoration-1 hover:decoration-2">
              {site.email}
            </a>
          </div>
          <p className="text-sm text-ink/60">Basés en {site.area}. Rendez-vous sur place ou en visio.</p>
        </div>

        {state.status === "ok" ? (
          <div className="flex flex-col justify-center rounded-[16px] bg-ink p-10 text-bone md:col-span-7" role="status">
            <p className="display text-5xl text-lime md:text-7xl">Bien reçu !</p>
            <p className="mt-4 max-w-[60ch] text-lg text-bone-dim">
              Merci, votre demande est arrivée. On revient vers vous sous 24 h, par e-mail ou par téléphone.
            </p>
          </div>
        ) : (
          <form action={action} className="grid gap-x-8 gap-y-6 md:col-span-7 md:grid-cols-2" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            {[
              { n: "name", l: "Votre nom *", t: "text", ac: "name" },
              { n: "company", l: "Entreprise", t: "text", ac: "organization" },
              { n: "email", l: "E-mail *", t: "email", ac: "email" },
              { n: "phone", l: "Téléphone", t: "tel", ac: "tel" },
            ].map((f) => (
              <div key={f.n} className="relative">
                <input id={f.n} name={f.n} type={f.t} autoComplete={f.ac} placeholder={f.l} defaultValue={v[f.n]} className={field} />
                <label htmlFor={f.n} className={label}>
                  {f.l}
                </label>
              </div>
            ))}
            <fieldset className="space-y-3 md:col-span-2">
              <legend className="mb-3 text-sm text-ink/60">Votre projet</legend>
              <Choice name="project" options={projectTypes} />
            </fieldset>
            <fieldset className="space-y-3 md:col-span-2">
              <legend className="mb-3 text-sm text-ink/60">Budget envisagé</legend>
              <Choice name="budget" options={budgets} />
            </fieldset>
            <div className="relative md:col-span-2">
              <textarea id="message" name="message" rows={4} placeholder="Message" defaultValue={v.message} className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>
                Parlez-nous de votre activité *
              </label>
            </div>
            {state.status === "error" && (
              <p role="alert" className="rounded-xl bg-ink px-4 py-3 text-sm text-lime md:col-span-2">
                {state.message}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
              <p className="text-xs text-ink/60">Vos informations servent uniquement à vous répondre.</p>
              <button
                type="submit"
                disabled={pending}
                className="group inline-flex h-16 items-center gap-3 rounded-full bg-ink px-8 text-lg font-medium text-lime transition-colors hover:bg-ink-3 disabled:opacity-60"
              >
                {pending ? "Envoi en cours…" : "Envoyer ma demande"}
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
