import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9004,
  "slug": "story-s4-die-verspaetung",
  "title": "Die Verspätung",
  "subtitle": "Lukas is late to a birthday — and the reason is not what Sarah thinks",
  "phase": 3,
  "spineStory": true,
  "label": "s4",
  "shift_categories": [],
  "word_ids": [
    "entschuldigung",
    "stunde",
    "spät",
    "regen",
    "nass",
    "bus",
    "zug",
    "nachbar"
  ],
  "table_word_ids": [
    "geschenk",
    "entschuldigung",
    "stunde",
    "spät",
    "regen",
    "nass",
    "bus",
    "zug",
    "nachbar",
    "geburtstag",
    "freund",
    "tasche",
    "uhr",
    "stadt",
    "straße",
    "wetter",
    "blau"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "A small misunderstanding drives this story. Lukas is late, Sarah looks angry, and then she laughs. Read for the reason Lukas is late and for the moment the mood changes. The past tense is Perfekt again, with a few simple past forms (war, hatte).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Stift & Busfahrer",
        "content": "der Stift = pen; der Busfahrer = bus driver. Both are glossed here because the story needs them and they are not in the lesson's word bank."
      },
      {
        "marker": "2",
        "title": "Es tut mir leid",
        "content": "Es tut mir leid = I am sorry (literally: it does me sorrow). A fixed apology chunk; no need to build it from parts yet."
      },
      {
        "marker": "3",
        "title": "Spaß",
        "content": "der Spaß = fun/joke. Ich habe nur Spaß gemacht = I was only joking. It tells you Sarah's anger was not real."
      },
      {
        "marker": "4",
        "title": "warten & sich entscheiden",
        "content": "warten = to wait; sich entscheiden = to decide. Lukas wartet auf der Straße und entscheidet sich zu laufen."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Lukas will zu seiner Freundin Sarah fahren. Sarah ist seine Nachbarin, und sie hat heute Geburtstag. In seiner Tasche ist ein Geschenk: ein schöner, blauer Stift.\n\nLukas sitzt im Bus und schaut auf die Uhr. Es ist schon spät. Plötzlich bleibt der Bus stehen. Der Busfahrer sagt: „Der Bus ist kaputt. Alle müssen aussteigen.“\n\nLukas steigt aus und wartet auf der Straße. Eine Frau sagt: „Ich weiß nicht, ob heute noch ein Bus kommt.“ Lukas entscheidet sich zu laufen. Es regnet stark, und er wird ganz nass.\n\nEndlich kommt er an. Sarah öffnet die Tür. „Warum bist du so spät?“, fragt sie. „Entschuldigung! Der Bus war kaputt“, sagt Lukas. Sarah lacht. „Das ist kein Problem. Ich habe nur Spaß gemacht. Du bist ganz nass!“\n\nAm Abend sind sie zusammen, und Lukas ist froh.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5342_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Lukas wants to go to his friend Sarah.",
          "german": "Lukas will zu seiner Freundin Sarah fahren."
        },
        {
          "id": "m2",
          "english": "Today is her birthday.",
          "german": "Sie hat heute Geburtstag."
        },
        {
          "id": "m3",
          "english": "Suddenly the bus stops.",
          "german": "Plötzlich bleibt der Bus stehen."
        },
        {
          "id": "m4",
          "english": "The bus is broken.",
          "german": "Der Bus ist kaputt."
        },
        {
          "id": "m5",
          "english": "Lukas decides to walk.",
          "german": "Lukas entscheidet sich zu laufen."
        },
        {
          "id": "m6",
          "english": "Sarah laughs and says it is no problem.",
          "german": "Sarah lacht und sagt, dass es kein Problem ist."
        }
      ],
      "target_answer": "Lukas will zu seiner Freundin Sarah fahren., Sie hat heute Geburtstag., Plötzlich bleibt der Bus stehen., Der Bus ist kaputt., Lukas entscheidet sich zu laufen., Sarah lacht und sagt, dass es kein Problem ist.",
      "meaning": "the story beats: the birthday, the broken bus, the walk, the joke",
      "explanation": "The six beats set up a problem (late), a cause (broken bus), and a twist (Sarah was joking)."
    },
    {
      "id": "l5342_e2",
      "type": "shift_select",
      "prompt": "Why is Lukas on the bus?",
      "options": [
        "He is going to Sarah's birthday.",
        "He is going to work.",
        "He is going home.",
        "He is going to the bakery."
      ],
      "target_answer": "He is going to Sarah's birthday.",
      "meaning": "Lukas is on his way to Sarah's birthday.",
      "explanation": "The first two sentences name the destination and the occasion: zu seiner Freundin Sarah ... Sie hat heute Geburtstag."
    },
    {
      "id": "l5342_e3",
      "type": "shift_select",
      "prompt": "What is the problem with the bus?",
      "options": [
        "It is broken.",
        "It is late.",
        "It is full.",
        "It is going the wrong way."
      ],
      "target_answer": "It is broken.",
      "meaning": "The bus breaks down, so everyone has to get off.",
      "explanation": "The driver says Der Bus ist kaputt. The delay is a result of the breakdown, not a separate problem."
    },
    {
      "id": "l5342_e4",
      "type": "shift_select",
      "prompt": "Why is Lukas wet?",
      "options": [
        "It is raining and he walks.",
        "He fell into a river.",
        "He washed his face.",
        "Sarah threw water on him."
      ],
      "target_answer": "It is raining and he walks.",
      "meaning": "Lukas walks through the rain, so he arrives wet.",
      "explanation": "Es regnet stark, und er wird ganz nass comes directly after his decision to walk. Cause and result sit in one sentence."
    },
    {
      "id": "l5342_e5",
      "type": "literal_gloss",
      "prompt": "Which English follows the German words most closely?",
      "german": "Er kommt zu spät.",
      "natural": "He arrives too late.",
      "options": [
        "He comes too late",
        "He arrives too late",
        "He comes too early",
        "He comes too fast"
      ],
      "target_answer": "He comes too late",
      "meaning": "He arrives too late.",
      "explanation": "German kommen covers both 'come' and 'arrive'. zu spät is 'too late'. The literal English 'comes too late' is the bridge to the natural 'arrives too late'."
    }
  ],
  "twist": {
    "prompt": "Without looking back — say in German: 'The man arrived too late.'",
    "target_answer": "Der Mann ist zu spät gekommen",
    "word_bank": [
      "Der",
      "Mann",
      "ist",
      "zu",
      "spät",
      "gekommen",
      "Bus"
    ],
    "explanation": "Motion verbs like kommen take sein in the Perfekt: Der Mann ist ... gekommen. zu spät stays as the fixed time phrase."
  },
  "summary": {
    "outcome": "Read a Perfekt story with a misunderstanding and answer cause and inference questions.",
    "use_example": {
      "german": "Der Bus war kaputt, und Lukas ist zu spät gekommen.",
      "english": "The bus was broken, and Lukas arrived too late."
    },
    "takeaway": "A story's mood can turn on one sentence. Sarah's laughter changes 'angry girlfriend' into 'joke' — read for that turn.",
    "curiosity_teaser": "Next: a library, a fallen book, and a letter about a treasure."
  }
};

export default lesson;
