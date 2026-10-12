// Stand-in for app/actions.ts on the static GitHub Pages build, which has no server:
// same validation, but the request is not sent anywhere (demo only).

export type ContactState = { status: "idle" | "ok" | "error"; message?: string; fields?: Record<string, string> };

export async function sendContact(_: ContactState, form: FormData): Promise<ContactState> {
  const fields = Object.fromEntries(
    ["name", "company", "email", "phone", "project", "budget", "message"].map((k) => [k, String(form.get(k) ?? "").trim()])
  );
  if (!fields.name || !fields.email || !fields.message) {
    return { status: "error", message: "Il manque votre nom, votre e-mail ou votre message.", fields };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) {
    return { status: "error", message: "Cette adresse e-mail ne semble pas valide. Vérifiez-la et renvoyez.", fields };
  }
  return { status: "ok" };
}
