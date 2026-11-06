import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1502,
  "slug": "prefix-flight-path",
  "title": "Prefix Flight Path",
  "subtitle": "Spot the prefix at the sentence end across bracket sentences — and rebuild with modals",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "aufmachen",
    "mitnehmen",
    "anrufen",
    "aufwachen",
    "einschlafen",
    "können",
    "wollen",
    "müssen",
    "einkaufen",
    "abfahren",
    "dunkel",
    "sorge",
    "gleich",
    "meinung",
    "weiß",
    "traurig",
    "angst",
    "hoffnung"
  ],
  "table_word_ids": [
    "aufmachen",
    "mitnehmen",
    "aufwachen",
    "einschlafen",
    "anrufen",
    "können",
    "wollen",
    "müssen",
    "einkaufen",
    "abfahren",
    "dunkel",
    "sorge",
    "gleich",
    "meinung",
    "weiß",
    "traurig",
    "angst",
    "hoffnung"
  ],
  "hook": {
    "title": "Watching Things Fly",
    "content": "Every separable verb in a real sentence sends its prefix on a flight: the root lands in position 2, the prefix touches down at the very end. Ich mache das Fenster auf. Ich nehme das Essen mit. Ich wache früh auf. Your job: spot the landing. Then the advanced drill — rebuild each sentence inside a modal bracket, where the prefix is grounded again: Ich will das Fenster aufmachen (the whole verb, prefix included, closes the bracket). Flight and grounding, same verb, two architectures.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Landing Strip Is Also the Perfekt Spot",
        "content": "The prefix lands exactly where participles and bare infinitives land — the sentence's final slot is German's cargo bay. When a separable verb goes Perfekt, the prefix flies BACK to the front of the participle: aufgemacht. One slot, three cargoes, one system."
      }
    ]
  },
  "pattern": {
    "title": "Flight Plans",
    "content": "Flight mode (root in 2, prefix last): Ich rufe ihn an (I call him up — anrufen, the phone verb!). Ich wache früh auf. Wir kaufen? no — Wir sehen die? — keep: Ich schlafe? — Ich schlafe nicht ein? — Ich schlafe ein (I fall asleep). Grounded mode (modal bracket): Ich will ihn anrufen. Du musst früh aufwachen. Wir können nicht einschlafen. Perfekt mode (prefix + ge): Ich habe ihn angerufen. Er ist eingeschlafen. Three modes, one verb — read the mode from the sentence architecture before you translate a word.",
    "footnotes": [],
    "linguist_note": "anrufen (call up) proves the particles are spatial even in abstract uses: the phone call goes UP and OUT. English 'call up' kept the spatial image — the particle, not the verb, carries the metaphor in both languages."
  },
  "exercises": [
    {
      "id": "l1502_e1",
      "type": "shift_select",
      "prompt": "Spot the landing: 'Morgen fahre ich früh _____.' (depart — abfahren):",
      "options": [
        "ab",
        "mit",
        "an",
        "auf"
      ],
      "target_answer": "ab",
      "meaning": "Morgen fahre ich früh ab = I'm departing early tomorrow",
      "explanation": "abfahren: the root fahre holds position 2, the prefix ab lands at the end — DE-part. Gleich fahre ich ab works too: the flight path even fronted gleich (right away) without grounding anything."
    },
    {
      "id": "l1502_e2",
      "type": "shift_select",
      "prompt": "Ground it: 'Ich will früh _____.' (to wake up, joined at the end of the modal bracket):",
      "options": [
        "aufwache",
        "aufwachen",
        "auf wachen",
        "wache auf"
      ],
      "target_answer": "aufwachen",
      "meaning": "Ich will früh aufwachen = I want to wake up early",
      "explanation": "Inside the modal bracket the verb stays WHOLE — prefix included: will opens, aufwachen closes. Feelings ride the cargo hold as whole nouns too: Angst haben, Hoffnung haben — and deine Meinung (your opinion) keeps its ein-family endings: Ich kenne deine Meinung."
    },
    {
      "id": "l1502_e3",
      "type": "matching_pairs",
      "prompt": "Three modes of one verb — match:",
      "matching_pairs": [
        {
          "id": "fp1",
          "english": "flight mode",
          "german": "Ich kaufe morgen ein"
        },
        {
          "id": "fp2",
          "english": "grounded mode (modal)",
          "german": "Ich will morgen einkaufen"
        },
        {
          "id": "fp3",
          "english": "Perfekt mode (prefix + ge)",
          "german": "Ich habe eingekauft"
        },
        {
          "id": "fp4",
          "english": "dictionary form",
          "german": "einkaufen"
        }
      ],
      "target_answer": "Ich kaufe morgen ein, Ich will morgen einkaufen, Ich habe eingekauft, einkaufen",
      "meaning": "the same verb (to shop) in four architectures",
      "explanation": "Flight (prefix last), grounding (whole in the bracket), Perfekt (prefix + ge + stem + t) — read the mode first. einkaufen = ein + kaufen: shop 'in', buy in."
    },
    {
      "id": "l1502_e4",
      "type": "reverse_cognate",
      "prompt": "What English phrasal verb is the twin of 'anrufen' (the verb is 'call')?",
      "target_answer": "call up",
      "meaning": "call up ↔ anrufen (an = up/on)",
      "explanation": "Both languages kept the spatial metaphor of the phone call going up — an = on/up, and the call goes out. Und wenn es dunkel ist, rufe ich an: the flight path works after dark too."
    },
    {
      "id": "l1502_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We cannot fall asleep' (grounded mode)",
      "target_answer": "Wir können nicht einschlafen",
      "meaning": "We cannot fall asleep",
      "word_bank": [
        "ist",
        "nicht",
        "können",
        "Wir",
        "einschlafen",
        "von"
      ],
      "explanation": "können opens, nicht rides inside, einschlafen closes WHOLE — grounded flight, negated cargo. The basement knows feelings too: Ich weiß, dass du Sorge hast — und weil ich traurig bin, gehen wir nicht einkaufen."
    }
  ],
  "summary": {
    "outcome": "Track separable prefixes across flight, grounded, and Perfekt modes.",
    "use_example": {
      "german": "Ich will früh aufwachen.",
      "english": "I want to wake up early."
    },
    "takeaway": "Prefix lands at the sentence end in flight, stays whole in modal brackets, rides the participle in Perfekt — read the mode, then the verb.",
    "curiosity_teaser": "Next: ver ↔ for- — the inseparable cognate set: vergessen = forget, and the payoff of every preview."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Prefix Flight Path (We cannot fall asleep):",
    "target_answer": "Wir können nicht einschlafen",
    "word_bank": [
      "einschlafen",
      "Wir",
      "können",
      "nicht",
      "heute"
    ],
    "explanation": "Re-assembling \"Wir können nicht einschlafen\" from scratch locks in the structural pattern of Prefix Flight Path without relying on short-term echo."
  }
};

export default lesson;
