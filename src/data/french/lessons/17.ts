import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 17,
  "slug": "the-e-past",
  "title": "The -é Past",
  "subtitle": "The passé composé with avoir: j'ai mangé, tu as parlé — where -é is English -ed",
  "phase": 3,
  "shift_categories": [
    "e"
  ],
  "word_ids": [
    "mangé",
    "décidé",
    "parlé",
    "trouvé",
    "donné",
    "aimé",
    "fini",
    "compris",
    "pris",
    "fait",
    "vu",
    "déjà",
    "hier"
  ],
  "table_word_ids": [
    "mangé",
    "décidé",
    "parlé",
    "trouvé",
    "donné",
    "aimé",
    "fini",
    "compris",
    "pris",
    "fait",
    "vu",
    "déjà",
    "hier"
  ],
  "hook": {
    "title": "One Tense for Both 'I Ate' and 'I Have Eaten'",
    "content": "English agonizes over the difference between 'I ate' and 'I have eaten'. Spoken French sweeps that distinction off the table: one single two-word past tense — le passé composé — covers BOTH! You already own the first piece: the present tense of avoir (j'ai, tu as, il a, nous avons, vous avez). For the second piece, every -er verb simply swaps -er for -é (pronounced /e/, the exact same sound as the infinitive!): parler → parlé ('spoken'), manger → mangé ('eaten'), décider → décidé ('decided').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why -é and -er sound 100% identical",
        "content": "Both -er (/e/) and -é (/e/) lost their final Latin consonants (parlāre → parler, parlātum → parlé). Your ear tells them apart purely by what sits in front of them: je veux parler (after a verb) vs j'ai parlé (after avoir)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "avoir + Participle (-é, -i, -u)",
    "content": "Three quick rules give you the participles: (1) Every -er verb turns into -é (mangé, parlé, trouvé, donné, aimé, confirmé, réservé). (2) Regular -ir verbs drop the r to end in -i (finir → fini, choisir → choisi). (3) Common irregulars end in -u or -is/-it: voir → vu (as in déjà vu 'already seen'!), prendre/comprendre → pris/compris, faire → fait. And where do ne...pas and déjà go? Right around the auxiliary avoir: Je n'ai pas compris. J'ai déjà mangé!",
    "linguist_note": "Latin habēre + perfect passive participle grammaticalized across Western Romance into the primary conversational past.",
    "trap_note": "The shortcut your mind will offer: dropping avoir and saying *Je mangé to translate English 'I ate'. Spoken French ALWAYS builds the past with two words: J'ai mangé!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each past participle with its English meaning and pattern:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "mangé (-er → -é)",
          "german": "eaten / ate"
        },
        {
          "id": "p2",
          "english": "fini (-ir → -i)",
          "german": "finished"
        },
        {
          "id": "p3",
          "english": "vu (as in déjà vu)",
          "german": "seen / saw"
        },
        {
          "id": "p4",
          "english": "compris (prendre family)",
          "german": "understood"
        },
        {
          "id": "p5",
          "english": "fait (Latin factum)",
          "german": "done / made"
        }
      ],
      "target_answer": "eaten / ate, finished, seen / saw, understood, done / made",
      "meaning": "mangé (-er → -é), fini (-ir → -i), vu (as in déjà vu), compris (prendre family), fait (Latin factum)",
      "explanation": "Every -er verb takes -é; -ir takes -i; voir gives vu; comprendre gives compris; faire gives fait.",
      "id": "fr17_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'I spoke / I have spoken' using avoir + the -é participle of parler:",
      "tile_options": [
        "ai",
        "parler",
        "parlé",
        "J'",
        "suis"
      ],
      "target_answer": "J'aiparlé",
      "meaning": "J'ai parlé (I spoke / I have spoken)",
      "explanation": "J'ai + parlé covers both 'I spoke' and 'I have spoken'.",
      "id": "fr17_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word structure of 'J'ai déjà vu ce film'?",
      "german": "J'ai déjà vu ce film",
      "natural": "I already saw this movie",
      "options": [
        "I already saw that film",
        "I have already seen this film",
        "I already saw this movie"
      ],
      "target_answer": "I have already seen this film",
      "meaning": "Literal structure: I have already seen this film",
      "explanation": "Even when English uses simple past 'I already saw', French uses 'I have already seen' (J'ai déjà vu).",
      "id": "fr17_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "yesterday I ate the cake",
      "cues": [
        "Yesterday, I have eaten the cake → Hier, j'ai mangé le gâteau"
      ],
      "idea_parts": [
        "time marker → Hier",
        "auxiliary + participle → j'ai mangé",
        "object → le gâteau"
      ],
      "target_answer": "Hier, j'ai mangé le gâteau",
      "meaning": "Yesterday, I ate the cake",
      "word_bank": [
        "gâteau",
        "le",
        "Hier",
        "mangé",
        "je",
        "j'ai",
        "manger"
      ],
      "explanation": "Hier, j'ai mangé le gâteau uses two words (j'ai mangé) for English 'I ate'.",
      "diagnosis": {
        "slip": "omitted j'ai or used infinitive manger",
        "cue": "Always pair j'ai with the -é participle: j'ai mangé."
      },
      "id": "fr17_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu as compris la question",
      "replays": 2,
      "target_answer": "Tu as compris la question",
      "meaning": "Did you understand the question?",
      "cues": [
        "auxiliary: Tu as",
        "participle: compris",
        "object: la question"
      ],
      "explanation": "Tu as compris translates both 'Did you understand?' and 'Have you understood?'.",
      "affirmation": "You heard Tu as compris and la question cleanly.",
      "id": "fr17_e5"
    }
  ],
  "summary": {
    "outcome": "Form the passé composé with avoir + participle (-é, -i, vu, compris, fait) to narrate completed past actions.",
    "use_example": {
      "german": "Hier, j'ai parlé avec mon ami et j'ai compris.",
      "english": "Yesterday, I spoke with my friend and I understood."
    },
    "takeaway": "One two-word tense (avoir + participle) does the job of both 'I did' and 'I have done'.",
    "curiosity_teaser": "Up next on Le Pont ([1701] Participle Twins): see how The -é Past leads directly into Participle Twins."
  },
  "twist": {
    "prompt": "Ungraded — 'I made a reservation' (use J'ai fait):",
    "target_answer": "J'ai fait une réservation",
    "word_bank": [
      "fait",
      "J'ai",
      "réservation",
      "un",
      "faire",
      "une"
    ],
    "explanation": "faire → fait ('done/made'): J'ai fait une réservation."
  },
  "foreshadow": {
    "line": "Having mastered The -é Past, look ahead to Topic 18 (Motion Takes être), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 18
  },
  "payoff": {
    "ofLesson": 16,
    "text": "The foundation from Topic 16 (Days, Months & Dates) now pays off directly inside The -é Past: every sentence here builds on that earlier step."
  }
};

export default lesson;
