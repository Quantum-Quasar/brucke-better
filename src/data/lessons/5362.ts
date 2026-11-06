import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5362,
  "slug": "story-der-ausflug-zum-see",
  "title": "Der Ausflug zum See",
  "subtitle": "A family trip to a lake: sun, swimming, rain, and a tree",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "ausflug",
    "wetter",
    "sonne",
    "regen",
    "baum",
    "familie",
    "kind",
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
    "ausflug",
    "see",
    "wetter",
    "sonne",
    "regen",
    "baum",
    "familie",
    "kind",
    "wasser",
    "fluss",
    "berg",
    "auto",
    "schwimmen",
    "wochenende",
    "schön",
    "müde",
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
    "content": "A Perfekt family story with a simple shape: a good morning, a rainy afternoon, a warm ending. Watch the comparisons — größer als, schöner — and the weather words. The story is about a trip to a lake, not the sea.",
    "footnotes": [
      {
        "marker": "1",
        "title": "der See / die See",
        "content": "der See = lake; die See = sea. The article changes the meaning, so the story uses der See and the neuter pronoun pattern around it."
      },
      {
        "marker": "2",
        "title": "schwimmen",
        "content": "schwimmen = to swim. Die Kinder sind im Wasser geschwommen = the children swam in the water. The participle is geschwommen."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Am Wochenende hat Familie Braun einen Ausflug zum See gemacht. Sie sind mit dem Auto gefahren. Der See ist größer als der Fluss in der Stadt.\n\nDas Wetter war schön, und die Sonne schien. Die Kinder sind im Wasser geschwommen. Sie haben viel gelacht.\n\nAm Nachmittag hat es geregnet. Die Familie hat unter einem Baum gewartet. Der Regen war stärker als am Morgen.\n\nDann sind sie nach Hause gefahren. Der Ausflug war nicht perfekt, aber schön. Die Kinder waren müde und glücklich.\n\nDie Kinder waren stolz und voller Freude. Das Wetter war richtig gut, nicht falsch. Die Decke war sauber, der Korb war leer, und die Tür des Autos war offen. Die Eltern waren nett, die Kinder waren nicht wütend.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5362_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "The Braun family took a trip to the lake.",
          "german": "Familie Braun hat einen Ausflug zum See gemacht."
        },
        {
          "id": "m2",
          "english": "They drove by car.",
          "german": "Sie sind mit dem Auto gefahren."
        },
        {
          "id": "m3",
          "english": "The lake is bigger than the river.",
          "german": "Der See ist größer als der Fluss."
        },
        {
          "id": "m4",
          "english": "The children swam in the water.",
          "german": "Die Kinder sind im Wasser geschwommen."
        },
        {
          "id": "m5",
          "english": "In the afternoon it rained.",
          "german": "Am Nachmittag hat es geregnet."
        },
        {
          "id": "m6",
          "english": "The family waited under a tree.",
          "german": "Die Familie hat unter einem Baum gewartet."
        }
      ],
      "target_answer": "Familie Braun hat einen Ausflug zum See gemacht., Sie sind mit dem Auto gefahren., Der See ist größer als der Fluss., Die Kinder sind im Wasser geschwommen., Am Nachmittag hat es geregnet., Die Familie hat unter einem Baum gewartet.",
      "meaning": "the trip's sequence: lake, car, swimming, rain, tree, home",
      "explanation": "The six beats are a weather arc: a sunny morning, a swim, a rainy afternoon, shelter, and a warm ending."
    },
    {
      "id": "l5362_e2",
      "type": "shift_select",
      "prompt": "Where did the family go?",
      "options": [
        "To a lake",
        "To a mountain",
        "To the city",
        "To a museum"
      ],
      "target_answer": "To a lake",
      "meaning": "The family went to a lake.",
      "explanation": "Der Ausflug zum See — zum See means to the lake (der See). The mountain (der Berg) is in the word bank only as a contrast."
    },
    {
      "id": "l5362_e3",
      "type": "shift_select",
      "prompt": "What did the children do in the water?",
      "options": [
        "They swam",
        "They climbed a tree",
        "They read books",
        "They cooked dinner"
      ],
      "target_answer": "They swam",
      "meaning": "The children swam in the water.",
      "explanation": "Die Kinder sind im Wasser geschwommen. schwimmen is the verb; geschwommen is its participle."
    },
    {
      "id": "l5362_e4",
      "type": "shift_select",
      "prompt": "Why did the family wait under a tree?",
      "options": [
        "It rained",
        "It was too hot",
        "They were hungry",
        "They lost the car"
      ],
      "target_answer": "It rained",
      "meaning": "They waited under the tree because it started to rain.",
      "explanation": "Am Nachmittag hat es geregnet. Die Familie hat unter einem Baum gewartet. The rain causes the waiting."
    },
    {
      "id": "l5362_e5",
      "type": "literal_gloss",
      "prompt": "Which English follows the German words most closely?",
      "german": "Der See ist größer als der Fluss.",
      "natural": "The lake is bigger than the river.",
      "options": [
        "The lake is bigger than the river",
        "The river is bigger than the lake",
        "The lake is as big as the river",
        "The lake is smaller than the river"
      ],
      "target_answer": "The lake is bigger than the river",
      "meaning": "The lake is bigger than the river.",
      "explanation": "größer is the comparative of groß; als marks the second item. The river is the smaller one here."
    }
  ],
  "twist": {
    "prompt": "Without looking back — say in German: 'The lake is bigger than the river.'",
    "target_answer": "Der See ist größer als der Fluss",
    "word_bank": [
      "Der",
      "See",
      "ist",
      "größer",
      "als",
      "der",
      "Fluss",
      "Berg"
    ],
    "explanation": "Comparative + als: Der See ist größer als der Fluss. The mountain (Berg) is a distractor; the comparison is lake versus river."
  },
  "summary": {
    "outcome": "Read a Perfekt family-trip story with comparatives and weather words, then answer why and what questions.",
    "use_example": {
      "german": "Der See ist größer als der Fluss, und am Nachmittag hat es geregnet.",
      "english": "The lake is bigger than the river, and in the afternoon it rained."
    },
    "takeaway": "Weather and comparisons give a trip story its shape: a sunny morning, a rainy afternoon, and a warm conclusion.",
    "curiosity_teaser": "You have finished the optional reading library. Re-read any passage for the pleasure of recognising the machinery."
  }
};

export default lesson;
