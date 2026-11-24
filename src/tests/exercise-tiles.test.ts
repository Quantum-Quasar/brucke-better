import { describe, expect, it } from "vitest";
import {
  arrangeTilesDeterministically,
  lowercaseSentenceStarterTiles,
} from "@/components/lesson/exercise-tiles";
import { hashSeed, seededShuffle } from "@/lib/prng";

// These helpers moved out of ExerciseWidgets so the lesson route does not load
// the exercise engine before practice. They are deterministic and SSR-safe, so
// their exact output is part of the contract: a changed hash or shuffle would
// reorder every learner's tiles between renders.

describe("exercise tile helpers", () => {
  it("hashes to a stable uint32", () => {
    expect(hashSeed("arm")).toBe(946808757);
    expect(hashSeed("arm")).toBe(hashSeed("arm"));
    expect(hashSeed("arm")).not.toBe(hashSeed("hand"));
    expect(hashSeed("")).toBeGreaterThanOrEqual(0);
  });

  it("shuffles deterministically without mutating the input", () => {
    const input = ["a", "b", "c", "d", "e"];
    const shuffled = seededShuffle(input, 42);

    expect(input).toEqual(["a", "b", "c", "d", "e"]);
    expect(shuffled).toEqual(["a", "e", "c", "b", "d"]);
    expect(seededShuffle(input, 42)).toEqual(shuffled);
    expect([...shuffled].sort()).toEqual([...input].sort());
  });

  it("breaks a trivially correct tile order", () => {
    // pressing the tiles left to right would otherwise spell "danken"
    expect(arrangeTilesDeterministically(["dank", "en"], "x", "danken")).toEqual([
      "en",
      "dank",
    ]);
    expect(arrangeTilesDeterministically(["a"], "x", "a")).toEqual(["a"]);
  });

  it("breaks a trivially correct word order", () => {
    // the authored word bank starts in the target order
    expect(
      arrangeTilesDeterministically(["ich", "lerne", "deutsch"], "y", "ich lerne deutsch")
    ).toEqual(["ich", "deutsch", "lerne"]);
  });

  it("lowercases non-noun sentence starters while preserving German nouns", () => {
    expect(lowercaseSentenceStarterTiles(["Ich", "habe", "einen", "Hund"])).toEqual([
      "ich",
      "habe",
      "einen",
      "Hund",
    ]);
    expect(lowercaseSentenceStarterTiles(["Heute", "trinke", "ich", "Wasser"])).toEqual([
      "heute",
      "trinke",
      "ich",
      "Wasser",
    ]);
  });

  it("preserves German nouns/formal Ihr and scopes sentence starters by language", () => {
    expect(lowercaseSentenceStarterTiles(["Morgen", "Dank", "Haar", "Ihr", "Ich"], "de")).toEqual([
      "Morgen",
      "Dank",
      "Haar",
      "Ihr",
      "ich",
    ]);
    expect(lowercaseSentenceStarterTiles(["Morgen", "Dank", "Haar", "Ik"], "nl")).toEqual([
      "morgen",
      "dank",
      "haar",
      "ik",
    ]);
  });

  it("capitalizes assembled tile answers when the target starts with an uppercase letter", async () => {
    const { capitalizeAssembledTileAnswer } = await import("@/components/lesson/exercise-tiles");
    const { gradeLessonAnswer } = await import("@/lib/lesson-grading");
    const assembled = capitalizeAssembledTileAnswer("ich habe einen Hund", "Ich habe einen Hund");
    expect(assembled).toBe("Ich habe einen Hund");
    expect(
      gradeLessonAnswer([assembled], ["Ich habe einen Hund"], {
        languageId: "de",
        umlautTolerance: false,
        capitalizationTolerance: false,
      }).result.accuracy
    ).toBe("exact");
  });

  it("uses language-scoped STRUCTURAL_FOILS for Dutch de/het without een->het", async () => {
    const { generateWordTiles } = await import("@/lib/review-modes");
    const nlCard = {
      id: "sentence_nl_1",
      target_word: "De hond is groot",
      english_cognate: "The dog is big",
      english_meaning: "The dog is big",
      gender: null,
      ipa: "",
      sound_shift_ids: [],
      shift_rule: "",
      context_phrase: "De hond is groot.",
      context_translation: "The dog is big.",
      etymology_derivation: "",
    };
    const nlTiles = generateWordTiles(nlCard, [], "nl");
    expect(nlTiles.tiles).toContain("het");
  });

  it("lowercases expanded German contractions and sentence-starting verbs while preserving German nouns", () => {
    expect(
      lowercaseSentenceStarterTiles(
        ["Zum", "Zur", "Ins", "Ans", "Am", "Im", "Vom", "Beim", "Gehe", "Trinke", "Lese", "Hätte", "Wäre", "Würde", "Könnte", "Bitte", "Danke", "Kaffee", "Buch"],
        "de",
      ),
    ).toEqual([
      "zum", "zur", "ins", "ans", "am", "im", "vom", "beim", "gehe", "trinke", "lese", "hätte", "wäre", "würde", "könnte", "bitte", "danke", "Kaffee", "Buch",
    ]);
  });

  it("lowercases non-proper-noun sentence starters across FR, ES, and NL while preserving proper nouns and acronyms", () => {
    expect(
      lowercaseSentenceStarterTiles(["L'homme", "Dans", "Pour", "Paris", "Français", "EU"], "fr"),
    ).toEqual(["l'homme", "dans", "pour", "Paris", "Français", "EU"]);

    expect(
      lowercaseSentenceStarterTiles(["Quiero", "Lo", "Tengo", "Voy", "Un", "Una", "¿Qué", "Madrid", "Español"], "es"),
    ).toEqual(["quiero", "lo", "tengo", "voy", "un", "una", "¿qué", "Madrid", "Español"]);

    expect(
      lowercaseSentenceStarterTiles(["Werk", "Heb", "Ben", "Er", "Amsterdam", "Nederland", "Nederlands", "I", "TV"], "nl"),
    ).toEqual(["werk", "heb", "ben", "er", "Amsterdam", "Nederland", "Nederlands", "I", "TV"]);
  });
});
