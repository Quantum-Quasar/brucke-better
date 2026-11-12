import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5322,
  "slug": "story-der-kleine-hund",
  "title": "Der kleine Hund",
  "subtitle": "Anna finds a lost puppy and follows him to the person who misses him",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "wetter",
    "sonne",
    "bank",
    "entschuldigung",
    "laufen",
    "froh"
  ],
  "table_word_ids": [
    "hören",
    "wetter",
    "sonne",
    "himmel",
    "minute",
    "scheinen",
    "bank",
    "entschuldigung",
    "laufen",
    "froh",
    "hund",
    "garten",
    "baum",
    "alt",
    "mann",
    "frau",
    "süß",
    "müde",
    "glücklich",
    "allein",
    "sitzen",
    "stehen",
    "danke",
    "helfen",
    "finden",
    "suchen"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "A small dog is alone in the garden. Anna does not know whose dog he is, so she follows him. Watch the weather at the start and the old man at the end: they tell you what kind of day this is.",
    "footnotes": [
      {
        "marker": "1",
        "title": "folgen",
        "content": "folgen = to follow. It takes a dative person: Anna folgt ihm = Anna follows him. You only need to recognise it here."
      },
      {
        "marker": "2",
        "title": "Gern geschehen",
        "content": "Gern geschehen = 'you're welcome' (literally: gladly done). It is the polite answer to danke."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Es ist Samstag. Das Wetter ist schön. Die Sonne scheint, und der Himmel ist blau.\n\nAnna geht in den Garten. Dort sieht sie einen kleinen Hund. Der Hund ist braun und weiß. Er sitzt allein unter einem Baum.\n\nAnna geht langsam zu ihm. „Hallo, kleiner Hund“, sagt sie. Der Hund steht auf und läuft langsam. Anna folgt ihm.\n\nNach zwei Minuten sehen sie einen alten Mann. Er sitzt auf einer Bank und ist traurig. „Entschuldigung, ist das Ihr Hund?“, fragt Anna. Der Mann lächelt. „Ja! Vielen Dank! Ich habe ihn gesucht.“\n\nDer Hund läuft schnell zu dem Mann. Anna hört, wie der Mann lacht. Sie ist müde, aber sehr froh.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5322_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "The weather is beautiful.",
          "german": "Das Wetter ist schön."
        },
        {
          "id": "m2",
          "english": "The sun is shining.",
          "german": "Die Sonne scheint."
        },
        {
          "id": "m3",
          "english": "The dog sits alone under a tree.",
          "german": "Der Hund sitzt allein unter einem Baum."
        },
        {
          "id": "m4",
          "english": "Anna follows him.",
          "german": "Anna folgt ihm."
        },
        {
          "id": "m5",
          "english": "The old man sits on a bench.",
          "german": "Der alte Mann sitzt auf einer Bank."
        },
        {
          "id": "m6",
          "english": "Anna is tired but very glad.",
          "german": "Anna ist müde, aber sehr froh."
        },
        {
          "id": "recall1",
          "german": "der Tourist am Flughafen",
          "english": "the tourist at the airport"
        },
        {
          "id": "recall2",
          "german": "England ist ein Land",
          "english": "England is a country"
        },
        {
          "id": "recall3",
          "german": "Der Bäcker hilft dem Schüler",
          "english": "The baker helps the school pupil"
        },
        {
          "id": "recall4",
          "german": "der Arbeiter",
          "english": "the worker"
        }
      ],
      "target_answer": "Das Wetter ist schön., Die Sonne scheint., Der Hund sitzt allein unter einem Baum., Anna folgt ihm., Der alte Mann sitzt auf einer Bank., Anna ist müde, aber sehr froh., der Tourist am Flughafen, England ist ein Land, Der Bäcker hilft dem Schüler, der Arbeiter",
      "meaning": "The weather is beautiful.; The sun is shining.; The dog sits alone under a tree.; Anna follows him.; The old man sits on a bench.; Anna is tired but very glad.; the tourist at the airport; England is a country; The baker helps the school pupil; the worker",
      "explanation": "The weather opens the story, the dog moves it, and the old man resolves it. Six beats, one small adventure."
    },
    {
      "id": "l5322_e2",
      "type": "shift_select",
      "prompt": "Where does Anna find the dog?",
      "options": [
        "In the garden",
        "At the market",
        "In the city",
        "In a café"
      ],
      "target_answer": "In the garden",
      "meaning": "Anna meets the dog in the garden.",
      "explanation": "The second paragraph begins Anna geht in den Garten. Dort sieht sie einen kleinen Hund."
    },
    {
      "id": "l5322_e3",
      "type": "shift_select",
      "prompt": "Why is the old man sad?",
      "options": [
        "He has lost his dog.",
        "He is hungry.",
        "He is cold.",
        "He cannot find his house."
      ],
      "target_answer": "He has lost his dog.",
      "meaning": "The old man is sad because his dog is missing.",
      "explanation": "The man says Ich habe ihn gesucht — 'I have been looking for him.' His sadness and the dog's return answer the same question."
    },
    {
      "id": "l5322_e4",
      "type": "shift_select",
      "prompt": "What does Anna hear at the end?",
      "options": [
        "The man laughing",
        "A train",
        "A dog barking",
        "The rain"
      ],
      "target_answer": "The man laughing",
      "meaning": "Anna hears the old man laugh when the dog returns.",
      "explanation": "The last paragraph says Anna hört, wie der Mann lacht — she hears the man laugh."
    },
    {
      "id": "l5322_e5",
      "type": "literal_gloss",
      "prompt": "Which English follows the German words most closely?",
      "german": "Der Hund läuft schnell zu dem Mann.",
      "natural": "The dog runs quickly over to the man.",
      "options": [
        "The dog runs fast to the man",
        "The dog runs quickly over to the man",
        "The man runs fast to the dog",
        "The dog slowly leaves the man"
      ],
      "target_answer": "The dog runs fast to the man",
      "meaning": "The dog runs fast to the man.",
      "explanation": "zu dem Mann is literally 'to the man' — the dative destination. The natural English 'over to the man' adds a direction word German does not need."
    }
  ],
  "twist": {
    "prompt": "Without looking back — rebuild: 'The dog sits alone under a tree.'",
    "target_answer": "Der Hund sitzt allein unter einem Baum",
    "word_bank": [
      "Der",
      "Hund",
      "sitzt",
      "allein",
      "unter",
      "einem",
      "Baum",
      "Bank"
    ],
    "explanation": "unter einem Baum is the dative picture of where the dog sits. The bench (Bank) is a distractor; the story puts the dog under the tree."
  },
  "summary": {
    "outcome": "Read a short story about a lost dog and answer where, why, and what-happens questions.",
    "use_example": {
      "german": "Der Hund sitzt allein unter einem Baum. Anna folgt ihm zu einem alten Mann.",
      "english": "The dog sits alone under a tree. Anna follows him to an old man."
    },
    "takeaway": "Weather and feelings are story clues. A sunny start and a sad old man tell you the problem before the dialogue names it.",
    "curiosity_teaser": "Next branch: a train, rain, and a wrong bus in Paris."
  }
};

export default lesson;
