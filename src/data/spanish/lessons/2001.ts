import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2001,
  "slug": "desde-vs-desde-hace",
  "title": "desde vs desde hace",
  "subtitle": "Starting point (desde el lunes) vs elapsed duration (desde hace tres años) with the present tense",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "desde",
    "vivir",
    "estoy",
    "está",
    "lunes",
    "enero",
    "año",
    "semana",
    "dos",
    "tres"
  ],
  "table_word_ids": [
    "desde",
    "vivir",
    "estoy",
    "está",
    "lunes",
    "enero",
    "año",
    "semana",
    "dos",
    "tres"
  ],
  "hook": {
    "title": "Point on the Calendar vs Span on the Stopwatch",
    "content": "Ask one simple question to choose between desde and desde hace:\n• Is it a **named point on the calendar** (Monday, January, 2020)? Use **desde**: desde el lunes, desde enero.\n• Is it a **counted span of time** (two hours, three days, five years)? Use **desde hace**: desde hace dos semanas, desde hace tres años!"
  },
  "pattern": {
    "title": "Alternative Front-Loaded Order: Hace Tres Años Que Vivo Aquí",
    "content": "You will also hear native speakers put the time span first: Hace tres años que vivo aquí ('It makes three years that I live here') — the exact same present-tense logic!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "since Monday (calendar point)",
          "german": "desde el lunes"
        },
        {
          "id": "p2",
          "english": "since January (calendar point)",
          "german": "desde enero"
        },
        {
          "id": "p3",
          "english": "for two weeks (counted span)",
          "german": "desde hace dos semanas"
        },
        {
          "id": "p4",
          "english": "for three years (counted span)",
          "german": "desde hace tres años"
        },
        {
          "id": "p5",
          "english": "he has been here since Tuesday",
          "german": "está aquí desde el martes"
        }
      ],
      "target_answer": "desde el lunes, desde enero, desde hace dos semanas, desde hace tres años, está aquí desde el martes",
      "meaning": "since Monday (calendar point), since January (calendar point), for two weeks (counted span), for three years (counted span), he has been here since Tuesday",
      "explanation": "Named calendar point = desde; counted quantity of time = desde hace.",
      "id": "es2001_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Complete the sentence: 'Vivo en esta casa ___ diez años.'",
      "options": [
        "desde",
        "desde hace",
        "para"
      ],
      "target_answer": "desde hace",
      "meaning": "I have lived in this house for ten years",
      "explanation": "diez años is a counted span of time, so it requires desde hace.",
      "id": "es2001_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'She has been in Madrid since Monday'",
      "target_answer": "Ella está en Madrid desde el lunes",
      "meaning": "She has been in Madrid since Monday",
      "word_bank": [
        "Ella",
        "lunes",
        "está",
        "el",
        "por",
        "desde",
        "en",
        "Madrid",
        "es",
        "hace"
      ],
      "explanation": "Ella está (present!) + en Madrid + desde el lunes.",
      "id": "es2001_e3"
    },
    {
      "id": "es2001_e4",
      "type": "pronoun_compression",
      "prompt": "Fold the direct object noun phrase into a Spanish pre-verbal pronoun:",
      "shift_hint": "lo / la / los / las",
      "full_sentence": "Veo el libro y compro el libro hoy",
      "compressed_parts": [
        {
          "noun": "el libro",
          "pronoun": "lo",
          "role": "direct object"
        }
      ],
      "word_bank": [
        "libro",
        "la",
        "hoy",
        "le",
        "compro",
        "Lo"
      ],
      "target_answer": "Lo compro hoy",
      "meaning": "I buy it today",
      "explanation": "In Spanish, a conjugated verb pulls its direct object pronoun (lo) directly in front of itself: Lo compro hoy."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Estamos aquí desde hace dos semanas",
      "replays": 2,
      "target_answer": "Estamos aquí desde hace dos semanas",
      "meaning": "We have been here for two weeks",
      "cues": [
        "We are here: Estamos aquí",
        "for (since it-makes): desde hace",
        "two weeks: dos semanas"
      ],
      "explanation": "Estamos aquí desde hace dos semanas.",
      "affirmation": "Present duration with desde hace locked in!",
      "id": "es2001_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish calendar starting points (desde) from counted time spans (desde hace) with present-tense verbs.",
    "use_example": {
      "german": "Estamos aquí desde el lunes y vivo en Madrid desde hace dos años.",
      "english": "We have been here since Monday and I have lived in Madrid for two years."
    },
    "takeaway": "desde + point in time ('since'); desde hace + quantity of time ('for').",
    "curiosity_teaser": "Up next ([2002] Llevar + Time Expressions): learn how everyday speakers use 'carrying time' (llevo tres años aquí) to sound 100% native."
  },
  "twist": {
    "prompt": "Assemble: 'He has been here for three days'",
    "target_answer": "Está aquí desde hace tres días",
    "word_bank": [
      "tres",
      "por",
      "hace",
      "desde",
      "días",
      "Es",
      "Está",
      "aquí",
      "para"
    ],
    "explanation": "Está aquí desde hace tres días."
  }
};

export default lesson;
