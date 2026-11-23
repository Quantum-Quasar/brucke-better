import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "../lib/store";
import { normalizeStarredWordIds } from "../lib/store/schema";
import { buildReviewExportRows, EXPORT_COLUMNS, formatReviewExport } from "../lib/review-export";
import { createInitialCard } from "../lib/srs";
import { compendium } from "../data/compendium";

describe("Starred Words ('My Words') & CSV/Anki export", () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
  });

  it("toggles starred words per language and isolates languages", () => {
    const store = useAppStore.getState();
    store.toggleStarWord("hoffen");
    store.toggleStarWord("wasser");
    expect(useAppStore.getState().starredWordIds["de"]).toEqual(["hoffen", "wasser"]);

    // Switching language keeps German stars intact and tracks French independently
    store.setActiveLanguage("fr");
    store.toggleStarWord("maison");
    expect(useAppStore.getState().starredWordIds["fr"]).toEqual(["maison"]);
    expect(useAppStore.getState().starredWordIds["de"]).toEqual(["hoffen", "wasser"]);

    // Unstarring removes only that word
    store.setActiveLanguage("de");
    store.toggleStarWord("hoffen");
    expect(useAppStore.getState().starredWordIds["de"]).toEqual(["wasser"]);
  });

  it("normalizes and round-trips starredWordIds through backup import and reset", () => {
    const cleaned = normalizeStarredWordIds({
      de: ["hoffen", "hoffen", "  ", "__proto__", "wasser"],
      invalid_lang: ["foo"],
    });
    expect(cleaned).toEqual({ de: ["hoffen", "wasser"] });

    const ok = useAppStore.getState().importBackupState({
      activeLanguageId: "de",
      starredWordIds: { de: ["schiff", "buch"] },
    });
    expect(ok).toBe(true);
    expect(useAppStore.getState().starredWordIds["de"]).toEqual(["schiff", "buch"]);

    useAppStore.getState().resetProgress();
    expect(useAppStore.getState().starredWordIds).toEqual({});
  });

  it("exports clean CSV and Anki TSV with required columns and proper escaping", () => {
    const sample = compendium.wordList.slice(0, 2);
    const card0 = { ...createInitialCard(sample[0].id), interval: 14, due_date: "2026-12-01" };
    const rows = buildReviewExportRows("de", sample, { [sample[0].id]: card0 });

    expect(rows).toHaveLength(2);
    expect(rows[0].target_word).toBe(sample[0].target_word);
    expect(rows[0].interval).toBe("14");
    expect(rows[0].nextReviewDate).toBe("2026-12-01");
    expect(rows[1].interval).toBe("0");

    const csv = formatReviewExport(rows, "csv");
    const csvLines = csv.split("\n");
    expect(csvLines[0]).toBe(EXPORT_COLUMNS.join(","));
    expect(csvLines).toHaveLength(3);

    const tsv = formatReviewExport(
      [
        {
          target_word: "Haus",
          english_meaning: 'house, "home"',
          gender: "das",
          plural: "die Häuser",
          context_phrase: "Das\tHaus\nist groß.",
          interval: "21",
          nextReviewDate: "2026-12-15",
        },
      ],
      "tsv"
    );
    const tsvLines = tsv.split("\n");
    expect(tsvLines[0]).toBe("#separator:tab");
    expect(tsvLines[1]).toBe("#html:false");
    expect(tsvLines[2]).toBe(EXPORT_COLUMNS.join("\t"));
    expect(tsvLines[3].split("\t")).toEqual([
      "Haus",
      '"house, ""home"""',
      "das",
      "die Häuser",
      "Das Haus ist groß.",
      "21",
      "2026-12-15",
    ]);
  });
});
