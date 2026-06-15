// Prefixes local/public asset paths with the configured basePath.
//
// On the VPS the app is served at the domain root, so NEXT_PUBLIC_BASE_PATH is
// empty and this is a no-op. For the GitHub Pages demo the site is served from
// a repo subpath (e.g. /kassythreads), so every "/foo" asset must be rewritten
// to "/kassythreads/foo". next/image with a custom loader and raw <img>/<video>
// tags do NOT get basePath applied automatically, so we do it explicitly here.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || !path.startsWith("/")) return path;
  return `${base}${path}`;
}
