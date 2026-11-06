import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5052,
  "slug": "wechselpraepositionen-sentence-gym",
  "title": "Wechselpräpositionen Sentence Gym",
  "subtitle": "Twenty picture-prompt sentences switching cases by motion vs location",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "in",
    "auf",
    "über",
    "unter",
    "vor",
    "hinter",
    "neben",
    "tisch",
    "haus",
    "glas",
    "wasser"
  ],
  "table_word_ids": [
    "in",
    "auf",
    "über",
    "unter",
    "glas",
    "vor",
    "hinter",
    "neben",
    "tisch",
    "haus",
    "wasser",
    "neugierig",
    "bart",
    "retten",
    "klinik"
  ],
  "hook": {
    "title": "The Gym at Full Weight",
    "content": "No more pairs — full sentences at speed. Each prompt is a scene: is anything moving across a boundary? Accusative. Is everything at rest? Dative. Ich stelle das Glas auf den Tisch (I put the glass onto the table — motion). Das Glas steht auf dem Tisch (the glass stands on the table — rest). Same glass, same table, two cases — and the verb is the tell: stellen (put) moves, stehen (stand) rests. Twenty reps, and the wechsel (switch) becomes reflex.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Verb Is the Tell",
        "content": "When unsure, check the verb: motion verbs (gehen, fahren, kommen, stellen, legen, hängen-onto, setzen) demand accusative after two-way prepositions. Rest verbs (sein, stehen, liegen, sitzen, hängen-rest) demand dative. The preposition only borrows the verb's case."
      }
    ]
  },
  "pattern": {
    "title": "The Twenty Reps, Compressed",
    "content": "Ich gehe in die Stadt / Ich bin in der Stadt. Wir fahren in die Berge? hint — Berge (mountains). Das Glas steht auf dem Tisch / Ich stelle das Glas auf den Tisch. Die Katze springt auf den Tisch / Die Katze schläft auf dem Sofa? hint — sofa. Vor das Haus (driving up to it) / vor dem Haus (parked). Hinter den Baum? hint — Baum (tree) / hinter dem Baum. Neben den Tisch / neben dem Tisch. Über die Straße (crossing) / über dem Haus (hovering). Setz dich? hint — setzen (sit-put) neben mich / Ich sitze neben dir — sitzen takes the DATIVE OF PERSON: sitz NEXT TO ME = setz dich neben mich, accusative mich for the moved body, dative dir for the location-frame. The gym is complete.",
    "footnotes": [],
    "linguist_note": "sich setzen (sit down) vs sitzen (be seated) is the motion/rest pair hidden inside reflexives — setzen moves the body (accusative: sich), sitzen describes the body at rest (location → dative frame). English 'sit/set' made the same distinction once."
  },
  "exercises": [
    {
      "id": "l5052_e1",
      "type": "shift_select",
      "prompt": "'Ich stelle das Glas auf _____ Tisch.' (I PUT the glass — motion):",
      "options": [
        "den (accusative)",
        "der",
        "das",
        "dem (dative)"
      ],
      "target_answer": "den (accusative)",
      "meaning": "Ich stelle das Glas auf den Tisch",
      "explanation": "stellen is a motion verb: the glass travels. wohin? → accusative."
    },
    {
      "id": "l5052_e2",
      "type": "shift_select",
      "prompt": "'Das Glas steht auf _____ Tisch.' (The glass STANDS — at rest):",
      "options": [
        "den (accusative)",
        "dem (dative)",
        "das",
        "die"
      ],
      "target_answer": "dem (dative)",
      "meaning": "Das Glas steht auf dem Tisch",
      "explanation": "stehen is a rest verb: nothing moves. wo? → dative."
    },
    {
      "id": "l5052_e3",
      "type": "matching_pairs",
      "prompt": "Match each full sentence with its case logic:",
      "matching_pairs": [
        {
          "id": "wp1",
          "english": "We drive INTO the city (motion)",
          "german": "Wir fahren in die Stadt"
        },
        {
          "id": "wp2",
          "english": "We are in the city (rest)",
          "german": "Wir sind in der Stadt"
        },
        {
          "id": "wp3",
          "english": "The cat jumps onto the table",
          "german": "Die Katze springt auf den Tisch"
        },
        {
          "id": "wp4",
          "english": "The cat sleeps on the sofa",
          "german": "Die Katze schläft auf dem Sofa"
        }
      ],
      "target_answer": "Wir fahren in die Stadt, Wir sind in der Stadt, Die Katze springt auf den Tisch, Die Katze schläft auf dem Sofa",
      "meaning": "motion vs rest, four scenes",
      "explanation": "fahren/springt move (accusative); sind/schläft rest (dative) — the verb tells, the case obeys."
    },
    {
      "id": "l5052_e4",
      "type": "derive",
      "prompt": "Cross it: 'Wir gehen über _____ Straße.' (across the street — motion):",
      "english_hint": "feminine singular accusative article",
      "target_answer": "die",
      "meaning": "Wir gehen über die Straße",
      "explanation": "gehen + über = crossing motion → accusative (die Straße). The hovering bird's über dem Haus was dative."
    },
    {
      "id": "l5052_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'I put the glass under the table':",
      "target_answer": "Ich stelle das Glas unter den Tisch",
      "meaning": "I put the glass under the table",
      "word_bank": [
        "den",
        "Glas",
        "Tisch",
        "Ich",
        "von",
        "stelle",
        "das",
        "unter",
        "ist"
      ],
      "explanation": "stellen (motion) + unter + den (accusative) — the glass travels to its hiding place. Rest would be unter dem Tisch."
    }
  ],
  "summary": {
    "outcome": "Switch cases by motion vs location in full sentences at speed.",
    "use_example": {
      "german": "Ich stelle das Glas unter den Tisch.",
      "english": "I put the glass under the table."
    },
    "takeaway": "The verb is the tell: motion verbs drag accusative, rest verbs sit in dative — twenty reps make it reflex.",
    "curiosity_teaser": "The drill isle ends here — next branch: first introductions, the first words Germans actually speak."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "sehr",
      "nicht",
      "sehr",
      "gut",
      "Heute",
      "das",
      "ist"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in Wechselpräpositionen Sentence Gym."
  }
};

export default lesson;
