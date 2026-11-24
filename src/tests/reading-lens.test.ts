import { describe, expect, it } from "vitest";
import { compendium } from "@/data/compendium";
import { frenchCompendium } from "@/data/french/compendium-fr";
import { spanishCompendium } from "@/data/spanish/compendium-es";
import { dutchCompendium } from "@/data/dutch/compendium-nl";
import {
  analyzeReadingText,
  FRENCH_ELISION_RE,
  getFunctionWordSet,
  getReadingSamples,
  normalizeReadingToken,
} from "@/lib/reading-lens";
import type { CompendiumData, MasteryState } from "@/lib/types";

describe("reading-lens", () => {
  it("normalizes surface tokens cleanly including NFD diacritics", () => {
    expect(normalizeReadingToken("  Wasser ")).toBe("wasser");
    expect(normalizeReadingToken("Bruder")).toBe("bruder");
    expect(normalizeReadingToken("u\u0308ber")).toBe("über");
  });

  it("strips French elisions cleanly (l'ami, d'eau, j'ai, qu'il)", () => {
    expect(FRENCH_ELISION_RE.exec("l'ami")?.[1]).toBe("ami");
    expect(FRENCH_ELISION_RE.exec("d'eau")?.[1]).toBe("eau");
    expect(FRENCH_ELISION_RE.exec("j'ai")?.[1]).toBe("ai");
    expect(FRENCH_ELISION_RE.exec("qu'il")?.[1]).toBe("il");
    expect(FRENCH_ELISION_RE.exec("jusqu’ici")?.[1]).toBe("ici");

    const mockFrenchCompendium: CompendiumData = {
      ...compendium,
      wordList: [
        {
          id: "fr_ami",
          target_word: "ami",
          gender: "le",
          ipa: "/a.mi/",
          shift_rule: "",
          english_meaning: "friend",
          english_cognate: "amiable",
          etymology_derivation: "",
          context_phrase: "mon ami",
          context_translation: "my friend",
          sound_shift_ids: [],
          domain: "people",
        },
        {
          id: "fr_eau",
          target_word: "eau",
          gender: "la",
          ipa: "/o/",
          shift_rule: "",
          english_meaning: "water",
          english_cognate: "eau",
          etymology_derivation: "",
          context_phrase: "un verre d'eau",
          context_translation: "a glass of water",
          sound_shift_ids: [],
          domain: "food",
        },
      ],
      falseFriends: [],
    };

    const result = analyzeReadingText("l'ami d'eau j'ai qu'il", mockFrenchCompendium, {
      fr_ami: "mastered",
      fr_eau: "encountered",
    });
    const wordTokens = result.tokens.filter((t) => t.kind === "word");
    expect(wordTokens[0].word?.id).toBe("fr_ami");
    expect(wordTokens[0].status).toBe("mastered");
    expect(wordTokens[1].word?.id).toBe("fr_eau");
    expect(wordTokens[1].status).toBe("encountered");
  });

  it("provides built-in sample paragraphs for German, French, Spanish, and Dutch", () => {
    for (const lang of ["de", "fr", "es", "nl"]) {
      const samples = getReadingSamples(lang);
      expect(samples.length).toBeGreaterThanOrEqual(2);
      for (const sample of samples) {
        expect(sample.text.trim().length).toBeGreaterThan(20);
      }
    }
    expect(getReadingSamples("nl")[0].text).toContain("broer");
    expect(getReadingSamples("nl")[0].text).not.toContain("broeder");
    expect(getReadingSamples("es")[0].text).toContain("¡Hola!");
  });

  it("classifies mastered, encountered, in-course, unknown, and false-friend words accurately", () => {
    const wasser = compendium.wordList.find((w) => w.target_word.toLowerCase() === "wasser");
    const bruder = compendium.wordList.find((w) => w.target_word.toLowerCase() === "bruder");
    expect(wasser).toBeDefined();
    expect(bruder).toBeDefined();

    const mastery: Record<string, MasteryState> = {
      [wasser!.id]: "mastered",
      [bruder!.id]: "encountered",
    };

    const result = analyzeReadingText("Wasser, Bruder, Handy, xyzzyword!", compendium, mastery);

    expect(result.totalWords).toBe(4);
    expect(result.masteredCount).toBe(1);
    expect(result.encounteredCount).toBe(1);
    expect(result.unknownCount).toBe(1);
    expect(result.falseFriendCount).toBe(1);
    expect(result.coveragePercent).toBe(50);
    expect(result.detectedFalseFriends.some((ff) => ff.german_word.toLowerCase().includes("handy"))).toBe(true);

    // Preserves punctuation and whitespace separators so the paragraph renders verbatim
    const reconstructed = result.tokens.map((t) => t.raw).join("");
    expect(reconstructed).toBe("Wasser, Bruder, Handy, xyzzyword!");
  });

  it("does not trigger false-friend false positives via suffix stripping (Fasten, raten)", () => {
    const result = analyzeReadingText("Fasten und raten", compendium, {});
    expect(result.falseFriendCount).toBe(0);
    expect(result.detectedFalseFriends).toHaveLength(0);
  });

  it("excludes unknown German function words from the coverage denominator", () => {
    const wasser = compendium.wordList.find((w) => w.target_word.toLowerCase() === "wasser");
    expect(wasser).toBeDefined();
    const result = analyzeReadingText("und ein Wasser", compendium, {
      [wasser!.id]: "mastered",
    });
    expect(result.unknownCount).toBe(0);
    expect(result.coveragePercent).toBe(100);
  });

  it("detects false friends in built-in German samples", () => {
    const deSamples = getReadingSamples("de");
    const cafeAnalysis = analyzeReadingText(deSamples[0].text, compendium, {});
    expect(cafeAnalysis.totalWords).toBeGreaterThan(15);
    expect(cafeAnalysis.detectedFalseFriends.length).toBeGreaterThanOrEqual(2);
    expect(cafeAnalysis.courseMatchPercent).toBeGreaterThan(30);
  });

  it("returns zeroed stats for empty input", () => {
    const empty = analyzeReadingText("", compendium, {});
    expect(empty.totalWords).toBe(0);
    expect(empty.coveragePercent).toBe(0);
    expect(empty.tokens).toHaveLength(0);
  });

  it("excludes unknown French, Spanish, and Dutch function words from the coverage denominator", () => {
    // French
    const frCafe = frenchCompendium.wordList.find((w) => w.id === "café");
    expect(frCafe).toBeDefined();
    const frResult = analyzeReadingText(
      "Je suis dans le café avec un ami",
      { ...frenchCompendium, wordList: [frCafe!], falseFriends: [] },
      { [frCafe!.id]: "mastered" },
      "fr"
    );
    expect(getFunctionWordSet("fr").has("dans")).toBe(true);
    expect(getFunctionWordSet("fr").has("avec")).toBe(true);
    expect(frResult.masteredCount).toBe(1);
    // "suis" and "ami" are not in the minimal wordList or FR function words; "je", "dans", "le", "avec", "un" are excluded
    expect(frResult.unknownCount).toBe(2);

    // Spanish
    const esCasa = spanishCompendium.wordList.find((w) => w.id === "casa");
    expect(esCasa).toBeDefined();
    const esResult = analyzeReadingText(
      "En la casa con mi y pero los",
      { ...spanishCompendium, wordList: [esCasa!], falseFriends: [] },
      { [esCasa!.id]: "mastered" },
      "es"
    );
    expect(getFunctionWordSet("es").has("pero")).toBe(true);
    expect(getFunctionWordSet("es").has("nosotros")).toBe(true);
    expect(esResult.unknownCount).toBe(0);
    expect(esResult.coveragePercent).toBe(100);

    // Dutch
    const nlHuis = dutchCompendium.wordList.find((w) => w.id === "huis");
    expect(nlHuis).toBeDefined();
    const nlResult = analyzeReadingText(
      "Ik en wij in het huis zonder maar niet",
      { ...dutchCompendium, wordList: [nlHuis!], falseFriends: [] },
      { [nlHuis!.id]: "mastered" },
      "nl"
    );
    expect(getFunctionWordSet("nl").has("zonder")).toBe(true);
    expect(getFunctionWordSet("nl").has("heeft")).toBe(true);
    expect(nlResult.unknownCount).toBe(0);
    expect(nlResult.coveragePercent).toBe(100);
  });
});
