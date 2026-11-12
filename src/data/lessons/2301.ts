import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2301,
  "slug": "englishs-fossil-umlauts",
  "title": "English's Fossil Umlauts",
  "subtitle": "man/men, foot/feet, goose/geese, mouse/mice — mapped onto German pairs",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mann",
    "fuß",
    "tochter",
    "kind",
    "buch",
    "haus",
    "maus",
    "vogel",
    "kuh",
    "blatt",
    "auge",
    "ei",
    "knie",
    "rechnung",
    "blume",
    "lampe",
    "bluse"
  ],
  "table_word_ids": [
    "mann",
    "fuß",
    "tochter",
    "buch",
    "kind",
    "haus",
    "maus",
    "vogel",
    "kuh",
    "blatt",
    "auge",
    "ei",
    "knie",
    "rechnung",
    "blume",
    "lampe",
    "bluse"
  ],
  "hook": {
    "title": "Your Fossil Collection",
    "content": "English keeps exactly seven or so living umlaut plurals, and they are the oldest words in the language: man/men, foot/feet, goose/geese, mouse/mice, tooth/teeth, woman/women, louse/lice. German keeps the same system productive: Mann/Männer, Fuß/Füße, Maus/Mäuse, Zahn/Zähne, Stadt/Städte. Pair them up and the correspondence is total: the same vowel-pull, one shore writing dots, the other just changing the letter. This lesson is a museum tour of your own fossils, displayed beside their living German relatives.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Museum's Oldest Piece",
        "content": "foot/feet and Fuß/Füße are the showpiece: the u was pulled to ü/ee by the same ancient -iz plural, and both languages kept the pulled vowel. The plural of foot has been irregular for 2,000 years in two languages — consistency across the North Sea."
      }
    ]
  },
  "pattern": {
    "title": "The Display Cases",
    "content": "Case one: man/men ↔ Mann/Männer — the a pulled forward. Case two: foot/feet ↔ Fuß/Füße. Case three: mouse/mice ↔ Maus/Mäuse. Case four: tooth/teeth ↔ Zahn/Zähne (hinted: the t→z twin you own from the sibilant family). Case five: goose/geese ↔ Gans/Gänse (hint: the gans family). Case six, the broken pair: child/children ↔ Kind/Kinder — English went even MORE irregular (the old plural -r survives in children!), German stayed regular. Case seven: house/houses ↔ Haus/Häuser — English took the regular exit; German kept the umlaut. Every case is one law: the vanished i pulled, the languages kept different evidence.",
    "footnotes": [],
    "linguist_note": "The -r plural in 'children' is the same -r suffix German uses in Kinder, Bücher, Männer — English's children is a double plural, -r plus -en, the only place the Germanic -r plural survives in English spelling."
  },
  "exercises": [
    {
      "id": "l2301_e1",
      "type": "matching_pairs",
      "prompt": "The display cases — match each English fossil with its living German pair. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "fu1",
          "english": "man / men",
          "german": "Mann / Männer"
        },
        {
          "id": "fu2",
          "english": "foot / feet",
          "german": "Fuß / Füße"
        },
        {
          "id": "fu3",
          "english": "mouse / mice",
          "german": "Maus / Mäuse"
        },
        {
          "id": "fu4",
          "english": "daughter / daughters",
          "german": "Tochter / Töchter"
        },
        {
          "id": "fu5",
          "english": "fowl (and its archaic kin)",
          "german": "Vogel / Vögel"
        },
        {
          "id": "fu6",
          "english": "cow / kine (archaic!)",
          "german": "Kuh / Kühe"
        },
        {
          "id": "recall1",
          "german": "das Blatt im Buch",
          "english": "the sheet in the book"
        },
        {
          "id": "recall1b",
          "german": "das Auge",
          "english": "the eye"
        },
        {
          "id": "recall2",
          "german": "das Ei",
          "english": "the egg"
        },
        {
          "id": "recall2b",
          "german": "das Knie",
          "english": "the knee"
        },
        {
          "id": "recall3",
          "german": "ein Auge",
          "english": "an eye"
        },
        {
          "id": "spaced1",
          "german": "Die Briefmarke ist teuer",
          "english": "The postage stamp is expensive"
        }
      ],
      "target_answer": "Mann / Männer, Fuß / Füße, Maus / Mäuse, Tochter / Töchter, Vogel / Vögel, Kuh / Kühe, das Blatt im Buch, das Auge, das Ei, das Knie, ein Auge, Die Briefmarke ist teuer",
      "meaning": "man / men; foot / feet; mouse / mice; daughter / daughters; fowl (and its archaic kin); cow / kine (archaic!); the sheet in the book; the eye; the egg; the knee; an eye; The postage stamp is expensive",
      "explanation": "Same vowel-pull, same words — the dots in German are the only visible difference. Kine, English's own umlaut plural of cow, survived into the 1800s."
    },
    {
      "id": "l2301_e2",
      "type": "shift_select",
      "prompt": "Why does 'children' end in -en while German says 'Kinder'?",
      "options": [
        "The two plurals are unrelated",
        "German dropped an -en that was always there",
        "children is a DOUBLE plural — the Germanic -r plus -en; Kinder keeps the -r alone",
        "children is a French loan"
      ],
      "target_answer": "children is a DOUBLE plural — the Germanic -r plus -en; Kinder keeps the -r alone",
      "meaning": "children ↔ Kinder: the same -r plural fossil",
      "explanation": "child + -er + -en: the only place English still shows the Germanic -r plural that German uses productively. The feminine -n drawer is full too: Rechnung → Rechnungen, Blume → Blumen, Lampe → Lampen, Bluse → Blusen — no umlaut, just the -n."
    },
    {
      "id": "l2301_e3",
      "type": "shift_select",
      "prompt": "Which pair shows English TAKING the regular exit where German kept umlaut?",
      "options": [
        "mouse/mice ↔ Maus/Mäuse",
        "foot/feet ↔ Fuß/Füße",
        "man/men ↔ Mann/Männer",
        "house/houses ↔ Haus/Häuser"
      ],
      "target_answer": "house/houses ↔ Haus/Häuser",
      "meaning": "Haus/Häuser kept the dots; house/houses regularized",
      "explanation": "English regularized most nouns with -s; only the oldest words kept their umlaut. Haus never surrendered. The new nouns sort themselves: Blatt → Blätter (umlaut -er), Auge → Augen (-n), Ei → Eier (-er), Knie → Knie (zero) — four nouns, four drawers."
    },
    {
      "id": "l2301_e4",
      "type": "reverse_cognate",
      "prompt": "What English pair is the fossil twin of 'Fuß/Füße'?",
      "target_answer": "foot / feet",
      "meaning": "foot/feet ↔ Fuß/Füße",
      "explanation": "The u-pull happened once, in Proto-Germanic, before the languages split — both kept the result forever."
    },
    {
      "id": "l2301_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The men have big feet' (die Füße)",
      "target_answer": "Die Männer haben große Füße",
      "meaning": "The men have big feet",
      "vocab_hints": [
        {
          "word": "große",
          "translation": "big (plural form)",
          "note": "groß gains -e before plural nouns — the adjective waves the umlaut flag too"
        }
      ],
      "word_bank": [
        "morgen",
        "Füße",
        "haben",
        "für",
        "Die",
        "Männer",
        "große"
      ],
      "explanation": "Two umlaut plurals plus an adjective ending — the fossil museum in one sentence."
    }
  ],
  "summary": {
    "outcome": "Map every English fossil umlaut onto its German pair and use the plurals in sentences.",
    "use_example": {
      "german": "Die Männer haben große Füße.",
      "english": "The men have big feet."
    },
    "takeaway": "man/men, foot/feet, mouse/mice — the same i-mutation as Mann/Männer, Fuß/Füße, Maus/Mäuse. One law, two spellings.",
    "curiosity_teaser": "Next: the five plural patterns — sort twenty-five nouns into their plural classes."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from English's Fossil Umlauts (The men have big feet):",
    "target_answer": "Die Männer haben große Füße",
    "word_bank": [
      "große",
      "heute",
      "Männer",
      "nicht",
      "Füße",
      "Die",
      "haben"
    ],
    "explanation": "Re-assembling \"Die Männer haben große Füße\" from scratch locks in the structural pattern of English's Fossil Umlauts without relying on short-term echo."
  }
};

export default lesson;
