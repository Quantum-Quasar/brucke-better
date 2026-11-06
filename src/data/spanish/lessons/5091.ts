import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5091,
  "slug": "relative-clauses-in-depth",
  "title": "Relative Clauses in Depth",
  "subtitle": "que, quien (after prepositions: la persona con quien hablo), lo que, and donde",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "qué",
    "quién",
    "lo",
    "dónde",
    "con",
    "para",
    "amigo",
    "hablar",
    "vivir",
    "comprender"
  ],
  "table_word_ids": [
    "qué",
    "quién",
    "lo",
    "dónde",
    "con",
    "para",
    "amigo",
    "hablar",
    "vivir",
    "comprender"
  ],
  "hook": {
    "title": "Never End a Spanish Sentence with a Dangling Preposition!",
    "content": "In casual English, we often strand prepositions at the very end of a sentence: 'the friend I am speaking **with**', 'the person the gift is **for**'. In Spanish, **a preposition can NEVER be stranded at the end of a clause**! Instead, the preposition stays right in front of **quien** ('whom'): el amigo **con quien** hablo ('the friend with whom I speak'), la persona **para quien** es el regalo ('the person for whom the gift is')!"
  },
  "pattern": {
    "title": "Summary of All Four Relative Connectors",
    "content": "1) **que** = who / whom / which / that (default for both people and things!).\n2) **[preposition] + quien** = with whom / for whom / to whom (con quien, para quien, a quien).\n3) **lo que** = what ('the thing that').\n4) **donde** (no accent!) = where ('la ciudad donde vivo' = 'the city where I live')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the friend with whom I speak (never strand con!)",
          "german": "el amigo con quien hablo"
        },
        {
          "id": "p2",
          "english": "the mother for whom the gift is",
          "german": "la madre para quien es el regalo"
        },
        {
          "id": "p3",
          "english": "the city where I live (unaccented donde)",
          "german": "la ciudad donde vivo"
        },
        {
          "id": "p4",
          "english": "what (the thing that) I understand",
          "german": "lo que comprendo"
        },
        {
          "id": "p5",
          "english": "the book that I have",
          "german": "el libro que tengo"
        }
      ],
      "target_answer": "el amigo con quien hablo, la madre para quien es el regalo, la ciudad donde vivo, lo que comprendo, el libro que tengo",
      "meaning": "the friend with whom I speak (never strand con!), the mother for whom the gift is, the city where I live (unaccented donde), what (the thing that) I understand, the book that I have",
      "explanation": "Prepositions always stand directly in front of quien — never at the end of the sentence.",
      "id": "es5091_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How does Spanish express 'the friend I am speaking with'?",
      "options": [
        "*el amigo quien hablo con",
        "el amigo con quien hablo (or con el que hablo)",
        "*el amigo que hablo con"
      ],
      "target_answer": "el amigo con quien hablo (or con el que hablo)",
      "meaning": "the friend with whom I speak",
      "explanation": "Spanish never strands a preposition at the end of a clause; place con right before quien: con quien hablo!",
      "id": "es5091_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is the city where I live'",
      "target_answer": "Es la ciudad donde vivo",
      "meaning": "It is the city where I live",
      "word_bank": [
        "lo",
        "vivo",
        "Está",
        "donde",
        "ciudad",
        "quien",
        "la",
        "Es"
      ],
      "explanation": "Es la ciudad + donde (unstressed connector) + vivo.",
      "id": "es5091_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'He is the friend with whom I speak'",
      "cues": [
        "He is the friend → Es el amigo",
        "with whom → con quien",
        "I speak → hablo"
      ],
      "idea_parts": [
        "He is the friend → Es el amigo",
        "with whom I speak → con quien hablo"
      ],
      "target_answer": "Es el amigo con quien hablo",
      "meaning": "He is the friend with whom I speak",
      "word_bank": [
        "Es",
        "el",
        "donde",
        "para",
        "con",
        "quien",
        "que",
        "amigo",
        "hablo"
      ],
      "explanation": "Es el amigo con quien hablo.",
      "id": "es5091_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es la persona con quien hablé ayer",
      "replays": 2,
      "target_answer": "Es la persona con quien hablé ayer",
      "meaning": "He/she is the person with whom I spoke yesterday",
      "cues": [
        "It is the person: Es la persona",
        "with whom: con quien",
        "I spoke yesterday: hablé ayer"
      ],
      "explanation": "Es la persona con quien hablé ayer.",
      "affirmation": "Preposition + quien mastered!",
      "id": "es5091_e5"
    }
  ],
  "summary": {
    "outcome": "Build relative clauses with que, preposition + quien, lo que, and donde without stranding prepositions.",
    "use_example": {
      "german": "Es el amigo con quien hablé ayer en la ciudad donde vivo.",
      "english": "He is the friend with whom I spoke yesterday in the city where I live."
    },
    "takeaway": "Keep prepositions right in front of quien (con quien, para quien) — never at the end of the sentence!",
    "curiosity_teaser": "Next branch ([5101] Hypothetical Situations): expand conditional -ía and subjunctive sentences!"
  },
  "twist": {
    "prompt": "Assemble: 'The friend with whom I live'",
    "target_answer": "El amigo con quien vivo",
    "word_bank": [
      "vivo",
      "donde",
      "para",
      "que",
      "El",
      "amigo",
      "con",
      "quien"
    ],
    "explanation": "El amigo con quien vivo."
  }
};

export default lesson;
