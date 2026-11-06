import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 303,
  "slug": "ir-and-re-verb-bridges",
  "title": "The -ir & -re Verb Bridges",
  "subtitle": "finir (finish), choisir (choose), vendre (vendor), répondre (respond) — French's other two verb families",
  "phase": 1,
  "shift_categories": [
    "ation"
  ],
  "word_ids": [
    "finir",
    "choisir",
    "vendre",
    "répondre",
    "attendre",
    "vouloir",
    "café",
    "maison"
  ],
  "table_word_ids": [
    "finir",
    "choisir",
    "vendre",
    "répondre",
    "attendre",
    "vouloir",
    "café",
    "maison"
  ],
  "hook": {
    "title": "Where English -ish Came From",
    "content": "Over 80% of French verbs end in -er, which you unlock via -ation. The remaining verbs live in two smaller houses: -ir verbs (like finir 'to finish' and choisir 'to choose') and -re verbs (like vendre 'to sell', répondre 'to respond', and attendre 'to wait for'). Why does English say 'finish', 'punish', and 'abolish' with -ish? Because French -ir verbs insert -iss- in the plural (nous finissons), and Norman English borrowed that exact stem!",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Norman -iss- that became English -ish",
        "content": "Latin had an 'inchoative' infix -isc- meaning 'to begin to'. French generalized it across -ir plurals (finissons, choisissons), and Middle English adopted that stem as -ish: finir → finish, punir → punish.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Same Infinitive Slot After je veux",
    "content": "Whether a verb ends in -er (confirmer), -ir (finir, choisir), or -re (vendre, répondre, attendre), it parks unchanged right after je veux or tu veux: Je veux finir le café. Tu veux choisir le gâteau. Ils veulent vendre la maison. You already know the meanings from English finish, choose, vendor, and respond.",
    "linguist_note": "French's three conjugation classes (-er, -ir, -re) descend from Latin's four (-āre, -ēre/-īre, -ere). In infinitive chains after vouloir, all three behave identically.",
    "trap_note": "Your mind will try to add 'for' after attendre ('wait for') or 'to' after répondre in English order. Remember: attendre already means 'to wait for' inside one word!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each -ir or -re infinitive with its English cognate and meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to finish (English finish)",
          "german": "finir"
        },
        {
          "id": "p2",
          "english": "to choose (English choose)",
          "german": "choisir"
        },
        {
          "id": "p3",
          "english": "to sell (English vendor)",
          "german": "vendre"
        },
        {
          "id": "p4",
          "english": "to answer (English respond)",
          "german": "répondre"
        },
        {
          "id": "p5",
          "english": "to wait for (false friend: attend)",
          "german": "attendre"
        }
      ],
      "target_answer": "finir, choisir, vendre, répondre, attendre",
      "meaning": "to finish (English finish), to choose (English choose), to sell (English vendor), to answer (English respond), to wait for (false friend: attend)",
      "explanation": "English -ish verbs map to French -ir; Latinate -nd verbs map to French -re.",
      "id": "fr303_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Assemble 'I want to finish the coffee':",
      "tile_options": [
        "Je",
        "veux",
        "le",
        "finisser",
        "finir",
        "café"
      ],
      "target_answer": "Jeveuxfinirlecafé",
      "meaning": "Je veux finir le café",
      "explanation": "finir parks in its dictionary form right after je veux.",
      "id": "fr303_e2"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Which English noun for a person or machine that sells things shares the root of French vendre?",
      "target_answer": "vendor",
      "meaning": "vendor / vending ↔ vendre ('to sell')",
      "explanation": "Latin vendere gave French vendre and English vendor / vending machine.",
      "id": "fr303_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you are asking a friend if they want to choose the cake",
      "cues": [
        "Do you want → Tu veux",
        "to choose → choisir",
        "the cake → le gâteau"
      ],
      "idea_parts": [
        "question opener → Tu veux",
        "infinitive → choisir",
        "object → le gâteau"
      ],
      "target_answer": "Tu veux choisir le gâteau",
      "meaning": "Do you want to choose the cake?",
      "word_bank": [
        "choisir",
        "la",
        "le",
        "veux",
        "Tu",
        "un",
        "gâteau"
      ],
      "explanation": "Tu veux choisir le gâteau chains the -ir infinitive directly after veux.",
      "diagnosis": {
        "slip": "conjugated choisir after veux",
        "cue": "Keep choisir in its bare -ir infinitive form after tu veux."
      },
      "id": "fr303_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je veux répondre maintenant",
      "replays": 2,
      "target_answer": "Je veux répondre maintenant",
      "meaning": "I want to answer now",
      "cues": [
        "je veux + répondre (respond)",
        "maintenant (now)"
      ],
      "explanation": "répondre drops the Latin s before p and marks the spot with an acute accent é.",
      "affirmation": "You caught répondre with its é and final -re.",
      "id": "fr303_e5"
    }
  ],
  "summary": {
    "outcome": "Decode -ir verbs from English -ish cognates (finish → finir) and -re verbs from Latinate stems (vendor → vendre, respond → répondre).",
    "use_example": {
      "german": "Je veux finir mon café et choisir un gâteau.",
      "english": "I want to finish my coffee and choose a cake."
    },
    "takeaway": "English -ish verbs are French -ir verbs in disguise, and they chain after je veux just like -er verbs.",
    "curiosity_teaser": "Up next on Le Pont ([4] Ne...Pas: The Sandwich): see how The -ir & -re Verb Bridges leads directly into Ne...Pas: The Sandwich."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Do you want to choose the cake\" in French:",
    "target_answer": "Tu veux choisir le gâteau",
    "word_bank": [
      "gâteau",
      "veux",
      "Tu",
      "choisir",
      "ne",
      "pas",
      "le"
    ],
    "explanation": "Re-constructing \"Tu veux choisir le gâteau\" from the underlying rule cements the pattern of The -ir & -re Verb Bridges."
  }
};

export default lesson;
