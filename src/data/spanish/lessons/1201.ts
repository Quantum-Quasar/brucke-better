import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1201,
  "slug": "voy-vas-va-drills",
  "title": "voy, vas, va Drills",
  "subtitle": "Conjugating ir (voy, vas, va, vamos, van) and attaching newly converted -ar verbs: voy a visitar",
  "phase": 2,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "ir",
    "voy",
    "vas",
    "va",
    "vamos",
    "van",
    "a",
    "restaurante",
    "hotel",
    "organizar",
    "preparar"
  ],
  "table_word_ids": [
    "ir",
    "voy",
    "vas",
    "va",
    "vamos",
    "van",
    "a",
    "restaurante",
    "hotel",
    "organizar",
    "preparar"
  ],
  "hook": {
    "title": "Going to Places vs Going to Act",
    "content": "Notice that ir a works both before a verb (Voy a preparar el café = 'I'm going to prepare the coffee') AND before a place! And when a ('to') meets the masculine article el ('the'), they fuse into one mandatory contraction: a + el = al (Voy al hotel 'I'm going to the hotel', Vamos al restaurante 'Let's go to the restaurant')!"
  },
  "pattern": {
    "title": "The '-oy' Trio: soy, estoy, voy",
    "content": "Notice how the three big engines of Spanish all end in -oy in the 'I' form: soy ('I am' - essence), estoy ('I am' - state), voy ('I go')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am going to organize",
          "german": "voy a organizar"
        },
        {
          "id": "p2",
          "english": "you are going to prepare",
          "german": "vas a preparar"
        },
        {
          "id": "p3",
          "english": "he / she / usted is going",
          "german": "va"
        },
        {
          "id": "p4",
          "english": "we are going / let's go",
          "german": "vamos"
        },
        {
          "id": "p5",
          "english": "to the hotel (a + el)",
          "german": "al hotel"
        },
        {
          "id": "p6",
          "english": "to the house (feminine)",
          "german": "a la casa"
        }
      ],
      "target_answer": "voy a organizar, vas a preparar, va, vamos, al hotel, a la casa",
      "meaning": "I am going to organize, you are going to prepare, he / she / usted is going, we are going / let's go, to the hotel (a + el), to the house (feminine)",
      "explanation": "Before masculine singular el, a + el contracts to al.",
      "id": "es1201_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Contract 'a + el restaurante' ('to the restaurant') into natural Spanish:",
      "tile_options": [
        "restaurante",
        "al",
        "a el",
        "del"
      ],
      "target_answer": "alrestaurante",
      "meaning": "al restaurante (to the restaurant)",
      "explanation": "a + el MUST contract to al.",
      "id": "es1201_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'We are going to the hotel'?",
      "options": [
        "Vamos a la hotel",
        "Vamos al hotel",
        "Vamos a el hotel"
      ],
      "target_answer": "Vamos al hotel",
      "meaning": "We are going to the hotel",
      "explanation": "a + el contracts to al: Vamos al hotel.",
      "id": "es1201_e3"
    },
    {
      "id": "es1201_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question in the negative in Spanish:",
      "spoken_question": "¿Hablas alemán en casa?",
      "question_meaning": "Do you speak German at home?",
      "reply_idea": "Reply that no, you speak Spanish.",
      "cues": [
        "Open with No hablo...",
        "Finish with español."
      ],
      "word_bank": [
        "español",
        "casa",
        "hablo",
        "sí",
        "alemán",
        "No"
      ],
      "target_answer": "No hablo español",
      "meaning": "No, I speak Spanish",
      "explanation": "Spanish negation simply places no directly before the conjugated verb."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vamos al restaurante hoy",
      "replays": 2,
      "target_answer": "Vamos al restaurante hoy",
      "meaning": "We are going to the restaurant today",
      "cues": [
        "We are going: Vamos",
        "to the (a + el): al",
        "restaurant today: restaurante hoy"
      ],
      "explanation": "Vamos al restaurante hoy.",
      "affirmation": "You caught the mandatory contraction al!",
      "id": "es1201_e5"
    }
  ],
  "summary": {
    "outcome": "Chain voy/vas/va/vamos/van with infinitives and destinations using the mandatory contraction al.",
    "use_example": {
      "german": "Vamos al restaurante porque voy a organizar la cena.",
      "english": "We are going to the restaurant because I am going to organize dinner."
    },
    "takeaway": "a + el always contracts to al; a + la stays a la.",
    "curiosity_teaser": "Up next ([1202] Near Future in Conversation): combine hoy and mañana with near-future questions and plans."
  },
  "twist": {
    "prompt": "Assemble: 'Are you going to the hotel?'",
    "target_answer": "Vas al hotel",
    "word_bank": [
      "Vas",
      "el",
      "Voy",
      "al",
      "a",
      "hotel"
    ],
    "explanation": "¿Vas al hotel? uses al (a + el)."
  }
};

export default lesson;
