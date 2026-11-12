import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 402,
  "slug": "th-to-d-discrimination-drills",
  "title": "TH→D Discrimination Drills",
  "subtitle": "Which d-words hardened from th — and which are D→T doubles running in reverse?",
  "phase": 1,
  "shift_categories": [
    "th_to_d",
    "d_to_t"
  ],
  "word_ids": [
    "dünn",
    "dick",
    "dorn",
    "daumen",
    "durst",
    "ding",
    "erde",
    "tür",
    "tag",
    "drei",
    "bad"
  ],
  "table_word_ids": [
    "dünn",
    "dick",
    "dorn",
    "daumen",
    "durst",
    "erde",
    "ding",
    "tür",
    "tag",
    "drei",
    "bad",
    "teil",
    "seltsam",
    "moos",
    "mittags",
    "werktag"
  ],
  "hook": {
    "title": "Two D's, Two Directions",
    "content": "German d comes from two different ancestors. One kind was always English th: thin → dünn, thorn → Dorn, thumb → Daumen, thirst → Durst, thing → Ding. The other kind was English d that German pushed forward to t: door → Tür, day → Tag. So when you meet a German d-word, run both checks: does swapping d for th reveal an English word (Durst → thirst)? Or is the d the original, with the real story hiding in a t somewhere? Direction is the whole game.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Chain Explains the Crowding",
        "content": "TH moved onto D's old street (think → denken), so D had to move to T's street (door → Tür). That chain is why both languages can't use the same sounds for the same words — everyone moved house at once."
      }
    ]
  },
  "pattern": {
    "title": "Run Both Checks",
    "content": "Check one — the th-swap: dünn (thin), dick (thick), Dorn (thorn), Daumen (thumb), Durst (thirst), Ding (thing), Erde (earth), drei (three). Check two — the reverse: if the d looks original, look for a t: Tür pairs with door through D → T (the German word kept the ancient vowel but the shift went the other way), Tag with day. Beware the lookalikes: dick does not mean its English sound-alike — it means thick; das Ding means thing, and English kept the Germanic sense in 'the whole thing' and even the old assemblies called 'Things'.",
    "footnotes": [],
    "linguist_note": "Earth → Erde runs the same dental hardening as three → drei; English's th here is the ancient fricative þ, which High German hardened to d while English kept it spelled th into modern times."
  },
  "exercises": [
    {
      "id": "l402_e1",
      "type": "matching_pairs",
      "prompt": "Separate the true TH→D words — match each to its English twin. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "td1",
          "english": "thin",
          "german": "dünn"
        },
        {
          "id": "td2",
          "english": "thorn",
          "german": "Dorn"
        },
        {
          "id": "td3",
          "english": "thumb",
          "german": "Daumen"
        },
        {
          "id": "td4",
          "english": "thirst",
          "german": "Durst"
        },
        {
          "id": "recall1",
          "german": "Das ist stumpf",
          "english": "That is blunt"
        },
        {
          "id": "recall1b",
          "german": "Das ist dick",
          "english": "That is thick"
        },
        {
          "id": "context1",
          "german": "der Darm",
          "english": "the intestine"
        }
      ],
      "target_answer": "dünn, Dorn, Daumen, Durst, Das ist stumpf, Das ist dick, der Darm",
      "meaning": "thin; thorn; thumb; thirst; That is blunt; That is thick; the intestine",
      "shift_hint": "TH → D",
      "explanation": "Swap the d for th and the English word appears — these are hardened dental fricatives."
    },
    {
      "id": "l402_e2",
      "type": "shift_select",
      "prompt": "Which shift connects English 'door' and German 'Tür'?",
      "options": [
        "TH → D",
        "K → CH",
        "D → T",
        "T → S"
      ],
      "target_answer": "D → T",
      "meaning": "door ↔ Tür runs D → T, not TH → D",
      "explanation": "Tür's t is the hardened English d — the chain move. The th-swap check fails here; the t tells the real story."
    },
    {
      "id": "l402_e3",
      "type": "reverse_cognate",
      "prompt": "What English word is the twin of 'Dorn'?",
      "target_answer": "thorn",
      "meaning": "thorn (twin of German Dorn)",
      "explanation": "Dorn hardened the th; the rose's spike is the same Germanic word on both shores."
    },
    {
      "id": "l402_e4",
      "type": "derive",
      "prompt": "Apply TH → D: English 'earth' → German:",
      "english_hint": "er + the hardened th",
      "target_answer": "Erde",
      "meaning": "die Erde — the earth",
      "explanation": "earth → Erde: the ancient þ hardened to d, exactly as in three → drei."
    },
    {
      "id": "l402_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're describing a skinny thing to a friend: the thing is thin",
      "cues": [
        "Both words carry the shift: thing → Ding, thin → dünn (TH → D, twice in one sentence)",
        "The thing is neuter: das Ding",
        "After ist the adjective stays bare and goes last: das Ding ist dünn"
      ],
      "target_answer": "Das Ding ist dünn",
      "meaning": "The thing is thin",
      "vocab_hints": [
        {
          "word": "das",
          "translation": "the (neuter)",
          "note": "das Ding — neuter, like English 'the thing'"
        }
      ],
      "word_bank": [
        "ist",
        "Dorn",
        "dick",
        "Das",
        "dünn",
        "Ding"
      ],
      "explanation": "Two TH→D words in one sentence, built from your own thought: das Ding and dünn."
    }
  ],
  "summary": {
    "outcome": "Distinguish TH→D words (dünn, Dorn, Durst) from D→T reverses (Tür, Tag) and use both in sentences.",
    "use_example": {
      "german": "Das Ding ist dünn.",
      "english": "The thing is thin."
    },
    "takeaway": "German d has two ancestors: swap d for th to find one kind, look for the t to catch the other.",
    "curiosity_teaser": "Next: the sibilant shift from the other side — t becomes s, ss and z: water becomes Wasser, two becomes zwei."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from TH→D Discrimination Drills (The thing is thin):",
    "target_answer": "Das Ding ist dünn",
    "word_bank": [
      "dünn",
      "nicht",
      "ist",
      "Das",
      "Ding",
      "heute"
    ],
    "explanation": "Re-assembling \"Das Ding ist dünn\" from scratch locks in the structural pattern of TH→D Discrimination Drills without relying on short-term echo."
  }
};

export default lesson;
