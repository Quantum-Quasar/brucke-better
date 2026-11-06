import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3002,
  "slug": "lesson-3002",
  "title": "Trap Watch: False Friends in the Wild",
  "subtitle": "High-frequency false friends (actuellement, librairie, attendre, raisin, journée, location) in context.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "trap_actuellement",
    "trap_librairie",
    "trap_attendre",
    "trap_demander",
    "trap_raisin",
    "trap_journée",
    "trap_location",
    "trap_formidable"
  ],
  "table_word_ids": [
    "trap_actuellement",
    "trap_librairie",
    "trap_attendre",
    "trap_demander",
    "trap_raisin",
    "trap_journée",
    "trap_location",
    "trap_formidable"
  ],
  "hook": {
    "title": "Trap Watch: Outsmarting the Full False-Friends Deck in Context",
    "content": "Alongside actuellement ('currently'), la librairie ('bookshop'), attendre ('to wait for'), and demander ('to ask'), watch out for four more classic traps: le raisin ('fresh grape' — a dried raisin is un raisin sec!), la journée ('the day' — Bonne journée ! is 'Have a good day!'), la location ('rental/lease'), and formidable ('wonderful/tremendous')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'Bonne journée !' means 'Have a good day!' and not 'Have a good trip!'",
        "content": "jour ('day') + -née ('the span of') = la journée ('the whole day long'). A travel journey is un voyage!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Read the French Meaning, Ignore the English Lookalike",
    "content": "Test yourself across the false friends in live context.",
    "linguist_note": "Semantic divergence creates false cognates between sibling lexicons.",
    "trap_note": "Never wish someone *Bonne journée when you mean 'Have a safe trip' (that's Bon voyage !)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French false friend with its TRUE French meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "le raisin (vs. un raisin sec)",
          "german": "fresh grape (not dried raisin)"
        },
        {
          "id": "p2",
          "english": "la journée (Bonne journée !)",
          "german": "the day's span (not travel journey)"
        },
        {
          "id": "p3",
          "english": "la location (voiture de location)",
          "german": "rental / lease (not geographic location)"
        },
        {
          "id": "p4",
          "english": "formidable (C'est formidable !)",
          "german": "wonderful / terrific (not fearsome)"
        },
        {
          "id": "p5",
          "english": "la librairie (vs. la bibliothèque)",
          "german": "bookshop (not lending library)"
        },
        {
          "id": "p6",
          "english": "actuellement (vs. vraiment / en fait)",
          "german": "currently (not actually)"
        }
      ],
      "target_answer": "fresh grape (not dried raisin), the day's span (not travel journey), rental / lease (not geographic location), wonderful / terrific (not fearsome), bookshop (not lending library), currently (not actually)",
      "meaning": "le raisin (vs. un raisin sec), la journée (Bonne journée !), la location (voiture de location), formidable (C'est formidable !), la librairie (vs. la bibliothèque), actuellement (vs. vraiment / en fait)",
      "explanation": "Every one of these words kept its spelling while shifting meaning on one side of the Channel.",
      "id": "fr3002_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What does 'C'est une voiture de location' mean?",
      "options": [
        "It is a rental car",
        "It is a local car",
        "It is a car in this location"
      ],
      "target_answer": "It is a rental car",
      "meaning": "la location = rental / lease (from louer 'to rent')",
      "explanation": "Geographic location is le lieu or l'endroit; la location is a rental!",
      "id": "fr3002_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences accurately translate 'Ton idée est formidable, bonne journée'?",
      "german": "Ton idée est formidable, bonne journée",
      "meaning": "Your idea is wonderful, have a great day!",
      "renderings": [
        "Your idea is wonderful, have a good day!",
        "Your idea is terrific, have a nice day!"
      ],
      "traps": [
        "Your idea is terrifying, have a safe trip!",
        "Your idea is formidable, good journey!"
      ],
      "target_answer": "Your idea is wonderful, have a good day!",
      "explanation": "formidable means 'wonderful/terrific', and bonne journée means 'have a good day'.",
      "id": "fr3002_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am waiting for my friend in front of the bookshop (use devant la librairie)",
      "cues": [
        "I wait-for my friend → J'attends mon ami",
        "in front of the bookshop → devant la librairie"
      ],
      "idea_parts": [
        "verb + direct object → J'attends mon ami",
        "place → devant la librairie"
      ],
      "target_answer": "J'attends mon ami devant la librairie",
      "meaning": "I am waiting for my friend in front of the bookshop",
      "word_bank": [
        "bibliothèque",
        "la",
        "le",
        "ami",
        "mon",
        "J'attends",
        "librairie",
        "devant"
      ],
      "explanation": "Combines attendre ('wait for') and la librairie ('bookshop').",
      "diagnosis": {
        "slip": "used bibliothèque",
        "cue": "Bookshop is la librairie."
      },
      "id": "fr3002_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'habite actuellement ici et c'est formidable",
      "replays": 2,
      "target_answer": "J'habite actuellement ici et c'est formidable",
      "meaning": "I currently live here and it is wonderful",
      "cues": [
        "J'habite actuellement ici",
        "et c'est formidable"
      ],
      "explanation": "actuellement = 'currently'; formidable = 'wonderful'.",
      "affirmation": "You decoded both false friends in one sentence!",
      "id": "fr3002_e5"
    }
  ],
  "summary": {
    "outcome": "Spot and accurately use French false friends in context.",
    "use_example": {
      "german": "Merci beaucoup et bonne journée !",
      "english": "Thank you very much and have a great day!"
    },
    "takeaway": "la journée = the day; le raisin = fresh grape; la location = rental; formidable = wonderful.",
    "curiosity_teaser": "Up next on Le Pont ([3003] The Whole-Trail Review Game): see how Trap Watch: False Friends in the Wild leads directly into The Whole-Trail Review Game."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am waiting for my friend in front of the bookshop\" in French:",
    "target_answer": "J'attends mon ami devant la librairie",
    "word_bank": [
      "pas",
      "librairie",
      "la",
      "J'attends",
      "devant",
      "mon",
      "ne",
      "ami"
    ],
    "explanation": "Re-constructing \"J'attends mon ami devant la librairie\" from the underlying rule cements the pattern of Trap Watch: False Friends in the Wild."
  }
};

export default lesson;
