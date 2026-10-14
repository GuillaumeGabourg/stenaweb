"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/content/offer";
import { Arrow, Check, SectionHead } from "../ui";

const projectTypes = ["Nouveau site", "Refonte", "Une page", "Je ne sais pas encore"];
const budgets = ["Moins de 1 000 €", "1 000 à 2 000 €", "Plus de 2 000 €", "Je ne sais pas"];

function Choice({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => (
        <label key={o} className="cursor-pointer">
          <input type="radio" name={name} value={o} defaultChecked={i === 0} className="peer sr-only" />
          <span className="block rounded-lg border border-line bg-bg px-3.5 py-2 text-[14px] text-muted transition-colors hover:border-text/30 hover:text-text peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

const field =
  "w-full rounded-lg border border-line bg-bg px-4 py-3 text-base text-text outline-none transition-colors placeholder:text-muted/60 hover:border-text/25 focus:border-accent";
const label = "mb-1.5 block text-[14px] font-medium";

export function Contact() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const v = state.fields ?? {};

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="contact-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHead
            id="contact-title"
            title="Parlons de votre projet"
            intro="Décrivez votre activité en quelques mots. On vous répond rapidement avec une première idée et un devis gratuit."
          />
          <ul className="mt-8 space-y-3 text-[15px]">
            {["Devis gratuit, sans engagement", "Rendez-vous sur place ou en visio", `Basés en ${site.area}`].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-muted">
                <Check className="text-accent" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <p className="text-[14px] text-muted">Vous préférez écrire directement ?</p>
            <a href={`mailto:${site.email}`} className="mt-1 inline-block text-lg font-medium text-accent underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>
        </div>

        <div className="beam relative rounded-2xl border border-line bg-surface p-6 md:p-8">
          {state.status === "ok" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center" role="status">
              <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
                <Check className="size-6" />
              </span>
              <p className="mt-5 font-display text-3xl font-semibold">Bien reçu, merci !</p>
              <p className="mt-3 max-w-[48ch] text-muted">Votre demande est arrivée. On revient vers vous très vite, par e-mail ou par téléphone.</p>
            </div>
          ) : (
            <form action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              {[
                { n: "name", l: "Votre nom", t: "text", ac: "name", req: true, ph: "Jean Dupont" },
                { n: "company", l: "Entreprise", t: "text", ac: "organization", req: false, ph: "Dupont Plomberie" },
                { n: "email", l: "E-mail", t: "email", ac: "email", req: true, ph: "jean@exemple.fr" },
                { n: "phone", l: "Téléphone", t: "tel", ac: "tel", req: false, ph: "06 12 34 56 78" },
              ].map((f) => (
                <div key={f.n}>
                  <label htmlFor={f.n} className={label}>
                    {f.l} {f.req ? <span className="text-accent">*</span> : <span className="font-normal text-muted">(facultatif)</span>}
                  </label>
                  <input id={f.n} name={f.n} type={f.t} autoComplete={f.ac} placeholder={f.ph} defaultValue={v[f.n]} required={f.req} className={field} />
                </div>
              ))}
              <fieldset className="sm:col-span-2">
                <legend className={label}>Votre projet</legend>
                <Choice name="project" options={projectTypes} />
              </fieldset>
              <fieldset className="sm:col-span-2">
                <legend className={label}>Budget envisagé</legend>
                <Choice name="budget" options={budgets} />
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>
                  Parlez-nous de votre activité <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Votre métier, votre secteur, ce que vous attendez du site…"
                  defaultValue={v.message}
                  className={`${field} resize-y`}
                />
              </div>
              {state.status === "error" && (
                <p role="alert" className="rounded-lg border border-[#e2735f]/40 bg-[#e2735f]/10 px-4 py-3 text-[15px] text-[#f2a596] sm:col-span-2">
                  {state.message}
                </p>
              )}
              <div className="flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-muted">Vos informations servent uniquement à vous répondre.</p>
                <button
                  type="submit"
                  disabled={pending}
                  className="shine group inline-flex h-12 shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-xl bg-accent px-6 font-medium text-accent-ink transition-colors hover:bg-[#f5c47c] disabled:opacity-60"
                >
                  {pending ? "Envoi en cours…" : "Envoyer ma demande"}
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
