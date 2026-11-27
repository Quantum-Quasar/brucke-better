/** Roots of the experimental UIs. Everything under one renders that design. */
export const EXP_ROOT = "/exp-ui";
export const EXP2_ROOT = "/exp-ui2";
export const EXP3_ROOT = "/exp-ui3";
export const EXP4_ROOT = "/exp-ui4";
const EXP_ROOTS = [EXP_ROOT, EXP2_ROOT, EXP3_ROOT, EXP4_ROOT] as const;

/** The experimental root a pathname belongs to, or null for every other route. */
export function expRootOf(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  for (const root of EXP_ROOTS) {
    if (pathname === root || pathname.startsWith(`${root}/`)) return root;
  }
  return null;
}

export function isExperimentalPath(pathname: string | null | undefined): boolean {
  return expRootOf(pathname) !== null;
}

export function expLessonHref(languageId: string, lessonId: number, root: string = EXP_ROOT): string {
  return `${root}?lesson=${lessonId}&lang=${encodeURIComponent(languageId)}`;
}
