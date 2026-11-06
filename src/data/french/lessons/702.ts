import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 702,
  "slug": "sprig-702",
  "title": "Question-Word Twins",
  "subtitle": "où ↔ ubiquitous, pourquoi ↔ wherefore, quand, comment, combien — the cognate question words.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "où",
    "pourquoi",
    "quand",
    "comment",
    "combien",
    "quel",
    "parce_que",
    "heure"
  ],
  "table_word_ids": [
    "où",
    "pourquoi",
    "quand",
    "comment",
    "combien",
    "quel",
    "parce_que",
    "heure"
  ],
  "hook": {
    "title": "Every Question Word Has an English Cousin",
    "content": "French's six question words all map to Latinate roots in English: où ('where' ↔ ubiquitous), quand ('when' ↔ quando), comment ('how' ↔ manner -ment), combien ('how much/many'), pourquoi ('why' ↔ wherefore), and quel/quelle ('which/what' ↔ quality)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why quel, quelle, quels, quelles all sound like /kɛl/",
        "content": "Even though quel agrees in writing with its noun (Quel train ? Quelle heure ?), all four forms sound 100% identical (/kɛl/)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Question Word + est-ce que, or Short Inversion (Quelle heure est-il ?)",
    "content": "Pair question words with est-ce que or short être inversions.",
    "linguist_note": "Interrogative determiner quel agrees in gender and number with its head noun.",
    "trap_note": "Don't forget the grave accent on où ('where') — without the accent, ou means 'or'!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French question word with its English cognate clue:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "où (where)",
          "german": "ubiquitous (Latin ubi)"
        },
        {
          "id": "p2",
          "english": "quel / quelle (which / what)",
          "german": "quality (Latin qualis)"
        },
        {
          "id": "p3",
          "english": "comment (how)",
          "german": "manner (-ment adverb)"
        },
        {
          "id": "p4",
          "english": "pourquoi (why)",
          "german": "wherefore (for-what)"
        },
        {
          "id": "p5",
          "english": "combien (how much / many)",
          "german": "how-well (com + bien)"
        }
      ],
      "target_answer": "ubiquitous (Latin ubi), quality (Latin qualis), manner (-ment adverb), wherefore (for-what), how-well (com + bien)",
      "meaning": "où (where), quel / quelle (which / what), comment (how), pourquoi (why), combien (how much / many)",
      "explanation": "Every French question word links back to a Latin root you already know.",
      "id": "fr702_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French où ('where', from Latin ubi) shares its root with which English adjective meaning 'present everywhere at once'?",
      "target_answer": "ubiquitous",
      "meaning": "ubiquitous ↔ où ('where')",
      "explanation": "Latin ubīque ('everywhere') gave English ubiquitous; Latin ubi gave French où.",
      "id": "fr702_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Because 'l'heure' ('the hour/time') is feminine, how do you write 'What time is it?'",
      "options": [
        "Quoi heure est-il",
        "Quel heure est-il",
        "Quelle heure est-il"
      ],
      "target_answer": "Quelle heure est-il",
      "meaning": "What time is it? (lit. Which hour is it?)",
      "explanation": "heure is feminine, so quel becomes Quelle heure.",
      "id": "fr702_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "when are you going to arrive (informal tu, using est-ce que)",
      "cues": [
        "When → Quand",
        "question machine → est-ce que",
        "you are going to arrive → tu vas arriver"
      ],
      "idea_parts": [
        "question word → Quand",
        "machine → est-ce que",
        "near future → tu vas arriver"
      ],
      "target_answer": "Quand est-ce que tu vas arriver",
      "meaning": "When are you going to arrive?",
      "word_bank": [
        "est-ce",
        "vas",
        "tu",
        "la",
        "Où",
        "arriver",
        "Quand",
        "que"
      ],
      "explanation": "Quand + est-ce que + tu vas arriver.",
      "diagnosis": {
        "slip": "used Où instead of Quand",
        "cue": "Use Quand for 'when'."
      },
      "id": "fr702_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Comment est-ce que tu vas à la gare",
      "replays": 2,
      "target_answer": "Comment est-ce que tu vas à la gare",
      "meaning": "How are you going to the station?",
      "cues": [
        "How: Comment est-ce que",
        "you go to the station: tu vas à la gare"
      ],
      "explanation": "Comment asks 'how / by what means'.",
      "affirmation": "You paired Comment with est-ce que cleanly.",
      "id": "fr702_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy où, quand, comment, combien, pourquoi, and quel/quelle across real questions.",
    "use_example": {
      "german": "Quelle heure est-il et quand est-ce qu'on part ?",
      "english": "What time is it and when are we leaving?"
    },
    "takeaway": "où = ubiquitous, quel = quality, pourquoi = wherefore.",
    "curiosity_teaser": "Up next on Le Pont ([8] The -eur Bridge): see how Question-Word Twins leads directly into The -eur Bridge."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"When are you going to arrive\" in French:",
    "target_answer": "Quand est-ce que tu vas arriver",
    "word_bank": [
      "vas",
      "que",
      "ne",
      "arriver",
      "tu",
      "est-ce",
      "pas",
      "Quand"
    ],
    "explanation": "Re-constructing \"Quand est-ce que tu vas arriver\" from the underlying rule cements the pattern of Question-Word Twins."
  }
};

export default lesson;
