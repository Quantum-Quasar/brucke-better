import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { diagnoseExerciseAttempt } from "../lib/error-diagnosis";
import { getLanguageContent } from "../data/language-content";
import type { ExerciseItem } from "../lib/types";

describe("diagnoseExerciseAttempt — category coverage across DE, FR, ES, NL", () => {
  describe("1. Sound Shift", () => {
    it("detects German consonant shift violations with category 'Sound Shift'", () => {
      const pShift = diagnoseExerciseAttempt({
        attempt: "hopen",
        expected: "hoffen",
        exerciseType: "derive",
        languageId: "de",
        shiftHint: "P → F/FF",
      });
      expect(pShift.category).toBe("Sound Shift");
      expect(pShift.slip).toContain("P");

      const tShift = diagnoseExerciseAttempt({
        attempt: "Watter",
        expected: "Wasser",
        exerciseType: "derive",
        languageId: "de",
      });
      expect(tShift.category).toBe("Sound Shift");
      expect(tShift.slip).toContain("T");

      const thShift = diagnoseExerciseAttempt({
        attempt: "threi",
        expected: "drei",
        exerciseType: "derive",
        languageId: "de",
      });
      expect(thShift.category).toBe("Sound Shift");
      expect(thShift.slip).toContain("TH");
    });

    it("detects French, Spanish, and Dutch sound shifts", () => {
      const fr = diagnoseExerciseAttempt({
        attempt: "forest",
        expected: "forêt",
        exerciseType: "derive",
        languageId: "fr",
      });
      expect(fr.category).toBe("Sound Shift");
      expect(fr.slip).toContain("S");

      const es = diagnoseExerciseAttempt({
        attempt: "nation",
        expected: "nación",
        exerciseType: "derive",
        languageId: "es",
      });
      expect(es.category).toBe("Sound Shift");
      expect(es.slip).toContain("-tion");

      const nl = diagnoseExerciseAttempt({
        attempt: "ship",
        expected: "schip",
        exerciseType: "derive",
        languageId: "nl",
      });
      expect(nl.category).toBe("Sound Shift");
      expect(nl.slip).toContain("sch");
    });
  });

  describe("2. Word Order", () => {
    it("diagnoses German V2 inversion, modal bracket, subordinate verb-final, and swapped words", () => {
      const v2 = diagnoseExerciseAttempt({
        attempt: "Morgen ich komme.",
        expected: "Morgen komme ich.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(v2.category).toBe("Word Order");
      expect(v2.cue).toContain("position 2");

      const bracket = diagnoseExerciseAttempt({
        attempt: "Ich kann kommen morgen.",
        expected: "Ich kann morgen kommen.",
        exerciseType: "syntax_builder",
        languageId: "de",
      });
      expect(bracket.category).toBe("Word Order");
      expect(bracket.cue).toContain("kommen");

      const sub = diagnoseExerciseAttempt({
        attempt: "weil ich habe keine Zeit",
        expected: "weil ich keine Zeit habe",
        exerciseType: "syntax_builder",
        languageId: "de",
      });
      expect(sub.category).toBe("Word Order");
      expect(sub.cue).toContain("habe");

      const swap = diagnoseExerciseAttempt({
        attempt: "Ich keine habe Zeit.",
        expected: "Ich habe keine Zeit.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(swap.category).toBe("Word Order");
      expect(swap.slip).toContain("swapped");
    });

    it("diagnoses Dutch V2, French pronoun order, and Spanish pronoun order", () => {
      const nl = diagnoseExerciseAttempt({
        attempt: "Vandaag ik werk.",
        expected: "Vandaag werk ik.",
        exerciseType: "transcribe",
        languageId: "nl",
      });
      expect(nl.category).toBe("Word Order");
      expect(nl.cue).toContain("position 2");

      const fr = diagnoseExerciseAttempt({
        attempt: "Tu veux le",
        expected: "Tu le veux",
        exerciseType: "transcribe",
        languageId: "fr",
      });
      expect(fr.category).toBe("Word Order");
      expect(fr.cue).toContain("le");

      const es = diagnoseExerciseAttempt({
        attempt: "quiero lo",
        expected: "lo quiero",
        exerciseType: "transcribe",
        languageId: "es",
      });
      expect(es.category).toBe("Word Order");
      expect(es.cue).toContain("lo");
    });
  });

  describe("3. Article & Case", () => {
    it("diagnoses German accusative/dative/gender article mistakes", () => {
      const acc = diagnoseExerciseAttempt({
        attempt: "Ich sehe der Hund.",
        expected: "Ich sehe den Hund.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(acc.category).toBe("Article & Case");
      expect(acc.slip).toBe("You wrote 'der', expected 'den'");
      expect(acc.cue.toLowerCase()).toContain("accusative");

      const dat = diagnoseExerciseAttempt({
        attempt: "mit den Freund",
        expected: "mit dem Freund",
        exerciseType: "syntax_builder",
        languageId: "de",
      });
      expect(dat.category).toBe("Article & Case");
      expect(dat.slip).toBe("You wrote 'den', expected 'dem'");
    });

    it("diagnoses French, Spanish, and Dutch article/gender mistakes", () => {
      const fr = diagnoseExerciseAttempt({
        attempt: "le maison",
        expected: "la maison",
        exerciseType: "derive",
        languageId: "fr",
      });
      expect(fr.category).toBe("Article & Case");
      expect(fr.slip).toBe("You wrote 'le', expected 'la'");

      const frElision = diagnoseExerciseAttempt({
        attempt: "la eau",
        expected: "l'eau",
        exerciseType: "derive",
        languageId: "fr",
      });
      expect(frElision.category).toBe("Article & Case");
      expect(frElision.cue).toContain("l'");

      const es = diagnoseExerciseAttempt({
        attempt: "el casa",
        expected: "la casa",
        exerciseType: "derive",
        languageId: "es",
      });
      expect(es.category).toBe("Article & Case");
      expect(es.slip).toBe("You wrote 'el', expected 'la'");

      const nl = diagnoseExerciseAttempt({
        attempt: "de huis",
        expected: "het huis",
        exerciseType: "derive",
        languageId: "nl",
      });
      expect(nl.category).toBe("Article & Case");
      expect(nl.slip).toBe("You wrote 'de', expected 'het'");
    });
  });

  describe("4. Negation", () => {
    it("diagnoses DE nicht/kein, NL niet/geen, FR ne...pas, and ES no", () => {
      const de1 = diagnoseExerciseAttempt({
        attempt: "Ich habe nicht Zeit.",
        expected: "Ich habe keine Zeit.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(de1.category).toBe("Negation");
      expect(de1.slip).toContain("nicht");
      expect(de1.slip).toContain("keine");

      const de2 = diagnoseExerciseAttempt({
        attempt: "Ich habe nicht eine Idee.",
        expected: "Ich habe keine Idee.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(de2.category).toBe("Negation");
      expect(de2.cue).toContain("keine");

      const nl = diagnoseExerciseAttempt({
        attempt: "Ik heb niet tijd.",
        expected: "Ik heb geen tijd.",
        exerciseType: "transcribe",
        languageId: "nl",
      });
      expect(nl.category).toBe("Negation");
      expect(nl.slip).toContain("niet");
      expect(nl.slip).toContain("geen");

      const fr = diagnoseExerciseAttempt({
        attempt: "Je comprends pas.",
        expected: "Je ne comprends pas.",
        exerciseType: "transcribe",
        languageId: "fr",
      });
      expect(fr.category).toBe("Negation");
      expect(fr.slip).toContain("ne");

      const es = diagnoseExerciseAttempt({
        attempt: "Quiero café.",
        expected: "No quiero café.",
        exerciseType: "transcribe",
        languageId: "es",
      });
      expect(es.category).toBe("Negation");
      expect(es.slip).toContain("no");
    });
  });

  describe("5. Capitalization", () => {
    it("diagnoses German noun capitalization without mislabeling as Sound Shift", () => {
      const de = diagnoseExerciseAttempt({
        attempt: "das haus",
        expected: "das Haus",
        exerciseType: "derive",
        languageId: "de",
      });
      expect(de.category).toBe("Capitalization");
      expect(de.slip).toContain("haus");
      expect(de.cue).toContain("Haus");
    });
  });

  describe("6. Spelling & Accents (Umlaut / Accent / Eszett)", () => {
    it("diagnoses German umlaut and Eszett slips without triggering ablaut Sound Shift", () => {
      const umlaut = diagnoseExerciseAttempt({
        attempt: "Apfel",
        expected: "Äpfel",
        exerciseType: "derive",
        languageId: "de",
      });
      expect(umlaut.category).toBe("Spelling & Accents");
      expect(umlaut.slip).toContain("umlaut");

      const eszett = diagnoseExerciseAttempt({
        attempt: "Strasse",
        expected: "Straße",
        exerciseType: "derive",
        languageId: "de",
      });
      expect(eszett.category).toBe("Spelling & Accents");
      expect(eszett.slip).toContain("ß");
    });

    it("diagnoses French and Spanish accent slips", () => {
      const fr = diagnoseExerciseAttempt({
        attempt: "universite",
        expected: "université",
        exerciseType: "derive",
        languageId: "fr",
      });
      expect(fr.category).toBe("Spelling & Accents");
      expect(fr.slip).toContain("accent");

      const es = diagnoseExerciseAttempt({
        attempt: "nacion",
        expected: "nación",
        exerciseType: "derive",
        languageId: "es",
      });
      expect(es.category).toBe("Spelling & Accents");
      expect(es.slip).toContain("accent");
    });
  });

  describe("7. Verb Form", () => {
    it("diagnoses auxiliary mismatch, wrong person, missing ge-, and verb ending slips", () => {
      const auxDe = diagnoseExerciseAttempt({
        attempt: "Ich habe gegangen.",
        expected: "Ich bin gegangen.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(auxDe.category).toBe("Verb Form");
      expect(auxDe.slip).toContain("habe");
      expect(auxDe.slip).toContain("bin");

      const personDe = diagnoseExerciseAttempt({
        attempt: "Du ist müde.",
        expected: "Du bist müde.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(personDe.category).toBe("Verb Form");

      const geDe = diagnoseExerciseAttempt({
        attempt: "Ich habe macht.",
        expected: "Ich habe gemacht.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(geDe.category).toBe("Verb Form");
      expect(geDe.slip).toContain("ge-");

      const endingDe = diagnoseExerciseAttempt({
        attempt: "Ich lernen Deutsch.",
        expected: "Ich lerne Deutsch.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(endingDe.category).toBe("Verb Form");

      const serEstar = diagnoseExerciseAttempt({
        attempt: "Estoy alto.",
        expected: "Soy alto.",
        exerciseType: "transcribe",
        languageId: "es",
      });
      expect(serEstar.category).toBe("Verb Form");
      expect(serEstar.cue).toContain("Ser");

      const avoirEtre = diagnoseExerciseAttempt({
        attempt: "J'ai allé.",
        expected: "Je suis allé.",
        exerciseType: "transcribe",
        languageId: "fr",
      });
      expect(avoirEtre.category).toBe("Verb Form");
    });
  });

  describe("8. Missing & Extra Words", () => {
    it("names exact missing and extra words", () => {
      const missing = diagnoseExerciseAttempt({
        attempt: "Ich keine Zeit.",
        expected: "Ich habe keine Zeit.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(missing.category).toBe("Missing Word");
      expect(missing.slip).toContain("habe");

      const extra = diagnoseExerciseAttempt({
        attempt: "Ich habe sehr keine Zeit.",
        expected: "Ich habe keine Zeit.",
        exerciseType: "transcribe",
        languageId: "de",
      });
      expect(extra.category).toBe("Extra Word");
      expect(extra.slip).toContain("sehr");
    });
  });

  describe("9. Authored diagnosis enrichment & 10. Small typo & 11. Contextual fallback", () => {
    it("preserves authored diagnosis and enriches missing category", () => {
      const res = diagnoseExerciseAttempt({
        attempt: "Ich bin müde",
        expected: "Ich fühle mich gut",
        exerciseType: "transcribe",
        languageId: "de",
        authoredDiagnosis: {
          slip: "dropped the reflexive pronoun mich",
          cue: "sich fühlen pairs with a reflexive pronoun: ich → mich.",
        },
      });
      expect(res.slip).toBe("dropped the reflexive pronoun mich");
      expect(res.cue).toContain("mich");
      expect(res.category).toBe("Pronouns");
    });

    it("detects small single-word spelling slips", () => {
      const typo = diagnoseExerciseAttempt({
        attempt: "Bruderx",
        expected: "Bruder",
        exerciseType: "derive",
        languageId: "de",
      });
      expect(typo.category).toBe("Spelling");
      expect(typo.slip).toBe("close spelling slip");
    });

    it("produces specific contextual feedback for MCQ / shift_select / literal_gloss / reverse_cognate", () => {
      const mcq = diagnoseExerciseAttempt({
        attempt: "gift",
        expected: "poison",
        exerciseType: "shift_select",
        languageId: "de",
        explanation: "Gift is a famous false friend: in German it means poison, not a present.",
      });
      expect(mcq.category).toBe("False Friend");
      expect(mcq.slip).toContain("gift");
      expect(mcq.cue).toContain("poison");

      const gloss = diagnoseExerciseAttempt({
        attempt: "I have no time",
        expected: "I have none time",
        exerciseType: "literal_gloss",
        languageId: "de",
        explanation: "German keine sits directly before the noun like 'no/none'.",
      });
      expect(gloss.category).toBeTruthy();
      expect(gloss.category).not.toBe("Consonant Shift");
      expect(gloss.category).not.toBe("Sound Shift");
    });
  });
});

function buildWrongAttemptForExercise(ex: ExerciseItem): string {
  const target = ex.target_answer.trim();
  if (ex.options && ex.options.length > 0) {
    const distractor = ex.options.find((opt) => opt.trim().toLowerCase() !== target.toLowerCase());
    if (distractor) return distractor;
  }
  if (ex.traps && ex.traps.length > 0) {
    return ex.traps[0];
  }
  if (ex.matching_pairs && ex.matching_pairs.length >= 2) {
    return ex.matching_pairs[1].german;
  }
  // Fallback wrong attempt guaranteed to differ from target without triggering consonant shift
  return "xyz_wrong_answer";
}

describe("100% coverage across all 2,650 exercises (DE, FR, ES, NL)", () => {
  const expectedCounts: Record<string, number> = {
    de: 895,
    fr: 665,
    es: 665,
    nl: 425,
  };

  it("verifies exact exercise counts across all 4 languages total 2,650", () => {
    let total = 0;
    for (const [langId, expectedCount] of Object.entries(expectedCounts)) {
      const { lessons } = getLanguageContent(langId);
      const count = lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0);
      expect(count).toBe(expectedCount);
      total += count;
    }
    expect(total).toBe(2650);
  });

  for (const langId of ["de", "fr", "es", "nl"] as const) {
    it(`produces a truthful, non-empty { slip, cue, category } for 100% of ${langId.toUpperCase()} exercises and never labels non-shift exercises 'Consonant Shift'`, () => {
      const { lessons } = getLanguageContent(langId);
      const exercises = lessons.flatMap((l) => l.exercises);
      expect(exercises.length).toBe(expectedCounts[langId]);

      for (const ex of exercises) {
        const wrongAttempt = buildWrongAttemptForExercise(ex);
        const diagnosis = diagnoseExerciseAttempt({
          attempt: wrongAttempt,
          expected: ex.target_answer,
          acceptedAnswers: ex.accepted_answers,
          exerciseType: ex.type,
          languageId: langId,
          shiftHint: ex.shift_hint,
          authoredDiagnosis: ex.diagnosis,
          explanation: ex.explanation,
          prompt: ex.prompt,
          englishPrompt: ex.idea || ex.english_hint || ex.meaning,
          wordBank: ex.word_bank,
        });

        expect(diagnosis.slip.trim().length, `${langId}:${ex.id} slip`).toBeGreaterThan(0);
        expect(diagnosis.cue.trim().length, `${langId}:${ex.id} cue`).toBeGreaterThan(0);
        expect(diagnosis.category?.trim().length ?? 0, `${langId}:${ex.id} category`).toBeGreaterThan(0);
        expect(diagnosis.category, `${langId}:${ex.id} must never say Consonant Shift`).not.toBe("Consonant Shift");

        // On non-shift grammar exercises with a generic wrong attempt, never label as Sound Shift
        if (!ex.shift_hint && wrongAttempt === "xyz_wrong_answer") {
          expect(
            diagnosis.category,
            `${langId}:${ex.id} non-shift exercise must not be labeled Sound Shift`
          ).not.toBe("Sound Shift");
        }
      }
    });
  }
});

describe("ErrorFeedbackSheet false-labeling regression guard", () => {
  it("never falls back to hardcoded 'Consonant Shift' or unconditional 'shift note:'", () => {
    const sheetPath = path.resolve(__dirname, "../components/lesson/ErrorFeedbackSheet.tsx");
    const source = fs.readFileSync(sheetPath, "utf8");

    expect(source).not.toContain('"Consonant Shift"');
    expect(source).not.toContain("'Consonant Shift'");
    expect(source).toContain("shiftRule || diagnosis?.category");
    expect(source).toContain('shiftRule ? "shift note:" : "note:"');
  });
});
