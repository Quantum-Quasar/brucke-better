import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 11,
  "slug": "adjectives-and-silent-s",
  "title": "Adjectives & the Silent -s",
  "subtitle": "Feminine -e wakes the sleeping final consonant (grand → grande), plural -s stays silent, and colors follow the noun",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "grand",
    "petit",
    "bon",
    "vert",
    "blanc",
    "bleu",
    "rouge",
    "noir",
    "jaune",
    "jardin"
  ],
  "table_word_ids": [
    "grand",
    "petit",
    "bon",
    "vert",
    "blanc",
    "bleu",
    "rouge",
    "noir",
    "jaune",
    "jardin"
  ],
  "hook": {
    "title": "Why the Masculine Form Sounds Shorter Than the Feminine",
    "content": "Listen to grand ('big/tall'): in the masculine, the final d is completely silent (/ɡʁɑ̃/). Now add the feminine -e for a feminine noun like la maison: grande (/ɡʁɑ̃d/). That silent -e acts like a shield that protects the d from disappearing, waking the consonant back up! The exact same thing happens across French adjectives: petit (/pəti/) → petite (/pətit/), vert (/vɛʁ/) → verte (/vɛʁt/), content (/kɔ̃tɑ̃/) → contente (/kɔ̃tɑ̃t/).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why English borrowed 'petite' with the T pronounced",
        "content": "English borrowed the feminine form petite for clothing sizes, which is why English speakers pronounce the final T — whereas French masculine petit drops the T completely!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Paint the Object First, Then Color It",
    "content": "In English you say 'the green garden' or 'a black coffee' — adjective before noun. In French, descriptive adjectives (especially colors, shapes, and nationalities) come AFTER the noun: le jardin vert ('the garden green'), un café noir ('a coffee black'), la maison blanche ('the house white'). First you name what the thing is; then you paint it. And in the plural, French writes an -s on both noun and adjective (les jardins verts), but that plural -s is completely silent!",
    "linguist_note": "Post-nominal adjective placement is the Romance default; only a small high-frequency set of short evaluative adjectives (BAGS, Sprig 1103) precedes the noun.",
    "trap_note": "The shortcut your mind will offer: putting color adjectives before the noun English-style (*le vert jardin). Name the noun first, then paint it: le jardin vert!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each masculine adjective (silent final consonant) with its feminine form (awakened consonant):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "grand /ɡʁɑ̃/ (big, m.)",
          "german": "grande /ɡʁɑ̃d/ (f.)"
        },
        {
          "id": "p2",
          "english": "petit /pəti/ (small, m.)",
          "german": "petite /pətit/ (f.)"
        },
        {
          "id": "p3",
          "english": "vert /vɛʁ/ (green, m.)",
          "german": "verte /vɛʁt/ (f.)"
        },
        {
          "id": "p4",
          "english": "blanc /blɑ̃/ (white, m.)",
          "german": "blanche /blɑ̃ʃ/ (f.)"
        },
        {
          "id": "p5",
          "english": "bon /bɔ̃/ (good, m.)",
          "german": "bonne /bɔn/ (f.)"
        }
      ],
      "target_answer": "grande /ɡʁɑ̃d/ (f.), petite /pətit/ (f.), verte /vɛʁt/ (f.), blanche /blɑ̃ʃ/ (f.), bonne /bɔn/ (f.)",
      "meaning": "grand /ɡʁɑ̃/ (big, m.), petit /pəti/ (small, m.), vert /vɛʁ/ (green, m.), blanc /blɑ̃/ (white, m.), bon /bɔ̃/ (good, m.)",
      "explanation": "Adding feminine -e wakes up the final d, t, or n (and turns blanc into blanche).",
      "id": "fr11_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word French order of 'Le jardin vert'?",
      "german": "Le jardin vert",
      "natural": "The green garden",
      "options": [
        "Green the garden",
        "The green garden",
        "The garden green"
      ],
      "target_answer": "The garden green",
      "meaning": "Literal structure: The garden green",
      "explanation": "French names the object first (le jardin) and paints its color second (vert).",
      "id": "fr11_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The white house is big'",
      "target_answer": "La maison blanche est grande",
      "meaning": "The white house is big",
      "word_bank": [
        "blanche",
        "grand",
        "blanc",
        "maison",
        "est",
        "La",
        "grande"
      ],
      "explanation": "la maison takes feminine blanche right after the noun, and feminine grande after est.",
      "id": "fr11_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want a black coffee please",
      "cues": [
        "I want a coffee black → Je veux un café noir",
        "please (polite) → s'il vous plaît"
      ],
      "idea_parts": [
        "want + noun + color → Je veux un café noir",
        "politeness tag → s'il vous plaît"
      ],
      "target_answer": "Je veux un café noir, s'il vous plaît",
      "meaning": "I want a black coffee, please",
      "word_bank": [
        "Je",
        "s'il",
        "plaît",
        "café",
        "noir",
        "noire",
        "un",
        "vous",
        "veux",
        "la"
      ],
      "explanation": "noir follows café because color adjectives sit after the noun.",
      "diagnosis": {
        "slip": "put noir before café",
        "cue": "Place color adjectives after the noun: un café noir."
      },
      "id": "fr11_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le jardin est vert et la maison est blanche",
      "replays": 2,
      "target_answer": "Le jardin est vert et la maison est blanche",
      "meaning": "The garden is green and the house is white",
      "cues": [
        "masculine clause: Le jardin est vert",
        "feminine clause: et la maison est blanche"
      ],
      "explanation": "vert has a silent t; blanche wakes up as /ʃ/.",
      "affirmation": "You contrasted masculine vert and feminine blanche cleanly.",
      "id": "fr11_e5"
    }
  ],
  "summary": {
    "outcome": "Agree adjectives in gender and number, hear the consonant awakened by feminine -e, and place colors after the noun.",
    "use_example": {
      "german": "Un café noir à la table rouge.",
      "english": "A black coffee at the red table."
    },
    "takeaway": "Feminine -e wakes the sleeping final consonant, and colors always paint the noun from behind.",
    "curiosity_teaser": "Up next on Le Pont ([1101] The e and the s): see how Adjectives & the Silent -s leads directly into The e and the s."
  },
  "twist": {
    "prompt": "Ungraded — 'The red table is small':",
    "target_answer": "La table rouge est petite",
    "word_bank": [
      "est",
      "Le",
      "rouge",
      "petit",
      "La",
      "table",
      "petite"
    ],
    "explanation": "rouge already ends in -e in both genders; petite adds -e to agree with la table."
  },
  "foreshadow": {
    "line": "Having mastered Adjectives & the Silent -s, look ahead to Topic 12 (The Near Future), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 12
  },
  "payoff": {
    "ofLesson": 10,
    "text": "The foundation from Topic 10 (avoir & the H It Lost) now pays off directly inside Adjectives & the Silent -s: every sentence here builds on that earlier step."
  }
};

export default lesson;
