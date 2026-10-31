import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { FONT_LIST } from "../data/fonts";
import { SOUND_CLICK_OPTIONS, SOUND_ERROR_OPTIONS } from "../lib/sound";
import { LESSONS } from "../data/lessons";
import { compendium } from "../data/compendium";

const ROOT_DIR = path.resolve(__dirname, "../..");
const WEBFONTS_DIR = path.resolve(ROOT_DIR, "public/webfonts");
const SOUNDS_DIR = path.resolve(ROOT_DIR, "public/sounds");
const FONTS_CSS_PATH = path.resolve(ROOT_DIR, "src/app/fonts.css");

describe("Filesystem Assets & Dynamic Routes Integrity", () => {
  describe("Physical Font Files & CSS Declarations", () => {
    it("contains all 43 font definitions in FONT_LIST", () => {
      expect(FONT_LIST).toHaveLength(43);
    });

    it("verifies that fonts.css exists and declares @font-face rules for custom fonts", () => {
      expect(fs.existsSync(FONTS_CSS_PATH)).toBe(true);
      const fontsCss = fs.readFileSync(FONTS_CSS_PATH, "utf-8");

      const customFonts = FONT_LIST.filter((f) => !f.systemFont);
      expect(customFonts.length).toBeGreaterThanOrEqual(39);

      for (const font of customFonts) {
        // fonts.css must reference either the font id or font family name
        const hasFontName = fontsCss.includes(font.name) || fontsCss.includes(font.id);
        expect(hasFontName, `Expected fonts.css to declare font ${font.name}`).toBe(true);
      }
    });

    it("verifies that custom webfont files exist in public/webfonts and have non-zero size", () => {
      expect(fs.existsSync(WEBFONTS_DIR)).toBe(true);
      const fontFiles = fs.readdirSync(WEBFONTS_DIR).filter((f) => f.endsWith(".woff2"));
      expect(fontFiles.length).toBeGreaterThanOrEqual(40);

      for (const file of fontFiles) {
        const filePath = path.join(WEBFONTS_DIR, file);
        const stats = fs.statSync(filePath);
        expect(stats.size, `Font file ${file} should not be empty`).toBeGreaterThan(1000);
      }
    });
  });

  describe("Physical Sound Assets & Pack Verification", () => {
    it("verifies that all click sound pack folders exist and contain non-empty .wav files", () => {
      expect(fs.existsSync(SOUNDS_DIR)).toBe(true);
      const activeClickPacks = SOUND_CLICK_OPTIONS.filter((s) => s.id !== "off");
      expect(activeClickPacks.length).toBeGreaterThanOrEqual(18);

      for (const pack of activeClickPacks) {
        const packDir = path.join(SOUNDS_DIR, `click${pack.id}`);
        expect(fs.existsSync(packDir), `Sound pack directory click${pack.id} must exist`).toBe(true);

        const files = fs.readdirSync(packDir).filter((f) => f.endsWith(".wav"));
        expect(files.length, `Pack click${pack.id} should have ${pack.count} audio files`).toBeGreaterThanOrEqual(pack.count);

        // Verify each individual indexed audio file (1.wav to N.wav)
        for (let i = 1; i <= pack.count; i++) {
          const wavPath = path.join(packDir, `${i}.wav`);
          expect(fs.existsSync(wavPath), `Audio file ${wavPath} must exist`).toBe(true);
          const stat = fs.statSync(wavPath);
          expect(stat.size, `Audio file ${wavPath} should have data`).toBeGreaterThan(100);
        }
      }
    });

    it("verifies that all error audio cue folders exist and contain non-empty .wav files", () => {
      const activeErrorCues = SOUND_ERROR_OPTIONS.filter((s) => s.id !== "off");
      expect(activeErrorCues.length).toBeGreaterThanOrEqual(4);

      for (const cue of activeErrorCues) {
        const cueDir = path.join(SOUNDS_DIR, `error${cue.id}`);
        expect(fs.existsSync(cueDir), `Error sound folder error${cue.id} must exist`).toBe(true);

        for (let i = 1; i <= cue.count; i++) {
          const wavPath = path.join(cueDir, `${i}.wav`);
          expect(fs.existsSync(wavPath), `Error audio ${wavPath} must exist`).toBe(true);
          const stat = fs.statSync(wavPath);
          expect(stat.size).toBeGreaterThan(100);
        }
      }
    });
  });

  describe("Curriculum trail lessons (in-page reader payloads)", () => {
    it("verifies that every authored lesson resolves with intact word associations", () => {
      expect(LESSONS.length).toBeGreaterThanOrEqual(100);

      for (const lesson of LESSONS) {
        const ctx = `lesson ${lesson.id}`;
        expect(lesson.title, `${ctx} must have a title`).toBeTruthy();
        expect(lesson.phase, `${ctx} must have a phase`).toBeGreaterThanOrEqual(1);
        expect(lesson.exercises.length, `${ctx} must have exercises`).toBeGreaterThanOrEqual(3);

        // Verify table words map to valid words in Compendium
        for (const wordId of lesson.table_word_ids) {
          const word = compendium.words[wordId.toLowerCase()];
          expect(word, `Table word "${wordId}" in ${ctx} must exist in compendium`).toBeDefined();
        }

        // Verify lesson word_ids map to valid words in Compendium
        for (const wordId of lesson.word_ids) {
          const word = compendium.words[wordId.toLowerCase()];
          expect(word, `Word "${wordId}" in ${ctx} must exist in compendium`).toBeDefined();
        }
      }
    });

    it("handles out-of-bounds lesson query safely without throwing", () => {
      const invalidLesson = LESSONS.find((l) => l.id === 9999);
      expect(invalidLesson).toBeUndefined();
    });
  });

  describe("Atlas sound-shift families (in-page detail view)", () => {
    it("verifies all 9 sound shift families generate valid static params and contain populated word lists", () => {
      const shiftKeys = Object.keys(compendium.shifts);
      expect(shiftKeys).toHaveLength(9);

      for (const shiftId of shiftKeys) {
        const family = compendium.shifts[shiftId];
        expect(family).toBeDefined();
        expect(family.id).toBe(shiftId);
        expect(family.name).toBeTruthy();
        expect(family.symbol).toBeTruthy();
        expect(family.phonetic_rule).toBeTruthy();
        expect(family.word_ids.length, `Shift ${shiftId} should have linked words`).toBeGreaterThanOrEqual(3);

        // Verify that all words listed in this family actually exist in compendium.words
        for (const wordId of family.word_ids) {
          const word = compendium.words[wordId];
          expect(word, `Word "${wordId}" in shift family "${shiftId}" must exist in words dictionary`).toBeDefined();
          expect(word.sound_shift_ids).toContain(shiftId);
        }
      }
    });

    it("handles non-existent sound shift family safely", () => {
      const missingFamily = compendium.shifts["nonexistent_shift_id"];
      expect(missingFamily).toBeUndefined();
    });
  });
});
