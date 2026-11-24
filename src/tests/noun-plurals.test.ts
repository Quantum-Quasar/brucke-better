import { describe, expect, it } from "vitest";
import { getLanguageContent } from "@/data/language-content";
import { NOUN_PLURALS, pluralForWord } from "@/data/noun-plurals";

const UNCOUNTABLE_OR_PROPER: Record<string, Set<string>> = {
  de: new Set([
    "gesundheit",
    "eis",
    "europa",
    "hitze",
    "rindfleisch",
    "milch",
    "vertrauen",
    "langeweile",
    "luft",
    "donner",
    "wasser",
    "pfeffer",
    "lust",
    "fernsehen",
  ]),
  fr: new Set([
    "anglais",
    "attention",
    "bonheur",
    "chaleur",
    "droite",
    "faim",
    "français",
    "gauche",
    "importance",
    "patience",
    "soif",
    "un",
  ]),
  es: new Set([
    "atención",
    "enero",
    "frío",
    "hambre",
    "hierro",
    "leche",
    "música",
    "sed",
  ]),
  nl: new Set([
    "april",
    "augustus",
    "bloed",
    "december",
    "dorst",
    "februari",
    "geld",
    "geluk",
    "goud",
    "gras",
    "honger",
    "ijs",
    "januari",
    "juli",
    "juni",
    "koffie",
    "liefde",
    "maart",
    "mei",
    "melk",
    "november",
    "oktober",
    "pijn",
    "regen",
    "room",
    "september",
    "sneeuw",
    "thee",
    "trek",
    "water",
    "zout",
    "zuid",
  ]),
};

describe("noun-plurals coverage", () => {
  it("maps only valid compendium word IDs with non-empty plural articles", () => {
    const articleRe: Record<string, RegExp> = {
      de: /^die\s+\S+/,
      fr: /^les\s+\S+/,
      es: /^(?:los|las)\s+\S+/,
      nl: /^de\s+\S+/,
    };

    for (const lang of ["de", "fr", "es", "nl"] as const) {
      const { compendium } = getLanguageContent(lang);
      const entries = Object.entries(NOUN_PLURALS[lang] ?? {});
      expect(entries.length).toBeGreaterThan(0);

      for (const [id, plural] of entries) {
        expect(compendium!.words[id], `${lang}.${id} must exist in compendium`).toBeDefined();
        expect(plural, `${lang}.${id} plural format`).toMatch(articleRe[lang]);
      }
    }
  });

  it("covers 100% of countable nouns in Lesson 1 across DE, FR, ES, and NL", () => {
    for (const lang of ["de", "fr", "es", "nl"] as const) {
      const { compendium, lessons } = getLanguageContent(lang);
      const lesson1 = lessons.find((l) => l.id === 1);
      expect(lesson1, `${lang} Lesson 1 must exist`).toBeDefined();

      const ids = Array.from(
        new Set([...(lesson1!.word_ids ?? []), ...(lesson1!.table_word_ids ?? [])].map((id) => id.toLowerCase()))
      );
      const countableNouns = ids
        .map((id) => compendium!.words[id])
        .filter((w): w is NonNullable<typeof w> => Boolean(w && w.gender !== null))
        .filter((w) => !UNCOUNTABLE_OR_PROPER[lang].has(w.id.toLowerCase()));

      expect(countableNouns.length, `${lang} Lesson 1 should have countable nouns`).toBeGreaterThan(0);
      for (const word of countableNouns) {
        expect(
          pluralForWord(lang, word),
          `${lang} Lesson 1 noun "${word.id}" (${word.target_word}) must have a plural`
        ).toBeTruthy();
      }
    }
  });

  it("covers 100% of countable nouns in German Lessons 1–20 and 250+ German nouns overall", () => {
    const { compendium, lessons } = getLanguageContent("de");
    const earlyLessons = lessons.filter((l) => l.id >= 1 && l.id <= 20);
    const earlyIds = new Set<string>();
    for (const lesson of earlyLessons) {
      for (const rawId of [...(lesson.word_ids ?? []), ...(lesson.table_word_ids ?? [])]) {
        earlyIds.add(rawId.toLowerCase());
      }
    }

    const countableEarlyNouns = Array.from(earlyIds)
      .map((id) => compendium!.words[id])
      .filter((w): w is NonNullable<typeof w> => Boolean(w && w.gender !== null))
      .filter((w) => !UNCOUNTABLE_OR_PROPER.de.has(w.id.toLowerCase()));

    for (const word of countableEarlyNouns) {
      expect(
        pluralForWord("de", word),
        `DE Lesson 1–20 noun "${word.id}" (${word.target_word}) must have a plural`
      ).toBeTruthy();
    }

    expect(Object.keys(NOUN_PLURALS.de).length).toBeGreaterThanOrEqual(250);
  });

  it("covers 100% of countable nouns across FR, ES, and NL compendiums", () => {
    for (const lang of ["fr", "es", "nl"] as const) {
      const { compendium } = getLanguageContent(lang);
      const countableNouns = compendium!.wordList
        .filter((w) => w.gender !== null && !/^(article_|sentence_|compound_|trap_)/.test(w.id))
        .filter((w) => !UNCOUNTABLE_OR_PROPER[lang].has(w.id.toLowerCase()));

      const missing = countableNouns.filter((w) => !pluralForWord(lang, w));
      expect(missing.map((w) => w.id), `${lang} missing countable noun plurals`).toEqual([]);
    }
  });

  it("handles key irregular and rule-based plurals accurately across all 4 languages", () => {
    // German
    expect(pluralForWord("de", { id: "decke" })).toBe("die Decken");
    expect(pluralForWord("de", { id: "buche" })).toBe("die Buchen");
    expect(pluralForWord("de", { id: "zeitschrift" })).toBe("die Zeitschriften");
    expect(pluralForWord("de", { id: "gesundheit" })).toBeUndefined();

    // French (-eau -> -x, -al -> -aux, -s unchanged, regular -s)
    expect(pluralForWord("fr", { id: "gâteau" })).toBe("les gâteaux");
    expect(pluralForWord("fr", { id: "manteau" })).toBe("les manteaux");
    expect(pluralForWord("fr", { id: "hôpital" })).toBe("les hôpitaux");
    expect(pluralForWord("fr", { id: "pas" })).toBe("les pas");

    // Spanish (vowel + -s, consonant + -es, accent drops, feminine/masculine articles)
    expect(pluralForWord("es", { id: "ciudad" })).toBe("las ciudades");
    expect(pluralForWord("es", { id: "corazón" })).toBe("los corazones");
    expect(pluralForWord("es", { id: "mano" })).toBe("las manos");
    expect(pluralForWord("es", { id: "problema" })).toBe("los problemas");

    // Dutch (irregulars & vowel changes)
    expect(pluralForWord("nl", { id: "dag" })).toBe("de dagen");
    expect(pluralForWord("nl", { id: "stad" })).toBe("de steden");
    expect(pluralForWord("nl", { id: "kind" })).toBe("de kinderen");
    expect(pluralForWord("nl", { id: "ei" })).toBe("de eieren");
    expect(pluralForWord("nl", { id: "schip" })).toBe("de schepen");
  });
});
