import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2202,
  "slug": "se-lo-softening-rule",
  "title": "The se lo Softening Rule",
  "subtitle": "Why *le lo sounds like a tongue-twister and becomes se lo (Se lo doy 'I give it to him/her')",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "se",
    "le",
    "lo",
    "la",
    "dar",
    "decir",
    "explicar",
    "confirmar",
    "voy",
    "querer"
  ],
  "table_word_ids": [
    "se",
    "le",
    "lo",
    "la",
    "dar",
    "decir",
    "explicar",
    "confirmar",
    "voy",
    "querer"
  ],
  "hook": {
    "title": "Se Lo Works for Him, Her, Usted, AND Them!",
    "content": "Because both singular le ('to him / to her / to usted') and plural les ('to them / to you all') turn into se before lo/la/los/las, Se lo doy can mean 'I give it to him', 'I give it to her', 'I give it to usted', or 'I give it to them'!"
  },
  "pattern": {
    "title": "Hooking Double Pronouns onto an Infinitive: Voy a Dárselo",
    "content": "Remember from Sprig 1203 that pronouns can either walk before the first verb OR hook onto the tail of the infinitive? That works with se lo too: Se lo voy a decir OR Voy a decírselo ('I am going to tell it to him/her')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I give it (m.) to him / her / usted / them",
          "german": "se lo doy"
        },
        {
          "id": "p2",
          "english": "I give it (f., e.g. la llave) to him / her",
          "german": "se la doy"
        },
        {
          "id": "p3",
          "english": "I tell it to him / her / usted",
          "german": "se lo digo"
        },
        {
          "id": "p4",
          "english": "he explains it to them",
          "german": "se lo explica"
        },
        {
          "id": "p5",
          "english": "I am going to tell it to him/her (left-walk)",
          "german": "se lo voy a decir"
        }
      ],
      "target_answer": "se lo doy, se la doy, se lo digo, se lo explica, se lo voy a decir",
      "meaning": "I give it (m.) to him / her / usted / them, I give it (f., e.g. la llave) to him / her, I tell it to him / her / usted, he explains it to them, I am going to tell it to him/her (left-walk)",
      "explanation": "le/les + lo/la → se lo / se la.",
      "id": "es2202_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Transform 'le + lo + digo' into real Spanish by applying the 'se lo' softening rule:",
      "tile_options": [
        "Se",
        "digo",
        "lo",
        "Le"
      ],
      "target_answer": "Selodigo",
      "meaning": "Se lo digo (I tell it to him/her)",
      "explanation": "le changes to se before lo: Se lo digo.",
      "id": "es2202_e2"
    },
    {
      "type": "shift_select",
      "prompt": "You have 'la confirmación' (feminine) and want to say 'I am going to give it to him'. Which is correct?",
      "options": [
        "Se la voy a dar",
        "*Le la voy a dar",
        "Se lo voy a dar"
      ],
      "target_answer": "Se la voy a dar",
      "meaning": "I am going to give it (the confirmation) to him",
      "explanation": "le becomes se, and la confirmación becomes feminine la: Se la voy a dar.",
      "id": "es2202_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I explain it to him'",
      "target_answer": "Se lo explico",
      "meaning": "I explain it to him / her",
      "word_bank": [
        "Se",
        "explico",
        "me",
        "Le",
        "lo",
        "la"
      ],
      "explanation": "Se + lo + explico.",
      "id": "es2202_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Se lo voy a decir hoy",
      "replays": 2,
      "target_answer": "Se lo voy a decir hoy",
      "meaning": "I am going to tell it to him/her today",
      "cues": [
        "To him/her + it: Se lo",
        "I am going to tell: voy a decir",
        "today: hoy"
      ],
      "explanation": "Se lo voy a decir hoy.",
      "affirmation": "Se lo in the near future mastered!",
      "id": "es2202_e5"
    }
  ],
  "summary": {
    "outcome": "Transform le/les into se before lo/la/los/las in present and near-future sentences.",
    "use_example": {
      "german": "Tengo la confirmación y se la voy a dar hoy.",
      "english": "I have the confirmation and I am going to give it to him/her today."
    },
    "takeaway": "Whenever le or les meets lo, la, los, or las, it transforms into se.",
    "curiosity_teaser": "Up next ([23] Direct vs Indirect Objects: lo/la vs le): master the Personal 'a', redundant le, and saber vs conocer!"
  },
  "twist": {
    "prompt": "Assemble: 'I am going to explain it to her'",
    "target_answer": "Se lo voy a explicar",
    "word_bank": [
      "de",
      "explicar",
      "voy",
      "Se",
      "a",
      "Le",
      "lo",
      "me"
    ],
    "explanation": "Se lo voy a explicar."
  }
};

export default lesson;
