import { describe, it, expect, beforeEach } from "vitest";
import {
  GERMAN_BRIDGE_ENTRIES,
  GERMAN_BRIDGE_MAP,
  formatDutchWithArticle,
  formatGermanDutchPair,
  formatGermanWithArticle,
  lookupGermanBridge,
  type GermanBridgeCorrespondence,
} from "../data/dutch/german-bridge";
import { dutchCompendium } from "../data/dutch/compendium-nl";
import { compendium as germanCompendium } from "../data/compendium";
import { DEFAULT_SETTINGS } from "../data/settings";
import { useAppStore } from "../lib/store";
import { normalizeSettings } from "../lib/store/schema";
import { createProgressBackup } from "../lib/progress-backup";

describe("Dutch for German speakers — bridge dataset", () => {
  it("contains unique, well-formed entries with valid articles and bridge notes", () => {
    expect(GERMAN_BRIDGE_ENTRIES.length).toBeGreaterThanOrEqual(100);
    const seenIds = new Set<string>();
    for (const entry of GERMAN_BRIDGE_ENTRIES) {
      expect(seenIds.has(entry.dutchId)).toBe(false);
      seenIds.add(entry.dutchId);
      expect(entry.dutchWord.trim().length).toBeGreaterThan(0);
      expect(entry.germanTwin.trim().length).toBeGreaterThan(0);
      expect(entry.note.trim().length).toBeGreaterThan(0);
      if (entry.germanArticle !== null) {
        expect(["der", "die", "das"]).toContain(entry.germanArticle);
      }
      if (entry.dutchArticle !== null) {
        expect(["de", "het"]).toContain(entry.dutchArticle);
      }
      expect(GERMAN_BRIDGE_MAP[entry.dutchId.toLowerCase()]).toBe(entry);
    }
  });

  it("covers all core German-to-Dutch sound correspondences", () => {
    const required: GermanBridgeCorrespondence[] = [
      "ij↔ei",
      "ui↔au",
      "oe↔u",
      "sch↔sch",
      "d↔t",
      "k↔ch",
      "p↔pf/f",
      "t↔s/ss/z",
    ];
    for (const corr of required) {
      const matches = GERMAN_BRIDGE_ENTRIES.filter((e) => e.correspondence === corr);
      expect(matches.length, `expected entries for ${corr}`).toBeGreaterThanOrEqual(4);
    }
  });

  it("maps canonical cognate pairs and formats DE ↔ NL strings cleanly", () => {
    const huis = lookupGermanBridge("huis");
    expect(huis).not.toBeNull();
    expect(huis?.germanArticle).toBe("das");
    expect(huis?.germanTwin).toBe("Haus");
    expect(huis?.correspondence).toBe("ui↔au");
    expect(huis?.falseFriend).toBeUndefined();
    expect(formatGermanWithArticle(huis!)).toBe("das Haus");
    expect(formatDutchWithArticle(huis!)).toBe("het huis");
    expect(formatGermanDutchPair(huis!)).toBe("DE: das Haus ↔ NL: het huis");

    const spreken = lookupGermanBridge("  SPREKEN ");
    expect(spreken?.germanTwin).toBe("sprechen");
    expect(spreken?.correspondence).toBe("k↔ch");
    expect(formatGermanDutchPair(spreken!)).toBe("DE: sprechen ↔ NL: spreken");

    expect(lookupGermanBridge("")).toBeNull();
    expect(lookupGermanBridge("nonexistent_word_xyz")).toBeNull();
  });

  it("flags famous German↔Dutch false friends accurately", () => {
    const expectedFalseFriends: Array<{
      id: string;
      germanTwin: string;
      germanArticle: "der" | "die" | "das" | null;
    }> = [
      { id: "wie", germanTwin: "wer", germanArticle: null },
      { id: "meer", germanTwin: "mehr (adv.) / der See (het meer)", germanArticle: null },
      { id: "winkel", germanTwin: "Geschäft", germanArticle: "das" },
      { id: "bellen", germanTwin: "anrufen", germanArticle: null },
      { id: "slim", germanTwin: "klug", germanArticle: null },
      { id: "zee", germanTwin: "Meer", germanArticle: "das" },
    ];

    for (const expected of expectedFalseFriends) {
      const entry = lookupGermanBridge(expected.id);
      expect(entry, `expected false friend ${expected.id}`).not.toBeNull();
      expect(entry?.falseFriend).toBe(true);
      expect(entry?.germanTwin).toBe(expected.germanTwin);
      expect(entry?.germanArticle).toBe(expected.germanArticle);
      expect(entry?.germanLookalike).toBeTruthy();
    }
  });

  it("aligns Dutch noun articles with compendium-nl.ts when present", () => {
    for (const entry of GERMAN_BRIDGE_ENTRIES) {
      const compWord = dutchCompendium.words[entry.dutchId];
      if (!compWord || !compWord.gender) continue;
      expect(entry.dutchArticle, `article mismatch for ${entry.dutchId}`).toBe(compWord.gender);
    }
  });
  it("cross-checks German noun articles against compendium.json and Dutch article presence against compendium-nl.ts", () => {
    const germanNouns = new Map<string, string>();
    for (const w of Object.values(germanCompendium.words)) {
      if (w.gender) {
        germanNouns.set(w.target_word.toLowerCase(), w.gender);
      }
    }
    for (const entry of GERMAN_BRIDGE_ENTRIES) {
      if (entry.germanArticle !== null) {
        const expectedGender = germanNouns.get(entry.germanTwin.toLowerCase());
        if (expectedGender) {
          expect(
            entry.germanArticle,
            `German article mismatch for ${entry.dutchId} (${entry.germanTwin})`
          ).toBe(expectedGender);
        }
      }
      const dutchWord = dutchCompendium.words[entry.dutchId];
      if (dutchWord && dutchWord.gender === null) {
        expect(
          entry.dutchArticle,
          `non-noun Dutch entry ${entry.dutchId} should not declare a noun article`
        ).toBeNull();
      }
    }
  });
});

describe("Dutch for German speakers — setting persistence", () => {
  beforeEach(() => {
    useAppStore.getState().resetSettings();
  });

  it("defaults dutchFromGerman to false", () => {
    expect(DEFAULT_SETTINGS.dutchFromGerman).toBe(false);
    expect(useAppStore.getState().settings.dutchFromGerman).toBe(false);
  });

  it("updates, persists in backup, and resets dutchFromGerman cleanly", () => {
    useAppStore.getState().updateSetting("dutchFromGerman", true);
    expect(useAppStore.getState().settings.dutchFromGerman).toBe(true);

    const backup = JSON.parse(JSON.stringify(createProgressBackup(useAppStore.getState())));
    expect(backup.settings.dutchFromGerman).toBe(true);

    useAppStore.getState().resetSettings();
    expect(useAppStore.getState().settings.dutchFromGerman).toBe(false);

    expect(useAppStore.getState().importBackupState(backup)).toBe(true);
    expect(useAppStore.getState().settings.dutchFromGerman).toBe(true);

    // Older backups without dutchFromGerman preserve current setting
    expect(useAppStore.getState().importBackupState({ settings: { soundVolume: 0.4 } })).toBe(true);
    expect(useAppStore.getState().settings.dutchFromGerman).toBe(true);
  });

  it("normalizes invalid dutchFromGerman values safely in schema validation", () => {
    expect(normalizeSettings({ dutchFromGerman: true }, DEFAULT_SETTINGS).dutchFromGerman).toBe(true);
    expect(normalizeSettings({ dutchFromGerman: false }, DEFAULT_SETTINGS).dutchFromGerman).toBe(false);
    expect(normalizeSettings({ dutchFromGerman: "yes" }, DEFAULT_SETTINGS).dutchFromGerman).toBe(false);
    expect(normalizeSettings({ dutchFromGerman: 1 }, { ...DEFAULT_SETTINGS, dutchFromGerman: true }).dutchFromGerman).toBe(true);
  });
});
