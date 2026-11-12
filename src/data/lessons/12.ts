import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 12,
  "slug": "nicht-and-kein",
  "title": "Nicht & Kein",
  "subtitle": "not and nicht are the same 'no-thing' — and each has its own job",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "nicht",
    "kein",
    "wissen",
    "haben",
    "können",
    "zeit",
    "haus",
    "kurz",
    "laut",
    "leise",
    "billig",
    "insel",
    "nebel",
    "baum",
    "getränk",
    "tasse"
  ],
  "table_word_ids": [
    "nicht",
    "kein",
    "wissen",
    "haben",
    "können",
    "zeit",
    "haus",
    "kurz",
    "laut",
    "leise",
    "billig",
    "insel",
    "nebel",
    "baum",
    "getränk",
    "tasse"
  ],
  "hook": {
    "title": "No-Thing, Twice",
    "content": "English built not from nāwiht — 'no thing'. German built nicht from ni wiht — 'never a creature'. Same recipe, same ancient word for 'being' (English kept it in the archaic wight), and German even pronounces the old gh: nicht's ch is the gh of naught, still sounding after a thousand years of English silence. But German splits the job: nouns are negated with kein (not one), verbs and adjectives with nicht. English has one not for everything; German has a not for things and a not for actions.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The gh You Can Finally Hear",
        "content": "not ← nāwiht and nicht ← ni wiht both contained the guttural gh. English silenced it; German kept it as ch. When you say nicht, you are pronouncing the h that English spelling still writes in 'nought' but never sounds."
      }
    ]
  },
  "pattern": {
    "title": "kein for Nouns, nicht for Verbs",
    "content": "Negating a noun? Use kein, declined exactly like ein: Ich habe kein Haus (I have no house), keine Zeit (no time), keinen Kaffee (not a coffee — the Him-Case again!). Negating a verb or adjective? Use nicht: Ich kann nicht kommen (I cannot come), Das ist nicht gut (that is not good). Placement: nicht usually lands at the end of simple clauses, right where the action dies. Ich weiß es nicht — I know it not: three words, one of them the twin of wise (weiß), one the twin of it (es).\n\nOne Denglisch ladder, read it the German way first: Ich will nicht gehen → I want not to go → I don't want to go. The odd middle line is the lesson: nicht sits right before the bare infinitive, exactly where English 'not' sat before want and will merged and English shipped its 'not' forward.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “not is one word, one place.” German has two negations doing two jobs — nicht negates verbs and adjectives, kein negates a *noun* and then declines like ein. If you reach for nicht in front of a noun, that is the slip: you want kein.",
    "linguist_note": "kein ← nekein ← ni + ein ('not one') is the exact parallel of English none ← 'not one'. The languages negated possession with the same arithmetic — and German never let the word shrink."
  },
  "exercises": [
    {
      "id": "l12_e1",
      "type": "shift_select",
      "prompt": "Which familiar pair breaks the pattern of the other three?",
      "options": [
        "out → aus",
        "what → was",
        "two → zwei",
        "week → Woche"
      ],
      "target_answer": "week → Woche",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Out, what and two use T → S/Z. Week → Woche uses K → CH."
    },
    {
      "id": "l12_e2",
      "type": "matching_pairs",
      "prompt": "Match each negated sentence with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "nk1",
          "english": "I cannot come",
          "german": "Ich kann nicht kommen"
        },
        {
          "id": "nk2",
          "english": "I have no house",
          "german": "Ich habe kein Haus"
        },
        {
          "id": "nk3",
          "english": "That is not good",
          "german": "Das ist nicht gut"
        },
        {
          "id": "nk4",
          "english": "We have no time",
          "german": "Wir haben keine Zeit"
        },
        {
          "id": "nk5",
          "english": "not loud — quiet",
          "german": "nicht laut — leise"
        },
        {
          "id": "nk6",
          "english": "The drink is not cheap",
          "german": "Das Getränk ist nicht billig"
        },
        {
          "id": "nk7",
          "english": "No island",
          "german": "keine Insel"
        },
        {
          "id": "nk8",
          "english": "No fog today",
          "german": "kein Nebel heute"
        },
        {
          "id": "recall1",
          "german": "die Tasse",
          "english": "the cup"
        },
        {
          "id": "recall2",
          "german": "Wir können wissen",
          "english": "We can know"
        },
        {
          "id": "spaced1",
          "german": "das Bett ist teuer",
          "english": "the bed is expensive"
        }
      ],
      "target_answer": "Ich kann nicht kommen, Ich habe kein Haus, Das ist nicht gut, Wir haben keine Zeit, nicht laut — leise, Das Getränk ist nicht billig, keine Insel, kein Nebel heute, die Tasse, Wir können wissen, das Bett ist teuer",
      "meaning": "I cannot come; I have no house; That is not good; We have no time; not loud — quiet; The drink is not cheap; No island; No fog today; the cup; We can know; the bed is expensive",
      "explanation": "Verbs and adjectives take nicht; noun phrases take kein, declined like ein: die Insel → keine Insel, der Nebel → kein Nebel. Two negations, two jobs."
    },
    {
      "id": "l12_e3",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Ich will keine Tasse.",
      "natural": "I don't want a cup.",
      "options": [
        "Not I want a cup.",
        "I don't want a cup.",
        "I want no cup."
      ],
      "target_answer": "I want no cup.",
      "meaning": "I don't want a cup.",
      "explanation": "kein negates the noun — the German says, word for word, 'I want no cup.' English rebuilt the sentence with don't; German kept the no-thing word sitting right where the cup is."
    },
    {
      "id": "l12_e4",
      "type": "variant_english",
      "prompt": "Which of these are honest English for Ich will nicht gehen?",
      "german": "Ich will nicht gehen",
      "renderings": [
        "I don't want to go",
        "I do not want to go"
      ],
      "traps": [
        "I want not to go",
        "I don't want go",
        "Not I want to go"
      ],
      "target_answer": "I don't want to go, I do not want to go",
      "meaning": "I don't want to go",
      "explanation": "The same thought, several honest English shapes — and none of them is the word-for-word one. German says it the literal way ('I want not to go') and English does not. That asymmetry is the whole lesson of topic 12, and it is why you translate thoughts, never words.",
      "affirmation": "You passed on the literal rendering and kept the natural ones — that is thought-translation, not word-matching."
    },
    {
      "id": "l12_e5",
      "type": "transcribe",
      "prompt": "You want to say:",
      "idea": "the question was about it — the thing, the plan, whatever it was — and your honest answer: you do not know it",
      "cues": [
        "Know is wissen → ich weiß (the wise twin, sharp ß and all)",
        "nicht kills the verb and lands where the action dies: at the very end"
      ],
      "target_answer": "Ich weiß es nicht",
      "meaning": "I do not know it",
      "vocab_hints": [
        {
          "word": "es",
          "translation": "it",
          "note": "es ↔ it — the same ancient pronoun. In speech you might hear it cling to the verb: hat's (hat es), ist's (ist es) — recognize them, no pressure to use them."
        },
        {
          "word": "weiß",
          "translation": "know (ich form)",
          "note": "from wissen — the same root as wise; the ß is the sharp S of the T→SS shift"
        }
      ],
      "word_bank": [
        "Ich",
        "nicht",
        "es",
        "weise",
        "weiß",
        "kein"
      ],
      "explanation": "nicht lands at the end where the action dies: 'Ich weiß es nicht' — I know it not.",
      "diagnosis": {
        "slip": "nicht drifted to the English seat",
        "cue": "English merged want/will and shipped its 'not' forward; German kept the ancient seat — nicht goes where the action dies, at the end: Ich weiß es nicht."
      }
    }
  ],
  "summary": {
    "outcome": "Choose between kein and nicht correctly and place nicht at the clause end.",
    "use_example": {
      "german": "Ich weiß es nicht.",
      "english": "I do not know it."
    },
    "takeaway": "Nouns take kein ('not one'), verbs and adjectives take nicht ('no-thing') — the two negations English merged into one not.",
    "curiosity_teaser": "Next: the kein vs nicht choice gym — twenty prompts naming which no-thing kills the noun and which kills the verb."
  },
  "twist": {
    "prompt": "Now kill the verb: I can come tomorrow becomes I cannot come tomorrow. (nicht's seat: right before the bare infinitive.)",
    "target_answer": "Ich kann morgen nicht kommen",
    "word_bank": [
      "kann",
      "morgen",
      "Ich",
      "kein",
      "kommen",
      "nicht"
    ],
    "explanation": "nicht negates what follows it, so it sits right before the bare infinitive — inside the bracket, after morgen. Word for word: 'I can tomorrow not come.'"
  }
};

export default lesson;
