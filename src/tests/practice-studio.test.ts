import { describe, expect, it } from "vitest";
import { compendium } from "@/data/compendium";
import { LESSONS } from "@/data/lessons";
import {
  buildShadowingPhrases,
  evaluateDialogueTypedTurn,
  getShuffledDialogueOptions,
  scoreShadowingAttempt,
  SITUATIONAL_DIALOGUES,
} from "@/lib/practice-studio";
import {
  articlesForGender,
  buildGenderLabDeck,
  detectGenderSuffixRule,
  GENDER_SUFFIX_RULES,
  generateWeeklyMixedTest,
} from "@/lib/practice-quizzes";
import type { LessonIndexEntry } from "@/lib/types";

const SAMPLE_LESSON_INDEX: LessonIndexEntry[] = LESSONS.filter(
  (l) => l.id >= 1 && l.id <= 12
).map((l) => ({
  id: l.id,
  slug: l.slug,
  title: l.title,
  subtitle: l.subtitle,
  phase: l.phase,
  shift_categories: l.shift_categories,
  word_ids: l.word_ids,
  exerciseCount: l.exercises.length,
  table_word_ids: l.table_word_ids,
  summary: {
    use_example: l.summary.use_example,
    takeaway: l.summary.takeaway,
  },
}));

describe("practice-studio", () => {
  describe("shadowing (#44)", () => {
    it("falls back to starter phrases when no lessons are completed and uses completed lessons when available", () => {
      const starter = buildShadowingPhrases(SAMPLE_LESSON_INDEX, [], "de");
      expect(starter.length).toBeGreaterThanOrEqual(4);

      const completed = buildShadowingPhrases(SAMPLE_LESSON_INDEX, [1, 2], "de");
      expect(completed.length).toBeGreaterThanOrEqual(1);
      expect(completed[0].id).toMatch(/^lesson-/);
    });

    it("scores shadowing attempts with lenient word-overlap feedback and preserves umlauts/casing", () => {
      const exact = scoreShadowingAttempt(
        "Ich kann morgen früh kommen",
        "Ich kann morgen früh kommen."
      );
      expect(exact.overlapPercent).toBe(100);
      expect(exact.tier).toBe("great");

      const partial = scoreShadowingAttempt("Ich kann kommen", "Ich kann morgen früh kommen");
      expect(partial.overlapPercent).toBe(60);
      expect(partial.tier).toBe("good");
      expect(partial.missedWords).toContain("morgen");
      expect(partial.missedWords).toContain("früh");
      expect(partial.missedWords).not.toContain("fruh");

      const strasse = scoreShadowingAttempt("Wir gehen", "Wir gehen durch die Straße");
      expect(strasse.missedWords).toContain("Straße");
      expect(strasse.missedWords).not.toContain("strasse");
    });
  });

  describe("situational dialogues (#45)", () => {
    it("provides 5 multi-turn German dialogues with 6–8 lines and valid learner turns", () => {
      expect(SITUATIONAL_DIALOGUES.length).toBe(5);
      for (const dlg of SITUATIONAL_DIALOGUES) {
        expect(dlg.turns.length).toBeGreaterThanOrEqual(6);
        expect(dlg.turns.length).toBeLessThanOrEqual(8);
        const learnerTurns = dlg.turns.filter((t) => t.speaker === "learner");
        expect(learnerTurns.length).toBeGreaterThanOrEqual(3);
        for (const turn of learnerTurns) {
          expect(turn.prompt).toBeTruthy();
          expect((turn.options ?? []).length).toBeGreaterThanOrEqual(2);
          expect((turn.options ?? []).filter((o) => o.isBest)).toHaveLength(1);
        }
      }
    });

    it("accepts natural typed replies and rejects negations, wrong question words, and off-topic input", () => {
      const cafeTurn = SITUATIONAL_DIALOGUES[0].turns.find((t) => t.speaker === "learner")!;
      const good = evaluateDialogueTypedTurn("Einen Kaffee, bitte", cafeTurn);
      expect(good.accepted).toBe(true);

      const negated = evaluateDialogueTypedTurn("Ich möchte keinen Kaffee, bitte", cafeTurn);
      expect(negated.accepted).toBe(false);

      const offTopic = evaluateDialogueTypedTurn("Guten Abend Bahnhof", cafeTurn);
      expect(offTopic.accepted).toBe(false);

      const dirDialogue = SITUATIONAL_DIALOGUES.find((d) => d.id === "directions")!;
      const dirTurn = dirDialogue.turns.find((t) => t.speaker === "learner")!;
      const wrongQuestionWord = evaluateDialogueTypedTurn(
        "Entschuldigung, wer ist das Museum?",
        dirTurn
      );
      expect(wrongQuestionWord.accepted).toBe(false);
    });

    it("deterministically shuffles dialogue options so isBest is not always at index 0", () => {
      const learnerTurns = SITUATIONAL_DIALOGUES.flatMap((d) =>
        d.turns.filter((t) => t.speaker === "learner")
      );
      const bestIndices = learnerTurns.map((turn) =>
        getShuffledDialogueOptions(turn).findIndex((opt) => opt.isBest)
      );
      expect(bestIndices.some((idx) => idx > 0)).toBe(true);
      // Deterministic across repeated calls
      expect(getShuffledDialogueOptions(learnerTurns[0])).toEqual(
        getShuffledDialogueOptions(learnerTurns[0])
      );
    });
  });

  describe("weekly mixed test (#47)", () => {
    it("returns language-accurate article options (Spanish la -> el/la, French la -> le/la)", () => {
      expect(articlesForGender("la", "es")).toEqual(["el", "la"]);
      expect(articlesForGender("el", "es")).toEqual(["el", "la"]);
      expect(articlesForGender("la", "fr")).toEqual(["le", "la"]);
      expect(articlesForGender("het", "nl")).toEqual(["de", "het"]);
      expect(articlesForGender("das", "de")).toEqual(["der", "die", "das"]);
    });

    it("generates a 10-question mixed quiz from starter topics when no lessons are completed", () => {
      const res = generateWeeklyMixedTest(compendium, SAMPLE_LESSON_INDEX, [], {
        count: 10,
        seed: 42,
        languageId: "de",
      });
      expect(res.usedStarterTopics).toBe(true);
      expect(res.questions).toHaveLength(10);
      for (const q of res.questions) {
        expect(q.options).toContain(q.correctAnswer);
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.wordId.length).toBeGreaterThan(0);
        if (q.kind === "english-to-target") {
          expect(q.spokenText).toBe("");
        }
        if (q.kind === "article") {
          expect(q.spokenText.startsWith(`${q.correctAnswer} `)).toBe(false);
        }
      }
    });

    it("draws from completed lessons when available", () => {
      const res = generateWeeklyMixedTest(compendium, SAMPLE_LESSON_INDEX, [1, 2, 3], {
        count: 10,
        seed: 7,
        languageId: "de",
      });
      expect(res.usedStarterTopics).toBe(false);
      expect(res.questions).toHaveLength(10);
    });
  });

  describe("gender-guess lab (#48)", () => {
    it("identifies suffix heuristics across feminine, neuter, and masculine endings", () => {
      expect(detectGenderSuffixRule("Rechnung")?.article).toBe("die");
      expect(detectGenderSuffixRule("Freiheit")?.article).toBe("die");
      expect(detectGenderSuffixRule("Möglichkeit")?.article).toBe("die");
      expect(detectGenderSuffixRule("Freundschaft")?.article).toBe("die");
      expect(detectGenderSuffixRule("Station")?.article).toBe("die");
      expect(detectGenderSuffixRule("Mädchen")?.article).toBe("das");
      expect(detectGenderSuffixRule("Büchlein")?.article).toBe("das");
      expect(detectGenderSuffixRule("Frühling")?.article).toBe("der");
      expect(detectGenderSuffixRule("Lehrer")?.article).toBe("der");
      expect(detectGenderSuffixRule("Tourismus")?.article).toBe("der");
    });

    it("builds a consistent, shuffled Gender Lab deck covering all suffix rules", () => {
      const deck = buildGenderLabDeck(compendium);
      expect(deck.length).toBeGreaterThanOrEqual(30);
      for (const item of deck) {
        expect(item.article).toBe(item.rule.article);
        expect(item.noun.toLowerCase().endsWith(item.rule.suffix)).toBe(true);
      }
      const coveredSuffixes = new Set(deck.map((d) => d.rule.suffix));
      for (const rule of GENDER_SUFFIX_RULES) {
        expect(coveredSuffixes.has(rule.suffix)).toBe(true);
      }
      // Deck is shuffled rather than 16 consecutive `die` cards at the front
      const firstEightArticles = new Set(deck.slice(0, 8).map((d) => d.article));
      expect(firstEightArticles.size).toBeGreaterThanOrEqual(2);
    });
  });
});
