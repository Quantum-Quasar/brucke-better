import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1002,
  "slug": "sprig-1002",
  "title": "J'ai Gym",
  "subtitle": "J'ai un gâteau, j'ai trente ans — have-sentences including age as possession.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "avoir",
    "jai",
    "as",
    "a",
    "avons",
    "avez",
    "pain",
    "eau",
    "ans",
    "peur",
    "faim"
  ],
  "table_word_ids": [
    "avoir",
    "jai",
    "as",
    "a",
    "avons",
    "avez",
    "pain",
    "eau",
    "ans",
    "peur",
    "faim"
  ],
  "hook": {
    "title": "Running avoir Across Possessions, Ages, and Feelings",
    "content": "avoir (j'ai, tu as, il/elle a, nous avons, vous avez) expresses possessions (j'ai un billet), ages (j'ai trente ans), and physical sensations (j'ai faim, j'ai peur). In the negative, j'ai un-elides so n' can hug ai, and un/une collapses to bare de: Je n'ai pas de billet!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why tu as and il a sound identical (/a/)",
        "content": "Because the final -s of tu as is silent, tu as (/ty a/) and il a (/il a/) have the exact same verb sound!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Positive J'ai un… vs. Negative Je n'ai pas de…",
    "content": "Practice positive and negative sentences with avoir.",
    "linguist_note": "Negative determiner reduction (un/une/du/de la/des → de) applies systematically after je n'ai pas.",
    "trap_note": "When negating j'ai, don't write *J'ai ne pas — un-elide je so n' can hug ai: Je n'ai pas!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each avoir phrase with its natural English translation:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "J'ai un billet",
          "german": "I have a ticket"
        },
        {
          "id": "p2",
          "english": "Tu as trente ans",
          "german": "You are thirty years old"
        },
        {
          "id": "p3",
          "english": "Il a une grande maison",
          "german": "He has a big house"
        },
        {
          "id": "p4",
          "english": "Nous avons le temps",
          "german": "We have time"
        },
        {
          "id": "p5",
          "english": "Je n'ai pas de réservation",
          "german": "I don't have a reservation"
        }
      ],
      "target_answer": "I have a ticket, You are thirty years old, He has a big house, We have time, I don't have a reservation",
      "meaning": "J'ai un billet, Tu as trente ans, Il a une grande maison, Nous avons le temps, Je n'ai pas de réservation",
      "explanation": "avoir handles possessions, ages, and time.",
      "id": "fr1002_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word breakdown of 'Elle a vingt ans'?",
      "german": "Elle a vingt ans",
      "natural": "She is twenty years old",
      "options": [
        "She is twenty of years",
        "She has twenty years",
        "She is twenty years old"
      ],
      "target_answer": "She has twenty years",
      "meaning": "Literal structure: She has twenty years",
      "explanation": "French expresses age with avoir ('She has twenty years').",
      "id": "fr1002_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Flip 'J'ai une table' ('I have a table') into the negative ('I don't have a table'):",
      "options": [
        "Je n'ai pas une table",
        "J'ai ne pas une table",
        "Je n'ai pas de table"
      ],
      "target_answer": "Je n'ai pas de table",
      "meaning": "I don't have a table",
      "explanation": "je returns before n'ai pas, and une collapses to bare de!",
      "id": "fr1002_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we have a reservation for tonight",
      "cues": [
        "We have → Nous avons",
        "a reservation for tonight → une réservation pour ce soir"
      ],
      "idea_parts": [
        "subject + verb → Nous avons",
        "object → une réservation",
        "time → pour ce soir"
      ],
      "target_answer": "Nous avons une réservation pour ce soir",
      "meaning": "We have a reservation for tonight",
      "word_bank": [
        "pour",
        "une",
        "réservation",
        "la",
        "soir",
        "Nous",
        "avons",
        "ce",
        "avez"
      ],
      "explanation": "Nous avons + une réservation + pour ce soir.",
      "diagnosis": {
        "slip": "used avez instead of avons",
        "cue": "Nous takes avons."
      },
      "id": "fr1002_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu as l'heure, s'il te plaît",
      "replays": 2,
      "target_answer": "Tu as l'heure, s'il te plaît",
      "meaning": "Do you have the time, please? (informal)",
      "cues": [
        "Tu as l'heure",
        "s'il te plaît"
      ],
      "explanation": "With tu, s'il vous plaît adapts to s'il te plaît!",
      "affirmation": "You caught Tu as l'heure and s'il te plaît.",
      "id": "fr1002_e5"
    }
  ],
  "summary": {
    "outcome": "Build positive, negative, and question sentences with avoir across objects, time, and ages.",
    "use_example": {
      "german": "J'ai trente ans et j'ai deux frères.",
      "english": "I am thirty years old and I have two brothers."
    },
    "takeaway": "J'ai flips to Je n'ai pas de in the negative.",
    "curiosity_teaser": "Up next on Le Pont ([1003] Liaison & Silent Consonants: CaReFuL): see how J'ai Gym leads directly into Liaison & Silent Consonants: CaReFuL."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We have a reservation for tonight\" in French:",
    "target_answer": "Nous avons une réservation pour ce soir",
    "word_bank": [
      "ce",
      "avons",
      "soir",
      "Nous",
      "réservation",
      "ne",
      "pas",
      "pour",
      "une"
    ],
    "explanation": "Re-constructing \"Nous avons une réservation pour ce soir\" from the underlying rule cements the pattern of J'ai Gym."
  }
};

export default lesson;
