import type { AppState, LanguageProgress, StoreSlice } from "./types";
import { saveState, persistenceRuntime, progressActor } from "./persistence";
import { applyAppearanceSettings, applyTheme, DEFAULT_THEME } from "../theme-runtime";
import { applyFont, DEFAULT_FONT } from "@/data/fonts";
import { isValidLanguageId } from "@/data/languages";
import { STORAGE_KEY, STORAGE_COOKIE_KEY } from "../storage-keys";
import { deleteCookie } from "./persistence";
import { emptyVersions, sliceFromMirrors } from "./progress-state";
import { isPlausibleStateObject, isDangerousKey, normalizeSettings, normalizeThemeId, normalizeFontId, normalizeLessonIdList, parseLessonId, normalizeLessonProgress, normalizeLessonStars, normalizeWordMastery, importSrsCards, normalizeWeeklyActivity, applyImportedSlice, normalizeLanguageSlice, normalizeTolerance, oneOf, VALID_REVIEW_MODES, emptyWeek } from "./schema";

/** A progress field that carries meaningful (non-dangerous-key) data but
 * normalizes to nothing is corrupt, not a legitimate empty snapshot. Importing it
 * would replace real progress with an empty list and still report success, so
 * detect it up front. Dangerous keys are excluded here — the sanitizer already
 * drops them safely, so a hostile key alone is not "corrupt progress". */
function isCorruptProgressField(field: string, value: unknown): boolean {
  switch (field) {
    case "completedLessons":
      return !Array.isArray(value) || (value.length > 0 && normalizeLessonIdList(value, true).length === 0);
    case "passedGateIds":
      return !Array.isArray(value) || (value.length > 0 && normalizeLessonIdList(value).length === 0);
    case "lessonProgress":
    case "lessonStars":
    case "wordMastery": {
      if (!isPlausibleStateObject(value)) return true;
      const meaningful = Object.keys(value).filter((key) => !isDangerousKey(key)).length;
      const normalized =
        field === "lessonProgress" ? normalizeLessonProgress(value)
        : field === "lessonStars" ? normalizeLessonStars(value)
        : normalizeWordMastery(value);
      return meaningful > 0 && Object.keys(normalized).length === 0;
    }
    case "srsCards": {
      if (Array.isArray(value)) {
        const meaningful = value.filter(
          (entry) => isPlausibleStateObject(entry) && !isDangerousKey(String(entry.id ?? entry.word_id ?? ""))
        ).length;
        return meaningful > 0 && Object.keys(importSrsCards(value, {})).length === 0;
      }
      if (isPlausibleStateObject(value)) {
        const meaningful = Object.keys(value).filter((key) => !isDangerousKey(key)).length;
        return meaningful > 0 && Object.keys(importSrsCards(value, {})).length === 0;
      }
      return true;
    }
    default:
      return false;
  }
}

const PROGRESS_FIELDS = ["completedLessons", "lessonProgress", "lessonStars", "passedGateIds", "wordMastery", "srsCards"];
function hasCorruptProgress(slice: Record<string, unknown>): boolean {
  return PROGRESS_FIELDS.some((field) => Object.prototype.hasOwnProperty.call(slice, field) && isCorruptProgressField(field, slice[field]));
}

export const createBackupSlice: StoreSlice<"resetProgress" | "importBackupState"> = (set, get) => ({
  resetProgress: () => {
    // Adopt saved preferences before a reset invoked ahead of the root effect.
    if (!persistenceRuntime.hasHydratedFromStorage && persistenceRuntime.bootSavedState && Object.keys(persistenceRuntime.bootSavedState).length > 0) get().hydrateFromStorage();
    // Reset only what the settings page promises: SRS cards, lesson
    // completions, and word mastery. Appearance, customization settings,
    // language choice and onboarding flags are preferences, not progress.
    set((s) => {
      const next: AppState = {
        ...s,
        progressByLanguage: {},
        progressVersions: emptyVersions(),
        completedLessons: [],
        currentLessonId: 1,
        lessonProgress: {},
        lessonStars: {},
        passedGateIds: [],
        wordMastery: {},
        srsCards: {},
        weeklyActivity: emptyWeek(),
        lastActivityWeek: undefined,
        // Cross-tab hydration unions progress, so a reset must be explicit:
        // this marker makes the other tabs adopt the empty snapshot instead of
        // merging their stale in-memory progress back in.
        progressResetAt: Math.max(Date.now(), s.progressResetAt + 1),
        progressResetActor: progressActor,
        activeWordDrawerId: null,
        isOnboardingOpen: false,
        onboardingIntroLanguage: null,
        isThemeSelectorOpen: false,
        isFontSelectorOpen: false,
      };
      // wipe the old snapshot first so a failed write can never leave stale
      // progress behind, then persist the preserved preferences
      persistenceRuntime.lastSerialized = "";
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        try {
          deleteCookie(STORAGE_COOKIE_KEY);
        } catch {}
      }
      saveState(next, { immediate: true });
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
      "passedGateIds",
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
    // Reject a backup whose carried progress is entirely corrupt before anything
    // is replaced — otherwise a junk list would wipe real progress, advance the
    // reset marker for other tabs, and still report success.
    if (hasCorruptProgress(payload)) return false;
    if (isPlausibleStateObject(payload.progressByLanguage)) {
      for (const [langId, rawSlice] of Object.entries(payload.progressByLanguage)) {
        if (!isValidLanguageId(langId) || isDangerousKey(langId)) continue;
        if (isPlausibleStateObject(rawSlice) && hasCorruptProgress(rawSlice)) return false;
      }
    }
    if (!persistenceRuntime.hasHydratedFromStorage && persistenceRuntime.bootSavedState && Object.keys(persistenceRuntime.bootSavedState).length > 0) get().hydrateFromStorage();
    set((s) => {
      const nextSettings = isPlausibleStateObject(payload.settings)
        ? normalizeSettings(payload.settings, s.settings)
        : s.settings;
      const currentTheme = normalizeThemeId(payload.theme, s.theme || DEFAULT_THEME);
      const currentFont = normalizeFontId(payload.font, s.font || DEFAULT_FONT);

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
          "passedGateIds",
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
      if (Array.isArray(payload.passedGateIds)) {
        topLevelPatch.passedGateIds = normalizeLessonIdList(payload.passedGateIds);
      }
      if (isPlausibleStateObject(payload.wordMastery)) {
        topLevelPatch.wordMastery = normalizeWordMastery(payload.wordMastery);
      }
      if (Array.isArray(payload.srsCards) || isPlausibleStateObject(payload.srsCards)) {
        topLevelPatch.srsCards = importSrsCards(payload.srsCards, {});
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
        progressVersions: activeSlice.progressVersions ?? emptyVersions(),
        seenIntroLanguages: nextSeenIntroLanguages,
        // A backup that carries progress replaces it everywhere; tell other
        // tabs so their union-merge does not resurrect the pre-import state.
        progressResetAt: carriesProgress ? Math.max(Date.now(), s.progressResetAt + 1) : s.progressResetAt,
        progressResetActor: carriesProgress ? progressActor : s.progressResetActor,
        // Mirror the backup's merged active slice. saveState() rebuilds that
        // slice from these fields, so from this point on what gets written back
        // is exactly what the backup imported — a restored slice can no longer
        // be overwritten by the previous language's mirrored progress.
        completedLessons: activeSlice.completedLessons,
        currentLessonId: activeSlice.currentLessonId,
        lessonProgress: activeSlice.lessonProgress,
        lessonStars: activeSlice.lessonStars,
        passedGateIds: activeSlice.passedGateIds,
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
      saveState(next, { immediate: true });
      return next;
    });
    return true;
  },
});
