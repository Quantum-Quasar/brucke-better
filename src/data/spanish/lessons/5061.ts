import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5061,
  "slug": "cuanto-es-shopping-euros",
  "title": "¿Cuánto es?",
  "subtitle": "Asking prices with ¿Cuánto cuesta? / ¿Cuánto es?, numbers 1–100, and pedir la cuenta",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "cuánto",
    "es",
    "diez",
    "veinte",
    "treinta",
    "cien",
    "comprar",
    "pedir",
    "cuenta",
    "por"
  ],
  "table_word_ids": [
    "cuánto",
    "es",
    "diez",
    "veinte",
    "treinta",
    "cien",
    "comprar",
    "pedir",
    "cuenta",
    "por"
  ],
  "hook": {
    "title": "Asking the Price: ¿Cuánto Es? & ¿Cuánto Cuesta?",
    "content": "Whether you are at a bookshop in Madrid or a market in Bogotá, asking the price is effortless: **¿Cuánto es?** ('How much is it?') or **¿Cuánto cuesta esto?** ('How much does this cost?'). And when paying or stating what you bought something for, remember the Balance Scale of **por**: Compro el libro **por veinte euros**!"
  },
  "pattern": {
    "title": "Ordering and Asking for the Bill with Pedir",
    "content": "Remember our e→i boot verb **pedir** ('to ask for / order': yo pido, tú pides): Quiero pedir la cuenta ('I want to ask for the bill')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "how much is it?",
          "german": "¿cuánto es?"
        },
        {
          "id": "p2",
          "english": "ten euros",
          "german": "diez euros"
        },
        {
          "id": "p3",
          "english": "twenty euros",
          "german": "veinte euros"
        },
        {
          "id": "p4",
          "english": "thirty euros",
          "german": "treinta euros"
        },
        {
          "id": "p5",
          "english": "for (in exchange for) ten euros",
          "german": "por diez euros"
        },
        {
          "id": "p6",
          "english": "the bill, please",
          "german": "la cuenta, por favor"
        }
      ],
      "target_answer": "¿cuánto es?, diez euros, veinte euros, treinta euros, por diez euros, la cuenta, por favor",
      "meaning": "how much is it?, ten euros, twenty euros, thirty euros, for (in exchange for) ten euros, the bill, please",
      "explanation": "¿Cuánto es? asks the total; por states the price paid in exchange.",
      "id": "es5061_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I want to buy this book for twenty euros'?",
      "options": [
        "*Quiero comprar este libro para veinte euros",
        "Quiero comprar este libro por veinte euros",
        "*Quiero comprar esto libro por veinte euros"
      ],
      "target_answer": "Quiero comprar este libro por veinte euros",
      "meaning": "I want to buy this book for twenty euros",
      "explanation": "Financial exchange on the scale always uses por (never para!).",
      "id": "es5061_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'How much is this?'",
      "target_answer": "Cuánto es esto",
      "meaning": "How much is this?",
      "word_bank": [
        "está",
        "esto",
        "Cuánto",
        "este",
        "es",
        "esta"
      ],
      "explanation": "¿Cuánto es esto? uses neuter esto when pointing at an item.",
      "id": "es5061_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you want to ask for the bill ('Quiero pedir la cuenta')",
      "cues": [
        "I want → Quiero",
        "to ask for (pedir needs no 'for'!) → pedir",
        "the bill → la cuenta"
      ],
      "idea_parts": [
        "I want to ask for → Quiero pedir",
        "the bill → la cuenta"
      ],
      "target_answer": "Quiero pedir la cuenta",
      "meaning": "I want to ask for the bill",
      "word_bank": [
        "la",
        "cuenta",
        "Quiero",
        "para",
        "por",
        "pedir",
        "el"
      ],
      "explanation": "Quiero pedir la cuenta.",
      "id": "es5061_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Son treinta euros por favor",
      "replays": 2,
      "target_answer": "Son treinta euros por favor",
      "meaning": "It is thirty euros, please",
      "cues": [
        "They are (plural euros): Son",
        "thirty euros: treinta euros",
        "please: por favor"
      ],
      "explanation": "Son treinta euros, por favor — plural prices use Son ('They are thirty euros')!",
      "affirmation": "Shopping and prices mastered!",
      "id": "es5061_e5"
    }
  ],
  "summary": {
    "outcome": "Ask prices with ¿Cuánto es?, state totals with Es un euro / Son veinte euros, and pay with por.",
    "use_example": {
      "german": "¿Cuánto es esto? — Son veinte euros, por favor.",
      "english": "How much is this? — It is twenty euros, please."
    },
    "takeaway": "Plural prices use Son ('Son diez euros') — and prices in exchange always take por.",
    "curiosity_teaser": "Next branch ([5071] No he terminado): practice negative and question sentences in the -ado/-ido past!"
  },
  "twist": {
    "prompt": "Assemble: 'It is ten euros (Son diez euros)'",
    "target_answer": "Son diez euros",
    "word_bank": [
      "Están",
      "Son",
      "euros",
      "Es",
      "diez",
      "veinte"
    ],
    "explanation": "Son diez euros."
  }
};

export default lesson;
