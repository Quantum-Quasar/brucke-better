import type { LessonProgress, LessonSegment, LessonStar, MasteryState, ReviewMode, SentenceCard, SRSCard } from "../types";
import type { AppState, LanguageProgress, ToleranceSettings, VersionedField } from "./types";
import { emptyVersions } from "./progress-state";
import { DEFAULT_THEME } from "../theme-runtime";
import { DEFAULT_FONT } from "@/data/fonts";
import { type CustomizationSettings, DEFAULT_SETTINGS } from "@/data/settings";
import { DEFAULT_LANGUAGE_ID, getLanguageDefinition, isValidLanguageId } from "@/data/languages";

import { localDateKey } from "../srs";
/** Structural guard for persisted-state and backup payloads: any non-null,
 * non-array object qualifies. Field-level validation and defaults are applied
 * afterwards (normalizeParsedState), so a partial payload is repaired —
 * never a crash and never a reason to discard the other store. */
export function isPlausibleStateObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
export const isDangerousKey = (key: string): boolean =>
  key === "__proto__" || key === "constructor" || key === "prototype" || key === "toString" || key === "valueOf";

// --- validated schema -------------------------------------------------------
// Storage hydration and backup import share one set of validators. A payload
// repaired on load must never be a payload import rejects, and a junk field must
// never reach state where an action like setLessonProgress would throw on it.

const LESSON_SEGMENTS: readonly LessonSegment[] = ["hook", "pattern", "table", "practice", "summary"];
const LESSON_STARS: readonly LessonStar[] = ["gold", "purple"];
const MASTERY_STATES: readonly MasteryState[] = ["unexplored", "explored", "encountered", "mastered"];
export const VALID_REVIEW_MODES: readonly ReviewMode[] = ["flashcard", "mcq", "tiles", "typing"];

export function emptyWeek(): boolean[] {
  return [false, false, false, false, false, false, false];
}

export function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

// Appearance ids reach the cookie and the head script's CSS attributes, which
// only accept this shape. Repair anything else at the storage/import boundary
// so a hostile or corrupt backup cannot bloat the cookie past its budget.
// Font ids may carry spaces (older backups stored display names); quotes,
// slashes and semicolons are what must never reach the CSS/cookie payload.
export const SAFE_THEME_ID = /^[a-zA-Z0-9_-]{1,64}$/;
export const SAFE_FONT_ID = /^[a-zA-Z0-9 _-]{1,64}$/;

export function normalizeThemeId(value: unknown, fallback: string): string {
  return typeof value === "string" && SAFE_THEME_ID.test(value) ? value : fallback;
}

export function normalizeFontId(value: unknown, fallback: string): string {
  return typeof value === "string" && SAFE_FONT_ID.test(value) ? value : fallback;
}

function coerceBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function coerceCount(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : fallback;
}

function coerceVolume(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : fallback;
}

/** Lesson ids are positive integers. Strings are only coerced for backups,
 * whose legacy format used "lesson_03"-style ids. */
export function parseLessonId(value: unknown, coerceString = false): number | null {
  if (typeof value === "number") {
    return Number.isInteger(value) && value >= 1 ? value : null;
  }
  if (coerceString && typeof value === "string") {
    const parsed = parseInt(value.replace(/[^\d]/g, ""), 10);
    return Number.isNaN(parsed) || parsed < 1 ? null : parsed;
  }
  return null;
}

export function normalizeLessonIdList(raw: unknown, coerceString = false): number[] {
  if (!Array.isArray(raw)) return [];
  const ids: number[] = [];
  for (const item of raw) {
    const id = parseLessonId(item, coerceString);
    if (id !== null && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export function normalizeWeeklyActivity(raw: unknown): boolean[] | null {
  if (!Array.isArray(raw) || raw.length !== 7) return null;
  return raw.map((day) => day === true);
}

function normalizeWeekKey(raw: unknown): string | undefined {
  return typeof raw === "string" && raw.length > 0 ? raw : undefined;
}

export function sanitizeLessonProgressEntry(raw: unknown): LessonProgress | null {
  if (!isPlausibleStateObject(raw)) return null;
  const segment = raw.segment;
  if (typeof segment !== "string" || !(LESSON_SEGMENTS as readonly string[]).includes(segment)) return null;
  const practiceIndex = raw.practiceIndex;
  if (typeof practiceIndex !== "number" || !Number.isInteger(practiceIndex) || practiceIndex < 0) return null;
  const rawCompleted = raw.completedSegments;
  if (!Array.isArray(rawCompleted)) return null;
  const completedSegments: LessonSegment[] = [];
  for (const item of rawCompleted) {
    if (typeof item !== "string" || !(LESSON_SEGMENTS as readonly string[]).includes(item)) return null;
    if (!completedSegments.includes(item as LessonSegment)) completedSegments.push(item as LessonSegment);
  }
  const entry: LessonProgress = {
    segment: segment as LessonSegment,
    practiceIndex,
    completedSegments,
  };
  if (typeof raw.everQueued === "boolean") entry.everQueued = raw.everQueued;
  if (Array.isArray(raw.retryExerciseIds)) {
    entry.retryExerciseIds = [...new Set(raw.retryExerciseIds.filter(
      (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200
    ))].slice(0, 100);
  }
  if (typeof raw.inRetryPhase === "boolean") entry.inRetryPhase = raw.inRetryPhase;
  if (typeof raw.retryIndex === "number" && Number.isInteger(raw.retryIndex) && raw.retryIndex >= 0) {
    entry.retryIndex = raw.retryIndex;
  }
  return entry;
}

export function normalizeLessonProgress(raw: unknown): Record<number, LessonProgress> {
  const progress: Record<number, LessonProgress> = {};
  if (!isPlausibleStateObject(raw)) return progress;
  for (const [key, value] of Object.entries(raw)) {
    if (isDangerousKey(key)) continue;
    const lessonId = parseLessonId(key, true);
    if (lessonId === null) continue;
    const entry = sanitizeLessonProgressEntry(value);
    if (entry) progress[lessonId] = entry;
  }
  return progress;
}

export function normalizeLessonStars(raw: unknown): Record<number, LessonStar> {
  const stars: Record<number, LessonStar> = {};
  if (!isPlausibleStateObject(raw)) return stars;
  for (const [key, value] of Object.entries(raw)) {
    if (isDangerousKey(key)) continue;
    const lessonId = parseLessonId(key, true);
    if (lessonId === null) continue;
    if (typeof value === "string" && (LESSON_STARS as readonly string[]).includes(value)) {
      stars[lessonId] = value as LessonStar;
    }
  }
  return stars;
}

export function normalizeWordMastery(raw: unknown): Record<string, MasteryState> {
  const mastery: Record<string, MasteryState> = {};
  if (!isPlausibleStateObject(raw)) return mastery;
  for (const [wordId, value] of Object.entries(raw)) {
    if (!wordId || isDangerousKey(wordId)) continue;
    if (typeof value === "string" && (MASTERY_STATES as readonly string[]).includes(value)) {
      mastery[wordId] = value as MasteryState;
    }
  }
  return mastery;
}

/** Storage-shaped SRS map: entries are re-keyed by their own `word_id` where
 * available so a truncated/legacy payload cannot leave null cards behind. */
function normalizeSrsCards(raw: unknown): Record<string, SRSCard> {
  const cards: Record<string, SRSCard> = {};
  if (!isPlausibleStateObject(raw)) return cards;
  for (const [key, value] of Object.entries(raw)) {
    if (!key || isDangerousKey(key)) continue;
    const card = sanitizeImportedSrsCard(value, key);
    if (!card) continue;
    cards[card.word_id] = card;
  }
  return cards;
}

export function normalizeSentenceCards(raw: unknown): Record<string, SentenceCard> {
  const cards: Record<string, SentenceCard> = {};
  if (!isPlausibleStateObject(raw)) return cards;
  for (const [id, value] of Object.entries(raw)) {
    if (!isPlausibleStateObject(value) || isDangerousKey(id)) continue;
    const lessonId = parseLessonId(value.lessonId);
    const exerciseId = value.exerciseId;
    if (!lessonId || typeof exerciseId !== "string" || !exerciseId || exerciseId.length > 200 || isDangerousKey(exerciseId)) continue;
    if (id !== `${lessonId}:${exerciseId}` || value.id !== id) continue;
    const schedule = sanitizeImportedSrsCard(value, id);
    if (!schedule) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(schedule.due_date)) continue;
    const dueDate = new Date(`${schedule.due_date}T12:00:00`);
    if (!Number.isFinite(dueDate.getTime()) || localDateKey(dueDate) !== schedule.due_date) continue;
    if (schedule.last_reviewed !== null && !Number.isFinite(Date.parse(schedule.last_reviewed))) continue;
    const { word_id: _wordId, guessed: _guessed, ...fields } = schedule;
    cards[id] = { ...fields, id, lessonId, exerciseId };
  }
  return cards;
}

/** Backup-shaped SRS import: keyed by the backup's own key (or array `id`), so
 * a card's `word_id` stays metadata instead of silently moving the map key. */
export function importSrsCards(raw: unknown, base: Record<string, SRSCard>): Record<string, SRSCard> {
  const cards: Record<string, SRSCard> = { ...base };
  if (Array.isArray(raw)) {
    for (const entry of raw) {
      if (!isPlausibleStateObject(entry)) continue;
      const key = typeof entry.id === "string" && entry.id
        ? entry.id
        : typeof entry.word_id === "string" && entry.word_id
        ? entry.word_id
        : null;
      if (!key || isDangerousKey(key)) continue;
      const card = sanitizeImportedSrsCard(entry, key);
      if (card) cards[key] = card;
    }
  } else if (isPlausibleStateObject(raw)) {
    for (const [key, entry] of Object.entries(raw)) {
      if (!key || isDangerousKey(key)) continue;
      const card = sanitizeImportedSrsCard(entry, key);
      if (card) cards[key] = card;
    }
  }
  return cards;
}

export function normalizeSettings(raw: unknown, fallback: CustomizationSettings): CustomizationSettings {
  const source = isPlausibleStateObject(raw) ? raw : {};
  return {
    quickRestart: oneOf(source.quickRestart, ["off", "esc"] as const, fallback.quickRestart),
    lazyMode: coerceBoolean(source.lazyMode, fallback.lazyMode),
    capitalizationTolerance: coerceBoolean(source.capitalizationTolerance, fallback.capitalizationTolerance),
    stopOnError: oneOf(source.stopOnError, ["off", "letter"] as const, fallback.stopOnError),
    confidenceMode: oneOf(source.confidenceMode, ["off", "on"] as const, fallback.confidenceMode),
    showCharBar: oneOf(source.showCharBar, ["always", "on_focus", "off"] as const, fallback.showCharBar),
    soundVolume: coerceVolume(source.soundVolume, fallback.soundVolume),
    playSoundOnClick: typeof source.playSoundOnClick === "string" ? source.playSoundOnClick : fallback.playSoundOnClick,
    playSoundOnError: typeof source.playSoundOnError === "string" ? source.playSoundOnError : fallback.playSoundOnError,
    showKeyTips: coerceBoolean(source.showKeyTips, fallback.showKeyTips),
    capsLockWarning: coerceBoolean(source.capsLockWarning, fallback.capsLockWarning),
    showMasteryCounter: coerceBoolean(source.showMasteryCounter, fallback.showMasteryCounter),
    increasedContrast: coerceBoolean(source.increasedContrast, fallback.increasedContrast),
    showPostureCues: coerceBoolean(source.showPostureCues, fallback.showPostureCues),
    posturePrimerSeen: coerceBoolean(source.posturePrimerSeen, fallback.posturePrimerSeen),
    listeningSkippedUntil: coerceCount(source.listeningSkippedUntil, fallback.listeningSkippedUntil),
  };
}

export function normalizeTolerance(
  raw: unknown,
  settings: Pick<CustomizationSettings, "lazyMode" | "capitalizationTolerance"> | null | undefined,
  fallback: ToleranceSettings
): ToleranceSettings {
  const source = isPlausibleStateObject(raw) ? raw : {};
  const umlautFallback = typeof settings?.lazyMode === "boolean" ? settings.lazyMode : fallback.umlautTolerance;
  const capitalizationFallback =
    typeof settings?.capitalizationTolerance === "boolean"
      ? settings.capitalizationTolerance
      : fallback.capitalizationTolerance;
  return {
    umlautTolerance: coerceBoolean(source.umlautTolerance, umlautFallback),
    capitalizationTolerance: coerceBoolean(source.capitalizationTolerance, capitalizationFallback),
    umlautDismissals: coerceCount(source.umlautDismissals, fallback.umlautDismissals),
    capitalizationDismissals: coerceCount(source.capitalizationDismissals, fallback.capitalizationDismissals),
  };
}

export function normalizeLanguageSlice(raw: unknown): LanguageProgress {
  const slice = isPlausibleStateObject(raw) ? raw : {};
  const versions = emptyVersions();
  if (isPlausibleStateObject(slice.progressVersions)) {
    for (const field of Object.keys(versions) as VersionedField[]) {
      const entries = slice.progressVersions[field];
      if (!isPlausibleStateObject(entries)) continue;
      for (const [key, version] of Object.entries(entries)) {
        if (!isDangerousKey(key) && typeof version === "string" && /^\d{16}:[a-z0-9]+$/.test(version)) {
          versions[field][key] = version;
        }
      }
    }
  }
  return {
    completedLessons: normalizeLessonIdList(slice.completedLessons),
    currentLessonId: parseLessonId(slice.currentLessonId) ?? 1,
    lessonProgress: normalizeLessonProgress(slice.lessonProgress),
    lessonStars: normalizeLessonStars(slice.lessonStars),
    passedGateIds: normalizeLessonIdList(slice.passedGateIds),
    wordMastery: normalizeWordMastery(slice.wordMastery),
    srsCards: normalizeSrsCards(slice.srsCards),
    sentenceCards: normalizeSentenceCards(slice.sentenceCards),
    weeklyActivity: normalizeWeeklyActivity(slice.weeklyActivity) ?? emptyWeek(),
    lastActivityWeek: normalizeWeekKey(slice.lastActivityWeek),
    progressVersions: versions,
  };
}

function normalizeProgressByLanguage(raw: unknown): Record<string, LanguageProgress> {
  const slices: Record<string, LanguageProgress> = {};
  if (!isPlausibleStateObject(raw)) return slices;
  for (const [langId, slice] of Object.entries(raw)) {
    if (!isValidLanguageId(langId) || isDangerousKey(langId)) continue;
    slices[langId] = normalizeLanguageSlice(slice);
  }
  return slices;
}

/** The raw backup slice keeps whatever fields it actually carries; a field the
 * backup omits must keep the current value instead of being defaulted away. */
export function applyImportedSlice(base: LanguageProgress | undefined, rawSlice: unknown): LanguageProgress {
  const current = base ?? normalizeLanguageSlice({});
  if (!isPlausibleStateObject(rawSlice)) return current;
  const patch: Partial<LanguageProgress> = {};
  if ("completedLessons" in rawSlice) patch.completedLessons = normalizeLessonIdList(rawSlice.completedLessons);
  if ("currentLessonId" in rawSlice) {
    const lessonId = parseLessonId(rawSlice.currentLessonId);
    if (lessonId !== null) patch.currentLessonId = lessonId;
  }
  if ("lessonProgress" in rawSlice) patch.lessonProgress = normalizeLessonProgress(rawSlice.lessonProgress);
  if ("lessonStars" in rawSlice) patch.lessonStars = normalizeLessonStars(rawSlice.lessonStars);
  if ("passedGateIds" in rawSlice) patch.passedGateIds = normalizeLessonIdList(rawSlice.passedGateIds);
  if ("wordMastery" in rawSlice) patch.wordMastery = normalizeWordMastery(rawSlice.wordMastery);
  if ("srsCards" in rawSlice) patch.srsCards = importSrsCards(rawSlice.srsCards, {});
  if ("sentenceCards" in rawSlice) patch.sentenceCards = normalizeSentenceCards(rawSlice.sentenceCards);
  if ("weeklyActivity" in rawSlice) {
    const week = normalizeWeeklyActivity(rawSlice.weeklyActivity);
    if (week) patch.weeklyActivity = week;
  }
  if ("lastActivityWeek" in rawSlice && typeof rawSlice.lastActivityWeek === "string" && rawSlice.lastActivityWeek) {
    patch.lastActivityWeek = rawSlice.lastActivityWeek;
  }
  return { ...current, ...patch };
}
/** Applies schema defaults & legacy migrations to a parsed persisted-state
 * object (mutates and returns it). */
export function normalizeParsedState(parsed: Record<string, any>): Partial<AppState> {
  // Top-level (pre-multi-language) progress, validated before it can seed a
  // language slice or the mirrored state.
  const topLevelProgress: LanguageProgress = {
    completedLessons: normalizeLessonIdList(parsed.completedLessons),
    currentLessonId: parseLessonId(parsed.currentLessonId) ?? 1,
    lessonProgress: normalizeLessonProgress(parsed.lessonProgress),
    lessonStars: normalizeLessonStars(parsed.lessonStars),
    passedGateIds: normalizeLessonIdList(parsed.passedGateIds),
    wordMastery: normalizeWordMastery(parsed.wordMastery),
    srsCards: normalizeSrsCards(parsed.srsCards),
    sentenceCards: normalizeSentenceCards(parsed.sentenceCards),
    weeklyActivity: normalizeWeeklyActivity(parsed.weeklyActivity) ?? emptyWeek(),
    lastActivityWeek: normalizeWeekKey(parsed.lastActivityWeek),
  };
  parsed.completedLessons = topLevelProgress.completedLessons;
  parsed.currentLessonId = topLevelProgress.currentLessonId;
  parsed.lessonProgress = topLevelProgress.lessonProgress;
  parsed.lessonStars = topLevelProgress.lessonStars;
  parsed.passedGateIds = topLevelProgress.passedGateIds;
  parsed.wordMastery = topLevelProgress.wordMastery;
  parsed.srsCards = topLevelProgress.srsCards;
  parsed.sentenceCards = topLevelProgress.sentenceCards;
  parsed.weeklyActivity = topLevelProgress.weeklyActivity;
  parsed.lastActivityWeek = topLevelProgress.lastActivityWeek;

  if (isPlausibleStateObject(parsed.settings)) {
    parsed.settings = normalizeSettings(parsed.settings, DEFAULT_SETTINGS);
  } else if (parsed.settings !== undefined) {
    delete parsed.settings;
  }

  if (parsed.theme !== undefined) parsed.theme = normalizeThemeId(parsed.theme, DEFAULT_THEME);
  if (parsed.font !== undefined) parsed.font = normalizeFontId(parsed.font, DEFAULT_FONT);

  if (parsed.tolerance !== undefined) {
    parsed.tolerance = normalizeTolerance(parsed.tolerance, parsed.settings, {
      umlautTolerance: Boolean(parsed.settings?.lazyMode),
      capitalizationTolerance: Boolean(parsed.settings?.capitalizationTolerance),
      umlautDismissals: 0,
      capitalizationDismissals: 0,
    });
  }

  if (parsed.preferredReviewMode !== undefined) {
    parsed.preferredReviewMode = oneOf(parsed.preferredReviewMode, VALID_REVIEW_MODES, "flashcard");
  }

  // Language slices: pre-multi-language saves kept progress only on the top
  // level — migrate it into the default language's slice so nobody loses a
  // day of progress.
  if (!isValidLanguageId(parsed.activeLanguageId)) {
    parsed.activeLanguageId = DEFAULT_LANGUAGE_ID;
  }
  // languages without content are hidden from the UI — anyone parked on one
  // (e.g. from before it was pulled) gets moved back to the default language
  if (getLanguageDefinition(parsed.activeLanguageId).status !== "available") {
    parsed.activeLanguageId = DEFAULT_LANGUAGE_ID;
  }

  const progressByLanguage = normalizeProgressByLanguage(parsed.progressByLanguage);
  const activeSlice = progressByLanguage[parsed.activeLanguageId] ?? topLevelProgress;
  progressByLanguage[parsed.activeLanguageId] = activeSlice;
  parsed.progressByLanguage = progressByLanguage;

  parsed.seenIntroLanguages = Array.isArray(parsed.seenIntroLanguages)
    ? Array.from(new Set(parsed.seenIntroLanguages.filter((id: unknown): id is string => isValidLanguageId(id))))
    : [];

  // The top-level fields always mirror the active language's (validated) slice.
  parsed.completedLessons = activeSlice.completedLessons;
  parsed.currentLessonId = activeSlice.currentLessonId;
  parsed.lessonProgress = activeSlice.lessonProgress;
  parsed.lessonStars = activeSlice.lessonStars;
  parsed.passedGateIds = activeSlice.passedGateIds;
  parsed.wordMastery = activeSlice.wordMastery;
  parsed.srsCards = activeSlice.srsCards;
  parsed.sentenceCards = activeSlice.sentenceCards;
  parsed.weeklyActivity = activeSlice.weeklyActivity;
  parsed.lastActivityWeek = activeSlice.lastActivityWeek;
  parsed.progressResetAt =
    typeof parsed.progressResetAt === "number" && Number.isFinite(parsed.progressResetAt) && parsed.progressResetAt > 0
      ? Math.floor(parsed.progressResetAt)
      : 0;
  parsed.progressResetActor = typeof parsed.progressResetActor === "string" && /^[a-z0-9]{1,32}$/.test(parsed.progressResetActor)
    ? parsed.progressResetActor : "";

  return parsed;
}
function sanitizeImportedSrsCard(raw: unknown, fallbackId: string): SRSCard | null {
  if (!isPlausibleStateObject(raw)) return null;
  const clampNum = (v: unknown, min: number, max: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : null;

  const interval = clampNum(raw.interval, 0, 36500);
  const repetitions = clampNum(raw.repetitions ?? raw.repetition, 0, 10000);
  const easeFactor = clampNum(raw.ease_factor ?? raw.efactor ?? raw.ease, 1.3, 5);
  const dueDate = raw.due_date ?? raw.dueDate;
  const lastReviewed = raw.last_reviewed ?? raw.lastReviewed ?? null;

  // A card without its scheduling fields is not a card: leaving it in the map
  // makes getDueCards() (and therefore the whole review page) throw on boot.
  if (interval === null || repetitions === null || easeFactor === null) return null;
  if (typeof dueDate !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(dueDate)) return null;
  if (lastReviewed !== null && typeof lastReviewed !== "string") return null;

  const wordId = typeof raw.word_id === "string" && raw.word_id ? raw.word_id : fallbackId;
  if (!wordId || isDangerousKey(wordId)) return null;

  const card: SRSCard = {
    word_id: wordId,
    interval: Math.floor(interval),
    repetitions: Math.floor(repetitions),
    ease_factor: easeFactor,
    due_date: dueDate,
    lapses: Math.floor(clampNum(raw.lapses, 0, 10000) ?? 0),
    last_reviewed: lastReviewed,
  };
  const guessed = clampNum(raw.guessed, 0, 1_000_000);
  if (guessed !== null) card.guessed = Math.floor(guessed);
  return card;
}
