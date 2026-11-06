import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5011,
  "slug": "hola-y-gracias",
  "title": "¡Hola! y Gracias",
  "subtitle": "Greetings, thanks and politeness in dialogue drills; social warmth culture",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "hola",
    "gracias",
    "mucho",
    "por_favor",
    "adiós",
    "usted",
    "estás",
    "está"
  ],
  "table_word_ids": [
    "hola",
    "gracias",
    "mucho",
    "por_favor",
    "adiós",
    "usted",
    "estás",
    "está"
  ],
  "hook": {
    "title": "The Warmth of Iberian and Latin American Greeting",
    "content": "Everyday pleasantries open every door in Spain and Latin America. ¡Hola! greets friends and strangers alike, with an initial H that is 100% silent. And notice why Spanish thanks are always plural: gracias (from Latin grātia 'grace/favor') literally means 'graces to you'!"
  },
  "pattern": {
    "title": "Polite Formulas in Real Context",
    "content": "por favor is literally 'by favor' ('as a favor'). And when thanking someone warmly, muchas gracias uses feminine plural muchas to agree with las gracias!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "hello, hi (silent H)",
          "german": "hola"
        },
        {
          "id": "p2",
          "english": "thank you (lit. graces)",
          "german": "gracias"
        },
        {
          "id": "p3",
          "english": "thank you very much",
          "german": "muchas gracias"
        },
        {
          "id": "p4",
          "english": "please (lit. by favor)",
          "german": "por favor"
        },
        {
          "id": "p5",
          "english": "goodbye (to God)",
          "german": "adiós"
        },
        {
          "id": "p6",
          "english": "you (formal)",
          "german": "usted"
        }
      ],
      "target_answer": "hola, gracias, muchas gracias, por favor, adiós, usted",
      "meaning": "hello, hi (silent H), thank you (lit. graces), thank you very much, please (lit. by favor), goodbye (to God), you (formal)",
      "explanation": "hola has a silent H; adiós comes from a + Dios ('to God', just like French adieu).",
      "id": "es5011_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Why do we say 'Muchas gracias' with feminine plural '-as'?",
      "options": [
        "Because la gracia ('grace/favor') is a feminine noun in the plural (las gracias)",
        "Because muchas is an adverb",
        "Because gracias is a verb"
      ],
      "target_answer": "Because la gracia ('grace/favor') is a feminine noun in the plural (las gracias)",
      "meaning": "thank you very much",
      "explanation": "las gracias is feminine plural, so mucho becomes muchas: muchas gracias.",
      "id": "es5011_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'A coffee, please'",
      "target_answer": "Un café, por favor",
      "meaning": "A coffee, please",
      "word_bank": [
        "café",
        "Un",
        "Una",
        "por",
        "gracias",
        "favor",
        "adiós"
      ],
      "explanation": "Un café, por favor — the classic Spanish café order.",
      "id": "es5011_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "greet a friend warmly: 'Hello, how are you?'",
      "cues": [
        "Hello (silent H) → Hola,",
        "how are you (informal) → cómo estás"
      ],
      "idea_parts": [
        "Hello → Hola,",
        "how are you → cómo estás"
      ],
      "target_answer": "Hola, cómo estás",
      "meaning": "Hello, how are you?",
      "word_bank": [
        "usted",
        "Hola",
        "estás",
        "cómo",
        "eres",
        "gracias"
      ],
      "explanation": "¡Hola, ¿cómo estás?! — everyday informal greeting.",
      "id": "es5011_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Muchas gracias, por favor'?",
      "german": "Muchas gracias, por favor",
      "natural": "Many thanks, please",
      "options": [
        "Much thank you, for please",
        "Many graces, by favor",
        "Very thanks, for favor",
        "Many thanks, please"
      ],
      "target_answer": "Many graces, by favor",
      "meaning": "Many thanks, please (literal Spanish blueprint: Many graces, by favor)",
      "explanation": "Muchas gracias ('Many graces') + por favor ('by favor').",
      "id": "es5011_e5"
    }
  ],
  "summary": {
    "outcome": "Greet, thank, and make polite requests with authentic Spanish formulas.",
    "use_example": {
      "german": "¡Hola! Un café, por favor. — Muchas gracias.",
      "english": "Hello! A coffee, please. — Thank you very much."
    },
    "takeaway": "gracias is feminine plural ('graces'), so 'thank you very much' is muchas gracias.",
    "curiosity_teaser": "Up next ([5012] The Alphabet & Me llamo): introduce yourself with reflexive me llamo."
  },
  "twist": {
    "prompt": "Assemble: 'Goodbye, thank you very much'",
    "target_answer": "Adiós, muchas gracias",
    "word_bank": [
      "Adiós",
      "gracias",
      "favor",
      "muchos",
      "por",
      "muchas"
    ],
    "explanation": "¡Adiós, muchas gracias!"
  }
};

export default lesson;
