import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2003,
  "slug": "dative-verbs-helfen-danken-gefallen",
  "title": "Dative Verbs: helfen, danken, gefallen",
  "subtitle": "The club that refuses the accusative — contrasted with topic 10's Him-Case verbs",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "helfen",
    "danken",
    "gefallen",
    "geben",
    "sehen",
    "finden",
    "mir",
    "dir",
    "schmecken",
    "wünschen",
    "glück",
    "mut",
    "wunsch"
  ],
  "table_word_ids": [
    "helfen",
    "danken",
    "gefallen",
    "geben",
    "sehen",
    "finden",
    "mir",
    "dir",
    "schmecken",
    "wünschen",
    "glück",
    "mut",
    "wunsch",
    "mechaniker",
    "amerikanisch"
  ],
  "hook": {
    "title": "The Two Clubs",
    "content": "German verbs sort into two clubs, and the membership is non-negotiable. The accusative club — helfen? no: sehen, finden, nehmen — acts directly ON things: Ich sehe ihn, Ich finde das Buch. The dative club — helfen, danken, gefallen, geben — works TOWARD someone: Ich helfe dir, Ich danke dir, Es gefällt mir. English grammar pretends the distinction does not exist ('help him', 'thank him' — both objects). German grammar knows better: helping is done TO someone, thanking goes TO someone, pleasing falls TO someone. Learn the club rosters and the dative stops being a case and becomes common sense.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Full Dative Roster",
        "content": "helfen (help), danken (thank), gefallen (please), gehören (belong to), folgen (follow), passen (suit), schmecken (taste-good-to), fehlen (be-missing-to), antworten (answer-to), glauben (believe someone!). Notice the pattern: all involve a receiver, a responder, or an experiencer — the dative is the case of being-affected."
      }
    ]
  },
  "pattern": {
    "title": "The Contrast Pairs",
    "content": "Pair one: Ich sehe IHN (sehen acts on him — accusative) versus Ich helfe IHM (helping goes to him — dative). Pair two: Ich finde DAS BUCH (direct find) versus Das Buch gefällt MIR (the book pleases TO me). Pair three: geben plays BOTH sides — Ich gebe IHN? no: Ich gebe ES ihm: the thing given is accusative (es), the receiver is dative (ihm) — the double-object verb. The memory aid: ask 'does the verb transfer, respond, or affect?' Transfer (geben, schicken) and respond (danken, antworten, folgen) and affect-from-outside (helfen, gefallen, schmecken, passen) → dative receiver.",
    "footnotes": [],
    "linguist_note": "English once agreed: 'help' was dative in Old English (ic helpe þē — I help TO-thee), and 'me seems', 'it pleases me (to)' are the fossils. The dative verbs are simply the oldest verbs, preserving the oldest case."
  },
  "exercises": [
    {
      "id": "l2003_e1",
      "type": "matching_pairs",
      "prompt": "The contrast — match each verb with its case demand:",
      "matching_pairs": [
        {
          "id": "dv1",
          "english": "helfen + DATIVE (help to)",
          "german": "Ich helfe dir"
        },
        {
          "id": "dv2",
          "english": "sehen + ACCUSATIVE (see him)",
          "german": "Ich sehe ihn"
        },
        {
          "id": "dv3",
          "english": "danken + DATIVE (thank to)",
          "german": "Ich danke dir"
        },
        {
          "id": "dv4",
          "english": "gefallen + DATIVE (please to)",
          "german": "Es gefällt mir"
        },
        {
          "id": "dv5",
          "english": "schmecken + DATIVE (taste to me)",
          "german": "Es schmeckt mir"
        }
      ],
      "target_answer": "Ich helfe dir, Ich sehe ihn, Ich danke dir, Es gefällt mir, Es schmeckt mir",
      "meaning": "I help you, I see him, I thank you, it pleases me, it tastes good to me",
      "explanation": "Two clubs: acting-on takes accusative (ihn), acting-toward takes dative (dir/mir) — and schmecken is the tasting club's newest member."
    },
    {
      "id": "l2003_e2",
      "type": "shift_select",
      "prompt": "Club check: 'Ich folge _____ Mann.' (I follow the man — folgen!):",
      "options": [
        "dem",
        "der",
        "den",
        "das"
      ],
      "target_answer": "dem",
      "meaning": "Ich folge dem Mann = I follow the man (to-the-man)",
      "explanation": "folgen joined the dative club — following goes TO the followed. dem Mann, never den Mann. wünschen joined too: Ich wünsche dir Glück — the wish aims at its receiver."
    },
    {
      "id": "l2003_e3",
      "type": "shift_select",
      "prompt": "The double-object verb: 'Gib _____ das Buch!' (give HIM the book — receiver):",
      "options": [
        "ihren",
        "ihm",
        "seine",
        "ihn"
      ],
      "target_answer": "ihm",
      "meaning": "Gib ihm das Buch = Give him the book",
      "explanation": "geben plays both sides: the thing given is accusative, the receiver is dative — ihm, the 'give it him' fossil."
    },
    {
      "id": "l2003_e4",
      "type": "reverse_cognate",
      "prompt": "Which dative-club verb is the twin of English 'follow'?",
      "target_answer": "folgen",
      "meaning": "follow ↔ folgen (follows = ge-folgt)",
      "explanation": "Same verb, same dative demand — English 'follow' once took a dative too ('follow me' was 'follow TO-me' in feel)."
    },
    {
      "id": "l2003_e5",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Ich sehe ihn, und ich helfe ihm.",
      "natural": "I see him, and I help him.",
      "options": [
        "I see to-him, and I help to-him.",
        "I see him, and I help to-him.",
        "I see him, and I help him."
      ],
      "target_answer": "I see him, and I help to-him.",
      "meaning": "I see him, and I help him.",
      "explanation": "One letter apart, two clubs: sehen acts ON him (ihn, accusative), helfen acts TO him (ihm, dative). Read it the German way — 'help to-him' — and the case stops being invisible."
    }
  ],
  "summary": {
    "outcome": "Roster the dative verbs and contrast them with accusative verbs in pairs.",
    "use_example": {
      "german": "Ich sehe ihn, und ich helfe ihm.",
      "english": "I see him (acc), and I help him (dat)."
    },
    "takeaway": "helfen, danken, gefallen, folgen, gehören — the dative club acts TOWARD; sehen, finden, nehmen act ON.",
    "curiosity_teaser": "Next: compound noun engineering — Handschuh is hand-shoe: German builds words like Lego, and so did English."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Dative Verbs: helfen, danken, gefallen (Today that is very good):",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "ist",
      "Heute",
      "sehr",
      "nicht",
      "gut",
      "das"
    ],
    "explanation": "Re-assembling \"Heute ist das sehr gut\" from scratch locks in the structural pattern of Dative Verbs: helfen, danken, gefallen without relying on short-term echo."
  }
};

export default lesson;
