import type { AppState, LanguageProgress, ProgressVersions } from "./types";

export const emptyVersions = (): ProgressVersions => ({ lessonProgress: {}, wordMastery: {}, srsCards: {}, sentenceCards: {} });
export function getWeekString(date = new Date()): string {
  // purely local time: keyed by the local Monday of that week — never mixes
  // local getters with UTC setters
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayNum = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - dayNum);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-W${mm}-${dd}`;
}
/** The active language's slice as currently mirrored on the top-level state. */
export function sliceFromMirrors(state: AppState): LanguageProgress {
  return {
    completedLessons: state.completedLessons,
    currentLessonId: state.currentLessonId,
    lessonProgress: state.lessonProgress,
    lessonStars: state.lessonStars,
    passedGateIds: state.passedGateIds,
    wordMastery: state.wordMastery,
    srsCards: state.srsCards,
    sentenceCards: state.sentenceCards,
    weeklyActivity: state.weeklyActivity,
    lastActivityWeek: state.lastActivityWeek,
    progressVersions: state.progressVersions,
  };
}

function mergeVersioned<T>(current: Record<string, T>, incoming: Record<string, T>, currentVersions: Record<string, string>, incomingVersions: Record<string, string>, preferLegacyIncoming: boolean): { values: Record<string, T>; versions: Record<string, string> } {
  const values: Record<string, T> = {};
  const versions: Record<string, string> = {};
  for (const key of new Set([...Object.keys(current), ...Object.keys(incoming), ...Object.keys(currentVersions), ...Object.keys(incomingVersions)])) {
    const a = currentVersions[key] ?? "";
    const b = incomingVersions[key] ?? "";
    // Legacy entries lack versions: retain the existing tab's value on a tie.
    const useIncoming = b > a || (a === "" && b === "" && key in incoming && (preferLegacyIncoming || !(key in current)));
    const source = useIncoming ? incoming : current;
    if (key in source) values[key] = source[key];
    if (a || b) versions[key] = useIncoming ? b : a;
  }
  return { values, versions };
}

/** Union-merge for re-hydration (cross-tab `storage` events must not delete
 * progress this tab already holds). */
export function mergeLanguageSlice(current: LanguageProgress, incoming: LanguageProgress, preferLegacyIncoming = false): LanguageProgress {
  const a = current.progressVersions ?? emptyVersions();
  const b = incoming.progressVersions ?? emptyVersions();
  const lessons = mergeVersioned(current.lessonProgress, incoming.lessonProgress, a.lessonProgress, b.lessonProgress, preferLegacyIncoming);
  const mastery = mergeVersioned(current.wordMastery, incoming.wordMastery, a.wordMastery, b.wordMastery, preferLegacyIncoming);
  const cards = mergeVersioned(current.srsCards, incoming.srsCards, a.srsCards, b.srsCards, preferLegacyIncoming);
  const sentenceCards = mergeVersioned(current.sentenceCards ?? {}, incoming.sentenceCards ?? {}, a.sentenceCards ?? {}, b.sentenceCards ?? {}, preferLegacyIncoming);
  const lessonStars = { ...current.lessonStars, ...incoming.lessonStars };
  for (const [id, star] of Object.entries(current.lessonStars)) {
    if (star === "purple") lessonStars[Number(id)] = star;
  }
  const sameWeek = current.lastActivityWeek === incoming.lastActivityWeek;
  const incomingIsNewerWeek = (incoming.lastActivityWeek ?? "") > (current.lastActivityWeek ?? "");
  return {
    completedLessons: Array.from(new Set([...current.completedLessons, ...incoming.completedLessons])),
    currentLessonId: Math.max(current.currentLessonId, incoming.currentLessonId),
    lessonProgress: lessons.values,
    lessonStars,
    passedGateIds: Array.from(new Set([...current.passedGateIds, ...incoming.passedGateIds])),
    wordMastery: mastery.values,
    srsCards: cards.values,
    sentenceCards: sentenceCards.values,
    progressVersions: { lessonProgress: lessons.versions, wordMastery: mastery.versions, srsCards: cards.versions, sentenceCards: sentenceCards.versions },
    weeklyActivity: sameWeek
      ? current.weeklyActivity.map((day, index) => day || incoming.weeklyActivity[index])
      : incomingIsNewerWeek ? incoming.weeklyActivity : current.weeklyActivity,
    lastActivityWeek: incomingIsNewerWeek ? incoming.lastActivityWeek : current.lastActivityWeek,
  };
}
