import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2401,
  "slug": "twin-suppletions",
  "title": "Twin Suppletions",
  "subtitle": "gut/besser/hoch/höher vs good/better/high/higher — the shared irregular story",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "gut",
    "besser",
    "hoch",
    "mehr",
    "alt",
    "kalt"
  ],
  "table_word_ids": [
    "gut",
    "besser",
    "hoch",
    "mehr",
    "alt",
    "kalt",
    "schwager",
    "baby",
    "kopf",
    "ja",
    "senf",
    "frei",
    "baumwolle",
    "telefonnummer",
    "summe"
  ],
  "hook": {
    "title": "Irregular Together",
    "content": "Suppletion — replacing a missing form with a borrowed word — is the rarest grammar event, and English and German did the SAME rare events on the SAME verbs. good/better ↔ gut/besser: both replaced their comparative with a form of *bazizon. much/more ↔ viel/mehr: both borrowed *maizô. high/higher stayed native in both — hoch/höher with pure umlaut. The odds of coincidence are zero: these pairs were irregular together before the languages split, and both kept the irregulars because irregulars are frequency armor — the most-used words resist regularization longest.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Why Irregulars Survive",
        "content": "Regular verbs and adjectives regularize when they are rare — nobody says 'goed' for the verb they use hourly. Irregularity is protection by usage: the top-100 words keep their ancient forms because everyone hears them a thousand times a day. That is why the suppletive twins survived on BOTH shores."
      }
    ]
  },
  "pattern": {
    "title": "The Twin Pairs, Filed",
    "content": "Pair one: gut → besser ↔ good → better — the *bazizon loan, shifted per the laws (b stays, ss/tz reports T→SS/Z). Pair two: viel → mehr ↔ much → more — *maizô, with mehr's r intact. Pair three: hoch → höher ↔ high → higher — the gh→ch word with pure umlaut, no borrowing needed. Pair four — the failed pair: gut → best ↔ good → best (identical superlative!), and am besten ↔ the best. Also file: viel → am meisten ↔ the most (meist/most — another twin hiding in the superlative). Two borrowings, one umlaut, four twin pairs — the irregular hall is shared property.",
    "footnotes": [],
    "linguist_note": "besser's ss and better's tt both encode the same dental: T→SS/Z on the German side, and English's own old tt. The comparative was borrowed BEFORE the High German shift — so the shift applied to it like a native. Borrowed-then-shifted: the signature of ancient loans."
  },
  "exercises": [
    {
      "id": "l2401_e1",
      "type": "matching_pairs",
      "prompt": "The twin pairs — match the irregulars. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "ts1",
          "english": "better",
          "german": "besser"
        },
        {
          "id": "ts2",
          "english": "more",
          "german": "mehr"
        },
        {
          "id": "ts3",
          "english": "higher",
          "german": "höher"
        },
        {
          "id": "ts4",
          "english": "best",
          "german": "am besten"
        },
        {
          "id": "recall1",
          "german": "Das Haus ist hoch",
          "english": "The house is tall"
        },
        {
          "id": "recall1b",
          "german": "Ich bin langsam",
          "english": "I am slow"
        },
        {
          "id": "recall2",
          "german": "das Rad",
          "english": "the wheel"
        }
      ],
      "target_answer": "besser, mehr, höher, am besten, Das Haus ist hoch, Ich bin langsam, das Rad",
      "meaning": "better; more; higher; best; The house is tall; I am slow; the wheel",
      "explanation": "Two borrowed comparatives and one umlaut native — all shared across the sea."
    },
    {
      "id": "l2401_e2",
      "type": "shift_select",
      "prompt": "Why are gut/besser and good/better BOTH irregular?",
      "options": [
        "Pure chance",
        "English copied German",
        "Both replaced their comparative with the same ancient word (*bazizon) before they split",
        "German copied English"
      ],
      "target_answer": "Both replaced their comparative with the same ancient word (*bazizon) before they split",
      "meaning": "Shared suppletion, inherited together",
      "explanation": "The borrowing happened in Proto-Germanic — both languages inherited the irregularity, then shifted it independently."
    },
    {
      "id": "l2401_e3",
      "type": "shift_select",
      "prompt": "Which superlative twin hides in 'am meisten' (the most)?",
      "options": [
        "must ↔ meist",
        "more ↔ meist",
        "moist ↔ meist",
        "most ↔ meist"
      ],
      "target_answer": "most ↔ meist",
      "meaning": "viel → am meisten ↔ much → the most",
      "explanation": "meist and most are the same superlative — the mehr/more twin continues one rung up the ladder."
    },
    {
      "id": "l2401_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question using the comparative:",
      "spoken_question": "Ist das Wasser heute kalt?",
      "question_meaning": "Is the water cold today?",
      "reply_idea": "Reply: Yes, it is colder today.",
      "cues": [
        "Begin with Ja, es ist...",
        "Add heute and the umlauted comparative kälter."
      ],
      "word_bank": [
        "es",
        "Ja",
        "ist",
        "kälter",
        "kalt",
        "heute",
        "nein"
      ],
      "target_answer": "Ja es ist heute kälter",
      "meaning": "Yes, it is colder today",
      "explanation": "Short Germanic adjectives like kalt raise their vowel with an umlaut in the comparative: kalt → kälter."
    },
    {
      "id": "l2401_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'The book is better, but the film is the best':",
      "target_answer": "Das Buch ist besser aber der Film ist am besten",
      "meaning": "The book is better, but the film is the best",
      "vocab_hints": [
        {
          "word": "der Film",
          "translation": "the film / movie",
          "note": "der Film — a direct loan, identical word"
        }
      ],
      "word_bank": [
        "ist",
        "Film",
        "hat",
        "Das",
        "besten",
        "am",
        "aber",
        "der",
        "ist",
        "Buch",
        "heute",
        "besser"
      ],
      "explanation": "besser (the *bazizon twin) and am besten (the best twin) in one verdict — the suppletion ladder complete."
    }
  ],
  "summary": {
    "outcome": "Use besser, mehr, höher, am besten — and explain each as shared inheritance.",
    "use_example": {
      "german": "Das Buch ist besser, aber der Film ist am besten.",
      "english": "The book is better, but the film is the best."
    },
    "takeaway": "Suppletion is shared: gut/besser ↔ good/better, viel/mehr ↔ much/more — irregular together, irregular forever.",
    "curiosity_teaser": "Next: the -er/-ste Sentence Gym — twenty comparison sentences with als and wie."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "nicht",
      "das",
      "sehr",
      "ist",
      "sehr",
      "Heute",
      "gut"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in Twin Suppletions."
  }
};

export default lesson;
