import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1604,
  "slug": "reflexive-daily-routines",
  "title": "Reflexive Daily Routines",
  "subtitle": "sich anziehen, aufwachen, einschlafen — the morning round where prefixes and reflexives meet",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "anziehen",
    "aufstehen",
    "aufwachen",
    "einschlafen",
    "aussehen",
    "freuen",
    "ausziehen",
    "beginnen",
    "bezahlen"
  ],
  "table_word_ids": [
    "anziehen",
    "aufstehen",
    "aufwachen",
    "einschlafen",
    "aussehen",
    "freuen",
    "ausziehen",
    "beginnen",
    "bezahlen",
    "brille",
    "waffel",
    "fremd",
    "jeans",
    "mehrere",
    "firma",
    "schild"
  ],
  "hook": {
    "title": "The Morning Is Reflexive",
    "content": "Run the tape of your morning in German and watch two systems you already own click together. Ich wache auf (prefix flies). Ich stehe auf (prefix flies). Then the mirror moment: Ich ziehe mich an — I pull myself on. Get dressed takes a REFLEXIVE object in German: you are the thing being dressed. English hides this (I get dressed — dressed by whom?), but the old English would not have: 'I dress me', said without blinking. Add Ich wasche mich and Ich fühle mich gut and the whole morning runs on actions that turn back on their doer.",
    "footnotes": [
      {
        "marker": "1",
        "title": "zieht ... an: the Prefix Waits, the Pronoun Doesn't",
        "content": "anziehen is separable (topic 15): the prefix an flies to the end and the reflexive pronoun sits right after the verb — Ich ziehe MICH an. Not mich anziehe, not anziehe mich. Verb, object, prefix: the bracket closes around the pronoun."
      }
    ]
  },
  "pattern": {
    "title": "The Routine Chain",
    "content": "The full chain, verbs you can already conjugate: Ich wache auf (I wake up). Ich stehe auf (I get up). Ich wasche mich (I wash myself). Ich ziehe mich an (I get dressed). Ich fühle mich gut (I feel good). Ich sehe gut aus (I look good — aussehen, no reflexive needed: the looking goes outward!). Ich freue mich (I am glad). Und abends: Ich schlafe ein (I fall asleep — ein- into sleep). Two honest exceptions inside the routine: aussehen and aufwachen are NOT reflexive in German — the prefix does the work, no pronoun. Wir treffen uns um acht (we meet at eight) — reciprocal sich: each meets the other.",
    "footnotes": [],
    "linguist_note": "anziehen: an (on) + ziehen (pull — the tow/tug family). 'To pull on' clothes is the same image English uses, and German makes the puller and the pulled one person: sich anziehen. English 'dress' once meant the same — 'arise and dress yourself' — before the reflexive faded."
  },
  "exercises": [
    {
      "id": "l1604_e1",
      "type": "matching_pairs",
      "prompt": "The routine chain — match each verb phrase with its reading (the last one in dictionary dress). Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "dr1",
          "english": "get dressed",
          "german": "Ich ziehe mich an"
        },
        {
          "id": "dr2",
          "english": "wake up",
          "german": "Ich wache auf"
        },
        {
          "id": "dr3",
          "english": "get up",
          "german": "Ich stehe auf"
        },
        {
          "id": "dr4",
          "english": "fall asleep",
          "german": "Ich schlafe ein"
        },
        {
          "id": "dr5",
          "english": "get undressed (dictionary form)",
          "german": "sich ausziehen"
        },
        {
          "id": "recall1",
          "german": "Ich muss mich waschen",
          "english": "I must wash myself"
        },
        {
          "id": "recall1b",
          "german": "Wir können uns freuen",
          "english": "We can be glad"
        },
        {
          "id": "recall2",
          "german": "Wir können fühlen",
          "english": "We can feel"
        },
        {
          "id": "recall3",
          "german": "Wir können uns anziehen",
          "english": "We can get dressed"
        }
      ],
      "target_answer": "Ich ziehe mich an, Ich wache auf, Ich stehe auf, Ich schlafe ein, sich ausziehen, Ich muss mich waschen, Wir können uns freuen, Wir können fühlen, Wir können uns anziehen",
      "meaning": "get dressed; wake up; get up; fall asleep; get undressed (dictionary form); I must wash myself; We can be glad; We can feel; We can get dressed",
      "explanation": "The chain runs an → auf → ein — and ausziehen closes the day, an's twin in reverse. The schedule around it: die Kurse beginnen um neun, wir bezahlen den Kaffee — factory verbs, no mirror. Three separable prefixes and one reflexive — the morning round mixes both systems you own."
    },
    {
      "id": "l1604_e2",
      "type": "shift_select",
      "prompt": "Word order with the bracket: which sentence is correct for 'I am getting dressed'?",
      "options": [
        "Ich mich ziehe an",
        "Ich ziehe mich an",
        "Ich anziehe mich",
        "Mich ziehe ich an"
      ],
      "target_answer": "Ich ziehe mich an",
      "meaning": "Ich ziehe mich an = I get dressed",
      "explanation": "Verb in position 2, reflexive pronoun right after it, prefix an closes the bracket: ziehe ... mich ... an."
    },
    {
      "id": "l1604_e3",
      "type": "shift_select",
      "prompt": "Reciprocal sich: 'Wir treffen _____ um acht.' (We meet at eight):",
      "options": [
        "sich",
        "dich",
        "uns",
        "mich"
      ],
      "target_answer": "uns",
      "meaning": "Wir treffen uns = we meet (each other)",
      "explanation": "wir → uns: the same reflexive pronoun does reciprocal duty — I meet you, you meet me, one pronoun reports it."
    },
    {
      "id": "l1604_e4",
      "type": "reverse_cognate",
      "prompt": "Which fossil English phrase still uses the reflexive 'yourself' the way German's sich system does?",
      "target_answer": "help yourself",
      "meaning": "help yourself — the reflexive imperative English kept",
      "explanation": "Hilf dir! / Help yourself — both languages once reflexive everywhere; English kept the fossil only in set phrases."
    },
    {
      "id": "l1604_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the morning, in order: 'I wake up and get dressed'",
      "target_answer": "Ich wache auf und ziehe mich an",
      "meaning": "Ich wache auf und ziehe mich an = I wake up and get dressed",
      "vocab_hints": [
        {
          "word": "ziehe",
          "translation": "pull / put on",
          "note": "anziehen — separable: ziehe ... an"
        },
        {
          "word": "auf",
          "translation": "up",
          "note": "the prefix of aufwachen and aufstehen, flying to the end"
        }
      ],
      "word_bank": [
        "und",
        "heute",
        "wache",
        "mich",
        "das",
        "an",
        "Ich",
        "ziehe",
        "auf"
      ],
      "explanation": "Two clauses, two flying prefixes — and the second clause tucks its reflexive mich inside the bracket: ziehe mich an."
    }
  ],
  "summary": {
    "outcome": "Narrate a daily routine mixing separable prefixes and reflexive pronouns, and spot the two non-reflexive exceptions.",
    "use_example": {
      "german": "Ich wache auf, wasche mich, ziehe mich an und fühle mich gut.",
      "english": "I wake up, wash myself, get dressed and feel good."
    },
    "takeaway": "Routine verbs lean reflexive (sich anziehen, sich fühlen) — but aussehen and aufwachen let the prefix work alone.",
    "curiosity_teaser": "Next: numbers, time & gestern — counting is a shift spiral: drei↔three, zwanzig↔twenty, gestern↔yesterday."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We put on / get dressed (an + ziehen) here today\"",
    "target_answer": "Wir anziehen heute hier",
    "word_bank": [
      "Wir",
      "hier",
      "sehr",
      "heute",
      "nicht",
      "anziehen"
    ],
    "explanation": "Building \"Wir anziehen heute hier\" from the lesson's core pattern locks in Reflexive Daily Routines."
  }
};

export default lesson;
