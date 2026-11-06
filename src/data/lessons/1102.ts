import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1102,
  "slug": "jener-and-the-demonstrative-map",
  "title": "jener ↔ yon & the Demonstrative Map",
  "subtitle": "dieser/jener ↔ this/yon — and der/die/das with demonstrative force",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "jener",
    "dieser",
    "der",
    "die",
    "das",
    "haus",
    "tag",
    "insel",
    "nebel",
    "baum",
    "bett",
    "teller",
    "stuhl",
    "fenster",
    "löffel"
  ],
  "table_word_ids": [
    "jener",
    "dieser",
    "der",
    "das",
    "die",
    "haus",
    "tag",
    "insel",
    "nebel",
    "baum",
    "bett",
    "teller",
    "stuhl",
    "fenster",
    "löffel"
  ],
  "hook": {
    "title": "This, That, and the Word English Lost",
    "content": "English once had three distances: this (near me), that (near you), yon (far from both of us). Yonder's parent word — yon — is now poetic at best. German kept the full map: dieser ↔ this, das ↔ that, jener ↔ yon. That makes jener the oldest word in the set — the twin of a word English pushed out to the frontier ('yonder man'). And stressed der/die/das still carry demonstrative force: 'DER Mann da' is 'THAT man there', with the article doing the pointing.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Yon Is Yonder's Root",
        "content": "yon, yonder, and jener all descend from the same Proto-Germanic *jēnaz. English kept it only in the far-distance compound yonder; German's jener is the bare survivor — the demonstrative of the horizon."
      }
    ]
  },
  "pattern": {
    "title": "The Three-Distance Map",
    "content": "Near: dieser Tag (this day) — declension alert: dieser is the ein-family's twin, so masculine accusative gives diesen Tag. Far: jener Mann (yon man) — same endings as dieser, pointing past your conversation partner. The default: der/die/das, which double as 'the' — but under stress they point: DER Mann da (THAT man there). Compare with topic 12's negation grid and you see the system: ein-family (kein, mein) and pointer-family (dieser, jener) decline identically; only der/die/das march to their own ancient beat.",
    "footnotes": [],
    "linguist_note": "That's why dieser and jener take the same endings as ein and kein (dieser → diesen) while der → den: German demonstratives come in two ancient lineages, and English 'this/that' descends from both (þis from the same base as German dies-)."
  },
  "exercises": [
    {
      "id": "l1102_e1",
      "type": "matching_pairs",
      "prompt": "Match the three distances with their German pointers:",
      "matching_pairs": [
        {
          "id": "jm1",
          "english": "this (near)",
          "german": "dieser"
        },
        {
          "id": "jm2",
          "english": "yon (far)",
          "german": "jener"
        },
        {
          "id": "jm3",
          "english": "that (neuter)",
          "german": "das"
        },
        {
          "id": "jm4",
          "english": "the / he (masculine)",
          "german": "der"
        },
        {
          "id": "jm5",
          "english": "yon tree",
          "german": "jener Baum"
        },
        {
          "id": "jm6",
          "english": "this fog",
          "german": "dieser Nebel"
        },
        {
          "id": "jm7",
          "english": "yon island",
          "german": "jene Insel"
        },
        {
          "id": "jm8",
          "english": "this plate",
          "german": "dieser Teller"
        }
      ],
      "target_answer": "dieser, jener, das, der, jener Baum, dieser Nebel, jene Insel, dieser Teller",
      "meaning": "this, yon, that, the/he, yon tree, this fog, yon island, this plate",
      "explanation": "One map: dieser (near), jener (far) — with der/die/das as the default articles. The new nouns ride the map like everything else."
    },
    {
      "id": "l1102_e2",
      "type": "shift_select",
      "prompt": "Which English word is the bare twin of 'jener'?",
      "options": [
        "yon",
        "that",
        "those",
        "the"
      ],
      "target_answer": "yon",
      "meaning": "yon ↔ jener — the far demonstrative",
      "explanation": "yon/yonder and jener share Proto-Germanic *jēnaz. English keeps yon only in 'yonder'; German kept the bare form. Your room words line up on the map too: dieses Bett (this bed — das Bett, neuter), dieses Fenster (this window) — the ein-family endings decide."
    },
    {
      "id": "l1102_e3",
      "type": "derive",
      "prompt": "Accusative alert: 'Ich nehme _____ Löffel' (dieser + masculine object):",
      "english_hint": "dieser declines like ein: dies + en",
      "target_answer": "diesen",
      "meaning": "Ich nehme diesen Löffel = I take this spoon",
      "explanation": "dieser copies the ein-family: masculine accusative -en (diesen), exactly like einen and keinen — der Löffel pays the same toll."
    },
    {
      "id": "l1102_e4",
      "type": "shift_select",
      "prompt": "'DER Mann da!' — what does the stressed article do here?",
      "options": [
        "It becomes possessive",
        "It points — the article carries demonstrative force: THAT man there",
        "It is a spelling mistake",
        "It marks a question"
      ],
      "target_answer": "It points — the article carries demonstrative force: THAT man there",
      "meaning": "Stressed der/die/das point like this/that",
      "explanation": "Under stress, the plain article resumes its ancient demonstrative job — the/that were one word originally."
    },
    {
      "id": "l1102_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"This chair is good\"",
      "target_answer": "Dieser Stuhl ist gut",
      "meaning": "This chair is good",
      "word_bank": [
        "für",
        "gut",
        "Dieser",
        "Teller",
        "Stuhl",
        "ist",
        "morgen"
      ],
      "explanation": "dieser + masculine der Stuhl — near-distance pointing, verb in position 2. The chair passes inspection.",
      "idea": "This chair is good",
      "idea_parts": [
        "This chair",
        "is good (verb in position 2)"
      ],
      "cues": [
        "Start with \"Dieser\" and anchor \"Stuhl\" in position 2.",
        "Close the frame with \"gut\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Use dieser and jener across the three-distance map and decline dieser like the ein-family.",
    "use_example": {
      "german": "Dieser Stuhl ist gut.",
      "english": "This chair is good."
    },
    "takeaway": "dieser ↔ this, das ↔ that, jener ↔ yon — and stressed der/die/das point again whenever German needs them to.",
    "curiosity_teaser": "Next: Possessive Ladders — mein, dein, sein, ihr across the grid, with the KJV 'mine/thine' rule."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from jener ↔ yon & the Demonstrative Map (This chair is good):",
    "target_answer": "Dieser Stuhl ist gut",
    "word_bank": [
      "nicht",
      "ist",
      "Stuhl",
      "Dieser",
      "heute",
      "gut"
    ],
    "explanation": "Re-assembling \"Dieser Stuhl ist gut\" from scratch locks in the structural pattern of jener ↔ yon & the Demonstrative Map without relying on short-term echo."
  }
};

export default lesson;
