import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 702,
  "slug": "por-que-vs-porque",
  "title": "por qué vs porque",
  "subtitle": "Asking why (por qué, two words accented) vs answering because (porque, one word)",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "por_qué",
    "porque",
    "querer",
    "comprender",
    "no",
    "importante",
    "posible"
  ],
  "table_word_ids": [
    "por_qué",
    "porque",
    "querer",
    "comprender",
    "no",
    "importante",
    "posible"
  ],
  "hook": {
    "title": "A Space and an Accent Mark",
    "content": "In speech, ¿por qué? ('why?') throws the vocal stress onto the final qué (/poɾ ˈke/), while porque ('because') stresses the first syllable (/ˈpoɾke/). In writing, that difference is captured by the space and the acute accent!"
  },
  "pattern": {
    "title": "Asking and Answering in One Breath",
    "content": "¿Por qué quieres estudiar español? — Porque es muy importante. Notice how cleanly because (porque) introduces any clause."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "why? (question)",
          "german": "por qué"
        },
        {
          "id": "p2",
          "english": "because (answer)",
          "german": "porque"
        },
        {
          "id": "p3",
          "english": "I don't understand",
          "german": "no comprendo"
        },
        {
          "id": "p4",
          "english": "it is possible",
          "german": "es posible"
        },
        {
          "id": "p5",
          "english": "it is important",
          "german": "es importante"
        }
      ],
      "target_answer": "por qué, porque, no comprendo, es posible, es importante",
      "meaning": "why? (question), because (answer), I don't understand, it is possible, it is important",
      "explanation": "por qué (2 words + tilde) = why; porque (1 word, no tilde) = because.",
      "id": "es702_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Fill in the question and answer: '¿___ no vas? — ___ no puedo.'",
      "options": [
        "Por que / Porqué",
        "Por qué / Porque",
        "Porque / Por qué"
      ],
      "target_answer": "Por qué / Porque",
      "meaning": "Why aren't you going? — Because I can't.",
      "explanation": "Question uses two words with an accent (Por qué); answer uses one word (Porque).",
      "id": "es702_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Why don't you want the coffee?'",
      "target_answer": "Por qué no quieres el café",
      "meaning": "Why don't you want the coffee?",
      "word_bank": [
        "Porque",
        "qué",
        "el",
        "café",
        "Por",
        "no",
        "quieres",
        "la",
        "quiero"
      ],
      "explanation": "¿Por qué + no + quieres + el café?",
      "id": "es702_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "answer: 'Because I want to confirm'",
      "cues": [
        "Because (one word) → Porque",
        "I want → quiero",
        "to confirm → confirmar"
      ],
      "idea_parts": [
        "Because → Porque",
        "I want to confirm → quiero confirmar"
      ],
      "target_answer": "Porque quiero confirmar",
      "meaning": "Because I want to confirm",
      "word_bank": [
        "Porque",
        "quiero",
        "confirmación",
        "confirmar",
        "qué",
        "Por"
      ],
      "explanation": "Porque quiero confirmar — one word for 'because' + stacked verb.",
      "id": "es702_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Porque no es posible",
      "replays": 2,
      "target_answer": "Porque no es posible",
      "meaning": "Because it is not possible",
      "cues": [
        "Because: Porque",
        "it is not: no es",
        "possible: posible"
      ],
      "explanation": "Porque no es posible — clean negative explanation.",
      "affirmation": "Spot on with porque and no es!",
      "id": "es702_e5"
    }
  ],
  "summary": {
    "outcome": "Ask 'why?' with ¿por qué? and answer 'because' with porque across positive and negative clauses.",
    "use_example": {
      "german": "¿Por qué no quieres ir? — Porque no es posible hoy.",
      "english": "Why don't you want to go? — Because it is not possible today."
    },
    "takeaway": "Two words with an accent ask the question (¿por qué?); one welded word gives the reason (porque).",
    "curiosity_teaser": "Up next ([8] The -ico & -al Bridges): cross the Decode Gate into Topic 8 and unlock ratusan of adjectives in -ico and -al!"
  },
  "twist": {
    "prompt": "Assemble: 'Why is it important?'",
    "target_answer": "Por qué es importante",
    "word_bank": [
      "Porque",
      "qué",
      "está",
      "es",
      "importante",
      "no",
      "Por"
    ],
    "explanation": "¿Por qué es importante? asks why with two words."
  }
};

export default lesson;
