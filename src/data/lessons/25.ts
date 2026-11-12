import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 25,
  "slug": "hidden-shifts-v-to-b",
  "title": "Hidden Shifts I: V → B",
  "subtitle": "The quiet family: geben↔give, über↔over, sieben↔seven, Biber↔beaver",
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
    "kalb"
  ],
  "table_word_ids": [
    "geben",
    "leben",
    "lieben",
    "sieben",
    "über",
    "halb",
    "glauben",
    "silber",
    "gelb",
    "kalb",
    "treiben",
    "menü",
    "möbel",
    "birke",
    "prozent",
    "polizei"
  ],
  "hook": {
    "title": "The Quiet Family",
    "content": "Some shifts make noise — PF explodes, ch growls. The V→B family whispers. Where English kept an ancient v or f between vowels, German closed it into a b: give → geben, live → leben, love → lieben, over → über, seven → sieben, half → halb. The consonant simply shut its mouth. English spells the difference with v, German with b — one letter, one gesture, a whole family of the most intimate words in either language: giving, living, loving. German hid the family so well you never noticed it was the same word.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Beaver Test",
        "content": "The animal names prove it is a law, not a coincidence: beaver ↔ Biber, liver ↔ Leber, calf ↔ Kalb, silver ↔ Silber. Four unrelated creatures and materials, one systematic consonant correspondence."
      }
    ]
  },
  "pattern": {
    "title": "Swap v for b, Hear the Verb",
    "content": "The verbs: give → geben, live → leben, love → lieben (and believe → glauben — the be- and the lieve both shifted!), drive → treiben (you drilled this one in the ablaut gallery). The numbers and measures: seven → sieben, half → halb. The colors and materials: yellow → gelb (double shift — the y too!), silver → Silber, leaf → Laub (foliage). The preposition you already own: over → über. Every one of these obeys the same quiet law: English v/f between vowels, German b.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “German V is English V.” It is English F: Vater is father. The safe test is to read a German V as an F and see whether an English word appears. If nothing does, leave it alone.",
    "linguist_note": "The direction is counterintuitive: German looks like it 'added' a b, but actually Proto-Germanic had a bilabial fricative *β where English wrote v/f and High German closed it to the stop b. Neither language changed its word — they pronounced the same sound differently, then spelled their habits."
  },
  "exercises": [
    {
      "id": "l25_e1",
      "type": "matching_pairs",
      "prompt": "Match the quiet family — swap v for b. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "vb1",
          "english": "give",
          "german": "geben"
        },
        {
          "id": "vb2",
          "english": "live",
          "german": "leben"
        },
        {
          "id": "vb3",
          "english": "love",
          "german": "lieben"
        },
        {
          "id": "vb4",
          "english": "seven",
          "german": "sieben"
        },
        {
          "id": "recall1",
          "german": "Das Buch ist lang",
          "english": "The book is long"
        },
        {
          "id": "recall1b",
          "german": "Das Glas ist voll",
          "english": "The glass is full"
        },
        {
          "id": "recall2",
          "german": "der Wein",
          "english": "the wine"
        },
        {
          "id": "recall3",
          "german": "das ist gelb",
          "english": "that is yellow"
        },
        {
          "id": "recall4",
          "german": "Wir können glauben",
          "english": "We can believe"
        }
      ],
      "target_answer": "geben, leben, lieben, sieben, Das Buch ist lang, Das Glas ist voll, der Wein, das ist gelb, Wir können glauben",
      "meaning": "give; live; love; seven; The book is long; The glass is full; the wine; that is yellow; We can believe",
      "explanation": "The most intimate verbs in both languages are one word each — with the consonant shut quietly into b."
    },
    {
      "id": "l25_e2",
      "type": "shift_select",
      "prompt": "Before the new family, which familiar pair uses a different clue?",
      "options": [
        "thumb → Daumen",
        "brother → Bruder",
        "help → helfen",
        "thank → danken"
      ],
      "target_answer": "help → helfen",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Thank, thumb and brother use TH → D. Help → helfen uses P → F."
    },
    {
      "id": "l25_e3",
      "type": "shift_select",
      "prompt": "English 'believe' and German 'glauben' — why are they twins?",
      "options": [
        "Pure coincidence",
        "Both are Latin loans",
        "glauben comes from English",
        "be- ↔ ge- and the lieve/laube root — both elements correspond"
      ],
      "target_answer": "be- ↔ ge- and the lieve/laube root — both elements correspond",
      "meaning": "believe ↔ glauben, element by element",
      "explanation": "The prefix pair and the v→b root both line up: two languages building the same word from the same parts."
    },
    {
      "id": "l25_e4",
      "type": "reverse_cognate",
      "prompt": "What English metal is the twin of 'Silber'?",
      "target_answer": "silver",
      "meaning": "silver ↔ Silber (v → b)",
      "explanation": "The v closed to b — the same law that made give/geben. Silver, Silber: one metal, one word."
    },
    {
      "id": "l25_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "you're explaining why you stay: you live in Germany and you love it",
      "cues": [
        "Two quiet-family verbs: leben (live) and lieben (love) — English v between vowels became b, and wir takes -en on both"
      ],
      "target_answer": "Wir leben in Deutschland und wir lieben es",
      "meaning": "We live in Germany and we love it",
      "affirmation": "You heard the English v hiding inside both b's — leben and lieben in one breath, the quiet family.",
      "vocab_hints": [
        {
          "word": "es",
          "translation": "it",
          "note": "es ↔ it — the twin pronoun from the negation lesson"
        }
      ],
      "word_bank": [
        "liebe",
        "Deutschland",
        "Wir",
        "und",
        "es",
        "in",
        "wir",
        "lieben",
        "leben"
      ],
      "explanation": "Two quiet-family verbs in one sentence: leben and lieben — living and loving, both shifted v's."
    }
  ],
  "summary": {
    "outcome": "Recognize the V→B family across verbs, numbers, and materials.",
    "use_example": {
      "german": "Wir leben in Deutschland und wir lieben es.",
      "english": "We live in Germany and we love it."
    },
    "takeaway": "English v/f between vowels is German b: give/geben, love/lieben, over/über, seven/sieben — the quiet family.",
    "curiosity_teaser": "Next: geben's full dynasty — Gabe, vergeben, and the Perfekt forms gab and gegeben."
  },
  "twist": {
    "prompt": "Rainy week — walk it back: we live in Germany and we love it becomes ...and we do NOT love it.",
    "target_answer": "Wir leben in Deutschland und wir lieben es nicht",
    "word_bank": [
      "lieben",
      "in",
      "es",
      "wir",
      "Deutschland",
      "nicht",
      "leben",
      "und",
      "Wir"
    ],
    "explanation": "nicht closes the clause where the action dies — after the object it negates. Word for word: '...and we love it not.'"
  }
};

export default lesson;
