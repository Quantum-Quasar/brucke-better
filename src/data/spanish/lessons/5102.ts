import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5102,
  "slug": "lesson-5102",
  "title": "El Condicional Cortés",
  "subtitle": "me gustaría, ¿podría… ? — the conditional as the politeness lever",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "gustaría",
    "podría",
    "gustar",
    "poder",
    "querer",
    "reservar"
  ],
  "table_word_ids": [
    "gustaría",
    "podría",
    "gustar",
    "poder",
    "reservar"
  ],
  "hook": {
    "title": "The Softest Ask in Spanish",
    "content": "Lesson 5101 built the -ía world of hypotheticals. Now spend it on politeness: Me gustaría reservar una mesa. ¿Podría ayudarme ? Nothing is hypothetical here — you really do want that table. The conditional steps back one pace before the request lands, which is exactly what makes it polite.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why the past softens the ask",
        "content": "The -ía ending came from the imperfect (-ía, -ías). Framing a request one step back — 'I would like' instead of 'I want' — puts distance between you and the demand. English plays the same trick with 'I wanted to ask…'.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Gustaría + Infinitive: The Polite Stack",
    "content": "me gustaría + infinitive = 'I would like to…'; ¿podría… ? = 'could you… ?' — the future's stem with the imperfect's ending, doing the softest work in the language.",
    "linguist_note": "podría keeps poder's d: puede → podría — the d rides into the conditional, unlike French's bent pour-.",
    "trap_note": "me gusta states a liking (the coffee pleases me); me gustaría wants something not yet owned. One letter separates the present from the wish."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each polite conditional with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I would like to reserve",
          "german": "Me gustaría reservar"
        },
        {
          "id": "p2",
          "english": "Could you help me?",
          "german": "¿Podría ayudarme ?"
        },
        {
          "id": "p3",
          "english": "It would be fantastic",
          "german": "Sería fantástico"
        },
        {
          "id": "p4",
          "english": "we could go",
          "german": "Podríamos ir"
        }
      ],
      "target_answer": "Me gustaría reservar, ¿Podría ayudarme ?, Sería fantástico, Podríamos ir",
      "meaning": "I would like to reserve, Could you help me?, It would be fantastic, we could go",
      "explanation": "gustaría, podría, sería, podríamos — the -ía lever on three everyday verbs.",
      "id": "es5102_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Order politely at the restaurant:",
      "options": [
        "Me gustaría reservar una mesa",
        "Me gusta reservar una mesa",
        "Me gustaría reservo una mesa"
      ],
      "target_answer": "Me gustaría reservar una mesa",
      "meaning": "I would like to reserve a table",
      "explanation": "Me gustaría reservar una mesa — the wish-form, plus a plain infinitive after it.",
      "id": "es5102_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the conditional of poder for 'you' (usted):",
      "english_hint": "the d rides: puede → podría",
      "target_answer": "podría",
      "meaning": "you could (polite)",
      "explanation": "podría — poder's stem with the imperfect ending: ¿Podría ayudarme ?",
      "id": "es5102_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Ask me:",
      "idea": "could you help me?",
      "cues": [
        "the conditional: podría",
        "the pronoun hooks on: ayudarme"
      ],
      "idea_parts": [
        "could you → Podría",
        "help me → ayudarme ?"
      ],
      "target_answer": "¿Podría ayudarme ?",
      "meaning": "Could you help me?",
      "word_bank": [
        "Podría",
        "ayudarme",
        "gustaría",
        "reservar",
        "me"
      ],
      "explanation": "¿Podría ayudarme ? — the conditional verb with the pronoun hooked on its tail.",
      "diagnosis": {
        "slip": "used gusta instead of gustaría",
        "cue": "gusta states a liking; gustaría makes a wish — the request needs the -ía."
      },
      "id": "es5102_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me gustaría reservar una mesa",
      "replays": 2,
      "target_answer": "Me gustaría reservar una mesa",
      "meaning": "I would like to reserve a table",
      "cues": [
        "It means: I would like to reserve a table",
        "The stack: gustaría + infinitive"
      ],
      "explanation": "Me gustaría reservar una mesa — the standard opening line of every Spanish reservation.",
      "affirmation": "You wrote the politeness lever doing real work in a real request.",
      "id": "es5102_e5"
    }
  ],
  "summary": {
    "outcome": "Make polite requests with me gustaría + infinitive and ¿podría… ? — the conditional as the soft lever.",
    "use_example": {
      "german": "Me gustaría reservar una mesa",
      "english": "I would like to reserve a table"
    },
    "takeaway": "-ía is the soft lever: the future's stem, the past's distance.",
    "curiosity_teaser": "Up next ([27] The Silent H & Palatal Shifts): see Latin f become Spanish h — hacer is fact wearing a mask!"
  },
  "twist": {
    "prompt": "One more, no safety net — say: I would like to reserve a table:",
    "target_answer": "Me gustaría reservar una mesa",
    "word_bank": [
      "Me",
      "gustaría",
      "reservar",
      "una",
      "mesa",
      "gusta"
    ],
    "explanation": "Rebuilding \"Me gustaría reservar una mesa\" — the wish-form plus a plain infinitive."
  }
};

export default lesson;
