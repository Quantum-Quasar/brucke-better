// ponytail: language registry — the single place to add a new learning language.
//
// A language definition carries everything that varies between languages:
//   · identity (name, flag, TTS locale, special characters for the char bar)
//   · whether it has a grammatical gender system (drives onboarding + badges)
//   · its own onboarding introduction (philosophy, demos, ready step)
//   · content status — only "available" languages have curriculum content
//     (see src/data/language-content.ts); "coming-soon" languages show
//     graceful empty states instead.
//
// To add a language: append an entry here, then (when content exists) wire a
// content bundle in src/data/language-content.ts. No other file needs changing.

import type { Gender } from "@/lib/types";

export type LanguageStatus = "available" | "coming-soon";

/** One English ↔ target-language demo pair shown in the language's intro. */
export interface LanguageDemoPair {
  english: string;
  target: string;
  rule: string;
  note: string;
  /** compendium word id for drawer/audio (German demos only) */
  wordId?: string;
  gender?: Gender | null;
}

export interface LanguageGenderSystem {
  /** articles in display order, e.g. ["der", "die", "das"] */
  articles: string[];
  labels: string[];
  colors: string[];
}

export interface LanguageOnboarding {
  philosophy: {
    heading: string;
    body: string;
    demoTitle: string;
    demos: LanguageDemoPair[];
  };
  notation: {
    body: string;
    anchorsBody: string;
    /** whether the "grammatical gender" block (04) is shown */
    showGenders: boolean;
    /** shown instead of the 3-gender block when the language has no gender system */
    noGenderNote?: string;
  };
  ready: {
    body: string;
  };
}

export interface LanguageDefinition {
  /** stable id used in storage & URLs — never rename once shipped */
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  /** BCP-47 locale for Web Speech pronunciation */
  ttsLocale: string;
  /** quick-insert characters shown under typing inputs */
  specialChars: [char: string, digraph: string][];
  charBarLabel: string;
  genderSystem: LanguageGenderSystem | null;
  status: LanguageStatus;
  /** one-line description on the language picker */
  blurb: string;
  /** faint watermark characters scattered behind the trail map */
  decoChars?: string[];
  onboarding: LanguageOnboarding;
}

const GERMAN_ONBOARDING: LanguageOnboarding = {
  philosophy: {
    heading: "you don't start from zero",
    body: "english and german are sibling languages born from the same ancestral branch. over 60% of core spoken english vocabulary has an unbroken germanic twin. you aren't memorizing random sounds — you are unlocking sound shifts you already know.",
    demoTitle: "high german consonant shift demo:",
    demos: [
      {
        english: "hand",
        target: "Hand",
        gender: "die",
        rule: "direct twin",
        wordId: "hand",
        note: "Hand is the same word in both languages — an easy anchor you already own. Feminine nouns take die.",
      },
      {
        english: "water",
        target: "Wasser",
        gender: "das",
        rule: "t → ss / s",
        wordId: "wasser",
        note: "English t between vowels often becomes German ss or s: water → Wasser. Neuter nouns take das.",
      },
      {
        english: "brother",
        target: "Bruder",
        gender: "der",
        rule: "th → d",
        wordId: "bruder",
        note: "English th regularly becomes German d: brother → Bruder, three → drei. Masculine nouns take der.",
      },
      {
        english: "hope",
        target: "hoffen",
        gender: null,
        rule: "p → ff / f",
        wordId: "hoffen",
        note: "English p often becomes ff or pf: hope → hoffen, ship → Schiff. Verbs take the ending -en.",
      },
    ],
  },
  notation: {
    body: "brücke makes language learning transparent, intuitive, and grounded in living english cognates.",
    anchorsBody:
      "we connect german words to everyday english: mit to midwife and will to voluntary.",
    showGenders: true,
  },
  ready: {
    body: "start with lesson 1 on the trail to encounter your first ten german cognates. all progress is stored locally in your browser.",
  },
};

const SPANISH_ONBOARDING: LanguageOnboarding = {
  philosophy: {
    heading: "you already speak thousands of spanish words",
    body: "english absorbed a vast latin vocabulary — directly and through french — and spanish kept that same inheritance alive. tens of thousands of english words have an unmistakable spanish twin: pastry → pastel, confirmation → confirmación. you aren't memorizing random sounds — you are unlocking shared latin roots you already know.",
    demoTitle: "spanish cognate pattern demo:",
    demos: [
      {
        english: "pastry",
        target: "pastel",
        gender: "el",
        rule: "direct twin",
        note: "Latin pasta gave English \"pastry\" and Spanish pastel — a living cognate.",
      },
      {
        english: "confirmation",
        target: "confirmación",
        gender: "la",
        rule: "-tion → -ción",
        note: "English -tion becomes Spanish -ción (with an accent on ó); these nouns are feminine: la confirmación.",
      },
      {
        english: "to confirm",
        target: "confirmar",
        rule: "-ation → -ar",
        note: "Many -ación nouns become -ar verbs: confirmación → confirmar. One pattern unlocks hundreds of verbs.",
      },
      {
        english: "fact",
        target: "hacer",
        rule: "Latin f- → silent h-",
        note: "Latin facere gives English \"fact\" and Spanish hacer. Spanish often turns Latin f- into a silent h-.",
      },
    ],
  },
  notation: {
    body: "brücke makes language learning transparent, intuitive, and grounded in living english cognates.",
    anchorsBody:
      "we connect spanish words to everyday english: pastel to pastry, confirmación to confirmation, and hacer to fact.",
    showGenders: false,
    noGenderNote:
      "spanish nouns carry grammatical gender — el (masculine) and la (feminine) — which this course decodes from word endings with azure and rose badges.",
  },
  ready: {
    body: "the spanish trail is open: 9 conversion bridges first, then the sentence machine, time travel and the deep engine. all progress is stored locally in your browser.",
  },
};

const FRENCH_ONBOARDING: LanguageOnboarding = {
  philosophy: {
    heading: "french is hiding inside your english",
    body: "after 1066, english absorbed over 10,000 french words — nearly a third of modern english vocabulary. castle → château, warden → gardien, estate → état. you aren't memorizing random sounds — you are uncovering norman-era doublets you already use.",
    demoTitle: "french doublet demo:",
    demos: [
      {
        english: "castle",
        target: "château",
        rule: "c + stl → ch + âu",
        note: "Both come from Latin castellum; French softened the hard form into château.",
      },
      {
        english: "warden",
        target: "gardien",
        rule: "w → gu",
        note: "Germanic w- often became gu- in French: warden → gardien, warranty → garantie.",
      },
      {
        english: "estate",
        target: "état",
        rule: "s dropped before t",
        note: "French dropped the s before t (estat → état); English later re-borrowed the word with the s.",
      },
      {
        english: "beef",
        target: "bœuf",
        rule: "direct twin",
        note: "English \"beef\" is the French bœuf — a Norman dining-table word. Cow on the farm, beef on the plate.",
      },
    ],
  },
  notation: {
    body: "brücke makes language learning transparent, intuitive, and grounded in living english cognates.",
    anchorsBody:
      "we connect french words to everyday english: château to castle and gardien to warden.",
    showGenders: false,
    noGenderNote:
      "french nouns carry grammatical gender — le (masculine) and la (feminine) — which this course decodes from word endings with azure and rose badges.",
  },
  ready: {
    body: "the french trail is open: the conversion bridges first, then the sentence machine, the pasts and the deep engine. all progress is stored locally in your browser.",
  },
};

const DUTCH_ONBOARDING: LanguageOnboarding = {
  philosophy: {
    heading: "dutch is the germanic twin english kept",
    body: "english and dutch both stayed north of the High German consonant shift. where German turned water into Wasser and ship into Schiff, Dutch kept water and schip — thousands of core words line up almost letter for letter. the real work is the vowels, de/het, and the verb-second order english lost.",
    demoTitle: "english ↔ dutch twin demo:",
    demos: [
      {
        english: "water",
        target: "water",
        rule: "direct twin",
        note: "Dutch and English both kept the Germanic t; German shifted it to Wasser.",
      },
      {
        english: "ship",
        target: "schip",
        rule: "sh → sch",
        note: "English sh is Dutch sch — the same sound in a different spelling.",
      },
      {
        english: "brother",
        target: "broeder",
        rule: "th → d",
        note: "English th hardens to Dutch d, exactly as in German Bruder.",
      },
      {
        english: "book",
        target: "boek",
        rule: "spelling: oo ↔ oe",
        note: "English oo and Dutch oe are spelling twins — book, foot, good. Dutch oe is pronounced /u/; read the spelling bridge first, then the Dutch sound.",
      },
    ],
  },
  notation: {
    body: "brücke makes language learning transparent, intuitive, and grounded in living english cognates.",
    anchorsBody:
      "we connect dutch words to everyday english: water to water, schip to ship, and broeder to brother.",
    showGenders: false,
    noGenderNote:
      "dutch nouns are de (common) or het (neuter) — two genders and no noun case system. this course decodes them from endings and compounds with azure and emerald badges.",
  },
  ready: {
    body: "the dutch trail is open: the english twins and sound bridges first, then the sentence machine, the past tenses and the deep engine. all progress is stored locally in your browser.",
  },
};

export const LANGUAGES: LanguageDefinition[] = [
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    ttsLocale: "de-DE",
    specialChars: [
      ["ä", "ae"],
      ["ö", "oe"],
      ["ü", "ue"],
      ["ß", "ss"],
      ["Ä", "Ae"],
      ["Ö", "Oe"],
      ["Ü", "Ue"],
    ],
    charBarLabel: "Umlauts",
    genderSystem: {
      articles: ["der", "die", "das"],
      labels: ["masculine", "feminine", "neuter"],
      colors: ["blue", "rose", "emerald"],
    },
    status: "available",
    blurb: "The full cognate engine: 30 topics, 9 shift families, 1226 words.",
    decoChars: ["ß", "ü", "ö", "ä", "ß", "§"],
    onboarding: GERMAN_ONBOARDING,
  },
  {
    id: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    ttsLocale: "nl-NL",
    specialChars: [
      ["é", "e"],
      ["ë", "e"],
      ["ï", "i"],
      ["ó", "o"],
      ["ê", "e"],
    ],
    charBarLabel: "Accents",
    genderSystem: {
      articles: ["de", "het"],
      labels: ["common", "neuter"],
      colors: ["blue", "emerald"],
    },
    status: "available",
    blurb: "The West Germanic twin: 30 topics, 75 lessons, 9 correspondence bridges, 390 words.",
    decoChars: ["ij", "ui", "oe", "sch", "g", "ch", "aa", "ee"],
    onboarding: DUTCH_ONBOARDING,
  },
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    ttsLocale: "es-ES",
    specialChars: [
      ["á", "a"],
      ["é", "e"],
      ["í", "i"],
      ["ó", "o"],
      ["ú", "u"],
      ["ñ", "n"],
      ["¿", "?"],
      ["¡", "!"],
    ],
    charBarLabel: "Accents",
    genderSystem: {
      articles: ["el", "la"],
      labels: ["masculine", "feminine"],
      colors: ["blue", "rose"],
    },
    status: "available",
    blurb: "The Latin cognate engine: 30 topics, 123 lessons, 9 conversion bridges, 293 words.",
    decoChars: ["ñ", "á", "é", "í", "ó", "ú", "¿", "¡"],
    onboarding: SPANISH_ONBOARDING,
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    ttsLocale: "fr-FR",
    specialChars: [
      ["é", "e"],
      ["è", "e"],
      ["ê", "e"],
      ["ë", "e"],
      ["à", "a"],
      ["ù", "u"],
      ["ç", "c"],
      ["œ", "oe"],
    ],
    charBarLabel: "Accents",
    genderSystem: {
      articles: ["le", "la"],
      labels: ["masculine", "feminine"],
      colors: ["blue", "rose"],
    },
    status: "available",
    blurb: "The Norman doublet engine: 30 topics, 123 lessons, 9 conversion bridges, 306 words.",
    decoChars: ["é", "à", "ç", "œ", "è", "ê"],
    onboarding: FRENCH_ONBOARDING,
  },
];

export const DEFAULT_LANGUAGE_ID = "de";

const LANGUAGE_MAP: Record<string, LanguageDefinition> = Object.fromEntries(
  LANGUAGES.map((l) => [l.id, l])
);

export function isValidLanguageId(id: unknown): id is string {
  // hasOwnProperty so "__proto__" & friends (prototype chain) don't count
  return typeof id === "string" && Object.prototype.hasOwnProperty.call(LANGUAGE_MAP, id);
}

/** Never throws — falls back to the default language for unknown ids. */
export function getLanguageDefinition(id: string | null | undefined): LanguageDefinition {
  if (id && isValidLanguageId(id)) return LANGUAGE_MAP[id];
  return LANGUAGE_MAP[DEFAULT_LANGUAGE_ID];
}
