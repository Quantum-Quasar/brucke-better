import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1502,
  "slug": "lesson-1502",
  "title": "Four Score & Seven",
  "subtitle": "soixante-dix (60+10), quatre-vingts (4×20), and expressing age with avoir (j'ai trente ans).",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "vingt",
    "trente",
    "soixante",
    "quatre_vingts",
    "cent",
    "ans",
    "avoir",
    "jai"
  ],
  "table_word_ids": [
    "vingt",
    "trente",
    "soixante",
    "quatre_vingts",
    "cent",
    "ans",
    "avoir",
    "jai"
  ],
  "hook": {
    "title": "Counting by Twenties and Carrying Your Years",
    "content": "Past sixty (soixante), French switches into its Celtic twenty-based gear: 70 is soixante-dix (60 + 10), 80 is quatre-vingts (4 × 20), 90 is quatre-vingt-dix (4 × 20 + 10), and 100 is cent! Combine these with J'ai… ans to state any age.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why quatre-vingts drops its -s when another number follows",
        "content": "On 80 alone, quatre-vingts keeps the plural -s on vingts ('four twenties'). When another number follows (quatre-vingt-dix), vingt drops its -s!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "60+10 = 70, 4×20 = 80, 4×20+10 = 90",
    "content": "Hear the arithmetic inside the number, and always pair ages with avoir + ans: Il a quatre-vingts ans ('He is eighty years old').",
    "linguist_note": "Vigesimal numeral composition (quatre-vingts) is an areal feature of Gallo-Romance.",
    "trap_note": "Never say *un cent for 'one hundred' — French says bare cent!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each higher French number with its arithmetic breakdown:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "trente (30)",
          "german": "thirty"
        },
        {
          "id": "p2",
          "english": "soixante (60)",
          "german": "sixty"
        },
        {
          "id": "p3",
          "english": "soixante-dix (60 + 10)",
          "german": "seventy (70)"
        },
        {
          "id": "p4",
          "english": "quatre-vingts (4 × 20)",
          "german": "eighty (80)"
        },
        {
          "id": "p5",
          "english": "cent (bare, no 'un'!)",
          "german": "one hundred (100)"
        }
      ],
      "target_answer": "thirty, sixty, seventy (70), eighty (80), one hundred (100)",
      "meaning": "trente (30), soixante (60), soixante-dix (60 + 10), quatre-vingts (4 × 20), cent (bare, no 'un'!)",
      "explanation": "70 builds on 60; 80 and 90 build on four-twenties.",
      "id": "fr1502_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word breakdown of 'quatre-vingts ans'?",
      "german": "quatre-vingts ans",
      "natural": "eighty years",
      "options": [
        "four-twenties years",
        "eighty years",
        "four-twenty of years"
      ],
      "target_answer": "four-twenties years",
      "meaning": "Literal structure: four-twenties years",
      "explanation": "quatre (four) + vingts (twenties) + ans (years).",
      "id": "fr1502_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'one hundred euros' in French?",
      "options": [
        "un cent euros",
        "cent euros",
        "cents euros"
      ],
      "target_answer": "cent euros",
      "meaning": "one hundred euros",
      "explanation": "French never puts un before cent: bare cent euros!",
      "id": "fr1502_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "my father is sixty years old",
      "cues": [
        "My father has sixty years → Mon père a soixante ans"
      ],
      "idea_parts": [
        "subject → Mon père",
        "verb + age → a soixante ans"
      ],
      "target_answer": "Mon père a soixante ans",
      "meaning": "My father is sixty years old",
      "word_bank": [
        "est",
        "père",
        "ans",
        "trente",
        "a",
        "soixante",
        "Mon"
      ],
      "explanation": "Use avoir (a) + soixante ans.",
      "diagnosis": {
        "slip": "used est instead of a",
        "cue": "Age always uses avoir: Mon père a soixante ans."
      },
      "id": "fr1502_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est quatre-vingts euros, s'il vous plaît",
      "replays": 2,
      "target_answer": "C'est quatre-vingts euros, s'il vous plaît",
      "meaning": "That is eighty euros, please",
      "cues": [
        "C'est quatre-vingts euros",
        "s'il vous plaît"
      ],
      "explanation": "quatre-vingts keeps its -s when no smaller number follows.",
      "affirmation": "You spelled quatre-vingts with its hyphen and plural -s.",
      "id": "fr1502_e5"
    }
  ],
  "summary": {
    "outcome": "Use trente, soixante, quatre-vingts, and cent in prices and ages with avoir.",
    "use_example": {
      "german": "Ma grand-mère a quatre-vingts ans.",
      "english": "My grandmother is eighty years old."
    },
    "takeaway": "70 is sixty-ten, 80 is four-twenties, and 100 is bare cent.",
    "curiosity_teaser": "Up next on Le Pont ([16] Days, Months & Dates): see how Four Score & Seven leads directly into Days, Months & Dates."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"My father is sixty years old\" in French:",
    "target_answer": "Mon père a soixante ans",
    "word_bank": [
      "Mon",
      "père",
      "ne",
      "pas",
      "soixante",
      "ans",
      "a"
    ],
    "explanation": "Re-constructing \"Mon père a soixante ans\" from the underlying rule cements the pattern of Four Score & Seven."
  }
};

export default lesson;
