import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 101,
  "slug": "hidden-twins-places-colors",
  "title": "Hidden Twins: Places & Colors",
  "subtitle": "Recognition gym: words that crossed the Channel and stayed themselves",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "maison",
    "hôtel",
    "cœur",
    "table",
    "restaurant",
    "bleu",
    "rouge",
    "bon",
    "grand",
    "petit"
  ],
  "table_word_ids": [
    "maison",
    "hôtel",
    "bleu",
    "rouge",
    "bon",
    "grand",
    "cœur",
    "table",
    "restaurant",
    "petit"
  ],
  "hook": {
    "title": "Zero-Shift Words",
    "content": "Some words need no conversion rule at all — they crossed the Channel and barely changed. The house: la maison, the word English kept as mansion. The hotel: l'hôtel, hospital's sibling with its H dropped. Blue is bleu, red is rouge — a Germanic word and a Latin one, both still recognizable.",
    "footnotes": [
      {
        "marker": "1",
        "title": "maison / mansion",
        "content": "Latin mansiō 'a staying, a dwelling' became maison in French and mansion in English — the same word, one modest, one grand.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "See the Word, Then Say It with a French Mouth",
    "content": "Recognition is step one. Step two is pronunciation: bleu has the tight French /ø/ vowel, rouge ends in a /ʒ/ English spelling never uses, and the final letters of grand and petit go quiet. You already own the vocabulary; the course is teaching your mouth to collect it.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The heart and the courage",
        "content": "cœur /kœʁ/ is Latin cor — the root of core, courage, accord. English kept the root inside other words; French kept the word itself.",
        "interest": true
      }
    ],
    "trap_note": "Don't read French with English letter-sounds: blanc is /blɑ̃/ with a silent c, and the n is thought, not said. The nasal clinic branch will train this properly."
  },
  "exercises": [
    {
      "id": "fr101_e1",
      "type": "matching_pairs",
      "prompt": "Match each English word with its French twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "house",
          "german": "la maison"
        },
        {
          "id": "p2",
          "english": "hotel",
          "german": "l'hôtel"
        },
        {
          "id": "p3",
          "english": "heart",
          "german": "le cœur"
        },
        {
          "id": "p4",
          "english": "blue",
          "german": "bleu"
        },
        {
          "id": "p5",
          "english": "red",
          "german": "rouge"
        },
        {
          "id": "p6",
          "english": "white",
          "german": "blanc"
        }
      ],
      "target_answer": "la maison, l'hôtel, le cœur, bleu, rouge, blanc",
      "meaning": "house, hotel, heart, blue, red, white",
      "explanation": "maison/mansion, hôtel/hospital: doublets. bleu is Germanic (like blue), rouge Latin (like ruby)."
    },
    {
      "id": "fr101_e2",
      "type": "reverse_cognate",
      "prompt": "maison is wearing fancy English clothes in one word. Which?",
      "target_answer": "mansion",
      "meaning": "maison and mansion are the same Latin dwelling",
      "explanation": "English borrowed mansiō twice, effectively: maison stayed the everyday word in French; mansion became the grand one in English."
    },
    {
      "id": "fr101_e3",
      "type": "shift_select",
      "prompt": "Pick the correct French rendering of 'the hotel':",
      "options": [
        "le hôtel",
        "l'hôtel",
        "la hôtel"
      ],
      "target_answer": "l'hôtel",
      "meaning": "the hotel",
      "explanation": "Before a vowel, le loses its vowel too: l'hôtel. The elision rule doesn't care which article — the collision is what matters."
    },
    {
      "id": "fr101_e4",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The heart is red'",
      "target_answer": "Le cœur est rouge",
      "meaning": "The heart is red",
      "word_bank": [
        "cœur",
        "rouge",
        "bleu",
        "Le",
        "la",
        "est"
      ],
      "explanation": "Le cœur est rouge — adjective after the noun, the default French position. (est arrives for real in lesson 5; borrow it here.)"
    },
    {
      "id": "fr101_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La maison est grande",
      "replays": 2,
      "target_answer": "La maison est grande",
      "meaning": "The house is big",
      "cues": [
        "The house: la maison (mansion's twin)",
        "is: est",
        "big — and feminine: grande"
      ],
      "explanation": "Adding feminine -e awakens the silent 'd' in grand: grande /ɡʁɑ̃d/. est is 'is' — the same word English owns.",
      "affirmation": "You heard the awakened 'd' — feminine -e made the silent ending speak."
    }
  ],
  "summary": {
    "outcome": "Recognize the zero-shift twins (maison, hôtel, bleu, rouge) and apply the first elision: l'hôtel.",
    "use_example": {
      "german": "La maison est grande et l'hôtel est petit.",
      "english": "The house is big and the hotel is small."
    },
    "takeaway": "When a word needs no rule, recognition is the whole skill — your eye first, then your mouth.",
    "curiosity_teaser": "Up next on Le Pont ([102] First Sentences Gym): see how Hidden Twins: Places & Colors leads directly into First Sentences Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The heart is red\" in French:",
    "target_answer": "Le cœur est rouge",
    "word_bank": [
      "rouge",
      "pas",
      "est",
      "cœur",
      "ne",
      "Le"
    ],
    "explanation": "Re-constructing \"Le cœur est rouge\" from the underlying rule cements the pattern of Hidden Twins: Places & Colors."
  }
};

export default lesson;
