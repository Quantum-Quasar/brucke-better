import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5071,
  "slug": "no-he-terminado-past-in-the-wild",
  "title": "No he terminado",
  "subtitle": "Keeping haber and its participle glued together: No he terminado, ¿Ya has comido?, Nunca he visto",
  "phase": 3,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "he",
    "has",
    "ha",
    "hemos",
    "hablado",
    "comido",
    "hecho",
    "visto",
    "terminar",
    "no",
    "nunca"
  ],
  "table_word_ids": [
    "he",
    "has",
    "ha",
    "hemos",
    "hablado",
    "comido",
    "hecho",
    "visto",
    "terminar",
    "no",
    "nunca"
  ],
  "hook": {
    "title": "The Golden Rule of the Spanish Perfect Past: Never Split 'He + Participle'!",
    "content": "In English, we constantly wedge words between 'have' and the participle: 'Have **you** eaten?', 'I have **not** finished', 'I have **never** seen', 'I have **already** spoken'. In Spanish, **he / has / ha / hemos / han + participle** is welded with titanium! Nothing — not *no*, not *nunca*, not *ya* ('already'), not even the subject *tú* or *usted* in a question — may ever step between them!"
  },
  "pattern": {
    "title": "Where Do Negatives, Pronouns, and Subjects Go?",
    "content": "• Negatives & object pronouns go in **FRONT** of haber: **No he terminado**, **No lo he visto**, **Nunca he comido aquí**.\n• Subject pronouns in questions go either before haber or after the participle: **¿Has comido?** / **¿Ya has comido?**!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I have not finished",
          "german": "no he terminado"
        },
        {
          "id": "p2",
          "english": "I have not seen it",
          "german": "no lo he visto"
        },
        {
          "id": "p3",
          "english": "I have never spoken with him",
          "german": "nunca he hablado con él"
        },
        {
          "id": "p4",
          "english": "have you eaten today?",
          "german": "¿has comido hoy?"
        },
        {
          "id": "p5",
          "english": "we have done it",
          "german": "lo hemos hecho"
        }
      ],
      "target_answer": "no he terminado, no lo he visto, nunca he hablado con él, ¿has comido hoy?, lo hemos hecho",
      "meaning": "I have not finished, I have not seen it, I have never spoken with him, have you eaten today?, we have done it",
      "explanation": "haber + participle is an unbreakable two-word block.",
      "id": "es5071_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'I have not finished' by placing 'no' in front of the welded 'he + terminado' block:",
      "tile_options": [
        "tengo",
        "terminado",
        "he",
        "No"
      ],
      "target_answer": "Noheterminado",
      "meaning": "No he terminado (I haven't finished)",
      "explanation": "No + he + terminado.",
      "id": "es5071_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which of these is the ONLY grammatical way to say 'Have you seen my brother?'?",
      "options": [
        "*¿Tienes visto a mi hermano?",
        "*¿Has tú visto a mi hermano?",
        "¿Has visto a mi hermano?"
      ],
      "target_answer": "¿Has visto a mi hermano?",
      "meaning": "Have you seen my brother?",
      "explanation": "Never wedge tú between has and visto, and remember the personal 'a' before mi hermano!",
      "id": "es5071_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I haven't done it today'",
      "target_answer": "No lo he hecho hoy",
      "meaning": "I haven't done it today",
      "word_bank": [
        "hoy",
        "lo",
        "Tengo",
        "hacer",
        "hecho",
        "No",
        "la",
        "he"
      ],
      "explanation": "No + lo + he hecho + hoy.",
      "id": "es5071_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nunca he visto esta ciudad",
      "replays": 2,
      "target_answer": "Nunca he visto esta ciudad",
      "meaning": "I have never seen this city",
      "cues": [
        "Never: Nunca",
        "I have seen: he visto",
        "this city: esta ciudad"
      ],
      "explanation": "Nunca he visto esta ciudad.",
      "affirmation": "Unbreakable haber + participle mastered!",
      "id": "es5071_e5"
    }
  ],
  "summary": {
    "outcome": "Produce negative and interrogative present-perfect sentences without splitting haber from its participle.",
    "use_example": {
      "german": "No he terminado hoy y no lo he visto.",
      "english": "I haven't finished today and I haven't seen it."
    },
    "takeaway": "Think of he visto / he hablado / hemos hecho as a single compound word — nothing can step inside it.",
    "curiosity_teaser": "Next branch ([5081] De la mañana a la noche): chain daily reflexives from morning to night!"
  },
  "twist": {
    "prompt": "Assemble: 'We have not eaten today'",
    "target_answer": "No hemos comido hoy",
    "word_bank": [
      "comer",
      "No",
      "hoy",
      "hemos",
      "tenemos",
      "he",
      "comido"
    ],
    "explanation": "No hemos comido hoy."
  }
};

export default lesson;
