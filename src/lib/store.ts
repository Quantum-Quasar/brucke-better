"use client";

import { create } from "zustand";
import type { AppState } from "./store/types";
import { DEFAULT_LANGUAGE_ID } from "@/data/languages";
import { DEFAULT_SETTINGS } from "@/data/settings";
import { DEFAULT_FONT } from "@/data/fonts";
import { DEFAULT_THEME } from "./theme-runtime";
import { emptyVersions } from "./store/progress-state";
import { emptyWeek } from "./store/schema";
import { initializePersistence } from "./store/persistence";
import { createSettingsSlice } from "./store/settings-slice";
import { createProgressSlice } from "./store/progress-slice";
import { createReviewSlice } from "./store/review-slice";
import { createBackupSlice } from "./store/backup-slice";
import { createHydrationSlice } from "./store/hydration-slice";

export const useAppStore = create<AppState>((...args) => ({
  // Initialise from DEFAULTS only. Reading storage here made the client's first
  // render disagree with the server-rendered defaults (hydration mismatch);
  // persisted state is applied by hydrateFromStorage() from the root layout's
  // mount effect instead.
  activeLanguageId: DEFAULT_LANGUAGE_ID,
  progressByLanguage: {},
  progressVersions: emptyVersions(),
  seenIntroLanguages: [],
  completedLessons: [],
  currentLessonId: 1,
  lessonProgress: {},
  lessonStars: {},
  passedGateIds: [],
  wordMastery: {},
  srsCards: {},
  sentenceCards: {},
  weeklyActivity: emptyWeek(),
  lastActivityWeek: undefined,
  progressResetAt: 0,
  progressResetActor: "",
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
  ...createSettingsSlice(...args),
  ...createProgressSlice(...args),
  ...createReviewSlice(...args),
  ...createBackupSlice(...args),
  ...createHydrationSlice(...args),
}));

initializePersistence(useAppStore.getState);
