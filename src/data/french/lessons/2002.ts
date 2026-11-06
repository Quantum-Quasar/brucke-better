import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2002,
  "slug": "lesson-2002",
  "title": "Since & For Gym",
  "subtitle": "depuis quand ? — building duration sentences across work, study, and residence.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "depuis",
    "quand",
    "combien",
    "habiter",
    "attendre",
    "parler",
    "ans",
    "minute"
  ],
  "table_word_ids": [
    "depuis",
    "quand",
    "combien",
    "habiter",
    "attendre",
    "parler",
    "ans",
    "minute"
  ],
  "hook": {
    "title": "Asking How Long: Depuis quand ? and Depuis combien de temps ?",
    "content": "To ask 'How long have you lived here?' or 'Since when have you been waiting?', put the verb in the present tense and add Depuis quand ? ('Since when?') or Depuis combien de temps ? ('For how long?')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why combien always takes bare de before a noun",
        "content": "Just like un peu de and beaucoup de, combien ('how much/many') always links to its noun with bare de: combien de temps!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Present Tense + depuis quand ? / depuis combien de temps ?",
    "content": "Ask and answer duration questions in pairs.",
    "linguist_note": "Interrogative extraction of temporal duration preserves present-tense marking on the main verb.",
    "trap_note": "Don't ask *Combien longtemps — 'how long' for time duration is always Depuis quand ? or Depuis combien de temps ?!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each duration question or answer with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Depuis quand est-ce que tu es ici ?",
          "german": "Since when / How long have you been here?"
        },
        {
          "id": "p2",
          "english": "Depuis combien de temps tu attends ?",
          "german": "How long have you been waiting?"
        },
        {
          "id": "p3",
          "english": "Depuis une heure",
          "german": "For an hour (and still ongoing)"
        },
        {
          "id": "p4",
          "english": "Depuis mardi",
          "german": "Since Tuesday"
        }
      ],
      "target_answer": "Since when / How long have you been here?, How long have you been waiting?, For an hour (and still ongoing), Since Tuesday",
      "meaning": "Depuis quand est-ce que tu es ici ?, Depuis combien de temps tu attends ?, Depuis une heure, Depuis mardi",
      "explanation": "Both Depuis quand and Depuis combien de temps take the present tense.",
      "id": "fr2002_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you ask a friend 'How long have you been living in Paris?'",
      "options": [
        "Tu habites à Paris depuis quand",
        "Tu as habité à Paris depuis quand",
        "Combien longtemps tu habites à Paris"
      ],
      "target_answer": "Tu habites à Paris depuis quand",
      "meaning": "You live in Paris since when?",
      "explanation": "Present tense Tu habites + depuis quand.",
      "id": "fr2002_e2"
    },
    {
      "type": "derive",
      "prompt": "Answer 'Tu attends depuis quand ?' with 'For five minutes' (using Depuis...):",
      "english_hint": "Depuis + cinq minutes",
      "target_answer": "Depuis cinq minutes",
      "meaning": "For five minutes",
      "explanation": "Depuis cinq minutes.",
      "id": "fr2002_e3"
    },
    {
      "id": "fr2002_e4",
      "type": "pronoun_compression",
      "prompt": "Fold the indirect receiver into the French dative pronoun:",
      "shift_hint": "lui / leur before the verb",
      "full_sentence": "Marie parle au docteur ce matin",
      "compressed_parts": [
        {
          "noun": "Marie",
          "pronoun": "Elle",
          "role": "subject"
        },
        {
          "noun": "au docteur",
          "pronoun": "lui",
          "role": "indirect receiver"
        }
      ],
      "word_bank": [
        "parle",
        "leur",
        "lui",
        "docteur",
        "le",
        "Elle"
      ],
      "target_answer": "Elle lui parle",
      "meaning": "She speaks to him",
      "explanation": "Both masculine and feminine singular receivers fold into a single pre-verbal indirect pronoun: lui."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vous habitez dans cette ville depuis combien de temps",
      "replays": 2,
      "target_answer": "Vous habitez dans cette ville depuis combien de temps",
      "meaning": "How long have you lived in this city?",
      "cues": [
        "Vous habitez dans cette ville",
        "depuis combien de temps"
      ],
      "explanation": "depuis combien de temps = 'for how long'.",
      "affirmation": "You wrote Vous habitez and depuis combien de temps cleanly.",
      "id": "fr2002_e5"
    }
  ],
  "summary": {
    "outcome": "Ask and answer 'How long / Since when?' questions using Present Tense + depuis quand / depuis combien de temps.",
    "use_example": {
      "german": "Tu apprends le français depuis quand ? — Depuis ce matin !",
      "english": "How long have you been learning French? — Since this morning!"
    },
    "takeaway": "'How long have you...?' is Present Tense + depuis quand ?",
    "curiosity_teaser": "Up next on Le Pont ([21] Plus, Moins, aussi): see how Since & For Gym leads directly into Plus, Moins, aussi."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"How long have you lived in this city\" in French:",
    "target_answer": "Vous habitez dans cette ville depuis combien de temps",
    "word_bank": [
      "ville",
      "temps",
      "ne",
      "dans",
      "de",
      "depuis",
      "habitez",
      "pas",
      "combien",
      "cette",
      "Vous"
    ],
    "explanation": "Re-constructing \"Vous habitez dans cette ville depuis combien de temps\" from the underlying rule cements the pattern of Since & For Gym."
  }
};

export default lesson;
