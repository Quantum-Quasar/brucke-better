import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1801,
  "slug": "lesson-1801",
  "title": "The être House",
  "subtitle": "allé, arrivé, venu, parti, sorti, monté, descendu, resté, tombé, né — the doorway-and-motion verb house.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "allé",
    "arrivé",
    "venu",
    "parti",
    "sorti",
    "monté",
    "descendu",
    "resté",
    "tombé",
    "né",
    "être"
  ],
  "table_word_ids": [
    "allé",
    "arrivé",
    "venu",
    "parti",
    "sorti",
    "monté",
    "descendu",
    "resté",
    "tombé",
    "né",
    "être"
  ],
  "hook": {
    "title": "Touring the être House: Opposite Pairs of Motion",
    "content": "The verbs that take être in the past live together in natural opposite pairs inside one house: aller ↔ venir (allé / venu), arriver ↔ partir (arrivé / parti), entrer ↔ sortir (entré / sorti), monter ↔ descendre (monté / descendu), plus rester (resté), tomber (tombé), and naître (né)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How prefixed cousins of venir also live in the être house",
        "content": "revenir ('to come back') and devenir ('to become') are built on venir, so they take être too: je suis revenu, il est devenu!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "avoir for Outside Action; être for Whole-Body Motion & Doorways",
    "content": "Use être (je suis, tu es, il est, nous sommes, vous êtes, ils sont) for whole-body motion and doorway verbs.",
    "linguist_note": "Unaccusative motion/change-of-state verbs select être across all compound tenses in French.",
    "trap_note": "Remember: aller, venir, arriver, partir, entrer, sortir, rester, tomber, naître all take être in the past!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each être-house verb pair in the passé composé:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "je suis allé (I went)",
          "german": "je suis venu (I came)"
        },
        {
          "id": "p2",
          "english": "il est arrivé (he arrived)",
          "german": "il est parti (he left)"
        },
        {
          "id": "p3",
          "english": "il est entré (he went in)",
          "german": "il est sorti (he went out)"
        },
        {
          "id": "p4",
          "english": "il est monté (he went up)",
          "german": "il est descendu (he went down)"
        },
        {
          "id": "p5",
          "english": "il est resté (he stayed)",
          "german": "il est tombé (he fell)"
        }
      ],
      "target_answer": "je suis venu (I came), il est parti (he left), il est sorti (he went out), il est descendu (he went down), il est tombé (he fell)",
      "meaning": "je suis allé (I went), il est arrivé (he arrived), il est entré (he went in), il est monté (he went up), il est resté (he stayed)",
      "explanation": "Every verb in these opposite pairs takes être in the past.",
      "id": "fr1801_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I came back yesterday' using 'revenir' (built on venir)?",
      "options": [
        "Je suis revenu hier",
        "J'ai revenu hier",
        "Je suis revenir hier"
      ],
      "target_answer": "Je suis revenu hier",
      "meaning": "I came back yesterday",
      "explanation": "revenir belongs to the venir family, so it takes être: Je suis revenu!",
      "id": "fr1801_e2"
    },
    {
      "type": "derive",
      "prompt": "Write 'He was born in Paris' using être + né + à Paris:",
      "english_hint": "Il est + né + à Paris",
      "target_answer": "Il est né à Paris",
      "meaning": "He was born in Paris",
      "explanation": "naître ('to be born') takes present-tense est + né: Il est né à Paris.",
      "id": "fr1801_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we arrived this morning and we stayed here (masculine plural)",
      "cues": [
        "We arrived this morning → Nous sommes arrivés ce matin",
        "and we stayed here → et nous sommes restés ici"
      ],
      "idea_parts": [
        "first motion → Nous sommes arrivés ce matin",
        "second state → et nous sommes restés ici"
      ],
      "target_answer": "Nous sommes arrivés ce matin et nous sommes restés ici",
      "meaning": "We arrived this morning and stayed here",
      "word_bank": [
        "matin",
        "nous",
        "arrivés",
        "restés",
        "ce",
        "Nous",
        "sommes",
        "ici",
        "sommes",
        "la",
        "et",
        "avons"
      ],
      "explanation": "Both arriver and rester take être (Nous sommes), with plural -s.",
      "diagnosis": {
        "slip": "used avons instead of sommes",
        "cue": "Both arriver and rester take être."
      },
      "id": "fr1801_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je suis sorti de l'hôtel et je suis allé à la gare",
      "replays": 2,
      "target_answer": "Je suis sorti de l'hôtel et je suis allé à la gare",
      "meaning": "I left the hotel and went to the station",
      "cues": [
        "Je suis sorti de l'hôtel",
        "et je suis allé à la gare"
      ],
      "explanation": "sortir and aller both take je suis in the past.",
      "affirmation": "You paired both motion verbs with je suis!",
      "id": "fr1801_e5"
    }
  ],
  "summary": {
    "outcome": "Recall the être-house verbs in opposite pairs and form their past with être.",
    "use_example": {
      "german": "Il est entré, il est resté cinq minutes, et il est reparti.",
      "english": "He came in, stayed five minutes, and left again."
    },
    "takeaway": "Remember the être house in opposite pairs: go/come, arrive/leave, enter/exit, up/down.",
    "curiosity_teaser": "Up next on Le Pont ([1802] Agreement Drills): see how The être House leads directly into Agreement Drills."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We arrived this morning and stayed here\" in French:",
    "target_answer": "Nous sommes arrivés ce matin et nous sommes restés ici",
    "word_bank": [
      "pas",
      "arrivés",
      "et",
      "sommes",
      "restés",
      "ce",
      "ne",
      "sommes",
      "Nous",
      "nous",
      "ici",
      "matin"
    ],
    "explanation": "Re-constructing \"Nous sommes arrivés ce matin et nous sommes restés ici\" from the underlying rule cements the pattern of The être House."
  }
};

export default lesson;
