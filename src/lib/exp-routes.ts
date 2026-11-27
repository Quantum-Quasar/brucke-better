/** Root of the experimental UI. Everything under it renders the new design. */
export const EXP_ROOT = "/exp-ui";

export function isExperimentalPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === EXP_ROOT || pathname.startsWith(`${EXP_ROOT}/`);
}

export function expLessonHref(languageId: string, lessonId: number): string {
  return `${EXP_ROOT}?lesson=${lessonId}&lang=${encodeURIComponent(languageId)}`;
}
