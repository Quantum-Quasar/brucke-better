import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5122,
  "slug": "zaehlen-ii-null-zahl-nummer-haelfte-million",
  "title": "Zählen II: null, die Zahl, die Nummer, die Hälfte, die Million",
  "subtitle": "zero, and the four nouns that count for you",
  "phase": 3,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "null",
    "zahl",
    "nummer",
    "hälfte",
    "million",
    "zehn",
    "hundert",
    "zählen",
    "kuchen",
    "minute"
  ],
  "table_word_ids": [
    "null",
    "zahl",
    "nummer",
    "hälfte",
    "million",
    "zehn",
    "hundert",
    "zählen",
    "kuchen",
    "minute",
    "vierzig",
    "geschlossen",
    "schloss",
    "schweiß",
    "zusammen",
    "ausgehen"
  ],
  "hook": {
    "title": "Zero Is a Latecomer",
    "content": "null is a Roman import: Latin nullus ('not one') walked into German through the universities and stayed. English took the same Latin word through a different door — null. Between them, German and English share one number and one nothing. The four nouns are older friends wearing Latin clothes: die Zahl counts things, die Nummer is the number you look up (a phone number, a house number — Latin numerus, and English number is the same word), die Hälfte is 'half', doubled from halb the way zweimal doubles zwei, and die Million is Italian milione — 'a great thousand', built on Latin mille — which both languages bought whole through the same Renaissance French channel. Every one of them is die feminine — and only die Zahl, like zehn, carries the Z-sound.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Zahl vs Nummer",
        "content": "Die Zahl is the count itself — die Zahl sieben, a count of seven, a number in the mathematical sense. Die Nummer is the label: meine Telefonnummer, die Hausnummer, die Zimmernummer. If you can point at it on a card, it is a Nummer. If it is an abstract quantity, it is a Zahl."
      }
    ]
  },
  "pattern": {
    "title": "Counting Nouns in Sentences",
    "content": "Zero: Die Zahl ist null (the count is zero) — null is an adjective here, uninflected in the commonest readings and declined like one when it stands alone. Nouns: eine Zahl / eine Nummer / eine Million take ihre normal die-forms. Doubling: die Hälfte des Kuchens (half of the cake) — des is genitive, and halb is hiding inside. Scale: eine Million Menschen, zwei Millionen. Time: null Uhr is midnight, and the frame you already own still holds — Es ist null Uhr.",
    "footnotes": [],
    "linguist_note": "English dropped the num- root from 'number' and kept it in 'numeric', 'numerous'. German kept the noun and gave English the adjective. Both kept die Million intact because both bought the same Italian coinage — milione, 'a great thousand', built on Latin mille — at roughly the same moment, through the same French channel."
  },
  "exercises": [
    {
      "id": "l5122_e1",
      "type": "matching_pairs",
      "prompt": "Zero and the counting nouns — match each phrase with its reading:",
      "matching_pairs": [
        {
          "id": "nz1",
          "english": "the number seven (the count)",
          "german": "die Zahl sieben"
        },
        {
          "id": "nz2",
          "english": "my phone number",
          "german": "meine Telefonnummer"
        },
        {
          "id": "nz3",
          "english": "half of the cake",
          "german": "die Hälfte des Kuchens"
        },
        {
          "id": "nz4",
          "english": "one million people",
          "german": "eine Million Menschen"
        },
        {
          "id": "nz5",
          "english": "the count is zero",
          "german": "Die Zahl ist null"
        }
      ],
      "target_answer": "die Zahl sieben, meine Telefonnummer, die Hälfte des Kuchens, eine Million Menschen, Die Zahl ist null",
      "meaning": "count, lookup number, half, million, zero",
      "explanation": "Zahl counts, Nummer labels. Hälfte doubles halb and takes genitive des. Million is singular with its Million Menschen."
    },
    {
      "id": "l5122_e2",
      "type": "shift_select",
      "prompt": "'Wie ist deine Telefonnummer?' — which noun is the label you can look up?",
      "options": [
        "die Hälfte",
        "die Nummer",
        "die Zahl",
        "null"
      ],
      "target_answer": "die Nummer",
      "meaning": "die Nummer = the number you look up",
      "explanation": "Point at it on a card and it is a Nummer — phone, house, room. Keep it abstract and it is a Zahl. Both descend from Latin numerus; English kept the root only in 'number'."
    },
    {
      "id": "l5122_e3",
      "type": "derive",
      "prompt": "Build the German noun for 'half' (with its article) — the doubled relative of 'halb':",
      "english_hint": "halb + the -te that turns an adjective into a counted share",
      "target_answer": "die Hälfte",
      "meaning": "die Hälfte = half",
      "explanation": "halb is 'half'; die Hälfte is 'the half' — the same doubling that gives zweimal from zwei and einmal from ein."
    },
    {
      "id": "l5122_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the midnight sentence: 'It is zero o'clock'",
      "tile_options": [
        "zehn",
        "ist",
        "Hälfte",
        "Uhr",
        "null",
        "Es"
      ],
      "target_answer": "Es ist null Uhr",
      "meaning": "It is zero o'clock — midnight",
      "explanation": "Same frame as five o'clock, same impersonal es. null is Latin nullus; the frame never notices."
    },
    {
      "id": "l5122_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"The city has one million people\"",
      "target_answer": "Die Stadt hat eine Million Menschen",
      "meaning": "The city has one million people",
      "vocab_hints": [
        {
          "word": "die Million",
          "translation": "the million",
          "note": "eine Million Menschen — singular noun, plural people, and no article on Menschen because it follows the numeral bare."
        }
      ],
      "word_bank": [
        "Menschen",
        "Zahl",
        "eine",
        "aber",
        "Million",
        "für",
        "hat",
        "Die",
        "Stadt"
      ],
      "explanation": "Million is Italian milione — 'a great thousand', from Latin mille — borrowed whole. After a numeral the noun stands bare: eine Million Menschen, nicht eine Million die Menschen.",
      "idea": "The city has one million people",
      "idea_parts": [
        "The city has",
        "one million people (verb in position 2)"
      ],
      "cues": [
        "Start with \"Die\" and anchor \"Stadt\" in position 2.",
        "Close the frame with \"Menschen\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Say zero, and reach for the right counting noun: Zahl, Nummer, Hälfte or Million.",
    "use_example": {
      "german": "Die Hälfte von null ist null.",
      "english": "Half of zero is zero."
    },
    "takeaway": "null is Latin nullus, die Zahl counts, die Nummer labels, die Hälfte doubles halb — and all four are die.",
    "curiosity_teaser": "Next: how often, in one word — immer, oft, manchmal, selten, einmal."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Zählen II: null, die Zahl, die Nummer, die Hälfte, die Million (The city has one million people):",
    "target_answer": "Die Stadt hat eine Million Menschen",
    "word_bank": [
      "Million",
      "Menschen",
      "Stadt",
      "heute",
      "nicht",
      "hat",
      "Die",
      "eine"
    ],
    "explanation": "Re-assembling \"Die Stadt hat eine Million Menschen\" from scratch locks in the structural pattern of Zählen II: null, die Zahl, die Nummer, die Hälfte, die Million without relying on short-term echo."
  }
};

export default lesson;
