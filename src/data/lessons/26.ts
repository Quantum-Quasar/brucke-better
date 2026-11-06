import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 26,
  "slug": "hidden-shifts-gh-ch-y-g",
  "title": "Hidden Shifts II: GH→CH & Y→G",
  "subtitle": "The inversion lessons: Nacht↔night, Licht↔light, sagen↔say, gestern↔yesterday",
  "phase": 3,
  "shift_categories": [
    "y_gh_to_g_ch"
  ],
  "word_ids": [
    "nacht",
    "licht",
    "lachen",
    "tochter",
    "sagen",
    "gestern",
    "acht",
    "recht",
    "macht"
  ],
  "table_word_ids": [
    "nacht",
    "licht",
    "sagen",
    "gestern",
    "acht",
    "recht",
    "lachen",
    "tochter",
    "macht",
    "nagel",
    "bär",
    "bitter",
    "treppe",
    "see",
    "gefühl",
    "gemein"
  ],
  "hook": {
    "title": "The Ghost Letters",
    "content": "English words walk around with dead letters: night, light, eight, right, daughter. The gh was once a real sound — a throaty ch, exactly like German's. English spelled it, then stopped saying it. German never stopped: Nacht, Licht, acht, Recht, Tochter. The same inversion runs on the y-side: English softened the ancient g into y (say, day, yesterday), German kept it: sagen, Tag, gestern. You have collected these pairs all trail long — today is the payoff: the complete ghost-letter map, every silent gh in English answered by a sounding ch in German.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "English Did Both Directions",
        "content": "English vocalized g→y (say, day, way) and silenced gh (night, daughter). German did neither: it kept sagen's g and Nacht's ch. So German is, in both cases, the conservative sibling — the archive where the old sounds still play."
      }
    ]
  },
  "pattern": {
    "title": "The Complete Ghost Map",
    "content": "gh → ch: night ↔ Nacht, light ↔ Licht, laugh ↔ lachen, daughter ↔ Tochter, eight ↔ acht, right ↔ Recht, might ↔ Macht, knight ↔ Knecht (the word that got noble in English and stayed farmhand in German!), freight ↔ Fracht. y → g: say ↔ sagen, way ↔ Weg, yesterday ↔ gestern, eye ↔ Auge (the g hides mid-word). rain ↔ Regen, nail ↔ Nagel. Double-shift royalty: Tochter carries D→T AND gh→ch; dachte/thought closes the loop you opened in the suppletion lesson. This completes all nine Atlas families — the full decode engine.",
    "footnotes": [],
    "linguist_note": "English 'laugh' still spells the gh but pronounces an f — a last derangement. German lachen kept the original [x]. When you say 'ich lache', you are pronouncing what 'I laugh' looked like in 700 AD."
  },
  "exercises": [
    {
      "id": "l26_e1",
      "type": "matching_pairs",
      "prompt": "The ghost map — match each silent-gh word with its sounding ch twin:",
      "matching_pairs": [
        {
          "id": "gc1",
          "english": "night",
          "german": "Nacht"
        },
        {
          "id": "gc2",
          "english": "light",
          "german": "Licht"
        },
        {
          "id": "gc3",
          "english": "eight",
          "german": "acht"
        },
        {
          "id": "gc4",
          "english": "daughter",
          "german": "Tochter"
        }
      ],
      "target_answer": "Nacht, Licht, acht, Tochter",
      "meaning": "night, light, eight, daughter",
      "explanation": "English silenced the gh; German still sounds it as ch. The ghost letters were always German ch."
    },
    {
      "id": "l26_e2",
      "type": "shift_select",
      "prompt": "Why does English 'say' and German 'sagen' start differently?",
      "options": [
        "English vocalized the ancient g into y; German kept the g",
        "The words are unrelated",
        "sagen is a French loan",
        "say is a Norse import"
      ],
      "target_answer": "English vocalized the ancient g into y; German kept the g",
      "meaning": "say ↔ sagen: the y→g inversion",
      "explanation": "Same word, two pronunciations: English wore the g down to y (say, day, way); German kept it audible."
    },
    {
      "id": "l26_e3",
      "type": "shift_select",
      "prompt": "Which TWO shifts connect 'daughter' and 'Tochter'?",
      "options": [
        "Y → G and gh → ch",
        "D → T and gh → ch",
        "D → T and P → F",
        "TH → D and K → CH"
      ],
      "target_answer": "D → T and gh → ch",
      "meaning": "Tochter: the double-shift royalty",
      "explanation": "The d hardened to t AND the guttural survived as ch — daughter is the flagship of the double-shift fleet."
    },
    {
      "id": "l26_e4",
      "type": "reverse_cognate",
      "prompt": "What English time word is the twin of 'gestern'?",
      "target_answer": "yesterday",
      "meaning": "yesterday ↔ gestern (y → g)",
      "explanation": "yester- and gestern are one word split by the y/g inversion — the same root as say/sagen."
    },
    {
      "id": "l26_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're saying goodnight at a friend's place: good night — the light is out",
      "cues": [
        "Both ghost-map words sound again in German: Nacht (night) and Licht (light) — gh → ch — then ist aus closes it"
      ],
      "target_answer": "Gute Nacht das Licht ist aus",
      "meaning": "Good night! The light is out",
      "affirmation": "You made the silent letters sound — Nacht and Licht built straight from night and light.",
      "vocab_hints": [
        {
          "word": "aus",
          "translation": "out / off",
          "note": "aus ↔ out — the T→S twin, here doing 'off' duty"
        }
      ],
      "word_bank": [
        "aus",
        "Licht",
        "gut",
        "Nacht",
        "ist",
        "das",
        "Gute"
      ],
      "explanation": "Two ghost-map words in one goodnight: Nacht and Licht — gh → ch, both still sounding."
    }
  ],
  "summary": {
    "outcome": "Read every silent gh as German ch and every English y as German g — all nine Atlas families complete.",
    "use_example": {
      "german": "Gute Nacht — das Licht ist aus.",
      "english": "Good night — the light is out."
    },
    "takeaway": "gh→ch (Nacht, Licht, acht) and y→g (sagen, gestern): the ghost letters are German sounds English stopped pronouncing.",
    "curiosity_teaser": "Next: Nacht & Licht — the gh→ch inversion: the silent letters of night and light, still sounding in German."
  },
  "twist": {
    "prompt": "Check before bed: the light is out → IS the light out? (The verb flips to the front.)",
    "target_answer": "Ist das Licht aus",
    "word_bank": [
      "Ist",
      "aus",
      "ist",
      "das",
      "Licht"
    ],
    "explanation": "The verb takes position 1 — the ancient flip from topic 13, still free of do. Word for word: 'Is the light out?'"
  }
};

export default lesson;
