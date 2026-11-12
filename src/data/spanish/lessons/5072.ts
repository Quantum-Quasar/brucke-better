import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5072,
  "slug": "lesson-5072",
  "title": "Questions in the Perfect",
  "subtitle": "¿Has comido ? ¿Nunca lo has visto ? — ask the perfect, keep the glue",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "he",
    "has",
    "ha",
    "hemos",
    "comido",
    "visto",
    "hecho",
    "nunca"
  ],
  "table_word_ids": [
    "he",
    "has",
    "ha",
    "hemos",
    "comido",
    "visto",
    "hecho",
    "nunca"
  ],
  "hook": {
    "title": "The Perfect, Turned into Questions",
    "content": "Lesson 5071 kept haber glued in the negative: No he terminado. Now ask it: ¿Has comido ? ¿Qué has hecho ? — no word-shuffling, just ¿? and a rising voice. The auxiliary answers first, and the participle never leaves its auxiliary, not in questions, not in answers, not in negatives.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Adverbs ride inside the pair",
        "content": "ya and nunca slot before the auxiliary: nunca he visto Madrid — 'never have I seen Madrid'. English needs inversion for that; Spanish just stacks the adverb.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Question the haber, Keep the Glue",
    "content": "¿Has comido ? ¿Nunca lo has visto ? — the question frame sits before the auxiliary, and the participle (comido, visto, hecho) stays glued to its half of the verb. The answer keeps the same glue: Sí, hemos comido.",
    "linguist_note": "hecho is hacer's participle — the f-to-h word again: Latin factum → hecho, the same road as fact → hacer.",
    "trap_note": "Never answer with the participle alone: Sí, he comido — the auxiliary he must open the door for comido."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each perfect-tense question or answer with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Have you eaten?",
          "german": "¿Has comido ?"
        },
        {
          "id": "p2",
          "english": "We have already eaten",
          "german": "Ya hemos comido"
        },
        {
          "id": "p3",
          "english": "I have never seen it",
          "german": "Nunca lo he visto"
        },
        {
          "id": "p4",
          "english": "What have you done?",
          "german": "¿Qué has hecho ?"
        }
      ],
      "target_answer": "¿Has comido ?, Ya hemos comido, Nunca lo he visto, ¿Qué has hecho ?",
      "meaning": "Have you eaten?, We have already eaten, I have never seen it, What have you done?",
      "explanation": "Questions, adverbs, negation — the haber + participle glue holds through all of them.",
      "id": "es5072_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Ask a friend: 'Have you eaten?'",
      "options": [
        "¿Has comido ?",
        "¿Eres comido ?",
        "¿Has comer ?"
      ],
      "target_answer": "¿Has comido ?",
      "meaning": "Have you eaten?",
      "explanation": "¿Has comido ? — haber's has + the participle; ser has no business in the perfect.",
      "id": "es5072_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the participle of ver — the one you have seen:",
      "english_hint": "Latin visum — the root in 'vision'",
      "target_answer": "visto",
      "meaning": "seen",
      "explanation": "visto — the irregular participle from ver; he visto = 'I have seen'.",
      "id": "es5072_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: I have never seen it",
      "cues": [
        "nunca rides before the auxiliary",
        "the pair: he visto"
      ],
      "idea_parts": [
        "never → Nunca",
        "I have seen it → lo he visto"
      ],
      "target_answer": "Nunca lo he visto",
      "meaning": "I have never seen it",
      "word_bank": [
        "Nunca",
        "lo",
        "he",
        "visto",
        "comido",
        "has"
      ],
      "explanation": "Nunca lo he visto — the adverb, the object pronoun, and the glued pair.",
      "diagnosis": {
        "slip": "separated he from visto",
        "cue": "he and visto travel together — the adverb walks in front of both."
      },
      "id": "es5072_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "¿Qué has hecho ?",
      "replays": 2,
      "target_answer": "¿Qué has hecho ?",
      "meaning": "What have you done?",
      "cues": [
        "It means: What have you done?",
        "The pair: has hecho"
      ],
      "explanation": "¿Qué has hecho ? — hacer's irregular participle inside the question frame.",
      "affirmation": "You wrote the perfect question without breaking the glue.",
      "id": "es5072_e5"
    }
  ],
  "summary": {
    "outcome": "Ask and answer in the perfect tense while keeping haber and its participle glued.",
    "use_example": {
      "german": "¿Qué has hecho ?",
      "english": "What have you done?"
    },
    "takeaway": "The glue holds in questions too — haber answers first, the participle stays.",
    "curiosity_teaser": "Up next ([18] The Preterite: The Dot in Time): leave the perfect and mark the finished moment — hablé, comí, fue!"
  },
  "twist": {
    "prompt": "One more, no safety net — say: I have never seen it:",
    "target_answer": "Nunca lo he visto",
    "word_bank": [
      "Nunca",
      "lo",
      "he",
      "visto",
      "has",
      "comido"
    ],
    "explanation": "Rebuilding \"Nunca lo he visto\" — adverb, pronoun, glued pair."
  }
};

export default lesson;
