import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2001,
  "slug": "lesson-2001",
  "title": "The Trap Lesson",
  "subtitle": "depuis + present tense: why ongoing actions stay in the present in French.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "depuis",
    "habiter",
    "apprendre",
    "attendre",
    "ans",
    "semaine",
    "heure",
    "ici"
  ],
  "table_word_ids": [
    "depuis",
    "habiter",
    "apprendre",
    "attendre",
    "ans",
    "semaine",
    "heure",
    "ici"
  ],
  "hook": {
    "title": "Defusing the #1 English Transfer Trap: Present + depuis",
    "content": "Whenever an English sentence says 'I have lived here for...', 'I have been learning French for...', or 'She has been waiting since...', ask: Is it still going on right now? Yes! So French keeps the verb in the PRESENT tense + depuis!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'for three years' in an ongoing sentence is depuis trois ans",
        "content": "Whether English says 'since Monday' (depuis lundi) or 'for three years' (depuis trois ans), French uses depuis with the present tense!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Still Happening Now = Present Tense + depuis",
    "content": "Convert English 'have been [verb]-ing for/since X' directly into French Present Tense + depuis X.",
    "linguist_note": "French depuis marks the left boundary of a state extending through utterance time.",
    "trap_note": "Never translate 'for three years' with *pour trois ans in an ongoing duration sentence — use depuis trois ans!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English ongoing-duration sentence with its French Present + depuis equivalent:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I have been living here for five years",
          "german": "J'habite ici depuis cinq ans"
        },
        {
          "id": "p2",
          "english": "I have been learning French for a year",
          "german": "J'apprends le français depuis un an"
        },
        {
          "id": "p3",
          "english": "We have been waiting for twenty minutes",
          "german": "Nous attendons depuis vingt minutes"
        },
        {
          "id": "p4",
          "english": "She has been here since Monday",
          "german": "Elle est ici depuis lundi"
        }
      ],
      "target_answer": "J'habite ici depuis cinq ans, J'apprends le français depuis un an, Nous attendons depuis vingt minutes, Elle est ici depuis lundi",
      "meaning": "I have been living here for five years, I have been learning French for a year, We have been waiting for twenty minutes, She has been here since Monday",
      "explanation": "Every ongoing action uses the French present tense + depuis.",
      "id": "fr2001_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Translate 'I have known your brother for ten years' (and still know him!):",
      "options": [
        "J'ai connu ton frère depuis dix ans",
        "Je connais ton frère depuis dix ans",
        "Je connais ton frère pour dix ans"
      ],
      "target_answer": "Je connais ton frère depuis dix ans",
      "meaning": "Present tense Je connais + depuis dix ans",
      "explanation": "Because you still know him today, use present tense Je connais + depuis!",
      "id": "fr2001_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'Elle attend le bus depuis dix minutes'?",
      "german": "Elle attend le bus depuis dix minutes",
      "natural": "She has been waiting for the bus for ten minutes",
      "options": [
        "She waited the bus during ten minutes",
        "She has been waiting for the bus for ten minutes",
        "She waits-for the bus since ten minutes"
      ],
      "target_answer": "She waits-for the bus since ten minutes",
      "meaning": "Literal structure: She waits-for the bus since ten minutes",
      "explanation": "Present tense attend + depuis ('since').",
      "id": "fr2001_e3"
    },
    {
      "id": "fr2001_e4",
      "type": "pronoun_compression",
      "prompt": "Fold the direct object noun phrase into its pre-verbal clitic pronoun:",
      "shift_hint": "le / la / les before the verb",
      "full_sentence": "Je vois le train et je prends le train",
      "compressed_parts": [
        {
          "noun": "le train",
          "pronoun": "le",
          "role": "direct object"
        }
      ],
      "word_bank": [
        "prends",
        "Je",
        "train",
        "la",
        "lui",
        "le"
      ],
      "target_answer": "Je le prends",
      "meaning": "I take it",
      "explanation": "Unlike English, French pulls the object pronoun le directly in front of the conjugated verb: Je le prends."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Mon frère travaille ici depuis janvier",
      "replays": 2,
      "target_answer": "Mon frère travaille ici depuis janvier",
      "meaning": "My brother has been working here since January",
      "cues": [
        "Mon frère travaille ici",
        "depuis janvier"
      ],
      "explanation": "depuis covers both 'for [a span]' and 'since [a starting point]'.",
      "affirmation": "You kept travaille in the present tense with depuis janvier.",
      "id": "fr2001_e5"
    }
  ],
  "summary": {
    "outcome": "Translate English 'have been doing for/since' into French Present Tense + depuis.",
    "use_example": {
      "german": "Nous sommes amis depuis vingt ans.",
      "english": "We have been friends for twenty years."
    },
    "takeaway": "Ongoing action = Present tense + depuis (for both 'for' and 'since').",
    "curiosity_teaser": "Up next on Le Pont ([2002] Since & For Gym): see how The Trap Lesson leads directly into Since & For Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"My brother has been working here since January\" in French:",
    "target_answer": "Mon frère travaille ici depuis janvier",
    "word_bank": [
      "frère",
      "Mon",
      "travaille",
      "pas",
      "ne",
      "ici",
      "janvier",
      "depuis"
    ],
    "explanation": "Re-constructing \"Mon frère travaille ici depuis janvier\" from the underlying rule cements the pattern of The Trap Lesson."
  }
};

export default lesson;
