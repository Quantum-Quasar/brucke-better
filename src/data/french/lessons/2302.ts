import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2302,
  "slug": "lesson-2302",
  "title": "lui & leur",
  "subtitle": "je lui parle ('I speak to him OR to her'), je leur donne — gender-neutral indirect objects.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "lui",
    "leur",
    "parler",
    "répondre",
    "donné",
    "demander",
    "ami",
    "sœur"
  ],
  "table_word_ids": [
    "lui",
    "leur",
    "parler",
    "répondre",
    "donné",
    "demander",
    "ami",
    "sœur"
  ],
  "hook": {
    "title": "lui & leur: One Pronoun for Both 'To Him' and 'To Her'",
    "content": "Whenever a French verb takes à before a person — parler à ('speak to'), répondre à ('answer/reply to'), demander à ('ask [someone]'), donner à ('give to') — the 3rd-person pronoun is indirect: lui means BOTH 'to him' AND 'to her', and leur means 'to them'!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why English 'I ask him / I answer her' uses indirect lui in French",
        "content": "Because French says demander À Marie and répondre À Paul, both verbs ALWAYS take lui ('to him / to her') and leur ('to them'): Je lui demande, Je lui réponds!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "parler à / répondre à / demander à / donner à → lui (sg.) & leur (pl.)",
    "content": "Use lui for both 'to him' and 'to her', and leur (never with an -s before a verb!) for 'to them'.",
    "linguist_note": "French dative verbs require dative clitics lui/leur rather than accusative le/la/les.",
    "trap_note": "Never say *Je la réponds or *Je le demande — responder and demander take à, so you MUST use lui: Je lui réponds, Je lui demande!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je lui parle (to my brother OR my sister)",
          "german": "I speak to him / to her"
        },
        {
          "id": "p2",
          "english": "Je lui réponds (répondre à!)",
          "german": "I answer him / her"
        },
        {
          "id": "p3",
          "english": "Tu lui demandes l'heure (demander à!)",
          "german": "You ask him / her for the time"
        },
        {
          "id": "p4",
          "english": "Nous leur donnons les billets",
          "german": "We give them the tickets"
        },
        {
          "id": "p5",
          "english": "Je vais lui parler demain",
          "german": "I am going to speak to him / her tomorrow"
        }
      ],
      "target_answer": "I speak to him / to her, I answer him / her, You ask him / her for the time, We give them the tickets, I am going to speak to him / her tomorrow",
      "meaning": "Je lui parle (to my brother OR my sister), Je lui réponds (répondre à!), Tu lui demandes l'heure (demander à!), Nous leur donnons les billets, Je vais lui parler demain",
      "explanation": "lui covers both 'to him' and 'to her'; leur covers 'to them' without an -s.",
      "id": "fr2302_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You want to say 'I am answering my sister' (répondre à sa sœur). Which pronoun replaces 'à ma sœur'?",
      "options": [
        "Je lui réponds",
        "Je la réponds",
        "Je elle réponds"
      ],
      "target_answer": "Je lui réponds",
      "meaning": "I answer her (lit. I reply to her)",
      "explanation": "Because répondre takes à, it takes indirect lui — for both men and women!",
      "id": "fr2302_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am going to speak to them'?",
      "options": [
        "Je vais leurs parler",
        "Je vais leur parler",
        "Je vais les parler"
      ],
      "target_answer": "Je vais leur parler",
      "meaning": "I am going to speak to them",
      "explanation": "leur stands right before the infinitive parler and NEVER takes an -s before a verb!",
      "id": "fr2302_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am going to speak to her tonight (using Je vais lui parler ce soir)",
      "cues": [
        "I am going to-her-speak → Je vais lui parler",
        "tonight → ce soir"
      ],
      "idea_parts": [
        "near future + dative pronoun → Je vais lui parler",
        "time → ce soir"
      ],
      "target_answer": "Je vais lui parler ce soir",
      "meaning": "I am going to speak to her tonight",
      "word_bank": [
        "la",
        "Je",
        "vais",
        "ce",
        "lui",
        "soir",
        "le",
        "parler"
      ],
      "explanation": "lui replaces both 'to him' and 'to her' and sits before parler.",
      "diagnosis": {
        "slip": "used la instead of lui",
        "cue": "parler à takes indirect lui: Je vais lui parler."
      },
      "id": "fr2302_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il ne m'a pas répondu, mais je lui ai parlé",
      "replays": 2,
      "target_answer": "Il ne m'a pas répondu, mais je lui ai parlé",
      "meaning": "He didn't answer me, but I spoke to him",
      "cues": [
        "Il ne m'a pas répondu",
        "mais je lui ai parlé"
      ],
      "explanation": "Both m' and lui stand before the auxiliary avoir in the past.",
      "affirmation": "You placed both m' and lui before the auxiliary!",
      "id": "fr2302_e5"
    }
  ],
  "summary": {
    "outcome": "Use gender-neutral lui ('to him / to her') and invariable leur ('to them') with parler, répondre, demander, and donner.",
    "use_example": {
      "german": "Ma mère m'appelle — je vais lui répondre.",
      "english": "My mother is calling me — I'm going to answer her."
    },
    "takeaway": "parler, répondre, demander, donner all take à → use lui (him/her) and leur (them).",
    "curiosity_teaser": "Up next on Le Pont ([2303] The Double-Pronoun Highway): see how lui & leur leads directly into The Double-Pronoun Highway."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am going to speak to her tonight\" in French:",
    "target_answer": "Je vais lui parler ce soir",
    "word_bank": [
      "parler",
      "soir",
      "Je",
      "ne",
      "lui",
      "pas",
      "ce",
      "vais"
    ],
    "explanation": "Re-constructing \"Je vais lui parler ce soir\" from the underlying rule cements the pattern of lui & leur."
  }
};

export default lesson;
