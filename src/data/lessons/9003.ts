import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9003,
  "slug": "story-s3-fahrrad-statt-auto",
  "title": "Fahrrad statt Auto",
  "subtitle": "Tom's car breaks down, and a borrowed bicycle changes his mind",
  "phase": 3,
  "spineStory": true,
  "label": "s3",
  "shift_categories": [],
  "word_ids": [
    "rad",
    "fahrrad",
    "auto",
    "teuer",
    "schnell",
    "langsam",
    "gleich"
  ],
  "table_word_ids": [
    "rad",
    "gesundheit",
    "fahrrad",
    "auto",
    "teuer",
    "schnell",
    "langsam",
    "gleich",
    "bäckerei",
    "bäcker",
    "stadt",
    "freund",
    "danke",
    "minute",
    "stunde",
    "geld",
    "zug"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "This story is built on comparisons: faster than, slower than, almost as fast. Watch the words als and wie — they are the hinges. The plot is simple: a car stops working, a friend lends a bicycle, and Tom discovers something.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Benzin & kaputt",
        "content": "das Benzin = petrol/gas; kaputt = broken. Both are glossed here because the story needs them and they are not in the lesson's word bank."
      },
      {
        "marker": "2",
        "title": "ein paar",
        "content": "ein paar Minuten = a few minutes. Do not confuse it with das Paar (a pair); the small p is the quantity word."
      },
      {
        "marker": "3",
        "title": "als vs. wie",
        "content": "schneller als = faster than; gleich schnell wie = as fast as. German separates the two jobs that English 'as/than' also keeps apart."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Tom ist Bäcker. Er arbeitet in einer kleinen Bäckerei in der Stadt. Eigentlich fährt er jeden Tag mit dem Auto zur Arbeit. Aber das Benzin ist sehr teuer, und sein Auto ist alt.\n\nHeute ist das Auto kaputt. Tom weiß nicht, was er machen soll. Da kommt sein Freund Alex. „Ich kann dir mein Fahrrad geben“, sagt Alex.\n\nTom setzt sich auf das Fahrrad und fährt zur Bäckerei. Das geht schneller als mit dem Auto! Er ist nur ein paar Minuten langsamer. Am Nachmittag fährt Tom mit dem Rad zurück.\n\n„Danke, Alex! Ich kaufe mir auch ein Fahrrad. Mit dem Fahrrad bin ich fast gleich schnell. Außerdem ist es gut für meine Gesundheit.“\n\nAlex lacht. „Super! Dann machen wir zusammen eine Fahrt.“",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5341_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "vocab_hints": [
        {
          "word": "fast",
          "translation": "almost"
        }
      ],
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Normally Tom drives to work by car every day.",
          "german": "Eigentlich fährt er jeden Tag mit dem Auto zur Arbeit."
        },
        {
          "id": "m2",
          "english": "But the gas is very expensive.",
          "german": "Aber das Benzin ist sehr teuer."
        },
        {
          "id": "m3",
          "english": "Today the car is broken.",
          "german": "Heute ist das Auto kaputt."
        },
        {
          "id": "m4",
          "english": "Alex gives Tom his bicycle.",
          "german": "Alex gibt Tom sein Fahrrad."
        },
        {
          "id": "m5",
          "english": "That is faster than by car.",
          "german": "Das geht schneller als mit dem Auto."
        },
        {
          "id": "m6",
          "english": "By bike I am almost as fast.",
          "german": "Mit dem Fahrrad bin ich fast gleich schnell."
        }
      ],
      "target_answer": "Eigentlich fährt er jeden Tag mit dem Auto zur Arbeit., Aber das Benzin ist sehr teuer., Heute ist das Auto kaputt., Alex gibt Tom sein Fahrrad., Das geht schneller als mit dem Auto., Mit dem Fahrrad bin ich fast gleich schnell.",
      "meaning": "the story beats: the car, the cost, the breakdown, the borrowed bike, the comparison",
      "explanation": "The middle two sentences are the turn: the car fails, and the bicycle arrives. The last two are Tom's conclusion."
    },
    {
      "id": "l5341_e2",
      "type": "shift_select",
      "prompt": "Why does Tom not drive today?",
      "options": [
        "His car is broken.",
        "He lost his keys.",
        "The bakery is closed.",
        "He wants to walk."
      ],
      "target_answer": "His car is broken.",
      "meaning": "The car is broken, so Tom cannot drive it.",
      "explanation": "Heute ist das Auto kaputt is the direct cause. The expensive gas is background, not today's problem."
    },
    {
      "id": "l5341_e3",
      "type": "shift_select",
      "prompt": "How does Tom feel about the bike ride?",
      "options": [
        "Surprised that it is almost as fast",
        "Angry because it is slow",
        "Tired and hungry",
        "Afraid of the traffic"
      ],
      "target_answer": "Surprised that it is almost as fast",
      "meaning": "Tom is surprised: the bicycle is almost as fast as his car.",
      "explanation": "Das geht schneller als mit dem Auto! and fast gleich schnell show surprise and a changed opinion."
    },
    {
      "id": "l5341_e4",
      "type": "shift_select",
      "prompt": "What does Tom decide at the end?",
      "options": [
        "He wants to buy a bicycle.",
        "He wants to buy a new car.",
        "He wants to change jobs.",
        "He wants to sell his bakery."
      ],
      "target_answer": "He wants to buy a bicycle.",
      "meaning": "Tom decides to buy his own bicycle.",
      "explanation": "Ich kaufe mir auch ein Fahrrad is his decision. The health and money reasons support it."
    },
    {
      "id": "l5341_e5",
      "type": "transcribe",
      "prompt": "Render the thought in German: 'He drives with the bicycle into the city.'",
      "idea": "He drives with the bicycle into the city.",
      "cues": [
        "Start with Er fährt — the verb stays in second position.",
        "mit dem Fahrrad is the means of transport.",
        "The destination uses in + accusative: in die Stadt."
      ],
      "target_answer": "Er fährt mit dem Fahrrad in die Stadt",
      "meaning": "He drives with the bicycle into the city.",
      "word_bank": [
        "Er",
        "fährt",
        "mit",
        "dem",
        "Fahrrad",
        "in",
        "die",
        "Stadt",
        "Auto"
      ],
      "explanation": "Er fährt ... in die Stadt: the verb is second, the means is mit dem Fahrrad, and the destination is in die Stadt (motion → accusative)."
    }
  ],
  "twist": {
    "prompt": "Without looking back — say in German: 'With the bicycle I am almost as fast.'",
    "target_answer": "Mit dem Fahrrad bin ich fast gleich schnell",
    "word_bank": [
      "Mit",
      "dem",
      "Fahrrad",
      "bin",
      "ich",
      "fast",
      "gleich",
      "schnell",
      "Auto"
    ],
    "explanation": "Fronting mit dem Fahrrad pulls the verb bin into second position: Mit dem Fahrrad bin ich ... The comparison stays fast gleich schnell."
  },
  "summary": {
    "outcome": "Read a comparison-driven story and answer cause, opinion, and decision questions.",
    "use_example": {
      "german": "Das geht schneller als mit dem Auto, und es ist gut für meine Gesundheit.",
      "english": "That is faster than by car, and it is good for my health."
    },
    "takeaway": "Comparisons carry a story's argument: schneller als, langsamer als, gleich schnell wie. Find the hinge word and you find the claim.",
    "curiosity_teaser": "Next: a birthday, a broken bus, and a very wet arrival."
  }
};

export default lesson;
