import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1301,
  "slug": "para-the-arrow",
  "title": "para: The Arrow",
  "subtitle": "Destination, deadline, recipient, goal: un regalo para ti, para mañana, para comprender",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "para",
    "regalo",
    "mañana",
    "comprender",
    "hablar",
    "vivir",
    "terminar",
    "madre",
    "amigo"
  ],
  "table_word_ids": [
    "para",
    "regalo",
    "mañana",
    "comprender",
    "hablar",
    "vivir",
    "terminar",
    "madre",
    "amigo"
  ],
  "hook": {
    "title": "Four Targets of the Para Arrow",
    "content": "1) **Recipient**: Es para mi amigo ('It's for my friend'), Es para mí ('It's for me').\n2) **Destination**: El tren para Madrid ('The train for/to Madrid').\n3) **Deadline**: Es para mañana ('It's due for/by tomorrow').\n4) **Goal ('in order to' + infinitive)**: Estudio para comprender ('I study in order to understand')."
  },
  "pattern": {
    "title": "Why 'Para + Infinitive' Means 'In Order To'",
    "content": "In English, we often say 'to' when we mean 'in order to': 'I'm calling to confirm'. In Spanish, whenever 'to [verb]' means 'in order to [verb]', you MUST use para + infinitive: para confirmar ('in order to confirm')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "for my friend (recipient)",
          "german": "para mi amigo"
        },
        {
          "id": "p2",
          "english": "for tomorrow (deadline)",
          "german": "para mañana"
        },
        {
          "id": "p3",
          "english": "for Madrid (destination)",
          "german": "para Madrid"
        },
        {
          "id": "p4",
          "english": "in order to understand (goal)",
          "german": "para comprender"
        },
        {
          "id": "p5",
          "english": "in order to finish (goal)",
          "german": "para terminar"
        }
      ],
      "target_answer": "para mi amigo, para mañana, para Madrid, para comprender, para terminar",
      "meaning": "for my friend (recipient), for tomorrow (deadline), for Madrid (destination), in order to understand (goal), in order to finish (goal)",
      "explanation": "All four uses of para point forward to an endpoint or goal.",
      "id": "es1301_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I want time in order to finish'?",
      "options": [
        "Quiero tiempo para terminar",
        "Quiero tiempo por terminar",
        "Quiero tiempo a terminar"
      ],
      "target_answer": "Quiero tiempo para terminar",
      "meaning": "I want time in order to finish",
      "explanation": "When 'to [verb]' means 'in order to [verb]', Spanish uses para + infinitive.",
      "id": "es1301_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The gift is for my mother'",
      "target_answer": "El regalo es para mi madre",
      "meaning": "The gift is for my mother",
      "word_bank": [
        "es",
        "para",
        "El",
        "está",
        "regalo",
        "La",
        "por",
        "madre",
        "mi"
      ],
      "explanation": "El regalo es para mi madre — recipient takes para.",
      "id": "es1301_e3"
    },
    {
      "id": "es1301_e4",
      "type": "spoken_turn_reply",
      "prompt": "Reply to the question in Spanish:",
      "spoken_question": "¿Dónde está la estación de tren?",
      "question_meaning": "Where is the train station?",
      "reply_idea": "Reply that the station is here.",
      "cues": [
        "Start with La estación...",
        "Use está (location) + aquí."
      ],
      "word_bank": [
        "estación",
        "es",
        "está",
        "allí",
        "La",
        "aquí"
      ],
      "target_answer": "La estación está aquí",
      "meaning": "The station is here",
      "explanation": "Physical location always uses estar (está), never ser (es): La estación está aquí."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es un regalo para mi amigo",
      "replays": 2,
      "target_answer": "Es un regalo para mi amigo",
      "meaning": "It is a gift for my friend",
      "cues": [
        "It is: Es",
        "a gift: un regalo",
        "for my friend: para mi amigo"
      ],
      "explanation": "Es un regalo para mi amigo.",
      "affirmation": "Clean recipient arrow with para!",
      "id": "es1301_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy para for recipients, destinations, deadlines, and 'in order to' purpose clauses.",
    "use_example": {
      "german": "Es un regalo para mi madre y la confirmación es para mañana.",
      "english": "It is a gift for my mother and the confirmation is for tomorrow."
    },
    "takeaway": "Whenever 'to + verb' in English can be expanded to 'in order to + verb', use para + infinitive.",
    "curiosity_teaser": "Up next ([1302] por: The Motive and Path): master the cause, exchange, and path uses of por."
  },
  "twist": {
    "prompt": "Assemble: 'In order to understand Spanish'",
    "target_answer": "Para comprender el español",
    "word_bank": [
      "a",
      "español",
      "Por",
      "la",
      "el",
      "Para",
      "comprender"
    ],
    "explanation": "Para comprender el español."
  }
};

export default lesson;
