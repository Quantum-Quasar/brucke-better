import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1303,
  "slug": "sprig-1303",
  "title": "The Partitive: du, de la & Negative de",
  "subtitle": "Why French says 'some bread' (du pain, de la soupe) and collapses it to bare de after negation (pas de pain).",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "du",
    "de",
    "des",
    "pain",
    "vin",
    "fromage",
    "soupe",
    "eau",
    "pas",
    "vouloir"
  ],
  "table_word_ids": [
    "du",
    "de",
    "des",
    "pain",
    "vin",
    "fromage",
    "soupe",
    "eau",
    "pas",
    "vouloir"
  ],
  "hook": {
    "title": "Why French Never Leaves Mass Nouns Naked: du, de la, de l', des",
    "content": "Where English says bare 'I want bread, soup, and water', French requires the Partitive Article (de + definite article = 'some'): du pain (de + le), de la soupe, de l'eau, des livres (de + les)! And when you negate the verb ('I don't want any bread'), the quantity drops to zero and all four collapse to bare de / d': Je ne veux pas de pain, Je n'ai pas d'eau!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why zero quantity collapses du / de la / des to bare de",
        "content": "After ne...pas, ne...plus, ne...jamais, or quantity words (beaucoup de, un peu de, combien de), the definite article inside du/de la/des vanishes, leaving bare de!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Positive: du / de la / de l' / des → Negative: pas de / pas d'",
    "content": "Use du (m.), de la (f.), de l' (vowel), des (pl.) in positive sentences, and collapse them to de / d' after negation.",
    "linguist_note": "French is strictly determiner-obligatory; bare nouns cannot occupy argument positions.",
    "trap_note": "Never keep du/de la/des after pas (*Je ne veux pas du pain) — collapse to pas de pain!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each positive partitive phrase with its negative 'pas de' counterpart:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je veux du pain (some bread, m.)",
          "german": "Je ne veux pas de pain"
        },
        {
          "id": "p2",
          "english": "Je prends de la soupe (some soup, f.)",
          "german": "Je ne prends pas de soupe"
        },
        {
          "id": "p3",
          "english": "J'ai de l'eau (some water, vowel)",
          "german": "Je n'ai pas d'eau"
        },
        {
          "id": "p4",
          "english": "J'ai des amis (some friends, pl.)",
          "german": "Je n'ai pas d'amis"
        }
      ],
      "target_answer": "Je ne veux pas de pain, Je ne prends pas de soupe, Je n'ai pas d'eau, Je n'ai pas d'amis",
      "meaning": "Je veux du pain (some bread, m.), Je prends de la soupe (some soup, f.), J'ai de l'eau (some water, vowel), J'ai des amis (some friends, pl.)",
      "explanation": "du, de la, de l', and des all collapse to bare de (or d') after negation.",
      "id": "fr1303_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Je veux du pain et de l'eau'?",
      "german": "Je veux du pain et de l'eau",
      "natural": "I want bread and water",
      "options": [
        "I want the bread and the water",
        "I want bread and water",
        "I want of-the bread and of the water"
      ],
      "target_answer": "I want of-the bread and of the water",
      "meaning": "Literal structure: I want of-the bread and of the water",
      "explanation": "du (de + le) and de l' literally mean 'of-the' ('some portion of the').",
      "id": "fr1303_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Flip 'Je veux du fromage' ('I want some cheese') into the negative ('I don't want any cheese'):",
      "options": [
        "Je ne veux pas de fromage",
        "Je ne veux pas fromage",
        "Je ne veux pas du fromage"
      ],
      "target_answer": "Je ne veux pas de fromage",
      "meaning": "I don't want any cheese",
      "explanation": "After ne...pas, partitive du collapses to bare de: pas de fromage!",
      "id": "fr1303_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want some bread and some cheese please",
      "cues": [
        "I want some bread → Je veux du pain",
        "and some cheese, please → et du fromage, s'il vous plaît"
      ],
      "idea_parts": [
        "first partitive → Je veux du pain",
        "second partitive + polite tag → et du fromage, s'il vous plaît"
      ],
      "target_answer": "Je veux du pain et du fromage, s'il vous plaît",
      "meaning": "I want some bread and cheese, please",
      "word_bank": [
        "fromage",
        "la",
        "et",
        "pain",
        "s'il",
        "veux",
        "le",
        "vous",
        "du",
        "du",
        "plaît",
        "Je"
      ],
      "explanation": "Both pain and fromage take masculine partitive du.",
      "diagnosis": {
        "slip": "omitted du",
        "cue": "Use du pain et du fromage."
      },
      "id": "fr1303_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je ne veux pas de vin ce soir",
      "replays": 2,
      "target_answer": "Je ne veux pas de vin ce soir",
      "meaning": "I don't want any wine tonight",
      "cues": [
        "negation: Je ne veux pas",
        "collapsed partitive: de vin",
        "time: ce soir"
      ],
      "explanation": "du vin collapses to de vin after ne...pas.",
      "affirmation": "You collapsed du to bare de after pas!",
      "id": "fr1303_e5"
    }
  ],
  "summary": {
    "outcome": "Use partitive articles (du, de la, de l', des) for unspecified quantities and collapse them to bare de/d' after negation.",
    "use_example": {
      "german": "Je prends du pain et de la soupe, mais je ne prends pas de vin.",
      "english": "I'm having bread and soup, but I'm not having wine."
    },
    "takeaway": "Use du / de la / de l' / des for 'some', and collapse to bare de after pas.",
    "curiosity_teaser": "Up next on Le Pont ([14] Possessives Agree with the Thing): see how The Partitive: du, de la & Negative de leads directly into Possessives Agree with the Thing."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want some bread and cheese, please\" in French:",
    "target_answer": "Je veux du pain et du fromage, s'il vous plaît",
    "word_bank": [
      "pas",
      "veux",
      "s'il",
      "du",
      "vous",
      "fromage",
      "plaît",
      "pain",
      "ne",
      "du",
      "Je",
      "et"
    ],
    "explanation": "Re-constructing \"Je veux du pain et du fromage, s'il vous plaît\" from the underlying rule cements the pattern of The Partitive: du, de la & Negative de."
  }
};

export default lesson;
