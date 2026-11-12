import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5,
  "slug": "t-to-s-shift",
  "title": "The Sibilant Shift (T → S / SS / Z)",
  "subtitle": "From water to Wasser, better to besser, and two to zwei",
  "phase": 1,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "wasser",
    "essen",
    "besser",
    "hassen",
    "aus",
    "was",
    "zwei",
    "zu",
    "groß",
    "straße"
  ],
  "table_word_ids": [
    "wasser",
    "essen",
    "besser",
    "hassen",
    "aus",
    "was",
    "zwei",
    "zu",
    "groß",
    "straße",
    "dreizehn",
    "fünfzig",
    "mittagessen",
    "beißen",
    "kalender",
    "erdnuss",
    "wasserfall"
  ],
  "hook": {
    "title": "The Sibilant Explosion",
    "content": "When ancient Germanic 'T' shifted in High German, it became a hissing sibilant: 'ss' or 's' after vowels, and 'z' (/ts/) at the beginning of words. This single rule instantly unlocks dozens of the most frequent everyday words.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Spirantization",
        "content": "Voiceless alveolar stop [t] relaxed into the alveolar fricative [s] or affricate [ts]."
      }
    ]
  },
  "pattern": {
    "title": "T after vowels becomes S / SS",
    "content": "Water becomes Wasser. Eat becomes essen. Better becomes besser. Hate becomes hassen. Out becomes aus. What becomes was. Great becomes groß (think of 'gross income' or 'gross error' = large/total, not yuck!). At word beginnings, English 'TW-' maps to German 'ZW-': two becomes zwei, twig becomes Zweig (a two-fork split), twice becomes zweimal, and twenty becomes zwanzig.",
    "footnotes": [
      {
        "marker": "2",
        "title": "Street ↔ Straße & Eszett (ß)",
        "content": "Roman paved roads (via strata) gave English 'street' (keeping Latin 't') and German 'Straße' (shifting 't' to sharp 'ß'). The letter 'ß' represents a sharp [s] sound after long vowels (groß, Straße)."
      }
    ],
    "linguist_note": "The German letter 'z' is always pronounced like the 'ts' in English 'cats' or 'tsunami', reflecting the original dental stop that broke into an affricate."
  },
  "exercises": [
    {
      "id": "l5_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German word for 'water' (das + stem + ending):",
      "tile_options": [
        "er",
        "Wat",
        "der",
        "das",
        "Wass"
      ],
      "target_answer": "das Wasser",
      "meaning": "the water",
      "vocab_hints": [
        {
          "word": "das",
          "translation": "the (neuter article)",
          "note": "German uses das for neutral gender nouns"
        }
      ],
      "shift_hint": "T → SS",
      "affirmation": "You hissed the t into ss and kept the das — the receipt reads water → Wasser.",
      "explanation": "Water: T shifts to SS after short vowel = das Wasser."
    },
    {
      "id": "l5_e2",
      "type": "matching_pairs",
      "prompt": "Match the English T words to their German S/SS/Z shifts. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "t1",
          "english": "better",
          "german": "besser"
        },
        {
          "id": "t2",
          "english": "eat",
          "german": "essen"
        },
        {
          "id": "t3",
          "english": "two",
          "german": "zwei"
        },
        {
          "id": "t4",
          "english": "hate",
          "german": "hassen"
        },
        {
          "id": "recall1",
          "german": "dick und dünn",
          "english": "thick and thin"
        },
        {
          "id": "recall2",
          "german": "der Donner",
          "english": "the thunder"
        },
        {
          "id": "recall3",
          "german": "der Dorn",
          "english": "the thorn"
        },
        {
          "id": "recall4",
          "german": "der Daumen",
          "english": "the thumb"
        },
        {
          "id": "recall5",
          "german": "Wir haben Durst",
          "english": "We are thirsty"
        },
        {
          "id": "recall5b",
          "german": "Die Erde ist groß",
          "english": "The earth is large"
        },
        {
          "id": "spaced1",
          "german": "die Pflanze",
          "english": "the plant"
        },
        {
          "id": "spaced2",
          "german": "das Bad",
          "english": "the bath"
        }
      ],
      "target_answer": "besser, essen, zwei, hassen, dick und dünn, der Donner, der Dorn, der Daumen, Wir haben Durst, Die Erde ist groß, die Pflanze, das Bad",
      "meaning": "better; eat; two; hate; thick and thin; the thunder; the thorn; the thumb; We are thirsty; The earth is large; the plant; the bath",
      "shift_hint": "T → S/SS/Z",
      "explanation": "T becomes ss after vowels, and z at the start of words."
    },
    {
      "id": "l5_e3",
      "type": "shift_select",
      "prompt": "Pick the pair whose connection differs from the other three.",
      "options": [
        "thank → danken",
        "three → drei",
        "apple → Apfel",
        "think → denken"
      ],
      "target_answer": "apple → Apfel",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Think, thank and three use TH → D. Apple → Apfel uses P → PF."
    },
    {
      "id": "l5_e4",
      "type": "reverse_cognate",
      "prompt": "What native English word shares the root of 'essen'?",
      "target_answer": "eat",
      "meaning": "to eat (twin of German essen)",
      "affirmation": "You swapped the ss for a t and eat stepped out — one sibilant, one ancient stem.",
      "explanation": "German 'essen' and English 'eat' are identical Germanic stems with T → SS shift."
    },
    {
      "id": "l5_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're at a café counter asking for a drink: a glass of water, please",
      "cues": [
        "English t hisses into ss after a vowel: water → Wasser",
        "Measure phrase, no 'of': ein Glas Wasser",
        "Seal it with bitte — the cognate of English 'bid'"
      ],
      "target_answer": "Ein Glas Wasser bitte",
      "meaning": "A glass of water please",
      "vocab_hints": [
        {
          "word": "bitte",
          "translation": "please",
          "note": "cognate with English 'bid' (as in 'I bid you welcome' / 'at his bidding')—literally: '[I] bid/request it'"
        },
        {
          "word": "Glas",
          "translation": "glass",
          "note": "neuter noun: ein Glas"
        }
      ],
      "word_bank": [
        "Glas",
        "Besser",
        "Wasser",
        "bitte",
        "und",
        "Ein"
      ],
      "explanation": "Measure phrase without 'of', the T → SS receipt on Wasser, and bitte to close — your first café order, built from a thought."
    }
  ],
  "summary": {
    "outcome": "Recognize common t and s/ss/z word connections and order a simple request.",
    "use_example": {
      "german": "Ein Glas Wasser, bitte.",
      "english": "A glass of water, please."
    },
    "takeaway": "English 't' regularly maps to German 'ss', 's', or 'z'.",
    "curiosity_teaser": "Next: the tw → zw openers — zwei, Zwilling, Zwerg: the /ts/ costume party of the z-letter."
  },
  "twist": {
    "prompt": "Same order, but you're thirsty times two: a glass of water becomes two glasses of water. (German measure words don't take a plural ending.)",
    "target_answer": "Zwei Glas Wasser bitte",
    "word_bank": [
      "Zwei",
      "Glas",
      "Gläser",
      "Wasser",
      "bitte"
    ],
    "explanation": "After a number the measure word stays bare: zwei Glas Wasser — Gläser, the true plural, waits for other jobs. Friction on purpose: this exact slip is common and harmless."
  }
};

export default lesson;
