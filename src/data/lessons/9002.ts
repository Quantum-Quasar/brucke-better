import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9002,
  "slug": "story-s2-eine-reise-mit-pannen",
  "title": "Eine Reise mit Pannen",
  "subtitle": "A trip to Paris goes wrong in small ways — and becomes a memory",
  "phase": 3,
  "spineStory": true,
  "label": "s2",
  "shift_categories": [],
  "word_ids": [
    "postkarte",
    "rucksack",
    "land",
    "nass",
    "regen",
    "wetter",
    "markt",
    "familie"
  ],
  "table_word_ids": [
    "postkarte",
    "rucksack",
    "land",
    "nass",
    "regen",
    "wetter",
    "markt",
    "familie",
    "zug",
    "fahrt",
    "urlaub",
    "freund",
    "geld",
    "stunde",
    "spät",
    "suppe",
    "obst"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "This story uses the conversational past (Perfekt), the tense Germans actually speak in when they tell you about last week. Do not stop at every participle: follow the sequence — first the train, then the rain, then the wrong bus, then the market. The ending tells you how to feel about all of it.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Verspätung",
        "content": "die Verspätung = delay. der Zug hatte eine Stunde Verspätung = the train was an hour late. It is a compound of spät (late)."
      },
      {
        "marker": "2",
        "title": "Regenschirm & Café",
        "content": "der Regenschirm = umbrella (Regen + Schirm); das Café = café. Both are glossed here because the story needs them and they are not part of the lesson's word bank."
      },
      {
        "marker": "3",
        "title": "Zum Glück",
        "content": "zum Glück = luckily / fortunately. It is the story's turn signal: after it, something good happens."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Lea und Mia sind Freundinnen. Letzte Woche sind sie mit dem Zug nach Paris gefahren. Sie wollen ein neues Land sehen, und sie haben ihre Rucksäcke gepackt. Am Anfang war alles gut.\n\nDann hatte der Zug eine Stunde Verspätung. Die beiden haben gewartet und Musik gehört. Mia war ein bisschen nervös, aber sie haben auch gelacht.\n\nIn Paris hat es stark geregnet. Lea und Mia hatten keinen Regenschirm und sind ganz nass geworden. Zum Glück haben sie ein kleines Café gefunden. Dort haben sie eine warme Suppe gegessen.\n\nAm nächsten Tag wollten sie die Stadt sehen. Aber sie haben den falschen Bus genommen. Plötzlich waren sie in einer anderen Straße. Zuerst waren sie traurig, aber dann haben sie einen schönen Markt gefunden. Dort haben sie Obst gekauft und Postkarten geschrieben.\n\nAm Abend waren sie sehr müde, aber sie haben viel gelacht. Die Reise war nicht perfekt, aber sie war besonders.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5331_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "vocab_hints": [
        {
          "word": "Zug",
          "translation": "train"
        },
        {
          "word": "Stunde",
          "translation": "hour"
        },
        {
          "word": "geregnet",
          "translation": "rained (participle of regnen)"
        },
        {
          "word": "falschen",
          "translation": "wrong (accusative)"
        },
        {
          "word": "Bus",
          "translation": "bus"
        },
        {
          "word": "schönen",
          "translation": "beautiful (accusative)"
        },
        {
          "word": "gelacht",
          "translation": "laughed (participle of lachen)"
        }
      ],
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Last week they went to Paris by train.",
          "german": "Letzte Woche sind sie mit dem Zug nach Paris gefahren."
        },
        {
          "id": "m2",
          "english": "The train was an hour late.",
          "german": "Der Zug hatte eine Stunde Verspätung."
        },
        {
          "id": "m3",
          "english": "It rained heavily in Paris.",
          "german": "In Paris hat es stark geregnet."
        },
        {
          "id": "m4",
          "english": "They took the wrong bus.",
          "german": "Sie haben den falschen Bus genommen."
        },
        {
          "id": "m5",
          "english": "Then they found a beautiful market.",
          "german": "Dann haben sie einen schönen Markt gefunden."
        },
        {
          "id": "m6",
          "english": "In the evening they were tired but laughed a lot.",
          "german": "Am Abend waren sie müde, aber sie haben viel gelacht."
        }
      ],
      "target_answer": "Letzte Woche sind sie mit dem Zug nach Paris gefahren., Der Zug hatte eine Stunde Verspätung., In Paris hat es stark geregnet., Sie haben den falschen Bus genommen., Dann haben sie einen schönen Markt gefunden., Am Abend waren sie müde, aber sie haben viel gelacht.",
      "meaning": "the trip's sequence: train, delay, rain, wrong bus, market, tired but happy",
      "explanation": "The six beats are a sequence, not a list. The story is built to be re-told in order."
    },
    {
      "id": "l5331_e2",
      "type": "shift_select",
      "prompt": "What was the first problem on the trip?",
      "options": [
        "The train was late.",
        "It rained.",
        "They took the wrong bus.",
        "They lost their money."
      ],
      "target_answer": "The train was late.",
      "meaning": "The train delay comes before the rain and the wrong bus.",
      "explanation": "The first problem is the Verspätung. The rain comes after they arrive in Paris; the bus comes the next day."
    },
    {
      "id": "l5331_e3",
      "type": "shift_select",
      "prompt": "Why did Lea and Mia get wet?",
      "options": [
        "They had no umbrella.",
        "They fell into the river.",
        "They forgot their bags.",
        "The café was closed."
      ],
      "target_answer": "They had no umbrella.",
      "meaning": "They had no umbrella, so the rain soaked them.",
      "explanation": "The sentence says: Lea und Mia hatten keinen Regenschirm und sind ganz nass geworden. No umbrella, therefore wet."
    },
    {
      "id": "l5331_e4",
      "type": "shift_select",
      "prompt": "How did the trip end?",
      "options": [
        "They were tired but happy.",
        "They went home angry.",
        "They missed the train home.",
        "They stayed in Paris forever."
      ],
      "target_answer": "They were tired but happy.",
      "meaning": "They end the trip tired, but laughing and calling it special.",
      "explanation": "The last two sentences say they were tired and laughed a lot, and the trip was not perfect but special."
    },
    {
      "id": "l5331_e5",
      "type": "transcribe",
      "prompt": "Render the thought in German: 'They took the wrong bus.'",
      "idea": "They took the wrong bus.",
      "cues": [
        "Start with 'They have...' — the Perfekt bracket.",
        "The participle goes at the very end.",
        "genommen is the participle of nehmen."
      ],
      "target_answer": "Sie haben den falschen Bus genommen",
      "meaning": "They took the wrong bus.",
      "word_bank": [
        "Sie",
        "haben",
        "den",
        "falschen",
        "Bus",
        "genommen",
        "Zug"
      ],
      "explanation": "Perfekt bracket: Sie haben ... genommen. The accusative object is den falschen Bus; the participle closes the sentence."
    }
  ],
  "twist": {
    "prompt": "Without looking back — say in German: 'They found a beautiful market.'",
    "target_answer": "Sie haben einen schönen Markt gefunden",
    "word_bank": [
      "Sie",
      "haben",
      "einen",
      "schönen",
      "Markt",
      "gefunden",
      "Bus"
    ],
    "explanation": "einen schönen Markt is the accusative object; gefunden is the participle of finden. The bracket stays open until the last word."
  },
  "summary": {
    "outcome": "Follow a Perfekt narrative, sequence its events, and answer cause-and-feeling questions.",
    "use_example": {
      "german": "Sie haben den falschen Bus genommen, aber dann einen schönen Markt gefunden.",
      "english": "They took the wrong bus, but then found a beautiful market."
    },
    "takeaway": "In a Perfekt story, the participle at the end is the action; the auxiliary at the front only carries the time. Read the bracket as one unit.",
    "curiosity_teaser": "Next: a sunny Saturday, a bench, and a dog called Max."
  }
};

export default lesson;
