import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 14,
  "slug": "possessives-agree-with-the-thing",
  "title": "Possessives Agree with the Thing",
  "subtitle": "mon/ma/mes, ton/ta/tes, son/sa/ses — why 'son frère' means both 'his brother' and 'her brother'",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mon",
    "ma",
    "mes",
    "ton",
    "son",
    "sa",
    "notre",
    "votre",
    "père",
    "mère",
    "frère",
    "sœur",
    "famille"
  ],
  "table_word_ids": [
    "mon",
    "ma",
    "mes",
    "ton",
    "son",
    "sa",
    "notre",
    "votre",
    "père",
    "mère",
    "frère",
    "sœur",
    "famille"
  ],
  "hook": {
    "title": "The Owner's Gender Is a Red Herring",
    "content": "In English, choosing between 'his' and 'her' depends on the owner: if Marie owns a book, it is 'her book'; if Paul owns a house, it is 'his house'. French flips the switch 180 degrees: the possessive adjective agrees with the THING OWNED, never with the owner! Because le frère ('brother') is masculine, 'his brother' is son frère AND 'her brother' is ALSO son frère! Because la maison ('house') is feminine, 'her house' is sa maison AND 'his house' is ALSO sa maison!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French says mon opinion even though opinion is feminine",
        "content": "Try saying *ma opinion out loud: two vowels collide! Rather than eliding ma to m' (which would sound identical to reflexives), French recruits masculine mon, ton, son before ANY feminine word starting with a vowel: mon opinion, ton idée, son histoire!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Three-Column Possessive Grid: Masculine / Feminine / Plural",
    "content": "Every singular owner has three cards matching the thing owned: my = mon (m. or before vowel), ma (f.), mes (pl.); your (informal) = ton, ta, tes; his/her/its = son, sa, ses. Look at the noun on the right, never the person on the left!",
    "linguist_note": "Latin suus/sua/suum always agreed in gender, number, and case with the possessed noun; English 'his/her' is the historical outlier.",
    "trap_note": "The shortcut your mind will offer: saying *sa frère when talking about a woman's brother. Stop and check the noun: frère is masculine, so it is ALWAYS son frère!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each family member with its Latinate English cognate and 'my' form:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "mon père (my father)",
          "german": "paternal"
        },
        {
          "id": "p2",
          "english": "ma mère (my mother)",
          "german": "maternal"
        },
        {
          "id": "p3",
          "english": "mon frère (my brother)",
          "german": "fraternal"
        },
        {
          "id": "p4",
          "english": "ma sœur (my sister)",
          "german": "sorority"
        },
        {
          "id": "p5",
          "english": "ma famille (my family)",
          "german": "familiar / family"
        }
      ],
      "target_answer": "paternal, maternal, fraternal, sorority, familiar / family",
      "meaning": "mon père (my father), ma mère (my mother), mon frère (my brother), ma sœur (my sister), ma famille (my family)",
      "explanation": "mon pairs with masculine père/frère; ma pairs with feminine mère/sœur/famille.",
      "id": "fr14_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Marie is talking about her brother (le frère) and Paul is talking about his house (la maison). Which pair is correct?",
      "options": [
        "sa frère / sa maison",
        "son frère / sa maison",
        "sa frère / son maison"
      ],
      "target_answer": "son frère / sa maison",
      "meaning": "her brother (son frère) / his house (sa maison)",
      "explanation": "son/sa agrees with frère (m.) and maison (f.), completely ignoring Marie and Paul's gender!",
      "id": "fr14_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Because 'opinion' is feminine but starts with a vowel, how does French say 'my opinion'?",
      "options": [
        "ma opinion",
        "m'opinion",
        "mon opinion"
      ],
      "target_answer": "mon opinion",
      "meaning": "my opinion",
      "explanation": "Before any vowel-initial feminine noun, ma/ta/sa switch to mon/ton/son so the final /n/ can link smoothly!",
      "id": "fr14_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "my father and my mother are here",
      "cues": [
        "My father → Mon père (masculine)",
        "and my mother are here → et ma mère sont ici"
      ],
      "idea_parts": [
        "masculine subject → Mon père",
        "feminine subject → et ma mère",
        "plural verb → sont ici"
      ],
      "target_answer": "Mon père et ma mère sont ici",
      "meaning": "My father and my mother are here",
      "word_bank": [
        "Ma",
        "et",
        "sont",
        "est",
        "père",
        "Mon",
        "ici",
        "mère",
        "ma"
      ],
      "explanation": "Mon père (m.) + ma mère (f.) = plural 'they', taking sont.",
      "diagnosis": {
        "slip": "used ma with père or est instead of sont",
        "cue": "père takes mon, mère takes ma, and the two together take plural sont."
      },
      "id": "fr14_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ma sœur habite avec son frère",
      "replays": 2,
      "target_answer": "Ma sœur habite avec son frère",
      "meaning": "My sister lives with her brother",
      "cues": [
        "My sister: Ma sœur",
        "lives with: habite avec",
        "her brother: son frère (masculine!)"
      ],
      "explanation": "Even though the owner is ma sœur, 'her brother' is son frère!",
      "affirmation": "You wrote son frère — the owner's gender didn't trick you.",
      "id": "fr14_e5"
    }
  ],
  "summary": {
    "outcome": "Select mon/ma/mes, ton/ta/tes, son/sa/ses by the gender and number of the possessed noun, and use mon/ton/son before vowel-initial feminine nouns.",
    "use_example": {
      "german": "Paul cherche sa sœur et Marie cherche son frère.",
      "english": "Paul is looking for his sister and Marie is looking for her brother."
    },
    "takeaway": "Possessives look right (at the noun owned), never left (at the owner).",
    "curiosity_teaser": "Up next on Le Pont ([1401] The Trap Named): see how Possessives Agree with the Thing leads directly into The Trap Named."
  },
  "twist": {
    "prompt": "Ungraded — 'Our family is very big' (use Notre):",
    "target_answer": "Notre famille est très grande",
    "word_bank": [
      "est",
      "très",
      "Notre",
      "grande",
      "famille",
      "grand",
      "Nos"
    ],
    "explanation": "notre ('our', as in Notre-Dame) serves both masculine and feminine singular nouns."
  },
  "foreshadow": {
    "line": "Having mastered Possessives Agree with the Thing, look ahead to Topic 15 (Numbers & the Four-Twenties), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 15
  },
  "payoff": {
    "ofLesson": 13,
    "text": "The foundation from Topic 13 (à, de, chez) now pays off directly inside Possessives Agree with the Thing: every sentence here builds on that earlier step."
  }
};

export default lesson;
