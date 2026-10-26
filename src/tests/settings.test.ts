import { describe, it, expect, beforeEach } from "vitest";
import { DEFAULT_SETTINGS } from "../data/settings";
import { useAppStore } from "../lib/store";

describe("Settings & Store Architecture", () => {
  beforeEach(() => {
    useAppStore.getState().resetSettings();
  });

  it("contains valid default customization settings", () => {
    expect(DEFAULT_SETTINGS.quickRestart).toBe("off");
    expect(DEFAULT_SETTINGS.lazyMode).toBe(false);
    expect(DEFAULT_SETTINGS.capitalizationTolerance).toBe(false);
    expect(DEFAULT_SETTINGS.stopOnError).toBe("off");
    expect(DEFAULT_SETTINGS.confidenceMode).toBe("off");
    expect(DEFAULT_SETTINGS.playSoundOnClick).toBe("18"); // Cherry MX Black ABS
    expect(DEFAULT_SETTINGS.playSoundOnError).toBe("1");
    expect(DEFAULT_SETTINGS.soundVolume).toBe(0.5);
    expect(DEFAULT_SETTINGS.showCharBar).toBe("always");
    expect(DEFAULT_SETTINGS.showKeyTips).toBe(true);
    expect(DEFAULT_SETTINGS.capsLockWarning).toBe(true);
    expect(DEFAULT_SETTINGS.showMasteryCounter).toBe(true);
    expect(DEFAULT_SETTINGS.increasedContrast).toBe(false);
  });

  it("updates individual settings via useAppStore.updateSetting", () => {
    const store = useAppStore.getState();

    store.updateSetting("quickRestart", "esc");
    expect(useAppStore.getState().settings.quickRestart).toBe("esc");

    store.updateSetting("stopOnError", "letter");
    expect(useAppStore.getState().settings.stopOnError).toBe("letter");

    store.updateSetting("confidenceMode", "on");
    expect(useAppStore.getState().settings.confidenceMode).toBe("on");

    store.updateSetting("soundVolume", 0.8);
    expect(useAppStore.getState().settings.soundVolume).toBe(0.8);
  });

  it("synchronizes lazyMode and capitalizationTolerance with store tolerance state", () => {
    const store = useAppStore.getState();

    store.updateSetting("lazyMode", true);
    expect(useAppStore.getState().settings.lazyMode).toBe(true);
    expect(useAppStore.getState().tolerance.umlautTolerance).toBe(true);

    store.updateSetting("capitalizationTolerance", true);
    expect(useAppStore.getState().settings.capitalizationTolerance).toBe(true);
    expect(useAppStore.getState().tolerance.capitalizationTolerance).toBe(true);
  });

  it("resets all settings to default upon resetSettings call", () => {
    const store = useAppStore.getState();

    store.updateSetting("quickRestart", "esc");
    store.updateSetting("soundVolume", 0.9);
    store.updateSetting("showKeyTips", false);
    store.updateSetting("increasedContrast", true);
    expect(useAppStore.getState().settings.quickRestart).toBe("esc");
    expect(useAppStore.getState().settings.increasedContrast).toBe(true);

    store.resetSettings();
    const reset = useAppStore.getState().settings;
    expect(reset.quickRestart).toBe("off");
    expect(reset.soundVolume).toBe(0.5);
    expect(reset.showKeyTips).toBe(true);
  });

  it("safely imports backup state restoring all user progress and configurations", () => {
    const store = useAppStore.getState();

    const mockBackup = {
      timestamp: "2026-09-17T00:00:00.000Z",
      version: 1,
      settings: {
        quickRestart: "esc",
        soundVolume: 0.75,
        lazyMode: true,
      },
      completedLessons: ["lesson_01", "lesson_02"],
      currentLessonId: "lesson_03",
      wordMastery: {
        w_wasser: "mastered",
        w_apfel: "encountered",
      },
      srsCards: [
        {
          id: "card_1",
          word_id: "w_wasser",
          interval: 6,
          repetition: 2,
          efactor: 2.6,
          dueDate: "2026-09-20",
        },
      ],
      lessonStars: { 1: "purple", 2: "gold" },
      preferredReviewMode: "tiles",
      hasCompletedOnboarding: true,
      hasSeenGenderIntro: true,
      theme: "matrix",
      font: "Fira Code",
    };

    const success = store.importBackupState(mockBackup);
    expect(success).toBe(true);

    const state = useAppStore.getState();
    expect(state.completedLessons).toEqual([1, 2]);
    expect(state.currentLessonId).toBe(3);
    expect(state.wordMastery["w_wasser"]).toBe("mastered");
    expect(state.wordMastery["w_apfel"]).toBe("encountered");
    expect(Object.keys(state.srsCards).length).toBe(1);
    expect(state.srsCards["card_1"].word_id).toBe("w_wasser");
    expect(state.lessonStars[1]).toBe("purple");
    expect(state.lessonStars[2]).toBe("gold");
    expect(state.preferredReviewMode).toBe("tiles");
    expect(state.hasCompletedOnboarding).toBe(true);
    expect(state.hasSeenGenderIntro).toBe(true);
    expect(state.theme).toBe("matrix");
    expect(state.font).toBe("Fira Code");
    expect(state.settings.quickRestart).toBe("esc");
    expect(state.settings.soundVolume).toBe(0.75);
    expect(state.settings.lazyMode).toBe(true);
    expect(state.tolerance.umlautTolerance).toBe(true);
  });

  it("ignores invalid review modes and non-boolean flags in backup imports", () => {
    const store = useAppStore.getState();
    const beforeMode = useAppStore.getState().preferredReviewMode;
    const beforeOnboarding = useAppStore.getState().hasCompletedOnboarding;

    store.importBackupState({ preferredReviewMode: "cheat-mode", hasCompletedOnboarding: "yes" });
    const state = useAppStore.getState();
    expect(state.preferredReviewMode).toBe(beforeMode);
    expect(state.hasCompletedOnboarding).toBe(beforeOnboarding);
  });

  it("handles partial or empty backup imports defensively without breaking state", () => {
    const store = useAppStore.getState();

    const invalidResult = store.importBackupState(null);
    expect(invalidResult).toBe(false);

    const stringResult = store.importBackupState("invalid");
    expect(stringResult).toBe(false);

    // Partial valid backup
    const partialBackup = {
      theme: "nord",
    };
    const partialResult = store.importBackupState(partialBackup);
    expect(partialResult).toBe(true);
    expect(useAppStore.getState().theme).toBe("nord");
  });
});
