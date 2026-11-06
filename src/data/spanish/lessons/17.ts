import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 17,
  "slug": "ado-ido-past",
  "title": "The -ado / -ido Past",
  "subtitle": "Pretérito perfecto with haber: he confirmado, he comido — the English -ed cousin",
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
    "confirmar",
    "comer",
    "vivir"
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
    "confirmar",
    "comer",
    "vivir"
  ],
  "hook": {
    "title": "Why Spanish Has Two Words for 'Have': Tener vs Haber",
    "content": "In Topic 10 you learned tener ('to hold/possess': tengo un coche). Now you meet its twin, haber (he, has, ha, hemos, han), which exists solely to build the 'have [done]' past tense (the pretérito perfecto)! Take any -ar verb, replace -ar with -ado (confirmar → confirmado, hablar → hablado). Take any -er or -ir verb, replace -er/-ir with -ido (comer → comido, vivir → vivido). Put he ('I have') in front, and you have the past: He confirmado ('I have confirmed'), He comido ('I have eaten')!"
  },
  "pattern": {
    "title": "The Best News: Participles After Haber NEVER Change Ending!",
    "content": "Unlike adjectives (bueno/buena/buenos/buenas), a past participle paired with haber (he, has, ha, hemos, han) is 100% INVARIABLE — it always ends in -o regardless of who is speaking or what you are talking about! And where do object pronouns and 'no' go? Right at the front before haber — never split haber from its participle: No lo he visto ('I haven't seen it')!",
    "linguist_note": "Spanish split Latin habēre (auxiliary haber) from tenēre (possessive tener), whereas French (avoir) and English ('have') use one verb for both.",
    "trap_note": "In English you can split 'have' and the participle ('Have you eaten?', 'I have never seen'). In Spanish, he/has/ha/hemos/han and the participle are welded together — nothing may ever step between them!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I have (auxiliary before participle)",
          "german": "he"
        },
        {
          "id": "p2",
          "english": "you have (auxiliary, tú)",
          "german": "has"
        },
        {
          "id": "p3",
          "english": "he / she / usted has (auxiliary)",
          "german": "ha"
        },
        {
          "id": "p4",
          "english": "we have (auxiliary)",
          "german": "hemos"
        },
        {
          "id": "p5",
          "english": "spoken (-ar → -ado)",
          "german": "hablado"
        },
        {
          "id": "p6",
          "english": "eaten (-er/-ir → -ido)",
          "german": "comido"
        }
      ],
      "target_answer": "he, has, ha, hemos, hablado, comido",
      "meaning": "I have (auxiliary before participle), you have (auxiliary, tú), he / she / usted has (auxiliary), we have (auxiliary), spoken (-ar → -ado), eaten (-er/-ir → -ido)",
      "explanation": "haber (he, has, ha, hemos, han) + invariable -ado/-ido forms the present perfect past.",
      "id": "es17_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'I have spoken' from the 1st-person auxiliary of haber and the participle of hablar:",
      "tile_options": [
        "hablado",
        "Tengo",
        "He",
        "hablar"
      ],
      "target_answer": "Hehablado",
      "meaning": "He hablado (I have spoken)",
      "explanation": "He (auxiliary 'I have', silent h) + hablado ('spoken') = He hablado.",
      "id": "es17_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I have not eaten today' (keeping haber and comido glued together)?",
      "options": [
        "*No tengo comido hoy",
        "*He no comido hoy",
        "No he comido hoy"
      ],
      "target_answer": "No he comido hoy",
      "meaning": "I have not eaten today",
      "explanation": "Never use tener as an auxiliary, and never put no between he and comido: No he comido hoy.",
      "id": "es17_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Have you spoken with María?'",
      "target_answer": "Has hablado con María",
      "meaning": "Have you spoken with María?",
      "word_bank": [
        "hablado",
        "hablar",
        "Tienes",
        "con",
        "Has",
        "María",
        "He"
      ],
      "explanation": "¿Has hablado con María? — has + hablado stays glued together even in questions!",
      "id": "es17_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that we have eaten here today",
      "cues": [
        "We have (auxiliary) → Hemos",
        "eaten (comer → -ido) → comido",
        "here today → aquí hoy"
      ],
      "idea_parts": [
        "We have eaten → Hemos comido",
        "here today → aquí hoy"
      ],
      "target_answer": "Hemos comido aquí hoy",
      "meaning": "We have eaten here today",
      "word_bank": [
        "hoy",
        "aquí",
        "Tenemos",
        "Hemos",
        "comer",
        "comido",
        "hablado"
      ],
      "explanation": "Hemos comido aquí hoy — hemos + comido.",
      "diagnosis": {
        "slip": "used Tenemos instead of Hemos",
        "cue": "tener is only for possessing nouns (Tenemos comida); before a participle (-ado/-ido), always use haber (Hemos comido)!"
      },
      "id": "es17_e5"
    }
  ],
  "summary": {
    "outcome": "Form the pretérito perfecto with haber (he, has, ha, hemos, han) + invariable -ado / -ido participles.",
    "use_example": {
      "german": "Hoy he hablado con María y hemos comido en el restaurante.",
      "english": "Today I have spoken with María and we have eaten at the restaurant."
    },
    "takeaway": "tener possesses things (Tengo café); haber launches past participles (He comido) — and the two words never split!",
    "curiosity_teaser": "Up next ([1701] Forming Participles): master -ado, -ido, and the two famous irregulars hecho ('done/made') and visto ('seen')."
  },
  "twist": {
    "prompt": "Assemble: 'I haven't seen it'",
    "target_answer": "No lo he visto",
    "word_bank": [
      "he",
      "tengo",
      "la",
      "No",
      "lo",
      "visto"
    ],
    "explanation": "No + lo + he visto — pronoun and negation stand in front of he visto."
  },
  "foreshadow": {
    "line": "While he hablado connects the past to today ('this morning, this week, in my life'), Topic 18 unlocks the single-word Preterite for completed dots in past time ('yesterday I spoke' = hablé).",
    "resolvedIn": 18
  },
  "payoff": {
    "ofLesson": 10,
    "text": "Remember hay ('there is/are') from Topic 10? That ha inside hay is the exact same 3rd-person auxiliary ha ('has') you just learned!"
  }
};

export default lesson;
