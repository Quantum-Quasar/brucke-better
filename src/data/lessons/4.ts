import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 4,
  "slug": "th-to-d-shift",
  "title": "The Dental Hardening (TH → D)",
  "subtitle": "The shift that connects think, thank, and brother",
  "phase": 1,
  "shift_categories": [
    "th_to_d"
  ],
  "word_ids": [
    "denken",
    "danken",
    "drei",
    "bruder",
    "ding",
    "bad",
    "dünn",
    "donner",
    "du"
  ],
  "table_word_ids": [
    "denken",
    "danken",
    "drei",
    "bruder",
    "ding",
    "bad",
    "dünn",
    "donner",
    "du",
    "da",
    "backen",
    "limonade",
    "wild",
    "spinne",
    "doch",
    "dennoch",
    "schwiegervater"
  ],
  "foreshadow": {
    "line": "You have just watched th become d. Something bigger is hiding in that D: three of the most common words in German are built out of it, and they are not verbs at all. Hold the thought.",
    "resolvedIn": 11
  },
  "hook": {
    "title": "Why German Has No 'TH' Sound",
    "content": "Notice how native German speakers learning English often struggle with the 'th' sound? That is because German completely abolished dental fricatives over 1,300 years ago. Every single original Germanic 'th' sound hardened directly into 'd'. You already own proof from the wild: danke — the one German word everyone picks up — is thank with its th hardened to d.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Dental Hardening",
        "content": "The voiced dental fricative [ð] and voiceless [θ] hardened into the stop [d] across all High German dialects."
      }
    ]
  },
  "pattern": {
    "title": "English TH = German D",
    "content": "Every English 'TH' hardens to 'D' in German. Think becomes denken. Thank becomes danken (notice English has the exact same vowel pair: think and thank!). Three becomes drei. Brother becomes Bruder. Thing becomes Ding (Norse and Germanic assemblies were called 'Things', where matters were discussed). Bath becomes Bad (as in famous German spa towns like Baden-Baden). Roof/thatch becomes Dach. Thou/thee becomes du/dich.",
    "footnotes": [
      {
        "marker": "2",
        "title": "Thou/Thee & Donner",
        "interest": true,
        "content": "English 'thou' (thou goest) and German 'du' (du gehst) both take the ancient -st ending. Santa's reindeer 'Donner and Blitzen' literally means 'Thunder and Lightning' (Donnerstag = Thunder-day / Thursday)!"
      }
    ],
    "trap_note": "Your mind will offer: “German D is just English D with an accent.” It is not. The German D that comes from English th is a new letter doing the old job — read it as English D and you will miss denken for think and Dank for thank. Say the English th first, then let it harden.",
    "linguist_note": "Unlike the P→F shift, which was geographically restricted to High German, the TH→D shift eventually reached even northern Low German and Dutch, leaving English and Icelandic as the lone survivors of Germanic 'th'."
  },
  "exercises": [
    {
      "id": "l4_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German verb for 'to thank' using the TH → D rule:",
      "tile_options": [
        "thank",
        "denk",
        "st",
        "dank",
        "en"
      ],
      "target_answer": "danken",
      "meaning": "to thank",
      "shift_hint": "TH → D",
      "affirmation": "You hardened the th into d and hung on the -en — thank is danken now, all the way down.",
      "explanation": "Dental TH hardened to D + infinitive suffix -en = danken."
    },
    {
      "id": "l4_e2",
      "type": "matching_pairs",
      "prompt": "Match the English TH words to their German D counterparts. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "th1",
          "english": "brother",
          "german": "Bruder"
        },
        {
          "id": "th2",
          "english": "think",
          "german": "denken"
        },
        {
          "id": "th3",
          "english": "three",
          "german": "drei"
        },
        {
          "id": "th4",
          "english": "bath",
          "german": "Bad"
        },
        {
          "id": "recall1",
          "german": "der Pfeffer",
          "english": "the pepper"
        },
        {
          "id": "recall2",
          "german": "der Pfad",
          "english": "the path"
        },
        {
          "id": "recall3",
          "german": "die Pfeife",
          "english": "the pipe"
        },
        {
          "id": "recall4",
          "german": "das Pferd",
          "english": "the horse"
        },
        {
          "id": "recall5",
          "german": "das Pfund",
          "english": "the pound"
        },
        {
          "id": "recall6",
          "german": "die Pfanne",
          "english": "the pan"
        },
        {
          "id": "spaced1",
          "german": "Ich habe ein Pferd",
          "english": "I have a horse"
        },
        {
          "id": "spaced1b",
          "german": "Der Pfirsich ist reif",
          "english": "The peach is ripe"
        }
      ],
      "target_answer": "Bruder, denken, drei, Bad, der Pfeffer, der Pfad, die Pfeife, das Pferd, das Pfund, die Pfanne, Ich habe ein Pferd, Der Pfirsich ist reif",
      "meaning": "brother; think; three; bath; the pepper; the path; the pipe; the horse; the pound; the pan; I have a horse; The peach is ripe",
      "shift_hint": "TH → D",
      "explanation": "Every Germanic dental fricative TH hardened into D in German."
    },
    {
      "id": "l4_e3",
      "type": "reverse_cognate",
      "prompt": "What native English word shares the exact root of 'Bruder'?",
      "target_answer": "brother",
      "meaning": "brother (twin of German Bruder)",
      "affirmation": "You ran the d → th swap and brother stepped out — that medial d is hardened th.",
      "explanation": "Medial D in Bruder directly mirrors English TH in brother."
    },
    {
      "id": "l4_e4",
      "type": "derive",
      "prompt": "Apply the TH → D shift: English: 'think' → German verb:",
      "english_hint": "th·ink → d·enk·en",
      "shift_hint": "TH → D",
      "affirmation": "You hardened th to d and let the -en settle — think became denken.",
      "target_answer": "denken",
      "meaning": "to think",
      "explanation": "TH shifts to D, plus regular -en infinitive."
    },
    {
      "id": "l4_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're letting someone far away know they're on your mind: I think of you",
      "cues": [
        "Who thinks? → ich denke (TH → D: think → denk-)",
        "'of you' → an dich — denken needs its an, and thee → dich",
        "Line them up: thinker, an, then the thee-word"
      ],
      "target_answer": "Ich denke an dich",
      "meaning": "I think of you",
      "vocab_hints": [
        {
          "word": "an",
          "translation": "of / about (preposition)",
          "note": "governs accusative case"
        },
        {
          "word": "dich",
          "translation": "thee / you (object form)",
          "note": "direct twin of archaic English 'thee' (thou ↔ du, thee ↔ dich, thine ↔ dein)"
        }
      ],
      "word_bank": [
        "denke",
        "Ich",
        "dank",
        "an",
        "dich",
        "dir"
      ],
      "explanation": "'denken an' takes the accusative (dich = thee). Notice TH → D: think ↔ denke, thee ↔ dich."
    }
  ],
  "summary": {
    "outcome": "Recognize several English th and German d cognates in familiar words and phrases.",
    "use_example": {
      "german": "Ich denke an dich.",
      "english": "I am thinking of you."
    },
    "takeaway": "Whenever you encounter a German 'd', swap it for 'th' in your head to unlock the English cognate.",
    "curiosity_teaser": "Next: Donner, Bad & Du — culture words through the D-lens: thunder-day, spa towns, and the thou you already speak."
  },
  "twist": {
    "prompt": "Same thought, but the whole family says it: I think of you becomes we think of you.",
    "target_answer": "Wir denken an dich",
    "word_bank": [
      "denken",
      "an",
      "dich",
      "Wir",
      "denke"
    ],
    "explanation": "ich denke → wir denken: the ending carries the person (-e → -en), and 'an dich' doesn't budge. The shift words stay; the endings do the work."
  }
};

export default lesson;
