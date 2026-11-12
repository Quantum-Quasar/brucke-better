import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2002,
  "slug": "mir-dir-ihm-pronoun-gym",
  "title": "mir / dir / ihm Pronoun Gym",
  "subtitle": "Twenty give/tell/thank drills with the receiver pronouns",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mir",
    "dir",
    "ihm",
    "geben",
    "danken",
    "helfen",
    "gefallen",
    "sagen"
  ],
  "table_word_ids": [
    "mir",
    "dir",
    "ihm",
    "geben",
    "danken",
    "helfen",
    "gefallen",
    "sagen",
    "grad",
    "kasse",
    "bohne",
    "klug",
    "gummi",
    "apotheke",
    "postkarte"
  ],
  "hook": {
    "title": "The Receiver Circuit",
    "content": "Three pronouns, four verbs, real sentences. Gib mir das Buch. Ich danke dir. Ich helfe ihm. Es gefällt mir. That is the entire gym — and every rep is a sentence Germans say daily. The skill is reflex-speed: receiver in the sentence? → mir/dir/ihm, not mich/dich/ihn. The trap is that English uses the SAME pronoun forms for both jobs (I thank you / you thank me), so your instinct reaches for the accusative. The circuit retrains it.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The One-Syllable Rule of Thumb",
        "content": "After geben, danken, helfen, gefallen, sagen (to!), and the prepositions mit, bei, zu, von, aus, nach, seit — the receiver answers in dative: mir, dir, ihm, ihr, uns, euch, ihnen. Notice mir/dir both end in -r: the dative's signature, the r of 'for'."
      }
    ]
  },
  "pattern": {
    "title": "The Circuit",
    "content": "Round one — giving: Gib mir das Salz. Er gibt ihr das Buch (ihr — to her, the feminine dative). Round two — thanking: Ich danke dir und du dankst mir. Round three — helping: Wir helfen ihm. Round four — pleasing: Das gefällt mir (that falls well to me — 'I like that'). Round five — commanding: Sag mir! — tell me! Five rounds, three pronouns, permanent reflex.",
    "footnotes": [],
    "linguist_note": "The full dative pronoun set: mir, dir, ihm, ihr (to her), uns, euch, ihnen. English mirrors it scattered: me, thee, him, her, us, you, 'em — the same case, half-buried."
  },
  "exercises": [
    {
      "id": "l2002_e1",
      "type": "matching_pairs",
      "prompt": "Circuit round one — match the receiver sentences. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "pg1",
          "english": "Give me the book",
          "german": "Gib mir das Buch"
        },
        {
          "id": "pg2",
          "english": "I thank you (thee)",
          "german": "Ich danke dir"
        },
        {
          "id": "pg3",
          "english": "We help him",
          "german": "Wir helfen ihm"
        },
        {
          "id": "pg4",
          "english": "I like that (it pleases me)",
          "german": "Das gefällt mir"
        },
        {
          "id": "recall1",
          "german": "Glück und Mut",
          "english": "luck and courage"
        },
        {
          "id": "recall2",
          "german": "mein Wunsch",
          "english": "my wish"
        },
        {
          "id": "recall3",
          "german": "Wir können gefallen",
          "english": "We can please"
        }
      ],
      "target_answer": "Gib mir das Buch, Ich danke dir, Wir helfen ihm, Das gefällt mir, Glück und Mut, mein Wunsch, Wir können gefallen",
      "meaning": "Give me the book; I thank you (thee); We help him; I like that (it pleases me); luck and courage; my wish; We can please",
      "explanation": "Every receiver takes the dative: mir, dir, ihm — the giving case in action."
    },
    {
      "id": "l2002_e2",
      "type": "shift_select",
      "prompt": "Trap check: 'Ich sehe ___.' (I see HIM — direct object!):",
      "options": [
        "ihres",
        "ihm",
        "ihn",
        "ihnen"
      ],
      "target_answer": "ihn",
      "meaning": "Ich sehe ihn — accusative (him)",
      "explanation": "sehen acts directly on its object — accusative ihn. helpen-style receiver verbs take ihm; seeing takes ihn."
    },
    {
      "id": "l2002_e3",
      "type": "shift_select",
      "prompt": "'Ich helfe ___.' (I help HER — die Frau):",
      "options": [
        "sie",
        "ihnen",
        "ihm",
        "ihr"
      ],
      "target_answer": "ihr",
      "meaning": "Ich helfe ihr = I help her (to-her)",
      "explanation": "ihr is the feminine dative — 'to her'. helfen demands it; sie would be the accusative."
    },
    {
      "id": "l2002_e4",
      "type": "variant_english",
      "prompt": "Select EVERY honest English rendering of this Dative sentence:",
      "german": "Ich gebe dem Bruder das Buch",
      "renderings": [
        "I give the brother the book",
        "I give the book to the brother",
        "I am giving the brother the book"
      ],
      "traps": [
        "The brother gives me the book",
        "I gave the brother the book"
      ],
      "target_answer": "I give the brother the book",
      "meaning": "I give the brother the book",
      "explanation": "'dem Bruder' carries the 'to the brother' role inside the article 'dem' itself — English can express it either by word order or with 'to'. [Ref: Sie hilft ihm heute]"
    },
    {
      "id": "l2002_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Give me the salt please\"",
      "target_answer": "Gib mir das Salz bitte",
      "meaning": "Give me the salt please",
      "vocab_hints": [
        {
          "word": "Gib",
          "translation": "give! (du command form)",
          "note": "geben → gib! — the command chops the -en; with e-_added: Gib mir!"
        }
      ],
      "word_bank": [
        "Gib",
        "Salz",
        "das",
        "ohne",
        "heute",
        "mir",
        "bitte"
      ],
      "explanation": "Command + dative receiver + accusative thing + bitte — the four-part table sentence of every German kitchen.",
      "idea": "Give me the salt please",
      "idea_parts": [
        "Give me",
        "the salt please (verb in position 2)"
      ],
      "cues": [
        "Start with \"Gib\" and anchor \"mir\" in position 2.",
        "Close the frame with \"bitte\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Use mir/dir/ihm/ihr/Ihnen at reflex speed with geben, danken, helfen, gefallen.",
    "use_example": {
      "german": "Gib mir das Salz bitte.",
      "english": "Give me the salt please."
    },
    "takeaway": "Receiver in the sentence → dative pronoun. Sehen takes ihn; helfen takes ihm — the verb decides, the case obeys.",
    "curiosity_teaser": "Next: Dative Verbs — helfen, danken, gefallen — the club that refuses the accusative."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from mir / dir / ihm Pronoun Gym (Give me the salt please):",
    "target_answer": "Gib mir das Salz bitte",
    "word_bank": [
      "nicht",
      "mir",
      "Gib",
      "heute",
      "Salz",
      "bitte",
      "das"
    ],
    "explanation": "Re-assembling \"Gib mir das Salz bitte\" from scratch locks in the structural pattern of mir / dir / ihm Pronoun Gym without relying on short-term echo."
  }
};

export default lesson;
