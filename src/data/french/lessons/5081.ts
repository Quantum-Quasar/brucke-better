import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5081,
  "slug": "lesson-5081",
  "title": "De matin à soir",
  "subtitle": "Chaining reflexives (se lever, se laver, s'habiller, se coucher) across a full day.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "lever",
    "laver",
    "habiller",
    "coucher",
    "depuis",
    "heure",
    "ce_soir",
    "me",
    "on"
  ],
  "table_word_ids": [
    "lever",
    "laver",
    "habiller",
    "coucher",
    "depuis",
    "heure",
    "ce_soir",
    "me",
    "on"
  ],
  "hook": {
    "title": "From Morning Alarm to Midnight: Full Reflexive Chains",
    "content": "Link a full French day from morning to night: Le matin, je me lève à sept heures, je me lave et je m'habille. Le soir, je me couche. In the negative, ne steps in BEFORE the reflexive pronoun and pas stands after the verb: Je ne me lève pas tôt!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How to negate a reflexive verb: ne hugs BOTH the pronoun and the verb",
        "content": "Because the reflexive pronoun and verb act as one unit, ne...pas wraps the pair together: Je ne me lève pas tôt!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Positive: Je me lève; Negative: Je ne me lève pas; Past: Je me suis levé(e)",
    "content": "Chain daily actions across morning, afternoon, and evening.",
    "linguist_note": "Reflexive clitics form an inseparable phonological unit with the finite verb, so ne precedes the clitic.",
    "trap_note": "Never separate the reflexive pronoun from its verb with ne (*Je me ne lève pas) — write Je ne me lève pas!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each daily-routine clause with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je me lève à sept heures",
          "german": "I get up at seven o'clock"
        },
        {
          "id": "p2",
          "english": "Je ne me lève pas tôt le dimanche",
          "german": "I don't get up early on Sundays"
        },
        {
          "id": "p3",
          "english": "Je m'habille avant le café",
          "german": "I get dressed before coffee"
        },
        {
          "id": "p4",
          "english": "On se retrouve ce soir",
          "german": "We meet up tonight"
        },
        {
          "id": "p5",
          "english": "Je me couche à minuit",
          "german": "I go to bed at midnight"
        }
      ],
      "target_answer": "I get up at seven o'clock, I don't get up early on Sundays, I get dressed before coffee, We meet up tonight, I go to bed at midnight",
      "meaning": "Je me lève à sept heures, Je ne me lève pas tôt le dimanche, Je m'habille avant le café, On se retrouve ce soir, Je me couche à minuit",
      "explanation": "ne...pas wraps the entire reflexive pronoun + verb unit.",
      "id": "fr5081_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you negate 'Je me couche tard' ('I go to bed late')?",
      "options": [
        "Je me ne couche pas tard",
        "Je ne couche pas me tard",
        "Je ne me couche pas tard"
      ],
      "target_answer": "Je ne me couche pas tard",
      "meaning": "I don't go to bed late",
      "explanation": "ne goes before me couche, and pas goes after it: Je ne me couche pas.",
      "id": "fr5081_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word structure of 'Je ne me lève pas tôt'?",
      "german": "Je ne me lève pas tôt",
      "natural": "I don't get up early",
      "options": [
        "I not myself raise step early",
        "I don't get up early",
        "I myself not get up early"
      ],
      "target_answer": "I not myself raise step early",
      "meaning": "Literal structure: I not myself raise step early",
      "explanation": "ne precedes the pronoun-verb unit me lève.",
      "id": "fr5081_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "on Sundays I do not get up early (use Le dimanche, je ne me lève pas tôt)",
      "cues": [
        "On Sundays → Le dimanche",
        "I do not get up early → je ne me lève pas tôt"
      ],
      "idea_parts": [
        "habitual day → Le dimanche",
        "negated reflexive → je ne me lève pas tôt"
      ],
      "target_answer": "Le dimanche, je ne me lève pas tôt",
      "meaning": "On Sundays, I don't get up early",
      "word_bank": [
        "je",
        "ne",
        "la",
        "Le",
        "lève",
        "le",
        "dimanche",
        "me",
        "pas",
        "tôt"
      ],
      "explanation": "Le dimanche ('on Sundays') + je ne me lève pas tôt.",
      "diagnosis": {
        "slip": "put ne between me and lève",
        "cue": "Place ne before me: je ne me lève pas."
      },
      "id": "fr5081_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je me lave, je m'habille et je prends un café",
      "replays": 2,
      "target_answer": "Je me lave, je m'habille et je prends un café",
      "meaning": "I wash up, get dressed, and have a coffee",
      "cues": [
        "Je me lave",
        "je m'habille",
        "et je prends un café"
      ],
      "explanation": "Three morning actions in sequence.",
      "affirmation": "You chained the morning routine cleanly!",
      "id": "fr5081_e5"
    }
  ],
  "summary": {
    "outcome": "Chain positive and negative reflexive verbs across a full daily schedule.",
    "use_example": {
      "german": "La semaine, je me lève tôt, mais le dimanche je me repose.",
      "english": "During the week I get up early, but on Sundays I rest."
    },
    "takeaway": "ne...pas hugs the reflexive pronoun and verb together: Je ne me lève pas.",
    "curiosity_teaser": "Up next on Le Pont ([5091] Dont & Où): see how De matin à soir leads directly into Dont & Où."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"On Sundays, I don't get up early\" in French:",
    "target_answer": "Le dimanche, je ne me lève pas tôt",
    "word_bank": [
      "très",
      "lève",
      "dimanche",
      "tôt",
      "me",
      "ne",
      "Le",
      "pas",
      "ici",
      "je"
    ],
    "explanation": "Re-constructing \"Le dimanche, je ne me lève pas tôt\" from the underlying rule cements the pattern of De matin à soir."
  }
};

export default lesson;
