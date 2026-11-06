import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 601,
  "slug": "dad-feminine-squad",
  "title": "The -dad Feminine Squad",
  "subtitle": "-ty → -dad: ciudad, realidad, verdad — 100% feminine nouns decoded instantly",
  "phase": 1,
  "shift_categories": [
    "dad"
  ],
  "word_ids": [
    "universidad",
    "posibilidad",
    "ciudad",
    "realidad",
    "verdad",
    "libertad",
    "hermoso",
    "importante"
  ],
  "table_word_ids": [
    "universidad",
    "posibilidad",
    "ciudad",
    "realidad",
    "verdad",
    "libertad",
    "hermoso",
    "importante"
  ],
  "hook": {
    "title": "Another Airtight Gender Rule",
    "content": "Just like -ción in Topic 2, the -dad and -tad family has zero masculine rebels: la universidad, la posibilidad, la ciudad, la realidad, la verdad, la libertad are all feminine."
  },
  "pattern": {
    "title": "Verdict, Civic, and Liberty",
    "content": "Notice how 'truth' in Spanish (la verdad) is the sibling of English 'verity' and 'verdict' ('speaking the truth'), while la ciudad ('the city') comes from Latin cīvitātem (English 'civic' and 'citizen')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the city",
          "german": "la ciudad"
        },
        {
          "id": "p2",
          "english": "the reality",
          "german": "la realidad"
        },
        {
          "id": "p3",
          "english": "the truth",
          "german": "la verdad"
        },
        {
          "id": "p4",
          "english": "the freedom / liberty",
          "german": "la libertad"
        },
        {
          "id": "p5",
          "english": "the possibility",
          "german": "la posibilidad"
        },
        {
          "id": "p6",
          "english": "the university",
          "german": "la universidad"
        }
      ],
      "target_answer": "la ciudad, la realidad, la verdad, la libertad, la posibilidad, la universidad",
      "meaning": "the city, the reality, the truth, the freedom / liberty, the possibility, the university",
      "explanation": "All six end in -dad or -tad and take feminine la.",
      "id": "es601_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish la verdad ('the truth', from Latin vēritātem) shares its root with which English courtroom word meaning 'a true saying'?",
      "target_answer": "verdict",
      "meaning": "a verdict (ver-dict) is literally 'speaking the truth'",
      "explanation": "Latin vērus ('true') + dīcere ('to say') gave verdict; vēritātem gave Spanish verdad.",
      "id": "es601_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert with its feminine article: 'the freedom / liberty' →",
      "english_hint": "liberty → -tad",
      "target_answer": "la libertad",
      "meaning": "the freedom / liberty",
      "explanation": "liberty → la libertad.",
      "id": "es601_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The city is beautiful'",
      "target_answer": "La ciudad es hermosa",
      "meaning": "The city is beautiful",
      "word_bank": [
        "La",
        "está",
        "ciudad",
        "hermoso",
        "El",
        "es",
        "hermosa"
      ],
      "explanation": "La ciudad es hermosa — hermosa agrees in the feminine with la ciudad.",
      "id": "es601_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that freedom is very important",
      "cues": [
        "the freedom → La libertad",
        "is → es",
        "very important → muy importante"
      ],
      "idea_parts": [
        "subject → La libertad",
        "verb → es",
        "description → muy importante"
      ],
      "target_answer": "La libertad es muy importante",
      "meaning": "Freedom is very important",
      "word_bank": [
        "La",
        "El",
        "es",
        "está",
        "importante",
        "muy",
        "verdad",
        "libertad"
      ],
      "explanation": "La libertad es muy importante — Spanish uses the definite article la before abstract nouns like libertad!",
      "diagnosis": {
        "slip": "omitted La before libertad",
        "cue": "When talking about abstract concepts in general ('Freedom is important'), Spanish includes the article: La libertad."
      },
      "id": "es601_e5"
    }
  ],
  "summary": {
    "outcome": "Decode -dad and -tad nouns with 100% feminine agreement and use la before abstract nouns.",
    "use_example": {
      "german": "La ciudad es hermosa y la libertad es muy importante.",
      "english": "The city is beautiful and freedom is very important."
    },
    "takeaway": "-dad and -tad nouns are always feminine — and abstract subjects wear their article (la libertad).",
    "curiosity_teaser": "Up next ([602] The -mente Adverb Factory): build adverbs and see why tilde accents survive on fácilmente and rápidamente."
  },
  "twist": {
    "prompt": "Assemble: 'It is a possibility'",
    "target_answer": "Es una posibilidad",
    "word_bank": [
      "Es",
      "realidad",
      "una",
      "posibilidad",
      "Está",
      "un"
    ],
    "explanation": "Es una posibilidad uses feminine una."
  }
};

export default lesson;
