import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2201,
  "slug": "the-feminine-squad",
  "title": "The Feminine Squad",
  "subtitle": "-ung, -heit, -keit drills: derive abstract nouns and their genders",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "warnen",
    "wahrnehmung",
    "zeit",
    "lernen",
    "rechnung",
    "blume",
    "lampe",
    "bluse",
    "zeitung",
    "berg",
    "flugzeug",
    "briefmarke"
  ],
  "table_word_ids": [
    "warnen",
    "wahrnehmung",
    "zeit",
    "lernen",
    "rechnung",
    "blume",
    "lampe",
    "bluse",
    "zeitung",
    "berg",
    "flugzeug",
    "briefmarke",
    "wolle",
    "außerdem",
    "staat"
  ],
  "hook": {
    "title": "The Noun Factory With One Gender",
    "content": "German builds abstract nouns on an assembly line, and the line stamps one gender: feminine. Verb + -ung: warnen → die Warnung, wandern → die Wanderung. Adjective + -heit: gesund → die Gesundheit (health). Adjective + -keit: möglich → die Möglichkeit (possibility). Noun + -schaft: wissen → die Wissenschaft (knowledge-ship, science). English used to run the same factory with -ness and -ship — 'friendship' is -schaft's sister suffix — but German never closed the line.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The -ung Rule Has No Exceptions",
        "content": "Every single -ung noun in German is feminine. No committee, no exceptions, no history of drift. It is the most reliable gender law in the language — and it works on verbs you have never seen: meet a new verb, add -ung, collect die."
      }
    ]
  },
  "pattern": {
    "title": "Four Stamps, Fifteen Nouns",
    "content": "Stamp one, verb + -ung: warnen → die Warnung, wandern → die Wanderung (the hike), bilden → die Bildung (education). Stamp two, adjective + -heit: gesund → die Gesundheit, schön → die Schönheit (beauty), wahr → die Wahrheit (truth — the same wahr as in Wahrnehmung, 'truth-taking'!). Stamp three, adjective + -keit: möglich → die Möglichkeit, freundlich → die Freundlichkeit (friendliness). Stamp four, noun + -schaft: wissen → die Wissenschaft, Freund → die Freundschaft (friendship — English's own suffix, fossilized). Derivation recipe: chop the verb's -en or the adjective's bare form, glue the stamp, collect die.",
    "footnotes": [],
    "linguist_note": "-heit/-keit/-ung nouns are almost all Latin-era calque technology — Wahrnehmung, Wissenschaft and Gesundheit were built or rebuilt when German scholars translated Latin scholarship. The feminine gender rode in with the suffixes."
  },
  "exercises": [
    {
      "id": "l2201_e1",
      "type": "shift_select",
      "prompt": "Factory check: what gender does -schaft stamp?",
      "options": [
        "feminine — die Wissenschaft, die Freundschaft",
        "masculine",
        "no article",
        "neuter"
      ],
      "target_answer": "feminine — die Wissenschaft, die Freundschaft",
      "meaning": "-schaft → die",
      "explanation": "knowledge-ship and friend-ship are both die — and English's own '-ship' is the sister suffix. die Zeitung already wears the -ung twin of this law."
    },
    {
      "id": "l2201_e2",
      "type": "derive",
      "prompt": "Run stamp one: 'wandern' → the -ung noun (the hike):",
      "english_hint": "wandern → Wander + ung",
      "target_answer": "Wanderung",
      "meaning": "die Wanderung — the hike",
      "explanation": "Chop -en, glue -ung: die Wanderung. Your hiking verb now has a noun form — feminine, by law."
    },
    {
      "id": "l2201_e3",
      "type": "shift_select",
      "prompt": "Which noun does the -heit stamp produce from 'gesund' (healthy)?",
      "options": [
        "die Gesunder",
        "die Gesundheit (health)",
        "das Gesundheit",
        "der Gesundheit"
      ],
      "target_answer": "die Gesundheit (health)",
      "meaning": "gesund + heit = die Gesundheit",
      "explanation": "Adjective + -heit → feminine abstract noun. Gesundheit — the word you say when someone sneezes."
    },
    {
      "id": "l2201_e4",
      "type": "matching_pairs",
      "prompt": "Match each stamped noun with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "fs1",
          "english": "the warning",
          "german": "die Warnung"
        },
        {
          "id": "fs2",
          "english": "the truth",
          "german": "die Wahrheit"
        },
        {
          "id": "fs3",
          "english": "the possibility",
          "german": "die Möglichkeit"
        },
        {
          "id": "fs4",
          "english": "the science / knowledge-ship",
          "german": "die Wissenschaft"
        },
        {
          "id": "fs5",
          "english": "the bill (the reckoning)",
          "german": "die Rechnung"
        },
        {
          "id": "fs6",
          "english": "the flower",
          "german": "die Blume"
        },
        {
          "id": "fs7",
          "english": "the lamp",
          "german": "die Lampe"
        },
        {
          "id": "fs8",
          "english": "the blouse",
          "german": "die Bluse"
        },
        {
          "id": "recall1",
          "german": "meine Wahrnehmung",
          "english": "my perception"
        },
        {
          "id": "recall2",
          "german": "ein Begriff",
          "english": "a concept"
        },
        {
          "id": "recall3",
          "german": "der Berg",
          "english": "the mountain"
        },
        {
          "id": "context1",
          "german": "Fußball im Garten",
          "english": "football in the garden"
        }
      ],
      "target_answer": "die Warnung, die Wahrheit, die Möglichkeit, die Wissenschaft, die Rechnung, die Blume, die Lampe, die Bluse, meine Wahrnehmung, ein Begriff, der Berg, Fußball im Garten",
      "meaning": "the warning; the truth; the possibility; the science / knowledge-ship; the bill (the reckoning); the flower; the lamp; the blouse; my perception; a concept; the mountain; football in the garden",
      "explanation": "Four stamps, one gender — the entire feminine abstract factory in four words, and four plain-die nouns (Rechnung, Blume, Lampe, Bluse) marching in step."
    },
    {
      "id": "l2201_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The truth is good' (die Wahrheit)",
      "target_answer": "Die Wahrheit ist gut",
      "meaning": "Die Wahrheit ist gut = The truth is good",
      "word_bank": [
        "ist",
        "aus",
        "gut",
        "wenn",
        "Wahrheit",
        "Die"
      ],
      "explanation": "wahr (true) + -heit → die Wahrheit — the feminine squad carrying a philosophical sentence. (der Berg and das Flugzeug stay outside — no feminine suffix, no membership.)"
    }
  ],
  "summary": {
    "outcome": "Derive -ung/-heit/-keit/-schaft nouns and stamp die on them automatically.",
    "use_example": {
      "german": "Die Wahrheit ist gut.",
      "english": "The truth is good."
    },
    "takeaway": "Four suffix stamps — -ung, -heit, -keit, -schaft — build abstract nouns, and every one arrives feminine.",
    "curiosity_teaser": "Next: the Guess-the-Gender Game — unseen words, suffix laws, explanation feedback."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We warn here today\"",
    "target_answer": "Wir warnen heute hier",
    "word_bank": [
      "sehr",
      "Wir",
      "warnen",
      "hier",
      "heute",
      "nicht"
    ],
    "explanation": "Building \"Wir warnen heute hier\" from the lesson's core pattern locks in The Feminine Squad."
  }
};

export default lesson;
