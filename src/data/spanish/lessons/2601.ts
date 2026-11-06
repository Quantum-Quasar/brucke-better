import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2601,
  "slug": "conditional-of-politeness",
  "title": "The Conditional of Politeness",
  "subtitle": "Infinitive + -ía: me gustaría reservar, ¿podrías ayudarme?, sería fantástico",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "gustaría",
    "podría",
    "reservar",
    "hablar",
    "ver",
    "comer",
    "mesa",
    "café",
    "por_favor",
    "fantástico"
  ],
  "table_word_ids": [
    "gustaría",
    "podría",
    "reservar",
    "hablar",
    "ver",
    "comer",
    "mesa",
    "café",
    "por_favor",
    "fantástico"
  ],
  "hook": {
    "title": "How '-ía' Turns Any Verb into 'Would [Verb]'",
    "content": "Because the conditional glues -ía, -ías, -ía, -íamos, -ían onto the WHOLE infinitive, all three verb families (-ar, -er, -ir) use the exact same endings: hablaría ('I/he would speak'), comería ('I/he would eat'), viviría ('I/he would live'), sería ('it would be', from ser)! And poder drops its e before -ría: podría ('I/he/usted could'), ¿podrías...? ('could you...?')!"
  },
  "pattern": {
    "title": "Polite Escalation: Quiero → Me Gustaría",
    "content": "While Quiero un café is fine, Me gustaría un café ('I would like a coffee') and ¿Podrías explicarme? ('Could you explain to me?') sound extra gracious and polished."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I would like (it would please me)",
          "german": "me gustaría"
        },
        {
          "id": "p2",
          "english": "I / he / usted could",
          "german": "podría"
        },
        {
          "id": "p3",
          "english": "could you (informal)?",
          "german": "¿podrías?"
        },
        {
          "id": "p4",
          "english": "it would be fantastic (ser + -ía)",
          "german": "sería fantástico"
        },
        {
          "id": "p5",
          "english": "I would speak (hablar + -ía)",
          "german": "hablaría"
        }
      ],
      "target_answer": "me gustaría, podría, ¿podrías?, sería fantástico, hablaría",
      "meaning": "I would like (it would please me), I / he / usted could, could you (informal)?, it would be fantastic (ser + -ía), I would speak (hablar + -ía)",
      "explanation": "Full infinitive + -ía creates the conditional across the language.",
      "id": "es2601_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'It would be fantastic' (from the infinitive ser)?",
      "options": [
        "Sería fantástico",
        "*Era fantástico",
        "*Fue fantástico"
      ],
      "target_answer": "Sería fantástico",
      "meaning": "It would be fantastic",
      "explanation": "ser + -ía = sería ('it would be').",
      "id": "es2601_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I would like to see the house'",
      "target_answer": "Me gustaría ver la casa",
      "meaning": "I would like to see the house",
      "word_bank": [
        "Me",
        "visto",
        "gustaría",
        "la",
        "casa",
        "ver",
        "el",
        "gusta"
      ],
      "explanation": "Me gustaría + ver + la casa.",
      "id": "es2601_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend politely: 'Could you speak with my brother?'",
      "cues": [
        "Could you (podría + -s) → ¿Podrías",
        "speak with my brother → hablar con mi hermano?"
      ],
      "idea_parts": [
        "Could you → Podrías",
        "speak with my brother → hablar con mi hermano"
      ],
      "target_answer": "Podrías hablar con mi hermano",
      "meaning": "Could you speak with my brother?",
      "word_bank": [
        "a",
        "con",
        "Puedo",
        "hablé",
        "hablar",
        "hermano",
        "mi",
        "Podrías"
      ],
      "explanation": "¿Podrías hablar con mi hermano?",
      "id": "es2601_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me gustaría reservar una mesa para dos",
      "replays": 2,
      "target_answer": "Me gustaría reservar una mesa para dos",
      "meaning": "I would like to reserve a table for two",
      "cues": [
        "I would like: Me gustaría",
        "to reserve a table: reservar una mesa",
        "for two: para dos"
      ],
      "explanation": "Me gustaría reservar una mesa para dos.",
      "affirmation": "Polite restaurant reservation mastered!",
      "id": "es2601_e5"
    }
  ],
  "summary": {
    "outcome": "Use me gustaría, podría/podrías, and regular -ía conditionals for polite requests and hypotheticals.",
    "use_example": {
      "german": "Me gustaría reservar una mesa para dos — ¿podrías confirmar?",
      "english": "I would like to reserve a table for two — could you confirm?"
    },
    "takeaway": "Infinitive + -ía = 'would [verb]'.",
    "curiosity_teaser": "Up next ([2602] Triggering the Subjunctive): master the opposite-vowel switch (-ar → -e, -er/-ir → -a)."
  },
  "twist": {
    "prompt": "Assemble: 'I would like to eat here'",
    "target_answer": "Me gustaría comer aquí",
    "word_bank": [
      "comí",
      "Me",
      "gustaría",
      "aquí",
      "gusta",
      "comer",
      "allí"
    ],
    "explanation": "Me gustaría comer aquí."
  }
};

export default lesson;
