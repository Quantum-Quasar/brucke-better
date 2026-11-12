import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5081,
  "slug": "de-la-manana-a-la-noche",
  "title": "De la mañana a la noche",
  "subtitle": "Chaining reflexives (me levanto, me lavo, me acuesto) and time markers across a realistic day",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "levantarse",
    "acostarse",
    "dormir",
    "empezar",
    "mañana",
    "noche",
    "siete",
    "ocho",
    "diez",
    "me"
  ],
  "table_word_ids": [
    "levantarse",
    "acostarse",
    "dormir",
    "empezar",
    "mañana",
    "noche",
    "siete",
    "ocho",
    "diez",
    "me"
  ],
  "hook": {
    "title": "A Full Day in Spanish",
    "content": "Watch how reflexive verbs and stem-changing boot verbs work together across your daily routine:\n• **Por la mañana me levanto a las siete** ('In the morning I get up at seven').\n• **Empiezo a trabajar / estudiar a las nueve** ('I start working/studying at nine' — notice **empezar a + infinitive**!).\n• **Por la noche me acuesto a las diez y duermo ocho horas** ('At night I go to bed at ten and sleep eight hours')!"
  },
  "pattern": {
    "title": "Why 'Empezar' Always Takes 'a' Before an Infinitive",
    "content": "Just like ir a ('going to'), verbs of beginning like **empezar** ('to start/begin', e→ie boot verb: yo empiezo) always use the forward arrow **a** before a following infinitive: **Empiezo a comprender** ('I'm starting to understand'), **Empieza a hablar** ('He starts speaking')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I get up at seven",
          "german": "me levanto a las siete"
        },
        {
          "id": "p2",
          "english": "I go to bed (o→ue)",
          "german": "me acuesto"
        },
        {
          "id": "p3",
          "english": "I sleep eight hours (o→ue)",
          "german": "duermo ocho horas"
        },
        {
          "id": "p4",
          "english": "I start to understand (e→ie + a!)",
          "german": "empiezo a comprender"
        },
        {
          "id": "p5",
          "english": "in the morning / at night",
          "german": "por la mañana / por la noche"
        }
      ],
      "target_answer": "me levanto a las siete, me acuesto, duermo ocho horas, empiezo a comprender, por la mañana / por la noche",
      "meaning": "I get up at seven, I go to bed (o→ue), I sleep eight hours (o→ue), I start to understand (e→ie + a!), in the morning / at night",
      "explanation": "Reflexives (me levanto, me acuesto) and boot verbs (empiezo, duermo) carry the daily routine.",
      "id": "es5081_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which preposition must link 'empezar' ('to start/begin') to a following infinitive verb?",
      "options": [
        "a (Empiezo a hablar)",
        "de (*Empiezo de hablar)",
        "nothing (*Empiezo hablar)"
      ],
      "target_answer": "a (Empiezo a hablar)",
      "meaning": "I start to speak",
      "explanation": "Verbs of motion and beginning (ir a, empezar a) always take the forward arrow a before an infinitive!",
      "id": "es5081_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'In the morning I get up at seven'",
      "target_answer": "Por la mañana me levanto a las siete",
      "meaning": "In the morning I get up at seven",
      "word_bank": [
        "mañana",
        "Para",
        "me",
        "a",
        "siete",
        "te",
        "las",
        "la",
        "levanto",
        "noche",
        "Por"
      ],
      "explanation": "Por la mañana + me levanto + a las siete.",
      "id": "es5081_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you are starting to understand Spanish ('Empiezo a comprender el español')",
      "cues": [
        "I start (empezar: e→ie) → Empiezo",
        "to (connector after empezar) → a",
        "understand Spanish → comprender el español"
      ],
      "idea_parts": [
        "I start to → Empiezo a",
        "understand Spanish → comprender el español"
      ],
      "target_answer": "Empiezo a comprender el español",
      "meaning": "I am starting to understand Spanish",
      "word_bank": [
        "el",
        "Empiezo",
        "comprender",
        "de",
        "español",
        "a",
        "la",
        "Empezar"
      ],
      "explanation": "Empiezo a comprender el español.",
      "id": "es5081_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Por la noche me acuesto a las diez",
      "replays": 2,
      "target_answer": "Por la noche me acuesto a las diez",
      "meaning": "At night I go to bed at ten",
      "cues": [
        "At night: Por la noche",
        "I go to bed: me acuesto",
        "at ten: a las diez"
      ],
      "explanation": "Por la noche me acuesto a las diez.",
      "affirmation": "Full daily routine mastered!",
      "id": "es5081_e5"
    }
  ],
  "summary": {
    "outcome": "Chain reflexive verbs (me levanto, me acuesto), empezar a + infinitive, and time expressions across a day.",
    "use_example": {
      "german": "Por la mañana me levanto a las siete y por la noche me acuesto a las diez.",
      "english": "In the morning I get up at seven and at night I go to bed at ten."
    },
    "takeaway": "empezar (e→ie) always takes 'a' before a following infinitive: Empiezo a comprender.",
    "curiosity_teaser": "Up next ([5082] De la Tarde a la Noche): stamp the reflexive day with por la mañana and por la noche!"
  },
  "twist": {
    "prompt": "Assemble: 'I start to eat at eight'",
    "target_answer": "Empiezo a comer a las ocho",
    "word_bank": [
      "Empiezo",
      "comer",
      "de",
      "ocho",
      "a",
      "duermo",
      "las",
      "Empezar",
      "a"
    ],
    "explanation": "Empiezo a comer a las ocho."
  }
};

export default lesson;
