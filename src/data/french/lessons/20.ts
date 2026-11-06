import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 20,
  "slug": "depuis-and-the-perfect-split",
  "title": "depuis & the Perfect Split",
  "subtitle": "J'habite ici depuis trois ans — why French uses the present tense where English says 'I have lived here for three years'",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "depuis",
    "habiter",
    "ans",
    "semaine",
    "heure",
    "quand",
    "ici",
    "attendre"
  ],
  "table_word_ids": [
    "depuis",
    "habiter",
    "ans",
    "semaine",
    "heure",
    "quand",
    "ici",
    "attendre"
  ],
  "hook": {
    "title": "If It Is Still True Right Now, Keep It in the Present!",
    "content": "Ask yourself: if you moved to Paris three years ago and you STILL live in Paris right now, is your living in Paris over, or is it happening at this very second? It is happening right now! English illogically drags in a past-looking tense ('I have lived here for three years'), but French tells the literal truth: J'habite ici depuis trois ans — 'I live here since three years'!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How depuis means both 'since' and 'for'",
        "content": "de ('from') + puis ('then/after', Latin postius) = 'from then onward'. Whether English says 'since Monday' (depuis lundi) or 'for three years' (depuis trois ans), French uses the single word depuis!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Present Tense + depuis + Duration or Starting Point",
    "content": "The formula is ironclad: whenever an action started in the past and is STILL continuing right now, use the PRESENT tense + depuis: J'attends le train depuis vingt minutes ('I have been waiting for the train for twenty minutes'). Tu habites ici depuis quand ? ('How long have you lived here?' / literally 'You live here since when?').",
    "linguist_note": "Romance languages treat ongoing-from-the-past states as unbounded present intervals, reserving the perfect (passé composé) for completed or negatively bounded intervals.",
    "trap_note": "The single biggest English-transfer trap in French: saying *J'ai habité ici depuis trois ans. If you still live there today, you MUST use the present tense: J'habite ici depuis trois ans!"
  },
  "exercises": [
    {
      "type": "shift_select",
      "prompt": "You started waiting for the bus ten minutes ago and you are STILL waiting. How do you say 'I have been waiting for ten minutes'?",
      "options": [
        "Je vais attendre depuis dix minutes",
        "J'ai attendu depuis dix minutes",
        "J'attends depuis dix minutes"
      ],
      "target_answer": "J'attends depuis dix minutes",
      "meaning": "I've been waiting for ten minutes",
      "explanation": "Because you are still waiting right now, French uses the present tense J'attends + depuis.",
      "id": "fr20_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'J'habite ici depuis trois ans'?",
      "german": "J'habite ici depuis trois ans",
      "natural": "I have been living here for three years",
      "options": [
        "I live here since three years",
        "I have lived here during three years",
        "I have been living here for three years"
      ],
      "target_answer": "I live here since three years",
      "meaning": "Literal structure: I live here since three years",
      "explanation": "French keeps the verb in the present (J'habite) and uses depuis ('since') before the time span.",
      "id": "fr20_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences accurately translate 'J'apprends le français depuis un an'?",
      "german": "J'apprends le français depuis un an",
      "meaning": "I have been learning French for a year",
      "renderings": [
        "I've been learning French for a year",
        "I have studied French for one year (and still do)"
      ],
      "traps": [
        "I learned French a year ago and stopped",
        "I am going to learn French for a year"
      ],
      "target_answer": "I've been learning French for a year",
      "explanation": "Present tense + depuis always signals that the action began in the past and continues in the present.",
      "id": "fr20_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I have lived in Paris for two years (and still do)",
      "cues": [
        "Use present tense J'habite à Paris + depuis deux ans"
      ],
      "idea_parts": [
        "present action → J'habite à Paris",
        "duration → depuis deux ans"
      ],
      "target_answer": "J'habite à Paris depuis deux ans",
      "meaning": "I have lived in Paris for two years",
      "word_bank": [
        "deux",
        "J'habite",
        "depuis",
        "ans",
        "Paris",
        "à",
        "J'ai",
        "habité"
      ],
      "explanation": "J'habite stays in the present tense because you still live in Paris.",
      "diagnosis": {
        "slip": "used passé composé J'ai habité",
        "cue": "Ongoing duration with depuis always takes the present tense: J'habite."
      },
      "id": "fr20_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu attends ici depuis quand",
      "replays": 2,
      "target_answer": "Tu attends ici depuis quand",
      "meaning": "How long have you been waiting here?",
      "cues": [
        "present tense: Tu attends ici",
        "since when: depuis quand"
      ],
      "explanation": "depuis quand at the end asks 'since when / how long'.",
      "affirmation": "You kept attends in the present tense with depuis quand.",
      "id": "fr20_e5"
    }
  ],
  "summary": {
    "outcome": "Express ongoing duration ('have been doing for / since') using the present tense + depuis.",
    "use_example": {
      "german": "Je suis ici depuis une heure.",
      "english": "I've been here for an hour."
    },
    "takeaway": "If it is still happening right now, French refuses the past tense: Present + depuis.",
    "curiosity_teaser": "Up next on Le Pont ([2001] The Trap Lesson): see how depuis & the Perfect Split leads directly into The Trap Lesson."
  },
  "twist": {
    "prompt": "Ungraded — 'We have been here since Monday' (use Nous sommes):",
    "target_answer": "Nous sommes ici depuis lundi",
    "word_bank": [
      "ici",
      "Nous",
      "avons",
      "lundi",
      "depuis",
      "sommes",
      "été"
    ],
    "explanation": "Because we are still here now, French says 'We are here since Monday': Nous sommes ici depuis lundi."
  },
  "foreshadow": {
    "line": "Having mastered depuis & the Perfect Split, look ahead to Topic 21 (Plus, Moins, aussi), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 21
  },
  "payoff": {
    "ofLesson": 19,
    "text": "The foundation from Topic 19 (The Storytelling Past) now pays off directly inside depuis & the Perfect Split: every sentence here builds on that earlier step."
  }
};

export default lesson;
