import type { StoreSlice } from "./types";
import { saveState } from "./persistence";
import { applyAppearanceSettings, applyTheme } from "../theme-runtime";
import { applyFont } from "@/data/fonts";
import { DEFAULT_SETTINGS } from "@/data/settings";
import { soundEngine } from "../sound";
import { clearFocusOpener, rememberFocusOpener } from "../focus-return";
import { SAFE_THEME_ID, SAFE_FONT_ID } from "./schema";

export const createSettingsSlice: StoreSlice<"updateSetting" | "resetSettings" | "setTheme" | "openThemeSelector" | "closeThemeSelector" | "setFont" | "openFontSelector" | "closeFontSelector" | "completeOnboarding" | "openOnboarding" | "closeOnboarding" | "dismissGenderIntro" | "openGenderIntro" | "setPreferredReviewMode" | "skipListeningFor" | "openWordDrawer" | "closeWordDrawer" | "setUmlautTolerance" | "setCapitalizationTolerance" | "dismissUmlautPrompt" | "dismissCapitalizationPrompt"> = (set, get) => ({
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
    if (!SAFE_THEME_ID.test(theme)) return;
    applyTheme(theme);
    set((s) => {
      const next = { ...s, theme };
      saveState(next);
      return next;
    });
  },

  openThemeSelector: () => {
    rememberFocusOpener();
    set({ isThemeSelectorOpen: true });
  },

  closeThemeSelector: () => {
    clearFocusOpener();
    set({ isThemeSelectorOpen: false });
  },

  setFont: (font: string) => {
    if (!SAFE_FONT_ID.test(font)) return;
    applyFont(font);
    set((s) => {
      const next = { ...s, font };
      saveState(next);
      return next;
    });
  },

  openFontSelector: () => {
    rememberFocusOpener();
    set({ isFontSelectorOpen: true });
  },

  closeFontSelector: () => {
    clearFocusOpener();
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
    rememberFocusOpener();
    set({ isOnboardingOpen: true, onboardingIntroLanguage: null });
  },

  closeOnboarding: () => {
    clearFocusOpener();
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

  skipListeningFor: (ms = 15 * 60 * 1000) => {
    const settings = { ...get().settings, listeningSkippedUntil: Date.now() + ms };
    const next = { settings };
    set(next);
    saveState({ ...get(), ...next });
  },

  openWordDrawer: (wordId) => {
    rememberFocusOpener();
    set({ activeWordDrawerId: wordId });
    get().markWordExplored(wordId);
  },

  closeWordDrawer: () => {
    clearFocusOpener();
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
});
