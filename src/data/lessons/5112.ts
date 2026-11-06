import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5112,
  "slug": "ob-whether-or-not",
  "title": "ob: Whether or Not",
  "subtitle": "the indirect yes/no word — and the true twin of English if",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "ob",
    "wenn",
    "wissen",
    "kommen",
    "haben",
    "mögen",
    "zeit",
    "freund"
  ],
  "table_word_ids": [
    "ob",
    "wenn",
    "wissen",
    "haben",
    "kommen",
    "mögen",
    "zeit",
    "freund",
    "haar",
    "abendessen",
    "müsli",
    "schlimm",
    "hungrig",
    "autor",
    "weste"
  ],
  "hook": {
    "title": "Two Ifs, One Ancient Word",
    "content": "German has two ifs and refuses to share. wenn runs the conditions (if it rains...). ob handles the open question folded inside a statement: Ich weiß nicht, ob er kommt — I don't know IF he is coming. And here is the family secret: ob is the true twin of English if. Both descend from Proto-Germanic *jabai — English wore it down to if, German to ob, same ancient word, same job of opening a yes/no question inside a bigger sentence. English meanwhile drafted whether for the job German gives ob — and whether literally means 'which of the two', which is exactly what ob asks: yes, or no?",
    "footnotes": [
      {
        "marker": "1",
        "title": "The 'Or Not' Test",
        "content": "Not sure whether to use ob or wenn? Try adding 'or not'. I don't know if he's coming... or not → works → German wants ob. IF it rains... or not → breaks the sentence → German wants wenn. Ob reports an unanswered yes/no; wenn builds a condition on it."
      }
    ]
  },
  "pattern": {
    "title": "ob in the Basement",
    "content": "The frames: Ich weiß nicht, ob er kommt (I don't know whether he is coming). Ich weiß nicht, ob er Zeit hat (whether he has time — hat, haben's fortress form). Wir sehen, ob es regnet (we'll see whether it's raining). Ich möchte wissen, ob du kommst (I would like to know whether you are coming — möchte back from the escalator). Contrast pair: Ich weiß nicht, ob er kommt (whether — open question) versus Wenn er kommt, lese ich (if — condition). Both are basement clauses — the verb waits at the end for ob exactly as for wenn, weil and dass.",
    "footnotes": [],
    "linguist_note": "Proto-Germanic *jabai ('when, if') forked into English if and German ob — one of the rare pairs where the English twin looks NOTHING like its German sibling until the pedigree is on the table. The b and the f are the same ancient labial consonant, voiced differently down the centuries."
  },
  "exercises": [
    {
      "id": "l5112_e1",
      "type": "matching_pairs",
      "prompt": "The two ifs — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "ob1",
          "english": "I don't know whether he is coming",
          "german": "Ich weiß nicht, ob er kommt"
        },
        {
          "id": "ob2",
          "english": "if it rains, I read",
          "german": "Wenn es regnet, lese ich"
        },
        {
          "id": "ob3",
          "english": "whether she has time",
          "german": "ob sie Zeit hat"
        },
        {
          "id": "ob4",
          "english": "if I had time (would-world)",
          "german": "Wenn ich Zeit hätte"
        },
        {
          "id": "ob5",
          "english": "I don't know whether my friend is coming",
          "german": "Ich weiß nicht, ob mein Freund kommt"
        }
      ],
      "target_answer": "Ich weiß nicht, ob er kommt, Wenn es regnet, lese ich, ob sie Zeit hat, Wenn ich Zeit hätte, Ich weiß nicht, ob mein Freund kommt",
      "meaning": "ob for open questions, wenn for conditions",
      "explanation": "ob reports an open yes/no; wenn builds a condition. English splits the same jobs between whether/if and if."
    },
    {
      "id": "l5112_e2",
      "type": "shift_select",
      "prompt": "'Ich weiß nicht, _____ er kommt.' (I don't know IF/WHETHER...):",
      "options": [
        "als",
        "wenn",
        "ob",
        "wann"
      ],
      "target_answer": "ob",
      "meaning": "Ich weiß nicht, ob er kommt",
      "explanation": "The 'or not' test: 'whether he is coming or not' works → ob. An indirect yes/no question folds ob into the sentence."
    },
    {
      "id": "l5112_e3",
      "type": "shift_select",
      "prompt": "Choose the conditional subordinator: '_____ du kommst, lese ich.' (If/whenever you come, I read):",
      "options": [
        "Wann",
        "Ob",
        "Als",
        "Wenn"
      ],
      "target_answer": "Wenn",
      "meaning": "Wenn du kommst, lese ich = if you come, I read",
      "explanation": "A condition built on the other clause's action → wenn. ob cannot build conditions — it only reports open questions."
    },
    {
      "id": "l5112_e4",
      "type": "reverse_cognate",
      "prompt": "ob looks nothing like it — but which everyday English word is its true twin (Proto-Germanic *jabai)?",
      "target_answer": "if",
      "meaning": "ob ↔ if (the same ancient word)",
      "explanation": "English if and German ob both descend from *jabai. The family resemblance hid for a thousand years; the pedigree exposes it."
    },
    {
      "id": "l5112_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Ich weiß nicht ob er Zeit hat",
      "meaning": "Ich weiß nicht, ob er Zeit hat",
      "vocab_hints": [
        {
          "word": "ob",
          "translation": "whether / if",
          "note": "the indirect yes/no word — verb goes to the basement"
        }
      ],
      "word_bank": [
        "er",
        "aber",
        "haben",
        "nicht",
        "weiß",
        "hat",
        "ob",
        "Zeit",
        "Ich"
      ],
      "explanation": "weiß holds position 2 of the main clause; hat waits at the basement end — ob's clause runs on weil's rules.",
      "spoken": "Ich weiß nicht ob er Zeit hat",
      "replays": 3,
      "cues": [
        "Meaning: \"Ich weiß nicht, ob er Zeit hat\"",
        "Opens with \"Ich weiß\" and ends with \"hat\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Use ob for indirect yes/no questions, contrast it with wenn, and name English if as its twin.",
    "use_example": {
      "german": "Ich weiß nicht, ob er kommt — wenn er kommt, lese ich.",
      "english": "I don't know whether he's coming — if he comes, I'll read."
    },
    "takeaway": "ob asks the open yes/no ('or not' test), wenn builds the condition — and ob is English if, disguised.",
    "curiosity_teaser": "This whether-branch ends here — more side paths wait on the map, and the whole compendium waits in review."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from ob: Whether or Not (Ich weiß nicht, ob er Zeit hat):",
    "target_answer": "Ich weiß nicht ob er Zeit hat",
    "word_bank": [
      "weiß",
      "heute",
      "Ich",
      "hat",
      "ob",
      "er",
      "Zeit",
      "nicht"
    ],
    "explanation": "Re-assembling \"Ich weiß nicht ob er Zeit hat\" from scratch locks in the structural pattern of ob: Whether or Not without relying on short-term echo."
  }
};

export default lesson;
