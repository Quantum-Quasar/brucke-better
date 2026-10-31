/**
 * Canonical language-scoped lesson URL. Kept for legacy/shared links,
 * middle-click targets and the redirect layer; in-app opens use view state.
 */
export function lessonHref(languageId: string, lessonId: number): string {
  return `/trail/${languageId}/${lessonId}`;
}

/** Parse a lessonHref back into its course and lesson id. */
export function parseLessonHref(href: string): { languageId: string; lessonId: number } | null {
  const match = /^\/trail\/([a-z]{2})\/(\d+)\/?$/.exec(href);
  if (!match) return null;
  const lessonId = Number.parseInt(match[2], 10);
  if (!Number.isInteger(lessonId) || lessonId <= 0) return null;
  return { languageId: match[1], lessonId };
}
