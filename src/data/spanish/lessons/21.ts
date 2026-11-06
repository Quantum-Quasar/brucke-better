import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 21,
  "slug": "comparatives-mas-menos-mejor",
  "title": "Comparatives: más, menos, mejor",
  "subtitle": "más... que, menos... que, tan... como, and irregular mejor/peor",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "más",
    "menos",
    "mejor",
    "peor",
    "tan",
    "como",
    "grande",
    "importante",
    "bueno"
  ],
  "table_word_ids": [
    "más",
    "menos",
    "mejor",
    "peor",
    "tan",
    "como",
    "grande",
    "importante",
    "bueno"
  ],
  "hook": {
    "title": "Why Spanish Never Adds '-er' to Adjectives",
    "content": "In English, short adjectives add '-er' ('bigger, smaller, colder') while long adjectives use 'more' ('more important, more interesting'). Spanish uses one clean system for every regular adjective: place más ('more', with an accent!) or menos ('less') before the adjective, and close the comparison with que ('than'): más grande que ('bigger than'), menos importante que ('less important than')!"
  },
  "pattern": {
    "title": "Equality (Tan... Como) and the Two Suppletives: Mejor & Peor",
    "content": "• **Equality ('as [adj] as')**: tan + adjective + como (tan grande como 'as big as', tan importante como 'as important as').\n• **Better & Worse**: Just as English says 'better' (never *gooder) and 'worse' (never *badder), Spanish says mejor ('better / best', cousin of English ameliorate!) and peor ('worse / worst', cousin of pejorative!) — never *más bueno or *más malo!",
    "linguist_note": "Latin magis ('more') won out in Iberian Romance (Spanish más, Portuguese mais), whereas plūs won out in Galloromance and Italic (French plus, Italian più).",
    "trap_note": "Notice the accent on más ('more'): with a tilde, más means 'more/most'; without a tilde, literary mas means 'but'!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "more / -er",
          "german": "más"
        },
        {
          "id": "p2",
          "english": "less",
          "german": "menos"
        },
        {
          "id": "p3",
          "english": "better / best",
          "german": "mejor"
        },
        {
          "id": "p4",
          "english": "worse / worst",
          "german": "peor"
        },
        {
          "id": "p5",
          "english": "as [adj] as",
          "german": "tan... como"
        },
        {
          "id": "p6",
          "english": "bigger than",
          "german": "más grande que"
        }
      ],
      "target_answer": "más, menos, mejor, peor, tan... como, más grande que",
      "meaning": "more / -er, less, better / best, worse / worst, as [adj] as, bigger than",
      "explanation": "más/menos... que handles inequality; tan... como handles equality; mejor/peor replace *más bueno/*más malo.",
      "id": "es21_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish peor ('worse', from Latin peior) shares its root with which English adjective for a word or remark that disparages or makes something sound 'worse'?",
      "target_answer": "pejorative",
      "meaning": "a pejorative term is literally one that makes things look 'worse' (peor)!",
      "explanation": "Latin peior gave Spanish peor and English pejorative, while melior gave Spanish mejor and English ameliorate.",
      "id": "es21_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'This coffee is better than that one'?",
      "options": [
        "Este café es mejor que ese",
        "*Este café es más bueno que ese",
        "*Este café es mejor como ese"
      ],
      "target_answer": "Este café es mejor que ese",
      "meaning": "This coffee is better than that one",
      "explanation": "mejor ('better') replaces *más bueno and links to the second item with que ('than').",
      "id": "es21_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Madrid is bigger than Toledo'",
      "target_answer": "Madrid es más grande que Toledo",
      "meaning": "Madrid is bigger than Toledo",
      "word_bank": [
        "Toledo",
        "es",
        "Madrid",
        "mejor",
        "como",
        "grande",
        "menos",
        "que",
        "más"
      ],
      "explanation": "Madrid es + más grande + que + Toledo.",
      "id": "es21_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that this book is as important as that one (tan importante como ese)",
      "cues": [
        "This book is → Este libro es",
        "as important → tan importante",
        "as that one → como ese"
      ],
      "idea_parts": [
        "This book is → Este libro es",
        "as important as → tan importante como",
        "that one → ese"
      ],
      "target_answer": "Este libro es tan importante como ese",
      "meaning": "This book is as important as that one",
      "word_bank": [
        "que",
        "como",
        "esto",
        "ese",
        "tan",
        "libro",
        "más",
        "Este",
        "importante",
        "es"
      ],
      "explanation": "Este libro es tan importante como ese — equality uses tan... como (without an accent on como!).",
      "diagnosis": {
        "slip": "used que instead of como after tan",
        "cue": "Inequality (más/menos) closes with que ('than'); equality (tan) closes with como ('as')."
      },
      "id": "es21_e5"
    }
  ],
  "summary": {
    "outcome": "Compare adjectives with más/menos... que, tan... como, and irregular mejor and peor.",
    "use_example": {
      "german": "Madrid es más grande que Toledo y este café es mejor que ese.",
      "english": "Madrid is bigger than Toledo and this coffee is better than that one."
    },
    "takeaway": "más/menos/mejor/peor close with que ('than'); tan closes with como ('as').",
    "curiosity_teaser": "Up next ([2101] Superiority and Inferiority): build comparatives and superlatives ('the biggest' = el más grande)."
  },
  "twist": {
    "prompt": "Assemble: 'Today it is worse'",
    "target_answer": "Hoy es peor",
    "word_bank": [
      "Hoy",
      "tan",
      "es",
      "más",
      "mejor",
      "peor"
    ],
    "explanation": "Hoy es peor."
  },
  "foreshadow": {
    "line": "Welcome to Phase 4 (The Deep Engine)! In Topic 22, we stack two object pronouns before the verb (me lo da, te lo digo) and discover why *le lo turns into se lo.",
    "resolvedIn": 22
  },
  "payoff": {
    "ofLesson": 20,
    "text": "You just completed the Past & Comparison Gate! Every time frame and comparison structure in Phase 3 is now in your toolkit."
  }
};

export default lesson;
