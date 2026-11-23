import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "../lib/store";
import { createProgressBackup } from "../lib/progress-backup";
import {
  ANKI_TSV_HEADER,
  buildReviewExportRows,
  CSV_UTF8_BOM,
  EXPORT_COLUMNS,
  formatReviewDownloadContent,
  formatReviewExport,
} from "../lib/review-export";
import { createInitialCard } from "../lib/srs";
import type { WordEntity } from "../lib/types";

const makeWord = (overrides: Partial<WordEntity>): WordEntity => ({
  id: "haus",
  target_word: "Haus",
  english_cognate: "house",
  english_meaning: "house",
  gender: "das",
  ipa: "/haʊ̯s/",
  sound_shift_ids: [],
  shift_rule: "",
  context_phrase: "Das Haus ist groß.",
  context_translation: "The house is big.",
  etymology_derivation: "",
  ...overrides,
});

describe("Review CSV / Anki TSV export & starred backup round-trip", () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
  });

  it("filters out synthetic article_*, sentence_*, compound_*, and trap_* entities", () => {
    const words = [
      makeWord({ id: "haus", target_word: "Haus" }),
      makeWord({ id: "article_haus", target_word: "das" }),
      makeWord({ id: "sentence_1", target_word: "Das Haus ist groß" }),
      makeWord({ id: "compound_handschuh", target_word: "Handschuh" }),
      makeWord({ id: "trap_gift", target_word: "Gift" }),
    ];
    const rows = buildReviewExportRows("de", words, {});
    expect(rows).toHaveLength(1);
    expect(rows[0].target_word).toBe("Haus");
  });

  it("neutralizes spreadsheet formula injection prefixes in CSV cells and prepends UTF-8 BOM for downloads", () => {
    const rows = [
      {
        target_word: "=CMD()",
        english_meaning: "+SUM(A1:A2)",
        gender: "-das",
        plural: "@evil",
        context_phrase: "Normal, \"quoted\"",
        interval: "7",
        nextReviewDate: "2026-12-01",
      },
    ];
    const csv = formatReviewExport(rows, "csv");
    const lines = csv.split("\n");
    expect(lines[0]).toBe(EXPORT_COLUMNS.join(","));
    expect(lines[1]).toBe(`'=CMD(),'+SUM(A1:A2),'-das,'@evil,"Normal, ""quoted""",7,2026-12-01`);

    const downloadCsv = formatReviewDownloadContent(rows, "csv");
    expect(downloadCsv.startsWith(CSV_UTF8_BOM)).toBe(true);
    expect(downloadCsv.slice(1)).toBe(csv);
  });

  it("emits Anki TSV directives and escapes double quotes", () => {
    const rows = [
      {
        target_word: "Haus",
        english_meaning: 'house, "home"',
        gender: "das",
        plural: "die Häuser",
        context_phrase: "Das\tHaus\nist groß.",
        interval: "21",
        nextReviewDate: "2026-12-15",
      },
    ];
    const tsv = formatReviewExport(rows, "tsv");
    expect(tsv.startsWith(ANKI_TSV_HEADER)).toBe(true);
    const lines = tsv.split("\n");
    expect(lines[0]).toBe("#separator:tab");
    expect(lines[1]).toBe("#html:false");
    expect(lines[2]).toBe(EXPORT_COLUMNS.join("\t"));
    expect(lines[3].split("\t")).toEqual([
      "Haus",
      '"house, ""home"""',
      "das",
      "die Häuser",
      "Das Haus ist groß.",
      "21",
      "2026-12-15",
    ]);

    // TSV download does not prepend BOM
    expect(formatReviewDownloadContent(rows, "tsv")).toBe(tsv);
  });

  it("round-trips starredWordIds through createProgressBackup -> importBackupState", () => {
    const store = useAppStore.getState();
    store.toggleStarWord("haus");
    store.toggleStarWord("wasser");
    store.setActiveLanguage("fr");
    store.toggleStarWord("maison");
    store.setActiveLanguage("de");

    const backup = JSON.parse(
      JSON.stringify(createProgressBackup(useAppStore.getState(), new Date("2026-11-23T12:00:00Z")))
    );
    expect(backup.starredWordIds).toEqual({
      de: ["haus", "wasser"],
      fr: ["maison"],
    });

    store.resetProgress();
    expect(useAppStore.getState().starredWordIds).toEqual({});

    expect(useAppStore.getState().importBackupState(backup)).toBe(true);
    expect(useAppStore.getState().starredWordIds).toEqual({
      de: ["haus", "wasser"],
      fr: ["maison"],
    });
    expect(createInitialCard("haus").word_id).toBe("haus");
  });
});
