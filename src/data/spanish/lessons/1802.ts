import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1802,
  "slug": "famous-preterite-irregulars",
  "title": "The Famous Irregulars",
  "subtitle": "fui/fue (shared by ser and ir!), hice/hizo (hacer), tuve/tuvo (tener) in past narratives",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "fue",
    "ser",
    "ir",
    "hacer",
    "tener",
    "ayer",
    "comí",
    "madre",
    "restaurante"
  ],
  "table_word_ids": [
    "fue",
    "ser",
    "ir",
    "hacer",
    "tener",
    "ayer",
    "comí",
    "madre",
    "restaurante"
  ],
  "hook": {
    "title": "One Preterite for Two Verbs: Why Ser and Ir Both Become 'Fui / Fue'!",
    "content": "Here is one of history's wildest linguistic mergers: in Latin, the verb 'to go' (īre) became so worn down in the past tense that speakers borrowed the past tense of 'to be' (Latin fuī 'I was') whenever they meant 'I went' ('I was to the market' = 'I went to the market')! As a result, ser ('to be') and ir ('to go') have 100% IDENTICAL forms in the preterite: yo fui ('I was / I went'), tú fuiste ('you were / you went'), él/ella/usted fue ('he/she/it was OR went')!"
  },
  "pattern": {
    "title": "How Context Separates 'It Was' from 'He Went'",
    "content": "Followed by a destination with a/al (Fue al restaurante, Fui a Madrid), fue/fui means 'went'. Followed by an adjective or noun (Fue fantástico, Fue un éxito), fue means 'was'!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "he/she/it was (ser) OR went (ir)",
          "german": "fue"
        },
        {
          "id": "p2",
          "english": "I ate (comer)",
          "german": "comí"
        },
        {
          "id": "p3",
          "english": "he went to the restaurant",
          "german": "fue al restaurante"
        },
        {
          "id": "p4",
          "english": "it was fantastic",
          "german": "fue fantástico"
        },
        {
          "id": "p5",
          "english": "it was a success",
          "german": "fue un éxito"
        }
      ],
      "target_answer": "fue, comí, fue al restaurante, fue fantástico, fue un éxito",
      "meaning": "he/she/it was (ser) OR went (ir), I ate (comer), he went to the restaurant, it was fantastic, it was a success",
      "explanation": "fue + al/a [place] = 'went'; fue + adjective/noun = 'was'.",
      "id": "es1802_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What does 'Fue a Madrid y fue fantástico' mean?",
      "options": [
        "He/she went to Madrid and it was fantastic",
        "He goes to Madrid and it is fantastic",
        "It was Madrid and he went fantastic"
      ],
      "target_answer": "He/she went to Madrid and it was fantastic",
      "meaning": "He/she went to Madrid and it was fantastic",
      "explanation": "The first fue (before a Madrid) is ir ('went'); the second fue (before fantástico) is ser ('was')!",
      "id": "es1802_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Yesterday he went to the restaurant'",
      "target_answer": "Ayer fue al restaurante",
      "meaning": "Yesterday he went to the restaurant",
      "word_bank": [
        "Ayer",
        "fue",
        "al",
        "la",
        "es",
        "restaurante",
        "va"
      ],
      "explanation": "Ayer + fue + al (a + el) + restaurante.",
      "id": "es1802_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the reservation was a success",
      "cues": [
        "The reservation → La reservación",
        "was (preterite of ser) → fue",
        "a success → un éxito"
      ],
      "idea_parts": [
        "The reservation → La reservación",
        "was → fue",
        "a success → un éxito"
      ],
      "target_answer": "La reservación fue un éxito",
      "meaning": "The reservation was a success",
      "word_bank": [
        "un",
        "es",
        "reservación",
        "La",
        "fue",
        "éxito",
        "una",
        "salida"
      ],
      "explanation": "La reservación fue un éxito.",
      "id": "es1802_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ayer fue al hotel y comí allí",
      "replays": 2,
      "target_answer": "Ayer fue al hotel y comí allí",
      "meaning": "Yesterday he went to the hotel and I ate there",
      "cues": [
        "Yesterday he went: Ayer fue",
        "to the hotel: al hotel",
        "and I ate there: y comí allí"
      ],
      "explanation": "Ayer fue al hotel y comí allí.",
      "affirmation": "Dual-purpose fue mastered!",
      "id": "es1802_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy fue as the shared preterite of both ser ('was') and ir ('went').",
    "use_example": {
      "german": "Ayer fue a Madrid y la visita fue un éxito.",
      "english": "Yesterday he/she went to Madrid and the visit was a success."
    },
    "takeaway": "ser and ir share the exact same preterite (fui, fuiste, fue) — 'a + place' tells you it means 'went'!",
    "curiosity_teaser": "Up next ([5151] La Cabeza, La Mano & El Corazón): a new branch — why la mano is feminine despite the o!"
  },
  "twist": {
    "prompt": "Assemble: 'It was a success'",
    "target_answer": "Fue un éxito",
    "word_bank": [
      "salida",
      "éxito",
      "una",
      "un",
      "Es",
      "Fue"
    ],
    "explanation": "Fue un éxito ('It was a success')."
  }
};

export default lesson;
