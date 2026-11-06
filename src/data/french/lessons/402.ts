import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 402,
  "slug": "negation-in-the-wild",
  "title": "Negation in the Wild",
  "subtitle": "Flip drills: statement → negative without moving anything else",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "pas",
    "ne",
    "vouloir",
    "être",
    "cest",
    "avoir",
    "jai"
  ],
  "table_word_ids": [
    "pas",
    "ne",
    "vouloir",
    "cest",
    "être",
    "avoir",
    "jai"
  ],
  "hook": {
    "title": "One Move, Repeated",
    "content": "Nothing new here — just the flip, until it's boring. Every sentence you can build, you can now refuse. That symmetry (every statement has a negative twin, same words, same order) is what makes French negation feel small once you see it."
  },
  "pattern": {
    "title": "The Flip Is Two Words",
    "content": "Statement → negative: add ne before the conjugated verb, pas after it. Nothing else moves. This reliability is the payoff of the sandwich design — compare English, where negation drags 'do' in and changes the verb back to bare.",
    "trap_note": "c'est → ce n'est pas: even the fused c'est un-fuses to take the sandwich. The n' is ne eliding before est — the apostrophe law again."
  },
  "exercises": [
    {
      "id": "fr402_e1",
      "type": "shift_select",
      "prompt": "When 'C'est bon' flips to the negative, how does the negation sandwich wrap 'est'?",
      "options": [
        "Ne c'est pas bon",
        "C'est ne pas bon",
        "Ce n'est pas bon"
      ],
      "target_answer": "Ce n'est pas bon",
      "meaning": "It is not good",
      "explanation": "c'est un-fuses into ce + est so ne can step in and elide before the vowel: Ce n'est pas bon."
    },
    {
      "id": "fr402_e2",
      "type": "derive",
      "prompt": "Flip to negative: 'J'ai le temps' (I have the time) →",
      "english_hint": "ne … pas around ai",
      "target_answer": "Je n'ai pas le temps",
      "meaning": "I don't have time",
      "explanation": "je + n'ai: ne elides before ai. The sandwich survives the apostrophe."
    },
    {
      "id": "fr402_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you don't want the complication — you came for the tradition",
      "cues": [
        "Sandwich around veux",
        "la complication — consonant restart",
        "je ne veux pas la complication"
      ],
      "target_answer": "Je ne veux pas la complication",
      "meaning": "I don't want the complication",
      "word_bank": [
        "ne",
        "Je",
        "un",
        "la",
        "veux",
        "pas",
        "complication",
        "le"
      ],
      "idea_parts": [
        "the refusal → je ne veux pas",
        "the thing → la complication",
        "nothing else moves"
      ],
      "explanation": "Statement machinery, negation machinery — one sentence, zero new pieces."
    },
    {
      "id": "fr402_e4",
      "type": "shift_select",
      "prompt": "In casual everyday speech, how is 'I don't want' typically shortened?",
      "options": [
        "Je veux pas",
        "Pas je veux",
        "Je ne veux"
      ],
      "target_answer": "Je veux pas",
      "meaning": "Spoken French drops the ne",
      "explanation": "In casual conversation, the first slice falls: je veux pas. Understand it as the sandwich, lazily served — and keep both slices in writing."
    },
    {
      "id": "fr402_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence (formal register).",
      "spoken": "Ce n'est pas possible",
      "replays": 2,
      "target_answer": "Ce n'est pas possible",
      "meaning": "It's not possible",
      "cues": [
        "ce + n' — the elision",
        "est inside the sandwich",
        "possible — the -able family's cousin, same in both languages"
      ],
      "explanation": "Ce n'est pas possible — three conversions in four words: the fusion, the elision, the -ible twin.",
      "affirmation": "You wrote the n' — the sandwich kept its first slice through the apostrophe."
    }
  ],
  "summary": {
    "outcome": "Flip any sentence negative with two words, handle the elided n', and recognize the dropped ne of speech.",
    "use_example": {
      "german": "Ce n'est pas possible — mais ce n'est pas grave.",
      "english": "It's not possible — but it's not serious."
    },
    "takeaway": "The flip is two words around the verb. Even c'est un-fuses to be hugged.",
    "curiosity_teaser": "Up next on Le Pont ([5] être & Its Secrets): see how Negation in the Wild leads directly into être & Its Secrets."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I don't want the complication\" in French:",
    "target_answer": "Je ne veux pas la complication",
    "word_bank": [
      "Je",
      "veux",
      "la",
      "très",
      "ne",
      "pas",
      "complication",
      "ici"
    ],
    "explanation": "Re-constructing \"Je ne veux pas la complication\" from the underlying rule cements the pattern of Negation in the Wild."
  }
};

export default lesson;
