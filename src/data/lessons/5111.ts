import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5111,
  "slug": "the-three-whens-wann-als-wenn",
  "title": "The Three Whens: wann, als, wenn",
  "subtitle": "English 'when' does three jobs — German hires three words, all verb-final",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "wann",
    "als",
    "wenn",
    "kommen",
    "kind",
    "gestern",
    "regnen",
    "lesen",
    "zeit",
    "lehrer",
    "person",
    "freund"
  ],
  "table_word_ids": [
    "wann",
    "als",
    "wenn",
    "regnen",
    "lesen",
    "kommen",
    "kind",
    "gestern",
    "zeit",
    "lehrer",
    "person",
    "freund",
    "küste",
    "professor",
    "erwachsener"
  ],
  "hook": {
    "title": "The When-Split",
    "content": "English when is one word doing shift work: the question (When do you come?), the once-only past (when I was a child), the repeater (when it rains). German refuses the overtime and hires three. wann asks the question — the twin of when, same ancient root. wenn takes the repeater AND the condition (if) — wann's etymological doublet, the same word split into two jobs. And als marks the once-only past — but here is the twist: als is NOT in the when-family at all. It is the twin of English also (all-so → 'as' → 'than'), the same als you drilled as 'than' in the comparison gym. English collapsed three words into one and one into three; German keeps the divisions sharp.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Doublet Test",
        "content": "wann and wenn were one word in Old High German (hwanne) — exactly like English when, which comes from the same *hwan. wann kept the question job, wenn took the clause job. So when you hesitate between them, you are really choosing between 'asking' and 'linking' — the same choice English hides inside one spelling."
      }
    ]
  },
  "pattern": {
    "title": "Three Jobs, Three Words, One Basement",
    "content": "wann — the question: Wann kommst du? And the indirect question: Ich weiß nicht, wann er kommt (verb-final — the basement rule fires). als — the once-only past: Als Kind war ich... (as/when I was a child — the war from the fortress pasts), Als ich gestern kam... — plus its old job, 'than': älter als du. wenn — the repeater and the condition: Wenn es regnet, lese ich (when(ever) it rains, I read — and if it rains, the same sentence). Every one of the three drops the verb to the clause end: wann er kommt, als ich kam, wenn ich Zeit habe. If you can already build weil-clauses, you can build all three.",
    "footnotes": [],
    "linguist_note": "als ← OHG alsō, al ('all') + sō ('so') — the exact formation of English also. 'Than' and 'as' both grew out of 'entirely so' by the same worn-road semantic route German still shows transparently."
  },
  "exercises": [
    {
      "id": "l5111_e1",
      "type": "matching_pairs",
      "prompt": "The when-split — match each sentence with its reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "tw1",
          "english": "When do you come? (question)",
          "german": "Wann kommst du?"
        },
        {
          "id": "tw2",
          "english": "when I was a child (once-only)",
          "german": "als ich ein Kind war"
        },
        {
          "id": "tw3",
          "english": "when(ever) it rains, I read",
          "german": "wenn es regnet, lese ich"
        },
        {
          "id": "tw4",
          "english": "older than you (the old job)",
          "german": "älter als du"
        },
        {
          "id": "tw5",
          "english": "when my friend arrived",
          "german": "als mein Freund kam"
        },
        {
          "id": "tw6",
          "english": "when(ever) the teacher comes",
          "german": "wenn der Lehrer kommt"
        },
        {
          "id": "tw7",
          "english": "when the person leaves",
          "german": "wenn die Person geht"
        },
        {
          "id": "recall1",
          "german": "Wir müssen lesen",
          "english": "We must read"
        },
        {
          "id": "recall2",
          "german": "Es kann regnen",
          "english": "It may rain"
        }
      ],
      "target_answer": "Wann kommst du?, als ich ein Kind war, wenn es regnet, lese ich, älter als du, als mein Freund kam, wenn der Lehrer kommt, wenn die Person geht, Wir müssen lesen, Es kann regnen",
      "meaning": "When do you come? (question); when I was a child (once-only); when(ever) it rains, I read; older than you (the old job); when my friend arrived; when(ever) the teacher comes; when the person leaves; We must read; It may rain",
      "explanation": "wann asks, als marks the unique past moment (and 'than'), wenn repeats and conditions."
    },
    {
      "id": "l5111_e2",
      "type": "shift_select",
      "prompt": "'_____ kommst du?' (question — at what time?):",
      "options": [
        "Wann",
        "Wo",
        "Als",
        "Wenn"
      ],
      "target_answer": "Wann",
      "meaning": "Wann kommst du? = when are you coming?",
      "explanation": "Questions take wann — the exact twin of English when, keeping the question job."
    },
    {
      "id": "l5111_e3",
      "type": "shift_select",
      "prompt": "'_____ ich gestern kam, war es spät.' (a one-time past moment):",
      "options": [
        "Wenn",
        "Als",
        "Dann",
        "Wann"
      ],
      "target_answer": "Als",
      "meaning": "Als ich gestern kam, war es spät = when I arrived yesterday, it was late",
      "explanation": "One specific past event → als. Repeating or future conditions → wenn. English 'when' covers both; German splits them."
    },
    {
      "id": "l5111_e4",
      "type": "reverse_cognate",
      "prompt": "wann and wenn are doublets of one ancient word. Which English word is their twin?",
      "target_answer": "when",
      "meaning": "wann/wenn ↔ when (Proto-Germanic *hwan)",
      "explanation": "wann and wenn descend from the same word as English when: English kept one spelling, German split asking (wann) from linking (wenn)."
    },
    {
      "id": "l5111_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the repeater: 'When it rains, I read'",
      "target_answer": "Wenn es regnet lese ich",
      "meaning": "Wenn es regnet, lese ich = when(ever) it rains, I read",
      "vocab_hints": [
        {
          "word": "regnet",
          "translation": "rains",
          "note": "regnen — the rain-verb; es regnet = it rains"
        }
      ],
      "word_bank": [
        "es",
        "lese",
        "die",
        "ich",
        "regnet",
        "Wenn",
        "sind"
      ],
      "explanation": "wenn builds the clause and the verb goes to the basement: regnet waits, lese waits — weil's rule, one more employee."
    }
  ],
  "summary": {
    "outcome": "Choose between wann, als and wenn correctly and build all three with verb-final order.",
    "use_example": {
      "german": "Wann kommst du? — Wenn es regnet, lese ich.",
      "english": "When are you coming? — When it rains, I read."
    },
    "takeaway": "wann asks, als marks the once-only past (and 'than'), wenn repeats and conditions — and all three park the verb.",
    "curiosity_teaser": "Next: ob — whether or not — the indirect yes/no word and English if's true twin."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Three Whens: wann, als, wenn (Wenn es regnet, lese ich = when(ever) it rains, I read):",
    "target_answer": "Wenn es regnet lese ich",
    "word_bank": [
      "heute",
      "lese",
      "ich",
      "es",
      "regnet",
      "Wenn",
      "nicht"
    ],
    "explanation": "Re-assembling \"Wenn es regnet lese ich\" from scratch locks in the structural pattern of The Three Whens: wann, als, wenn without relying on short-term echo."
  }
};

export default lesson;
