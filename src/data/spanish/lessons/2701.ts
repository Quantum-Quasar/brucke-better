import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2701,
  "slug": "silent-h-decoded",
  "title": "The Silent H Decoded",
  "subtitle": "hacer ↔ fact, hijo ↔ filial, hierro ↔ ferrous, hambre ↔ famine, hermoso ↔ formosa: seeing Latin F behind Spanish H",
  "phase": 5,
  "shift_categories": [
    "f_to_h"
  ],
  "word_ids": [
    "hacer",
    "hijo",
    "hierro",
    "hambre",
    "hermoso",
    "hecho",
    "reservación",
    "tengo"
  ],
  "table_word_ids": [
    "hacer",
    "hijo",
    "hierro",
    "hambre",
    "hermoso",
    "hecho",
    "reservación",
    "tengo"
  ],
  "hook": {
    "title": "Seeing the Invisible 'F' Behind Silent 'H'",
    "content": "Whenever a native Spanish word starts with H (followed by a single vowel or ie), mentally swap that H for an F and look at the English Latinate cousin: hacer → fac- (manufacture, factory, fact), hijo → fil- (filial, affiliate), hierro → ferr- (ferrous), hambre → fam- (famine), hermoso → form- (formosa, form)!"
  },
  "pattern": {
    "title": "Everyday vs Learned Doublets Inside Spanish",
    "content": "In fact, Spanish itself often has BOTH the street word in h- and the scholarly word in f-: el hijo ('the son') alongside filial ('filial'), el hierro ('iron') alongside el ferrocarril ('the iron rail = railway')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to do / to make (manufacture)",
          "german": "hacer"
        },
        {
          "id": "p2",
          "english": "son / child (filial)",
          "german": "el hijo"
        },
        {
          "id": "p3",
          "english": "iron (ferrous)",
          "german": "el hierro"
        },
        {
          "id": "p4",
          "english": "hunger (famine)",
          "german": "el / la hambre"
        },
        {
          "id": "p5",
          "english": "beautiful (formosa)",
          "german": "hermoso"
        },
        {
          "id": "p6",
          "english": "done / fact (factum)",
          "german": "hecho"
        }
      ],
      "target_answer": "hacer, el hijo, el hierro, el / la hambre, hermoso, hecho",
      "meaning": "to do / to make (manufacture), son / child (filial), iron (ferrous), hunger (famine), beautiful (formosa), done / fact (factum)",
      "explanation": "Every one of these words began with F- in Rome and shifted to silent H- in Castile.",
      "id": "es2701_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish el hijo ('son', hija 'daughter', from Latin fīlius) shares its root with which English adjective meaning 'relating to a son or daughter' (as in '___ piety' or 'affiliate')?",
      "target_answer": "filial",
      "meaning": "filial and affiliate ('to adopt as a son') preserve the Latin f- of hijo!",
      "explanation": "Latin fīlius ('son') gave English filial and affiliate, and Spanish hijo.",
      "id": "es2701_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I want to make a reservation' in Spanish?",
      "options": [
        "*Quiero hecho una reservación",
        "Quiero hacer una reservación",
        "*Quiero fabricar una reservación"
      ],
      "target_answer": "Quiero hacer una reservación",
      "meaning": "I want to make a reservation",
      "explanation": "hacer covers both 'to do' and 'to make': hacer una reservación.",
      "id": "es2701_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'They have two children (hijos)'",
      "target_answer": "Ellos tienen dos hijos",
      "meaning": "They have two children / sons",
      "word_bank": [
        "hijos",
        "son",
        "Ellos",
        "tienen",
        "hambre",
        "hierro",
        "dos"
      ],
      "explanation": "Ellos tienen dos hijos.",
      "id": "es2701_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero hacer una reservación hoy",
      "replays": 2,
      "target_answer": "Quiero hacer una reservación hoy",
      "meaning": "I want to make a reservation today",
      "cues": [
        "I want to make: Quiero hacer",
        "a reservation: una reservación",
        "today: hoy"
      ],
      "explanation": "Quiero hacer una reservación hoy.",
      "affirmation": "Silent-H hacer mastered!",
      "id": "es2701_e5"
    }
  ],
  "summary": {
    "outcome": "Connect hacer, hijo, hierro, hambre, hermoso, and hecho to their Latin F- cognates.",
    "use_example": {
      "german": "Mi hijo quiere hacer una reservación en esta ciudad hermosa.",
      "english": "My son wants to make a reservation in this beautiful city."
    },
    "takeaway": "Spanish hacer covers both English 'do' and 'make'.",
    "curiosity_teaser": "Up next ([2702] The Palatal Twins: -ch- & ll-): master the -ct- → -ch- and pl-/cl- → ll- word families."
  },
  "twist": {
    "prompt": "Assemble: 'The iron key (La llave de hierro)'",
    "target_answer": "La llave de hierro",
    "word_bank": [
      "hierro",
      "hecho",
      "de",
      "El",
      "hambre",
      "La",
      "llave"
    ],
    "explanation": "La llave de hierro."
  }
};

export default lesson;
