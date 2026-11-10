import { describe, it, expect } from "vitest";
import {
  computeLetterDiff,
  getLevenshteinDistance,
  evaluateAnswerAccuracy,
  evaluateBestOf,
} from "../lib/letter-diff";
import { gradeLessonAnswer } from "../lib/lesson-grading";

describe("Letter-by-Letter Diff", () => {
  it("marks exact matches as all correct", () => {
    const diff = computeLetterDiff("hoffen", "hoffen");
    expect(diff.isMatch).toBe(true);
    expect(diff.userChars.every((c) => c.status === "correct")).toBe(true);
  });

  it("identifies specific incorrect characters (e.g. hoppen vs hoffen)", () => {
    const diff = computeLetterDiff("hoppen", "hoffen");
    expect(diff.isMatch).toBe(false);
    expect(diff.userChars[0].status).toBe("correct"); // h
    expect(diff.userChars[1].status).toBe("correct"); // o
    expect(diff.userChars[2].status).toBe("incorrect"); // p instead of f
    expect(diff.userChars[3].status).toBe("incorrect"); // p instead of f
    expect(diff.userChars[4].status).toBe("correct"); // e
    expect(diff.userChars[5].status).toBe("correct"); // n
  });

  it("handles missing characters", () => {
    const diff = computeLetterDiff("hof", "hoffen");
    expect(diff.isMatch).toBe(false);
    expect(diff.expectedChars.some((c) => c.status === "missing")).toBe(true);
  });

  it("calculates Levenshtein distance accurately", () => {
    expect(getLevenshteinDistance("kitten", "sitting")).toBe(3);
    expect(getLevenshteinDistance("Wasser", "Wasser")).toBe(0);
    expect(getLevenshteinDistance("Wasser", "wassser")).toBe(2);
    expect(getLevenshteinDistance("wasser", "wassser")).toBe(1);
  });

  it("evaluates accuracy with three-tier feedback (exact, almost, incorrect)", () => {
    expect(evaluateAnswerAccuracy("Wasser", "Wasser")).toEqual({ accuracy: "exact" });
    expect(evaluateAnswerAccuracy("wasser", "Wasser").accuracy).toBe("almost");
    expect(evaluateAnswerAccuracy("wasser", "Wasser").reason).toBe("case");
    expect(evaluateAnswerAccuracy("Apfel", "Äpfel").accuracy).toBe("almost");
    expect(evaluateAnswerAccuracy("Apfel", "Äpfel").reason).toBe("umlaut");
    expect(evaluateAnswerAccuracy("waser", "Wasser").accuracy).toBe("almost");
    expect(evaluateAnswerAccuracy("waser", "Wasser").reason).toBe("typo");
    expect(evaluateAnswerAccuracy("water", "Wasser").accuracy).toBe("incorrect");

    // Infinitive stem checking (e.g. "trink" vs "trinken", "wander" vs "wandern")
    const stemResult = evaluateAnswerAccuracy("trink", "trinken");
    expect(stemResult.accuracy).toBe("almost");
    expect(stemResult.reason).toBe("infinitive");
    expect(stemResult.warningNote).toContain("infinitive ending \"-en\"");

    const conjugatedResult = evaluateAnswerAccuracy("trinke", "trinken");
    expect(conjugatedResult.accuracy).toBe("almost");
    expect(conjugatedResult.reason).toBe("infinitive");

    const nEndingResult = evaluateAnswerAccuracy("wander", "wandern");
    expect(nEndingResult.accuracy).toBe("almost");
    expect(nEndingResult.reason).toBe("infinitive");
    expect(nEndingResult.warningNote).toContain("infinitive ending \"-n\"");

    // Article omission / inclusion checking (e.g. "Wasser" vs "das Wasser", accusative/dative/negative)
    const articleResult = evaluateAnswerAccuracy("Wasser", "das Wasser");
    expect(articleResult.accuracy).toBe("almost");
    expect(articleResult.reason).toBe("article");
    expect(articleResult.warningNote).toContain("gender article");

    const accResult = evaluateAnswerAccuracy("Kaffee", "den Kaffee");
    expect(accResult.accuracy).toBe("almost");
    expect(accResult.reason).toBe("article");

    const datResult = evaluateAnswerAccuracy("dem Mann", "Mann");
    expect(datResult.accuracy).toBe("almost");
    expect(datResult.reason).toBe("article");

    const negResult = evaluateAnswerAccuracy("Problem", "kein Problem");
    expect(negResult.accuracy).toBe("almost");
    expect(negResult.reason).toBe("article");

    // Punctuation and full stop normalization (e.g. "Ich kann kommen." vs "Ich kann kommen")
    expect(evaluateAnswerAccuracy("Ich kann kommen", "Ich kann kommen.")).toEqual({ accuracy: "exact" });
    expect(evaluateAnswerAccuracy("Ich kann kommen.", "Ich kann kommen")).toEqual({ accuracy: "exact" });
    expect(evaluateAnswerAccuracy("Ein Glas Wasser bitte!", "Ein Glas Wasser bitte")).toEqual({ accuracy: "exact" });
  });

  it("applies capitalization tolerance as exact match", () => {
    expect(evaluateAnswerAccuracy("wasser", "Wasser", { capitalizationTolerance: true })).toEqual({
      accuracy: "exact",
    });
    // without the option the same input stays almost/case
    expect(evaluateAnswerAccuracy("wasser", "Wasser", {}).accuracy).toBe("almost");
  });

  it("applies umlaut tolerance to case-matching inputs as exact match", () => {
    // all-caps input is not case-correct, even though umlauts are tolerated
    const capsResult = evaluateAnswerAccuracy("STRASSE", "Straße", { umlautTolerance: true });
    expect(capsResult.accuracy).toBe("almost");
    expect(capsResult.reason).toBe("case");
    // standard capitalized substitution is exact
    expect(evaluateAnswerAccuracy("Strasse", "Straße", { umlautTolerance: true })).toEqual({ accuracy: "exact" });
    // lowercase input of a capitalized noun: umlaut tolerated but capitalization error remains
    const lowerResult = evaluateAnswerAccuracy("strasse", "Straße", { umlautTolerance: true });
    expect(lowerResult.accuracy).toBe("almost");
    expect(lowerResult.reason).toBe("case");
    // digraph expansions (ae/oe/ue/ss) count as umlaut substitutions
    expect(evaluateAnswerAccuracy("Kaese", "Käse", { umlautTolerance: true, capitalizationTolerance: true })).toEqual({
      accuracy: "exact",
    });
    // without tolerance, the digraph input stays almost/umlaut
    expect(evaluateAnswerAccuracy("Kaese", "Käse").accuracy).toBe("almost");
  });

  it("guards against huge pasted input", () => {
    const long = "a".repeat(250);
    expect(evaluateAnswerAccuracy(long, "Wasser").accuracy).toBe("incorrect");
    expect(getLevenshteinDistance("a".repeat(40), "b".repeat(10))).toBe(30);
  });
});

describe("Sentence punctuation and tile readings", () => {
  const opts = { umlautTolerance: false, capitalizationTolerance: false };

  it("ignores commas inside a sentence — tiles can never produce them", () => {
    expect(
      evaluateAnswerAccuracy("Einen Moment bitte die Kanne ist heiß", "Einen Moment, bitte, die Kanne ist heiß", opts)
    ).toEqual({ accuracy: "exact" });
    expect(
      evaluateAnswerAccuracy("Die Abfahrt ist früh die Ankunft ist spät", "Die Abfahrt ist früh, die Ankunft ist spät", opts).accuracy
    ).toBe("exact");
  });

  it("still accepts the commas when the learner types them", () => {
    expect(evaluateAnswerAccuracy("Das Buch, das ich lese", "Das Buch, das ich lese", opts).accuracy).toBe("exact");
  });

  it("still catches real mistakes in a comma sentence, and quotes the target with its commas", () => {
    const r = evaluateAnswerAccuracy("das Buch das ich lese", "Das Buch, das ich lese", opts);
    expect(r.accuracy).toBe("almost");
    expect(r.warningNote).toContain("Das Buch, das ich lese");
  });

  it("reads 'das' + 'Wass' + 'er' as one assembled word", () => {
    expect(evaluateAnswerAccuracy("das Wass er", "das Wasser", opts).accuracy).not.toBe("exact");
    const best = evaluateBestOf(["das Wass er", "das Wasser"], "das Wasser", opts);
    expect(best.result.accuracy).toBe("exact");
    expect(best.answer).toBe("das Wasser");
  });

  it("keeps the first reading when no reading is better", () => {
    const best = evaluateBestOf(["ich lernt", "ich lernt"], "ich lerne", opts);
    expect(best.answer).toBe("ich lernt");
  });
});


describe("LCS Alignment & Automatic Language-Aware Grading (de / es / fr)", () => {
  it("aligns characters via LCS so an early missing letter does not turn the rest of the sentence red", () => {
    const diff = computeLetterDiff("Ich kome morgen", "Ich komme morgen");
    expect(diff.isMatch).toBe(false);
    // Every character the user typed is actually in the target sentence in order
    expect(diff.userChars.every((c) => c.status === "correct")).toBe(true);
    // Exactly one character ("m") is marked missing in expectedChars
    const missing = diff.expectedChars.filter((c) => c.status === "missing");
    expect(missing).toHaveLength(1);
    expect(missing[0].char).toBe("m");
  });

  it("automatically applies Spanish article, infinitive, accent, and inverted punctuation rules when language is es", () => {
    // Leading inverted punctuation is stripped automatically in Spanish
    expect(evaluateAnswerAccuracy("Dónde está el tren", "¿Dónde está el tren?", { languageId: "es" })).toEqual({
      accuracy: "exact",
    });

    // Spanish article detection (el / la / los / las / un / una)
    const art = evaluateAnswerAccuracy("libro", "el libro", { languageId: "es" });
    expect(art.accuracy).toBe("almost");
    expect(art.reason).toBe("article");

    // Spanish infinitive detection (-ar / -er / -ir)
    const inf = evaluateAnswerAccuracy("habla", "hablar", { languageId: "es" });
    expect(inf.accuracy).toBe("almost");
    expect(inf.reason).toBe("infinitive");
    expect(inf.warningNote).toContain("-ar");

    // Spanish diacritic detection (á/é/í/ó/ú/ñ)
    const acc = evaluateAnswerAccuracy("nacion", "nación", { languageId: "es" });
    expect(acc.accuracy).toBe("almost");
    expect(acc.reason).toBe("umlaut");
    expect(acc.warningNote).toContain("Spanish");
  });

  it("automatically applies French article (including l' elision), infinitive, and accent rules when language is fr", () => {
    // French article detection including elided l'
    const art1 = evaluateAnswerAccuracy("train", "le train", { languageId: "fr" });
    expect(art1.accuracy).toBe("almost");
    expect(art1.reason).toBe("article");

    const art2 = evaluateAnswerAccuracy("eau", "l'eau", { languageId: "fr" });
    expect(art2.accuracy).toBe("almost");
    expect(art2.reason).toBe("article");

    // French infinitive detection (-er / -ir / -re)
    const inf = evaluateAnswerAccuracy("parle", "parler", { languageId: "fr" });
    expect(inf.accuracy).toBe("almost");
    expect(inf.reason).toBe("infinitive");
    expect(inf.warningNote).toContain("-er");

    // French accent / circumflex detection
    const acc = evaluateAnswerAccuracy("foret", "forêt", { languageId: "fr" });
    expect(acc.accuracy).toBe("almost");
    expect(acc.reason).toBe("umlaut");
    expect(acc.warningNote).toContain("French");
  });
});

describe("Sharp s is its own spelling law, not an umlaut", () => {
  it("labels ß vs ss as sharp-s and never as an umlaut", () => {
    const r = evaluateAnswerAccuracy("Strasse", "Straße");
    expect(r.accuracy).toBe("almost");
    expect(r.reason).toBe("sharp-s");
    expect(r.warningNote).toContain("ß");
    expect(r.warningNote).not.toMatch(/umlaut/i);

    // the reverse direction (a typed ß against an ss target) is the same law
    expect(evaluateAnswerAccuracy("Fuß", "Fuss").reason).toBe("sharp-s");
    expect(evaluateAnswerAccuracy("gross", "groß").reason).toBe("sharp-s");
  });

  it("leaves real umlaut errors on the umlaut path", () => {
    expect(evaluateAnswerAccuracy("Apfel", "Äpfel").reason).toBe("umlaut");
    expect(evaluateAnswerAccuracy("Kaese", "Käse").reason).toBe("umlaut");
    // a wrong umlaut AND a missing ß is still fundamentally an umlaut error
    expect(evaluateAnswerAccuracy("Fusse", "Füße").reason).toBe("umlaut");
  });

  it("keeps the ß/ss pair covered by lazy (umlaut-tolerance) mode", () => {
    expect(evaluateAnswerAccuracy("Strasse", "Straße", { umlautTolerance: true })).toEqual({
      accuracy: "exact",
    });
  });

  it("does not use the sharp-s label for Spanish or French", () => {
    expect(evaluateAnswerAccuracy("nacion", "nación", { languageId: "es" }).reason).toBe("umlaut");
    expect(evaluateAnswerAccuracy("foret", "forêt", { languageId: "fr" }).reason).toBe("umlaut");
  });
});

describe("Typographic single quotes", () => {
  it("grades a curly apostrophe and an ASCII apostrophe as the same answer", () => {
    // rich-text paste (U+2019) must not be reported as a typo
    expect(
      evaluateAnswerAccuracy("J'ai préparé le café", "J\u2019ai préparé le café", { languageId: "fr" })
    ).toEqual({ accuracy: "exact" });
    expect(
      evaluateAnswerAccuracy("J\u2019ai préparé le café", "J'ai préparé le café", { languageId: "fr" })
    ).toEqual({ accuracy: "exact" });
    // the left single quote folds too
    expect(
      evaluateAnswerAccuracy("J'ai préparé le café", "J\u2018ai préparé le café", { languageId: "fr" })
    ).toEqual({ accuracy: "exact" });
    // German and Spanish get the same folding
    expect(evaluateAnswerAccuracy("C'est la vie", "C\u2019est la vie", { languageId: "de" })).toEqual({
      accuracy: "exact",
    });
    expect(evaluateAnswerAccuracy("d'accord", "d\u2019accord", { languageId: "es" })).toEqual({
      accuracy: "exact",
    });
  });

  it("still catches a genuinely wrong apostrophe position", () => {
    const r = evaluateAnswerAccuracy("Jai préparé le café", "J'ai préparé le café", { languageId: "fr" });
    expect(r.accuracy).toBe("almost");
    expect(r.reason).toBe("typo");
  });

  it("folds curly double quotes and guillemets", () => {
    expect(evaluateAnswerAccuracy("\u201Cbonjour\u201D", '"bonjour"')).toEqual({ accuracy: "exact" });
    expect(evaluateAnswerAccuracy("\u00ABbonjour\u00BB", '"bonjour"', { languageId: "fr" })).toEqual({
      accuracy: "exact",
    });
  });
});

describe("Lesson answer acceptance", () => {
  it("requires the grammatical form rather than accepting a bare stem or omitted article", () => {
    expect(gradeLessonAnswer(["lern"], ["lernen"], { languageId: "de" }).result.accuracy).toBe("incorrect");
    expect(gradeLessonAnswer(["Haus"], ["kein Haus"], { languageId: "de" }).result.accuracy).toBe("incorrect");
  });

  it("permits a first-pass typo but requires its correction during reinforcement", () => {
    const options = { languageId: "de" };
    expect(gradeLessonAnswer(["bringem"], ["bringen"], options).result.accuracy).toBe("almost");
    expect(gradeLessonAnswer(["bringem"], ["bringen"], options, true).result.accuracy).toBe("incorrect");
    expect(gradeLessonAnswer(["bringen"], ["bringen"], options, true).result.accuracy).toBe("exact");
  });

  it("prefers an exact authored alternative over a near match to the canonical answer", () => {
    const graded = gradeLessonAnswer(["colour"], ["color", "colour"], { languageId: "en" });
    expect(graded.result.accuracy).toBe("exact");
    expect(graded.target).toBe("colour");
    expect(gradeLessonAnswer(["Zeit habe ich keine"], ["Ich habe keine Zeit", "Zeit habe ich keine"], { languageId: "de" }).result.accuracy).toBe("exact");
  });

  it("honours deliberate spelling tolerance during reinforcement", () => {
    expect(gradeLessonAnswer(["Kaese"], ["Käse"], { languageId: "de", umlautTolerance: true }, true).result.accuracy).toBe("exact");
    expect(gradeLessonAnswer(["Kaese"], ["Käse"], { languageId: "de" }, true).result.accuracy).toBe("incorrect");
  });
});
