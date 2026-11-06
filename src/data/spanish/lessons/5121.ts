import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5121,
  "slug": "en-el-restaurante-mesa-cuenta",
  "title": "En el Restaurante: La Mesa & La Cuenta",
  "subtitle": "Reserving una mesa, ordering with quiero / para mí, and asking for la cuenta",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mesa",
    "restaurante",
    "cuenta",
    "reservar",
    "pedir",
    "traer",
    "para",
    "dos",
    "por_favor",
    "gracias"
  ],
  "table_word_ids": [
    "mesa",
    "restaurante",
    "cuenta",
    "reservar",
    "pedir",
    "traer",
    "para",
    "dos",
    "por_favor",
    "gracias"
  ],
  "hook": {
    "title": "From Walking In to Paying the Bill",
    "content": "Here is the complete arc of a Spanish restaurant visit using pieces you already command:\n1) **Arriving**: *Buenas noches, tenemos una reservación — una mesa para dos, por favor.*\n2) **Ordering**: *Para mí, un bocadillo, por favor* ('For me, a sandwich, please') or *Quiero pedir...*\n3) **Finishing**: *¿Me trae la cuenta, por favor?* ('Will you bring me the bill, please?')."
  },
  "pattern": {
    "title": "Why 'A Table for Two' Uses 'Para'",
    "content": "Because the two diners are the intended recipients of the table, 'a table for two' is always **una mesa para dos**!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "a table for two",
          "german": "una mesa para dos"
        },
        {
          "id": "p2",
          "english": "for me (after preposition: mí with tilde!)",
          "german": "para mí"
        },
        {
          "id": "p3",
          "english": "I want to order",
          "german": "quiero pedir"
        },
        {
          "id": "p4",
          "english": "will you bring me the bill?",
          "german": "¿me trae la cuenta?"
        },
        {
          "id": "p5",
          "english": "the restaurant is full",
          "german": "el restaurante está lleno"
        }
      ],
      "target_answer": "una mesa para dos, para mí, quiero pedir, ¿me trae la cuenta?, el restaurante está lleno",
      "meaning": "a table for two, for me (after preposition: mí with tilde!), I want to order, will you bring me the bill?, the restaurant is full",
      "explanation": "una mesa para dos, para mí, pedir, and la cuenta cover any dining experience.",
      "id": "es5121_e1"
    },
    {
      "type": "shift_select",
      "prompt": "When the waiter asks what you want, how do you say 'For me, a coffee, please'?",
      "options": [
        "*Para yo, un café, por favor",
        "*Por mi, un café, por favor",
        "Para mí, un café, por favor"
      ],
      "target_answer": "Para mí, un café, por favor",
      "meaning": "For me, a coffee, please",
      "explanation": "Recipient takes para, and after a preposition 'I/me' is accented mí: Para mí!",
      "id": "es5121_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to reserve a table for two'",
      "target_answer": "Quiero reservar una mesa para dos",
      "meaning": "I want to reserve a table for two",
      "word_bank": [
        "tres",
        "por",
        "un",
        "una",
        "dos",
        "Quiero",
        "reservar",
        "para",
        "mesa"
      ],
      "explanation": "Quiero reservar + una mesa + para dos.",
      "id": "es5121_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask politely (using usted): 'Will you bring me the bill, please?'",
      "cues": [
        "To me → ¿Me",
        "brings (usted form of traer) → trae",
        "the bill, please → la cuenta, por favor?"
      ],
      "idea_parts": [
        "Will you bring me → Me trae",
        "the bill, please → la cuenta, por favor"
      ],
      "target_answer": "Me trae la cuenta por favor",
      "meaning": "Will you bring me the bill, please?",
      "word_bank": [
        "por",
        "traigo",
        "gracias",
        "trae",
        "la",
        "cuenta",
        "Me",
        "favor",
        "el"
      ],
      "explanation": "¿Me trae la cuenta, por favor?",
      "id": "es5121_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tenemos una mesa para cuatro personas",
      "replays": 2,
      "target_answer": "Tenemos una mesa para cuatro personas",
      "meaning": "We have a table for four people",
      "cues": [
        "We have: Tenemos",
        "a table for: una mesa para",
        "four people: cuatro personas"
      ],
      "explanation": "Tenemos una mesa para cuatro personas.",
      "affirmation": "Restaurant table Spanish mastered!",
      "id": "es5121_e5"
    }
  ],
  "summary": {
    "outcome": "Reserve tables, order with para mí and pedir, and request la cuenta in a restaurant.",
    "use_example": {
      "german": "Buenas tardes, quiero reservar una mesa para dos, por favor.",
      "english": "Good afternoon, I want to reserve a table for two, please."
    },
    "takeaway": "una mesa para dos ('a table for two'), para mí ('for me'), and ¿me trae la cuenta? ('will you bring me the bill?').",
    "curiosity_teaser": "Up next ([5122] Pan, Queso, Vino & El Agua Fría): master table staples and why feminine el agua takes fría!"
  },
  "twist": {
    "prompt": "Assemble: 'The bill, please'",
    "target_answer": "La cuenta por favor",
    "word_bank": [
      "mesa",
      "favor",
      "El",
      "gracias",
      "por",
      "La",
      "cuenta"
    ],
    "explanation": "La cuenta, por favor."
  }
};

export default lesson;
