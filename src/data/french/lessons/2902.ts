import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2902,
  "slug": "lesson-2902",
  "title": "The Register Ladder Recap",
  "subtitle": "Walking the 9 conversion bridges from English formal register into everyday French.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "confirmation",
    "confirmer",
    "université",
    "différence",
    "exactement",
    "docteur",
    "possible",
    "hôtel",
    "mangé"
  ],
  "table_word_ids": [
    "confirmation",
    "confirmer",
    "université",
    "différence",
    "exactement",
    "docteur",
    "possible",
    "hôtel",
    "mangé"
  ],
  "hook": {
    "title": "Walking All Nine Conversion Bridges in One Circuit",
    "content": "Review all 9 conversion bridges that connect your formal English vocabulary directly to French: -ion, -ation→-er, -ité, -ance/-ence, -ed↔-é, -ly→-ment, -or→-eur, -able/-ible, and Norman Doublets!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How one Latin root rides across four bridges at once",
        "content": "Take 'possible / différ-': la possibilité (-ité), possible (-ible), la différence (-ence), différemment (-ment) — one root, four bridges!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "See the English Suffix, Fire the French Bridge",
    "content": "Run a rapid synthesis across all nine conversion families.",
    "linguist_note": "Shared Latin-Norman derivational suffixes account for over 65% of shared English-French lexical density.",
    "trap_note": "Remember the gender locks: -ion, -ité, -ance, -ence are 100% feminine (la/une)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each conversion bridge with its rule and gender lock:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "-ion & -ité (la tradition, la liberté)",
          "german": "100% Feminine nouns"
        },
        {
          "id": "p2",
          "english": "-ance & -ence (l'importance, la patience)",
          "german": "100% Feminine nouns"
        },
        {
          "id": "p3",
          "english": "-ation → -er (organiser, célébrer)",
          "german": "Active infinitive verbs"
        },
        {
          "id": "p4",
          "english": "-ly → feminine + -ment (naturellement)",
          "german": "Manner adverbs"
        },
        {
          "id": "p5",
          "english": "-able / -ible (capable, visible)",
          "german": "Gender-invariable adjectives"
        }
      ],
      "target_answer": "100% Feminine nouns, 100% Feminine nouns, Active infinitive verbs, Manner adverbs, Gender-invariable adjectives",
      "meaning": "-ion & -ité (la tradition, la liberté), -ance & -ence (l'importance, la patience), -ation → -er (organiser, célébrer), -ly → feminine + -ment (naturellement), -able / -ible (capable, visible)",
      "explanation": "Nine bridges unlock thousands of French words from English you already know.",
      "id": "fr2902_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which sentence below uses four conversion bridges at once without a single error?",
      "options": [
        "Naturelment, c'est une décision possible à l'université",
        "Naturellement, c'est un décision possible à le université",
        "Naturellement, c'est une décision possible à l'université"
      ],
      "target_answer": "Naturellement, c'est une décision possible à l'université",
      "meaning": "Naturally (-ment), it is a possible (-ible) decision (-ion, f.) at the university (-ité, elided)",
      "explanation": "naturelle + ment, feminine une décision, invariable possible, and elided l'université.",
      "id": "fr2902_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert the English phrase 'really impossible' using the -ment and -ible bridges:",
      "english_hint": "vrai+ment + impossible",
      "target_answer": "vraiment impossible",
      "meaning": "really impossible",
      "explanation": "vraiment + impossible.",
      "id": "fr2902_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "fortunately it is possible to confirm the reservation",
      "cues": [
        "Fortunately → Heureusement",
        "it is possible to confirm → c'est possible de confirmer",
        "the reservation → la réservation"
      ],
      "idea_parts": [
        "adverb → Heureusement",
        "pointer + adjective + verb → c'est possible de confirmer",
        "object → la réservation"
      ],
      "target_answer": "Heureusement, c'est possible de confirmer la réservation",
      "meaning": "Fortunately, it is possible to confirm the reservation",
      "word_bank": [
        "possible",
        "un",
        "réservation",
        "la",
        "de",
        "confirmer",
        "c'est",
        "le",
        "Heureusement"
      ],
      "explanation": "Combines -ment, -ible, -ation→-er, and -ion!",
      "diagnosis": {
        "slip": "used le réservation",
        "cue": "la réservation is feminine."
      },
      "id": "fr2902_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le directeur a confirmé la décision immédiatement",
      "replays": 2,
      "target_answer": "Le directeur a confirmé la décision immédiatement",
      "meaning": "The director confirmed the decision immediately",
      "cues": [
        "Le directeur",
        "a confirmé la décision",
        "immédiatement"
      ],
      "explanation": "Four bridges in one natural sentence!",
      "affirmation": "You combined -eur, -é, -ion, and -ment effortlessly.",
      "id": "fr2902_e5"
    }
  ],
  "summary": {
    "outcome": "Synthesize all 9 conversion bridges across nouns, verbs, adjectives, and adverbs.",
    "use_example": {
      "german": "Finalement, l'organisation a confirmé la possibilité.",
      "english": "Finally, the organization confirmed the possibility."
    },
    "takeaway": "Nine suffix bridges turn your English vocabulary into a live French lexicon.",
    "curiosity_teaser": "Up next on Le Pont ([2903] Spoken French Shortcuts): see how The Register Ladder Recap leads directly into Spoken French Shortcuts."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Fortunately, it is possible to confirm the reservation\" in French:",
    "target_answer": "Heureusement, c'est possible de confirmer la réservation",
    "word_bank": [
      "possible",
      "Heureusement",
      "de",
      "réservation",
      "la",
      "pas",
      "c'est",
      "confirmer",
      "ne"
    ],
    "explanation": "Re-constructing \"Heureusement, c'est possible de confirmer la réservation\" from the underlying rule cements the pattern of The Register Ladder Recap."
  }
};

export default lesson;
