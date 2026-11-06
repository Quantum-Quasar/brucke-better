import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5132,
  "slug": "wann-genau-jetzt-sofort-spaeter-frueh-endlich",
  "title": "Wann genau? jetzt, sofort, später, früh, endlich",
  "subtitle": "point-in-time adverbs — German's five answers to 'when exactly?'",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "jetzt",
    "sofort",
    "später",
    "früh",
    "endlich",
    "zeit",
    "morgen",
    "fahren",
    "kommen",
    "garten"
  ],
  "table_word_ids": [
    "jetzt",
    "sofort",
    "später",
    "früh",
    "endlich",
    "zeit",
    "morgen",
    "fahren",
    "kommen",
    "garten",
    "olive",
    "breit",
    "ratte",
    "sekretärin",
    "fremder"
  ],
  "hook": {
    "title": "When Exactly — Without a Preposition",
    "content": "English answers 'when' with a noun: at noon, in the morning, at once. German has five adverbs that answer it with nothing but a word. jetzt (now), sofort (at once — never 'soon', a trap for anyone who pattern-matches on soon), später (later), früh (early — one f, and it never means 'too early'), endlich (finally / at last). All five drop into the same slot behind the conjugated verb that immer and oft just used, which means the frequency lesson and the time lesson are the same lesson wearing different vocabulary. Two of them travel: Bis später! is one of the three most common farewells in the language, and Endlich ist der Sommer da is the sentence you say when a wait finally ends.",
    "footnotes": [
      {
        "marker": "1",
        "title": "sofort Is Not soon",
        "content": "Komm bitte sofort! means 'come right now', urgently — the adverb sits closer to at once than to soon. If you want 'soon', German reaches for bald (from topic 8) or a gar bald: Bald bin ich da."
      }
    ]
  },
  "pattern": {
    "title": "Same Slot, Five Words",
    "content": "The frame never changes: verb in slot 2, time adverb behind it, everything else follows. Jetzt lerne ich Deutsch (now I am learning German). Der Zug fährt sehr früh (the train leaves very early). Endlich ist der Sommer da (at last summer is here). With a separable verb the adverb can also be pushed to the very front — Endlich kommt er (at last he is coming) — because an adverb in position 1 does exactly what a negated verb or a conjunction does. And the farewell: Bis später! takes the accusative of time you already own.",
    "footnotes": [],
    "linguist_note": "English made temporal 'when' a preposition word (at, in, on) and then fed it nouns. German kept the adverb slot empty and let single words fill it — which is why German sentences carry time as a flat adverb where English carries a small prepositional phrase."
  },
  "exercises": [
    {
      "id": "l5132_e1",
      "type": "matching_pairs",
      "prompt": "Point in time — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "zg1",
          "english": "Now I am learning German",
          "german": "Jetzt lerne ich Deutsch"
        },
        {
          "id": "zg2",
          "english": "The train leaves very early",
          "german": "Der Zug fährt sehr früh"
        },
        {
          "id": "zg3",
          "english": "At last summer is here",
          "german": "Endlich ist der Sommer da"
        },
        {
          "id": "zg4",
          "english": "Come along right away, please",
          "german": "Komm bitte sofort mit"
        },
        {
          "id": "zg5",
          "english": "See you later",
          "german": "Bis später"
        }
      ],
      "target_answer": "Jetzt lerne ich Deutsch, Der Zug fährt sehr früh, Endlich ist der Sommer da, Komm bitte sofort mit, Bis später",
      "meaning": "now, early, finally, at once, later",
      "explanation": "No preposition anywhere. The adverb goes behind the conjugated verb — or takes position 1 and pushes the verb to slot 2 (Jetzt lerne ich)."
    },
    {
      "id": "l5132_e2",
      "type": "shift_select",
      "prompt": "'Komm bitte _____!' (Come here AT ONCE, please) — which word means 'at once', not 'soon'?",
      "options": [
        "bald",
        "später",
        "sofort",
        "früh"
      ],
      "target_answer": "sofort",
      "meaning": "Komm bitte sofort! = come here right now",
      "explanation": "sofort sits on the at-once end of the line. bald is the 'soon' of topic 8, später is later, früh is early. English soon has no single German twin."
    },
    {
      "id": "l5132_e3",
      "type": "shift_select",
      "prompt": "Adverb to position 1: '_____ kommt er.' (At last he is coming):",
      "options": [
        "Sehr",
        "Fast",
        "Nie",
        "Endlich"
      ],
      "target_answer": "Endlich",
      "meaning": "Endlich kommt er = at last he is coming",
      "explanation": "An adverb in position 1 does what a negated verb does: kommt slides to slot 2. Same swap as Jetzt lerne ich Deutsch."
    },
    {
      "id": "l5132_e4",
      "type": "reverse_cognate",
      "prompt": "'Der Zug fährt sehr früh' — the verb behind fährt has a living English twin. Which?",
      "options": [
        "fare",
        "far",
        "early",
        "drive"
      ],
      "target_answer": "fare",
      "meaning": "fahren ↔ fare: the same old go-verb, alive in wayfarer and seafarer",
      "explanation": "fahren is English fare's twin — the same ancient go-verb that survives in wayfarer and seafarer (der Fahrer is the one who fares). früh, for honesty's sake, has no twin at all: English lost that word, and the German cousin of English early lives in the ere-family as eher."
    },
    {
      "id": "l5132_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Der Zug fährt sehr früh",
      "meaning": "The train leaves very early",
      "vocab_hints": [
        {
          "word": "früh",
          "translation": "early",
          "note": "one f, long ü. Der Zug fährt früh — the adverb rides behind the conjugated verb fährt, exactly like immer and oft did."
        }
      ],
      "word_bank": [
        "sehr",
        "Zug",
        "früh",
        "fährt",
        "Der",
        "spät",
        "von",
        "kein"
      ],
      "explanation": "fahren in slot 2 (Der takes slot 1), then the adverb. Note the contrast pair waiting in the bank: spät is 'late', früh is 'early' — the same train, two hours apart.",
      "spoken": "Der Zug fährt sehr früh",
      "replays": 3,
      "cues": [
        "Meaning: \"The train leaves very early\"",
        "Opens with \"Der Zug\" and ends with \"früh\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Answer 'when exactly?' with one adverb, in the slot behind the verb.",
    "use_example": {
      "german": "Jetzt lerne ich Deutsch — bis später!",
      "english": "Now I am learning German — see you later!"
    },
    "takeaway": "jetzt, sofort, später, früh, endlich — five time adverbs, no preposition, same slot as immer and oft. sofort is at once, not soon.",
    "curiosity_teaser": "Next: the calendar itself — Januar bis Mai, the Latin months with German mouths."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Wann genau? jetzt, sofort, später, früh, endlich (The train leaves very early):",
    "target_answer": "Der Zug fährt sehr früh",
    "word_bank": [
      "heute",
      "sehr",
      "fährt",
      "nicht",
      "Der",
      "früh",
      "Zug"
    ],
    "explanation": "Re-assembling \"Der Zug fährt sehr früh\" from scratch locks in the structural pattern of Wann genau? jetzt, sofort, später, früh, endlich without relying on short-term echo."
  }
};

export default lesson;
