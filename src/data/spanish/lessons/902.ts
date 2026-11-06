import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 902,
  "slug": "politeness-toolkit",
  "title": "The Politeness Toolkit",
  "subtitle": "por favor, muchas gracias, buenos días, señor/señora — social courtesies in context",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "hola",
    "gracias",
    "mucho",
    "por_favor",
    "adiós",
    "buenos_días",
    "buenas_tardes",
    "buenas_noches",
    "señor",
    "señora"
  ],
  "table_word_ids": [
    "hola",
    "gracias",
    "mucho",
    "por_favor",
    "adiós",
    "buenos_días",
    "buenas_tardes",
    "buenas_noches",
    "señor",
    "señora"
  ],
  "hook": {
    "title": "Why 'Buenos Días' Is Masculine While 'Buenas Tardes' Is Feminine",
    "content": "Have you ever wondered why Spanish says BUENOS días ('good morning') with masculine -os, yet BUENAS tardes ('good afternoon') and BUENAS noches ('good evening/night') with feminine -as? Because el día ('the day', from Latin masculine diēs) is one of Spanish's famous masculine words ending in -a, whereas la tarde and la noche are feminine!"
  },
  "pattern": {
    "title": "Muchas Gracias: Why 'Mucho' Agrees While 'Muy' Never Does",
    "content": "In Topic 5 you learned muy ('very': muy bueno). Before a noun like gracias ('graces/thanks'), Spanish uses mucho/a/os/as ('much/many'): muchas gracias ('many thanks')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "good morning",
          "german": "buenos días"
        },
        {
          "id": "p2",
          "english": "good afternoon",
          "german": "buenas tardes"
        },
        {
          "id": "p3",
          "english": "good evening / good night",
          "german": "buenas noches"
        },
        {
          "id": "p4",
          "english": "thank you very much",
          "german": "muchas gracias"
        },
        {
          "id": "p5",
          "english": "please",
          "german": "por favor"
        },
        {
          "id": "p6",
          "english": "goodbye",
          "german": "adiós"
        }
      ],
      "target_answer": "buenos días, buenas tardes, buenas noches, muchas gracias, por favor, adiós",
      "meaning": "good morning, good afternoon, good evening / good night, thank you very much, please, goodbye",
      "explanation": "buenos (-os) for masculine días; buenas (-as) for feminine tardes, noches, and gracias.",
      "id": "es902_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Why do we say 'buenos días' with -os instead of *-as?",
      "options": [
        "Because días is an adverb",
        "Because el día is grammatically masculine (from Latin diēs)",
        "Because morning is longer than night"
      ],
      "target_answer": "Because el día is grammatically masculine (from Latin diēs)",
      "meaning": "good morning",
      "explanation": "el día is masculine despite ending in -a, so its adjective takes masculine plural -os: buenos días.",
      "id": "es902_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Good morning, sir'",
      "target_answer": "Buenos días señor",
      "meaning": "Good morning, sir",
      "word_bank": [
        "Buenos",
        "tardes",
        "el",
        "días",
        "Buenas",
        "señor"
      ],
      "explanation": "Buenos días, señor — no article before señor when speaking directly to him.",
      "id": "es902_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'Thank you very much, madam'",
      "cues": [
        "Many thanks (feminine plural) → Muchas gracias",
        "madam → señora"
      ],
      "idea_parts": [
        "Thank you very much → Muchas gracias",
        "madam → señora"
      ],
      "target_answer": "Muchas gracias señora",
      "meaning": "Thank you very much, madam",
      "word_bank": [
        "señora",
        "gracias",
        "Muy",
        "señor",
        "Muchas",
        "Muchos"
      ],
      "explanation": "Muchas gracias, señora — muchas agrees in gender and number with feminine plural gracias.",
      "id": "es902_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Buenas tardes a todos",
      "replays": 2,
      "target_answer": "Buenas tardes a todos",
      "meaning": "Good afternoon to everyone",
      "cues": [
        "Good (fem. pl.): Buenas",
        "afternoons: tardes",
        "to all: a todos"
      ],
      "explanation": "Buenas tardes a todos — warm plural greeting.",
      "affirmation": "Clean gender agreement across greetings!",
      "id": "es902_e5"
    }
  ],
  "summary": {
    "outcome": "Use buenos días, buenas tardes, buenas noches, and muchas gracias with accurate gender agreement.",
    "use_example": {
      "german": "Buenos días, señora — un café, por favor. ¡Muchas gracias!",
      "english": "Good morning, madam — a coffee, please. Thank you very much!"
    },
    "takeaway": "el día is masculine (buenos días); la tarde, la noche, and las gracias are feminine (buenas tardes, muchas gracias).",
    "curiosity_teaser": "Up next ([10] tener & hay): unlock possession (tengo, tienes) and universal existence (hay)."
  },
  "twist": {
    "prompt": "Assemble: 'Good night, until tomorrow'",
    "target_answer": "Buenas noches hasta mañana",
    "word_bank": [
      "Buenas",
      "Buenos",
      "por",
      "días",
      "hasta",
      "mañana",
      "noches"
    ],
    "explanation": "Buenas noches, hasta mañana."
  }
};

export default lesson;
