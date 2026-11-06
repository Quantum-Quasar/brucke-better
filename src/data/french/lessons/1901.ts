import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1901,
  "slug": "lesson-1901",
  "title": "Was & Was-Ing",
  "subtitle": "The -ais/-ait imparfait camera lens: c'était, il y avait, j'avais, je voulais.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "était",
    "avais",
    "habitais",
    "voulais",
    "cest",
    "il_y_a",
    "très",
    "bon"
  ],
  "table_word_ids": [
    "était",
    "avais",
    "habitais",
    "voulais",
    "cest",
    "il_y_a",
    "très",
    "bon"
  ],
  "hook": {
    "title": "Painting the Past Background with c'était and il y avait",
    "content": "Two phrases do half the work of storytelling in French: c'était ('it was', the imparfait of c'est) and il y avait ('there was / there were', the imparfait of il y a)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How c'est → c'était and il y a → il y avait follow the exact same -ait rule",
        "content": "c'est ('it is') becomes c'était ('it was'), and il y a ('there is/are') replaces a with avait: il y avait ('there was/were')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Present Pointer → Imparfait Pointer: c'est → c'était, il y a → il y avait",
    "content": "Use c'était for past evaluations and il y avait for what was on the scene.",
    "linguist_note": "Imperfective aspect on copular and existential constructions marks unbounded background states.",
    "trap_note": "Never use *il a eu for 'there was' — simply turn the a of il y a into avait: il y avait!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each present-tense expression with its imparfait ('was/were') counterpart:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "c'est bon (it is good)",
          "german": "c'était bon (it was good)"
        },
        {
          "id": "p2",
          "english": "il y a un café (there is a café)",
          "german": "il y avait un café (there was a café)"
        },
        {
          "id": "p3",
          "english": "j'ai le temps (I have time)",
          "german": "j'avais le temps (I had time)"
        },
        {
          "id": "p4",
          "english": "je veux partir (I want to leave)",
          "german": "je voulais partir (I wanted to leave)"
        },
        {
          "id": "p5",
          "english": "j'habite ici (I live here)",
          "german": "j'habitais ici (I used to live here)"
        }
      ],
      "target_answer": "c'était bon (it was good), il y avait un café (there was a café), j'avais le temps (I had time), je voulais partir (I wanted to leave), j'habitais ici (I used to live here)",
      "meaning": "c'est bon (it is good), il y a un café (there is a café), j'ai le temps (I have time), je veux partir (I want to leave), j'habite ici (I live here)",
      "explanation": "Every singular imparfait form ends in -ais or -ait (/ɛ/).",
      "id": "fr1901_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'There was a small restaurant here'?",
      "options": [
        "Il y avait un petit restaurant ici",
        "Il y a eu un petit restaurant ici",
        "C'était un petit restaurant ici"
      ],
      "target_answer": "Il y avait un petit restaurant ici",
      "meaning": "There was a small restaurant here",
      "explanation": "il y a becomes il y avait in the imparfait.",
      "id": "fr1901_e2"
    },
    {
      "type": "derive",
      "prompt": "Shift 'Ce n'est pas possible' ('It is not possible') into the imparfait ('It was not possible'):",
      "english_hint": "n'est pas → n'était pas",
      "target_answer": "Ce n'était pas possible",
      "meaning": "It was not possible",
      "explanation": "Ce n'était pas possible.",
      "id": "fr1901_e3"
    },
    {
      "id": "fr1901_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question in the passé composé:",
      "spoken_question": "Qu'est-ce que tu as préparé hier ?",
      "question_meaning": "What did you prepare yesterday?",
      "reply_idea": "Reply that you prepared the coffee.",
      "cues": [
        "Start with J'ai préparé...",
        "Finish with le café."
      ],
      "word_bank": [
        "J'ai",
        "le",
        "hier",
        "préparé",
        "suis",
        "café"
      ],
      "target_answer": "J'ai préparé le café",
      "meaning": "I prepared the coffee",
      "explanation": "The auxiliary ai plus the past participle préparé answers the passé composé question directly."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quand j'étais jeune, j'habitais dans cette ville",
      "replays": 2,
      "target_answer": "Quand j'étais jeune, j'habitais dans cette ville",
      "meaning": "When I was young, I lived in this town",
      "cues": [
        "Quand j'étais jeune",
        "j'habitais dans cette ville"
      ],
      "explanation": "étais and habitais both carry the -ais background ending.",
      "affirmation": "You paired j'étais and j'habitais cleanly.",
      "id": "fr1901_e5"
    }
  ],
  "summary": {
    "outcome": "Set past scenes and descriptions using c'était, il y avait, j'étais, j'avais, and j'habitais.",
    "use_example": {
      "german": "C'était une belle soirée et il y avait un bon concert.",
      "english": "It was a lovely evening and there was a good concert."
    },
    "takeaway": "c'est → c'était ('it was'); il y a → il y avait ('there was/were').",
    "curiosity_teaser": "Up next on Le Pont ([1902] Imparfait vs Composé): see how Was & Was-Ing leads directly into Imparfait vs Composé."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"When I was young, I lived in this town\" in French:",
    "target_answer": "Quand j'étais jeune, j'habitais dans cette ville",
    "word_bank": [
      "Quand",
      "j'étais",
      "ville",
      "cette",
      "jeune",
      "ne",
      "pas",
      "j'habitais",
      "dans"
    ],
    "explanation": "Re-constructing \"Quand j'étais jeune, j'habitais dans cette ville\" from the underlying rule cements the pattern of Was & Was-Ing."
  }
};

export default lesson;
