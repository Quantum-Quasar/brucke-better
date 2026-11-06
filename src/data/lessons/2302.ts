import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2302,
  "slug": "the-five-plural-patterns",
  "title": "The Five Plural Patterns",
  "subtitle": "Sort the taught nouns into -e, -er, -n, -s, and zero — then produce plurals in sentences",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mann",
    "frau",
    "kind",
    "buch",
    "haus",
    "glas",
    "tochter",
    "zeit",
    "auto",
    "spiel",
    "stunde",
    "blatt",
    "auge",
    "ei",
    "knie",
    "maus",
    "vogel",
    "kuh"
  ],
  "table_word_ids": [
    "mann",
    "buch",
    "frau",
    "kind",
    "tochter",
    "zeit",
    "haus",
    "glas",
    "auto",
    "spiel",
    "stunde",
    "blatt",
    "auge",
    "ei",
    "knie",
    "maus",
    "vogel",
    "kuh"
  ],
  "hook": {
    "title": "Five Drawers",
    "content": "German plurals have no single rule — they have five drawers, and every noun lives in one. Drawer -er (with umlaut): das Buch → die Bücher, der Mann → die Männer. Drawer -n/-en: die Frau → die Frauen, die Zeit → die Zeiten. Drawer -e: der Tisch → die Tische. Drawer -s: das Auto → die Autos (loans and snappy words). Drawer zero: der Lehrer → die Lehrer (no change). The good news: the drawers correlate with gender and shape — feminines overwhelmingly take -n, -er nouns take zero, monosyllabic masculines/neuters take -e or umlaut+e. Sort twenty-five nouns today and the drawers close themselves.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Plural Article Is Always die",
        "content": "Whatever the drawer, the plural article is die — der Mann → die Männer, das Kind → die Kinder. The plural erases gender: all nouns become die-words in the plural. The dative plural adds -n back (den Männern) — the only case that remembers the drawer."
      }
    ]
  },
  "pattern": {
    "title": "The Sorting Tray",
    "content": "Tray -er (umlaut): Bücher, Männer, Häuser, Töchter, Kinder (no umlaut — the vowel never had an i). Tray -n/-en: Frauen, Zeiten, Zeitung-en? — die Zeitungen! -ung nouns take -en. Tray -e: Tische, Apfel? — die Äpfel (umlaut + e!), Gärten (umlaut). Tray -s: Autos, Fotos, Kaffees? rare — Handys (your trap-word takes -s!). Tray zero: Lehrer, Fernseher, Meter? hint. The umlaut sub-rule: only nouns with a, o, u can umlaut — Zeit can't (no a/o/u), Mann can. Twenty-five nouns, five trays, one sort.",
    "footnotes": [],
    "linguist_note": "The -s drawer is the modern loan lane (Autos, Handys, Babys), and it is growing. German plurals are historically six or seven systems worn down to five — the -en feminine drawer and the zero -er drawer are the deepest fossils."
  },
  "exercises": [
    {
      "id": "l2302_e1",
      "type": "matching_pairs",
      "prompt": "Sort the nouns — match each singular with its drawer:",
      "matching_pairs": [
        {
          "id": "fp1",
          "english": "das Buch → (-er, umlaut)",
          "german": "die Bücher"
        },
        {
          "id": "fp2",
          "english": "die Frau → (-n)",
          "german": "die Frauen"
        },
        {
          "id": "fp3",
          "english": "das Auto → (-s)",
          "german": "die Autos"
        },
        {
          "id": "fp4",
          "english": "der Lehrer → (zero)",
          "german": "die Lehrer"
        },
        {
          "id": "fp5",
          "english": "das Spiel → (-e)",
          "german": "die Spiele"
        },
        {
          "id": "fp6",
          "english": "die Stunde → (-n)",
          "german": "die Stunden"
        }
      ],
      "target_answer": "die Bücher, die Frauen, die Autos, die Lehrer, die Spiele, die Stunden",
      "meaning": "the books, the women, the cars, the teachers, the games, the hours",
      "explanation": "-er umlaut, -n, -s, and zero — four of the five drawers, each with a family resemblance. Spiel and Stunde pick their drawers by sound."
    },
    {
      "id": "l2302_e2",
      "type": "shift_select",
      "prompt": "Which noun CANNOT take an umlaut plural for phonological reasons?",
      "options": [
        "das Buch",
        "der Mann",
        "die Zeit (no a, o, or u to umlaut)",
        "der Garten"
      ],
      "target_answer": "die Zeit (no a, o, or u to umlaut)",
      "meaning": "Umlaut needs a, o, or u",
      "explanation": "Umlaut pulls a/o/u forward. Zeit's i is already front — nothing to pull. Zeit → Zeiten, no dots. Sort the shelf: Blatt → Blätter (dots), Maus → Mäuse (dots), Vogel → Vögel (dots), Kuh → Kühe (dots), Auge → Augen, Ei → Eier, Knie → Knie — the vowels decide."
    },
    {
      "id": "l2302_e3",
      "type": "shift_select",
      "prompt": "What is ALWAYS the plural article?",
      "options": [
        "It depends on the drawer",
        "der",
        "das",
        "die"
      ],
      "target_answer": "die",
      "meaning": "Plural = die, always",
      "explanation": "der Mann → die Männer, das Kind → die Kinder, die Frau → die Frauen — the plural erases gender."
    },
    {
      "id": "l2302_e4",
      "type": "derive",
      "prompt": "Drawer check: 'die Zeitung →' (the -ung nouns take which plural?):",
      "english_hint": "-ung nouns take -en",
      "target_answer": "Zeitungen",
      "meaning": "die Zeitungen — the newspapers",
      "explanation": "-ung nouns are feminine, feminines take -n/-en: die Zeitungen. Two laws, one drawer."
    },
    {
      "id": "l2302_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The men find the books in the houses'",
      "target_answer": "Die Männer finden die Bücher in den Häusern",
      "meaning": "The men find the books in the houses",
      "vocab_hints": [
        {
          "word": "den Häusern",
          "translation": "in the houses (dative plural)",
          "note": "dative plural adds -n: die Häuser → den Häusern — the case that remembers the drawer"
        }
      ],
      "word_bank": [
        "finden",
        "Die",
        "Bücher",
        "in",
        "ohne",
        "Häusern",
        "den",
        "Männer",
        "die",
        "heute"
      ],
      "explanation": "Three umlaut plurals (Männer, Bücher, Häusern) — and the dative -n on Häusern is the drawer's receipt."
    }
  ],
  "summary": {
    "outcome": "Sort nouns into the five plural drawers and produce dative-plural -n correctly.",
    "use_example": {
      "german": "Die Männer finden die Bücher in den Häusern.",
      "english": "The men find the books in the houses."
    },
    "takeaway": "Five drawers (-er/-e/-n/-s/zero), plural always die, dative plural adds -n — sort once, plural forever.",
    "curiosity_teaser": "Next: Twin Suppletions — gut/besser and good/better, the shared irregular story."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Five Plural Patterns (The men find the books in the houses):",
    "target_answer": "Die Männer finden die Bücher in den Häusern",
    "word_bank": [
      "heute",
      "Bücher",
      "in",
      "nicht",
      "finden",
      "den",
      "die",
      "Die",
      "Männer",
      "Häusern"
    ],
    "explanation": "Re-assembling \"Die Männer finden die Bücher in den Häusern\" from scratch locks in the structural pattern of The Five Plural Patterns without relying on short-term echo."
  }
};

export default lesson;
