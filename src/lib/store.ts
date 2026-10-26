"use client";

// ponytail: lightweight zustand store with localStorage persistence and word-level state

import { create } from "zustand";
import type { LessonProgress, LessonSegment, LessonStar, MasteryState, ReviewMode, SRSCard } from "./types";
import { createInitialCard, gradeCard, isMastered, type ReviewGrade } from "./srs";
import { applyTheme, DEFAULT_THEME } from "@/data/themes";
import { applyFont, DEFAULT_FONT } from "@/data/fonts";
import { type CustomizationSettings, DEFAULT_SETTINGS } from "@/data/settings";
import { DEFAULT_LANGUAGE_ID, getLanguageDefinition, isValidLanguageId } from "@/data/languages";
import { applyAppearanceSettings } from "./appearance";
import { soundEngine } from "./sound";
import { STORAGE_KEY, STORAGE_COOKIE_KEY } from "./storage-keys";

export interface ToleranceSettings {
  umlautTolerance: boolean;
  capitalizationTolerance: boolean;
  umlautDismissals: number;
  capitalizationDismissals: number;
}

/**
 * Everything that is language-scoped in a learner's progress. The store keeps
 * the ACTIVE language's slice mirrored onto the top-level fields
 * (completedLessons, wordMastery, …) so the rest of the app reads them
 * unchanged; switching languages swaps the mirrored slice.
 */
export interface LanguageProgress {
  completedLessons: number[];
  currentLessonId: number;
  lessonProgress: Record<number, LessonProgress>;
  lessonStars: Record<number, LessonStar>;
  wordMastery: Record<string, MasteryState>;
  srsCards: Record<string, SRSCard>;
  weeklyActivity: boolean[]; // 7 days Mon-Sun
  lastActivityWeek?: string;
}

/**
 * What "back" in a review session restores: the card's SM-2 state and its
 * word-mastery entry as they were before this session graded the word.
 * `mastery: null` means the word had no mastery entry at all.
 */
export interface ReviewSnapshot {
  card: SRSCard;
  mastery: MasteryState | null;
}

export interface AppState {
  /** which language the user is currently learning (global preference) */
  activeLanguageId: string;
  /** per-language progress; the active slice is mirrored to the fields above */
  progressByLanguage: Record<string, LanguageProgress>;
  /** languages whose onboarding introduction has been seen */
  seenIntroLanguages: string[];
  completedLessons: number[];
  currentLessonId: number;
  lessonProgress: Record<number, LessonProgress>;
  /** gold = completed; purple = flawless run (retry queue untouched, including a clean replay). Purple is never downgraded. */
  lessonStars: Record<number, LessonStar>;
  wordMastery: Record<string, MasteryState>;
  srsCards: Record<string, SRSCard>;
  weeklyActivity: boolean[]; // 7 days Mon-Sun
  lastActivityWeek?: string;
  /**
   * Wall-clock marker for the last destructive progress reset/import. Cross-tab
   * hydration unions progress so one tab's save cannot erase another's, but a
   * union can never observe a deletion — this marker tells the other tabs that
   * the incoming snapshot is a replacement, not an addition. Persisted.
   */
  progressResetAt: number;
  activeWordDrawerId: string | null;
  tolerance: ToleranceSettings;
  preferredReviewMode: ReviewMode;
  hasCompletedOnboarding: boolean;
  isOnboardingOpen: boolean;
  /** when onboarding auto-opens from a language switch: which language's intro to play (transient) */
  onboardingIntroLanguage: string | null;
  hasSeenGenderIntro: boolean;
  theme: string;
  isThemeSelectorOpen: boolean;
  font: string;
  isFontSelectorOpen: boolean;
  settings: CustomizationSettings;
  /**
   * Transient (never persisted): true once the client has applied the saved
   * state — or confirmed there is none. Components that copy store values into
   * local state at mount (LessonReader's segment/practice position) wait for
   * this before adopting them, because child effects run before the root
   * layout's hydration effect.
   */
  storeHydrated: boolean;
  /** Transient: increments on every hydration pass so open views can re-adopt
   * cross-tab progress instead of overwriting it with their mount snapshot. */
  hydrateEpoch: number;

  // Actions
  setActiveLanguage: (languageId: string) => void;
  updateSetting: <K extends keyof CustomizationSettings>(key: K, value: CustomizationSettings[K]) => void;
  resetSettings: () => void;
  setTheme: (theme: string) => void;
  openThemeSelector: () => void;
  closeThemeSelector: () => void;
  setFont: (font: string) => void;
  openFontSelector: () => void;
  closeFontSelector: () => void;
  markWordExplored: (wordId: string) => void;
  markWordEncountered: (wordId: string) => void;
  markWordsEncountered: (wordIds: string[]) => void;
  /** Gives every given word a fresh SM-2 card (due today) unless it already has one, so finished lessons feed "due today". */
  seedSrsCards: (wordIds: string[]) => void;
  markWordMastered: (wordId: string) => void;
  completeLesson: (lessonId: number, opts?: { perfect?: boolean; nextLessonId?: number | null }) => void;
  setLessonProgress: (lessonId: number, progress: LessonProgress) => void;
  recordReview: (wordId: string, grade: ReviewGrade) => void;
  /**
   * Undoes a grade this review session applied, restoring the card to the state
   * it had before the session touched it, along with the word's mastery entry.
   * SM-2 grading is destructive and not invertible (ease/interval/lapses all
   * move in one direction), so the session snapshots each card's state on its
   * first grade and restores the snapshot here. A word never graded this session
   * keeps whatever it had.
   *
   * `mastery: null` means the word had no mastery entry — recordReview would
   * have set "encountered"/"mastered", so the entry is removed again.
   */
  restoreSrsCard: (wordId: string, snapshot: ReviewSnapshot) => void;
  /**
   * TM-6: the learner answered correctly but flagged "I guessed". Honest signal —
   * re-grade the involved words as Hard so they return soon, and count the guess.
   * The guidebook's promise ("we will revisit everything you are uncertain of")
   * only holds if uncertainty is observable even when the answer is right.
   */
  flagGuessed: (wordIds: string[]) => void;
  /** TM-6: silence every dictation exercise for `ms` (default 15 minutes). */
  skipListeningFor: (ms?: number) => void;
  setPreferredReviewMode: (mode: ReviewMode) => void;
  completeOnboarding: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  dismissGenderIntro: () => void;
  openGenderIntro: () => void;
  openWordDrawer: (wordId: string) => void;
  closeWordDrawer: () => void;
  setUmlautTolerance: (enabled: boolean) => void;
  setCapitalizationTolerance: (enabled: boolean) => void;
  dismissUmlautPrompt: () => void;
  dismissCapitalizationPrompt: () => void;
  logDailyActivity: () => void;
  resetProgress: () => void;
  /**
   * Apply persisted state on the client. The first call is authoritative; later
   * plain calls are no-ops because React Strict Mode runs the mount effect
   * twice and a second read could re-apply storage that a child effect already
   * overwrote. Pass `{ reread: true }` to deliberately re-read storage (a
   * cross-tab `storage` event, or a test that re-seeds storage).
   */
  hydrateFromStorage: (options?: { reread?: boolean }) => void;
  importBackupState: (payload: unknown) => boolean;
}

export { STORAGE_KEY, STORAGE_COOKIE_KEY } from "./storage-keys";

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

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  if (!match) return null;
  // A stray "%" in the raw cookie (written by another app, an older build, or
  // an extension) makes decodeURIComponent throw a URIError. This runs at
  // module load via loadSavedState, so an unguarded throw is a white screen
  // before React can mount. Fall back to the captured bytes instead.
  try {
    return decodeURIComponent(match[2]);
  } catch {
    return match[2];
  }
}

export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const isSecure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${isSecure}`;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

/** Structural guard for persisted-state and backup payloads: any non-null,
 * non-array object qualifies. Field-level validation and defaults are applied
 * afterwards (normalizeParsedState), so a partial payload is repaired —
 * never a crash and never a reason to discard the other store. */
export function isPlausibleStateObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseStoredJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Storage access can throw (privacy modes, blocked cookies/storage). This runs
 * at module load via `loadSavedState`, so an unguarded getItem would white-screen
 * the app before React mounts; degrade to "no saved state" instead. */
function safeStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function loadSavedState(): Partial<AppState> {
  if (typeof window === "undefined") return {};

  // Parse BOTH stores before choosing a base: a valid-but-truncated
  // localStorage payload must not bury recoverable cookie data. The cookie
  // write runs in the same saveState pass as localStorage, so it is never
  // staler than the localStorage snapshot it accompanies.
  const local = parseStoredJson(safeStorageGet(STORAGE_KEY));
  const cookie = parseStoredJson(getCookie(STORAGE_COOKIE_KEY));

  let parsed: Record<string, unknown> | null = null;
  if (isPlausibleStateObject(local) && isPlausibleStateObject(cookie)) {
    // Field-level merge: localStorage wins for every field it actually has;
    // the cookie fills whatever the localStorage payload is missing.
    parsed = { ...cookie, ...local };
  } else if (isPlausibleStateObject(local)) {
    parsed = local;
  } else if (isPlausibleStateObject(cookie)) {
    parsed = cookie;
  }

  if (parsed) {
    return normalizeParsedState(parsed);
  }
  return {};
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
const VALID_REVIEW_MODES: readonly ReviewMode[] = ["flashcard", "mcq", "tiles", "typing"];

function emptyWeek(): boolean[] {
  return [false, false, false, false, false, false, false];
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
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
function parseLessonId(value: unknown, coerceString = false): number | null {
  if (typeof value === "number") {
    return Number.isInteger(value) && value >= 1 ? value : null;
  }
  if (coerceString && typeof value === "string") {
    const parsed = parseInt(value.replace(/[^\d]/g, ""), 10);
    return Number.isNaN(parsed) || parsed < 1 ? null : parsed;
  }
  return null;
}

function normalizeLessonIdList(raw: unknown, coerceString = false): number[] {
  if (!Array.isArray(raw)) return [];
  const ids: number[] = [];
  for (const item of raw) {
    const id = parseLessonId(item, coerceString);
    if (id !== null && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

function normalizeWeeklyActivity(raw: unknown): boolean[] | null {
  if (!Array.isArray(raw) || raw.length !== 7) return null;
  return raw.map((day) => day === true);
}

function normalizeWeekKey(raw: unknown): string | undefined {
  return typeof raw === "string" && raw.length > 0 ? raw : undefined;
}

function sanitizeLessonProgressEntry(raw: unknown): LessonProgress | null {
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
  return entry;
}

function normalizeLessonProgress(raw: unknown): Record<number, LessonProgress> {
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

function normalizeLessonStars(raw: unknown): Record<number, LessonStar> {
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

function normalizeWordMastery(raw: unknown): Record<string, MasteryState> {
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

/** Backup-shaped SRS import: keyed by the backup's own key (or array `id`), so
 * a card's `word_id` stays metadata instead of silently moving the map key. */
function importSrsCards(raw: unknown, base: Record<string, SRSCard>): Record<string, SRSCard> {
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

function normalizeSettings(raw: unknown, fallback: CustomizationSettings): CustomizationSettings {
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

function normalizeTolerance(
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

function normalizeLanguageSlice(raw: unknown): LanguageProgress {
  const slice = isPlausibleStateObject(raw) ? raw : {};
  return {
    completedLessons: normalizeLessonIdList(slice.completedLessons),
    currentLessonId: parseLessonId(slice.currentLessonId) ?? 1,
    lessonProgress: normalizeLessonProgress(slice.lessonProgress),
    lessonStars: normalizeLessonStars(slice.lessonStars),
    wordMastery: normalizeWordMastery(slice.wordMastery),
    srsCards: normalizeSrsCards(slice.srsCards),
    weeklyActivity: normalizeWeeklyActivity(slice.weeklyActivity) ?? emptyWeek(),
    lastActivityWeek: normalizeWeekKey(slice.lastActivityWeek),
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
function applyImportedSlice(base: LanguageProgress | undefined, rawSlice: unknown): LanguageProgress {
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
  if ("wordMastery" in rawSlice) patch.wordMastery = normalizeWordMastery(rawSlice.wordMastery);
  if ("srsCards" in rawSlice) patch.srsCards = importSrsCards(rawSlice.srsCards, {});
  if ("weeklyActivity" in rawSlice) {
    const week = normalizeWeeklyActivity(rawSlice.weeklyActivity);
    if (week) patch.weeklyActivity = week;
  }
  if ("lastActivityWeek" in rawSlice && typeof rawSlice.lastActivityWeek === "string" && rawSlice.lastActivityWeek) {
    patch.lastActivityWeek = rawSlice.lastActivityWeek;
  }
  return { ...current, ...patch };
}

/** The active language's slice as currently mirrored on the top-level state. */
function sliceFromMirrors(state: AppState): LanguageProgress {
  return {
    completedLessons: state.completedLessons,
    currentLessonId: state.currentLessonId,
    lessonProgress: state.lessonProgress,
    lessonStars: state.lessonStars,
    wordMastery: state.wordMastery,
    srsCards: state.srsCards,
    weeklyActivity: state.weeklyActivity,
    lastActivityWeek: state.lastActivityWeek,
  };
}

/** Union-merge for re-hydration (cross-tab `storage` events must not delete
 * progress this tab already holds). */
function mergeLanguageSlice(current: LanguageProgress, incoming: LanguageProgress): LanguageProgress {
  return {
    completedLessons: Array.from(new Set([...current.completedLessons, ...incoming.completedLessons])),
    currentLessonId: Math.max(current.currentLessonId, incoming.currentLessonId),
    lessonProgress: { ...current.lessonProgress, ...incoming.lessonProgress },
    lessonStars: { ...current.lessonStars, ...incoming.lessonStars },
    wordMastery: { ...current.wordMastery, ...incoming.wordMastery },
    srsCards: { ...current.srsCards, ...incoming.srsCards },
    weeklyActivity: incoming.weeklyActivity.some(Boolean) ? incoming.weeklyActivity : current.weeklyActivity,
    lastActivityWeek: incoming.lastActivityWeek ?? current.lastActivityWeek,
  };
}

/** Applies schema defaults & legacy migrations to a parsed persisted-state
 * object (mutates and returns it). */
function normalizeParsedState(parsed: Record<string, any>): Partial<AppState> {
  // Top-level (pre-multi-language) progress, validated before it can seed a
  // language slice or the mirrored state.
  const topLevelProgress: LanguageProgress = {
    completedLessons: normalizeLessonIdList(parsed.completedLessons),
    currentLessonId: parseLessonId(parsed.currentLessonId) ?? 1,
    lessonProgress: normalizeLessonProgress(parsed.lessonProgress),
    lessonStars: normalizeLessonStars(parsed.lessonStars),
    wordMastery: normalizeWordMastery(parsed.wordMastery),
    srsCards: normalizeSrsCards(parsed.srsCards),
    weeklyActivity: normalizeWeeklyActivity(parsed.weeklyActivity) ?? emptyWeek(),
    lastActivityWeek: normalizeWeekKey(parsed.lastActivityWeek),
  };
  parsed.completedLessons = topLevelProgress.completedLessons;
  parsed.currentLessonId = topLevelProgress.currentLessonId;
  parsed.lessonProgress = topLevelProgress.lessonProgress;
  parsed.lessonStars = topLevelProgress.lessonStars;
  parsed.wordMastery = topLevelProgress.wordMastery;
  parsed.srsCards = topLevelProgress.srsCards;
  parsed.weeklyActivity = topLevelProgress.weeklyActivity;
  parsed.lastActivityWeek = topLevelProgress.lastActivityWeek;

  if (isPlausibleStateObject(parsed.settings)) {
    parsed.settings = normalizeSettings(parsed.settings, DEFAULT_SETTINGS);
  } else if (parsed.settings !== undefined) {
    delete parsed.settings;
  }

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
  parsed.wordMastery = activeSlice.wordMastery;
  parsed.srsCards = activeSlice.srsCards;
  parsed.weeklyActivity = activeSlice.weeklyActivity;
  parsed.lastActivityWeek = activeSlice.lastActivityWeek;
  parsed.progressResetAt =
    typeof parsed.progressResetAt === "number" && Number.isFinite(parsed.progressResetAt) && parsed.progressResetAt > 0
      ? Math.floor(parsed.progressResetAt)
      : 0;

  return parsed;
}

let lastSerialized = "";

// Read once, before React mounts, so the first hydrate still has the learner's
// saved state even if a child mount effect has already written defaults back to
// storage (see hydrateFromStorage). Declared here rather than seeded into the
// store's initial state: the store must start from deterministic defaults or
// the client's first render disagrees with the server-rendered HTML.
const bootSavedState: Partial<AppState> | null =
  typeof window === "undefined" ? null : loadSavedState();
let hasHydratedFromStorage = false;
// Highest destructive-reset marker this tab has seen. A snapshot with a newer
// marker replaces progress instead of union-merging it (see progressResetAt).
let lastSeenResetAt = 0;

// the auto-open of onboarding on first visit must only ever happen once per
// page load — cross-tab `storage` events re-run hydrateFromStorage and must
// not yank the intro open over whatever the user is doing now
let hasAutoOpenedOnboarding = false;

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  // the active language's slice is derived from the mirrored top-level fields
  const progressByLanguage: Record<string, LanguageProgress> = {
    ...state.progressByLanguage,
    [state.activeLanguageId]: {
      completedLessons: state.completedLessons,
      currentLessonId: state.currentLessonId,
      lessonProgress: state.lessonProgress,
      lessonStars: state.lessonStars,
      wordMastery: state.wordMastery,
      srsCards: state.srsCards,
      weeklyActivity: state.weeklyActivity,
      lastActivityWeek: state.lastActivityWeek,
    },
  };
  const toPersist = {
    activeLanguageId: state.activeLanguageId,
    progressByLanguage,
    seenIntroLanguages: state.seenIntroLanguages,
    completedLessons: state.completedLessons,
    currentLessonId: state.currentLessonId,
    lessonProgress: state.lessonProgress,
    lessonStars: state.lessonStars,
    wordMastery: state.wordMastery,
    srsCards: state.srsCards,
    weeklyActivity: state.weeklyActivity,
    lastActivityWeek: state.lastActivityWeek,
    progressResetAt: state.progressResetAt,
    tolerance: state.tolerance,
    preferredReviewMode: state.preferredReviewMode,
    hasCompletedOnboarding: state.hasCompletedOnboarding,
    hasSeenGenderIntro: state.hasSeenGenderIntro,
    theme: state.theme,
    font: state.font,
    settings: state.settings,
  };
  const serialized = JSON.stringify(toPersist);
  if (serialized === lastSerialized) return;
  lastSerialized = serialized;

  // 1. Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {}

  // 2. Also save to cookie with strict encoded size guard <= 2048 bytes (prevents HTTP 431)
  try {
    const lean = {
      activeLanguageId: state.activeLanguageId,
      progressByLanguage,
      seenIntroLanguages: state.seenIntroLanguages,
      completedLessons: state.completedLessons,
      currentLessonId: state.currentLessonId,
      wordMastery: state.wordMastery,
      hasCompletedOnboarding: state.hasCompletedOnboarding,
      hasSeenGenderIntro: state.hasSeenGenderIntro,
      theme: state.theme,
      font: state.font,
    };
    const leanJson = JSON.stringify(lean);
    if (encodeURIComponent(leanJson).length <= 2048) {
      setCookie(STORAGE_COOKIE_KEY, leanJson, 365);
    } else {
      const minimal = JSON.stringify({
        theme: state.theme,
        font: state.font,
        activeLanguageId: state.activeLanguageId,
        seenIntroLanguages: state.seenIntroLanguages,
        // keep the onboarding flags in the fallback so losing the larger
        // payload cannot re-open the wizard for a learner who finished it
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasSeenGenderIntro: state.hasSeenGenderIntro,
      });
      setCookie(STORAGE_COOKIE_KEY, minimal, 365);
    }
  } catch {}
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

export const useAppStore = create<AppState>((set, get) => ({
  // Initialise from DEFAULTS only. Reading storage here made the client's first
  // render disagree with the server-rendered defaults (hydration mismatch);
  // persisted state is applied by hydrateFromStorage() from the root layout's
  // mount effect instead.
  activeLanguageId: DEFAULT_LANGUAGE_ID,
  progressByLanguage: {},
  seenIntroLanguages: [],
  completedLessons: [],
  currentLessonId: 1,
  lessonProgress: {},
  lessonStars: {},
  wordMastery: {},
  srsCards: {},
  weeklyActivity: emptyWeek(),
  lastActivityWeek: undefined,
  progressResetAt: 0,
  activeWordDrawerId: null,
  preferredReviewMode: "flashcard",
  hasCompletedOnboarding: false,
  isOnboardingOpen: false,
  onboardingIntroLanguage: null,
  hasSeenGenderIntro: false,
  theme: DEFAULT_THEME,
  isThemeSelectorOpen: false,
  font: DEFAULT_FONT,
  isFontSelectorOpen: false,
  settings: DEFAULT_SETTINGS,
  storeHydrated: false,
  hydrateEpoch: 0,
  tolerance: {
    umlautTolerance: DEFAULT_SETTINGS.lazyMode,
    capitalizationTolerance: DEFAULT_SETTINGS.capitalizationTolerance,
    umlautDismissals: 0,
    capitalizationDismissals: 0,
  },

  setActiveLanguage: (languageId) => {
    if (!isValidLanguageId(languageId)) return;
    set((s) => {
      if (s.activeLanguageId === languageId) return s;
      // park the outgoing language's mirrored progress, then restore the
      // incoming language's slice (or a fresh one for a first-time language)
      const progressByLanguage = {
        ...s.progressByLanguage,
        [s.activeLanguageId]: {
          completedLessons: s.completedLessons,
          currentLessonId: s.currentLessonId,
          lessonProgress: s.lessonProgress,
          lessonStars: s.lessonStars,
          wordMastery: s.wordMastery,
          srsCards: s.srsCards,
          weeklyActivity: s.weeklyActivity,
          lastActivityWeek: s.lastActivityWeek,
        },
      };
      const incoming = progressByLanguage[languageId];
      // the intro is not marked seen at selection time — only completing the
      // wizard (completeOnboarding) marks it, so an early dismissal replays it
      const next: AppState = {
        ...s,
        activeLanguageId: languageId,
        progressByLanguage,
        completedLessons: incoming?.completedLessons || [],
        currentLessonId: incoming?.currentLessonId || 1,
        lessonProgress: incoming?.lessonProgress || {},
        lessonStars: incoming?.lessonStars || {},
        wordMastery: incoming?.wordMastery || {},
        srsCards: incoming?.srsCards || {},
        weeklyActivity: incoming?.weeklyActivity || [false, false, false, false, false, false, false],
        lastActivityWeek: incoming?.lastActivityWeek,
        activeWordDrawerId: null,
        // a language's introduction plays the first time it is chosen
        isOnboardingOpen: !s.seenIntroLanguages.includes(languageId),
        onboardingIntroLanguage: s.seenIntroLanguages.includes(languageId) ? null : languageId,
      };
      saveState(next);
      return next;
    });
  },

  updateSetting: (key, value) => {
    set((s) => {
      const nextSettings = { ...s.settings, [key]: value };
      applyAppearanceSettings(nextSettings);
      if (key === "playSoundOnClick" && typeof value === "string") {
        void soundEngine.preloadClickSound(value);
      }
      const nextTolerance = { ...s.tolerance };
      if (key === "lazyMode") {
        nextTolerance.umlautTolerance = Boolean(value);
      }
      if (key === "capitalizationTolerance") {
        nextTolerance.capitalizationTolerance = Boolean(value);
      }
      const next = { ...s, settings: nextSettings, tolerance: nextTolerance };
      saveState(next);
      return next;
    });
  },

  resetSettings: () => {
    set((s) => {
      const nextSettings = { ...DEFAULT_SETTINGS };
      applyAppearanceSettings(nextSettings);
      const nextTolerance = {
        ...s.tolerance,
        umlautTolerance: DEFAULT_SETTINGS.lazyMode,
        capitalizationTolerance: DEFAULT_SETTINGS.capitalizationTolerance,
      };
      const next = { ...s, settings: nextSettings, tolerance: nextTolerance };
      saveState(next);
      return next;
    });
  },

  setTheme: (theme: string) => {
    applyTheme(theme);
    set((s) => {
      const next = { ...s, theme };
      saveState(next);
      return next;
    });
  },

  openThemeSelector: () => {
    set({ isThemeSelectorOpen: true });
  },

  closeThemeSelector: () => {
    set({ isThemeSelectorOpen: false });
  },

  setFont: (font: string) => {
    applyFont(font);
    set((s) => {
      const next = { ...s, font };
      saveState(next);
      return next;
    });
  },

  openFontSelector: () => {
    set({ isFontSelectorOpen: true });
  },

  closeFontSelector: () => {
    set({ isFontSelectorOpen: false });
  },

  completeOnboarding: () => {
    set((s) => {
      const seenIntroLanguages = s.seenIntroLanguages.includes(s.activeLanguageId)
        ? s.seenIntroLanguages
        : [...s.seenIntroLanguages, s.activeLanguageId];
      // TM-4a: the primer sits inside onboarding, so completing or skipping the
      // wizard marks it seen (additive settings key; everything else untouched)
      const settings = { ...s.settings, posturePrimerSeen: true };
      const next = { ...s, hasCompletedOnboarding: true, isOnboardingOpen: false, onboardingIntroLanguage: null, seenIntroLanguages, settings };
      saveState(next);
      return next;
    });
  },

  openOnboarding: () => {
    set({ isOnboardingOpen: true, onboardingIntroLanguage: null });
  },

  closeOnboarding: () => {
    // dismissing (skip/escape) closes the intro but leaves the language out of
    // seenIntroLanguages so its intro can replay; still counts as onboarding
    // having been dealt with, to avoid nagging on every fresh load
    const settings = { ...get().settings, posturePrimerSeen: true };
    const next = { isOnboardingOpen: false, onboardingIntroLanguage: null, hasCompletedOnboarding: true, settings };
    set(next);
    saveState({ ...get(), ...next });
  },

  dismissGenderIntro: () => {
    set((s) => {
      const next = { ...s, hasSeenGenderIntro: true };
      saveState(next);
      return next;
    });
  },

  openGenderIntro: () => {
    set((s) => {
      const next = { ...s, hasSeenGenderIntro: false };
      saveState(next);
      return next;
    });
  },

  setPreferredReviewMode: (mode) => {
    set((s) => {
      const next = { ...s, preferredReviewMode: mode };
      saveState(next);
      return next;
    });
  },

  markWordExplored: (wordId) => {
    const id = wordId.trim();
    set((s) => {
      const current = s.wordMastery[id];
      if (current === "explored" || current === "encountered" || current === "mastered") return s;
      const updated = { ...s.wordMastery, [id]: "explored" as MasteryState };
      const next = { ...s, wordMastery: updated };
      saveState(next);
      return next;
    });
  },

  markWordEncountered: (wordId) => {
    const id = wordId.trim();
    set((s) => {
      const current = s.wordMastery[id];
      if (current === "mastered" || (current === "encountered" && s.srsCards[id])) return s;
      const updated = { ...s.wordMastery, [id]: "encountered" as MasteryState };
      // Also register card in SRS if not present
      const srsCards = { ...s.srsCards };
      if (!srsCards[id]) {
        srsCards[id] = createInitialCard(id);
      }
      const next = { ...s, wordMastery: updated, srsCards };
      saveState(next);
      return next;
    });
  },

  seedSrsCards: (wordIds) => {
    set((s) => {
      const missing = Array.from(new Set(wordIds.map((w) => w.trim()))).filter((id) => id && !s.srsCards[id]);
      if (missing.length === 0) return s;
      const srsCards = { ...s.srsCards };
      const wordMastery = { ...s.wordMastery };
      for (const id of missing) {
        srsCards[id] = createInitialCard(id);
        // Finished-lesson words are "encountered", not mastered. This keeps the
        // header progress counter moving without pretending review is done.
        if (!id.startsWith("sentence_") && !id.startsWith("article_") && wordMastery[id] !== "mastered") {
          wordMastery[id] = "encountered";
        }
      }
      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
  },

  markWordsEncountered: (wordIds) => {
    set((s) => {
      const updatedMastery = { ...s.wordMastery };
      const srsCards = { ...s.srsCards };
      let changed = false;

      for (const rawId of wordIds) {
        const wordId = rawId.trim();
        const current = updatedMastery[wordId];
        if (current !== "mastered") {
          if (current !== "encountered") {
            updatedMastery[wordId] = "encountered";
            changed = true;
          }
          if (!srsCards[wordId]) {
            srsCards[wordId] = createInitialCard(wordId);
            changed = true;
          }
        }
      }

      if (!changed) return s;
      const next = { ...s, wordMastery: updatedMastery, srsCards };
      saveState(next);
      return next;
    });
  },

  markWordMastered: (wordId) => {
    const id = wordId.trim();
    set((s) => {
      if (s.wordMastery[id] === "mastered") return s;
      const updated = { ...s.wordMastery, [id]: "mastered" as MasteryState };
      const next = { ...s, wordMastery: updated };
      saveState(next);
      return next;
    });
  },

  completeLesson: (lessonId, opts) => {
    set((s) => {
      const nextStars =
        opts?.perfect || s.lessonStars[lessonId] === "purple"
          ? { ...s.lessonStars, [lessonId]: "purple" as LessonStar }
          : s.lessonStars[lessonId]
          ? s.lessonStars
          : { ...s.lessonStars, [lessonId]: "gold" as LessonStar };
      const completed = s.completedLessons.includes(lessonId)
        ? s.completedLessons
        : [...s.completedLessons, lessonId];
      const nextLesson =
        opts?.nextLessonId === null
          ? Math.max(s.currentLessonId, lessonId)
          : opts?.nextLessonId !== undefined
            ? Math.max(s.currentLessonId, opts.nextLessonId)
            : Math.max(s.currentLessonId, lessonId + 1);
      if (completed === s.completedLessons && s.currentLessonId >= nextLesson && nextStars === s.lessonStars) return s;
      const next = { ...s, completedLessons: completed, currentLessonId: nextLesson, lessonStars: nextStars };
      saveState(next);
      return next;
    });
    get().logDailyActivity();
  },

  setLessonProgress: (lessonId, progress) => {
    // a caller (or a restored payload) must not be able to wedge resume state
    // with an entry missing completedSegments
    const safeProgress = sanitizeLessonProgressEntry(progress);
    if (!safeProgress) return;
    set((s) => {
      const current = s.lessonProgress[lessonId];
      if (
        current &&
        current.segment === safeProgress.segment &&
        current.practiceIndex === safeProgress.practiceIndex &&
        current.everQueued === safeProgress.everQueued &&
        current.completedSegments.length === safeProgress.completedSegments.length &&
        current.completedSegments.every((segment, index) => segment === safeProgress.completedSegments[index])
      ) {
        return s;
      }
      const next = {
        ...s,
        lessonProgress: { ...s.lessonProgress, [lessonId]: safeProgress },
      };
      saveState(next);
      return next;
    });
  },

  recordReview: (wordId, grade) => {
    const id = wordId.trim();
    set((s) => {
      const currentCard = s.srsCards[id] || createInitialCard(id);
      const updatedCard = gradeCard(currentCard, grade);
      const srsCards = { ...s.srsCards, [id]: updatedCard };
      let wordMastery = { ...s.wordMastery };

      if (isMastered(updatedCard)) {
        wordMastery[id] = "mastered";
      } else if (!wordMastery[id] || wordMastery[id] === "unexplored") {
        wordMastery[id] = "encountered";
      }

      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
    get().logDailyActivity();
  },

  restoreSrsCard: (wordId, snapshot) => {
    const id = wordId.trim();
    if (!id || !snapshot || typeof snapshot !== "object" || !snapshot.card) return;
    const card = snapshot.card;
    const mastery = snapshot.mastery ?? null;
    set((s) => {
      // only restore a card this session actually graded — a stale snapshot must
      // not resurrect old scheduling
      if (!s.srsCards[id]) return s;
      const srsCards = { ...s.srsCards, [id]: card };
      const wordMastery = { ...s.wordMastery };
      if (mastery === null) delete wordMastery[id];
      else wordMastery[id] = mastery;
      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
  },

  // TM-6: a correct answer the learner did not trust. Re-grade as Hard (grade 3)
  // so the word returns soon, and record the guess so the guess rate is visible
  // anywhere cards are inspected. Nothing here touches completion or stars.
  flagGuessed: (wordIds) => {
    const ids = Array.from(new Set((wordIds || []).map((w) => w.trim()).filter(Boolean)));
    if (ids.length === 0) return;
    set((s) => {
      const srsCards = { ...s.srsCards };
      for (const id of ids) {
        const current = srsCards[id] || createInitialCard(id);
        srsCards[id] = gradeCard(current, 3);
        srsCards[id] = { ...srsCards[id], guessed: (srsCards[id].guessed ?? 0) + 1 };
      }
      const next = { ...s, srsCards };
      saveState(next);
      return next;
    });
  },

  skipListeningFor: (ms = 15 * 60 * 1000) => {
    const settings = { ...get().settings, listeningSkippedUntil: Date.now() + ms };
    const next = { settings };
    set(next);
    saveState({ ...get(), ...next });
  },

  openWordDrawer: (wordId) => {
    set({ activeWordDrawerId: wordId });
    get().markWordExplored(wordId);
  },

  closeWordDrawer: () => {
    set({ activeWordDrawerId: null });  },

  setUmlautTolerance: (enabled) => {
    set((s) => {
      // keep settings in sync so the settings page and the in-lesson prompt agree
      const settings = { ...s.settings, lazyMode: enabled };
      const next = { ...s, settings, tolerance: { ...s.tolerance, umlautTolerance: enabled } };
      saveState(next);
      return next;
    });
  },

  setCapitalizationTolerance: (enabled) => {
    set((s) => {
      const settings = { ...s.settings, capitalizationTolerance: enabled };
      const next = { ...s, settings, tolerance: { ...s.tolerance, capitalizationTolerance: enabled } };
      saveState(next);
      return next;
    });
  },

  dismissUmlautPrompt: () => {
    set((s) => {
      const count = s.tolerance.umlautDismissals + 1;
      const next = { ...s, tolerance: { ...s.tolerance, umlautDismissals: count } };
      saveState(next);
      return next;
    });
  },

  dismissCapitalizationPrompt: () => {
    set((s) => {
      const count = s.tolerance.capitalizationDismissals + 1;
      const next = { ...s, tolerance: { ...s.tolerance, capitalizationDismissals: count } };
      saveState(next);
      return next;
    });
  },

  logDailyActivity: () => {
    set((s) => {
      const now = new Date();
      const currentWeek = getWeekString(now);
      const isNewWeek = Boolean(s.lastActivityWeek && s.lastActivityWeek !== currentWeek);
      const day = (now.getDay() + 6) % 7; // Monday = 0
      const updated = isNewWeek ? [false, false, false, false, false, false, false] : [...s.weeklyActivity];
      updated[day] = true;
      const next = { ...s, weeklyActivity: updated, lastActivityWeek: currentWeek };
      saveState(next);
      return next;
    });
  },

  resetProgress: () => {
    // Reset only what the settings page promises: SRS cards, lesson
    // completions, and word mastery. Appearance, customization settings,
    // language choice and onboarding flags are preferences, not progress.
    set((s) => {
      const next: AppState = {
        ...s,
        progressByLanguage: {},
        completedLessons: [],
        currentLessonId: 1,
        lessonProgress: {},
        lessonStars: {},
        wordMastery: {},
        srsCards: {},
        weeklyActivity: emptyWeek(),
        lastActivityWeek: undefined,
        // Cross-tab hydration unions progress, so a reset must be explicit:
        // this marker makes the other tabs adopt the empty snapshot instead of
        // merging their stale in-memory progress back in.
        progressResetAt: Math.max(Date.now(), s.progressResetAt + 1),
        activeWordDrawerId: null,
        isOnboardingOpen: false,
        onboardingIntroLanguage: null,
        isThemeSelectorOpen: false,
        isFontSelectorOpen: false,
      };
      // wipe the old snapshot first so a failed write can never leave stale
      // progress behind, then persist the preserved preferences
      lastSerialized = "";
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        try {
          deleteCookie(STORAGE_COOKIE_KEY);
        } catch {}
      }
      saveState(next);
      return next;
    });
  },

  importBackupState: (rawPayload: unknown) => {
    // the boundary type is `unknown` — everything below narrows defensively
    // before use, so a hostile or malformed backup can only be ignored
    if (!isPlausibleStateObject(rawPayload)) return false;
    const payload = rawPayload;
    // an object with none of our fields is not a backup — say so instead of
    // reporting success while restoring nothing
    const RECOGNIZED_FIELDS = [
      "settings",
      "tolerance",
      "activeLanguageId",
      "progressByLanguage",
      "seenIntroLanguages",
      "completedLessons",
      "currentLessonId",
      "lessonProgress",
      "lessonStars",
      "wordMastery",
      "srsCards",
      "weeklyActivity",
      "lastActivityWeek",
      "preferredReviewMode",
      "hasCompletedOnboarding",
      "hasSeenGenderIntro",
      "theme",
      "font",
    ];
    if (!RECOGNIZED_FIELDS.some((field) => Object.prototype.hasOwnProperty.call(payload, field))) return false;
    set((s) => {
      const nextSettings = isPlausibleStateObject(payload.settings)
        ? normalizeSettings(payload.settings, s.settings)
        : s.settings;
      const currentTheme = (typeof payload.theme === "string" && payload.theme) || s.theme;
      const currentFont = (typeof payload.font === "string" && payload.font) || s.font;

      applyTheme(currentTheme);
      applyFont(currentFont);

      // Language identity. A pre-multi-language backup (no progressByLanguage)
      // carries one language's progress on the top level — attribute it to the
      // backup's own active language, not whatever is active right now.
      const backupLanguageId = isValidLanguageId(payload.activeLanguageId)
        ? payload.activeLanguageId
        : s.activeLanguageId;
      // A settings-only backup must not move the learner onto a language it
      // carries no progress for (that would silently show an empty course).
      const carriesProgress =
        [
          "completedLessons",
          "currentLessonId",
          "lessonProgress",
          "lessonStars",
          "wordMastery",
          "srsCards",
          "weeklyActivity",
          "lastActivityWeek",
        ].some((field) => payload[field] !== undefined) ||
        (isPlausibleStateObject(payload.progressByLanguage) && Object.keys(payload.progressByLanguage).length > 0);
      const activeTargetLanguageId = carriesProgress ? backupLanguageId : s.activeLanguageId;

      // Top-level patch: only the fields the backup actually carries, each one
      // validated so a malformed entry is dropped instead of wedging state.
      const topLevelPatch: Partial<LanguageProgress> = {};
      if (Array.isArray(payload.completedLessons)) {
        topLevelPatch.completedLessons = normalizeLessonIdList(payload.completedLessons, true);
      }
      if (payload.currentLessonId !== undefined) {
        const lessonId = parseLessonId(payload.currentLessonId, true);
        if (lessonId !== null) topLevelPatch.currentLessonId = lessonId;
      }
      if (isPlausibleStateObject(payload.lessonProgress)) {
        topLevelPatch.lessonProgress = normalizeLessonProgress(payload.lessonProgress);
      }
      if (isPlausibleStateObject(payload.lessonStars)) {
        topLevelPatch.lessonStars = normalizeLessonStars(payload.lessonStars);
      }
      if (isPlausibleStateObject(payload.wordMastery)) {
        topLevelPatch.wordMastery = normalizeWordMastery(payload.wordMastery);
      }
      if (Array.isArray(payload.srsCards) || isPlausibleStateObject(payload.srsCards)) {
        topLevelPatch.srsCards = importSrsCards(payload.srsCards, s.srsCards);
      }
      if (Array.isArray(payload.weeklyActivity)) {
        const week = normalizeWeeklyActivity(payload.weeklyActivity);
        if (week) topLevelPatch.weeklyActivity = week;
      }
      if (typeof payload.lastActivityWeek === "string" && payload.lastActivityWeek) {
        topLevelPatch.lastActivityWeek = payload.lastActivityWeek;
      }

      // Merge the backup's per-language slices, then apply the top-level patch
      // to the backup's active language. Every slice is validated field by
      // field, so junk entries are dropped rather than stored.
      const progressByLanguage: Record<string, LanguageProgress> = {
        ...s.progressByLanguage,
        [s.activeLanguageId]: sliceFromMirrors(s),
      };
      if (isPlausibleStateObject(payload.progressByLanguage)) {
        for (const [langId, rawSlice] of Object.entries(payload.progressByLanguage)) {
          if (!isValidLanguageId(langId) || isDangerousKey(langId)) continue;
          progressByLanguage[langId] = applyImportedSlice(progressByLanguage[langId], rawSlice);
        }
      }
      const activeSlice: LanguageProgress = {
        ...(progressByLanguage[activeTargetLanguageId] ?? normalizeLanguageSlice({})),
        ...topLevelPatch,
      };
      progressByLanguage[activeTargetLanguageId] = activeSlice;

      const nextSeenIntroLanguages = Array.isArray(payload.seenIntroLanguages)
        ? Array.from(
            new Set([
              ...s.seenIntroLanguages,
              ...payload.seenIntroLanguages.filter((id: unknown): id is string => isValidLanguageId(id)),
            ])
          )
        : s.seenIntroLanguages;

      const nextTolerance = normalizeTolerance(payload.tolerance, nextSettings, {
        umlautTolerance: nextSettings.lazyMode,
        capitalizationTolerance: nextSettings.capitalizationTolerance,
        umlautDismissals: s.tolerance.umlautDismissals,
        capitalizationDismissals: s.tolerance.capitalizationDismissals,
      });

      const next: AppState = {
        ...s,
        activeLanguageId: activeTargetLanguageId,
        progressByLanguage,
        seenIntroLanguages: nextSeenIntroLanguages,
        // A backup that carries progress replaces it everywhere; tell other
        // tabs so their union-merge does not resurrect the pre-import state.
        progressResetAt: carriesProgress ? Math.max(Date.now(), s.progressResetAt + 1) : s.progressResetAt,
        // Mirror the backup's merged active slice. saveState() rebuilds that
        // slice from these fields, so from this point on what gets written back
        // is exactly what the backup imported — a restored slice can no longer
        // be overwritten by the previous language's mirrored progress.
        completedLessons: activeSlice.completedLessons,
        currentLessonId: activeSlice.currentLessonId,
        lessonProgress: activeSlice.lessonProgress,
        lessonStars: activeSlice.lessonStars,
        wordMastery: activeSlice.wordMastery,
        srsCards: activeSlice.srsCards,
        weeklyActivity: activeSlice.weeklyActivity,
        lastActivityWeek: activeSlice.lastActivityWeek,
        activeWordDrawerId: activeTargetLanguageId === s.activeLanguageId ? s.activeWordDrawerId : null,
        preferredReviewMode:
          payload.preferredReviewMode !== undefined
            ? oneOf(payload.preferredReviewMode, VALID_REVIEW_MODES, s.preferredReviewMode)
            : s.preferredReviewMode,
        hasCompletedOnboarding:
          typeof payload.hasCompletedOnboarding === "boolean" ? payload.hasCompletedOnboarding : s.hasCompletedOnboarding,
        hasSeenGenderIntro:
          typeof payload.hasSeenGenderIntro === "boolean" ? payload.hasSeenGenderIntro : s.hasSeenGenderIntro,
        settings: nextSettings,
        tolerance: nextTolerance,
        theme: currentTheme,
        font: currentFont,
      };

      applyAppearanceSettings(nextSettings);
      saveState(next);
      return next;
    });
    return true;
  },

  hydrateFromStorage: (options) => {
    if (typeof window === "undefined") return;
    // Strict Mode mounts effects twice; the second mount must not re-read a
    // storage copy that a child effect may have already overwritten with the
    // defaults. Only an explicit re-read (cross-tab event, test) is allowed.
    if (hasHydratedFromStorage && !options?.reread) return;
    // The FIRST hydration must use the snapshot captured before React mounted.
    // Child mount effects run before the root layout's effect and some of them
    // (LessonReader persists the current segment) write the not-yet-hydrated
    // defaults back to localStorage. Re-reading storage here would then hydrate
    // from that clobbered copy and lose the learner's real progress. Later calls
    // (cross-tab) re-read storage on purpose.
    const fromBoot = !hasHydratedFromStorage && bootSavedState && Object.keys(bootSavedState).length > 0;
    const saved = fromBoot ? bootSavedState : loadSavedState();
    if (saved && Object.keys(saved).length > 0) {
      set((s) => {
        const nextSettings = normalizeSettings(saved.settings, s.settings);
        const currentTheme = typeof saved.theme === "string" && saved.theme ? saved.theme : s.theme || DEFAULT_THEME;
        const currentFont = typeof saved.font === "string" && saved.font ? saved.font : s.font || DEFAULT_FONT;
        applyTheme(currentTheme);
        applyFont(currentFont);

        const nextLang = isValidLanguageId(saved.activeLanguageId) ? saved.activeLanguageId : s.activeLanguageId;
        const isLangSwitch = nextLang !== s.activeLanguageId;
        const isCrossTab = Boolean(options?.reread);

        // A newer reset marker means the incoming snapshot deliberately deleted
        // progress; a union would resurrect it (and the next save would write
        // the stale progress back to every tab).
        const incomingResetAt =
          typeof saved.progressResetAt === "number" && Number.isFinite(saved.progressResetAt)
            ? saved.progressResetAt
            : 0;
        const isReset = incomingResetAt > lastSeenResetAt;
        if (incomingResetAt > lastSeenResetAt) lastSeenResetAt = incomingResetAt;

        // Seed the merge with the in-memory mirrors: progressByLanguage is not
        // updated by every action, so the top-level fields are the freshest
        // copy of the active language's slice.
        const mergedSlices: Record<string, LanguageProgress> = isReset
          ? {}
          : {
              ...s.progressByLanguage,
              [s.activeLanguageId]: sliceFromMirrors(s),
            };
        for (const [langId, rawSlice] of Object.entries(saved.progressByLanguage ?? {})) {
          if (!isValidLanguageId(langId) || isDangerousKey(langId)) continue;
          const incoming = normalizeLanguageSlice(rawSlice);
          const existing = mergedSlices[langId];
          // A same-tab language switch restores the parked slice exactly; a
          // cross-tab re-hydration always unions (so a fresher parked slice in
          // this tab is not replaced by an older one from the other tab).
          mergedSlices[langId] =
            !existing || isReset || (isLangSwitch && langId === nextLang && !isCrossTab)
              ? incoming
              : mergeLanguageSlice(existing, incoming);
        }
        const activeSlice = mergedSlices[nextLang] ?? normalizeLanguageSlice({});
        mergedSlices[nextLang] = activeSlice;

        const nextCompletedOnboarding =
          typeof saved.hasCompletedOnboarding === "boolean" ? saved.hasCompletedOnboarding : s.hasCompletedOnboarding;

        const next: AppState = {
          ...s,
          activeLanguageId: nextLang,
          progressByLanguage: mergedSlices,
          progressResetAt: Math.max(s.progressResetAt, incomingResetAt),
          seenIntroLanguages: Array.isArray(saved.seenIntroLanguages)
            ? Array.from(
                new Set([
                  ...s.seenIntroLanguages,
                  ...saved.seenIntroLanguages.filter((id: unknown): id is string => isValidLanguageId(id)),
                ])
              )
            : s.seenIntroLanguages,
          completedLessons: activeSlice.completedLessons,
          currentLessonId: activeSlice.currentLessonId,
          lessonProgress: activeSlice.lessonProgress,
          lessonStars: activeSlice.lessonStars,
          wordMastery: activeSlice.wordMastery,
          srsCards: activeSlice.srsCards,
          weeklyActivity: activeSlice.weeklyActivity,
          lastActivityWeek: activeSlice.lastActivityWeek,
          activeWordDrawerId: isLangSwitch ? null : s.activeWordDrawerId,
          preferredReviewMode:
            saved.preferredReviewMode !== undefined
              ? oneOf(saved.preferredReviewMode, VALID_REVIEW_MODES, s.preferredReviewMode)
              : s.preferredReviewMode,
          hasCompletedOnboarding: nextCompletedOnboarding,
          hasSeenGenderIntro:
            typeof saved.hasSeenGenderIntro === "boolean" ? saved.hasSeenGenderIntro : s.hasSeenGenderIntro,
          theme: currentTheme,
          font: currentFont,
          settings: nextSettings,
          tolerance: normalizeTolerance(saved.tolerance, nextSettings, {
            umlautTolerance: nextSettings.lazyMode,
            capitalizationTolerance: nextSettings.capitalizationTolerance,
            umlautDismissals: s.tolerance.umlautDismissals,
            capitalizationDismissals: s.tolerance.capitalizationDismissals,
          }),
          // The intro is opt-in from the landing page / guide button. Auto-opening
          // it hijacked shared deep links and hid the homepage on first visit;
          // language switches still queue their own intro explicitly.
          ...(hasAutoOpenedOnboarding ? {} : { isOnboardingOpen: false }),
        };
        return next;
      });
      const latestSettings = useAppStore.getState().settings;
      applyAppearanceSettings(latestSettings);
      if (latestSettings.playSoundOnClick !== "off") {
        void soundEngine.preloadClickSound(latestSettings.playSoundOnClick);
      }
    } else if (!hasAutoOpenedOnboarding) {
      // Clean slate first-time user: trigger onboarding (once per page load)!
      applyTheme(DEFAULT_THEME);
      applyFont(DEFAULT_FONT);
      applyAppearanceSettings(DEFAULT_SETTINGS);
      set((s) => ({ ...s, isOnboardingOpen: false }));
    }
    hasAutoOpenedOnboarding = true;
    hasHydratedFromStorage = true;
    if (fromBoot) {
      // A child mount effect may have written the defaults over the saved
      // state before this effect ran. Put the hydrated state back, bypassing
      // saveState's dedupe (it still holds the clobbering payload).
      lastSerialized = "";
      saveState(useAppStore.getState());
    }
    // Components that seeded local state from the (default) store at mount can
    // now adopt the real saved values — and an already-open view can re-adopt
    // after a cross-tab save (hydrateEpoch).
    set((s) => ({ ...s, storeHydrated: true, hydrateEpoch: s.hydrateEpoch + 1 }));
  },
}));

// Auto-hydrate on client load if running in browser
if (typeof window !== "undefined") {
  const initial = bootSavedState ?? {};
  applyTheme(initial.theme || DEFAULT_THEME);
  applyFont(initial.font || DEFAULT_FONT);
  if (initial.settings) {
    applyAppearanceSettings({ ...DEFAULT_SETTINGS, ...initial.settings });
  } else {
    applyAppearanceSettings(DEFAULT_SETTINGS);
  }
}
