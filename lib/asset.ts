/** Prefix a /public path with the base path (GitHub Pages serves the site under /tersel-web). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
