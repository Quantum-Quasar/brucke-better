import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 12,
  "slug": "near-future-ir-a",
  "title": "The Near Future: ir a",
  "subtitle": "voy a + infinitive — express future plans without learning a new tense",
  "phase": 2,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "ir",
    "voy",
    "vas",
    "va",
    "vamos",
    "van",
    "a",
    "mañana",
    "hoy",
    "visitar",
    "celebrar"
  ],
  "table_word_ids": [
    "ir",
    "voy",
    "vas",
    "va",
    "vamos",
    "van",
    "a",
    "mañana",
    "hoy",
    "visitar",
    "celebrar"
  ],
  "hook": {
    "title": "Speak About the Future Right Now",
    "content": "How do you talk about tomorrow's plans in English? Nine times out of ten, you say 'I'm going to visit, we're going to celebrate'. Spanish uses the exact same blueprint: take the present tense of ir ('to go': voy, vas, va, vamos, van), add the connector a ('to'), and attach ANY infinitive verb you know! Voy a visitar Madrid ('I am going to visit Madrid')."
  },
  "pattern": {
    "title": "Why Spanish Always Needs 'a' After 'Ir'",
    "content": "In French (je vais visiter), 'go' connects directly to the infinitive. In Spanish, motion toward a future action always uses the forward-pointing preposition a ('to'): Voy a confirmar ('I am going to confirm'), ¿Vas a participar? ('Are you going to participate?'), Vamos a celebrar ('We are going to celebrate')!",
    "linguist_note": "While the infinitive ir comes from Latin īre ('to go', English exit/transit), the present forms voy, vas, va, vamos, van come from Latin vādere ('to advance/wade')!",
    "trap_note": "Never forget the 'a' in ir a + infinitive (*Voy visitar is broken). Think of 'a' as the arrow pointing toward your future action!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I go / I am going",
          "german": "voy"
        },
        {
          "id": "p2",
          "english": "you go / are going (tú)",
          "german": "vas"
        },
        {
          "id": "p3",
          "english": "he/she/usted goes / is going",
          "german": "va"
        },
        {
          "id": "p4",
          "english": "we go / let's go!",
          "german": "vamos"
        },
        {
          "id": "p5",
          "english": "they / you all go",
          "german": "van"
        },
        {
          "id": "p6",
          "english": "tomorrow",
          "german": "mañana"
        }
      ],
      "target_answer": "voy, vas, va, vamos, van, mañana",
      "meaning": "I go / I am going, you go / are going (tú), he/she/usted goes / is going, we go / let's go!, they / you all go, tomorrow",
      "explanation": "voy, vas, va, vamos, van + a + infinitive expresses any future plan.",
      "id": "es12_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build the near-future frame 'I am going to visit' from its three parts:",
      "tile_options": [
        "visitar",
        "a",
        "de",
        "Voy"
      ],
      "target_answer": "Voyavisitar",
      "meaning": "Voy a visitar (I am going to visit)",
      "explanation": "Voy ('I am going') + a ('to') + visitar ('visit').",
      "id": "es12_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which preposition must always link 'voy / vas / vamos' to a following infinitive?",
      "options": [
        "a (Voy a confirmar)",
        "de (*Voy de confirmar)",
        "nothing (*Voy confirmar)"
      ],
      "target_answer": "a (Voy a confirmar)",
      "meaning": "I am going to confirm",
      "explanation": "ir a + infinitive always requires the preposition a.",
      "id": "es12_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Tomorrow I am going to visit Madrid'",
      "target_answer": "Mañana voy a visitar Madrid",
      "meaning": "Tomorrow I am going to visit Madrid",
      "word_bank": [
        "visitar",
        "a",
        "Madrid",
        "voy",
        "vas",
        "hoy",
        "de",
        "Mañana"
      ],
      "explanation": "Mañana + voy + a + visitar + Madrid.",
      "id": "es12_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'We are going to celebrate today'",
      "cues": [
        "We are going → Vamos",
        "to (connector) → a",
        "celebrate today → celebrar hoy"
      ],
      "idea_parts": [
        "We are going → Vamos",
        "to celebrate → a celebrar",
        "today → hoy"
      ],
      "target_answer": "Vamos a celebrar hoy",
      "meaning": "We are going to celebrate today",
      "word_bank": [
        "de",
        "Voy",
        "celebrar",
        "Vamos",
        "a",
        "mañana",
        "hoy"
      ],
      "explanation": "Vamos a celebrar hoy — vamos a + infinitive also means 'Let's celebrate today!'",
      "diagnosis": {
        "slip": "forgot the preposition a after Vamos",
        "cue": "Always include a between ir (voy/vas/va/vamos/van) and the infinitive: Vamos a celebrar."
      },
      "id": "es12_e5"
    }
  ],
  "summary": {
    "outcome": "Express future plans and intentions using voy/vas/va/vamos/van + a + infinitive.",
    "use_example": {
      "german": "Mañana voy a visitar Madrid y vamos a celebrar.",
      "english": "Tomorrow I am going to visit Madrid and we are going to celebrate."
    },
    "takeaway": "voy a + infinitive turns every verb you decode into a future tense immediately.",
    "curiosity_teaser": "Up next ([1201] voy, vas, va Drills): drill all five forms of ir and contraction al (a + el)."
  },
  "twist": {
    "prompt": "Assemble: 'Are you going to participate?'",
    "target_answer": "Vas a participar",
    "word_bank": [
      "Voy",
      "a",
      "de",
      "Vas",
      "participar",
      "celebrar"
    ],
    "explanation": "¿Vas a participar? asks about future plans."
  },
  "foreshadow": {
    "line": "Next in Topic 13: the famous duel between por and para — and how thinking of para as an arrow and por as a scale solves it forever.",
    "resolvedIn": 13
  },
  "payoff": {
    "ofLesson": 11,
    "text": "Every noun phrase and verb you built in Topics 1–11 can now be projected into the future with voy a."
  }
};

export default lesson;
