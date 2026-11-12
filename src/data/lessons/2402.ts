import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2402,
  "slug": "er-ste-sentence-gym",
  "title": "-er/-ste Sentence Gym",
  "subtitle": "Twenty comparison sentences with als and wie using taught adjectives",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "gut",
    "besser",
    "kalt",
    "alt",
    "hoch",
    "groß",
    "klein",
    "als",
    "wie",
    "schnell",
    "schwer",
    "spät",
    "spiel",
    "stunde"
  ],
  "table_word_ids": [
    "gut",
    "besser",
    "kalt",
    "alt",
    "hoch",
    "groß",
    "klein",
    "als",
    "wie",
    "schnell",
    "schwer",
    "spät",
    "spiel",
    "stunde",
    "humor"
  ],
  "hook": {
    "title": "The Comparison Gym",
    "content": "Two words run all comparisons: als (than) and wie (as). Older than → älter als. As old as → so alt wie. The adjectives are your old kit: groß/klein (big/small — klein hinted), kalt/warm, gut/besser, alt/jung, hoch/niedrig? — keep hoch. Twenty reps: comparative + als, equality with so...wie, superlative with am -sten. The gym's secret: German comparisons are WORD-FOR-WORD English minus the -th/-er spelling habits — 'bigger than' = größer als, with the umlaut doing English's silent vowel change.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "als vs wie: One Ancestor",
        "content": "als and wie both descend from comparative particles Germanic used interchangeably ('all as' → als, 'how/like' → wie). English split the jobs into than/as/like; German kept two: als for inequality, wie for equality. Medieval German texts mix them freely — the modern split is a tidy-up."
      }
    ]
  },
  "pattern": {
    "title": "The Reps",
    "content": "Inequality: Der Kaffee ist besser als der Tee. Ich bin älter als du. Die Straße ist länger als der Garten? — länger (lang → long, hint!). Winter ist kälter als Sommer? — Sommer hint. Equality: Er ist so groß wie sein Haus? — playfully: so groß wie ein Haus. Der Zug ist so schnell wie das Auto. Superlatives: Der Mont Blanc ist am höchsten. Das Wasser ist am kältesten. Der Rhein? hint — am schönsten. Also the predicate pattern: Die beste Zeit ist heute (the best time is today — bester/beste/bestes decline like ein!).",
    "footnotes": [],
    "linguist_note": "Comparative adjectives before nouns decline like ein-words: ein besserer Kaffee, die beste Zeit, ein höheres Haus. The ending is the article's job-share — the adjective steps in when there is no article to carry the flag."
  },
  "exercises": [
    {
      "id": "l2402_e1",
      "type": "shift_select",
      "prompt": "Inequality: 'Der Winter ist kälter _____ der Sommer.'",
      "options": [
        "als",
        "so",
        "wie",
        "denn"
      ],
      "target_answer": "als",
      "meaning": "Der Winter ist kälter als der Sommer",
      "explanation": "Inequality takes als. wie is equality's word (so kalt wie). spät is the night-owl: später als — later than everything."
    },
    {
      "id": "l2402_e2",
      "type": "shift_select",
      "prompt": "Equality: 'Der Zug ist _____ schnell wie das Auto.'",
      "options": [
        "mehr",
        "so",
        "am",
        "als"
      ],
      "target_answer": "so",
      "meaning": "Der Zug ist so schnell wie das Auto",
      "explanation": "so...wie frames equality — 'as fast as'. als would declare the train faster. Compare times the same way: die Stunde is the yardstick."
    },
    {
      "id": "l2402_e3",
      "type": "matching_pairs",
      "prompt": "Match the comparison sentences with their English meanings. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "sg1",
          "english": "I am older than you",
          "german": "Ich bin älter als du"
        },
        {
          "id": "sg2",
          "english": "The water is too cold",
          "german": "Das Wasser ist zu kalt"
        },
        {
          "id": "sg3",
          "english": "Coffee is better than tea",
          "german": "Kaffee ist besser als Tee"
        },
        {
          "id": "sg4",
          "english": "The house is as big as a castle",
          "german": "Das Haus ist so groß wie ein Schloss"
        },
        {
          "id": "sg5",
          "english": "The test is harder than the game",
          "german": "Der Test ist schwerer als das Spiel"
        },
        {
          "id": "recall1",
          "german": "Wir fahren langsam mit dem Rad",
          "english": "We travel slowly by bike"
        }
      ],
      "target_answer": "Ich bin älter als du, Das Wasser ist zu kalt, Kaffee ist besser als Tee, Das Haus ist so groß wie ein Schloss, Der Test ist schwerer als das Spiel, Wir fahren langsam mit dem Rad",
      "meaning": "I am older than you; The water is too cold; Coffee is better than tea; The house is as big as a castle; The test is harder than the game; We travel slowly by bike",
      "explanation": "als compares down the ladder, wie holds it level, zu cranks it — three tools, one gym. schwer (heavy, difficult) weighs in: schwerer als — heavier than."
    },
    {
      "id": "l2402_e4",
      "type": "derive",
      "prompt": "Superlative it: 'hoch' → 'Der Mont Blanc ist am _____.' (the highest):",
      "english_hint": "am + the umlaut + -sten",
      "target_answer": "höchsten",
      "meaning": "am höchsten = the highest",
      "explanation": "hoch → höher → am höchsten — the gh→ch word with pure umlaut all the way up."
    },
    {
      "id": "l2402_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'Today is the best day':",
      "target_answer": "Heute ist der beste Tag",
      "meaning": "Heute ist der beste Tag = Today is the best day",
      "word_bank": [
        "die",
        "beste",
        "ist",
        "Heute",
        "Tag",
        "sind",
        "der"
      ],
      "explanation": "am besten is the adverb superlative; before a noun it declines: der beste Tag — the ein-family endings again."
    }
  ],
  "summary": {
    "outcome": "Build als/wie comparisons and am -sten superlatives with declining adjectives.",
    "use_example": {
      "german": "Heute ist der beste Tag.",
      "english": "Today is the best day."
    },
    "takeaway": "als = than, so...wie = as...as, am -sten = superlative — and before nouns the adjective declines like ein.",
    "curiosity_teaser": "Next: adjective endings — the article's echo: der kalte Tag vs ein kalter Tag."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "nicht",
      "gut",
      "sehr",
      "sehr",
      "ist",
      "Heute",
      "das"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in -er/-ste Sentence Gym."
  }
};

export default lesson;
