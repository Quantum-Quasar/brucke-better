import type { StateCreator } from "zustand";
import type { LessonProgress, LessonStar, MasteryState, ReviewMode, SRSCard } from "../types";
import type { ReviewGrade } from "../srs";
import type { CustomizationSettings } from "@/data/settings";

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
  passedGateIds: number[];
  wordMastery: Record<string, MasteryState>;
  srsCards: Record<string, SRSCard>;
  weeklyActivity: boolean[]; // 7 days Mon-Sun
  lastActivityWeek?: string;
  progressVersions?: ProgressVersions;
}

export type VersionedField = "lessonProgress" | "wordMastery" | "srsCards";
export type ProgressVersions = Record<VersionedField, Record<string, string>>;
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
  progressVersions: ProgressVersions;
  /** languages whose onboarding introduction has been seen */
  seenIntroLanguages: string[];
  completedLessons: number[];
  currentLessonId: number;
  lessonProgress: Record<number, LessonProgress>;
  /** gold = completed; purple = flawless run (retry queue untouched, including a clean replay). Purple is never downgraded. */
  lessonStars: Record<number, LessonStar>;
  passedGateIds: number[];
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
  progressResetActor: string;
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
  passGate: (gateId: number) => void;
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
  hydrateFromStorage: (options?: { reread?: boolean; snapshot?: string }) => void;
  importBackupState: (payload: unknown) => boolean;
}

export type StoreSlice<K extends keyof AppState> = StateCreator<AppState, [], [], Pick<AppState, K>>;
