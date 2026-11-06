import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3,
  "slug": "the-ation-engine",
  "title": "The -ation Engine",
  "subtitle": "Noun → verb: confirmation → confirmer. Thousands of infinitives, almost free",
  "phase": 1,
  "shift_categories": [
    "ation"
  ],
  "word_ids": [
    "confirmer",
    "organiser",
    "célébrer",
    "participer",
    "visiter",
    "inviter",
    "réserver",
    "vouloir"
  ],
  "table_word_ids": [
    "confirmer",
    "organiser",
    "célébrer",
    "participer",
    "visiter",
    "inviter",
    "réserver",
    "vouloir"
  ],
  "hook": {
    "title": "The Verbs Were Hiding in the Nouns",
    "content": "Every -ation noun carries its verb inside it. The confirmation? To confirm. The organisation? To organise. French does this mechanically: strip -ation, bolt on -er (pronounced /e/), and the noun becomes the infinitive: confirmation → confirmer, organisation → organiser. One rule, thousands of verbs — this is the single most valuable conversion in the language.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The test",
        "content": "Ask: is there an -ation word in English for this idea? Reservation → yes → réserver. That question is your verb-finder for life.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "je veux + Infinitive — and the Célébrer Trap",
    "content": "French needs no 'to': the verb itself is the dictionary form. je veux confirmer — I want to confirm. je veux visiter Paris. One idea (to visit), one word (visiter). But watch the trap: célébration → célébrer, never célébrater. The whole -ation goes before -er arrives — strip, don't trim.",
    "footnotes": [
      {
        "marker": "2",
        "title": "Register travels in reverse",
        "content": "'I want to participate' sounds formal in English; je veux participer is perfectly everyday. Don't decide too quickly that you can't say something — look for the -ation word first.",
        "interest": true
      }
    ],
    "linguist_note": "French -er descends from Latin -āre. The -ation nouns and the -er verbs are two leaves of the same Latin branch — which is why the conversion loses almost nothing.",
    "trap_note": "The shortcut your mind will offer: jump straight from the English verb to a French one — celebrate → célébrater. Wrong. Convert the noun, then strip it whole: célébration → célébrer."
  },
  "exercises": [
    {
      "id": "fr3_e1",
      "type": "morpheme_tiles",
      "prompt": "Strip -ation from 'confirmation' and attach the French infinitive ending:",
      "tile_options": [
        "er",
        "confirm",
        "ation",
        "ir"
      ],
      "target_answer": "confirmer",
      "meaning": "to confirm",
      "explanation": "confirm + er = confirmer (/kɔ̃fiʁme/). Strip the whole -ation suffix and add -er."
    },
    {
      "id": "fr3_e3",
      "type": "derive",
      "prompt": "Apply the engine — carefully: célébration → French verb:",
      "target_answer": "célébrer",
      "meaning": "to celebrate",
      "explanation": "The trap in action: the whole -ation goes. célébration → célébrer, not célébrater."
    },
    {
      "id": "fr3_e4",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you want to celebrate — the exam results just came in",
      "cues": [
        "Find the -ation noun: célébration",
        "Strip whole, add -er: célébrer",
        "je veux + infinitive: je veux célébrer"
      ],
      "target_answer": "Je veux célébrer",
      "meaning": "I want to celebrate",
      "word_bank": [
        "veux",
        "célébrater",
        "confirmer",
        "Je",
        "célébrer"
      ],
      "idea_parts": [
        "the want → je veux",
        "the verb → célébrer (célébration minus -ation)",
        "no 'to' needed"
      ],
      "explanation": "je veux célébrer — two words in French where English needs three.",
      "diagnosis": {
        "slip": "the -ation only got trimmed",
        "cue": "Strip, don't trim: célébration loses ALL of -ation before -er lands. célébrer, never célébrater."
      }
    },
    {
      "id": "fr3_e5",
      "type": "literal_gloss",
      "prompt": "Which English sentence is built the French way?",
      "german": "Je veux visiter Paris",
      "natural": "I want to visit Paris",
      "options": [
        "I want visit Paris",
        "I want Paris to visit",
        "I want to visit Paris"
      ],
      "target_answer": "I want visit Paris",
      "meaning": "The odd English is the lesson: French joins want + visit directly with no 'to'.",
      "explanation": "Je veux visiter Paris is word-for-word 'I want visit Paris'. French chains the infinitive directly — no 'to' needed."
    },
    {
      "id": "fr3_e6",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu veux participer",
      "replays": 2,
      "target_answer": "Tu veux participer",
      "meaning": "Do you want to get involved?",
      "cues": [
        "tu veux — the want question",
        "participation minus -ation, plus -er",
        "the -er sounds like /e/: participé? — no: participer with a tiny final r"
      ],
      "explanation": "participer — 'to get involved' sounds formal in English and everyday in French.",
      "affirmation": "You heard the /e/ ending and kept the final r light — that's the infinitive's sound."
    }
  ],
  "summary": {
    "outcome": "Convert any -ation noun into an -er verb, chain it after je veux, and dodge the célébrer trap.",
    "use_example": {
      "german": "Je veux réserver une table.",
      "english": "I want to reserve a table."
    },
    "takeaway": "Find the -ation noun, strip it whole, add -er — and let je veux pull it into a sentence.",
    "curiosity_teaser": "Up next on Le Pont ([301] The Célébrer Trap): see how The -ation Engine leads directly into The Célébrer Trap."
  },
  "payoff": {
    "ofLesson": 2,
    "text": "The -ION warehouse from Lesson 2 was secretly a verb factory: stripping -ation and adding -er turns your noun shelf into active verbs."
  },
  "foreshadow": {
    "line": "You can say everything you want to do — next we wrap the verb in two small words to refuse it.",
    "resolvedIn": 4
  },
  "twist": {
    "prompt": "Ungraded — how would you say 'I want to reserve the table'?",
    "target_answer": "Je veux réserver la table",
    "word_bank": [
      "la",
      "le",
      "réservation",
      "réserver",
      "veux",
      "table",
      "Je"
    ],
    "explanation": "réservation → réserver, chained directly after je veux with no extra word for 'to'."
  }
};

export default lesson;
