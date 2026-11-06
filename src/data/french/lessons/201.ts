import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 201,
  "slug": "elision-gym",
  "title": "L'Elision Gym",
  "subtitle": "The apostrophe marks a vowel sacrificed — la → l', le → l'",
  "phase": 1,
  "shift_categories": [
    "ion"
  ],
  "word_ids": [
    "opinion",
    "organisation",
    "hôtel",
    "eau",
    "la",
    "le"
  ],
  "table_word_ids": [
    "opinion",
    "organisation",
    "hôtel",
    "eau",
    "la",
    "le"
  ],
  "hook": {
    "title": "French Hates a Vowel Collision",
    "content": "Say la opinion fast. Your mouth refuses — two vowels can't share one doorstep. So French cuts the article's vowel and welds the rest: l'opinion. The same happens to le: l'hôtel. The apostrophe isn't decoration; it is a scar where a vowel used to be.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Not just articles",
        "content": "je → j'ai (I have), ne → n'aime pas, ce → c'est, de → d'eau. Elision is a general law — wherever a little word meets a vowel, the little word loses its tail.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Vowel Test",
    "content": "Look at the next word. Does it start with a vowel (or a mute h)? Then the article drops its vowel: l'opinion, l'hôtel, l'eau. Does it start with a consonant? Keep the article whole: la collection, le gâteau. The test is one glance long — and it works for every eliding word in the language.",
    "trap_note": "The tempting wrong move after l'-words: assuming the gender is lost. l'opinion is still la opinion underneath — the it is still la: je la veux."
  },
  "exercises": [
    {
      "id": "fr201_e1",
      "type": "shift_select",
      "prompt": "'The organization' — correct rendering?",
      "options": [
        "le organisation",
        "la organisation",
        "l'organisation"
      ],
      "target_answer": "l'organisation",
      "meaning": "the organization",
      "explanation": "organisation opens with a vowel — la loses its a. One S in French, never a Z."
    },
    {
      "id": "fr201_e2",
      "type": "shift_select",
      "prompt": "'The water' — correct rendering?",
      "options": [
        "l'eau",
        "le eau",
        "la eau"
      ],
      "target_answer": "l'eau",
      "meaning": "the water",
      "explanation": "eau (Latin aqua, all vowels historical scar tissue) is feminine and vowel-initial: l'eau."
    },
    {
      "id": "fr201_e3",
      "type": "derive",
      "prompt": "Add the article: 'the hotel' (hôtel starts with a mute h — same rule as a vowel)",
      "target_answer": "l'hôtel",
      "meaning": "the hotel",
      "explanation": "The h is written and never said — for elision purposes, l'hôtel behaves exactly like a vowel-initial word."
    },
    {
      "id": "fr201_e4",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want it — and the it is the opinion",
      "cues": [
        "The opinion → l'opinion, but the it stays la",
        "Walk it left: I it want",
        "je la veux"
      ],
      "target_answer": "Je la veux",
      "meaning": "I want it (the opinion)",
      "word_bank": [
        "l'",
        "veux",
        "Je",
        "la",
        "le"
      ],
      "idea_parts": [
        "who? → je",
        "it (l'opinion) → la",
        "position → before veux"
      ],
      "explanation": "The article elides (l'opinion), but the pronoun doesn't: je la veux. Elision is about collisions — the pronoun stands alone.",
      "diagnosis": {
        "slip": "the pronoun got elided too",
        "cue": "je l'veux isn't written French. The article elides only when welded to its noun; the walking pronoun keeps its form: je la veux."
      }
    },
    {
      "id": "fr201_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want the water' (use the partitive-looking piece: de l'eau)",
      "target_answer": "Je veux de l'eau",
      "meaning": "I want some water",
      "vocab_hints": [
        {
          "word": "de",
          "translation": "of / some",
          "note": "de + l'eau: French counts water like sugar — some water, some sugar"
        }
      ],
      "word_bank": [
        "la",
        "Je",
        "de",
        "l'eau",
        "veux",
        "le"
      ],
      "explanation": "de l'eau — 'of the water' is how French says 'some water'. A small preview of the partitive, revisited in topic 13."
    }
  ],
  "summary": {
    "outcome": "Run the vowel test on sight: vowel-initial noun → l', consonant-initial → la/le — and keep pronouns un-elided.",
    "use_example": {
      "german": "L'opinion est intéressante.",
      "english": "The opinion is interesting."
    },
    "takeaway": "The apostrophe is a vowel's tombstone: la opinion → l'opinion, but the walking pronoun never elides.",
    "curiosity_teaser": "Up next on Le Pont ([202] -ION Discrimination Drills): see how L'Elision Gym leads directly into -ION Discrimination Drills."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want it (the opinion)\" in French:",
    "target_answer": "Je la veux",
    "word_bank": [
      "la",
      "ne",
      "pas",
      "Je",
      "veux"
    ],
    "explanation": "Re-constructing \"Je la veux\" from the underlying rule cements the pattern of L'Elision Gym."
  }
};

export default lesson;
