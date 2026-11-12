import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5062,
  "slug": "lesson-5062",
  "title": "La Cuenta, Por Favor",
  "subtitle": "close the meal: the bill is the count, and por favor does the asking",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "cuenta",
    "cuánto",
    "gracias",
    "por_favor",
    "económico",
    "mesa"
  ],
  "table_word_ids": [
    "cuenta",
    "cuánto",
    "gracias",
    "por_favor",
    "económico"
  ],
  "hook": {
    "title": "From Price to Payment",
    "content": "Lesson 5061 asked the price: ¿Cuánto es ?. Now finish the meal the Spanish way: La cuenta, por favor — and thank with gracias. The market taught you to count prices; the restaurant hands you the count and calls it la cuenta.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The bill is a count",
        "content": "contar (to count) → la cuenta: the bill is literally the tally. English kept the same root in 'account' — the place where the numbers live.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Request, Pay, Thank",
    "content": "La cuenta, por favor closes the meal; ¿Cuánto es ? checks the total; gracias closes the exchange. The polite frame — noun first, por favor second — carries the whole ritual.",
    "linguist_note": "económico means cheap — the same Greek root English keeps in 'economy': the house-holding of money.",
    "trap_note": "pedir la cuenta is how you ask for it — pedir (to ask for) does the requesting; don't reach for preguntar, which asks questions."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each meal-closing phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the bill",
          "german": "la cuenta"
        },
        {
          "id": "p2",
          "english": "please",
          "german": "por favor"
        },
        {
          "id": "p3",
          "english": "thank you",
          "german": "gracias"
        },
        {
          "id": "p4",
          "english": "cheap",
          "german": "económico"
        }
      ],
      "target_answer": "la cuenta, por favor, gracias, económico",
      "meaning": "the bill, please, thank you, cheap",
      "explanation": "Four words that finish a meal: the tally, the please, the thanks, and the verdict on the price.",
      "id": "es5062_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You have finished eating. Ask for the bill:",
      "options": [
        "La cuenta, por favor",
        "La cuenta, gracias",
        "El cuenta, por favor"
      ],
      "target_answer": "La cuenta, por favor",
      "meaning": "The bill, please",
      "explanation": "La cuenta, por favor — the request word, not the thanks, closes the meal.",
      "id": "es5062_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the Spanish for the bill — literally 'the count':",
      "english_hint": "contar (to count) did the work",
      "target_answer": "cuenta",
      "meaning": "the bill",
      "explanation": "la cuenta — the tally of what you ate; 'account' keeps the same root in English.",
      "id": "es5062_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: the bill, please",
      "cues": [
        "the bill → la cuenta",
        "por favor rides at the end"
      ],
      "idea_parts": [
        "the bill → La cuenta",
        "please → por favor"
      ],
      "target_answer": "La cuenta, por favor",
      "meaning": "The bill, please",
      "word_bank": [
        "La",
        "cuenta",
        "por",
        "favor",
        "gracias",
        "mesa"
      ],
      "explanation": "La cuenta, por favor — request first, politeness last.",
      "diagnosis": {
        "slip": "dropped por favor",
        "cue": "The polite tail turns a statement into a request."
      },
      "id": "es5062_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Gracias, señora",
      "replays": 2,
      "target_answer": "Gracias, señora",
      "meaning": "Thank you, madam",
      "cues": [
        "It means: Thank you, madam",
        "The title rides at the end"
      ],
      "explanation": "Gracias, señora — two words that close any polite exchange.",
      "affirmation": "You wrote the politeness close exactly as it sounds on the street.",
      "id": "es5062_e5"
    }
  ],
  "summary": {
    "outcome": "Close a meal in Spanish: la cuenta, por favor — and check prices with ¿Cuánto es ?",
    "use_example": {
      "german": "La cuenta, por favor",
      "english": "The bill, please"
    },
    "takeaway": "la cuenta is the count — and por favor does the asking.",
    "curiosity_teaser": "Up next ([16] Days, Months & Dates): lunes is the Moon's day — learn the planetary week and full Spanish dates!"
  },
  "twist": {
    "prompt": "Think it through again without looking back — ask for the bill politely:",
    "target_answer": "La cuenta, por favor",
    "word_bank": [
      "La",
      "cuenta",
      "por",
      "favor",
      "gracias",
      "señora"
    ],
    "explanation": "Rebuilding \"La cuenta, por favor\" locks the ritual: tally first, please second."
  }
};

export default lesson;
