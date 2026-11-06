import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5012,
  "slug": "alphabet-me-llamo",
  "title": "The Alphabet & Me llamo",
  "subtitle": "El alfabeto, spelling your name, me llamo — introducing yourself with taught pieces",
  "phase": 1,
  "shift_categories": [
    "pl_cl_fl_to_ll"
  ],
  "word_ids": [
    "llamar",
    "me_llamo",
    "cómo",
    "letra",
    "buenos_días",
    "buenas_tardes",
    "buenas_noches"
  ],
  "table_word_ids": [
    "llamar",
    "me_llamo",
    "cómo",
    "letra",
    "buenos_días",
    "buenas_tardes",
    "buenas_noches"
  ],
  "hook": {
    "title": "Introducing Yourself with an Action: Me Llamo",
    "content": "English introduces with a noun ('My name is Alex'). Spanish introduces with an active verb: **Me llamo Alex** — word for word, **'I call myself Alex'**! The verb is llamar, descended from Latin clāmāre ('to call/shout') — the exact same root behind English 'claim', 'clamor', and 'exclaim'!"
  },
  "pattern": {
    "title": "Latin cl- Shifted to Spanish ll-",
    "content": "Whenever a Latin word began with cl- or pl-, Spanish softened it into ll-: clāmāre → llamar ('to call'), clāvis → llave ('key'), pluvia → lluvia ('rain')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to call (claim/clamor)",
          "german": "llamar"
        },
        {
          "id": "p2",
          "english": "my name is (I call myself)",
          "german": "me llamo"
        },
        {
          "id": "p3",
          "english": "what is your name? (how do you call yourself?)",
          "german": "¿cómo te llamas?"
        },
        {
          "id": "p4",
          "english": "good morning (masculine plural!)",
          "german": "buenos días"
        },
        {
          "id": "p5",
          "english": "good afternoon (feminine plural)",
          "german": "buenas tardes"
        },
        {
          "id": "p6",
          "english": "the letter (of the alphabet)",
          "german": "la letra"
        }
      ],
      "target_answer": "llamar, me llamo, ¿cómo te llamas?, buenos días, buenas tardes, la letra",
      "meaning": "to call (claim/clamor), my name is (I call myself), what is your name? (how do you call yourself?), good morning (masculine plural!), good afternoon (feminine plural), the letter (of the alphabet)",
      "explanation": "llamar (cl- → ll-) powers me llamo and ¿cómo te llamas?",
      "id": "es5012_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish llamar ('to call', from Latin clāmāre via cl- → ll-) shares its root with which English verb meaning 'to assert or call something one's own' (and 'ex-___')?",
      "target_answer": "claim",
      "meaning": "to claim or exclaim is literally Latin clāmāre ('to call out')!",
      "explanation": "Latin clāmāre gave English claim, exclaim, clamor, and Spanish llamar.",
      "id": "es5012_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Good morning, my name is Alex'",
      "target_answer": "Buenos días, me llamo Alex",
      "meaning": "Good morning, my name is Alex",
      "word_bank": [
        "te",
        "tardes",
        "me",
        "Alex",
        "llamo",
        "Buenas",
        "Buenos",
        "días"
      ],
      "explanation": "¡Buenos días, me llamo Alex!",
      "id": "es5012_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask someone their name: 'What is your name? (How do you call yourself?)'",
      "cues": [
        "How → ¿Cómo",
        "yourself → te",
        "you call → llamas?"
      ],
      "idea_parts": [
        "How → Cómo",
        "do you call yourself → te llamas"
      ],
      "target_answer": "Cómo te llamas",
      "meaning": "What is your name?",
      "word_bank": [
        "llamo",
        "Cómo",
        "llamas",
        "me",
        "Dónde",
        "te"
      ],
      "explanation": "¿Cómo te llamas? — literally 'How do you call yourself?'.",
      "id": "es5012_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Me llamo Alex'?",
      "german": "Me llamo Alex",
      "natural": "My name is Alex",
      "options": [
        "My name is Alex",
        "Me calls Alex",
        "Myself I-call Alex",
        "My name calls Alex"
      ],
      "target_answer": "Myself I-call Alex",
      "meaning": "My name is Alex (literal Spanish blueprint: Myself I-call Alex)",
      "explanation": "Me ('Myself') + llamo ('I-call') + Alex.",
      "id": "es5012_e5"
    }
  ],
  "summary": {
    "outcome": "Introduce yourself with me llamo, ask ¿cómo te llamas?, and greet throughout the day.",
    "use_example": {
      "german": "¡Buenos días! Me llamo Alex — ¿cómo te llamas?",
      "english": "Good morning! My name is Alex — what is your name?"
    },
    "takeaway": "me llamo is literally 'I call myself' (from llamar, Latin clāmāre).",
    "curiosity_teaser": "Explore the next support branch ([5021] The Five Pure Vowels) for vowel purity and the -ct- → -ch- sound shift!"
  },
  "twist": {
    "prompt": "Assemble: 'Good afternoon, how are you?'",
    "target_answer": "Buenas tardes, cómo estás",
    "word_bank": [
      "Buenos",
      "Buenas",
      "eres",
      "cómo",
      "estás",
      "días",
      "tardes"
    ],
    "explanation": "¡Buenas tardes! ¿Cómo estás?"
  }
};

export default lesson;
