"use server";

export type ContactState = { status: "idle" | "ok" | "error"; message?: string; fields?: Record<string, string> };

const required = ["name", "email", "message"] as const;

/**
 * Receives a quote request. Sends it by e-mail through Resend when RESEND_API_KEY is set;
 * otherwise it is only logged on the server (local development).
 */
export async function sendContact(_: ContactState, form: FormData): Promise<ContactState> {
  const fields = Object.fromEntries(
    ["name", "company", "email", "phone", "project", "budget", "message", "website"].map((k) => [k, String(form.get(k) ?? "").trim()])
  );

  if (fields.website) return { status: "ok" }; // honeypot
  const missing = required.filter((k) => !fields[k]);
  if (missing.length) {
    return { status: "error", message: "Il manque votre nom, votre e-mail ou votre message.", fields };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) {
    return { status: "error", message: "Cette adresse e-mail ne semble pas valide. Vérifiez-la et renvoyez.", fields };
  }

  const text = Object.entries(fields)
    .filter(([k, v]) => v && k !== "website")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.info("[contact] demande reçue (envoi e-mail non configuré)\n" + text);
    return { status: "ok" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Tersel Web <onboarding@resend.dev>",
      to: [to],
      reply_to: fields.email,
      subject: `Demande de devis : ${fields.name}${fields.company ? ` (${fields.company})` : ""}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return { status: "error", message: "L'envoi n'a pas abouti. Réessayez dans un instant ou écrivez-nous directement par e-mail.", fields };
  }
  return { status: "ok" };
}
