import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2502,
  "slug": "lesson-2502",
  "title": "il y a Gym",
  "subtitle": "Negating and questioning existence: il n'y a pas de…, est-ce qu'il y a…?",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "il_y_a",
    "y",
    "en_pron",
    "pas",
    "de",
    "est_ce_que",
    "complication",
    "table",
    "pain"
  ],
  "table_word_ids": [
    "il_y_a",
    "y",
    "en_pron",
    "pas",
    "de",
    "est_ce_que",
    "complication",
    "table",
    "pain"
  ],
  "hook": {
    "title": "Questioning and Negating il y a — Plus Il y en a",
    "content": "Negate il y a by wrapping n'...pas around y a and collapsing the article to bare de: Il n'y a pas de pain ('There is no bread'). Question it with Est-ce qu'il y a…? And combine it with en ('some') as Il y en a ('There is some / There are some')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How n' hugs BOTH y and a inside Il n'y a pas",
        "content": "Because y is a left-walking pronoun attached to a, the negation sandwich wraps around the pair together: Il n'y a pas!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Il y a → Il n'y a pas de… / Est-ce qu'il y a… / Il y en a",
    "content": "Run these three patterns across everyday situations.",
    "linguist_note": "Existential negation triggers partitive de-reduction (Il n'y a pas de + bare noun).",
    "trap_note": "Never forget to collapse un/une/du/de la/des to bare de (or d' before a vowel) after Il n'y a pas!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each variation of il y a with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Est-ce qu'il y a une table ?",
          "german": "Is there a table?"
        },
        {
          "id": "p2",
          "english": "Il n'y a pas de problème",
          "german": "There is no problem"
        },
        {
          "id": "p3",
          "english": "Il n'y a pas d'eau (elided de)",
          "german": "There is no water"
        },
        {
          "id": "p4",
          "english": "Il y en a (with en = some)",
          "german": "There is some / There are some"
        },
        {
          "id": "p5",
          "english": "Il n'y en a pas",
          "german": "There isn't any / There are none"
        }
      ],
      "target_answer": "Is there a table?, There is no problem, There is no water, There is some / There are some, There isn't any / There are none",
      "meaning": "Est-ce qu'il y a une table ?, Il n'y a pas de problème, Il n'y a pas d'eau (elided de), Il y en a (with en = some), Il n'y en a pas",
      "explanation": "y a stays together inside Est-ce qu'il y a and Il n'y a pas.",
      "id": "fr2502_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'There is no bread'?",
      "options": [
        "Il n'y a pas du pain",
        "Il y n'a pas de pain",
        "Il n'y a pas de pain"
      ],
      "target_answer": "Il n'y a pas de pain",
      "meaning": "There is no bread",
      "explanation": "n' goes before y a, and du pain collapses to bare de pain after pas!",
      "id": "fr2502_e2"
    },
    {
      "type": "derive",
      "prompt": "Ask 'Is there a train tonight?' by placing Est-ce qu' in front of il y a un train ce soir:",
      "english_hint": "Est-ce qu' + il y a...",
      "target_answer": "Est-ce qu'il y a un train ce soir",
      "meaning": "Is there a train tonight?",
      "explanation": "que elides before il: Est-ce qu'il y a un train ce soir.",
      "id": "fr2502_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "there is no reservation for tonight",
      "cues": [
        "There is not → Il n'y a pas",
        "of reservation → de réservation",
        "for tonight → pour ce soir"
      ],
      "idea_parts": [
        "negative existence → Il n'y a pas",
        "collapsed noun → de réservation",
        "time → pour ce soir"
      ],
      "target_answer": "Il n'y a pas de réservation pour ce soir",
      "meaning": "There is no reservation for tonight",
      "word_bank": [
        "soir",
        "une",
        "de",
        "la",
        "ce",
        "a",
        "réservation",
        "n'y",
        "pas",
        "pour",
        "Il"
      ],
      "explanation": "une réservation collapses to de réservation after Il n'y a pas.",
      "diagnosis": {
        "slip": "kept une",
        "cue": "Collapse une to de after Il n'y a pas: pas de réservation."
      },
      "id": "fr2502_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Est-ce qu'il y a du café ? Oui, il y en a",
      "replays": 2,
      "target_answer": "Est-ce qu'il y a du café ? Oui, il y en a",
      "meaning": "Is there any coffee? Yes, there is some",
      "cues": [
        "Est-ce qu'il y a du café",
        "Oui, il y en a"
      ],
      "explanation": "du café in the question becomes en in the answer: Oui, il y en a!",
      "affirmation": "You paired Est-ce qu'il y a with Oui, il y en a!",
      "id": "fr2502_e5"
    }
  ],
  "summary": {
    "outcome": "Question and negate il y a (Est-ce qu'il y a, Il n'y a pas de) and combine it with en (Il y en a).",
    "use_example": {
      "german": "Il n'y a pas de problème, il y en a beaucoup.",
      "english": "There's no problem, there's plenty of it."
    },
    "takeaway": "Il y a → Il n'y a pas de (none) → Il y en a (there is some).",
    "curiosity_teaser": "Up next on Le Pont ([26] The Would-World): see how il y a Gym leads directly into The Would-World."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"There is no reservation for tonight\" in French:",
    "target_answer": "Il n'y a pas de réservation pour ce soir",
    "word_bank": [
      "ne",
      "Il",
      "pas",
      "réservation",
      "très",
      "a",
      "de",
      "ce",
      "n'y",
      "pour",
      "soir"
    ],
    "explanation": "Re-constructing \"Il n'y a pas de réservation pour ce soir\" from the underlying rule cements the pattern of il y a Gym."
  }
};

export default lesson;
