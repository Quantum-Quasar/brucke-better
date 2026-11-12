import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 7,
  "slug": "d-to-t-shift",
  "title": "The Stop Shift (D → T)",
  "subtitle": "From day to Tag, door to Tür, drink to trinken, and dream to Traum",
  "phase": 1,
  "shift_categories": [
    "d_to_t"
  ],
  "word_ids": [
    "tag",
    "tür",
    "trinken",
    "garten",
    "tochter",
    "kalt",
    "gut",
    "wort",
    "traum",
    "tisch",
    "tief"
  ],
  "table_word_ids": [
    "tag",
    "tür",
    "trinken",
    "garten",
    "tochter",
    "kalt",
    "gut",
    "wort",
    "traum",
    "tisch",
    "tief",
    "tanz",
    "taube",
    "toll",
    "abends",
    "hochzeit",
    "not"
  ],
  "hook": {
    "title": "The Consonant Domino",
    "content": "Linguistic shifts happen in chains. When ancient Germanic 'th' hardened into 'd' (think ↔ denken), the existing Germanic 'd' had to move forward to prevent words from colliding. It hardened from a voiced stop into a crisp voiceless stop: 't'. This explains why English 'd' consistently mirrors German 't'.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Devoicing of Alveolar Stops",
        "content": "Voiced alveolar stop [d] hardened into voiceless alveolar stop [t] during the Second Germanic Sound Shift."
      }
    ]
  },
  "pattern": {
    "title": "Initial, Medial, and Final D becomes T",
    "content": "Day becomes Tag. Door becomes Tür. Drink becomes trinken. Dream becomes Traum. Table becomes Tisch (via Latin discus ↔ dish ↔ Tisch: a table was historically the 'dish-board'!). In the middle and end of words, the rule holds firm: yard/garden becomes Garten, cold becomes kalt, good becomes gut, and word becomes Wort. Daughter becomes Tochter—a double shift pairing initial D → T with guttural GH → CH!",
    "footnotes": [
      {
        "marker": "2",
        "title": "Dish ↔ Tisch",
        "content": "Both languages borrowed Latin discus. English softened the end into 'dish' and kept initial d; German hardened initial d to t and palatalized the sibilant into Tisch."
      }
    ]
  },
  "exercises": [
    {
      "id": "l7_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German verb for 'to drink' using the D → T shift (drink + en):",
      "tile_options": [
        "trink",
        "Gart",
        "en",
        "st",
        "drink"
      ],
      "target_answer": "trinken",
      "meaning": "to drink",
      "shift_hint": "D → T",
      "affirmation": "You hardened the d into t and hung the -en — drink is trinken now.",
      "explanation": "Initial D hardens to T: stem 'trink-' + infinitive ending '-en' = trinken."
    },
    {
      "id": "l7_e2",
      "type": "matching_pairs",
      "prompt": "Match each English D word with its hardened German T twin. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "dt1",
          "english": "day",
          "german": "Tag"
        },
        {
          "id": "dt2",
          "english": "door",
          "german": "Tür"
        },
        {
          "id": "dt3",
          "english": "daughter",
          "german": "Tochter"
        },
        {
          "id": "dt4",
          "english": "dream",
          "german": "Traum"
        },
        {
          "id": "recall1",
          "german": "der Rauch",
          "english": "the smoke"
        },
        {
          "id": "spaced1",
          "german": "die Milch",
          "english": "the milk"
        },
        {
          "id": "spaced1b",
          "german": "der Knochen",
          "english": "the bone"
        },
        {
          "id": "spaced2",
          "german": "Wir können kauen",
          "english": "We can chew"
        },
        {
          "id": "spaced3",
          "german": "recht haben",
          "english": "to be right"
        }
      ],
      "target_answer": "Tag, Tür, Tochter, Traum, der Rauch, die Milch, der Knochen, Wir können kauen, recht haben",
      "meaning": "day; door; daughter; dream; the smoke; the milk; the bone; We can chew; to be right",
      "shift_hint": "D → T",
      "explanation": "Where English preserved Germanic D, High German hardened it into T."
    },
    {
      "id": "l7_e3",
      "type": "shift_select",
      "prompt": "Find the odd connection in this four-pair review.",
      "options": [
        "book → Buch",
        "water → Wasser",
        "better → besser",
        "eat → essen"
      ],
      "target_answer": "book → Buch",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Water, better and eat use T → SS. Book → Buch uses K → CH."
    },
    {
      "id": "l7_e4",
      "type": "derive",
      "prompt": "Apply the D → T shift: English 'cold' → German adjective:",
      "english_hint": "col·d → kal·t",
      "shift_hint": "D → T",
      "affirmation": "You hardened the final d to t — cold ends crisp, the way German likes it.",
      "target_answer": "kalt",
      "meaning": "cold",
      "explanation": "Final D hardens to T, with vowel alignment: cold ↔ kalt."
    },
    {
      "id": "l7_e5",
      "type": "transcribe",
      "prompt": "You want to say:",
      "idea": "you walk into a café at noon: you greet with good day, then say what you'll drink — cold water",
      "cues": [
        "Greet first: Guten Tag — both words run D → T",
        "Who drinks? → ich trinke (drink → trink-)",
        "What? → kaltes Wasser: cold → kalt, with the -es ending of neuter Wasser"
      ],
      "target_answer": "Guten Tag ich trinke kaltes Wasser",
      "meaning": "Good day! I drink cold water",
      "vocab_hints": [
        {
          "word": "Guten Tag",
          "translation": "good day",
          "note": "D → T shift in both words: good ↔ gut, day ↔ Tag"
        },
        {
          "word": "trinke",
          "translation": "drink (1st person)",
          "note": "D → T shift: drink ↔ trink"
        },
        {
          "word": "Wasser",
          "translation": "water",
          "note": "T → SS shift: water ↔ Wasser"
        }
      ],
      "word_bank": [
        "trinke",
        "Guten",
        "ich",
        "Wasser",
        "kaltes",
        "trinkst",
        "Tag"
      ],
      "explanation": "Greeting formula, then subject + verb in position 2 + object — a whole little scene, built from a thought."
    }
  ],
  "summary": {
    "outcome": "Use a few d/t cognates in a greeting and a simple present-tense sentence.",
    "use_example": {
      "german": "Guten Tag! Ich trinke kaltes Wasser.",
      "english": "Good day! I drink cold water."
    },
    "takeaway": "English 'd' systematically corresponds to German 't' at the beginning, middle, and end of words.",
    "curiosity_teaser": "Next: the double-shift detectives — deep becomes tief and daughter becomes Tochter: two rules at once."
  },
  "twist": {
    "prompt": "Same water, shared: I drink cold water becomes we drink cold water. (The verb ending goes back to the stem.)",
    "target_answer": "Wir trinken kaltes Wasser",
    "word_bank": [
      "trinke",
      "trinken",
      "kaltes",
      "Wasser",
      "Wir"
    ],
    "explanation": "ich trinke → wir trinken: the ending returns to the bare stem's -en, the one the dictionary form wears. And kaltes Wasser doesn't budge."
  }
};

export default lesson;
