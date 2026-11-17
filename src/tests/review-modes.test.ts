import { getSentenceEntities, getArticleEntities } from "./word-entity-fixtures";
import { DECK_CAPABILITIES, getAtlasFamilyWordIds, resolveCardReviewMode } from "@/lib/review-decks";
import { describe, it, expect } from "vitest";
import { generateMCQOptions, generateWordTiles, shuffleArray } from "@/lib/review-modes";
import { compendium as data } from "@/data/compendium";
import type { WordEntity } from "@/lib/types";
import { buildWordEntityMaps } from "@/lib/word-entities-core";
import modalLesson from "@/data/lessons/2";
import modalFollowUp from "@/data/lessons/202";
import { gradeLessonAnswer } from "@/lib/lesson-grading";
const words = data.wordList;

describe("Review Modes Engine & Question Generators", () => {
  it("generates 4 distinct MCQ options including the target word", () => {
    const target = words.find((w) => w.target_word === "Wasser") || words[0];
    const options = generateMCQOptions(target, words, 4);

    expect(options).toHaveLength(4);
    expect(options).toContain(target.target_word);

    // All options must be unique
    const unique = new Set(options);
    expect(unique.size).toBe(4);
  });

  it("prioritizes sound shift family words for MCQ distractors", () => {
    // Find a word with shift 't_to_s_ss_z' (water -> Wasser)
    const target = words.find((w) => w.sound_shift_ids.includes("t_to_s_ss_z"));
    expect(target).toBeDefined();
    if (!target) return;

    const options = generateMCQOptions(target, words, 4);
    expect(options).toContain(target.target_word);
    expect(options.length).toBe(4);
  });

  it("generates valid tiles that can assemble the target word", () => {
    const target = words.find((w) => w.target_word === "lernen") || words[0];
    const { tiles, targetChunks, targetAnswer } = generateWordTiles(target, words);

    expect(targetAnswer).toBe(target.target_word);
    expect(tiles.length).toBeGreaterThan(targetChunks.length); // includes distractors

    // Every required chunk must be present in the tiles array
    for (const chunk of targetChunks) {
      expect(tiles).toContain(chunk);
    }

    // Reassembling the targetChunks must equal targetAnswer
    expect(targetChunks.join("")).toBe(targetAnswer);
  });

  it("handles short words cleanly in tile builder", () => {
    const shortWord: WordEntity = {
      id: "gut",
      target_word: "gut",
      english_cognate: "good",
      english_meaning: "good",
      gender: null,
      ipa: "[ɡuːt]",
      sound_shift_ids: [],
      shift_rule: "direct",
      context_phrase: "Alles gut",
      context_translation: "All good",
      etymology_derivation: "Direct cognate",
    };

    const { tiles, targetChunks, targetAnswer } = generateWordTiles(shortWord, words);
    expect(targetAnswer).toBe("gut");
    expect(targetChunks.join("")).toBe("gut");
    expect(tiles.length).toBeGreaterThanOrEqual(3);
  });

  it("shuffles arrays without losing elements", () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    const shuffled = shuffleArray(items);
    expect(shuffled).toHaveLength(items.length);
    expect(shuffled.sort()).toEqual(items.sort());
  });
});


describe("Sentence-Level SRS Deck across German, French, and Spanish", () => {
  it("synthesizes 133 sentence entities for German, French, and Spanish", () => {
    const deSentences = getSentenceEntities("de");
    const frSentences = getSentenceEntities("fr");
    const esSentences = getSentenceEntities("es");
    expect(deSentences.length).toBeGreaterThanOrEqual(120);
    expect(frSentences.length).toBe(133);
    expect(esSentences.length).toBe(133);
  });

  it("uses only authored invalid sentence choices, never shuffled or unrelated answers", () => {
    const sentence = getSentenceEntities("de").find((s) => s.id === "sentence_2")!;
    const options = generateMCQOptions(sentence, getSentenceEntities("de"));
    expect(new Set(options)).toEqual(new Set([
      sentence.target_word,
      ...modalLesson.summary.use_example.mcq_distractors!,
    ]));
    expect(options).not.toContain("Morgen kann ich kommen");
    expect(options).not.toContain("Ich kann kommen morgen");
    expect(sentence.supportedModes).toContain("mcq");
  });

  it("keeps sentences without vetted foils usable in existing non-MCQ modes", () => {
    for (const language of ["de", "fr", "es", "nl"]) {
      const sentence = getSentenceEntities(language).find((s) => !s.customMcqOptions)!;
      expect(sentence.supportedModes).toEqual(["flashcard", "tiles", "typing"]);
      expect(generateMCQOptions(sentence, words)).toEqual([]);
      expect(resolveCardReviewMode(sentence, "mcq", "sentences")).toBe("flashcard");
      expect(resolveCardReviewMode(sentence, "typing", "everything")).toBe("typing");
      expect(generateWordTiles(sentence).tiles.length).toBeGreaterThan(0);
    }
  });

  it("carries only alternatives explicitly authored for the summary's exact meaning", () => {
    const maps = buildWordEntityMaps("de", data, [modalLesson, modalFollowUp]);
    expect(maps.entities.sentence_2.accepted_answers).toEqual(["Morgen kann ich kommen"]);
    expect(maps.entities.sentence_202.accepted_answers).toEqual(["Morgen will ich Deutsch lernen"]);
    expect(maps.entities.sentence_202.accepted_answers).not.toContain("Der Kuchen kann teuer sein");
    const withoutSummaryAlternatives = {
      ...modalLesson,
      summary: { ...modalLesson.summary, use_example: { german: "Ich kann morgen kommen.", english: "I can come tomorrow." } },
    };
    expect(buildWordEntityMaps("de", data, [withoutSummaryAlternatives]).sentences[0].accepted_answers).toBeUndefined();
  });

  it("excludes canonical and accepted sentences from an authored foil list", () => {
    const lesson = {
      ...modalLesson,
      summary: {
        ...modalLesson.summary,
        use_example: {
          ...modalLesson.summary.use_example,
          mcq_distractors: ["Ich kann morgen kommen.", "Morgen kann ich kommen!", "  "],
        },
      },
    };
    const sentence = buildWordEntityMaps("de", data, [lesson]).sentences[0];
    expect(sentence.supportedModes).not.toContain("mcq");
    expect(generateMCQOptions(sentence, words)).toEqual([]);
  });

  it("grades authored alternatives for review typing and the same words assembled as tiles", () => {
    const sentence = getSentenceEntities("de").find((s) => s.id === "sentence_2")!;
    const targets = [sentence.target_word, ...(sentence.accepted_answers ?? [])];
    const options = { languageId: "de", umlautTolerance: false, capitalizationTolerance: false };
    expect(gradeLessonAnswer(["Morgen kann ich kommen."], targets, options).result.accuracy).toBe("exact");
    const { tiles } = generateWordTiles(sentence);
    const selected = ["morgen", "kann", "ich", "kommen"].map((word) => {
      const index = tiles.findIndex((tile) => tile.toLowerCase() === word);
      expect(index).toBeGreaterThanOrEqual(0);
      return tiles.splice(index, 1)[0];
    });
    const result = gradeLessonAnswer([selected.join(" ")], targets, options).result;
    expect(["exact", "almost"]).toContain(result.accuracy);
    if (result.accuracy === "almost") expect(result.reason).toBe("case");
    expect(gradeLessonAnswer(["Ich morgen kann kommen"], targets, options).result.accuracy).toBe("incorrect");
    expect(gradeLessonAnswer(["Ich kann morgen kommt"], targets, options).result.accuracy).toBe("incorrect");
  });

  it("splits sentence SRS entities into word-level tiles rather than character fragments", () => {
    const frSentence = getSentenceEntities("fr")[0];
    const { tiles, targetChunks, targetAnswer } = generateWordTiles(frSentence, words);
    expect(targetChunks.length).toBeGreaterThanOrEqual(2);
    expect(targetChunks.join(" ")).toBe(targetAnswer.replace(/,/g, ""));
    for (const chunk of targetChunks) {
      expect(tiles).toContain(chunk);
    }
  });
});


describe("Article & Gender MCQ Deck and Capability-Driven Review Modes", () => {
  it("synthesizes MCQ-only article entities across German, French, and Spanish with 4 article options", () => {
    for (const lang of ["de", "fr", "es"] as const) {
      const articles = getArticleEntities(lang);
      expect(articles.length).toBeGreaterThan(50);
      const sample = articles[0];
      expect(sample.supportedModes).toEqual(["mcq"]);
      const opts = generateMCQOptions(sample, words, 4);
      expect(opts).toHaveLength(4);
      expect(opts).toContain(sample.target_word);
    }
  });

  // Regression: the correct article used to be written into base[base.length - 1]
  // and returned unshuffled, so every card's answer sat at one predictable slot
  // ("der,die,das,der Arm" for the same-gender cards). The seeded RNG keeps this
  // deterministic: for each single article the position must still VARY across
  // calls, which a fixed slot can never satisfy.
  it("never pins the correct article to a fixed option index", () => {
    const originalRandom = Math.random;
    let seed = 42;
    Math.random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    try {
      for (const lang of ["de", "fr", "es"] as const) {
        for (const article of getArticleEntities(lang).slice(0, 20)) {
          const positions = new Set<number>();
          for (let call = 0; call < 12; call++) {
            const opts = generateMCQOptions(article, words, 4);
            expect(opts).toHaveLength(4);
            expect(opts).toContain(article.target_word);
            expect(new Set(opts).size).toBe(opts.length);
            positions.add(opts.indexOf(article.target_word));
          }
          // a fixed answer slot (the old bug) collapses this to exactly one value
          expect(positions.size).toBeGreaterThan(1);
        }
      }
    } finally {
      Math.random = originalRandom;
    }
  });

  it("enforces MCQ mode for article cards even when reviewing Everything in typing or tiles mode", () => {
    const deArticle = getArticleEntities("de")[0];
    expect(DECK_CAPABILITIES.articles.supportedModes).toEqual(["mcq"]);
    expect(resolveCardReviewMode(deArticle, "typing", "everything")).toBe("mcq");
    expect(resolveCardReviewMode(deArticle, "tiles", "due")).toBe("mcq");
  });
});

// Regression for the "unshifted" family deck: it only exists in the atlas, not
// in `data.shifts`, so resolving a deck through `data.shifts[id]` made its 844
// German words unreachable (0 words in scope, disabled button).
describe("Shift-family deck ids resolve through the atlas, including the virtual unshifted family", () => {
  it("covers the whole unshifted layer instead of returning an empty deck", () => {
    expect(data.shifts["unshifted"]).toBeUndefined();
    const unshifted = getAtlasFamilyWordIds(data, "unshifted");
    expect(unshifted.length).toBeGreaterThan(500);
    expect(new Set(unshifted).size).toBe(unshifted.length);
  });

  it("resolves every authored family and 'all' to non-empty, de-duplicated ids", () => {
    for (const family of Object.values(data.shifts)) {
      const ids = getAtlasFamilyWordIds(data, family.id);
      expect(ids.length).toBeGreaterThan(0);
      expect(new Set(ids).size).toBe(ids.length);
    }
    const all = getAtlasFamilyWordIds(data, "all");
    expect(new Set(all).size).toBe(all.length);
    expect(all.length).toBe(data.wordList.length);
  });
});
