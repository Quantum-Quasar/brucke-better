import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5141,
  "slug": "medico-profesor-actor-no-un",
  "title": "Médico, Profesor & Actor (No 'un'!)",
  "subtitle": "Why Spanish drops un/una after ser before unmodified professions: Soy profesor, Ella es doctora",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "ser",
    "soy",
    "eres",
    "es",
    "somos",
    "padre",
    "madre",
    "hermano",
    "universidad",
    "bueno"
  ],
  "table_word_ids": [
    "ser",
    "soy",
    "eres",
    "es",
    "somos",
    "padre",
    "madre",
    "hermano",
    "universidad",
    "bueno"
  ],
  "hook": {
    "title": "Why Spanish Says 'Soy Profesor' (Without 'Un')!",
    "content": "In English, you must put 'a/an' before a profession: 'I am **a** teacher', 'My mother is **a** doctor'. In Spanish (just like French), a bare profession after **ser** is treated like an identity label or adjective rather than a separate object — so **you drop un / una**: **Soy profesor** ('I am a teacher'), **Mi madre es doctora** ('My mother is a doctor')!"
  },
  "pattern": {
    "title": "When Does 'Un / Una' Come Back? When You Add an Adjective!",
    "content": "The moment you add a descriptive adjective to evaluate the person ('She is a **very good** doctor', 'He is an **excellent** teacher'), **un / una** comes right back: **Ella es una doctora muy buena**, **Él es un buen profesor**!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am a teacher (bare profession: no un!)",
          "german": "soy profesor"
        },
        {
          "id": "p2",
          "english": "my mother is a doctor (bare profession: no una!)",
          "german": "mi madre es doctora"
        },
        {
          "id": "p3",
          "english": "he is a very good teacher (modified: un returns!)",
          "german": "es un profesor muy bueno"
        },
        {
          "id": "p4",
          "english": "are you a student / teacher?",
          "german": "¿eres profesor?"
        },
        {
          "id": "p5",
          "english": "at the university",
          "german": "en la universidad"
        }
      ],
      "target_answer": "soy profesor, mi madre es doctora, es un profesor muy bueno, ¿eres profesor?, en la universidad",
      "meaning": "I am a teacher (bare profession: no un!), my mother is a doctor (bare profession: no una!), he is a very good teacher (modified: un returns!), are you a student / teacher?, at the university",
      "explanation": "Bare profession after ser = no un/una; profession + adjective = include un/una!",
      "id": "es5141_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'My father is a teacher at the university' in natural Spanish?",
      "options": [
        "Mi padre es profesor en la universidad",
        "*Mi padre está profesor en la universidad",
        "*Mi padre es un profesor en la universidad"
      ],
      "target_answer": "Mi padre es profesor en la universidad",
      "meaning": "My father is a teacher at the university",
      "explanation": "Professions are identity (ser → es) and omit un/una when unmodified!",
      "id": "es5141_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am a teacher at the university'",
      "target_answer": "Soy profesor en la universidad",
      "meaning": "I am a teacher at the university",
      "word_bank": [
        "universidad",
        "Estoy",
        "un",
        "Soy",
        "en",
        "el",
        "profesor",
        "la"
      ],
      "explanation": "Soy + profesor (no un!) + en la universidad.",
      "id": "es5141_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that she is a very good doctor ('Ella es una doctora muy buena' — with 'una' because of 'muy buena'!)",
      "cues": [
        "She is → Ella es",
        "a doctor (una returns because of the adjective!) → una doctora",
        "very good → muy buena"
      ],
      "idea_parts": [
        "She is a doctor → Ella es una doctora",
        "very good → muy buena"
      ],
      "target_answer": "Ella es una doctora muy buena",
      "meaning": "She is a very good doctor",
      "word_bank": [
        "muy",
        "buena",
        "es",
        "un",
        "bueno",
        "doctora",
        "una",
        "Ella",
        "está"
      ],
      "explanation": "Ella es una doctora muy buena — adding muy buena brings back una!",
      "id": "es5141_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Mi hermano es profesor en Madrid",
      "replays": 2,
      "target_answer": "Mi hermano es profesor en Madrid",
      "meaning": "My brother is a teacher in Madrid",
      "cues": [
        "My brother is: Mi hermano es",
        "a teacher (no un): profesor",
        "in Madrid: en Madrid"
      ],
      "explanation": "Mi hermano es profesor en Madrid.",
      "affirmation": "Profession rule (no un/una!) mastered!",
      "id": "es5141_e5"
    }
  ],
  "summary": {
    "outcome": "State professions with ser without un/una, and restore un/una when a descriptive adjective is added.",
    "use_example": {
      "german": "Soy profesor en la universidad y mi madre es una doctora muy buena.",
      "english": "I am a teacher at the university and my mother is a very good doctor."
    },
    "takeaway": "Soy profesor (bare identity = no un) vs Es un profesor excelente (with adjective = un returns).",
    "curiosity_teaser": "Up next ([5142] La Música, El Cine & Los Libros): talk about cultural passions with gustar and encantar!"
  },
  "twist": {
    "prompt": "Assemble: 'Are you a teacher?'",
    "target_answer": "Eres profesor",
    "word_bank": [
      "Soy",
      "un",
      "Eres",
      "Estás",
      "profesor"
    ],
    "explanation": "¿Eres profesor?"
  }
};

export default lesson;
