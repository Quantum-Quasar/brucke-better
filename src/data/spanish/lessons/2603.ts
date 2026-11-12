import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2603,
  "slug": "ojala-and-weirdo-triggers",
  "title": "Ojalá & W.E.I.R.D.O. Triggers",
  "subtitle": "Arabic-heritage ojalá ('God willing / hopefully') and wishes, emotions, and doubts in the subjunctive",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "ojalá",
    "tener",
    "tengo",
    "ser",
    "estar",
    "bueno",
    "buenos_días",
    "tiempo",
    "posible",
    "llave"
  ],
  "table_word_ids": [
    "ojalá",
    "tener",
    "tengo",
    "ser",
    "estar",
    "bueno",
    "buenos_días",
    "tiempo",
    "posible",
    "llave"
  ],
  "hook": {
    "title": "From Arabic 'Inshallah' to Spanish 'Ojalá'!",
    "content": "Nearly 800 years of Arabic presence in Spain left around 4,000 words in the Spanish dictionary — and none is more beloved than **ojalá** (/oxaˈla/, 'hopefully / I hope that / if only'). It comes directly from Hispano-Arabic *law šá lláh* ('if God wills it / may God will it'). Because ojalá is always a wish or hope, it **100% ALWAYS triggers the subjunctive** after it (with or without que): **¡Ojalá tengas un buen día!** ('I hope you have a great day!')!"
  },
  "pattern": {
    "title": "W.E.I.R.D.O.: When the Subjunctive Comes Alive",
    "content": "The subjunctive is not a tense; it is a mood used whenever the main clause expresses **W**ishes (Quiero que...), **E**motions (Me alegra que...), **I**mpersonal judgments (Es importante que..., Es posible que...), **R**equests/Recommendations, **D**oubt/Denial (No creo que...), or **O**jalá!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "hopefully / I hope that (Arabic law šá lláh)",
          "german": "ojalá"
        },
        {
          "id": "p2",
          "english": "I hope you have (ojalá + tengas)",
          "german": "ojalá tengas"
        },
        {
          "id": "p3",
          "english": "it is possible that it be (sea = subjunctive of ser)",
          "german": "es posible que sea"
        },
        {
          "id": "p4",
          "english": "I want you to be here (estés = subjunctive of estar)",
          "german": "quiero que estés aquí"
        },
        {
          "id": "p5",
          "english": "it is good that you have time",
          "german": "es bueno que tengas tiempo"
        }
      ],
      "target_answer": "ojalá, ojalá tengas, es posible que sea, quiero que estés aquí, es bueno que tengas tiempo",
      "meaning": "hopefully / I hope that (Arabic law šá lláh), I hope you have (ojalá + tengas), it is possible that it be (sea = subjunctive of ser), I want you to be here (estés = subjunctive of estar), it is good that you have time",
      "explanation": "Wishes, possibilities, emotions, and ojalá all trigger the subjunctive mood.",
      "id": "es2603_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Why does 'ojalá' ALWAYS require a subjunctive verb after it (e.g., ¡Ojalá tengas tiempo!)?",
      "options": [
        "Because ojalá is past tense",
        "Because ojalá is an adjective",
        "Because ojalá comes from Arabic 'may God will it' — it is inherently a wish/hope rather than a declared fact!"
      ],
      "target_answer": "Because ojalá comes from Arabic 'may God will it' — it is inherently a wish/hope rather than a declared fact!",
      "meaning": "hopefully / God willing",
      "explanation": "A wish projects a desired world rather than stating a plain indicative fact, so ojalá always takes the subjunctive.",
      "id": "es2603_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Hopefully you have time today!'",
      "target_answer": "Ojalá tengas tiempo hoy",
      "meaning": "I hope you have time today!",
      "word_bank": [
        "tiempo",
        "tengas",
        "tengo",
        "Ojalá",
        "ayer",
        "hoy",
        "tienes"
      ],
      "explanation": "¡Ojalá + tengas (subjunctive of tener) + tiempo hoy!",
      "id": "es2603_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'It is good that you have the key'",
      "cues": [
        "It is good that → Es bueno que",
        "you have (subjunctive from tengo → tengas) → tengas",
        "the key → la llave"
      ],
      "idea_parts": [
        "It is good that → Es bueno que",
        "you have the key → tengas la llave"
      ],
      "target_answer": "Es bueno que tengas la llave",
      "meaning": "It is good that you have the key",
      "word_bank": [
        "que",
        "la",
        "llave",
        "tienes",
        "el",
        "tengas",
        "bueno",
        "Es",
        "buena"
      ],
      "explanation": "Es bueno que tengas la llave.",
      "id": "es2603_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ojalá tengas tiempo mañana",
      "replays": 2,
      "target_answer": "Ojalá tengas tiempo mañana",
      "meaning": "I hope you have time tomorrow",
      "cues": [
        "Hopefully (accent on final á): Ojalá",
        "you have (subjunctive): tengas",
        "time tomorrow: tiempo mañana"
      ],
      "explanation": "¡Ojalá tengas tiempo mañana!",
      "affirmation": "Ojalá + subjunctive mastered!",
      "id": "es2603_e5"
    }
  ],
  "summary": {
    "outcome": "Use ojalá and impersonal triggers (es bueno que, es posible que) with the present subjunctive.",
    "use_example": {
      "german": "¡Ojalá tengas tiempo mañana — es bueno que tengas la llave!",
      "english": "I hope you have time tomorrow — it is good that you have the key!"
    },
    "takeaway": "Whenever you say ojalá ('hopefully / I hope'), flip the verb into the subjunctive!",
    "curiosity_teaser": "Up next ([5101] Hypothetical Situations): the conditional -ía across real what-ifs!"
  },
  "twist": {
    "prompt": "Assemble: 'Hopefully you have the confirmation'",
    "target_answer": "Ojalá tengas la confirmación",
    "word_bank": [
      "tengo",
      "tienes",
      "tengas",
      "confirmación",
      "la",
      "el",
      "Ojalá"
    ],
    "explanation": "¡Ojalá tengas la confirmación!"
  }
};

export default lesson;
