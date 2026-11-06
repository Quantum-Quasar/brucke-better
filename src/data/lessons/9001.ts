import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9001,
  "slug": "story-s1-max-laeuft-weg",
  "title": "Max läuft weg",
  "subtitle": "A present-tense story: a dog, an open door, and a happy ending",
  "phase": 2,
  "spineStory": true,
  "label": "s1",
  "shift_categories": [],
  "word_ids": [
    "hund",
    "stadt",
    "laufen",
    "schnell",
    "klein",
    "braun",
    "müde",
    "abend"
  ],
  "table_word_ids": [
    "hund",
    "stadt",
    "laufen",
    "schnell",
    "klein",
    "braun",
    "müde",
    "abend",
    "garten",
    "tür",
    "offen",
    "suchen",
    "finden",
    "traurig",
    "lachen",
    "hören",
    "wieder",
    "laut",
    "nacht",
    "bett",
    "haus"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "This is a short story in the present tense, so everything happens in front of you. Follow three things: the dog Max, the open door, and how Paul feels. Read it once for the story, then once for the words you already know. You do not need every word to understand what happens.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Bellen",
        "content": "das Bellen = barking. It appears in the story as a sound, not as a new grammar rule. You can hear it and keep reading."
      },
      {
        "marker": "2",
        "title": "überall",
        "content": "überall = everywhere. It is the picture-word for Paul's search: in the garden, in the house, everywhere."
      },
      {
        "marker": "3",
        "title": "spielen",
        "content": "spielen = to play. Jeden Morgen spielen Paul und Max im Garten = every morning Paul and Max play in the garden."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Paul hat einen Hund. Sein Hund heißt Max. Max ist klein, braun und sehr schnell.\n\nJeden Morgen spielen Paul und Max im Garten. Aber heute ist die Tür offen. Max läuft in die Stadt. Paul sucht Max überall. Er geht in den Garten und in das Haus. Max ist nicht da. Paul ist traurig.\n\nDann hört Paul ein lautes Bellen. Max kommt zu Paul. Paul lacht und sagt: „Max! Du bist wieder da!“\n\nAm Abend sind Paul und Max müde. Sie schlafen im Haus.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5321_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "vocab_hints": [
        {
          "word": "offen",
          "translation": "open"
        },
        {
          "word": "überall",
          "translation": "everywhere"
        }
      ],
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Paul has a dog.",
          "german": "Paul hat einen Hund."
        },
        {
          "id": "m2",
          "english": "Max is small, brown, and very fast.",
          "german": "Max ist klein, braun und sehr schnell."
        },
        {
          "id": "m3",
          "english": "Today the door is open.",
          "german": "Heute ist die Tür offen."
        },
        {
          "id": "m4",
          "english": "Max runs into the city.",
          "german": "Max läuft in die Stadt."
        },
        {
          "id": "m5",
          "english": "Paul searches for Max everywhere.",
          "german": "Paul sucht Max überall."
        },
        {
          "id": "m6",
          "english": "In the evening Paul and Max are tired.",
          "german": "Am Abend sind Paul und Max müde."
        }
      ],
      "target_answer": "Paul hat einen Hund., Max ist klein, braun und sehr schnell., Heute ist die Tür offen., Max läuft in die Stadt., Paul sucht Max überall., Am Abend sind Paul und Max müde.",
      "meaning": "the story beats: Paul, Max, the open door, the search, the happy ending",
      "explanation": "Six sentences carry the whole plot. If you can re-tell these six beats, you have read the story."
    },
    {
      "id": "l5321_e2",
      "type": "shift_select",
      "prompt": "Why does Paul search for Max?",
      "options": [
        "Because Max runs into the city.",
        "Because Max is hungry.",
        "Because Paul wants to buy bread.",
        "Because the garden is closed."
      ],
      "target_answer": "Because Max runs into the city.",
      "meaning": "Max leaves through the open door, so Paul goes looking for him.",
      "explanation": "The cause is the open door: Max läuft in die Stadt. Paul's search is the result, not the cause."
    },
    {
      "id": "l5321_e3",
      "type": "shift_select",
      "prompt": "Where does Paul look for Max?",
      "options": [
        "In the garden and in the house",
        "In the city and at the station",
        "In the kitchen and in the garden",
        "At the market and in the house"
      ],
      "target_answer": "In the garden and in the house",
      "meaning": "Paul searches the garden and the house before Max comes back.",
      "explanation": "The text says: Er geht in den Garten und in das Haus. Those are the two places he checks."
    },
    {
      "id": "l5321_e4",
      "type": "shift_select",
      "prompt": "How does Paul feel before Max comes back?",
      "options": [
        "Sad",
        "Angry",
        "Hungry",
        "Cold"
      ],
      "target_answer": "Sad",
      "meaning": "Paul is sad while Max is missing.",
      "explanation": "The sentence Paul ist traurig gives the feeling directly; then Max comes back and Paul laughs."
    },
    {
      "id": "l5321_e5",
      "type": "syntax_builder",
      "prompt": "Rebuild the sentence: 'Max comes back to Paul.'",
      "target_answer": "Max kommt zu Paul",
      "meaning": "Max comes back to Paul.",
      "word_bank": [
        "Max",
        "kommt",
        "zu",
        "Paul",
        "nach",
        "Hause"
      ],
      "explanation": "German puts the destination after the verb: Max kommt zu Paul. The extra chips are there to make you choose the right ending."
    }
  ],
  "twist": {
    "prompt": "Without looking back — rebuild the last scene: 'The dog runs quickly home.'",
    "target_answer": "Der Hund läuft schnell nach Hause",
    "word_bank": [
      "Der",
      "Hund",
      "läuft",
      "schnell",
      "nach",
      "Hause",
      "Stadt"
    ],
    "explanation": "nach Hause is the fixed phrase for 'home' (direction). Keep the verb in second position and the direction at the end: Der Hund läuft schnell nach Hause."
  },
  "summary": {
    "outcome": "Read a short present-tense story and answer who, where, and how questions.",
    "use_example": {
      "german": "Max läuft in die Stadt. Paul sucht ihn überall.",
      "english": "Max runs into the city. Paul searches for him everywhere."
    },
    "takeaway": "A story is a chain of small sentences: who does what, where it happens, and how it ends. You do not need every word to follow the chain.",
    "curiosity_teaser": "Next: a lost puppy, a kind girl, and an old man on a bench."
  }
};

export default lesson;
