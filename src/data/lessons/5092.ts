import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5092,
  "slug": "the-extended-clan",
  "title": "The Extended Clan",
  "subtitle": "Großvater, Oma, Onkel, Enkel — compounds, nursery words and the ankle surprise",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "großvater",
    "großmutter",
    "oma",
    "opa",
    "onkel",
    "tante",
    "geschwister",
    "enkel",
    "familie"
  ],
  "table_word_ids": [
    "großvater",
    "großmutter",
    "onkel",
    "tante",
    "enkel",
    "oma",
    "opa",
    "geschwister",
    "familie",
    "tschüss",
    "kakao",
    "ordentlich",
    "biene",
    "schauspieler",
    "partner"
  ],
  "hook": {
    "title": "Compounds, Loans and One Ankle",
    "content": "The extended family shows all three ways German builds kin vocabulary. Compounds from parts you own: Großvater (big-father), Großmutter (big-mother), Großeltern (the big-elders). Shared Romance loans: Onkel and Tante came from French oncle/tante — the same loans English took, and Cousin/Cousine likewise. Nursery words: Oma and Opa are German inventions with no English relatives — honest memorize words. And one fossil: Enkel, grandchild, is the same ancient word as ANKLE — both mean 'bender', the ankle's joint becoming the family's 'little bender', the one a generation below. Even Geschwister, siblings, is built: ge- + Schwester, 'sister-hood' for brothers and sisters alike.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Schwieger-: the Quiet In-Law Prefix",
        "content": "Schwiegermutter (mother-in-law) hides Schwieger, an old word for 'affinity by marriage' with no English cousin — but its second half is Mutter, the unchanged twin. German in-law words are compounds wearing one unknown bead on a familiar string."
      }
    ]
  },
  "pattern": {
    "title": "The Clan in Sentences",
    "content": "Mein Großvater liest die Zeitung. Meine Großmutter backt einen Kuchen (the baker verb at work). Meine Tante schenkt mir ein Buch. Ich habe zwei Geschwister — plural counting like English siblings. Der Enkel besucht seinen Großvater. Note the pattern: kin nouns for men take der/mein, for women die/meine, and the compounds follow their HEAD noun — Großmutter is die because Mutter is. Family gatherings are grammar drills: Meine Familie ist groß. — with Geschwister, Eltern, Cousin und Cousine all pulling their genders behind them.",
    "footnotes": [],
    "linguist_note": "Enkel and ankle both descend from Proto-Germanic *ankulaz, 'that which bends'. English kept the body-part sense; German's word bent socially — the grandchild as the family's small joint, linking the generations like an ankle links foot and leg."
  },
  "exercises": [
    {
      "id": "l5092_e1",
      "type": "matching_pairs",
      "prompt": "Match the extended clan. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "ec1",
          "english": "grandfather (big-father)",
          "german": "der Großvater"
        },
        {
          "id": "ec2",
          "english": "grandmother (big-mother)",
          "german": "die Großmutter"
        },
        {
          "id": "ec3",
          "english": "uncle (French loan like English uncle)",
          "german": "der Onkel"
        },
        {
          "id": "ec4",
          "english": "aunt (French loan like English aunt)",
          "german": "die Tante"
        },
        {
          "id": "ec5",
          "english": "grandchild (twin: ankle)",
          "german": "der Enkel"
        },
        {
          "id": "recall1",
          "german": "mein Vater und meine Mutter",
          "english": "my father and my mother"
        },
        {
          "id": "recall2",
          "german": "mein Sohn und meine Schwester",
          "english": "my son and my sister"
        },
        {
          "id": "recall3",
          "german": "meine Eltern",
          "english": "my parents"
        },
        {
          "id": "recall4",
          "german": "mein Opa",
          "english": "my grandpa"
        },
        {
          "id": "recall5",
          "german": "meine Geschwister",
          "english": "my siblings"
        }
      ],
      "target_answer": "der Großvater, die Großmutter, der Onkel, die Tante, der Enkel, mein Vater und meine Mutter, mein Sohn und meine Schwester, meine Eltern, mein Opa, meine Geschwister",
      "meaning": "grandfather (big-father); grandmother (big-mother); uncle (French loan like English uncle); aunt (French loan like English aunt); grandchild (twin: ankle); my father and my mother; my son and my sister; my parents; my grandpa; my siblings",
      "explanation": "Compounds (Groß+vater), shared French loans (Onkel, Tante) and one fossil (Enkel ↔ ankle) — the clan in five words."
    },
    {
      "id": "l5092_e2",
      "type": "shift_select",
      "prompt": "Geschwister (siblings) is built on:",
      "options": [
        "Schwager (brother-in-law)",
        "schwer (heavy)",
        "Schwester (sister)",
        "schön (beautiful)"
      ],
      "target_answer": "Schwester (sister)",
      "meaning": "Geschwister = ge- + Schwester — 'sister-hood' meaning siblings",
      "explanation": "ge- collects a group around one noun: one Schwester, but Geschwister for the whole set of brothers and sisters."
    },
    {
      "id": "l5092_e3",
      "type": "shift_select",
      "prompt": "Enkel shares its ancient root with which English body word?",
      "options": [
        "angle",
        "uncle",
        "aunt",
        "ankle"
      ],
      "target_answer": "ankle",
      "meaning": "Enkel ↔ ankle — both from *ankulaz 'bender'",
      "explanation": "Both words mean 'the bender': English kept the joint, German bent the word toward the youngest generation."
    },
    {
      "id": "l5092_e4",
      "type": "reverse_cognate",
      "prompt": "Which nursery word is German for grandma (no English twin — honest memorize; three letters)?",
      "target_answer": "Oma",
      "meaning": "Oma = grandma (a nursery coinage, cognate only with Dutch)",
      "explanation": "Oma and Opa are German nursery inventions — the honest no-cognate words of the family tree."
    },
    {
      "id": "l5092_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Meine Oma ist sehr alt = my grandma is very old\"",
      "target_answer": "Meine Oma ist sehr alt",
      "meaning": "Meine Oma ist sehr alt = my grandma is very old",
      "vocab_hints": [
        {
          "word": "sehr",
          "translation": "very",
          "note": "the intensifier from earlier trail lessons"
        }
      ],
      "word_bank": [
        "Meine",
        "alt",
        "ist",
        "sehr",
        "weil",
        "Oma",
        "wir"
      ],
      "explanation": "die Oma → meine Oma: the feminine possessor — and alt closes the loop with Eltern, 'the elder ones', from lesson 5091.",
      "idea": "Meine Oma ist sehr alt = my grandma is very old",
      "idea_parts": [
        "Meine Oma ist sehr alt",
        "= my grandma is very old (verb in position 2)"
      ],
      "cues": [
        "Start with \"Meine\" and anchor \"Oma\" in position 2.",
        "Close the frame with \"alt\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Talk about the extended family using compounds, loans and nursery words with correct genders.",
    "use_example": {
      "german": "Meine Großeltern wohnen bei uns, und meine Cousine kommt oft.",
      "english": "My grandparents live with us, and my (female) cousin visits often."
    },
    "takeaway": "Großvater = compound, Onkel/Tante = shared French loans, Oma/Opa = honest memorize, Enkel ↔ ankle, Geschwister = ge- + Schwester.",
    "curiosity_teaser": "The clan branch ends here — the map's remaining sprigs and the capstone reading still wait."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Extended Clan (Meine Oma ist sehr alt = my grandma is very old):",
    "target_answer": "Meine Oma ist sehr alt",
    "word_bank": [
      "heute",
      "alt",
      "ist",
      "Oma",
      "nicht",
      "sehr",
      "Meine"
    ],
    "explanation": "Re-assembling \"Meine Oma ist sehr alt\" from scratch locks in the structural pattern of The Extended Clan without relying on short-term echo."
  }
};

export default lesson;
