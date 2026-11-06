import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 301,
  "slug": "pf-openers",
  "title": "PF- Openers",
  "subtitle": "path → Pfad, pound → Pfund, pepper → Pfeffer — the word-initial explosion",
  "phase": 1,
  "shift_categories": [
    "p_to_pf_f"
  ],
  "word_ids": [
    "pfad",
    "pfund",
    "pfeffer",
    "pfeife",
    "pflug",
    "pferd",
    "pfanne",
    "apfel",
    "pfirsich",
    "einsteigen",
    "aussteigen",
    "fernsehen"
  ],
  "table_word_ids": [
    "pfad",
    "pfund",
    "pfeffer",
    "pfeife",
    "pflug",
    "pferd",
    "pfanne",
    "apfel",
    "pfirsich",
    "einsteigen",
    "aussteigen",
    "fernsehen",
    "hagel",
    "busch",
    "hoffentlich",
    "fußballspieler"
  ],
  "hook": {
    "title": "The Word-Initial Explosion",
    "content": "You already know what the shift did after vowels: hope → hoffen, ship → Schiff. But at the front door of a word, Germanic P did not merely soften — it exploded. It burst into the double consonant PF, a sound like popping a bubble: path → Pfad, pound → Pfund, pepper → Pfeffer. Both letters are right there on the page: the English P you know, plus the F it became. Every PF- word in German is an English p-word with a receipt stapled to its face.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Horse Receipt",
        "content": "Pferd (horse) and English palfrey are the same medieval loan: Late Latin paraverēdus, a post-road saddle horse. German stapled the PF on (paraverēdus → Pferd), while English carried it through French and wore it down to palfrey — a knight's riding horse."
      }
    ]
  },
  "pattern": {
    "title": "The PF- Family at the Front Door",
    "content": "English p + everything = German Pf- at the start of a native word: path → Pfad, pound → Pfund, pepper → Pfeffer, pipe → Pfeife, plow → Pflug, pan → Pfanne, plant → Pflanze. Watch for double duty inside a word: Pfeffer shifts twice (initial p → pf AND medial pp → ff), and Pfeife does the same trick (p → pf, then p → f). Even horse got the treatment: Pferd. Read any German PF- word aloud and the English twin falls out of your mouth.",
    "footnotes": [
      {
        "interest": true,
        "marker": "2",
        "title": "The North Fades the P",
        "content": "Colloquially in northern Germany, PF- often de-affricates to plain F — Pflug (plow) and Flug (flight) can sound identical there. In careful speech the P stays: /pf/."
      }
    ],
    "linguist_note": "The shift only swallowed native Germanic words. Latin borrowings kept their bare p: Post, Papier, Park. So not every German p-word expects a pf — only the ones Germanic enough to have been standing there in 500 AD."
  },
  "exercises": [
    {
      "id": "l301_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German twin of 'horse' (the PF- receipt included):",
      "tile_options": [
        "Pferd",
        "das",
        "der",
        "Pfard"
      ],
      "target_answer": "das Pferd",
      "meaning": "the horse",
      "vocab_hints": [
        {
          "word": "das",
          "translation": "the (neuter)",
          "note": "das Pferd — gender is ancestry, collect it with the word"
        }
      ],
      "shift_hint": "P → PF",
      "explanation": "paraverēdus → Pferd: the Latin p affricated to pf at the start. English palfrey kept the p."
    },
    {
      "id": "l301_e2",
      "type": "matching_pairs",
      "prompt": "Match each English word with its German twin:",
      "matching_pairs": [
        {
          "id": "pf1",
          "english": "path",
          "german": "Pfad"
        },
        {
          "id": "pf2",
          "english": "pound",
          "german": "Pfund"
        },
        {
          "id": "pf3",
          "english": "pepper",
          "german": "Pfeffer"
        },
        {
          "id": "pf4",
          "english": "plow",
          "german": "Pflug"
        },
        {
          "id": "pf5",
          "english": "peach",
          "german": "Pfirsich"
        },
        {
          "id": "pf6",
          "english": "to board / get on",
          "german": "einsteigen"
        },
        {
          "id": "pf7",
          "english": "to get off",
          "german": "aussteigen"
        }
      ],
      "target_answer": "Pfad, Pfund, Pfeffer, Pflug, Pfirsich, einsteigen, aussteigen",
      "meaning": "path, pound, pepper, plow, peach, to board, to get off",
      "shift_hint": "P → PF",
      "explanation": "Word-initial p exploded into the affricate pf in native German words — and the last two are the bracket infinitives from the modal topic, back for another ride."
    },
    {
      "id": "l301_e3",
      "type": "shift_select",
      "prompt": "Which shift turns English 'pipe' into German 'Pfeife'?",
      "options": [
        "TH → D",
        "No shift — they are identical",
        "P → PF at the start and P → F in the middle — the word shifts twice",
        "T → Z"
      ],
      "target_answer": "P → PF at the start and P → F in the middle — the word shifts twice",
      "meaning": "pipe ↔ Pfeife (double p-shift)",
      "explanation": "Initial p → pf, medial p → f. Both letters of the English word report their shift on the German page."
    },
    {
      "id": "l301_e4",
      "type": "derive",
      "prompt": "Apply the shift: English 'pan' → German:",
      "english_hint": "pan → Pf + rest",
      "shift_hint": "P → PF",
      "target_answer": "Pfanne",
      "meaning": "die Pfanne — the pan",
      "explanation": "Initial p → pf: pan → Pfanne (the doubled n is a German spelling habit)."
    },
    {
      "id": "l301_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're at the market stall asking for a quantity: a pound of pepper, please",
      "cues": [
        "English p explodes to Pf- at the front door: pound → Pfund, pepper → Pfeffer",
        "German drops the 'of' in measure phrases: ein Pfund Pfeffer",
        "Seal it with 'please': bitte — the cognate of English 'bid'"
      ],
      "target_answer": "Ein Pfund Pfeffer bitte",
      "meaning": "A pound of pepper please",
      "vocab_hints": [
        {
          "word": "bitte",
          "translation": "please",
          "note": "cognate with English 'bid' — literally '[I] bid/request it'"
        }
      ],
      "word_bank": [
        "bitte",
        "Pfeffer",
        "Pfund",
        "Ein",
        "und",
        "Pfanne"
      ],
      "explanation": "Measure phrase without 'of', PF- receipts on both nouns, and bitte to close — you just ordered at a German market."
    }
  ],
  "summary": {
    "outcome": "Read PF- words as English p-words and want things out loud in the modal bracket.",
    "use_example": {
      "german": "Ein Pfund Pfeffer, bitte.",
      "english": "A pound of pepper, please."
    },
    "takeaway": "Word-initial English p exploded into German pf in native words — Pf- is English p- with the shift receipt attached.",
    "curiosity_teaser": "Next: discrimination drills — can you tell which f-words are true p-shifts and which are f impostors like Flug?"
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from PF- Openers (A pound of pepper please):",
    "target_answer": "Ein Pfund Pfeffer bitte",
    "word_bank": [
      "Pfeffer",
      "heute",
      "nicht",
      "Ein",
      "Pfund",
      "bitte"
    ],
    "explanation": "Re-assembling \"Ein Pfund Pfeffer bitte\" from scratch locks in the structural pattern of PF- Openers without relying on short-term echo."
  }
};

export default lesson;
