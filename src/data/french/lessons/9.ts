import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9,
  "slug": "vous-and-tu",
  "title": "vous & tu",
  "subtitle": "The T–V politeness line: tu vs vous, the universal -ez ending, and social register",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "vous",
    "tu",
    "voulez",
    "êtes",
    "avez",
    "allez",
    "bonjour",
    "merci",
    "sil_vous_plait"
  ],
  "table_word_ids": [
    "vous",
    "tu",
    "voulez",
    "êtes",
    "avez",
    "allez",
    "bonjour",
    "merci",
    "sil_vous_plait"
  ],
  "hook": {
    "title": "Why One Person Is Called 'You All'",
    "content": "In the 4th century AD, when the Roman Empire split between two emperors, addressing one emperor meant addressing both — so courtiers spoke to a single ruler using the plural vōs ('you all') instead of singular tū ('thou'). That habit spread across Europe: French kept tu for family, close friends, and children, and uses plural vous as the respectful shield for strangers, shopkeepers, and groups.",
    "footnotes": [
      {
        "marker": "1",
        "title": "English did the exact same thing — then lost 'thou'",
        "content": "English once contrasted intimate 'thou/thee' with plural/polite 'ye/you'. English eventually promoted polite 'you' to everyone and retired 'thou'; French kept both rungs of the ladder alive.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Universal -ez Sound of vous",
    "content": "Here is the best gift in French verb conjugation: with vous, virtually every verb in the language ends in the exact same sound — -ez (/e/), identical to the -er infinitive sound! Tu veux becomes vous voulez. Tu parles becomes vous parlez. Tu as becomes vous avez. Tu vas becomes vous allez. Only vous êtes ('you are') keeps its ancient Latin -tes ending.",
    "linguist_note": "Latin 2nd-person plural -ātis softened to Old French -ez (/ets/ → /e/), giving modern French a nearly universal polite/plural verb marker.",
    "trap_note": "The shortcut your mind will offer: pronouncing the -z of voulez or parlez. That final -z is completely silent — its only job is to make the e sound like /e/ (as in café)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each informal tu form with its polite/plural vous counterpart:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "tu veux (you want)",
          "german": "vous voulez"
        },
        {
          "id": "p2",
          "english": "tu es (you are)",
          "german": "vous êtes"
        },
        {
          "id": "p3",
          "english": "tu as (you have)",
          "german": "vous avez"
        },
        {
          "id": "p4",
          "english": "tu vas (you go)",
          "german": "vous allez"
        },
        {
          "id": "p5",
          "english": "please (to a stranger)",
          "german": "s'il vous plaît"
        }
      ],
      "target_answer": "vous voulez, vous êtes, vous avez, vous allez, s'il vous plaît",
      "meaning": "tu veux (you want), tu es (you are), tu as (you have), tu vas (you go), please (to a stranger)",
      "explanation": "Notice how voulez, avez, and allez all end in -ez (/e/), while êtes wears a circumflex hat.",
      "id": "fr9_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You walk into a Paris bakery for the first time. How do you ask the baker 'Do you have bread?'",
      "options": [
        "Vous avez du pain",
        "Tu as du pain",
        "Vous as du pain"
      ],
      "target_answer": "Vous avez du pain",
      "meaning": "Do you have bread? (polite)",
      "explanation": "With a shopkeeper or stranger, vous is mandatory — and takes avez.",
      "id": "fr9_e2"
    },
    {
      "type": "derive",
      "prompt": "Shift from informal 'Tu veux le café' to polite vous:",
      "english_hint": "tu → vous, veux → voulez",
      "target_answer": "Vous voulez le café",
      "meaning": "Do you want the coffee? (polite)",
      "explanation": "voulez ends in -ez (/e/).",
      "id": "fr9_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you are politely asking a stranger if they are ready (prêt)",
      "cues": [
        "You are (polite) → Vous êtes",
        "ready → prêt"
      ],
      "idea_parts": [
        "polite subject + verb → Vous êtes",
        "adjective → prêt"
      ],
      "target_answer": "Vous êtes prêt",
      "meaning": "Are you ready? (polite)",
      "word_bank": [
        "prêt",
        "Vous",
        "êtes",
        "Tu",
        "es"
      ],
      "explanation": "Vous êtes links with a /z/ sound in speech (/vu.z‿ɛt/).",
      "diagnosis": {
        "slip": "used tu es instead of vous êtes",
        "cue": "Use Vous êtes for polite address."
      },
      "id": "fr9_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vous voulez réserver une table",
      "replays": 2,
      "target_answer": "Vous voulez réserver une table",
      "meaning": "Would you like to reserve a table?",
      "cues": [
        "polite opener: Vous voulez",
        "infinitive + object: réserver une table"
      ],
      "explanation": "voulez (/vule/) and réserver (/ʁezɛʁve/) end in the exact same /e/ vowel!",
      "affirmation": "You distinguished conjugated voulez (-ez) from parked infinitive réserver (-er)!",
      "id": "fr9_e5"
    }
  ],
  "summary": {
    "outcome": "Navigate the tu/vous register line and conjugate polite verbs with the -ez ending.",
    "use_example": {
      "german": "Bonjour, vous voulez un café, s'il vous plaît ?",
      "english": "Hello, would you like a coffee, please?"
    },
    "takeaway": "With vous, -ez (/e/) is your master key — and it sounds identical to the -er infinitive.",
    "curiosity_teaser": "Up next on Le Pont ([901] Merci & Bonjour Gym): see how vous & tu leads directly into Merci & Bonjour Gym."
  },
  "twist": {
    "prompt": "Ungraded — politely tell a stranger 'You are very kind' (use gentil):",
    "target_answer": "Vous êtes très gentil",
    "word_bank": [
      "très",
      "es",
      "gentil",
      "êtes",
      "Tu",
      "Vous"
    ],
    "explanation": "When vous addresses one person, the adjective stays singular (gentil) even though the verb êtes is plural!"
  },
  "foreshadow": {
    "line": "Having mastered vous & tu, look ahead to Topic 10 (avoir & the H It Lost), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 10
  },
  "payoff": {
    "ofLesson": 8,
    "text": "The foundation from Topic 8 (The -eur Bridge) now pays off directly inside vous & tu: every sentence here builds on that earlier step."
  }
};

export default lesson;
