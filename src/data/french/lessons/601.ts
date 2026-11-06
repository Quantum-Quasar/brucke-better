import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 601,
  "slug": "sprig-601",
  "title": "The Feminine Squad",
  "subtitle": "-ion, -ité, -ance: convert 12 nouns and read their gender straight off the ending.",
  "phase": 1,
  "shift_categories": [
    "ion",
    "ite",
    "ance"
  ],
  "word_ids": [
    "université",
    "possibilité",
    "liberté",
    "différence",
    "importance",
    "expérience",
    "patience",
    "chance"
  ],
  "table_word_ids": [
    "université",
    "possibilité",
    "liberté",
    "différence",
    "importance",
    "expérience",
    "patience",
    "chance"
  ],
  "hook": {
    "title": "Reading Gender Off the Tail of the Word",
    "content": "Every single noun ending in -ion, -ité, -ance, or -ence belongs to the Feminine Squad: la tradition, la liberté, la patience, l'expérience. Even when l' hides the vowel of la before a vowel-initial noun (l'université, l'importance), any adjective describing it still wears its feminine -e!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Over 4,000 feminine nouns from four suffixes",
        "content": "Between -ion, -ité, and -ance/-ence, these four endings alone guarantee feminine gender for over 4,000 common French words.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Four-Suffix Feminine Reflex",
    "content": "Glance at the right edge of the noun before choosing the article or adjective: -ion, -ité, -ance, -ence = 100% feminine (la / une + feminine adjective).",
    "linguist_note": "Suffix-driven gender assignment is deterministic across Latinate abstract nouns in French.",
    "trap_note": "Don't let elided l' hide the feminine gender of l'université or l'expérience — adjectives after them still take feminine -e!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English abstract noun to its French Feminine Squad twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the possibility (-ité)",
          "german": "la possibilité"
        },
        {
          "id": "p2",
          "english": "the experience (-ence)",
          "german": "l'expérience"
        },
        {
          "id": "p3",
          "english": "the patience (-ence)",
          "german": "la patience"
        },
        {
          "id": "p4",
          "english": "the luck / chance (-ance)",
          "german": "la chance"
        },
        {
          "id": "p5",
          "english": "the reality (-ité)",
          "german": "la réalité"
        }
      ],
      "target_answer": "la possibilité, l'expérience, la patience, la chance, la réalité",
      "meaning": "the possibility (-ité), the experience (-ence), the patience (-ence), the luck / chance (-ance), the reality (-ité)",
      "explanation": "All five belong to the Feminine Squad.",
      "id": "fr601_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which adjective form correctly completes 'L'université est ___' ('The university is big')?",
      "options": [
        "grands",
        "grand",
        "grande"
      ],
      "target_answer": "grande",
      "meaning": "L'université est grande",
      "explanation": "université ends in -ité (feminine), so grand becomes grande!",
      "id": "fr601_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert with feminine article: 'the patience' →",
      "english_hint": "-ence stays whole",
      "target_answer": "la patience",
      "meaning": "the patience",
      "explanation": "la patience (/la pasjɑ̃s/).",
      "id": "fr601_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "it is a good experience",
      "cues": [
        "It is → C'est",
        "a good (feminine) → une bonne",
        "experience → expérience"
      ],
      "idea_parts": [
        "pointer → C'est",
        "feminine article + adj → une bonne",
        "noun → expérience"
      ],
      "target_answer": "C'est une bonne expérience",
      "meaning": "It is a good experience",
      "word_bank": [
        "bon",
        "une",
        "un",
        "C'est",
        "expérience",
        "bonne"
      ],
      "explanation": "expérience ends in -ence (feminine), triggering une bonne.",
      "diagnosis": {
        "slip": "used un bon",
        "cue": "-ence nouns are feminine: une bonne expérience."
      },
      "id": "fr601_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La patience est une grande qualité",
      "replays": 2,
      "target_answer": "La patience est une grande qualité",
      "meaning": "Patience is a great quality",
      "cues": [
        "La patience est",
        "une grande qualité"
      ],
      "explanation": "Both patience (-ence) and qualité (-ité) are feminine.",
      "affirmation": "You paired both feminine nouns with la and une grande.",
      "id": "fr601_e5"
    }
  ],
  "summary": {
    "outcome": "Instantly assign feminine gender and adjective agreement across -ion, -ité, -ance, and -ence nouns.",
    "use_example": {
      "german": "La patience est une grande qualité.",
      "english": "Patience is a great quality."
    },
    "takeaway": "Glance at the suffix first: -ion, -ité, -ance, -ence = 100% feminine.",
    "curiosity_teaser": "Up next on Le Pont ([602] Liberté & Society Sentences): see how The Feminine Squad leads directly into Liberté & Society Sentences."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"It is a good experience\" in French:",
    "target_answer": "C'est une bonne expérience",
    "word_bank": [
      "ne",
      "expérience",
      "C'est",
      "pas",
      "bonne",
      "une"
    ],
    "explanation": "Re-constructing \"C'est une bonne expérience\" from the underlying rule cements the pattern of The Feminine Squad."
  }
};

export default lesson;
