import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1001,
  "slug": "tengo-and-tienes-gym",
  "title": "tengo & tienes Gym",
  "subtitle": "Irregular first person tengo and stem-changing tienes/tiene/tenemos/tienen in possession drills",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "tener",
    "tengo",
    "tienes",
    "tiene",
    "tenemos",
    "tienen",
    "llave",
    "billete",
    "reservación",
    "tiempo"
  ],
  "table_word_ids": [
    "tener",
    "tengo",
    "tienes",
    "tiene",
    "tenemos",
    "tienen",
    "llave",
    "billete",
    "reservación",
    "tiempo"
  ],
  "hook": {
    "title": "Why 'Tenemos' Keeps a Single 'e'",
    "content": "Look closely at the forms of tener: yo tengo, tú tienes, él/usted tiene, nosotros tenemos, ellos tienen. Why do tienes, tiene, and tienen split their e into ie, while tenemos stays a simple e? Because in tenemos (te-NE-mos), the vocal stress moves off the stem onto the ending — and Spanish vowels only split when they carry the stress!"
  },
  "pattern": {
    "title": "Possessing Keys, Tickets, and Reservations",
    "content": "Practice switching smoothly between tengo ('I have'), tienes ('you have'), tiene ('he/she/usted has'), and tenemos ('we have')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I have",
          "german": "tengo"
        },
        {
          "id": "p2",
          "english": "you have (tú)",
          "german": "tienes"
        },
        {
          "id": "p3",
          "english": "he / she / usted has",
          "german": "tiene"
        },
        {
          "id": "p4",
          "english": "we have",
          "german": "tenemos"
        },
        {
          "id": "p5",
          "english": "they / you all have",
          "german": "tienen"
        },
        {
          "id": "p6",
          "english": "the key",
          "german": "la llave"
        }
      ],
      "target_answer": "tengo, tienes, tiene, tenemos, tienen, la llave",
      "meaning": "I have, you have (tú), he / she / usted has, we have, they / you all have, the key",
      "explanation": "Notice tengo (-go), tienes/tiene/tienen (ie under stress), and tenemos (unstressed e).",
      "id": "es1001_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'we have' from the unstressed stem of tener and the nosotros ending:",
      "tile_options": [
        "tien",
        "ten",
        "go",
        "emos"
      ],
      "target_answer": "tenemos",
      "meaning": "tenemos (we have)",
      "explanation": "Because stress lands on -emos, the stem stays ten-: tenemos.",
      "id": "es1001_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have the key and the ticket'",
      "target_answer": "Tengo la llave y el billete",
      "meaning": "I have the key and the ticket",
      "word_bank": [
        "y",
        "el",
        "Tengo",
        "billete",
        "lo",
        "llave",
        "la",
        "Tienes"
      ],
      "explanation": "Tengo la llave (feminine) y el billete (masculine).",
      "id": "es1001_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask politely (using usted): 'Do you have a reservation?'",
      "cues": [
        "Has / Do you have (usted) → ¿Tiene usted",
        "a reservation (feminine) → una reservación?"
      ],
      "idea_parts": [
        "Do you (formal) have → Tiene usted",
        "a reservation → una reservación"
      ],
      "target_answer": "Tiene usted una reservación",
      "meaning": "Do you (formal) have a reservation?",
      "word_bank": [
        "Tiene",
        "reservación",
        "una",
        "Tienes",
        "usted",
        "tengo",
        "un"
      ],
      "explanation": "¿Tiene usted una reservación? — drop the -s from tienes for usted.",
      "id": "es1001_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tenemos una reservación hoy",
      "replays": 2,
      "target_answer": "Tenemos una reservación hoy",
      "meaning": "We have a reservation today",
      "cues": [
        "We have: Tenemos",
        "a reservation: una reservación",
        "today: hoy"
      ],
      "explanation": "Tenemos una reservación hoy.",
      "affirmation": "Clean nosotros form tenemos!",
      "id": "es1001_e5"
    }
  ],
  "summary": {
    "outcome": "Conjugate tener across all persons and explain why tenemos does not diphthongize.",
    "use_example": {
      "german": "Tengo el billete y tenemos una reservación.",
      "english": "I have the ticket and we have a reservation."
    },
    "takeaway": "Stem vowels only split when stressed: tienes, tiene, tienen vs unstressed tenemos.",
    "curiosity_teaser": "Up next ([1002] hay: The Universal Existence): use hay for both 'there is' and 'there are'."
  },
  "twist": {
    "prompt": "Assemble: 'Do you have the key?'",
    "target_answer": "Tienes la llave",
    "word_bank": [
      "Tengo",
      "el",
      "billete",
      "llave",
      "Tienes",
      "la"
    ],
    "explanation": "¿Tienes la llave?"
  }
};

export default lesson;
