import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1801,
  "slug": "ar-preterite-endings",
  "title": "-ar Preterite Endings",
  "subtitle": "hablé, hablaste, habló, hablamos, hablaron: how the stress mark separates hablo ('I speak') from habló ('he spoke')",
  "phase": 3,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "hablé",
    "ayer",
    "visitar",
    "confirmar",
    "celebrar",
    "comprar",
    "terminar",
    "preparar"
  ],
  "table_word_ids": [
    "hablé",
    "ayer",
    "visitar",
    "confirmar",
    "celebrar",
    "comprar",
    "terminar",
    "preparar"
  ],
  "hook": {
    "title": "Every Converted -ar Verb Now Has a Past Tense!",
    "content": "Remember the hundreds of -ar verbs you unlocked in Topic 3 (confirmar, visitar, celebrar, organizar, preparar, terminar)? Every single one follows the exact same preterite pattern: yo confirmé ('I confirmed'), tú confirmaste ('you confirmed'), él/ella/usted confirmó ('he/she confirmed'), nosotros confirmamos ('we confirmed'), ellos confirmaron ('they confirmed')!"
  },
  "pattern": {
    "title": "Why 'Hablamos' Means Both 'We Speak' and 'We Spoke'",
    "content": "In -ar verbs, the nosotros form (hablamos, visitamos, celebramos) is identical in the present and the preterite! Context (hoy vs ayer) tells the listener immediately whether you mean 'we speak' or 'we spoke'."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I spoke",
          "german": "hablé"
        },
        {
          "id": "p2",
          "english": "you spoke (tú)",
          "german": "hablaste"
        },
        {
          "id": "p3",
          "english": "he / she / usted spoke",
          "german": "habló"
        },
        {
          "id": "p4",
          "english": "we spoke / we speak",
          "german": "hablamos"
        },
        {
          "id": "p5",
          "english": "they / you all spoke",
          "german": "hablaron"
        },
        {
          "id": "p6",
          "english": "yesterday",
          "german": "ayer"
        }
      ],
      "target_answer": "hablé, hablaste, habló, hablamos, hablaron, ayer",
      "meaning": "I spoke, you spoke (tú), he / she / usted spoke, we spoke / we speak, they / you all spoke, yesterday",
      "explanation": "Only 1st person singular (-é) and 3rd person singular (-ó) carry a written accent mark.",
      "id": "es1801_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Form 'I visited' (1st person singular preterite of visitar):",
      "tile_options": [
        "visit",
        "ar",
        "é",
        "ó"
      ],
      "target_answer": "visité",
      "meaning": "visité (I visited)",
      "explanation": "Strip -ar from visitar and add stressed -é: visité.",
      "id": "es1801_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'She confirmed the reservation yesterday'?",
      "options": [
        "Ayer ella confirmé la reservación",
        "Ayer ella confirme la reservación",
        "Ayer ella confirmó la reservación"
      ],
      "target_answer": "Ayer ella confirmó la reservación",
      "meaning": "Yesterday she confirmed the reservation",
      "explanation": "3rd person singular preterite of -ar verbs ends in stressed -ó: confirmó.",
      "id": "es1801_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Yesterday I bought the book'",
      "target_answer": "Ayer hablé con mi padre",
      "meaning": "Yesterday I spoke with my father",
      "word_bank": [
        "madre",
        "hablé",
        "mañana",
        "mi",
        "Ayer",
        "hablo",
        "padre",
        "con"
      ],
      "explanation": "Ayer hablé con mi padre.",
      "id": "es1801_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ayer hablé con mi amigo",
      "replays": 2,
      "target_answer": "Ayer hablé con mi amigo",
      "meaning": "Yesterday I spoke with my friend",
      "cues": [
        "Yesterday: Ayer",
        "I spoke: hablé",
        "with my friend: con mi amigo"
      ],
      "explanation": "Ayer hablé con mi amigo.",
      "affirmation": "Clean -é preterite ending!",
      "id": "es1801_e5"
    }
  ],
  "summary": {
    "outcome": "Conjugate any regular -ar verb in the preterite (-é, -aste, -ó, -amos, -aron).",
    "use_example": {
      "german": "Ayer hablé con mi amigo y confirmamos la reservación.",
      "english": "Yesterday I spoke with my friend and we confirmed the reservation."
    },
    "takeaway": "1st person -é and 3rd person -ó always wear an acute accent in regular -ar preterites.",
    "curiosity_teaser": "Up next ([1802] The Famous Irregulars): discover why ser ('to be') and ir ('to go') share the exact same preterite (fui, fuiste, fue)!"
  },
  "twist": {
    "prompt": "Assemble: 'Yesterday I spoke'",
    "target_answer": "Ayer hablé",
    "word_bank": [
      "hablé",
      "he",
      "hablaba",
      "Ayer",
      "Hoy"
    ],
    "explanation": "Ayer hablé."
  }
};

export default lesson;
