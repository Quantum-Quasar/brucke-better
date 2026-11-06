import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1502,
  "slug": "age-as-possession",
  "title": "Age as Possession",
  "subtitle": "Why Spanish says 'I have years': tener with age (tengo treinta años) and numbers 30–100",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "treinta",
    "veinte",
    "cien",
    "año",
    "tener",
    "tengo",
    "tienes",
    "tiene",
    "cuánto",
    "hermano"
  ],
  "table_word_ids": [
    "treinta",
    "veinte",
    "cien",
    "año",
    "tener",
    "tengo",
    "tienes",
    "tiene",
    "cuánto",
    "hermano"
  ],
  "hook": {
    "title": "Joining Tens and Ones with 'y' (31–99)",
    "content": "From 30 upward, Spanish joins tens and ones cleanly with y ('and'): treinta y uno (31), treinta y dos (32), treinta y cinco (35). And 100 is simply cien before any noun (cien años 'a hundred years', cien por cien '100 percent')!"
  },
  "pattern": {
    "title": "Talking About Family Ages",
    "content": "Practice using tiene for 3rd-person ages: Mi hermano tiene veinte años ('My brother is twenty years old')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "thirty",
          "german": "treinta"
        },
        {
          "id": "p2",
          "english": "thirty-two",
          "german": "treinta y dos"
        },
        {
          "id": "p3",
          "english": "thirty-five",
          "german": "treinta y cinco"
        },
        {
          "id": "p4",
          "english": "one hundred",
          "german": "cien"
        },
        {
          "id": "p5",
          "english": "I am thirty years old",
          "german": "tengo treinta años"
        },
        {
          "id": "p6",
          "english": "how old are you?",
          "german": "¿cuántos años tienes?"
        }
      ],
      "target_answer": "treinta, treinta y dos, treinta y cinco, cien, tengo treinta años, ¿cuántos años tienes?",
      "meaning": "thirty, thirty-two, thirty-five, one hundred, I am thirty years old, how old are you?",
      "explanation": "Tens from 30 to 90 link to ones with y ('and').",
      "id": "es1502_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'thirty-five' in Spanish from its three parts:",
      "tile_options": [
        "treinta",
        "de",
        "cinco",
        "y"
      ],
      "target_answer": "treintaycinco",
      "meaning": "treinta y cinco (thirty-five)",
      "explanation": "treinta + y + cinco.",
      "id": "es1502_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'My brother is twenty years old'",
      "target_answer": "Mi hermano tiene veinte años",
      "meaning": "My brother is twenty years old",
      "word_bank": [
        "está",
        "es",
        "hermano",
        "tiene",
        "años",
        "tengo",
        "Mi",
        "veinte"
      ],
      "explanation": "Mi hermano + tiene + veinte + años.",
      "id": "es1502_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'One hundred percent'",
      "cues": [
        "One hundred → Cien",
        "per / by → por",
        "hundred → cien"
      ],
      "idea_parts": [
        "One hundred → Cien",
        "percent → por cien"
      ],
      "target_answer": "Cien por cien",
      "meaning": "One hundred percent",
      "word_bank": [
        "años",
        "por",
        "para",
        "treinta",
        "Cien",
        "cien"
      ],
      "explanation": "Cien por cien (or cien por ciento) — por expresses rates and percentages.",
      "id": "es1502_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Mi madre tiene treinta años",
      "replays": 2,
      "target_answer": "Mi madre tiene treinta años",
      "meaning": "My mother is thirty years old",
      "cues": [
        "My mother: Mi madre",
        "has (is): tiene",
        "thirty years: treinta años"
      ],
      "explanation": "Mi madre tiene treinta años.",
      "affirmation": "Age with tener mastered!",
      "id": "es1502_e5"
    }
  ],
  "summary": {
    "outcome": "Build compound numbers with y and express ages across family members using tener.",
    "use_example": {
      "german": "Tengo treinta y dos años y mi hermano tiene veinte años.",
      "english": "I am thirty-two years old and my brother is twenty."
    },
    "takeaway": "Never drop años when stating someone's age in conversation: Tengo treinta años.",
    "curiosity_teaser": "Up next ([1503] Tener Expressions: hambre, sed & razón): discover how Spanish possesses hunger, thirst, cold, warmth, and 'being right'!"
  },
  "twist": {
    "prompt": "Assemble: 'Are you twenty years old?'",
    "target_answer": "Tienes veinte años",
    "word_bank": [
      "Tengo",
      "Estás",
      "años",
      "Tienes",
      "Eres",
      "veinte"
    ],
    "explanation": "¿Tienes veinte años?"
  }
};

export default lesson;
