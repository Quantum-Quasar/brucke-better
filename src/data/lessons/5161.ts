import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5161,
  "slug": "ort-i-hier-dort-drueben-gegenueber-umweg",
  "title": "Ort I: hier, dort, drüben, gegenüber, der Umweg",
  "subtitle": "the words that point — and the sound shift hiding inside dort",
  "phase": 3,
  "shift_categories": [
    "th_to_d",
    "v_to_b"
  ],
  "word_ids": [
    "hier",
    "dort",
    "drüben",
    "gegenüber",
    "umweg",
    "wohnen",
    "haus",
    "kirche",
    "brücke",
    "nummer",
    "eins",
    "immer",
    "sofort",
    "nehmen"
  ],
  "table_word_ids": [
    "hier",
    "dort",
    "drüben",
    "gegenüber",
    "umweg",
    "wohnen",
    "haus",
    "kirche",
    "brücke",
    "nummer",
    "eins",
    "immer",
    "sofort",
    "nehmen",
    "lebensmittel",
    "deshalb",
    "eben"
  ],
  "hook": {
    "title": "English Points Twice, German Points Four Times",
    "content": "English points with here and there and then gives up. German points four times. hier and here are the purest twins you will ever meet — both come from the same Proto-Germanic *hiar, untouched, with no shift to explain. dort is da wearing a pointing suffix — and da is there's plain twin: the same ancient adverb *þar, with German hardening the breathy th to d — the same law that made drei out of three and das out of that. drüben is über wearing its adverb coat — 'on the over side' — and über ↔ over is the V→B twin you know from geben/give. gegenüber stacks gegen ('against') on über ('over') — over-against — a relation English writes as a whole phrase. Der Umweg is um + Weg, a way-around, and Weg ↔ way is a twin as old as the road. So the honest score: English kept here and there, but lost drüben and gegenüber as single words and spells the detour with borrowed letters; German still runs three rungs of distance — hier, dort, drüben.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The TH→D Family Reunion",
        "content": "Once you hear TH→D you hear it everywhere: three/drei, that/das, thou/du, there/da — and dort is just da with the pointing suffix. One sound law, one family, thousands of years old — and German never stopped inviting the th to harden. Say da and there back to back and feel the d and the th be the same consonant wearing two dialects."
      }
    ]
  },
  "pattern": {
    "title": "Four Words, Three Distances",
    "content": "1. Here: Ich wohne hier — where you stand. 2. There: Die Brücke ist drüben — across the gap, visible but far. 3. Plain there: Das Auto ist dort. 4. Opposite: Gegenüber ist die Kirche — or with a noun, postposed: das Haus gegenüber. 5. The detour: Wir nehmen einen Umweg — 'a way around'. 6. Right away: Ich komme sofort. And the numbers still point: das Haus gegenüber hat die Nummer eins.",
    "footnotes": [],
    "linguist_note": "Three degrees of distance is the old Germanic system: hier, dort, drüben. English once had the third rung too — yonder, still alive in dialects — but standard English collapsed to two words and a phrase ('over there'). German never had to collapse; the system is intact."
  },
  "exercises": [
    {
      "id": "l5161_e1",
      "type": "matching_pairs",
      "prompt": "The pointing words in place — match each sentence with its reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "hd1",
          "english": "I live here",
          "german": "Ich wohne hier"
        },
        {
          "id": "hd2",
          "english": "The bridge is over there",
          "german": "Die Brücke ist drüben"
        },
        {
          "id": "hd3",
          "english": "Opposite is the church",
          "german": "Gegenüber ist die Kirche"
        },
        {
          "id": "hd4",
          "english": "The house opposite has number one",
          "german": "Das Haus gegenüber hat die Nummer eins"
        },
        {
          "id": "hd5",
          "english": "We take a detour",
          "german": "Wir nehmen einen Umweg"
        },
        {
          "id": "hd6",
          "english": "I am coming right away",
          "german": "Ich komme sofort"
        },
        {
          "id": "recall1",
          "german": "Es muss dauern",
          "english": "It must take time"
        }
      ],
      "target_answer": "Ich wohne hier, Die Brücke ist drüben, Gegenüber ist die Kirche, Das Haus gegenüber hat die Nummer eins, Wir nehmen einen Umweg, Ich komme sofort, Es muss dauern",
      "meaning": "I live here; The bridge is over there; Opposite is the church; The house opposite has number one; We take a detour; I am coming right away; It must take time",
      "explanation": "Notice the two faces of gegenüber: alone in position 1 (Gegenüber ist die Kirche) or trailing its noun (das Haus gegenüber). One word, two seats — and der Umweg is literally a 'way-around'."
    },
    {
      "id": "l5161_e2",
      "type": "shift_select",
      "prompt": "dort ↔ there — which shift badge does the pair wear?",
      "options": [
        "TH→D (dort ↔ there)",
        "V→B (über ↔ over)",
        "K→CH (Woche ↔ week)",
        "T→S/Z (zehn ↔ ten)"
      ],
      "target_answer": "TH→D (dort ↔ there)",
      "meaning": "dort is there's twin: the ancient *þar with th hardened to d",
      "explanation": "Both point back to Proto-Germanic *þar. English kept the breathy th; German hardened it to d — the same law as drei/three and das/that. And you can see the V→B badge on the word drüben: über ↔ over, with b where English has v."
    },
    {
      "id": "l5161_e3",
      "type": "reverse_cognate",
      "prompt": "The purest twin in the lesson: hier. Spell its English twin — the one word that never shifted at all:",
      "options": [
        "hear",
        "here",
        "hare",
        "hair"
      ],
      "target_answer": "here",
      "meaning": "hier ↔ here: the same *hiar, untouched",
      "explanation": "hier and here are the same Proto-Germanic word *hiar with no shift to explain — h stayed h, the vowel stayed itself. The twins never moved apart; the spelling just drifted one letter."
    },
    {
      "id": "l5161_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the detour sentence: 'We take a detour'",
      "tile_options": [
        "sofort",
        "Umweg",
        "nehmen",
        "die",
        "einen",
        "Wir",
        "Kirche"
      ],
      "target_answer": "Wir nehmen einen Umweg",
      "meaning": "We take a detour",
      "explanation": "nehmen + einen Umweg — masculine accusative, the same case as einen Moment, bitte. The compound says exactly what it does: um + Weg, a way-around. Distractors wait in the bank, but the detour is the destination."
    },
    {
      "id": "l5161_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We always live here'",
      "target_answer": "Wir wohnen immer hier",
      "meaning": "We always live here",
      "word_bank": [
        "die",
        "immer",
        "Wir",
        "wohnen",
        "Kirche",
        "dort",
        "hier"
      ],
      "explanation": "wohnen in slot 2, immer right behind it, hier at the end — the frequency adverb from the Wie-oft lesson doing its job in a new house. Swap hier for dort and the sentence moves across town."
    }
  ],
  "summary": {
    "outcome": "Point four ways — hier, dort, drüben, gegenüber — take an Umweg, and hear the TH→D shift inside dort.",
    "use_example": {
      "german": "Ich wohne hier — die Brücke ist drüben.",
      "english": "I live here — the bridge is over there."
    },
    "takeaway": "hier/here never shifted, dort/there wears TH→D, drüben hides über/over, gegenüber is gegen+über stacked, and der Umweg is a 'way-around' — Weg and way are the same word.",
    "curiosity_teaser": "Next: Richtung I — links, rechts, geradeaus, oben, unten — the words that tell you which way."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Ort I: hier, dort, drüben, gegenüber, der Umweg (We always live here):",
    "target_answer": "Wir wohnen immer hier",
    "word_bank": [
      "Wir",
      "heute",
      "immer",
      "hier",
      "wohnen",
      "nicht"
    ],
    "explanation": "Re-assembling \"Wir wohnen immer hier\" from scratch locks in the structural pattern of Ort I: hier, dort, drüben, gegenüber, der Umweg without relying on short-term echo."
  }
};

export default lesson;
