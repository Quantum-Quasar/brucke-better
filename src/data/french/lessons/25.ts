import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 25,
  "slug": "il-y-a",
  "title": "il y a",
  "subtitle": "'It has there' = there is / there are — and with a time span, 'ago' (il y a trois ans)",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "il_y_a",
    "y",
    "avoir",
    "a",
    "ans",
    "semaine",
    "minute",
    "café",
    "complication"
  ],
  "table_word_ids": [
    "il_y_a",
    "y",
    "avoir",
    "a",
    "ans",
    "semaine",
    "minute",
    "café",
    "complication"
  ],
  "hook": {
    "title": "Three Tiny Words You Already Own",
    "content": "Take il ('it'), y ('there', from Topic 22), and a ('has', from Topic 10) and snap them together: il y a (/il j‿a/). Word for word, it says 'It has there'. In French, that three-word machine does TWO massive jobs: (1) Before a thing or person, it means both 'there is' AND 'there are' (Il y a un café 'There is a café', Il y a deux trains 'There are two trains'). (2) Before a length of time inside a past sentence, it means 'AGO': J'ai visité Paris il y a trois ans ('I visited Paris three years ago')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why il y a never becomes plural *il y ont",
        "content": "Because il is an impersonal dummy subject ('it') and the nouns after a are direct objects ('it has two trains there'), a stays singular even before a hundred things!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Existence ('There Is/Are') vs. Elapsed Time ('Ago')",
    "content": "Notice the contrast between Topic 20's depuis and Topic 25's il y a with time: J'habite ici depuis trois ans (Present + depuis = 'I have lived here FOR three years', still ongoing) vs. Je suis arrivé il y a trois ans (Passé composé + il y a = 'I arrived three years AGO', completed point in the past)! And to say 'There is not / There are no', wrap n'...pas around y a and collapse the article to de: Il n'y a pas de complication ('There is no complication').",
    "linguist_note": "Spanish hay (ha + y) is the exact historical twin of French il y a, fused into a single word.",
    "trap_note": "The shortcut your mind will offer: confusing depuis trois ans ('for three years', ongoing) with il y a trois ans ('three years ago', completed). Completed past + il y a = AGO!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each il y a expression with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il y a un bon restaurant ici",
          "german": "There is a good restaurant here"
        },
        {
          "id": "p2",
          "english": "Il y a trois trains",
          "german": "There are three trains"
        },
        {
          "id": "p3",
          "english": "Il n'y a pas de problème",
          "german": "There is no problem"
        },
        {
          "id": "p4",
          "english": "il y a dix minutes (with past tense)",
          "german": "ten minutes ago"
        },
        {
          "id": "p5",
          "english": "il y a deux ans (with past tense)",
          "german": "two years ago"
        }
      ],
      "target_answer": "There is a good restaurant here, There are three trains, There is no problem, ten minutes ago, two years ago",
      "meaning": "Il y a un bon restaurant ici, Il y a trois trains, Il n'y a pas de problème, il y a dix minutes (with past tense), il y a deux ans (with past tense)",
      "explanation": "il y a means 'there is/are' before objects, and 'ago' before a time span.",
      "id": "fr25_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word breakdown of 'Il y a un café ici'?",
      "german": "Il y a un café ici",
      "natural": "There is a café here",
      "options": [
        "There is a café here",
        "It there has a café here",
        "He there is a café here"
      ],
      "target_answer": "It there has a café here",
      "meaning": "Literal structure: It there has a café here",
      "explanation": "il (it) + y (there) + a (has) = 'It there has'.",
      "id": "fr25_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'She arrived ten minutes ago'?",
      "options": [
        "Elle arrive il y a dix minutes",
        "Elle est arrivée depuis dix minutes",
        "Elle est arrivée il y a dix minutes"
      ],
      "target_answer": "Elle est arrivée il y a dix minutes",
      "meaning": "She arrived ten minutes ago",
      "explanation": "A completed past event (est arrivée) + il y a + time span means 'ten minutes ago'.",
      "id": "fr25_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "there is a good bistro here (use un bon restaurant)",
      "cues": [
        "There is → Il y a + a good restaurant here → un bon restaurant ici"
      ],
      "idea_parts": [
        "existence opener → Il y a",
        "noun phrase → un bon restaurant",
        "place → ici"
      ],
      "target_answer": "Il y a un bon restaurant ici",
      "meaning": "There is a good restaurant here",
      "word_bank": [
        "la",
        "Il",
        "est",
        "restaurant",
        "un",
        "y",
        "a",
        "bon",
        "ici"
      ],
      "explanation": "Il y a opens any existence statement.",
      "diagnosis": {
        "slip": "used Il est instead of Il y a",
        "cue": "Use Il y a ('it has there') for 'there is / there are'."
      },
      "id": "fr25_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il n'y a pas de complication",
      "replays": 2,
      "target_answer": "Il n'y a pas de complication",
      "meaning": "There is no complication",
      "cues": [
        "negative existence: Il n'y a pas",
        "partitive collapse: de complication"
      ],
      "explanation": "n' wraps around y a (Il n'y a pas), and une collapses to bare de after negation.",
      "affirmation": "You wrote Il n'y a pas de complication with the negative de.",
      "id": "fr25_e5"
    }
  ],
  "summary": {
    "outcome": "Use il y a for both 'there is / there are' and 'ago' (with time spans), and negate it with il n'y a pas de.",
    "use_example": {
      "german": "Il y a deux ans, il y avait un petit café ici.",
      "english": "Two years ago, there was a small café here."
    },
    "takeaway": "il + y + a ('it there has') means 'there is/are' in space and 'ago' in time.",
    "curiosity_teaser": "Up next on Le Pont ([2501] It Has There): see how il y a leads directly into It Has There."
  },
  "twist": {
    "prompt": "Ungraded — 'I saw this film two years ago' (use J'ai vu ce film):",
    "target_answer": "J'ai vu ce film il y a deux ans",
    "word_bank": [
      "J'ai",
      "vu",
      "ce",
      "a",
      "ans",
      "deux",
      "la",
      "film",
      "y",
      "il",
      "depuis"
    ],
    "explanation": "J'ai vu ce film (completed past) + il y a deux ans ('two years ago')."
  },
  "foreshadow": {
    "line": "Having mastered il y a, look ahead to Topic 26 (The Would-World), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 26
  },
  "payoff": {
    "ofLesson": 24,
    "text": "The foundation from Topic 24 (Reflexives & la Routine) now pays off directly inside il y a: every sentence here builds on that earlier step."
  }
};

export default lesson;
