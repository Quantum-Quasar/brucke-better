import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 202,
  "slug": "article-switch-gym",
  "title": "The Article Switch Gym",
  "subtitle": "Mixed conversion drills: switch between masculine el and feminine la with confidence",
  "phase": 1,
  "shift_categories": [
    "cion"
  ],
  "word_ids": [
    "pastel",
    "café",
    "colección",
    "tradición",
    "hotel",
    "casa",
    "restaurante",
    "mesa"
  ],
  "table_word_ids": [
    "pastel",
    "café",
    "colección",
    "tradición",
    "hotel",
    "casa",
    "restaurante",
    "mesa"
  ],
  "hook": {
    "title": "Mental Muscle Memory",
    "content": "True fluency is toggling between masculine el (and its pronoun lo) and feminine la (and its pronoun la) without pausing to calculate. Here we alternate across foods, places, and -ción concepts."
  },
  "pattern": {
    "title": "Welding the Article to the Noun",
    "content": "Think of el café, el pastel, el hotel, el restaurante and la casa, la mesa, la colección, la tradición as single acoustic units."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the cake",
          "german": "el pastel"
        },
        {
          "id": "p2",
          "english": "the coffee",
          "german": "el café"
        },
        {
          "id": "p3",
          "english": "the collection",
          "german": "la colección"
        },
        {
          "id": "p4",
          "english": "the tradition",
          "german": "la tradición"
        },
        {
          "id": "p5",
          "english": "the hotel",
          "german": "el hotel"
        },
        {
          "id": "p6",
          "english": "the house",
          "german": "la casa"
        }
      ],
      "target_answer": "el pastel, el café, la colección, la tradición, el hotel, la casa",
      "meaning": "the cake, the coffee, the collection, the tradition, the hotel, the house",
      "explanation": "Masculine el for pastel, café, hotel; feminine la for colección, tradición, casa.",
      "id": "es202_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Choose the correct gender pair for 'the tradition' and 'the hotel':",
      "options": [
        "la tradición, la hotel",
        "el tradición, la hotel",
        "la tradición, el hotel"
      ],
      "target_answer": "la tradición, el hotel",
      "meaning": "the tradition, the hotel",
      "explanation": "la tradición is feminine (-ción); el hotel is masculine.",
      "id": "es202_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want the coffee and the collection'",
      "target_answer": "Quiero el café y la colección",
      "meaning": "I want the coffee and the collection",
      "word_bank": [
        "y",
        "el",
        "hotel",
        "colección",
        "café",
        "la",
        "lo",
        "Quiero"
      ],
      "explanation": "Quiero el café y la colección switches cleanly from masculine el to feminine la.",
      "id": "es202_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say you want the house and the hotel",
      "cues": [
        "I want → Quiero",
        "the house → la casa",
        "and the hotel → y el hotel"
      ],
      "idea_parts": [
        "I want → Quiero",
        "the house → la casa",
        "and the hotel → y el hotel"
      ],
      "target_answer": "Quiero la casa y el hotel",
      "meaning": "I want the house and the hotel",
      "word_bank": [
        "hotel",
        "casa",
        "pastel",
        "colección",
        "y",
        "la",
        "lo",
        "Quiero",
        "el"
      ],
      "explanation": "Quiero la casa y el hotel — toggling feminine la and masculine el in one breath.",
      "id": "es202_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero el pastel",
      "replays": 2,
      "target_answer": "Quiero el pastel",
      "meaning": "I want the cake",
      "cues": [
        "I want: Quiero",
        "the (masculine): el",
        "cake: pastel"
      ],
      "explanation": "Quiero el pastel — masculine article paired with pastel.",
      "affirmation": "Clean masculine article pairing!",
      "id": "es202_e5"
    }
  ],
  "summary": {
    "outcome": "Toggle between masculine el and feminine la with instinctive confidence.",
    "use_example": {
      "german": "Quiero el café y la colección.",
      "english": "I want the coffee and the collection."
    },
    "takeaway": "Articles in Spanish weld to their nouns — learn them as one sound unit.",
    "curiosity_teaser": "Up next ([3] The -ar Engine: Verbs from Nouns): turn your -ción nouns into active verbs."
  },
  "twist": {
    "prompt": "Assemble: 'Do you want the hotel?'",
    "target_answer": "Quieres el hotel",
    "word_bank": [
      "casa",
      "Quiero",
      "el",
      "Quieres",
      "hotel",
      "la"
    ],
    "explanation": "¿Quieres el hotel? asks the question with rising intonation."
  }
};

export default lesson;
