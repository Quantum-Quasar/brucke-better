import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1902,
  "slug": "setting-scene-preterite-vs-imperfect",
  "title": "Setting the Scene: Preterite vs Imperfect",
  "subtitle": "The background canvas (estaba, vivía, era) interrupted by the event dot (llegó, vi, fue)",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "estaba",
    "era",
    "hablaba",
    "fue",
    "hablé",
    "comí",
    "ayer",
    "casa",
    "restaurante",
    "hotel"
  ],
  "table_word_ids": [
    "estaba",
    "era",
    "hablaba",
    "fue",
    "hablé",
    "comí",
    "ayer",
    "casa",
    "restaurante",
    "hotel"
  ],
  "hook": {
    "title": "Stage Lighting vs The Actor Entering",
    "content": "Every great story uses both past tenses together:\n• **Imperfect (Stage Lighting & Scenery)**: Estaba en el restaurante ('I was in the restaurant'), el café estaba caliente ('the coffee was hot'), la noche era hermosa ('the night was beautiful').\n• **Preterite (The Action on Stage)**: Hablé con mi amigo ('I spoke with my friend'), comí el pastel ('I ate the cake'), fue un éxito ('it was a success' — summing up the whole finished event as one dot)!"
  },
  "pattern": {
    "title": "Why 'Era' Paints the Ongoing Quality and 'Fue' Judges the Completed Event",
    "content": "Notice the difference: La fiesta era grande ('The party was big' — describing what it looked like while you were in the middle of it) vs La fiesta fue un éxito ('The party was a success' — stamping a final verdict on the finished event)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I was in the hotel (background location)",
          "german": "estaba en el hotel"
        },
        {
          "id": "p2",
          "english": "he went to the hotel (event dot)",
          "german": "fue al hotel"
        },
        {
          "id": "p3",
          "english": "it was a big house (ongoing description)",
          "german": "era una casa grande"
        },
        {
          "id": "p4",
          "english": "it was a success (final verdict on finished event)",
          "german": "fue un éxito"
        },
        {
          "id": "p5",
          "english": "I was speaking (ongoing) vs I spoke (completed)",
          "german": "hablaba vs hablé"
        }
      ],
      "target_answer": "estaba en el hotel, fue al hotel, era una casa grande, fue un éxito, hablaba vs hablé",
      "meaning": "I was in the hotel (background location), he went to the hotel (event dot), it was a big house (ongoing description), it was a success (final verdict on finished event), I was speaking (ongoing) vs I spoke (completed)",
      "explanation": "Imperfect puts you inside the ongoing moment; preterite steps back and views the completed event as a whole.",
      "id": "es1902_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In 'I was at the house when I spoke with my mother', which pair of verbs matches 'was' (background location) and 'spoke' (completed event)?",
      "options": [
        "Era / hablé",
        "Fui / hablaba",
        "Estaba / hablé"
      ],
      "target_answer": "Estaba / hablé",
      "meaning": "I was (there) / I spoke",
      "explanation": "Estaba sets the ongoing location; hablé marks the completed conversation.",
      "id": "es1902_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I was at the restaurant and I ate the cake'",
      "target_answer": "Estaba en el restaurante y comí el pastel",
      "meaning": "I was at the restaurant and I ate the cake",
      "word_bank": [
        "el",
        "como",
        "Fue",
        "en",
        "Estaba",
        "comí",
        "Era",
        "pastel",
        "y",
        "el",
        "restaurante"
      ],
      "explanation": "Estaba (background location) + y comí (completed action).",
      "id": "es1902_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the hotel was very good (ongoing description) and yesterday you spoke with your friend",
      "cues": [
        "The hotel was very good → El hotel era muy bueno",
        "and yesterday I spoke → y ayer hablé",
        "with my friend → con mi amigo"
      ],
      "idea_parts": [
        "The hotel was very good → El hotel era muy bueno",
        "and yesterday I spoke with my friend → y ayer hablé con mi amigo"
      ],
      "target_answer": "El hotel era muy bueno y ayer hablé con mi amigo",
      "meaning": "The hotel was very good and yesterday I spoke with my friend",
      "word_bank": [
        "con",
        "era",
        "estaba",
        "ayer",
        "amigo",
        "hotel",
        "buena",
        "hablaba",
        "hablé",
        "y",
        "El",
        "muy",
        "mi",
        "bueno"
      ],
      "explanation": "El hotel era muy bueno (description) + y ayer hablé con mi amigo (event).",
      "id": "es1902_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Estaba aquí y fue fantástico",
      "replays": 2,
      "target_answer": "Estaba aquí y fue fantástico",
      "meaning": "I was here and it was fantastic",
      "cues": [
        "I was here (background): Estaba aquí",
        "and it was fantastic (verdict): y fue fantástico"
      ],
      "explanation": "Estaba aquí y fue fantástico.",
      "affirmation": "Masterful contrast of estaba and fue!",
      "id": "es1902_e5"
    }
  ],
  "summary": {
    "outcome": "Combine imperfect background descriptions (era, estaba, hablaba) with preterite events (hablé, comí, fue).",
    "use_example": {
      "german": "Estaba en Madrid, la ciudad era hermosa y fue un viaje fantástico.",
      "english": "I was in Madrid, the city was beautiful, and it was a fantastic trip."
    },
    "takeaway": "Imperfect = inside the ongoing scene (era, estaba, hablaba); Preterite = the completed event or final verdict (hablé, comí, fue).",
    "curiosity_teaser": "Up next ([20] desde hace & Present Duration): see why actions that started in the past and continue right now stay in the PRESENT tense!"
  },
  "twist": {
    "prompt": "Assemble: 'I was speaking when he went'",
    "target_answer": "Yo hablaba cuando fue",
    "word_bank": [
      "es",
      "hablé",
      "fue",
      "hablaba",
      "cuando",
      "Yo",
      "era"
    ],
    "explanation": "Yo hablaba (ongoing) cuando fue (event)."
  }
};

export default lesson;
