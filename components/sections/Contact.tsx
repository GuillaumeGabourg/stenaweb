"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useActionState, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/content/offer";
import { BlurFade } from "../fx/BlurFade";
import { Arrow, Check, SectionHead } from "../ui";

const projectTypes = ["Nouveau site", "Refonte", "Une page", "Je ne sais pas encore"];
const budgets = ["Moins de 1 000 €", "1 000 à 2 000 €", "Plus de 2 000 €", "Je ne sais pas"];
const ease = [0.16, 1, 0.3, 1] as const;

/** Radio chips; the amber highlight slides from the old choice to the new one. */
function Choice({ name, options }: { name: string; options: string[] }) {
  const [value, setValue] = useState(options[0]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <label key={o} className="relative cursor-pointer">
            <input type="radio" name={name} value={o} checked={on} onChange={() => setValue(o)} className="peer sr-only" />
            {on && (
              <motion.span
                layoutId={`chip-${name}`}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-lg border border-accent bg-accent-soft"
              />
            )}
            <span
              className={`relative block rounded-lg border px-3.5 py-2 text-[14px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                on ? "border-transparent text-accent" : "border-line bg-bg text-muted hover:border-text/30 hover:text-text"
              }`}
            >
              {o}
            </span>
          </label>
        );
      })}
    </div>
  );
}

const field =
  "peer w-full rounded-lg border border-line bg-bg px-4 py-3 text-base text-text outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted/80 hover:border-text/25 focus:border-accent focus:bg-[color-mix(in_oklab,var(--accent)_4%,var(--bg))] focus:shadow-[0_0_0_4px_rgb(var(--glow)/0.12),0_10px_30px_-12px_rgb(var(--glow)/0.35)]";
const label = "mb-1.5 block text-[14px] font-medium transition-colors duration-300 group-focus-within/f:text-accent";

/** Success: a check draws itself while small sparks burst out. */
function Sent() {
  const reduced = useReducedMotion();
  return (
    <div className="flex min-h-[460px] flex-col items-start justify-center" role="status">
      <div className="relative grid size-16 place-items-center">
        {!reduced &&
          Array.from({ length: 12 }, (_, k) => {
            const a = (k / 12) * Math.PI * 2;
            return (
              <motion.span
                key={k}
                aria-hidden
                className="absolute size-1.5 rounded-full bg-accent"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(a) * 52, y: Math.sin(a) * 52, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              />
            );
          })}
        <motion.span
          className="grid size-16 place-items-center rounded-full bg-accent text-accent-ink"
          initial={{ scale: reduced ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
        >
          <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.25 }} />
          </svg>
        </motion.span>
      </div>
      <motion.p
        className="mt-6 font-display text-4xl"
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.45, ease }}
      >
        Bien reçu, merci !
      </motion.p>
      <motion.p
        className="mt-3 text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.6, ease }}
      >
        Votre demande est arrivée. On revient vers vous très vite, par e-mail ou par téléphone.
      </motion.p>
    </div>
  );
}

export function Contact() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const v = state.fields ?? {};
  const [filled, setFilled] = useState(() => [v.name, v.email, v.message].filter(Boolean).length);

  // Count the required answers as the visitor types, to show how close the request is to ready.
  const track = (e: React.FormEvent<HTMLFormElement>) => {
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    setFilled(
      [String(f.get("name") ?? "").trim(), /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? email : "", String(f.get("message") ?? "").trim()].filter(Boolean).length
    );
  };
  const ready = filled === 3;

  // Inline validation: checked when a field is left, and on submit (errors appear under their field).
  const [errors, setErrors] = useState<Record<string, string>>({});
  const check = (name: string, value: string) => {
    const v = value.trim();
    if (name === "name" && !v) return "Indiquez votre nom pour qu'on sache à qui répondre.";
    if (name === "email" && !v) return "Indiquez votre e-mail pour recevoir notre réponse.";
    if (name === "email" && !/^[^@s]+@[^@s]+.[^@s]+$/.test(v)) return "Cette adresse ne semble pas complète, par exemple : jean@exemple.fr";
    if (name === "message" && !v) return "Dites-nous en deux mots ce que fait votre entreprise.";
    return "";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!["name", "email", "message"].includes(e.target.name)) return;
    // Don't scold an empty field the visitor simply tabbed through for the first time.
    if (!e.target.value.trim() && !errors[e.target.name]) return;
    setErrors((p) => ({ ...p, [e.target.name]: check(e.target.name, e.target.value) }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const n of ["name", "email", "message"]) next[n] = check(n, String(fd.get(n) ?? ""));
    setErrors(next);
    const first = ["name", "email", "message"].find((n) => next[n]);
    if (first) {
      e.preventDefault();
      document.getElementById(first)?.focus();
    }
  };
  const errorProps = (n: string) =>
    errors[n] ? { "aria-invalid": true as const, "aria-describedby": `${n}-error` } : {};
  const ErrorText = ({ n }: { n: string }) =>
    errors[n] ? (
      <motion.p id={`${n}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[14px] text-danger">
        {errors[n]}
      </motion.p>
    ) : null;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="contact-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHead
            id="contact-title"
            title="Parlons de votre projet"
            intro="Décrivez votre activité en quelques mots. On vous répond rapidement avec une première idée et un devis gratuit."
          />
          <ul className="mt-8 space-y-3 text-base sm:text-[15px]">
            {["Devis gratuit, sans engagement", "Rendez-vous sur place ou en visio", `Basés en ${site.area}, on se déplace aux alentours`].map((t, i) => (
              <BlurFade as="li" key={t} delay={0.1 + i * 0.08} className="flex items-center gap-2.5 text-muted">
                <Check className="text-accent" />
                {t}
              </BlurFade>
            ))}
          </ul>
          <BlurFade delay={0.35}>
            <a
              href={`mailto:${site.email}`}
              className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <span>
                <span className="block text-[14px] text-muted">Vous préférez écrire directement ?</span>
                <span className="mt-1 block text-lg font-medium text-accent">{site.email}</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <Arrow />
              </span>
            </a>
          </BlurFade>
        </div>

        <BlurFade delay={0.1}>
          <div className="beam relative rounded-2xl border border-line bg-surface p-6 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {state.status === "ok" ? (
                <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Sent />
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }} transition={{ duration: 0.3 }} action={action} onInput={track} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  {[
                    { n: "name", l: "Votre nom", t: "text", ac: "name", req: true, ph: "Jean Dupont" },
                    { n: "company", l: "Entreprise", t: "text", ac: "organization", req: false, ph: "Dupont Plomberie" },
                    { n: "email", l: "E-mail", t: "email", ac: "email", req: true, ph: "jean@exemple.fr" },
                    { n: "phone", l: "Téléphone", t: "tel", ac: "tel", req: false, ph: "06 12 34 56 78" },
                  ].map((f) => (
                    <div key={f.n} className="group/f">
                      <label htmlFor={f.n} className={label}>
                        {f.l} {f.req ? <span className="text-accent">*</span> : <span className="font-normal text-muted">(facultatif)</span>}
                      </label>
                      <input id={f.n} name={f.n} type={f.t} autoComplete={f.ac} placeholder={f.ph} defaultValue={v[f.n]} required={f.req} onBlur={onBlur} {...errorProps(f.n)} className={`${field} ${errors[f.n] ? "border-danger" : ""}`} />
                      <ErrorText n={f.n} />
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
                  <div className="group/f sm:col-span-2">
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
                      onBlur={onBlur}
                      {...errorProps("message")}
                      className={`${field} resize-y ${errors.message ? "border-danger" : ""}`}
                    />
                    <ErrorText n="message" />
                  </div>

                  {/* How close the request is to ready */}
                  <div className="sm:col-span-2" aria-live="polite">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className={ready ? "text-accent" : "text-muted"}>{ready ? "Votre demande est prête à partir" : "Champs obligatoires remplis"}</span>
                      <span className="tabular-nums text-muted">{filled} / 3</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-text/10">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        animate={{ width: `${(filled / 3) * 100}%` }}
                        transition={{ type: "spring", stiffness: 160, damping: 22 }}
                      />
                    </div>
                  </div>

                  {state.status === "error" && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                      transition={{ duration: 0.45 }}
                      className="rounded-lg border border-[#e2735f]/40 bg-[#e2735f]/10 px-4 py-3 text-base sm:text-[15px] text-danger sm:col-span-2"
                    >
                      {state.message}
                    </motion.p>
                  )}
                  <div className="flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13px] text-muted">Vos informations servent uniquement à vous répondre.</p>
                    <button
                      type="submit"
                      disabled={pending}
                      className={`shine group inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent px-6 font-medium text-accent-ink transition-[background-color,box-shadow] duration-500 hover:bg-accent-hover disabled:opacity-70 ${
                        ready ? "shadow-[0_0_0_4px_rgb(var(--glow)/0.18),0_12px_32px_-10px_rgb(var(--glow)/0.6)]" : ""
                      }`}
                    >
                      {pending ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" aria-hidden />
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          Envoyer ma demande
                          <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
