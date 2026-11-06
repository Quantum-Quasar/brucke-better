import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2801,
  "slug": "que-master-connector",
  "title": "que as the Master Connector",
  "subtitle": "Why Spanish uses que for BOTH people and things (el hombre que habla, el café que quiero), never dropping 'that'",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "qué",
    "amigo",
    "hermano",
    "libro",
    "café",
    "casa",
    "ciudad",
    "vivir",
    "hablar",
    "querer"
  ],
  "table_word_ids": [
    "qué",
    "amigo",
    "hermano",
    "libro",
    "café",
    "casa",
    "ciudad",
    "vivir",
    "hablar",
    "querer"
  ],
  "hook": {
    "title": "One Word for 'Who', 'Whom', 'Which', and 'That'",
    "content": "English makes you choose between 'the friend WHO lives in Madrid' and 'the house THAT is in Madrid'. In Spanish, unaccented **que** does BOTH jobs: el amigo que vive en Madrid, la casa que está en Madrid!"
  },
  "pattern": {
    "title": "Never Drop 'Que'!",
    "content": "Whenever English drops 'that' ('the reservation I confirmed', 'the coffee you want'), your Spanish sentence MUST include que: la reservación que confirmé, el café que quieres."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the friend who speaks Spanish",
          "german": "el amigo que habla español"
        },
        {
          "id": "p2",
          "english": "the coffee (that) I want",
          "german": "el café que quiero"
        },
        {
          "id": "p3",
          "english": "the city that I visit",
          "german": "la ciudad que visito"
        },
        {
          "id": "p4",
          "english": "the house that is here",
          "german": "la casa que está aquí"
        }
      ],
      "target_answer": "el amigo que habla español, el café que quiero, la ciudad que visito, la casa que está aquí",
      "meaning": "the friend who speaks Spanish, the coffee (that) I want, the city that I visit, the house that is here",
      "explanation": "que connects both human and non-human nouns to a following clause.",
      "id": "es2801_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Translate 'The friend who lives in Madrid':",
      "options": [
        "El amigo que vive en Madrid",
        "*El amigo vive en Madrid",
        "*El amigo quien vive en Madrid"
      ],
      "target_answer": "El amigo que vive en Madrid",
      "meaning": "The friend who lives in Madrid",
      "explanation": "Use que (not quien) directly after the noun for 'who'.",
      "id": "es2801_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The house that I want is big'",
      "target_answer": "La casa que quiero es grande",
      "meaning": "The house that I want is big",
      "word_bank": [
        "es",
        "casa",
        "está",
        "grande",
        "La",
        "quien",
        "que",
        "El",
        "quiero"
      ],
      "explanation": "La casa + que quiero + es grande.",
      "id": "es2801_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'It is the city that I want to visit'",
      "cues": [
        "It is the city → Es la ciudad",
        "that I want to visit → que quiero visitar"
      ],
      "idea_parts": [
        "It is the city → Es la ciudad",
        "that I want to visit → que quiero visitar"
      ],
      "target_answer": "Es la ciudad que quiero visitar",
      "meaning": "It is the city that I want to visit",
      "word_bank": [
        "quiero",
        "quien",
        "que",
        "Es",
        "la",
        "Está",
        "el",
        "visitar",
        "ciudad"
      ],
      "explanation": "Es la ciudad que quiero visitar.",
      "id": "es2801_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "El amigo que vive aquí es muy bueno",
      "replays": 2,
      "target_answer": "El amigo que vive aquí es muy bueno",
      "meaning": "The friend who lives here is very good",
      "cues": [
        "The friend who: El amigo que",
        "lives here: vive aquí",
        "is very good: es muy bueno"
      ],
      "explanation": "El amigo que vive aquí es muy bueno.",
      "affirmation": "Master connector que locked in!",
      "id": "es2801_e5"
    }
  ],
  "summary": {
    "outcome": "Connect relative clauses to both people and things using unaccented que.",
    "use_example": {
      "german": "El amigo que vive aquí tiene el libro que quiero.",
      "english": "The friend who lives here has the book that I want."
    },
    "takeaway": "Whether the noun is a person ('who') or a thing ('that/which'), reach for que.",
    "curiosity_teaser": "Up next ([2802] lo que: The Thing That / What): master neuter lo que at the start and middle of sentences."
  },
  "twist": {
    "prompt": "Assemble: 'The coffee that I want'",
    "target_answer": "El café que quiero",
    "word_bank": [
      "que",
      "la",
      "El",
      "quieres",
      "café",
      "quiero",
      "quien"
    ],
    "explanation": "El café que quiero."
  }
};

export default lesson;
