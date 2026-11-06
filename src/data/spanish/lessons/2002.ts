import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2002,
  "slug": "llevar-time-expressions",
  "title": "Llevar + Time Expressions",
  "subtitle": "llevar tres años aquí: Spanish's ultra-natural 'carry time' idiom for ongoing duration",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "desde",
    "vivir",
    "estoy",
    "aquí",
    "año",
    "semana",
    "dos",
    "tres",
    "ciudad"
  ],
  "table_word_ids": [
    "desde",
    "vivir",
    "estoy",
    "aquí",
    "año",
    "semana",
    "dos",
    "tres",
    "ciudad"
  ],
  "hook": {
    "title": "Carrying Time on Your Back: Llevo Tres Años Aquí",
    "content": "Alongside Vivo aquí desde hace tres años, everyday Spanish has an even shorter, ultra-idiomatic way to express ongoing duration: use the verb llevar ('to carry / wear'): Llevo tres años aquí (literally 'I carry three years here' = 'I've been here for three years')!"
  },
  "pattern": {
    "title": "Three Ways to Express Ongoing Duration",
    "content": "1) Vivo aquí desde hace tres años.\n2) Hace tres años que vivo aquí.\n3) Llevo tres años aquí.\nAll three keep the verb in the PRESENT tense because the action is still going on!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I have lived here for three years (with desde hace)",
          "german": "vivo aquí desde hace tres años"
        },
        {
          "id": "p2",
          "english": "I have been here for three years (lit. I carry three years here)",
          "german": "llevo tres años aquí"
        },
        {
          "id": "p3",
          "english": "for two weeks",
          "german": "desde hace dos semanas"
        },
        {
          "id": "p4",
          "english": "since Monday",
          "german": "desde el lunes"
        }
      ],
      "target_answer": "vivo aquí desde hace tres años, llevo tres años aquí, desde hace dos semanas, desde el lunes",
      "meaning": "I have lived here for three years (with desde hace), I have been here for three years (lit. I carry three years here), for two weeks, since Monday",
      "explanation": "Both desde hace and llevar + time use the present tense for ongoing duration.",
      "id": "es2002_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What does a native speaker in Madrid mean by 'Llevo dos años en Madrid'?",
      "options": [
        "I left Madrid two years ago",
        "I will go to Madrid in two years",
        "I have been (living) in Madrid for two years"
      ],
      "target_answer": "I have been (living) in Madrid for two years",
      "meaning": "I have been in Madrid for two years",
      "explanation": "llevar + time span literally pictures 'carrying' the accumulated time you've spent somewhere!",
      "id": "es2002_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have lived in this house for three years'",
      "target_answer": "Vivo en esta casa desde hace tres años",
      "meaning": "I have lived in this house for three years",
      "word_bank": [
        "hace",
        "esta",
        "en",
        "para",
        "desde",
        "Vivo",
        "por",
        "casa",
        "años",
        "tres",
        "este"
      ],
      "explanation": "Vivo en esta casa desde hace tres años.",
      "id": "es2002_e3"
    },
    {
      "id": "es2002_e4",
      "type": "pronoun_compression",
      "prompt": "Fold the indirect receiver into its Spanish dative pronoun:",
      "shift_hint": "me / te / le / nos / les",
      "full_sentence": "Ella habla al médico por la mañana",
      "compressed_parts": [
        {
          "noun": "al médico",
          "pronoun": "le",
          "role": "indirect receiver"
        }
      ],
      "word_bank": [
        "Ella",
        "lo",
        "se",
        "le",
        "médico",
        "habla"
      ],
      "target_answer": "Ella le habla",
      "meaning": "She speaks to him",
      "explanation": "The indirect receiver al médico folds into the pre-verbal dative clitic le: Ella le habla."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vivo aquí desde hace diez años",
      "replays": 2,
      "target_answer": "Vivo aquí desde hace diez años",
      "meaning": "I have lived here for ten years",
      "cues": [
        "I live here: Vivo aquí",
        "for (since it-makes): desde hace",
        "ten years: diez años"
      ],
      "explanation": "Vivo aquí desde hace diez años.",
      "affirmation": "Ongoing present duration mastered!",
      "id": "es2002_e5"
    }
  ],
  "summary": {
    "outcome": "Recognize llevar + time and produce present-tense duration sentences with desde and desde hace.",
    "use_example": {
      "german": "Vivo en esta ciudad desde hace diez años.",
      "english": "I have lived in this city for ten years."
    },
    "takeaway": "Spanish views ongoing duration as present reality (vivo / estoy / llevo).",
    "curiosity_teaser": "Up next ([21] Comparatives: más, menos, mejor): compare anything in Spanish with más, menos, mejor, peor, and tan... como!"
  },
  "twist": {
    "prompt": "Assemble: 'I have been here for two weeks'",
    "target_answer": "Estoy aquí desde hace dos semanas",
    "word_bank": [
      "para",
      "dos",
      "Soy",
      "semanas",
      "hace",
      "aquí",
      "por",
      "Estoy",
      "desde"
    ],
    "explanation": "Estoy aquí desde hace dos semanas."
  }
};

export default lesson;
