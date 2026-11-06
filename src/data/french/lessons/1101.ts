import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1101,
  "slug": "sprig-1101",
  "title": "The e and the s",
  "subtitle": "Feminine -e wakes the sleeping final consonant (grand → grande); plural -s stays silent.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "grand",
    "petit",
    "vert",
    "blanc",
    "content",
    "bon",
    "maison",
    "jardin"
  ],
  "table_word_ids": [
    "grand",
    "petit",
    "vert",
    "blanc",
    "content",
    "bon",
    "maison",
    "jardin"
  ],
  "hook": {
    "title": "The Consonant That Sleeps in the Masculine and Wakes in the Feminine",
    "content": "Adding feminine -e wakes up the sleeping final consonant of the masculine adjective: grand (/ɡʁɑ̃/) → grande (/ɡʁɑ̃d/), petit (/pəti/) → petite (/pətit/), vert (/vɛʁ/) → verte (/vɛʁt/), content (/kɔ̃tɑ̃/) → contente (/kɔ̃tɑ̃t/), blanc (/blɑ̃/) → blanche (/blɑ̃ʃ/). Meanwhile, plural -s stays 100% silent!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Four Written Forms, Only Two Spoken Sounds",
        "content": "Across grand, grands, grande, grandes, singular and plural sound identical in each gender (/ɡʁɑ̃/ for masculine, /ɡʁɑ̃d/ for feminine)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Feminine -e Wakes the Consonant; Plural -s Stays Silent",
    "content": "Match adjective endings to the noun's gender and number.",
    "linguist_note": "Plural -s in French nouns and adjectives is purely orthographic except in prevocalic liaison.",
    "trap_note": "Don't pronounce the final -s on plural adjectives like grands or petites!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each masculine adjective with its feminine twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il est grand (/ɡʁɑ̃/)",
          "german": "Elle est grande (/ɡʁɑ̃d/)"
        },
        {
          "id": "p2",
          "english": "Il est petit (/pəti/)",
          "german": "Elle est petite (/pətit/)"
        },
        {
          "id": "p3",
          "english": "Il est content (/kɔ̃tɑ̃/)",
          "german": "Elle est contente (/kɔ̃tɑ̃t/)"
        },
        {
          "id": "p4",
          "english": "Le jardin est vert (/vɛʁ/)",
          "german": "La table est verte (/vɛʁt/)"
        },
        {
          "id": "p5",
          "english": "Le mur est blanc (/blɑ̃/)",
          "german": "La maison est blanche (/blɑ̃ʃ/)"
        }
      ],
      "target_answer": "Elle est grande (/ɡʁɑ̃d/), Elle est petite (/pətit/), Elle est contente (/kɔ̃tɑ̃t/), La table est verte (/vɛʁt/), La maison est blanche (/blɑ̃ʃ/)",
      "meaning": "Il est grand (/ɡʁɑ̃/), Il est petit (/pəti/), Il est content (/kɔ̃tɑ̃/), Le jardin est vert (/vɛʁ/), Le mur est blanc (/blɑ̃/)",
      "explanation": "Feminine -e wakes the d, t, or turns -c into -che.",
      "id": "fr1101_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How many different pronunciations exist across the four written forms 'petit, petits, petite, petites'?",
      "options": [
        "Two (/pəti/ for m.sg/pl, and /pətit/ for f.sg/pl)",
        "Four (every form sounds different)",
        "One (all four sound identical)"
      ],
      "target_answer": "Two (/pəti/ for m.sg/pl, and /pətit/ for f.sg/pl)",
      "meaning": "Plural -s is silent, so singular and plural sound identical in each gender!",
      "explanation": "Only the feminine -e changes the pronunciation.",
      "id": "fr1101_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the feminine singular of 'blanc' ('white') to describe 'la maison':",
      "english_hint": "blanc → blan...",
      "target_answer": "blanche",
      "meaning": "white (feminine)",
      "explanation": "La maison blanche (/blɑ̃ʃ/).",
      "id": "fr1101_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "she is very happy and he is very tall",
      "cues": [
        "She is very happy → Elle est très contente",
        "and he is very tall → et il est très grand"
      ],
      "idea_parts": [
        "feminine clause → Elle est très contente",
        "masculine clause → et il est très grand"
      ],
      "target_answer": "Elle est très contente et il est très grand",
      "meaning": "She is very happy and he is very tall",
      "word_bank": [
        "et",
        "Elle",
        "content",
        "est",
        "grand",
        "est",
        "contente",
        "très",
        "très",
        "grande",
        "il"
      ],
      "explanation": "Elle takes feminine contente; il takes masculine grand.",
      "diagnosis": {
        "slip": "swapped gender endings",
        "cue": "Match contente to Elle and grand to il."
      },
      "id": "fr1101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Les maisons blanches sont très grandes",
      "replays": 2,
      "target_answer": "Les maisons blanches sont très grandes",
      "meaning": "The white houses are very big",
      "cues": [
        "Les maisons blanches",
        "sont très grandes"
      ],
      "explanation": "Both blanches and grandes carry feminine -e plus plural -s.",
      "affirmation": "You wrote both feminine plural endings (-es) on blanches and grandes!",
      "id": "fr1101_e5"
    }
  ],
  "summary": {
    "outcome": "Produce masculine, feminine, and plural adjective forms while keeping plural -s silent.",
    "use_example": {
      "german": "Les jardins sont verts et les maisons sont blanches.",
      "english": "The gardens are green and the houses are white."
    },
    "takeaway": "Four written forms (grand, grands, grande, grandes), only two spoken sounds (/ɡʁɑ̃/ and /ɡʁɑ̃d/).",
    "curiosity_teaser": "Up next on Le Pont ([1102] Color & Size Gym): see how The e and the s leads directly into Color & Size Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"She is very happy and he is very tall\" in French:",
    "target_answer": "Elle est très contente et il est très grand",
    "word_bank": [
      "pas",
      "est",
      "Elle",
      "ne",
      "et",
      "très",
      "est",
      "contente",
      "très",
      "grand",
      "il"
    ],
    "explanation": "Re-constructing \"Elle est très contente et il est très grand\" from the underlying rule cements the pattern of The e and the s."
  }
};

export default lesson;
