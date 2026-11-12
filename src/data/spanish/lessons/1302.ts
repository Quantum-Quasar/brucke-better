import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1302,
  "slug": "por-motive-and-path",
  "title": "por: The Motive and Path",
  "subtitle": "Because of, in exchange for, through: gracias por la invitación, por la mañana, por aquí",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "por",
    "gracias",
    "invitación",
    "por_favor",
    "mañana",
    "noche",
    "aquí",
    "allí",
    "diez"
  ],
  "table_word_ids": [
    "por",
    "gracias",
    "invitación",
    "por_favor",
    "mañana",
    "noche",
    "aquí",
    "allí",
    "diez"
  ],
  "hook": {
    "title": "The Scale and the Tunnel",
    "content": "Picture two images for por:\n1) **A Balance Scale (Exchange & Cause)**: I give you thanks in exchange for / because of the invitation (gracias por la invitación); I buy the book in exchange for ten euros (por diez euros); I do it as a favor (por favor).\n2) **A Tunnel or Path Through Space/Time**: walking through here (por aquí), traveling by train, or during a part of the day (por la mañana 'in the morning', por la noche 'at night')!"
  },
  "pattern": {
    "title": "Contrast: Para Mañana vs Por la Mañana",
    "content": "Look at how the article changes the meaning: para mañana = 'for/by tomorrow' (deadline arrow); por la mañana = 'in the morning' (time window)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "thanks for the invitation",
          "german": "gracias por la invitación"
        },
        {
          "id": "p2",
          "english": "in the morning",
          "german": "por la mañana"
        },
        {
          "id": "p3",
          "english": "at night / in the evening",
          "german": "por la noche"
        },
        {
          "id": "p4",
          "english": "around here / this way",
          "german": "por aquí"
        },
        {
          "id": "p5",
          "english": "for ten euros (in exchange for)",
          "german": "por diez euros"
        },
        {
          "id": "p6",
          "english": "please ('by favor')",
          "german": "por favor"
        }
      ],
      "target_answer": "gracias por la invitación, por la mañana, por la noche, por aquí, por diez euros, por favor",
      "meaning": "thanks for the invitation, in the morning, at night / in the evening, around here / this way, for ten euros (in exchange for), please ('by favor')",
      "explanation": "por expresses motive/cause, exchange/price, path through space, and parts of the day.",
      "id": "es1302_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Contrast the two phrases: what is the difference between 'para mañana' and 'por la mañana'?",
      "options": [
        "They mean the exact same thing",
        "para mañana = 'for/by tomorrow' (deadline); por la mañana = 'in the morning' (part of day)",
        "para mañana = 'in the morning'; por la mañana = 'for tomorrow'"
      ],
      "target_answer": "para mañana = 'for/by tomorrow' (deadline); por la mañana = 'in the morning' (part of day)",
      "meaning": "for tomorrow vs in the morning",
      "explanation": "para points to tomorrow's deadline; por la mañana names the morning time window.",
      "id": "es1302_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Is there a hotel around here?'",
      "target_answer": "Hay un hotel por aquí",
      "meaning": "Is there a hotel around here?",
      "word_bank": [
        "Hay",
        "para",
        "aquí",
        "Está",
        "un",
        "hotel",
        "por",
        "la"
      ],
      "explanation": "¿Hay un hotel por aquí? — por aquí means 'around here / through this area'.",
      "id": "es1302_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'Thank you very much for the invitation'",
      "cues": [
        "Thank you very much → Muchas gracias",
        "for (because of) → por",
        "the invitation → la invitación"
      ],
      "idea_parts": [
        "Thank you very much → Muchas gracias",
        "for the invitation → por la invitación"
      ],
      "target_answer": "Muchas gracias por la invitación",
      "meaning": "Thank you very much for the invitation",
      "word_bank": [
        "por",
        "la",
        "el",
        "Muchas",
        "gracias",
        "regalo",
        "invitación",
        "para"
      ],
      "explanation": "Muchas gracias por la invitación.",
      "id": "es1302_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Estudio por la mañana",
      "replays": 2,
      "target_answer": "Estudio por la mañana",
      "meaning": "I study in the morning",
      "cues": [
        "I study: Estudio",
        "in the (during the): por la",
        "morning: mañana"
      ],
      "explanation": "Estudio por la mañana.",
      "affirmation": "You nailed por la mañana!",
      "id": "es1302_e5"
    }
  ],
  "summary": {
    "outcome": "Use por for gratitude/cause, price/exchange, spatial paths (por aquí), and parts of the day (por la mañana).",
    "use_example": {
      "german": "Muchas gracias por la invitación — voy por la mañana.",
      "english": "Thank you very much for the invitation — I am going in the morning."
    },
    "takeaway": "por = because of, in exchange for, through/around (por aquí), and during parts of the day (por la mañana).",
    "curiosity_teaser": "Up next ([5121] En el Restaurante: La Mesa & La Cuenta): reserve una mesa and order para mí!"
  },
  "twist": {
    "prompt": "Assemble: 'I buy the book for ten euros'",
    "target_answer": "Compro el libro por diez euros",
    "word_bank": [
      "Compro",
      "a",
      "euros",
      "la",
      "diez",
      "para",
      "por",
      "el",
      "libro"
    ],
    "explanation": "Price/exchange on the scale always takes por: por diez euros."
  }
};

export default lesson;
