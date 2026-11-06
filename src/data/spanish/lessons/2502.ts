import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2502,
  "slug": "the-gustar-family",
  "title": "The Gustar Family",
  "subtitle": "encantar (me encanta), interesar (me interesa), importar (no me importa), doler (me duele la cabeza)",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "encantar",
    "gustar",
    "gusta",
    "cabeza",
    "me",
    "te",
    "nos",
    "le",
    "música",
    "libro",
    "no"
  ],
  "table_word_ids": [
    "encantar",
    "gustar",
    "gusta",
    "cabeza",
    "me",
    "te",
    "nos",
    "le",
    "música",
    "libro",
    "no"
  ],
  "hook": {
    "title": "One Blueprint Unlocks a Whole Family of Verbs!",
    "content": "Once you understand how gustar works, you automatically own a whole family of high-frequency Spanish verbs that use the exact same inverted blueprint:\n• **encantar** ('to enchant' → 'to love'): **Me encanta la música** ('I love music'), **Me encantan los libros** ('I love books')!\n• **importar** ('to matter / be important to'): **No me importa** ('I don't care / It doesn't matter to me')!\n• **doler** ('to hurt / ache', o→ue boot verb): **Me duele la cabeza** ('My head hurts / I have a headache', lit. 'To-me hurts the head')!"
  },
  "pattern": {
    "title": "Why 'Me Encanta' Never Takes 'Mucho'",
    "content": "Because encantar already means 'to love / be delighted by', you say Me encanta el café (whereas with gustar you can say Me gusta mucho el café)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I love music (singular → encanta)",
          "german": "me encanta la música"
        },
        {
          "id": "p2",
          "english": "I love books (plural → encantan)",
          "german": "me encantan los libros"
        },
        {
          "id": "p3",
          "english": "it is very important to me / it matters to me",
          "german": "me importa mucho"
        },
        {
          "id": "p4",
          "english": "I don't mind / it doesn't matter to me",
          "german": "no me importa"
        },
        {
          "id": "p5",
          "english": "my head hurts / I have a headache (o→ue)",
          "german": "me duele la cabeza"
        }
      ],
      "target_answer": "me encanta la música, me encantan los libros, me importa mucho, no me importa, me duele la cabeza",
      "meaning": "I love music (singular → encanta), I love books (plural → encantan), it is very important to me / it matters to me, I don't mind / it doesn't matter to me, my head hurts / I have a headache (o→ue)",
      "explanation": "All of these verbs put the experiencer in me/te/le/nos and agree with the thing that enchants, matters, or hurts.",
      "id": "es2502_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish 'encantar' ('to delight / cast a spell over') is the exact cognate of which seven-letter English verb meaning 'to charm or delight'?",
      "target_answer": "enchant",
      "meaning": "Me encanta el chocolate literally means 'Chocolate enchants me'!",
      "explanation": "Latin incantāre ('to sing a spell upon') gave English enchant and Spanish encantar.",
      "id": "es2502_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'My head hurts / I have a headache' in Spanish?",
      "options": [
        "Me duele la cabeza",
        "*Duele mi cabeza",
        "*Yo duelo la cabeza"
      ],
      "target_answer": "Me duele la cabeza",
      "meaning": "My head hurts / I have a headache",
      "explanation": "Spanish uses the indirect pronoun me ('to me') + duele ('hurts') + the definite article la cabeza ('the head')!",
      "id": "es2502_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I love Spanish music (la música)'",
      "target_answer": "Me encanta la música",
      "meaning": "I love music",
      "word_bank": [
        "Me",
        "música",
        "encanta",
        "Yo",
        "la",
        "encantan",
        "el"
      ],
      "explanation": "Me + encanta + la música.",
      "id": "es2502_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you love books ('Me encantan los libros')",
      "cues": [
        "To me → Me",
        "are enchanting (plural to match libros) → encantan",
        "the books → los libros"
      ],
      "idea_parts": [
        "I love → Me encantan",
        "books → los libros"
      ],
      "target_answer": "Me encantan los libros",
      "meaning": "I love books",
      "word_bank": [
        "el",
        "encanta",
        "los",
        "libro",
        "libros",
        "encantan",
        "Me"
      ],
      "explanation": "Me encantan los libros.",
      "id": "es2502_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy encantar, importar, and doler using the inverted gustar structure.",
    "use_example": {
      "german": "Me encanta la música, me encantan los libros y hoy me duele la cabeza.",
      "english": "I love music, I love books, and today my head hurts."
    },
    "takeaway": "With body parts (Me duele la cabeza), Spanish uses me/te/le + the definite article (la cabeza) rather than mi/tu/su!",
    "curiosity_teaser": "Up next ([26] The Would-World & Subjunctive Preview): unlock the polite conditional (me gustaría, podrías) and the opposite-vowel subjunctive!"
  },
  "twist": {
    "prompt": "Assemble: 'My head hurts'",
    "target_answer": "Me duele la cabeza",
    "word_bank": [
      "mano",
      "la",
      "gusta",
      "duele",
      "Me",
      "mi",
      "cabeza"
    ],
    "explanation": "Me duele la cabeza."
  }
};

export default lesson;
