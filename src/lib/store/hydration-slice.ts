import type { AppState, LanguageProgress, StoreSlice } from "./types";
import { saveState, persistenceRuntime } from "./persistence";
import { loadSavedState, safeStorageGet, parseStoredJson, cancelPendingSave } from "./persistence";
import { applyAppearanceSettings, applyTheme, DEFAULT_THEME } from "../theme-runtime";
import { applyFont, DEFAULT_FONT } from "@/data/fonts";
import { DEFAULT_SETTINGS } from "@/data/settings";
import { isValidLanguageId } from "@/data/languages";
import { STORAGE_KEY } from "../storage-keys";
import { preloadClickSoundOnFirstInteraction } from "../sound";
import { emptyVersions, sliceFromMirrors, mergeLanguageSlice } from "./progress-state";
import { isPlausibleStateObject, normalizeParsedState, normalizeSettings, normalizeThemeId, normalizeFontId, isDangerousKey, normalizeLanguageSlice, normalizeTolerance, oneOf, VALID_REVIEW_MODES } from "./schema";

export const createHydrationSlice: StoreSlice<"hydrateFromStorage"> = (set, get) => ({
  hydrateFromStorage: (options) => {
    if (typeof window === "undefined") return;
    // Strict Mode mounts effects twice; the second mount must not re-read a
    // storage copy that a child effect may have already overwritten with the
    // defaults. Only an explicit re-read (cross-tab event, test) is allowed.
    if (persistenceRuntime.hasHydratedFromStorage && !options?.reread) return;
    // A pending deferred write holds this tab's pre-merge snapshot; flushing it
    // after adopting another tab's write would clobber that write.
    if (options?.reread) cancelPendingSave();
    // The FIRST hydration must use the snapshot captured before React mounted.
    // Child mount effects run before the root layout's effect and some of them
    // (LessonReader persists the current segment) write the not-yet-hydrated
    // defaults back to localStorage. Re-reading storage here would then hydrate
    // from that clobbered copy and lose the learner's real progress. Later calls
    // (cross-tab) re-read storage on purpose.
    const fromBoot = !persistenceRuntime.hasHydratedFromStorage && persistenceRuntime.bootSavedState && Object.keys(persistenceRuntime.bootSavedState).length > 0;
    const duringBoot = fromBoot ? safeStorageGet(STORAGE_KEY) : null;
    const duringBootParsed = parseStoredJson(duringBoot);
    if (isPlausibleStateObject(duringBootParsed)) delete duringBootParsed.savedAt;
    const externalDuringBoot = duringBoot && isPlausibleStateObject(duringBootParsed) && JSON.stringify(duringBootParsed) !== persistenceRuntime.lastSerialized;
    const snapshot = options?.snapshot ? parseStoredJson(options.snapshot) : null;
    const snapshotState = isPlausibleStateObject(snapshot) ? normalizeParsedState(snapshot) : null;
    const saved = fromBoot ? persistenceRuntime.bootSavedState : snapshotState
      ? { ...loadSavedState(), progressByLanguage: snapshotState.progressByLanguage, progressResetAt: snapshotState.progressResetAt, progressResetActor: snapshotState.progressResetActor }
      : loadSavedState();
    if (saved && Object.keys(saved).length > 0) {
      set((s) => {
        const nextSettings = normalizeSettings(saved.settings, s.settings);
        const currentTheme = normalizeThemeId(saved.theme, s.theme || DEFAULT_THEME);
        const currentFont = normalizeFontId(saved.font, s.font || DEFAULT_FONT);
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
        const incomingResetActor = saved.progressResetActor ?? "";
        const resetComparison = incomingResetAt - s.progressResetAt || incomingResetActor.localeCompare(s.progressResetActor);
        const isReset = resetComparison > 0;

        // Seed the merge with the in-memory mirrors: progressByLanguage is not
        // updated by every action, so the top-level fields are the freshest
        // copy of the active language's slice.
        const mergedSlices: Record<string, LanguageProgress> = isReset
          ? {}
          : {
              ...s.progressByLanguage,
              [s.activeLanguageId]: sliceFromMirrors(s),
            };
        for (const [langId, rawSlice] of Object.entries(snapshotState && resetComparison < 0 ? {} : saved.progressByLanguage ?? {})) {
          if (!isValidLanguageId(langId) || isDangerousKey(langId)) continue;
          const incoming = normalizeLanguageSlice(rawSlice);
          const existing = mergedSlices[langId];
          // A same-tab language switch restores the parked slice exactly; a
          // cross-tab re-hydration always unions (so a fresher parked slice in
          // this tab is not replaced by an older one from the other tab).
          mergedSlices[langId] =
            !existing || isReset || (isLangSwitch && langId === nextLang && !isCrossTab)
              ? incoming
              : mergeLanguageSlice(existing, incoming, Boolean(fromBoot));
        }
        const activeSlice = mergedSlices[nextLang] ?? normalizeLanguageSlice({});
        mergedSlices[nextLang] = activeSlice;

        const nextCompletedOnboarding =
          typeof saved.hasCompletedOnboarding === "boolean" ? saved.hasCompletedOnboarding : s.hasCompletedOnboarding;

        const next: AppState = {
          ...s,
          activeLanguageId: nextLang,
          progressByLanguage: mergedSlices,
          progressVersions: activeSlice.progressVersions ?? emptyVersions(),
          progressResetAt: isReset ? incomingResetAt : s.progressResetAt,
          progressResetActor: isReset ? incomingResetActor : s.progressResetActor,
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
          passedGateIds: activeSlice.passedGateIds,
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
          ...(persistenceRuntime.hasAutoOpenedOnboarding ? {} : { isOnboardingOpen: false }),
        };
        return next;
      });
      const latestSettings = get().settings;
      applyAppearanceSettings(latestSettings);
      if (latestSettings.playSoundOnClick !== "off") {
        preloadClickSoundOnFirstInteraction(latestSettings.playSoundOnClick);
      }
    } else if (!persistenceRuntime.hasAutoOpenedOnboarding) {
      // Clean slate first-time user: trigger onboarding (once per page load)!
      applyTheme(DEFAULT_THEME);
      applyFont(DEFAULT_FONT);
      applyAppearanceSettings(DEFAULT_SETTINGS);
      set((s) => ({ ...s, isOnboardingOpen: false }));
    }
    persistenceRuntime.hasAutoOpenedOnboarding = true;
    persistenceRuntime.hasHydratedFromStorage = true;
    if (fromBoot) {
      // Capture another tab's write that landed before the listener was added.
      if (externalDuringBoot) {
        get().hydrateFromStorage({ reread: true, snapshot: duringBoot });
      }
      // A child mount effect may have written the defaults over the saved
      // state before this effect ran. Put the hydrated state back, bypassing
      // saveState's dedupe (it still holds the clobbering payload).
      persistenceRuntime.lastSerialized = "";
      saveState(get(), { immediate: true });
    }
    // Components that seeded local state from the (default) store at mount can
    // now adopt the real saved values — and an already-open view can re-adopt
    // after a cross-tab save (hydrateEpoch).
    set((s) => ({ ...s, storeHydrated: true, hydrateEpoch: s.hydrateEpoch + 1 }));
    if (options?.reread) {
      // Persist the merged union right away: the other tab keeps its own copy,
      // and the immediate write also means a second cross-tab save from this
      // tab cannot race a stale pending snapshot.
      saveState(get(), { immediate: true });
    }
  },
});
