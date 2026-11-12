import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5082,
  "slug": "lesson-5082",
  "title": "Le dimanche de Marie",
  "subtitle": "chain the reflexives with clock phrases — a whole day, from wake to sleep",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "lever",
    "laver",
    "habiller",
    "coucher",
    "appeler",
    "heure",
    "sept",
    "dimanche"
  ],
  "table_word_ids": [
    "lever",
    "laver",
    "habiller",
    "coucher",
    "heure",
    "sept",
    "dimanche"
  ],
  "hook": {
    "title": "One Day, One Chain",
    "content": "Lesson 5081 ran the morning round: se lever, se laver, s'habiller, se coucher. Now stretch the chain across a whole day and hang it on the clock: Le dimanche, je me lève à sept heures. The reflexive pair (me + verb) carries the action; à + heure carries the time.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Le + weekday = every",
        "content": "From Topic 16: le dimanche means 'on Sundays, every Sunday' — the article turns one day into a habit. Marie's Sunday is Marie's routine, not one date on a calendar.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Reflexive Pair + Time Anchor",
    "content": "Le dimanche, je me lève à sept heures. Je m'habille, je me lave, et je me couche à dix heures. The pair (me/te/se + verb) walks together through the day; à + number + heures reads the clock.",
    "linguist_note": "à sept heures — the clock takes à exactly where English says 'at seven'; the hour word is the same Latin hora English kept in 'hour'.",
    "trap_note": "Don't drop the little pronoun when the sentence grows: je me lève, tu te laves — the pair travels as one word-shape."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each moment of the day with its French sentence:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I get up at seven",
          "german": "Je me lève à sept heures"
        },
        {
          "id": "p2",
          "english": "I get dressed",
          "german": "Je m'habille"
        },
        {
          "id": "p3",
          "english": "I wash myself",
          "german": "Je me lave"
        },
        {
          "id": "p4",
          "english": "I go to bed",
          "german": "Je me couche"
        },
        {
          "id": "p5",
          "english": "every Sunday",
          "german": "le dimanche"
        }
      ],
      "target_answer": "Je me lève à sept heures, Je m'habille, Je me lave, Je me couche, le dimanche",
      "meaning": "I get up at seven, I get dressed, I wash myself, I go to bed, every Sunday",
      "explanation": "One chain: lever → laver → habiller → coucher, each with its pronoun attached.",
      "id": "fr5082_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'every Sunday' (the habitual sense)?",
      "options": [
        "Le dimanche",
        "Dimanche",
        "La dimanche"
      ],
      "target_answer": "Le dimanche",
      "meaning": "every Sunday",
      "explanation": "Le dimanche — le before a weekday turns a single day into a weekly habit (Topic 16's rule).",
      "id": "fr5082_e2"
    },
    {
      "type": "derive",
      "prompt": "Complete the reflexive: 'Je me ___' — you rise in the morning:",
      "english_hint": "se lever = to get oneself up",
      "target_answer": "lève",
      "meaning": "I get up",
      "explanation": "Je me lève — the verb from se lever with its accent and its pronoun still attached.",
      "id": "fr5082_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: every Sunday I get up at eight (use huit)",
      "cues": [
        "the habit: Le dimanche",
        "the pair: je me lève; the clock: à huit heures"
      ],
      "idea_parts": [
        "every Sunday → Le dimanche",
        "I get up at eight → je me lève à huit heures"
      ],
      "target_answer": "Le dimanche, je me lève à huit heures",
      "meaning": "Every Sunday I get up at eight o'clock",
      "word_bank": [
        "Le",
        "dimanche",
        "je",
        "me",
        "lève",
        "à",
        "huit",
        "heures",
        "sept"
      ],
      "explanation": "Le dimanche, je me lève à huit heures — habit, reflexive pair, and clock in one sentence.",
      "diagnosis": {
        "slip": "dropped the pronoun me",
        "cue": "The pair travels together: je me lève, never *je lève."
      },
      "id": "fr5082_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je me couche à dix heures",
      "replays": 2,
      "target_answer": "Je me couche à dix heures",
      "meaning": "I go to bed at ten o'clock",
      "cues": [
        "It means: I go to bed at ten o'clock",
        "The pair: me couche; the clock: à dix heures"
      ],
      "explanation": "Je me couche à dix heures — the day's last reflexive, parked on the clock.",
      "affirmation": "You wrote the day's final link with its pronoun and its clock.",
      "id": "fr5082_e5"
    }
  ],
  "summary": {
    "outcome": "Chain daily reflexives with clock phrases (à + heures) and le + weekday habits.",
    "use_example": {
      "german": "Le dimanche, je me lève à huit heures",
      "english": "Every Sunday I get up at eight o'clock"
    },
    "takeaway": "The reflexive pair walks together; the clock rides on à.",
    "curiosity_teaser": "Up next on Le Pont ([25] il y a): see how Le dimanche de Marie leads directly into il y a."
  },
  "twist": {
    "prompt": "Think it through again without looking back — say: every Sunday I get up at seven:",
    "target_answer": "Le dimanche, je me lève à sept heures",
    "word_bank": [
      "Le",
      "dimanche",
      "je",
      "me",
      "lève",
      "à",
      "sept",
      "heures",
      "huit"
    ],
    "explanation": "Rebuilding \"Le dimanche, je me lève à sept heures\" — habit frame, pair, and clock."
  }
};

export default lesson;
