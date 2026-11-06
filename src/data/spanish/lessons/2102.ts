import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2102,
  "slug": "equality-and-irregulars",
  "title": "Equality and Irregulars",
  "subtitle": "tan... como ('as... as'), mejor ('better/best'), and peor ('worse/worst')",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "tan",
    "como",
    "mejor",
    "peor",
    "bueno",
    "grande",
    "importante",
    "amigo",
    "vino",
    "café"
  ],
  "table_word_ids": [
    "tan",
    "como",
    "mejor",
    "peor",
    "bueno",
    "grande",
    "importante",
    "amigo",
    "vino",
    "café"
  ],
  "hook": {
    "title": "Why 'Mejor' and 'Peor' Can Stand Before the Noun",
    "content": "When mejor and peor mean ' the best' and 'the worst', they often step right in front of the noun: Es mi mejor amigo ('He is my best friend'), Es el mejor restaurante ('It is the best restaurant')! And notice that in the plural, mejor and peor end in a consonant (-r), so they add -es: los mejores amigos ('the best friends')!"
  },
  "pattern": {
    "title": "Tan + Adjective + Como",
    "content": "Remember: tan ('as/so', clipped from tanto before an adjective or adverb) pairs with unaccented como ('as'): Es tan bueno como el otro ('It is as good as the other')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "better / the best",
          "german": "mejor / el mejor"
        },
        {
          "id": "p2",
          "english": "worse / the worst",
          "german": "peor / el peor"
        },
        {
          "id": "p3",
          "english": "my best friend",
          "german": "mi mejor amigo"
        },
        {
          "id": "p4",
          "english": "as good as",
          "german": "tan bueno como"
        },
        {
          "id": "p5",
          "english": "as important as",
          "german": "tan importante como"
        }
      ],
      "target_answer": "mejor / el mejor, peor / el peor, mi mejor amigo, tan bueno como, tan importante como",
      "meaning": "better / the best, worse / the worst, my best friend, as good as, as important as",
      "explanation": "mejor and peor serve as both comparative ('better/worse') and superlative ('the best/the worst').",
      "id": "es2102_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'He is my best friend'?",
      "options": [
        "*Es mi mejor que amigo",
        "*Es mi más bueno amigo",
        "Es mi mejor amigo"
      ],
      "target_answer": "Es mi mejor amigo",
      "meaning": "He is my best friend",
      "explanation": "mejor steps before amigo to mean 'best': mi mejor amigo.",
      "id": "es2102_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'This wine is better than that one'",
      "target_answer": "Este vino es mejor que ese",
      "meaning": "This wine is better than that one",
      "word_bank": [
        "que",
        "Este",
        "mejor",
        "vino",
        "ese",
        "es",
        "bueno",
        "esto",
        "como"
      ],
      "explanation": "Este vino es mejor que ese.",
      "id": "es2102_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the coffee is as good as the wine",
      "cues": [
        "The coffee is → El café es",
        "as good → tan bueno",
        "as the wine → como el vino"
      ],
      "idea_parts": [
        "The coffee is → El café es",
        "as good as → tan bueno como",
        "the wine → el vino"
      ],
      "target_answer": "El café es tan bueno como el vino",
      "meaning": "The coffee is as good as the wine",
      "word_bank": [
        "como",
        "más",
        "el",
        "bueno",
        "es",
        "café",
        "que",
        "El",
        "buena",
        "tan",
        "vino"
      ],
      "explanation": "El café es tan bueno como el vino.",
      "id": "es2102_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es el mejor restaurante de la ciudad",
      "replays": 2,
      "target_answer": "Es el mejor restaurante de la ciudad",
      "meaning": "It is the best restaurant in the city",
      "cues": [
        "It is the best: Es el mejor",
        "restaurant: restaurante",
        "in (of) the city: de la ciudad"
      ],
      "explanation": "Es el mejor restaurante de la ciudad — de means 'in' after a superlative!",
      "affirmation": "Superlative + de mastered!",
      "id": "es2102_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy tan... como for equality and mejor/peor for both 'better/worse' and 'best/worst'.",
    "use_example": {
      "german": "Es mi mejor amigo y este es el mejor restaurante de la ciudad.",
      "english": "He is my best friend and this is the best restaurant in the city."
    },
    "takeaway": "After a superlative ('the best restaurant IN the city'), Spanish always uses de ('of the city').",
    "curiosity_teaser": "Up next ([22] Double Object Pronouns): enter Phase 4 and stack indirect + direct pronouns (me lo, te lo, se lo)!"
  },
  "twist": {
    "prompt": "Assemble: 'He is my best friend'",
    "target_answer": "Es mi mejor amigo",
    "word_bank": [
      "bueno",
      "que",
      "mejor",
      "más",
      "amigo",
      "mi",
      "Es"
    ],
    "explanation": "Es mi mejor amigo."
  }
};

export default lesson;
