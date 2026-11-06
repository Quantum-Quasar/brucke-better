import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2701,
  "slug": "lesson-2701",
  "title": "It Is Needed",
  "subtitle": "il faut + infinitive (il faut partir, il faut voir) and il me faut + noun.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "faut",
    "me",
    "te",
    "nous",
    "vous",
    "aller",
    "venir",
    "confirmer",
    "billet",
    "pain"
  ],
  "table_word_ids": [
    "faut",
    "me",
    "te",
    "nous",
    "vous",
    "aller",
    "venir",
    "confirmer",
    "billet",
    "pain"
  ],
  "hook": {
    "title": "il faut: Obligation and Need Without Pointing a Finger",
    "content": "Followed by an infinitive, il faut expresses obligation (Il faut confirmer 'We/you need to confirm'). Followed by a noun and paired with me, te, nous, vous, il me faut means 'I need [something]': Il me faut un billet ('I need a ticket'), Qu'est-ce qu'il vous faut ? ('What do you need?')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How 'Il me faut du temps' and 'J'ai besoin de temps' are sister ways to say 'I need time'",
        "content": "French gives you two everyday ways to say 'I need X': J'ai besoin de X and Il me faut X!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Il faut + Infinitive ('Must do'); Il me/te/vous faut + Noun ('Need [a thing]')",
    "content": "Practice both patterns and negate them with Il ne faut pas.",
    "linguist_note": "Dative experiencer + impersonal falloir (Il me faut un livre) parallels dative-need constructions across Romance.",
    "trap_note": "Remember: Il ne faut pas partir means 'You/we MUST NOT leave' (prohibition)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each il faut expression with its natural English translation:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il faut réserver",
          "german": "We / you must reserve"
        },
        {
          "id": "p2",
          "english": "Il ne faut pas oublier",
          "german": "We / you must not forget"
        },
        {
          "id": "p3",
          "english": "Il me faut un café",
          "german": "I need a coffee"
        },
        {
          "id": "p4",
          "english": "Il nous faut deux billets",
          "german": "We need two tickets"
        },
        {
          "id": "p5",
          "english": "Qu'est-ce qu'il vous faut ?",
          "german": "What do you need?"
        }
      ],
      "target_answer": "We / you must reserve, We / you must not forget, I need a coffee, We need two tickets, What do you need?",
      "meaning": "Il faut réserver, Il ne faut pas oublier, Il me faut un café, Il nous faut deux billets, Qu'est-ce qu'il vous faut ?",
      "explanation": "me, te, nous, vous before faut tell who needs the item.",
      "id": "fr2701_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Il nous faut deux tables'?",
      "german": "Il nous faut deux tables",
      "natural": "We need two tables",
      "options": [
        "We need two tables",
        "We must have two tables",
        "It to-us is-needed two tables"
      ],
      "target_answer": "It to-us is-needed two tables",
      "meaning": "Literal structure: It to-us is-needed two tables",
      "explanation": "il ('it') + nous ('to-us') + faut ('is-needed') + deux tables.",
      "id": "fr2701_e2"
    },
    {
      "type": "shift_select",
      "prompt": "A baker asks you 'Qu'est-ce qu'il vous faut ?' How do you answer 'I need some bread' using 'faut'?",
      "options": [
        "Il me faut du pain",
        "Je me faut du pain",
        "Il faut moi du pain"
      ],
      "target_answer": "Il me faut du pain",
      "meaning": "I need some bread",
      "explanation": "Keep impersonal Il at the start and place me before faut: Il me faut du pain.",
      "id": "fr2701_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we need to confirm the reservation today (using Il faut)",
      "cues": [
        "It is needed to confirm → Il faut confirmer",
        "the reservation today → la réservation aujourd'hui"
      ],
      "idea_parts": [
        "necessity + infinitive → Il faut confirmer",
        "object + time → la réservation aujourd'hui"
      ],
      "target_answer": "Il faut confirmer la réservation aujourd'hui",
      "meaning": "We/you need to confirm the reservation today",
      "word_bank": [
        "Il",
        "la",
        "le",
        "aujourd'hui",
        "réservation",
        "Nous",
        "faut",
        "confirmer"
      ],
      "explanation": "Il faut + bare infinitive confirmer.",
      "diagnosis": {
        "slip": "used Nous with faut",
        "cue": "faut only ever takes impersonal Il: Il faut confirmer."
      },
      "id": "fr2701_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il me faut dix minutes pour finir",
      "replays": 2,
      "target_answer": "Il me faut dix minutes pour finir",
      "meaning": "I need ten minutes to finish",
      "cues": [
        "Il me faut dix minutes",
        "pour finir"
      ],
      "explanation": "Il me faut dix minutes + pour finir ('in order to finish').",
      "affirmation": "You paired Il me faut with pour finir cleanly.",
      "id": "fr2701_e5"
    }
  ],
  "summary": {
    "outcome": "Use il faut + infinitive for obligations and il me/te/nous/vous faut + noun for 'needing things'.",
    "use_example": {
      "german": "Qu'est-ce qu'il te faut ? — Il me faut mon billet.",
      "english": "What do you need? — I need my ticket."
    },
    "takeaway": "Il faut + verb = 'must [verb]'; Il me faut + noun = 'I need [noun]'.",
    "curiosity_teaser": "Up next on Le Pont ([2702] The Subjunctive Door): see how It Is Needed leads directly into The Subjunctive Door."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We/you need to confirm the reservation today\" in French:",
    "target_answer": "Il faut confirmer la réservation aujourd'hui",
    "word_bank": [
      "faut",
      "aujourd'hui",
      "pas",
      "confirmer",
      "Il",
      "ne",
      "réservation",
      "la"
    ],
    "explanation": "Re-constructing \"Il faut confirmer la réservation aujourd'hui\" from the underlying rule cements the pattern of It Is Needed."
  }
};

export default lesson;
