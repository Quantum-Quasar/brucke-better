import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 201,
  "slug": "cion-always-feminine",
  "title": "-CIÓN Is Always Feminine",
  "subtitle": "la complicación, la pasión, la invitación — decoding grammatical gender straight from the suffix",
  "phase": 1,
  "shift_categories": [
    "cion"
  ],
  "word_ids": [
    "complicación",
    "pasión",
    "invitación",
    "situación",
    "atención",
    "decisión",
    "estación",
    "la",
    "no"
  ],
  "table_word_ids": [
    "complicación",
    "pasión",
    "invitación",
    "situación",
    "atención",
    "decisión",
    "estación",
    "la",
    "no"
  ],
  "hook": {
    "title": "Zero Gender Anxiety",
    "content": "Learners often dread memorizing whether each noun is masculine or feminine. With -ción and -sión, that anxiety vanishes: whether a word ends in -ción (la invitación, la situación, la atención, la estación) or -sión (la pasión, la decisión), it belongs to the feminine family."
  },
  "pattern": {
    "title": "Converting -tion and -sion in Real Sentences",
    "content": "Notice that Spanish simplifies double consonants like -ss- in 'passion' to a single s in la pasión, while keeping -cc- in la colección and la acción because each c makes a different sound (/k/ then /θ/ or /s/)!",
    "trap_note": "Never write double 'ss' in Spanish (*passión, *possible). Spanish always uses a single 's': pasión, posible."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the complication",
          "german": "la complicación"
        },
        {
          "id": "p2",
          "english": "the passion",
          "german": "la pasión"
        },
        {
          "id": "p3",
          "english": "the invitation",
          "german": "la invitación"
        },
        {
          "id": "p4",
          "english": "the situation",
          "german": "la situación"
        },
        {
          "id": "p5",
          "english": "the attention",
          "german": "la atención"
        },
        {
          "id": "p6",
          "english": "the decision",
          "german": "la decisión"
        }
      ],
      "target_answer": "la complicación, la pasión, la invitación, la situación, la atención, la decisión",
      "meaning": "the complication, the passion, the invitation, the situation, the attention, the decision",
      "explanation": "Every -ción and -sión noun takes la.",
      "id": "es201_e1"
    },
    {
      "type": "derive",
      "prompt": "Convert with its feminine article: 'the invitation' →",
      "english_hint": "invitation → -ción",
      "target_answer": "la invitación",
      "meaning": "the invitation",
      "explanation": "invitation → la invitación.",
      "id": "es201_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How does Spanish spell 'the passion' (remembering single s)?",
      "options": [
        "el pasión",
        "la pasión",
        "la passión"
      ],
      "target_answer": "la pasión",
      "meaning": "the passion",
      "explanation": "Spanish never doubles s: la pasión.",
      "id": "es201_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I don't want the complication'",
      "target_answer": "No quiero la complicación",
      "meaning": "I don't want the complication",
      "word_bank": [
        "el",
        "complicación",
        "No",
        "la",
        "pasión",
        "quiero",
        "lo"
      ],
      "explanation": "No + quiero + la complicación.",
      "id": "es201_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero la decisión",
      "replays": 2,
      "target_answer": "Quiero la decisión",
      "meaning": "I want the decision",
      "cues": [
        "I want: Quiero",
        "the (feminine): la",
        "decision: decisión"
      ],
      "explanation": "Quiero la decisión — -sión nouns follow the exact same feminine rule as -ción.",
      "affirmation": "Clean feminine article + -sión noun!",
      "id": "es201_e5"
    }
  ],
  "summary": {
    "outcome": "Decode grammatical gender for -ción and -sión nouns on sight and spell single-s cognates cleanly.",
    "use_example": {
      "german": "La situación es importante y quiero la decisión.",
      "english": "The situation is important and I want the decision."
    },
    "takeaway": "Both -ción and -sión are 100% feminine — and Spanish never doubles the letter s.",
    "curiosity_teaser": "Up next ([202] The Article Switch Gym): toggle rapidly between masculine el and feminine la."
  },
  "twist": {
    "prompt": "Assemble: 'I want the invitation'",
    "target_answer": "Quiero la invitación",
    "word_bank": [
      "Quiero",
      "No",
      "la",
      "invitación",
      "lo",
      "el"
    ],
    "explanation": "Quiero la invitación pairs quiero with the feminine -ción noun."
  }
};

export default lesson;
