import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5101,
  "slug": "lesson-5101",
  "title": "Tout le conditionnel",
  "subtitle": "Building any conditional from the future stem + imparfait ending (-ais, -ait).",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "aller",
    "avoir",
    "être",
    "parler",
    "visiter",
    "aimé"
  ],
  "table_word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "aller",
    "avoir",
    "être",
    "parler",
    "visiter",
    "aimé"
  ],
  "hook": {
    "title": "The Full Would-World: Building Any Conditional in Two Seconds",
    "content": "Take the infinitive (parler, visiter) or a core r-stem (ser-, aur-, ir-, fer-, voudr-, pourr-) and attach the imparfait endings (-ais, -ais, -ait)! And to build a hypothetical 'If I had..., I would...' sentence: after si ('if'), use the IMPARFAIT (Si j'avais le temps), and in the result clause use the CONDITIONAL (j'irais à Paris)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Notice how English does the EXACT same thing in 'If I HAD time, I WOULD go'!",
        "content": "Si j'avais (imparfait) le temps, j'irais (conditional) à Paris matches English 'If I had time, I would go' 1-for-1!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Si + Imparfait (-ais/-ait) → Conditional (-rais/-rait)",
    "content": "Use the imparfait after si and the conditional in the main clause.",
    "linguist_note": "Counterfactual conditional sentences in French pair an imperfect indicative protasis with a conditional apodosis.",
    "trap_note": "Never put -rais right after si ('Les si n'aiment pas les -rais') — use the imparfait after si!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each conditional form or si-clause with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "j'aimerais (aimer + ais)",
          "german": "I would love / I would like"
        },
        {
          "id": "p2",
          "english": "j'irais (ir- + ais)",
          "german": "I would go"
        },
        {
          "id": "p3",
          "english": "ce serait (ser- + ait)",
          "german": "it would be"
        },
        {
          "id": "p4",
          "english": "Si j'avais le temps... (si + imparfait)",
          "german": "If I had the time..."
        },
        {
          "id": "p5",
          "english": "...je visiterais Paris (conditional)",
          "german": "...I would visit Paris"
        }
      ],
      "target_answer": "I would love / I would like, I would go, it would be, If I had the time..., ...I would visit Paris",
      "meaning": "j'aimerais (aimer + ais), j'irais (ir- + ais), ce serait (ser- + ait), Si j'avais le temps... (si + imparfait), ...je visiterais Paris (conditional)",
      "explanation": "Imparfait after si; Conditional (-r- + -ais/-ait) in the result clause!",
      "id": "fr5101_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Complete the hypothetical sentence: 'If I had time, I would go to the cinema':",
      "options": [
        "Si j'avais le temps, j'irais au cinéma",
        "Si j'ai le temps, j'irais au cinéma",
        "Si j'aurais le temps, j'irais au cinéma"
      ],
      "target_answer": "Si j'avais le temps, j'irais au cinéma",
      "meaning": "Si + imparfait (j'avais) → conditional (j'irais)",
      "explanation": "After si, use imparfait j'avais; in the result clause, use conditional j'irais!",
      "id": "fr5101_e2"
    },
    {
      "type": "derive",
      "prompt": "Build the conditional 'it would be' from the future stem 'ser-' of être + '-ait':",
      "english_hint": "ce + ser + ait",
      "target_answer": "ce serait",
      "meaning": "it would be",
      "explanation": "ce serait (/sə səʁɛ/) = 'it would be'.",
      "id": "fr5101_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "it would be very good to visit Lyon (use Ce serait très bon de visiter Lyon)",
      "cues": [
        "It would be very good → Ce serait très bon",
        "to visit Lyon → de visiter Lyon"
      ],
      "idea_parts": [
        "conditional pointer → Ce serait très bon",
        "infinitive complement → de visiter Lyon"
      ],
      "target_answer": "Ce serait très bon de visiter Lyon",
      "meaning": "It would be very good to visit Lyon",
      "word_bank": [
        "la",
        "Ce",
        "très",
        "bon",
        "visiter",
        "serait",
        "sera",
        "de",
        "Lyon"
      ],
      "explanation": "Ce serait ('it would be') vs. Ce sera ('it will be').",
      "diagnosis": {
        "slip": "used future sera",
        "cue": "Use conditional Ce serait ('it would be')."
      },
      "id": "fr5101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'aimerais beaucoup visiter cette ville avec toi",
      "replays": 2,
      "target_answer": "J'aimerais beaucoup visiter cette ville avec toi",
      "meaning": "I would love to visit this city with you",
      "cues": [
        "J'aimerais beaucoup",
        "visiter cette ville avec toi"
      ],
      "explanation": "J'aimerais beaucoup + bare infinitive is a warm alternative to Je voudrais.",
      "affirmation": "You wrote J'aimerais beaucoup visiter cleanly.",
      "id": "fr5101_e5"
    }
  ],
  "summary": {
    "outcome": "Form the conditional across regular and irregular verbs and build 'Si + imparfait → conditional' hypothetical sentences.",
    "use_example": {
      "german": "Si j'habitais à Paris, j'irais au musée tous les dimanches.",
      "english": "If I lived in Paris, I would go to the museum every Sunday."
    },
    "takeaway": "After si ('if') use the imparfait (Si j'avais); in the result use the conditional (j'irais).",
    "curiosity_teaser": "Up next on Le Pont ([5102] Le conditionnel poli): see how Tout le conditionnel leads directly into Le conditionnel poli."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"It would be very good to visit Lyon\" in French:",
    "target_answer": "Ce serait très bon de visiter Lyon",
    "word_bank": [
      "Lyon",
      "très",
      "serait",
      "bon",
      "ne",
      "pas",
      "visiter",
      "Ce",
      "de"
    ],
    "explanation": "Re-constructing \"Ce serait très bon de visiter Lyon\" from the underlying rule cements the pattern of Tout le conditionnel."
  }
};

export default lesson;
