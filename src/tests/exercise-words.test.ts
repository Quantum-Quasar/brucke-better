import { describe, it, expect } from "vitest";
import { exerciseWordIds } from "../lib/exercise-words";
import type { ExerciseItem } from "../lib/types";

function exercise(partial: Partial<ExerciseItem>): ExerciseItem {
  return { id: "l1_e1", type: "derive", prompt: "", target_answer: "", ...partial };
}

describe("exerciseWordIds — scoping 'I guessed' to the words an exercise retrieves", () => {
  it("matches the single word a derive exercise produces", () => {
    const ex = exercise({ target_answer: "Kaffee" });
    expect(exerciseWordIds(ex, ["kaffee", "tee", "haus"])).toEqual(["kaffee"]);
  });

  it("matches every German side of a matching-pairs exercise", () => {
    const ex = exercise({
      type: "matching_pairs",
      matching_pairs: [
        { id: "a", english: "the coffee", german: "den Kaffee" },
        { id: "b", english: "the chair", german: "den Stuhl" },
      ],
      target_answer: "den Kaffee, den Stuhl",
    });
    expect(exerciseWordIds(ex, ["kaffee", "stuhl", "tee"])).toEqual(["kaffee", "stuhl"]);
  });

  it("matches the content words of a sentence, not unrelated lesson words", () => {
    const ex = exercise({ type: "syntax_builder", target_answer: "Wir setzen den Stuhl und zeigen den Löffel" });
    expect(exerciseWordIds(ex, ["setzen", "stuhl", "zeigen", "löffel", "kaffee", "der"])).toEqual([
      "setzen",
      "stuhl",
      "zeigen",
      "löffel",
    ]);
  });

  it("flags nothing when the exercise retrieves none of the lesson's words (never the whole lesson)", () => {
    const ex = exercise({ type: "shift_select", target_answer: "den" });
    expect(exerciseWordIds(ex, ["kaffee", "tee", "haus"])).toEqual([]);
  });

  it("ignores distractor word-bank chips that are not in the answer", () => {
    const ex = exercise({ type: "syntax_builder", target_answer: "Kaffee", word_bank: ["Kaffee", "Haus", "sehr"] });
    expect(exerciseWordIds(ex, ["kaffee", "haus"])).toEqual(["kaffee"]);
  });

  it("is case-insensitive and handles umlauts", () => {
    const ex = exercise({ target_answer: "LÖFFEL" });
    expect(exerciseWordIds(ex, ["löffel"])).toEqual(["löffel"]);
  });

  it("deduplicates repeated candidate ids", () => {
    const ex = exercise({ target_answer: "Kaffee" });
    expect(exerciseWordIds(ex, ["kaffee", "kaffee", "KAFFEE"])).toEqual(["kaffee"]);
  });

  it("reads dictation and literal-gloss German surfaces", () => {
    expect(exerciseWordIds(exercise({ type: "dictation", spoken: "das Haus" }), ["haus", "das"])).toEqual(["haus", "das"]);
    expect(exerciseWordIds(exercise({ type: "literal_gloss", german: "ich sehe den Traum" }), ["traum"])).toEqual(["traum"]);
  });
});