import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9005,
  "slug": "story-s5-max-und-der-kranke-montag",
  "title": "Max und der kranke Montag",
  "subtitle": "Max pretends to be sick — his mother's thermometer has other ideas",
  "phase": 3,
  "spineStory": true,
  "label": "s5",
  "shift_categories": [],
  "word_ids": [
    "fieber",
    "bauch",
    "krank",
    "mutter",
    "kind",
    "montag",
    "morgen",
    "bett"
  ],
  "table_word_ids": [
    "fieber",
    "bauch",
    "krank",
    "mutter",
    "kind",
    "montag",
    "morgen",
    "bett",
    "zimmer",
    "tag",
    "nacht",
    "woche",
    "müde",
    "gut",
    "falsch",
    "arzt",
    "vater",
    "schule"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "A short, funny capstone story: Max wants a day off, so he invents an illness. Read for the plan, the evidence, and the moment the plan fails. One sentence uses the would-form (wärst / würdest); it is glossed, so you can enjoy the joke without stopping to build it.",
    "footnotes": [
      {
        "marker": "1",
        "title": "blass, Thermometer, Temperatur",
        "content": "blass = pale; das Thermometer = thermometer; die Temperatur = temperature. These are the story's evidence words."
      },
      {
        "marker": "2",
        "title": "Erkältung & Bauch",
        "content": "die Erkältung = a cold (illness); der Bauch = belly. Mein Bauch tut weh = my belly hurts."
      },
      {
        "marker": "3",
        "title": "wärst / würdest",
        "content": "Wenn du wirklich krank wärst, würdest du nicht so schnell sprechen = If you were really sick, you would not speak so quickly. This is the would-world (Konjunktiv II); recognise the shape, do not produce it yet."
      },
      {
        "marker": "4",
        "title": "seufzen & scheitern",
        "content": "seufzen = to sigh; scheitern = to fail. Max seufzt. Sein Plan ist gescheitert = Max sighs. His plan has failed."
      },
      {
        "marker": "5",
        "title": "Plan & Zimmer",
        "content": "der Plan = plan; das Zimmer = room. Max's plan, and the room his mother enters."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Es ist Montagmorgen. Max will nicht zur Schule gehen. Er liegt im Bett und hat eine Idee: Er sagt, er ist krank.\n\n„Mama, mir geht es nicht gut!“, ruft er. Seine Mutter kommt ins Zimmer. „Du siehst blass aus. Hast du Fieber?“\n\nMax sagt: „Ja, ich habe Fieber. Und mein Bauch tut weh.“ Seine Mutter holt das Thermometer. Max wartet und lächelt. Er denkt: „Mein Plan funktioniert.“\n\nDie Mutter kommt zurück und schaut auf das Thermometer. „Max, du hast kein Fieber. Deine Temperatur ist normal.“ Max ist überrascht. „Vielleicht ist es nur eine kleine Erkältung“, sagt er. Die Mutter schüttelt den Kopf. „Wenn du wirklich krank wärst, würdest du nicht so schnell sprechen. Du gehst heute zur Schule.“\n\nMax seufzt. Sein Plan ist gescheitert. Aber er denkt schon über einen neuen Plan nach.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5352_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "vocab_hints": [
        {
          "word": "Schule",
          "translation": "school"
        }
      ],
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Max does not want to go to school.",
          "german": "Max will nicht zur Schule gehen."
        },
        {
          "id": "m2",
          "english": "He says that he is sick.",
          "german": "Er sagt, dass er krank ist."
        },
        {
          "id": "m3",
          "english": "His mother gets the thermometer.",
          "german": "Seine Mutter holt das Thermometer."
        },
        {
          "id": "m4",
          "english": "Max does not have a fever.",
          "german": "Max hat kein Fieber."
        },
        {
          "id": "m5",
          "english": "His mother sends him to school.",
          "german": "Die Mutter schickt ihn zur Schule."
        },
        {
          "id": "m6",
          "english": "His plan has failed.",
          "german": "Sein Plan ist gescheitert."
        }
      ],
      "target_answer": "Max will nicht zur Schule gehen., Er sagt, dass er krank ist., Seine Mutter holt das Thermometer., Max hat kein Fieber., Die Mutter schickt ihn zur Schule., Sein Plan ist gescheitert.",
      "meaning": "the story beats: the plan, the evidence, the failure",
      "explanation": "The six beats are a small courtroom scene: claim, evidence, verdict, consequence."
    },
    {
      "id": "l5352_e2",
      "type": "shift_select",
      "prompt": "Why does Max stay in bed?",
      "options": [
        "He wants a free day.",
        "He is really sick.",
        "He is tired from school.",
        "He has a doctor's appointment."
      ],
      "target_answer": "He wants a free day.",
      "meaning": "Max wants a day off, so he pretends to be sick.",
      "explanation": "The first paragraph says Max will nicht zur Schule gehen and then he says he is krank. The illness is the plan, not the cause."
    },
    {
      "id": "l5352_e3",
      "type": "shift_select",
      "prompt": "How does the mother find out the truth?",
      "options": [
        "The thermometer shows no fever.",
        "Max tells her.",
        "The doctor calls.",
        "She sees Max play football."
      ],
      "target_answer": "The thermometer shows no fever.",
      "meaning": "The thermometer shows a normal temperature, so the mother knows Max is pretending.",
      "explanation": "The evidence is the thermometer: Du hast kein Fieber. Deine Temperatur ist normal. Max's speed of speech is the second clue."
    },
    {
      "id": "l5352_e4",
      "type": "shift_select",
      "prompt": "What does the mother mean by 'Du bist nicht krank'?",
      "options": [
        "She knows he is pretending.",
        "She thinks he is very sick.",
        "She wants him to stay home.",
        "She is a doctor."
      ],
      "target_answer": "She knows he is pretending.",
      "meaning": "The mother sees through the act and sends him to school.",
      "explanation": "She has the thermometer evidence and says he speaks too quickly for a sick person. Her conclusion is that he is not ill."
    },
    {
      "id": "l5352_e5",
      "type": "literal_gloss",
      "prompt": "Which English follows the German words most closely?",
      "german": "Er hat gesagt, dass er krank ist.",
      "natural": "He said that he is sick.",
      "options": [
        "He has said that he sick is",
        "He said that he is sick",
        "He says that he was sick",
        "He said that he is healthy"
      ],
      "target_answer": "He has said that he sick is",
      "meaning": "He said that he is sick.",
      "explanation": "The dass-clause sends the verb to the end: ... dass er krank ist = literally 'that he sick is'. English keeps 'that he is sick'; German keeps 'is' last."
    }
  ],
  "twist": {
    "prompt": "Without looking back — give the mother's verdict in German: 'He is not sick.'",
    "target_answer": "Er ist nicht krank",
    "word_bank": [
      "Er",
      "ist",
      "nicht",
      "krank",
      "Fieber"
    ],
    "explanation": "nicht comes after the verb: Er ist nicht krank. The mother's evidence is the missing fever; the verdict is this short sentence."
  },
  "summary": {
    "outcome": "Read a humorous Perfekt story, follow a claim-evidence-verdict structure, and read a dass-clause.",
    "use_example": {
      "german": "Er hat gesagt, dass er krank ist, aber seine Mutter hat kein Fieber gefunden.",
      "english": "He said that he is sick, but his mother found no fever."
    },
    "takeaway": "A story can be a small argument: claim, evidence, verdict. The dass-clause puts the verdict's verb at the end, where the evidence lands.",
    "curiosity_teaser": "You have finished the required reading spine. Re-read any story for the pleasure of recognising the machinery."
  }
};

export default lesson;
