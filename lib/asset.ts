/** Prefix a /public path with the base path (GitHub Pages serves the site under /stenaweb). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
