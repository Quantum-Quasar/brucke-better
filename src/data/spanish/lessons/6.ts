import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 6,
  "slug": "dad-and-mente-bridges",
  "title": "The -dad & -mente Bridges",
  "subtitle": "Quality nouns in -dad and adverbs in -mente: universidad, exactamente",
  "phase": 1,
  "shift_categories": [
    "dad",
    "mente"
  ],
  "word_ids": [
    "universidad",
    "posibilidad",
    "ciudad",
    "realidad",
    "verdad",
    "libertad",
    "exactamente",
    "naturalmente",
    "perfectamente"
  ],
  "table_word_ids": [
    "universidad",
    "posibilidad",
    "ciudad",
    "realidad",
    "verdad",
    "libertad",
    "exactamente",
    "naturalmente",
    "perfectamente"
  ],
  "hook": {
    "title": "Two More Floors of the Conversion Warehouse",
    "content": "In Topic 2 you unlocked over a thousand feminine nouns ending in -ción. Today you open two more massive conversion bridges: English abstract nouns ending in -ty (university, possibility, city, reality, verity/truth, liberty) turn into Spanish -dad or -tad (la universidad, la posibilidad, la ciudad, la realidad, la verdad, la libertad) — and every single one is 100% feminine! Meanwhile, English adverbs ending in -ly (exactly, naturally, perfectly) become Spanish adverbs in -mente!"
  },
  "pattern": {
    "title": "Why -mente Uses the Feminine Adjective",
    "content": "Why is 'exact' exacto, yet 'exactly' is exactamente (with an -a-)? Because in Rome, speakers formed adverbs by saying 'with an exact mind' — exactā mente — and the Latin word for 'mind' (mens, mentis) was feminine! Over centuries, exactā mente fused into one word: exactamente. When the adjective already ends in -e or a consonant (natural, fácil), -mente glues straight on: naturalmente, fácilmente!",
    "linguist_note": "Latin -tātem lenited to -dad in Spanish; Latin ablative [adj.] mente grammaticalized into the Romance adverbial suffix.",
    "trap_note": "Never say *exactomente or *perfectomente! Always flip -o to feminine -a before attaching -mente: exactamente, perfectamente."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the university",
          "german": "la universidad"
        },
        {
          "id": "p2",
          "english": "the possibility",
          "german": "la posibilidad"
        },
        {
          "id": "p3",
          "english": "the city",
          "german": "la ciudad"
        },
        {
          "id": "p4",
          "english": "the truth",
          "german": "la verdad"
        },
        {
          "id": "p5",
          "english": "exactly",
          "german": "exactamente"
        },
        {
          "id": "p6",
          "english": "naturally",
          "german": "naturalmente"
        }
      ],
      "target_answer": "la universidad, la posibilidad, la ciudad, la verdad, exactamente, naturalmente",
      "meaning": "the university, the possibility, the city, the truth, exactly, naturally",
      "explanation": "-ty converts to feminine -dad/-tad; -ly converts to feminine adjective + -mente.",
      "id": "es6_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'perfectly' in Spanish by combining the feminine adjective stem and -mente:",
      "tile_options": [
        "perfecta",
        "perfecto",
        "mente",
        "dad"
      ],
      "target_answer": "perfectamente",
      "meaning": "perfectamente (perfectly)",
      "explanation": "perfecta ('with a perfect mind') + mente = perfectamente.",
      "id": "es6_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert with its feminine article: 'the reality' →",
      "english_hint": "reality → -dad",
      "target_answer": "la realidad",
      "meaning": "the reality",
      "explanation": "reality → la realidad (100% feminine).",
      "id": "es6_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you understand perfectly",
      "cues": [
        "I understand → Comprendo",
        "perfectly → perfectamente"
      ],
      "idea_parts": [
        "I understand → Comprendo",
        "perfectly → perfectamente"
      ],
      "target_answer": "Comprendo perfectamente",
      "meaning": "I understand perfectly",
      "word_bank": [
        "Comprendo",
        "verdad",
        "exactamente",
        "perfectamente",
        "naturalmente"
      ],
      "explanation": "Comprendo perfectamente — two Latinate cognates working together.",
      "diagnosis": {
        "slip": "wrote perfectomente",
        "cue": "Remember that Latin mente ('mind') was feminine, so exacto/perfecto switch to -a- before -mente: perfectamente."
      },
      "id": "es6_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es la verdad",
      "replays": 2,
      "target_answer": "Es la verdad",
      "meaning": "It is the truth",
      "cues": [
        "It is (characteristic): Es",
        "the (feminine): la",
        "truth (verity): verdad"
      ],
      "explanation": "Es la verdad — verdad shares its root with English 'verity' and 'verdict'.",
      "affirmation": "You caught the -dad noun and its feminine article!",
      "id": "es6_e5"
    }
  ],
  "summary": {
    "outcome": "Convert English -ty nouns to feminine -dad/-tad and form -mente adverbs from feminine adjectives.",
    "use_example": {
      "german": "La universidad es grande y comprendo perfectamente.",
      "english": "The university is big and I understand perfectly."
    },
    "takeaway": "Every -dad/-tad noun takes la — and -mente always attaches to the feminine adjective form.",
    "curiosity_teaser": "Up next ([601] The -dad Feminine Squad): master ciudad, verdad, libertad, and realidad in context."
  },
  "twist": {
    "prompt": "Assemble: 'The city is big'",
    "target_answer": "La ciudad es grande",
    "word_bank": [
      "es",
      "está",
      "ciudad",
      "El",
      "grande",
      "La",
      "universidad"
    ],
    "explanation": "La ciudad es grande — ciudad is feminine (-dad)."
  },
  "foreshadow": {
    "line": "With nouns, verbs, adjectives, and adverbs in place, Topic 7 opens the question words (¿dónde?, ¿qué?, ¿por qué?) that drive real conversation.",
    "resolvedIn": 7
  },
  "payoff": {
    "ofLesson": 5,
    "text": "In Topic 5 you saw adjectives change -o to -a for feminine nouns (buena, contenta); now that same feminine -a powers every -mente adverb!"
  }
};

export default lesson;
