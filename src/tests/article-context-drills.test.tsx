import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ReviewSessionCard } from "@/components/review/ReviewSessionCard";
import type { ReviewController } from "@/components/review/use-review-controller";
import germanCompendium from "@/data/compendium.json";
import { dutchCompendium } from "@/data/dutch/compendium-nl";
import { frenchCompendium } from "@/data/french/compendium-fr";
import { getLanguageDefinition } from "@/data/languages";
import { DEFAULT_SETTINGS } from "@/data/settings";
import { generateMCQOptions } from "@/lib/review-modes";
import { createInitialCard } from "@/lib/srs";
import type { CompendiumData, WordEntity } from "@/lib/types";
import { buildArticleContextCloze, buildWordEntityMaps } from "@/lib/word-entities-core";

function renderArticleCard(entity: WordEntity, languageId = "de", isRevealed = false) {
  const controller: Partial<ReviewController> = {
    currentCard: createInitialCard(entity.id),
    currentWord: entity,
    currentIndex: 0,
    sessionCards: [createInitialCard(entity.id)],
    sessionRef: { current: null },
    supportedModesForCard: ["mcq"],
    effectiveReviewMode: "mcq",
    recognitionReason: null,
    settings: DEFAULT_SETTINGS,
    language: getLanguageDefinition(languageId),
    wordMastery: {},
    isRevealed,
    currentCloze: null,
    mcqOptions: entity.customMcqOptions ?? [],
    selectedOption: null,
    handleSelectMCQ: vi.fn(),
    inputGuess: "",
    currentFeedbackNote: null,
    canGoBack: false,
    canGoForward: false,
    setIsRevealed: vi.fn(),
    handleGrade: vi.fn(),
  };
  return renderToStaticMarkup(<ReviewSessionCard controller={controller as ReviewController} />);
}

describe("Sentence-context article cloze builder", () => {
  it("blanks nominative articles at sentence start and mid-sentence", () => {
    expect(buildArticleContextCloze("Der Hund ist groß.", "Hund", "der", "de")).toEqual({
      cloze: "___ Hund ist groß.",
      article: "der",
    });
    expect(buildArticleContextCloze("Das Gras ist grün.", "Gras", "das", "de")).toEqual({
      cloze: "___ Gras ist grün.",
      article: "das",
    });
    expect(buildArticleContextCloze("Die Sonne scheint.", "Sonne", "die", "de")).toEqual({
      cloze: "___ Sonne scheint.",
      article: "die",
    });
  });

  it("blanks German masculine accusative 'den' and returns 'den' as the graded answer", () => {
    expect(buildArticleContextCloze("Ich sehe den Hund.", "Hund", "der", "de")).toEqual({
      cloze: "Ich sehe ___ Hund.",
      article: "den",
    });
    expect(buildArticleContextCloze("Ich höre den Donner.", "Donner", "der", "de")).toEqual({
      cloze: "Ich höre ___ Donner.",
      article: "den",
    });
  });

  it("blanks German articles separated from the noun by a single lowercase adjective", () => {
    expect(buildArticleContextCloze("Der goldene Ring ist schön.", "Ring", "der", "de")).toEqual({
      cloze: "___ goldene Ring ist schön.",
      article: "der",
    });
    expect(buildArticleContextCloze("Die weiße Taube fliegt.", "Taube", "die", "de")).toEqual({
      cloze: "___ weiße Taube fliegt.",
      article: "die",
    });
  });

  it("handles French elided l' cleanly", () => {
    expect(buildArticleContextCloze("L'hôtel est vieux.", "hôtel", "le", "fr")).toEqual({
      cloze: "___ hôtel est vieux.",
      article: "l'",
    });
    expect(buildArticleContextCloze("Merci pour l'invitation.", "invitation", "la", "fr")).toEqual({
      cloze: "Merci pour ___ invitation.",
      article: "l'",
    });
  });

  it("returns null for possessives, indefinites, dative/plural mismatches, and dummy subjects", () => {
    expect(buildArticleContextCloze("Mein Arm tut weh.", "Arm", "der", "de")).toBeNull();
    expect(buildArticleContextCloze("Ein Glas Wasser, bitte.", "Glas", "das", "de")).toBeNull();
    expect(buildArticleContextCloze("Der Teller steht auf dem Tisch.", "Tisch", "der", "de")).toBeNull();
    expect(buildArticleContextCloze("Ich drücke die Daumen.", "Daumen", "der", "de")).toBeNull();
    expect(buildArticleContextCloze("Das Essen brät in der Pfanne.", "Pfanne", "die", "de")).toBeNull();
    expect(buildArticleContextCloze("Vandaag is het maandag.", "maandag", "de", "nl")).toBeNull();
  });
});

describe("Article review cards in buildWordEntityMaps & ReviewSessionCard", () => {
  const deMaps = buildWordEntityMaps("de", germanCompendium as unknown as CompendiumData, []);
  const frMaps = buildWordEntityMaps("fr", frenchCompendium, []);
  const nlMaps = buildWordEntityMaps("nl", dutchCompendium, []);

  it("synthesizes sentence-context clozes for real German nouns and grades accusative 'den' accurately", () => {
    const wolf = deMaps.entities.article_wolf;
    expect(wolf?.articleCloze).toBe("___ Wolf lebt im Wald.");
    expect(wolf?.target_word).toBe("der");
    expect(generateMCQOptions(wolf!, [], 4)).toContain("der");

    const donner = deMaps.entities.article_donner;
    expect(donner?.articleCloze).toBe("Ich höre ___ Donner.");
    expect(donner?.target_word).toBe("den");
    const donnerOpts = generateMCQOptions(donner!, [], 4);
    expect(donnerOpts).toContain("den");
    expect(donnerOpts).toContain("der");
    // Grading compares option.toLowerCase() === entity.target_word.toLowerCase()
    expect("den".toLowerCase() === donner!.target_word.toLowerCase()).toBe(true);
    expect("der".toLowerCase() === donner!.target_word.toLowerCase()).toBe(false);
  });

  it("falls back cleanly when a noun's context_phrase lacks a matching article", () => {
    const arm = deMaps.entities.article_arm;
    expect(arm?.articleCloze).toBeUndefined();
    expect(arm?.target_word).toBe("der");

    const tisch = deMaps.entities.article_tisch;
    expect(tisch?.articleCloze).toBeUndefined();
    expect(tisch?.target_word).toBe("der");

    // Dutch dummy subject "Vandaag is het maandag." must not blank "het" for de-noun maandag
    const maandag = nlMaps.entities.article_maandag;
    if (maandag) {
      expect(maandag.articleCloze).toBeUndefined();
      expect(maandag.target_word).toBe("de");
    }
  });

  it("renders sentence-context cloze and English translation in ReviewSessionCard, with bare-noun fallback", () => {
    const donner = deMaps.entities.article_donner!;
    const clozeHtml = renderArticleCard(donner, "de");
    expect(clozeHtml).toContain("Ich höre ");
    expect(clozeHtml).toContain(" Donner.");
    expect(clozeHtml).toContain("missing article");
    expect(clozeHtml).toContain(donner.context_translation);

    const arm = deMaps.entities.article_arm!;
    const fallbackHtml = renderArticleCard(arm, "de");
    expect(fallbackHtml).toContain("missing article");
    expect(fallbackHtml).toContain("Arm");
    expect(fallbackHtml).not.toContain("Mein Arm tut weh.");
  });

  it("synthesizes French elided sentence clozes cleanly", () => {
    const hotel = frMaps.articles.find((a) => a.articleCloze && a.target_word === "l'");
    expect(hotel).toBeDefined();
    expect(hotel!.articleCloze).toContain("___ ");
    expect(generateMCQOptions(hotel!, [], 4)).toContain("l'");
  });

  it("uses case-sensitive German matching, guards relative pronouns after commas, supports curly apostrophe in French, and omits article_* from byLowerKey", () => {
    // Lowercase adverb "morgen" must not match capitalized noun "Morgen"
    expect(buildArticleContextCloze("Der morgen kommt bald.", "Morgen", "der", "de")).toBeNull();
    // Relative pronoun after comma must not be blanked as an article + adjective
    expect(buildArticleContextCloze("Der Mann, der heute Wasser trinkt.", "Wasser", "der", "de")).toBeNull();
    // Curly apostrophe in French elision
    expect(buildArticleContextCloze("L’hôtel est vieux.", "hôtel", "le", "fr")).toEqual({
      cloze: "___ hôtel est vieux.",
      article: "l'",
    });
    // Synthetic article_* entries must not pollute byLowerKey (e.g. lookup "den")
    expect(deMaps.byLowerKey["den"]?.id.startsWith("article_")).not.toBe(true);
  });
});
