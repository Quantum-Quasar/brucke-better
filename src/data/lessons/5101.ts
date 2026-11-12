import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5101,
  "slug": "the-man-that-knows-double-duty",
  "title": "The Man That Knows: der/die/das Double Duty",
  "subtitle": "the relative pronoun is the demonstrative re-employed — and the verb drops to the basement",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "der",
    "die",
    "das",
    "mann",
    "frau",
    "kind",
    "lesen",
    "buch",
    "trinken",
    "kaffee",
    "lehrer",
    "person",
    "freundlich"
  ],
  "table_word_ids": [
    "der",
    "die",
    "das",
    "mann",
    "frau",
    "lesen",
    "kind",
    "buch",
    "trinken",
    "kaffee",
    "lehrer",
    "person",
    "freundlich",
    "soldat",
    "ab"
  ],
  "hook": {
    "title": "One Set of Pronouns, Three Jobs",
    "content": "der, die, das already work two jobs: the article (der Mann) and the demonstrative (das ist mein Haus? — that is my house, with das = that). Here comes the third: the relative pronoun. Der Mann, der Kaffee trinkt — the man WHO drinks coffee. English splits the job three ways — who for people, which for things, that for both — and Old English used þe and that. German refuses the split: the relative pronoun is just der/die/das, agreeing with whatever it points back to. And you already know the twist: inside the relative clause the verb drops to the basement — der Deutsch lernt — the same rule weil and dass enforce. Nothing new. Two systems you own, one new job description.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "þe, That, and the Missing who",
        "content": "Old English's relative pronoun was þe (and that) — the same þ- that hardened into German d-. who/which/that as relative pronouns is a later English development; the KJV still says 'the man that taught me'. German's der/die/das relatives are the old demonstratives doing day work, exactly as that once did."
      }
    ]
  },
  "pattern": {
    "title": "The Relative Clause Blueprint",
    "content": "Point back, take the gender, send the verb to the basement: Der Mann, der Kaffee trinkt (the man who drinks coffee — masculine, subject). Die Frau, die Deutsch lernt (the woman who learns German — feminine). Das Kind, das spielt (the child that plays — neuter). Die Bücher, die alt sind? — plurals borrow die too. With a direct object inside: Das Buch, das ich lese (the book that I read — the relative pronoun is the OBJECT of lese, but it still shows the gender of Buch: das). The basement rule fires every time: ..., der Kaffee trinkt, ..., die Deutsch lernt, ..., das ich lese. Comma before the relative clause — German demands it, and here the comma is grammar, not style.",
    "footnotes": [],
    "linguist_note": "English 'that' as a relative pronoun is the same word as German das — the demonstrative recruited into clause-linking. 'The book that I read' and 'das Buch, das ich lese' are one construction with one history."
  },
  "exercises": [
    {
      "id": "l5101_e1",
      "type": "matching_pairs",
      "prompt": "The third job — match each relative clause with its reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "rr1",
          "english": "the man who drinks coffee",
          "german": "der Mann, der Kaffee trinkt"
        },
        {
          "id": "rr2",
          "english": "the woman who learns German",
          "german": "die Frau, die Deutsch lernt"
        },
        {
          "id": "rr3",
          "english": "the book that I read",
          "german": "das Buch, das ich lese"
        },
        {
          "id": "rr4",
          "english": "the child that plays",
          "german": "das Kind, das spielt"
        },
        {
          "id": "rr5",
          "english": "the teacher who reads every day",
          "german": "der Lehrer, der jeden Tag liest"
        },
        {
          "id": "rr6",
          "english": "the person who comes first",
          "german": "die Person, die zuerst kommt"
        },
        {
          "id": "recall1",
          "german": "Wir wollen freundlich werden",
          "english": "We want to become friendly"
        },
        {
          "id": "recall2",
          "german": "Wir können lesen",
          "english": "We can read"
        }
      ],
      "target_answer": "der Mann, der Kaffee trinkt, die Frau, die Deutsch lernt, das Buch, das ich lese, das Kind, das spielt, der Lehrer, der jeden Tag liest, die Person, die zuerst kommt, Wir wollen freundlich werden, Wir können lesen",
      "meaning": "the man who drinks coffee; the woman who learns German; the book that I read; the child that plays; the teacher who reads every day; the person who comes first; We want to become friendly; We can read",
      "explanation": "The relative pronoun copies the noun's gender (der/die/das) — and the clause verb waits in the basement."
    },
    {
      "id": "l5101_e2",
      "type": "shift_select",
      "prompt": "Copy the feminine gender into the relative pronoun: 'Eine Frau, _____ Deutsch lernt.' (who):",
      "options": [
        "die",
        "den",
        "das",
        "der"
      ],
      "target_answer": "die",
      "meaning": "Die Frau, die Deutsch lernt",
      "explanation": "The relative pronoun agrees with Frau (feminine): die. It does not care about the main clause — only about its own noun."
    },
    {
      "id": "l5101_e3",
      "type": "shift_select",
      "prompt": "Subject check (masculine relative pronoun): 'Ein Mann, _____ Kaffee trinkt.' (who drinks):",
      "options": [
        "den",
        "der",
        "die",
        "dem"
      ],
      "target_answer": "der",
      "meaning": "Der Mann, der Kaffee trinkt",
      "explanation": "The relative pronoun is the SUBJECT of trinkt — subject job, nominative: der. (The object job gets its own lesson.) Whether it is der Lehrer or die Person doing the asking, the gender copy never wavers — asking freundlich changes the tone, not the pronoun."
    },
    {
      "id": "l5101_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the neuter relative clause phrase for 'The book that I am reading':",
      "tile_options": [
        "Buch",
        "das",
        "ich",
        "Das",
        "lese",
        "der",
        "den"
      ],
      "target_answer": "Das Buch, das ich lese",
      "meaning": "the book that I read",
      "explanation": "das points back to das Buch AND serves as the object of lese — one word, two jobs — while lese waits in the basement.",
      "vocab_hints": [
        {
          "word": "lesen",
          "translation": "to read",
          "note": "ich lese — the basement verb of das Buch, das ich lese"
        }
      ]
    },
    {
      "id": "l5101_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Der Mann, der Deutsch lernt, trinkt Kaffee\"",
      "target_answer": "Der Mann der Deutsch lernt trinkt Kaffee",
      "meaning": "Der Mann, der Deutsch lernt, trinkt Kaffee",
      "vocab_hints": [
        {
          "word": "lernt",
          "translation": "learns",
          "note": "the relative clause's verb — parked at the clause end"
        }
      ],
      "word_bank": [
        "Der",
        "Mann",
        "trinkt",
        "den",
        "Deutsch",
        "der",
        "Kaffee",
        "lernt",
        "haben"
      ],
      "explanation": "Two verbs, two floors: lernt closes the relative basement; trinkt holds position 2 of the main clause.",
      "idea": "Der Mann, der Deutsch lernt, trinkt Kaffee",
      "idea_parts": [
        "Der Mann, der",
        "Deutsch lernt, trinkt Kaffee (verb in position 2)"
      ],
      "cues": [
        "Start with \"Der\" and anchor \"Mann\" in position 2.",
        "Close the frame with \"Kaffee\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Build subject and object relative clauses with der/die/das and verb-final order.",
    "use_example": {
      "german": "Das Buch, das ich lese, ist alt.",
      "english": "The book that I am reading is old."
    },
    "takeaway": "The relative pronoun is der/die/das re-employed: copy the noun's gender, do the clause's job, park the verb at the end.",
    "curiosity_teaser": "Next: relatives in all cases — den and dem, the object and giving jobs, and English's own fossil whom."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Man That Knows: der/die/das Double Duty (Der Mann, der Deutsch lernt, trinkt Kaffee):",
    "target_answer": "Der Mann der Deutsch lernt trinkt Kaffee",
    "word_bank": [
      "Mann",
      "trinkt",
      "Kaffee",
      "heute",
      "Der",
      "der",
      "nicht",
      "Deutsch",
      "lernt"
    ],
    "explanation": "Re-assembling \"Der Mann der Deutsch lernt trinkt Kaffee\" from scratch locks in the structural pattern of The Man That Knows: der/die/das Double Duty without relying on short-term echo."
  }
};

export default lesson;
