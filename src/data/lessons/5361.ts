import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5361,
  "slug": "story-der-rote-schal",
  "title": "Der rote Schal",
  "subtitle": "A red scarf disappears at the market — and a stranger brings it back",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "schal",
    "rot",
    "markt",
    "junge",
    "finden",
    "suchen",
    "tasche",
    "liebe",
    "nett",
    "wütend",
    "stolz",
    "freude",
    "richtig",
    "falsch",
    "sauber",
    "leer",
    "offen"
  ],
  "table_word_ids": [
    "schal",
    "rot",
    "markt",
    "junge",
    "finden",
    "suchen",
    "danke",
    "tasche",
    "frau",
    "mann",
    "apfel",
    "tisch",
    "unter",
    "neben",
    "froh",
    "hund",
    "liebe",
    "nett",
    "wütend",
    "stolz",
    "freude",
    "richtig",
    "falsch",
    "sauber",
    "leer",
    "offen"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "A small everyday mystery: Mia is at the market, and her red scarf disappears. Follow three things — what she buys, where the scarf goes, and who finds it. The story stays in the present tense.",
    "footnotes": [
      {
        "marker": "1",
        "title": "tragen",
        "content": "tragen = to wear or carry. Sie trägt einen roten Schal = she is wearing a red scarf. The accusative object is einen roten Schal."
      },
      {
        "marker": "2",
        "title": "weg",
        "content": "weg = gone / away. Plötzlich ist der Schal weg = suddenly the scarf is gone. It is a picture-word, not a verb."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Mia ist auf dem Markt. Sie trägt einen roten Schal. Der Schal ist warm und weich.\n\nMia sieht einen Apfel und kauft ihn. Sie legt den Apfel in ihre Tasche. Dann sucht sie ihren Schal. Der Schal ist weg!\n\nMia sucht unter dem Tisch und neben der Tasche. Sie fragt eine Frau: „Haben Sie meinen Schal gesehen?“ Die Frau schüttelt den Kopf.\n\nDa kommt ein Junge. Er hat einen roten Schal in der Hand. „Ist das dein Schal?“, fragt er. „Ja! Danke!“, sagt Mia. Sie ist froh und lächelt.\n\nMia ist zuerst wütend, aber der Junge ist sehr nett. Jetzt ist sie stolz und voller Freude. Der Schal ist rot und sauber, ihre Tasche ist leer, und die Tür des Ladens ist offen. „Das ist richtig, nicht falsch“, sagt sie.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5361_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Mia is at the market.",
          "german": "Mia ist auf dem Markt."
        },
        {
          "id": "m2",
          "english": "She is wearing a red scarf.",
          "german": "Sie trägt einen roten Schal."
        },
        {
          "id": "m3",
          "english": "Suddenly the scarf is gone.",
          "german": "Plötzlich ist der Schal weg."
        },
        {
          "id": "m4",
          "english": "A boy has a red scarf in his hand.",
          "german": "Ein Junge hat einen roten Schal in der Hand."
        },
        {
          "id": "m5",
          "english": "Is that your scarf?",
          "german": "Ist das dein Schal?"
        },
        {
          "id": "m6",
          "english": "Mia is glad and smiles.",
          "german": "Mia ist froh und lächelt."
        },
        {
          "id": "recall1",
          "german": "mein Brief",
          "english": "my letter"
        }
      ],
      "target_answer": "Mia ist auf dem Markt., Sie trägt einen roten Schal., Plötzlich ist der Schal weg., Ein Junge hat einen roten Schal in der Hand., Ist das dein Schal?, Mia ist froh und lächelt., mein Brief",
      "meaning": "Mia is at the market.; She is wearing a red scarf.; Suddenly the scarf is gone.; A boy has a red scarf in his hand.; Is that your scarf?; Mia is glad and smiles.; my letter",
      "explanation": "Six sentences carry the whole scene. The scarf is the object everyone is looking for."
    },
    {
      "id": "l5361_e2",
      "type": "shift_select",
      "prompt": "Where is Mia?",
      "options": [
        "At the market",
        "At the station",
        "In the park",
        "At school"
      ],
      "target_answer": "At the market",
      "meaning": "Mia is at the market.",
      "explanation": "The first sentence says Mia ist auf dem Markt."
    },
    {
      "id": "l5361_e3",
      "type": "shift_select",
      "prompt": "What does Mia lose?",
      "options": [
        "Her red scarf",
        "Her bag",
        "Her apple",
        "Her money"
      ],
      "target_answer": "Her red scarf",
      "meaning": "Mia loses her red scarf.",
      "explanation": "She buys an apple and puts it in her bag, but then Der Schal ist weg — the scarf is gone."
    },
    {
      "id": "l5361_e4",
      "type": "shift_select",
      "prompt": "Who finds the scarf?",
      "options": [
        "A boy",
        "A dog",
        "An old man",
        "A woman"
      ],
      "target_answer": "A boy",
      "meaning": "A boy finds the scarf and returns it.",
      "explanation": "Da kommt ein Junge. Er hat einen roten Schal in der Hand. The woman she asks only shakes her head."
    },
    {
      "id": "l5361_e5",
      "type": "literal_gloss",
      "prompt": "Which English follows the German words most closely?",
      "german": "Der Junge findet den Schal unter einem Tisch.",
      "natural": "The boy finds the scarf under a table.",
      "options": [
        "The boy finds the scarf under a table",
        "The scarf finds the boy under a table",
        "The boy loses the scarf under a table",
        "The boy finds the table under a scarf"
      ],
      "target_answer": "The boy finds the scarf under a table",
      "meaning": "The boy finds the scarf under a table.",
      "explanation": "finden takes an accusative object (den Schal), and unter einem Tisch is the dative place where it was hiding."
    }
  ],
  "twist": {
    "prompt": "Without looking back — say in German: 'The woman is at the market.'",
    "target_answer": "Die Frau ist auf dem Markt",
    "word_bank": [
      "Die",
      "Frau",
      "ist",
      "auf",
      "dem",
      "Markt",
      "Mann"
    ],
    "explanation": "auf dem Markt is the dative location. The man is a distractor; the story follows Mia and a boy."
  },
  "summary": {
    "outcome": "Read a short present-tense mystery and answer where, what, and who questions.",
    "use_example": {
      "german": "Mia sucht ihren Schal. Ein Junge findet ihn unter einem Tisch.",
      "english": "Mia looks for her scarf. A boy finds it under a table."
    },
    "takeaway": "A lost-object story is built from place words: auf dem Markt, in der Tasche, unter dem Tisch. Follow the places and the object reappears.",
    "curiosity_teaser": "Next optional reading: a family trip to a lake and a change in the weather."
  }
};

export default lesson;
