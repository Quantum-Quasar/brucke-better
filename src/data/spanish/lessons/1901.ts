import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1901,
  "slug": "aba-and-ia-paradigms",
  "title": "-aba and -ía Paradigms",
  "subtitle": "The rhythmic endings of memory: hablaba (-ar) and comía/vivía (-er/-ir), plus era (ser)",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "hablaba",
    "era",
    "estaba",
    "vivir",
    "comer",
    "tener",
    "querer",
    "poder",
    "casa"
  ],
  "table_word_ids": [
    "hablaba",
    "era",
    "estaba",
    "vivir",
    "comer",
    "tener",
    "querer",
    "poder",
    "casa"
  ],
  "hook": {
    "title": "Only Three Irregular Verbs in the Whole Language!",
    "content": "Let that sink in: in the entire Spanish language, only THREE verbs are irregular in the imperfect (ser → era, ir → iba, ver → veía). Every single other verb — even tener, querer, poder, hacer, estar, saber — is 100% regular: estaba (-aba) and tenía, quería, podía, hacía (-ía)!"
  },
  "pattern": {
    "title": "The Musical Rhythm of -aba and -ía",
    "content": "-ar verbs: hablaba, hablabas, hablaba, hablábamos, hablaban.\n-er / -ir verbs: vivía, vivías, vivía, vivíamos, vivían (always with a tilde on the í!)."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I / he was speaking (-ar)",
          "german": "hablaba"
        },
        {
          "id": "p2",
          "english": "I / he was (state/location: estar)",
          "german": "estaba"
        },
        {
          "id": "p3",
          "english": "I / he was (identity/description: ser)",
          "german": "era"
        },
        {
          "id": "p4",
          "english": "you were speaking (tú)",
          "german": "hablabas"
        },
        {
          "id": "p5",
          "english": "we were / used to be (ser)",
          "german": "éramos"
        }
      ],
      "target_answer": "hablaba, estaba, era, hablabas, éramos",
      "meaning": "I / he was speaking (-ar), I / he was (state/location: estar), I / he was (identity/description: ser), you were speaking (tú), we were / used to be (ser)",
      "explanation": "All -ar verbs take -aba; ser takes era/eras/era/éramos/eran.",
      "id": "es1901_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build the imperfect of 'estar' ('I/he/she was in a state or place') using the regular -ar imperfect ending:",
      "tile_options": [
        "ar",
        "est",
        "aba",
        "ía"
      ],
      "target_answer": "estaba",
      "meaning": "estaba (was - state/location)",
      "explanation": "estar is 100% regular in the imperfect: est + aba = estaba.",
      "id": "es1901_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which tense and verb do you use for 'I used to speak every day'?",
      "options": [
        "He hablado todos los días",
        "Hablaba todos los días",
        "Hablé todos los días"
      ],
      "target_answer": "Hablaba todos los días",
      "meaning": "I used to speak every day",
      "explanation": "Habitual past ('used to [verb]') is always expressed by the imperfect: hablaba.",
      "id": "es1901_e3"
    },
    {
      "id": "es1901_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question in the compound past (pretérito perfecto):",
      "spoken_question": "¿Qué has preparado hoy?",
      "question_meaning": "What have you prepared today?",
      "reply_idea": "Reply that you have prepared the coffee.",
      "cues": [
        "Start with He preparado...",
        "Finish with el café."
      ],
      "word_bank": [
        "He",
        "has",
        "preparado",
        "café",
        "el",
        "hoy"
      ],
      "target_answer": "He preparado el café",
      "meaning": "I have prepared the coffee",
      "explanation": "haber (he) + the -ado participle (preparado) forms an unbreakable unit in Spanish."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Yo hablaba con mi padre",
      "replays": 2,
      "target_answer": "Yo hablaba con mi padre",
      "meaning": "I was speaking / used to speak with my father",
      "cues": [
        "I: Yo",
        "was speaking / used to speak: hablaba",
        "with my father: con mi padre"
      ],
      "explanation": "Yo hablaba con mi padre.",
      "affirmation": "Rhythmic -aba imperfect mastered!",
      "id": "es1901_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy hablaba, estaba, and era for past habits ('used to') and ongoing past states.",
    "use_example": {
      "german": "Yo hablaba español todos los días y estaba muy contento.",
      "english": "I used to speak Spanish every day and I was very happy."
    },
    "takeaway": "Where English needs three words ('used to speak' or 'was speaking'), Spanish uses one: hablaba.",
    "curiosity_teaser": "Up next ([1902] Setting the Scene: Preterite vs Imperfect): combine the imperfect stage setting with the preterite event in one sentence."
  },
  "twist": {
    "prompt": "Assemble: 'The house was small'",
    "target_answer": "La casa era pequeña",
    "word_bank": [
      "La",
      "pequeño",
      "fue",
      "casa",
      "era",
      "estaba",
      "pequeña"
    ],
    "explanation": "La casa era pequeña describes an ongoing past characteristic."
  }
};

export default lesson;
