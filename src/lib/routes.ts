export type UiVariantPrefix = "" | "/taste" | "/design";

/**
 * Detect whether a pathname belongs to one of the experimental UI shells
 * (`/taste/...` or `/design/...`). Normal routes always return `""`.
 */
export function getUiVariantPrefix(pathname: string | null | undefined): UiVariantPrefix {
  if (!pathname) return "";
  if (pathname === "/taste" || pathname.startsWith("/taste/")) return "/taste";
  if (pathname === "/design" || pathname.startsWith("/design/")) return "/design";
  return "";
}

/**
 * Strip the `/taste` or `/design` prefix from a pathname so route comparisons
 * (like `/` or `/atlas`) work identically across default and experimental UIs.
 */
export function stripUiVariantPrefix(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  const prefix = getUiVariantPrefix(pathname);
  if (!prefix) return pathname;
  const rest = pathname.slice(prefix.length);
  return rest === "" ? "/" : rest;
}

/**
 * Prefix an internal route path with the active experimental UI prefix (if any).
 * On normal routes (`""`), returns `path` unchanged.
 */
export function withUiVariantPrefix(path: string, pathname: string | null | undefined): string {
  const prefix = getUiVariantPrefix(pathname);
  if (!prefix) return path;
  if (path === "/") return prefix;
  if (path.startsWith("/?")) return `${prefix}${path}`;
  if (path.startsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
}

/**
 * Crawlable language-scoped lesson page. In-app clicks use instant view state;
 * shared links and modifier-clicks render the authored lesson overview.
 */
export function lessonHref(languageId: string, lessonId: number, pathname?: string | null): string {
  const base = `/trail/${languageId}/${lessonId}`;
  return pathname ? withUiVariantPrefix(base, pathname) : base;
}

/** Parse a lessonHref back into its course and lesson id. */
export function parseLessonHref(href: string): { languageId: string; lessonId: number } | null {
  const match = /^(?:\/(?:taste|design))?\/trail\/([a-z]{2})\/(\d+)\/?$/.exec(href);
  if (!match) return null;
  const lessonId = Number.parseInt(match[2], 10);
  if (!Number.isInteger(lessonId) || lessonId <= 0) return null;
  return { languageId: match[1], lessonId };
}
