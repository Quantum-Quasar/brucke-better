import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 502,
  "slug": "description-agreement-gym",
  "title": "Description Agreement Gym",
  "subtitle": "Matching adjective endings to gender: el pastel es bueno, la tradición es buena",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "bueno",
    "buena",
    "contento",
    "contenta",
    "grande",
    "pequeño",
    "caliente",
    "frío"
  ],
  "table_word_ids": [
    "bueno",
    "buena",
    "contento",
    "contenta",
    "grande",
    "pequeño",
    "caliente",
    "frío"
  ],
  "hook": {
    "title": "Harmony Between Noun and Adjective",
    "content": "Spanish adjectives echo the gender of the noun they describe. A masculine noun calls for -o (el pastel es bueno, el café está frío); a feminine noun calls for -a (la tradición es buena, la casa es pequeña, el agua está fría)."
  },
  "pattern": {
    "title": "Two Endings (-o/-a) vs One Ending (-e)",
    "content": "Adjectives ending in -o in the dictionary flip to -a for feminine nouns. Adjectives ending in -e (grande, importante, diferente, caliente, posible) stay identical for both masculine and feminine!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "good (masculine)",
          "german": "bueno"
        },
        {
          "id": "p2",
          "english": "good (feminine)",
          "german": "buena"
        },
        {
          "id": "p3",
          "english": "happy (masculine)",
          "german": "contento"
        },
        {
          "id": "p4",
          "english": "happy (feminine)",
          "german": "contenta"
        },
        {
          "id": "p5",
          "english": "big (invariable in -e)",
          "german": "grande"
        },
        {
          "id": "p6",
          "english": "hot (invariable in -e)",
          "german": "caliente"
        }
      ],
      "target_answer": "bueno, buena, contento, contenta, grande, caliente",
      "meaning": "good (masculine), good (feminine), happy (masculine), happy (feminine), big (invariable in -e), hot (invariable in -e)",
      "explanation": "-o/-a adjectives change for gender; -e adjectives stay invariable.",
      "id": "es502_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Complete with the matching adjective form: 'La confirmación es ___.'",
      "options": [
        "buena",
        "buenos",
        "bueno"
      ],
      "target_answer": "buena",
      "meaning": "The confirmation is good",
      "explanation": "la confirmación is feminine (-ción), so bueno becomes buena.",
      "id": "es502_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The tradition is good'",
      "target_answer": "La tradición es buena",
      "meaning": "The tradition is good",
      "word_bank": [
        "bueno",
        "está",
        "tradición",
        "La",
        "El",
        "buena",
        "es"
      ],
      "explanation": "La tradición es buena — full feminine concord.",
      "id": "es502_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that she is very happy (emotional state, feminine)",
      "cues": [
        "is (state) → Está",
        "very → muy",
        "happy (feminine) → contenta"
      ],
      "idea_parts": [
        "is (state) → Está",
        "very → muy",
        "happy (fem.) → contenta"
      ],
      "target_answer": "Está muy contenta",
      "meaning": "She is very happy",
      "word_bank": [
        "contento",
        "contenta",
        "buena",
        "Está",
        "Es",
        "muy"
      ],
      "explanation": "Está muy contenta — estar for emotional state + -a for a female subject.",
      "id": "es502_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La casa es pequeña",
      "replays": 2,
      "target_answer": "La casa es pequeña",
      "meaning": "The house is small",
      "cues": [
        "The house: La casa",
        "is (characteristic): es",
        "small (feminine): pequeña"
      ],
      "explanation": "La casa es pequeña — pequeño changes -o to -a to match la casa.",
      "affirmation": "You caught the feminine -a agreement!",
      "id": "es502_e5"
    }
  ],
  "summary": {
    "outcome": "Match -o/-a adjectives to masculine and feminine nouns while keeping -e adjectives invariable.",
    "use_example": {
      "german": "El pastel es bueno y la tradición es buena.",
      "english": "The cake is good and the tradition is good."
    },
    "takeaway": "Adjectives in -o switch to -a for feminine nouns; adjectives in -e already fit both.",
    "curiosity_teaser": "Up next ([503] Chameleon Adjectives: listo, aburrido & rico): see how switching between ser and estar flips the meaning of the same adjective!"
  },
  "twist": {
    "prompt": "Assemble: 'The soup is hot'",
    "target_answer": "La sopa está caliente",
    "word_bank": [
      "bueno",
      "La",
      "caliente",
      "está",
      "es",
      "sopa",
      "El"
    ],
    "explanation": "La sopa está caliente — state takes está, and caliente ends in -e."
  }
};

export default lesson;
