import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2201,
  "slug": "lesson-2201",
  "title": "en: Of It",
  "subtitle": "en replaces de + noun and partitives: Tu veux du café ? — Oui, j'en veux.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "en_pron",
    "vouloir",
    "avoir",
    "prendre",
    "pain",
    "café",
    "eau",
    "deux",
    "un_peu"
  ],
  "table_word_ids": [
    "en_pron",
    "vouloir",
    "avoir",
    "prendre",
    "pain",
    "café",
    "eau",
    "deux",
    "un_peu"
  ],
  "hook": {
    "title": "en: The Pronoun for 'Some', 'Any', and 'Of Them'",
    "content": "Whenever you replace a partitive quantity (du pain, de la soupe, de l'eau, des amis) or a noun after a number/amount (un, deux, un peu de), put en (/ɑ̃/) right before the verb: J'en veux ('I want some'), J'en ai deux ('I have two of them')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'J'en ai un' keeps 'un' at the back while 'en' walks to the front",
        "content": "When you drop the noun after a number ('I have one [coffee]'), the 'of it' (en) walks left of the verb while the number 'one' (un) stays at the end: J'en ai un!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Replace de/du/de la/des + Noun with en Before the Verb",
    "content": "Keep any number or quantity word at the end and place en before the verb.",
    "linguist_note": "Partitive clitic en (< Latin inde) is obligatory whenever a quantified noun phrase is pronominalized.",
    "trap_note": "Never say *J'ai deux when answering 'Do you have brothers?' — always include en: J'en ai deux!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each question with its natural en response:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Tu veux du fromage ? (some cheese)",
          "german": "Oui, j'en veux (Yes, I want some)"
        },
        {
          "id": "p2",
          "english": "Tu prends du café ? (a little)",
          "german": "Oui, j'en prends un peu (I'll have a little of it)"
        },
        {
          "id": "p3",
          "english": "Tu as des sœurs ? (two of them)",
          "german": "Oui, j'en ai deux (Yes, I have two of them)"
        },
        {
          "id": "p4",
          "english": "Tu as un billet ? (one of them)",
          "german": "Oui, j'en ai un (Yes, I have one)"
        },
        {
          "id": "p5",
          "english": "Tu veux du vin ? (none)",
          "german": "Non, je n'en veux pas (No, I don't want any)"
        }
      ],
      "target_answer": "Oui, j'en veux (Yes, I want some), Oui, j'en prends un peu (I'll have a little of it), Oui, j'en ai deux (Yes, I have two of them), Oui, j'en ai un (Yes, I have one), Non, je n'en veux pas (No, I don't want any)",
      "meaning": "Tu veux du fromage ? (some cheese), Tu prends du café ? (a little), Tu as des sœurs ? (two of them), Tu as un billet ? (one of them), Tu veux du vin ? (none)",
      "explanation": "en replaces the noun while numbers and un peu stay after the verb.",
      "id": "fr2201_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'J'en veux un peu'?",
      "german": "J'en veux un peu",
      "natural": "I want a little of it",
      "options": [
        "I want some a little",
        "I of-it want a little",
        "I want a little of it"
      ],
      "target_answer": "I of-it want a little",
      "meaning": "Literal structure: I of-it want a little",
      "explanation": "en ('of-it') walks before veux, leaving un peu at the end.",
      "id": "fr2201_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Someone asks 'Vous avez des frères ?' ('Do you have brothers?'). How do you answer 'Yes, I have three'?",
      "options": [
        "Oui, je les ai trois",
        "Oui, j'ai trois",
        "Oui, j'en ai trois"
      ],
      "target_answer": "Oui, j'en ai trois",
      "meaning": "Yes, I have three (of them)",
      "explanation": "When a number stands without its noun, en is mandatory before the verb: J'en ai trois!",
      "id": "fr2201_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "yes I want two of them (using Oui, j'en veux deux)",
      "cues": [
        "Yes, I of-them want two → Oui, j'en veux deux"
      ],
      "idea_parts": [
        "affirmative → Oui",
        "subject + en + verb + number → j'en veux deux"
      ],
      "target_answer": "Oui, j'en veux deux",
      "meaning": "Yes, I want two of them",
      "word_bank": [
        "les",
        "deux",
        "veux",
        "je",
        "j'en",
        "Oui"
      ],
      "explanation": "en walks before veux while deux stays after.",
      "diagnosis": {
        "slip": "omitted en",
        "cue": "Include en before veux: Oui, j'en veux deux."
      },
      "id": "fr2201_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je n'en ai pas besoin aujourd'hui",
      "replays": 2,
      "target_answer": "Je n'en ai pas besoin aujourd'hui",
      "meaning": "I don't need it today",
      "cues": [
        "Je n'en ai pas",
        "besoin aujourd'hui"
      ],
      "explanation": "avoir besoin DE quelque chose takes en ('of it'): Je n'en ai pas besoin!",
      "affirmation": "You spotted that avoir besoin de uses en!",
      "id": "fr2201_e5"
    }
  ],
  "summary": {
    "outcome": "Use en before the verb to replace partitives, de-phrases, and nouns after numbers/quantities.",
    "use_example": {
      "german": "Tu as du pain ? — Oui, j'en ai beaucoup.",
      "english": "Do you have bread? — Yes, I have a lot of it."
    },
    "takeaway": "Whenever a number or quantity stands without its noun, en must stand before the verb (J'en ai deux).",
    "curiosity_teaser": "Up next on Le Pont ([2202] y: There): see how en: Of It leads directly into y: There."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Yes, I want two of them\" in French:",
    "target_answer": "Oui, j'en veux deux",
    "word_bank": [
      "Oui",
      "ne",
      "j'en",
      "veux",
      "deux",
      "pas"
    ],
    "explanation": "Re-constructing \"Oui, j'en veux deux\" from the underlying rule cements the pattern of en: Of It."
  }
};

export default lesson;
