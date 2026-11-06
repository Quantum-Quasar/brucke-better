import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2602,
  "slug": "triggering-the-subjunctive",
  "title": "Triggering the Subjunctive",
  "subtitle": "The opposite-vowel switch (-ar → -e, -er/-ir → -a) after quiero que and es importante que",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "querer",
    "importante",
    "hablar",
    "comer",
    "vivir",
    "tener",
    "tengo",
    "confirmar",
    "celebrar"
  ],
  "table_word_ids": [
    "querer",
    "importante",
    "hablar",
    "comer",
    "vivir",
    "tener",
    "tengo",
    "confirmar",
    "celebrar"
  ],
  "hook": {
    "title": "Why the Subjunctive Is Built from the 'Yo' Form + the Opposite Vowel",
    "content": "*The Thinking Method* gives you one master formula that builds the present subjunctive of almost every verb in Spanish — including boot verbs and -go verbs:\n1) Start with the present **yo** form (hablo, como, tengo, digo, pongo, conozco).\n2) Drop the final **-o**.\n3) Attach the **OPPOSITE theme vowel**: **-e / -es / -e / -emos / -en** for -ar verbs (hable, hables, confirmes), and **-a / -as / -a / -amos / -an** for -er and -ir verbs (coma, comas, tenga, tengas, diga, ponga)!"
  },
  "pattern": {
    "title": "Two Classic Triggers: Quiero Que & Es Importante Que",
    "content": "Whenever one person's wish (Quiero que...) or a value judgment (Es importante que..., Es bueno que...) projects an action onto a second clause, flip the vowel: Es importante que tengas el billete ('It's important that you have the ticket')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "you speak (indicative) → that you speak (subjunctive)",
          "german": "hablas → que hables"
        },
        {
          "id": "p2",
          "english": "you eat (indicative) → that you eat (subjunctive)",
          "german": "comes → que comas"
        },
        {
          "id": "p3",
          "english": "you have (tienes) → that you have (from yo tengo!)",
          "german": "tienes → que tengas"
        },
        {
          "id": "p4",
          "english": "he confirms (confirma) → that he confirm",
          "german": "confirma → que confirme"
        },
        {
          "id": "p5",
          "english": "it is important that...",
          "german": "es importante que..."
        }
      ],
      "target_answer": "hablas → que hables, comes → que comas, tienes → que tengas, confirma → que confirme, es importante que...",
      "meaning": "you speak (indicative) → that you speak (subjunctive), you eat (indicative) → that you eat (subjunctive), you have (tienes) → that you have (from yo tengo!), he confirms (confirma) → that he confirm, it is important that...",
      "explanation": "Take the yo form, drop -o, and add the opposite vowel (-ar → -e; -er/-ir → -a).",
      "id": "es2602_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build the tú subjunctive of 'tener' ('that you have') from 'yo tengo' (drop -o, add opposite -as):",
      "tile_options": [
        "teng",
        "es",
        "as",
        "tien"
      ],
      "target_answer": "tengas",
      "meaning": "tengas (that you have - subjunctive)",
      "explanation": "tengo → drop -o → teng + as = tengas!",
      "id": "es2602_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Complete with the opposite-vowel subjunctive: 'Es importante que tú ___ (confirmar) la reservación.'",
      "options": [
        "confirmar",
        "confirmes",
        "confirmas"
      ],
      "target_answer": "confirmes",
      "meaning": "It is important that you confirm the reservation",
      "explanation": "confirmar is an -ar verb, so after Es importante que..., -as flips to -es: que confirmes.",
      "id": "es2602_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is important that you speak with María'",
      "target_answer": "Es importante que hables con María",
      "meaning": "It is important that you speak with María",
      "word_bank": [
        "con",
        "María",
        "hablas",
        "está",
        "hables",
        "que",
        "hablar",
        "importante",
        "Es"
      ],
      "explanation": "Es importante que + hables (opposite vowel -es!).",
      "id": "es2602_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'I want you to eat something (Quiero que comas)'",
      "cues": [
        "I want that → Quiero que",
        "you eat (comer is -er, so flip -es to -as) → comas"
      ],
      "idea_parts": [
        "I want that → Quiero que",
        "you eat (subj.) → comas"
      ],
      "target_answer": "Quiero que comas",
      "meaning": "I want you to eat",
      "word_bank": [
        "que",
        "comí",
        "Quiero",
        "comer",
        "comas",
        "comes"
      ],
      "explanation": "Quiero que comas — -er verb comer flips to -as in the subjunctive.",
      "id": "es2602_e5"
    }
  ],
  "summary": {
    "outcome": "Build the present subjunctive from the yo stem + opposite vowel after quiero que and es importante que.",
    "use_example": {
      "german": "Quiero que hables con mi padre y es importante que tengas el billete.",
      "english": "I want you to speak with my father and it is important that you have the ticket."
    },
    "takeaway": "Yo form minus -o + opposite vowel (-ar → -e, -er/-ir → -a) gives you the subjunctive!",
    "curiosity_teaser": "Up next ([2603] Ojalá & W.E.I.R.D.O. Triggers): discover how Arabic inshallah became Spanish ojalá and why it always triggers the subjunctive!"
  },
  "twist": {
    "prompt": "Assemble: 'It is important that you have the key'",
    "target_answer": "Es importante que tengas la llave",
    "word_bank": [
      "llave",
      "Es",
      "el",
      "la",
      "que",
      "importante",
      "tienes",
      "tengas",
      "tengo"
    ],
    "explanation": "Es importante que tengas la llave."
  }
};

export default lesson;
