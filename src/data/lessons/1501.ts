import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1501,
  "slug": "phrasal-verb-mirrors",
  "title": "Phrasal Verb Mirrors",
  "subtitle": "Fifteen separable verbs matched to their phrasal twins",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "aufwachen",
    "zurückkommen",
    "mitnehmen",
    "einschlafen",
    "aufstehen",
    "aufmachen",
    "zumachen",
    "anmachen",
    "aussuchen",
    "aussehen",
    "abmachen"
  ],
  "table_word_ids": [
    "aufwachen",
    "zurückkommen",
    "aufstehen",
    "einschlafen",
    "aussuchen",
    "aussehen",
    "mitnehmen",
    "aufmachen",
    "zumachen",
    "anmachen",
    "abmachen",
    "interessant",
    "nerv",
    "allein",
    "bank",
    "rabatt"
  ],
  "hook": {
    "title": "The Mirror Wall",
    "content": "Fifteen frames on the mirror wall — every separable verb you own beside its phrasal twin. aufwachen / wake up. zurückkommen / come back. mitnehmen / take along. einschlafen / fall asleep. aufstehen / get up. aufmachen / open (up!). zumachen / shut (to-close!). anmachen / turn on. aussuchen / pick out. aussehen / look (outward!). abmachen / agree on (work it off!). English phrasal verbs are not random — they are the same spatial particles German glues on as prefixes. Learn the mirror, not the list.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Particle Glossary",
        "content": "auf = up (wake up, get up, open up). zurück = back (come back, give back). mit = along (take along, bring along). ein = in/into (fall asleep = fall INTO sleep!). aus = out (pick out, look out=appear). an = on (turn on). zu = to/shut (shut-to, like the old 'slam the door to'). ab = off (work off, take off). Eight particles, hundreds of verbs — both languages built from the same eight."
      }
    ]
  },
  "pattern": {
    "title": "Walk the Wall",
    "content": "The up-row: aufwachen/wake up, aufstehen/get up, aufmachen/open up. The back-row: zurückkommen/come back. The along-row: mitnehmen/take along. The in-row: einschlafen/fall asleep (literally fall INTO sleep). The out-row: aussuchen/pick out, aussehen/look (Du siehst gut aus — you look good OUT). The on-row: anmachen/turn on. The shut-row: zumachen/shut. The off-row: abmachen/agree (work it off — Das ist abgemacht! 'that is off-made' = deal!). Notice anmachen/aufmachen/zumachen all share machen — make — with the particle doing the meaning: German kept make and let the particle steer; English kept make and lost the system.\n\nIn a main clause the verb splits: Wir wachen heute hier auf — we wake up here today. Wachen agrees with wir in position 2; auf moves to the end.",
    "footnotes": [],
    "linguist_note": "English phrasal verbs exploded after 1066 as the native alternative to French/Latin verbs — 'give up' instead of 'surrender'. German never needed the replacement, so its prefixed system stayed intact. The phrasal verbs are English re-Germanizing itself."
  },
  "exercises": [
    {
      "id": "l1501_e1",
      "type": "matching_pairs",
      "prompt": "Mirror wall round one — match the pairs. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "pv1",
          "english": "turn on (the light)",
          "german": "anmachen"
        },
        {
          "id": "pv2",
          "english": "shut (the door)",
          "german": "zumachen"
        },
        {
          "id": "pv3",
          "english": "pick out (a book)",
          "german": "aussuchen"
        },
        {
          "id": "pv4",
          "english": "agree on (a deal)",
          "german": "abmachen"
        },
        {
          "id": "recall1",
          "german": "meine Hoffnung",
          "english": "my hope"
        },
        {
          "id": "recall2",
          "german": "Wir können versuchen",
          "english": "We can try"
        },
        {
          "id": "recall3",
          "german": "Wir können aufmachen",
          "english": "We can open"
        },
        {
          "id": "recall4",
          "german": "Wir können gut aussehen",
          "english": "We can look good"
        }
      ],
      "target_answer": "anmachen, zumachen, aussuchen, abmachen, meine Hoffnung, Wir können versuchen, Wir können aufmachen, Wir können gut aussehen",
      "meaning": "turn on (the light); shut (the door); pick out (a book); agree on (a deal); my hope; We can try; We can open; We can look good",
      "explanation": "an=on, zu=to/shut, aus=out, ab=off — the same particles as the English phrasal twins."
    },
    {
      "id": "l1501_e2",
      "type": "shift_select",
      "prompt": "Which particle means UP in German separable verbs?",
      "options": [
        "mit",
        "ab",
        "zu",
        "auf"
      ],
      "target_answer": "auf",
      "meaning": "auf = up (aufwachen, aufstehen, aufmachen)",
      "explanation": "auf is up: wake up, get up, open up — the busiest particle in the mirror wall."
    },
    {
      "id": "l1501_e3",
      "type": "shift_select",
      "prompt": "'Du siehst gut aus' — what does 'aus' contribute?",
      "options": [
        "The 'look' sense — you look good OUT (outward-facing appearance)",
        "It is decorative",
        "It means 'also'",
        "It means 'off' — you look bad"
      ],
      "target_answer": "The 'look' sense — you look good OUT (outward-facing appearance)",
      "meaning": "aussehen = to look (appear)",
      "explanation": "aussehen = look-out: how you look OUTWARD. English 'outlook' kept the same architecture."
    },
    {
      "id": "l1501_e4",
      "type": "literal_gloss",
      "prompt": "What is the exact word-for-word German structure of this separable-verb sentence?",
      "german": "Ich stehe heute früh auf",
      "natural": "I am getting up early today",
      "options": [
        "I stand today early up",
        "I am standing up early today",
        "I up-stand today early",
        "Today I stand up early"
      ],
      "target_answer": "I stand today early up",
      "meaning": "I am getting up early today",
      "explanation": "From 'aufstehen' (up-stand): the stem 'stehe' holds position 2 while 'auf' flies to the end of the clause (auf jeden Fall). [Ref: fall asleep]"
    },
    {
      "id": "l1501_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'That is a deal (off-made)!':",
      "target_answer": "Das ist abgemacht",
      "meaning": "Das ist abgemacht! = That is a deal (off-made)!",
      "word_bank": [
        "abgemacht",
        "morgen",
        "Das",
        "für",
        "ist"
      ],
      "explanation": "abmachen's participle: ab + gemacht — the prefix rides the participle. 'It is off-made' — the deal is settled."
    }
  ],
  "summary": {
    "outcome": "Match fifteen separable verbs to their phrasal twins by particle.",
    "use_example": {
      "german": "Das ist abgemacht!",
      "english": "That's a deal!"
    },
    "takeaway": "Eight particles (auf, zurück, mit, ein, aus, an, zu, ab) run both languages — learn the mirror, not the list.",
    "curiosity_teaser": "Next: the Prefix Flight Path — spot the prefix at the sentence end and rebuild with modals."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We wake up here today\"",
    "target_answer": "Wir wachen heute hier auf",
    "word_bank": [
      "hier",
      "nicht",
      "heute",
      "wachen",
      "auf",
      "Wir",
      "sehr"
    ],
    "explanation": "Wir takes wachen in position 2. The separable prefix auf closes the sentence: Wir wachen heute hier auf."
  }
};

export default lesson;
