import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2502,
  "slug": "v-to-b-word-hunt",
  "title": "V→B Word Hunt",
  "subtitle": "Atlas-bridged derivation drills across the whole quiet family",
  "phase": 3,
  "shift_categories": [
    "v_to_b"
  ],
  "word_ids": [
    "geben",
    "leben",
    "lieben",
    "glauben",
    "sieben",
    "über",
    "halb",
    "silber",
    "gelb",
    "kalb",
    "leber",
    "laub",
    "rabe",
    "selbst",
    "lecker",
    "neu",
    "voll",
    "nass"
  ],
  "table_word_ids": [
    "geben",
    "leben",
    "lieben",
    "glauben",
    "über",
    "halb",
    "sieben",
    "silber",
    "gelb",
    "kalb",
    "leber",
    "laub",
    "rabe",
    "selbst",
    "lecker",
    "neu",
    "voll",
    "nass",
    "herbst",
    "überall"
  ],
  "hook": {
    "title": "The Hunt",
    "content": "The Atlas bridge card for this family lists every v→b word in the compendium — today you hunt them all. The verbs: geben, leben, lieben, glauben. The numbers and measures: sieben, halb. The preposition: über. The materials and creatures: Silber/silver, gelb/yellow, Kalb/calf, Leber/liver, Laub/leaf, Rabe/raven. Thirteen words, one law: English v/f between vowels, German b. The hunt's trick is direction — you can run it German→English (Silber → silver?) or English→German (heaven → Himmel is no pair — different family; only true v→b words answer).",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Raven's Test",
        "content": "Rabe ↔ raven is the cleanest proof of the law: an ordinary bird, an ordinary word, and the v/b correspondence perfectly preserved. When a law works on ravens, rivers, and livers, it is a law."
      }
    ]
  },
  "pattern": {
    "title": "The Hunt Grid",
    "content": "Grid one — verbs: give/geben, live/leben, love/lieben, believe/glauben (be↔ge + lieve/laube). Grid two — quantity: seven/sieben, half/halb. Grid three — position: over/über. Grid four — materials: silver/Silber, yellow/gelb (double shift — y→g too!). Grid five — bodies and beasts: calf/Kalb, liver/Leber, leaf/Laub, raven/Rabe, beaver/Biber. Each grid is a derivation drill: cover the German, produce it from the English by shifting the consonant, then check. This family is the Atlas's quietest constellation — and one of its most reliable.",
    "footnotes": [],
    "linguist_note": "gelb/yellow is the family's showcase: TWO shifts at once (y→g and v/f→b) on one color word. Proto-Germanic *gelwaz carried both — English vocalized the g, softened the w; German kept the g, closed the w. One word, two evolutionary reports."
  },
  "exercises": [
    {
      "id": "l2502_e1",
      "type": "matching_pairs",
      "prompt": "Hunt grid — match the bodies and beasts:",
      "matching_pairs": [
        {
          "id": "vh1",
          "english": "calf",
          "german": "das Kalb"
        },
        {
          "id": "vh2",
          "english": "liver",
          "german": "die Leber"
        },
        {
          "id": "vh3",
          "english": "leaf / foliage",
          "german": "das Laub"
        },
        {
          "id": "vh4",
          "english": "raven",
          "german": "der Rabe"
        },
        {
          "id": "vh5",
          "english": "self (the reflexive core)",
          "german": "selbst"
        }
      ],
      "target_answer": "das Kalb, die Leber, das Laub, der Rabe, selbst",
      "meaning": "calf, liver, leaf, raven, self",
      "explanation": "Unrelated meanings, one law: the English v/f closes to German b between vowels — and selbst is the law living in your own pronouns."
    },
    {
      "id": "l2502_e2",
      "type": "shift_select",
      "prompt": "The showcase: 'gelb' (yellow) carries TWO shifts. Which?",
      "options": [
        "Only v → b",
        "y → g and v/f → b",
        "T → Z and P → F",
        "TH → D and K → CH"
      ],
      "target_answer": "y → g and v/f → b",
      "meaning": "yellow ↔ gelb: a double-shift color",
      "explanation": "The g of gelb is the y English vocalized; the b is the w English softened. One color, two reports. And while you hunt: predicate adjectives stay bare — der Kuchen ist lecker, alles ist neu, der Kühlschrank ist voll, die Straße ist nass — endings belong to attributives, not predicates."
    },
    {
      "id": "l2502_e3",
      "type": "shift_select",
      "prompt": "Derivation drill: English 'believe' → German (both elements!):",
      "options": [
        "gelieben",
        "glaufen",
        "glauben",
        "beliben"
      ],
      "target_answer": "glauben",
      "meaning": "believe ↔ glauben",
      "explanation": "be- ↔ ge- and lieve → laube (v→b): both elements correspond. The prefix pairs ride together."
    },
    {
      "id": "l2502_e4",
      "type": "reverse_cognate",
      "prompt": "What English metal is the twin of 'Silber'?",
      "target_answer": "silver",
      "meaning": "silver ↔ Silber",
      "explanation": "The v closed to b — and silver/gelb shows the family covers materials as happily as verbs."
    },
    {
      "id": "l2502_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We believe, we live, we love' (the verbs' anthem)",
      "target_answer": "Wir glauben wir leben wir lieben",
      "meaning": "We believe, we live, we love",
      "word_bank": [
        "glauben",
        "Wir",
        "wir",
        "dem",
        "wir",
        "lieben",
        "hier",
        "leben"
      ],
      "explanation": "Three quiet-family verbs in one rhythm — the V→B family is where German keeps its heart-words."
    }
  ],
  "summary": {
    "outcome": "Derive the whole V→B family in both directions across five word grids.",
    "use_example": {
      "german": "Wir glauben, wir leben, wir lieben.",
      "english": "We believe, we live, we love."
    },
    "takeaway": "English v/f between vowels → German b: thirteen words from verbs to ravens, one law end to end.",
    "curiosity_teaser": "Next: Hidden Shifts II — gh→ch and y→g: the ghost-letter map, from Nacht/night to sagen/say."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from V→B Word Hunt (We believe, we live, we love):",
    "target_answer": "Wir glauben wir leben wir lieben",
    "word_bank": [
      "heute",
      "Wir",
      "nicht",
      "wir",
      "glauben",
      "lieben",
      "wir",
      "leben"
    ],
    "explanation": "Re-assembling \"Wir glauben wir leben wir lieben\" from scratch locks in the structural pattern of V→B Word Hunt without relying on short-term echo."
  }
};

export default lesson;
