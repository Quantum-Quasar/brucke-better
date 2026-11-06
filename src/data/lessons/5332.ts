import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5332,
  "slug": "story-ein-tag-im-park",
  "title": "Ein Tag im Park",
  "subtitle": "A Perfekt diary of one ordinary Saturday with a friend and a dog",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "sonne",
    "bank",
    "wetter",
    "laufen",
    "froh",
    "blume",
    "junge"
  ],
  "table_word_ids": [
    "sonne",
    "scheinen",
    "bank",
    "wetter",
    "hören",
    "laufen",
    "froh",
    "blume",
    "mädchen",
    "junge",
    "garten",
    "baum",
    "hund",
    "freund",
    "kaffee",
    "brot",
    "wasser",
    "müde",
    "glücklich",
    "zusammen",
    "woche",
    "wochenende"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "This is a diary-style story: Anna tells you what she did on Saturday, step by step. The time phrases are your map — am Morgen, um zehn Uhr, nach dem Essen, um eins. Follow the clock even if a participle is new.",
    "footnotes": [
      {
        "marker": "1",
        "title": "sich treffen",
        "content": "sich treffen = to meet. Wir haben uns im Park getroffen = we met in the park. The sich moves to uns for wir; you only need to recognise the chunk."
      },
      {
        "marker": "2",
        "title": "sich hinsetzen",
        "content": "sich hinsetzen = to sit down. Sie haben sich hingesetzt = they sat down. The separable prefix ge- sits inside the participle: hinge-setzt."
      },
      {
        "marker": "3",
        "title": "Es gibt",
        "content": "es gibt = there is / there are, literally 'it gives'. You will meet it in the close-reading exercise."
      },
      {
        "marker": "4",
        "title": "frühstücken & anrufen",
        "content": "frühstücken = to have breakfast; anrufen = to call someone. Sie hat gefrühstückt ... ihre Freundin Lisa angerufen = she had breakfast ... called her friend Lisa."
      },
      {
        "marker": "5",
        "title": "Foto, Bild, Park",
        "content": "das Foto = photo; das Bild = picture; der Park = park. The story uses all three in the picnic scene."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Am Samstag war das Wetter schön. Die Sonne schien, und es war warm.\n\nAnna ist um acht Uhr aufgestanden. Sie hat gefrühstückt und einen Kaffee getrunken. Dann hat sie ihre Freundin Lisa angerufen. Um zehn Uhr haben sie sich im Park getroffen. Lisa hat ihren Hund Max mitgebracht. Max ist klein, braun und sehr freundlich.\n\nSie sind zusammen spazieren gegangen und haben viel gelacht. Im Park gibt es viele Bäume und Blumen. Ein Mädchen und ein Junge spielen mit einem Ball. Sie haben eine Bank gefunden und sich hingesetzt. Dort haben sie Brot gegessen und Wasser getrunken.\n\nNach dem Essen haben sie Fotos gemacht. Lisa hat viele schöne Bilder von Max und den Blumen gemacht. Um eins sind sie nach Hause gegangen. Es war ein schöner Tag.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5332_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "On Saturday the weather was beautiful.",
          "german": "Am Samstag war das Wetter schön."
        },
        {
          "id": "m2",
          "english": "Anna got up at eight.",
          "german": "Anna ist um acht Uhr aufgestanden."
        },
        {
          "id": "m3",
          "english": "At ten they met in the park.",
          "german": "Um zehn Uhr haben sie sich im Park getroffen."
        },
        {
          "id": "m4",
          "english": "Lisa brought her dog Max.",
          "german": "Lisa hat ihren Hund Max mitgebracht."
        },
        {
          "id": "m5",
          "english": "They found a bench and sat down.",
          "german": "Sie haben eine Bank gefunden und sich hingesetzt."
        },
        {
          "id": "m6",
          "english": "At one they went home.",
          "german": "Um eins sind sie nach Hause gegangen."
        }
      ],
      "target_answer": "Am Samstag war das Wetter schön., Anna ist um acht Uhr aufgestanden., Um zehn Uhr haben sie sich im Park getroffen., Lisa hat ihren Hund Max mitgebracht., Sie haben eine Bank gefunden und sich hingesetzt., Um eins sind sie nach Hause gegangen.",
      "meaning": "the Saturday timeline: morning, ten o'clock, the bench, one o'clock",
      "explanation": "The time phrases order the story. If you can line up the clock, the participles have a place to sit."
    },
    {
      "id": "l5332_e2",
      "type": "shift_select",
      "prompt": "Who is Max?",
      "options": [
        "Lisa's dog",
        "Anna's brother",
        "A cat",
        "A friend from work"
      ],
      "target_answer": "Lisa's dog",
      "meaning": "Max is Lisa's small brown dog.",
      "explanation": "Lisa hat ihren Hund Max mitgebracht — Lisa brought her dog Max."
    },
    {
      "id": "l5332_e3",
      "type": "shift_select",
      "prompt": "What did they do after eating?",
      "options": [
        "They took photos.",
        "They went swimming.",
        "They cooked dinner.",
        "They read a book."
      ],
      "target_answer": "They took photos.",
      "meaning": "After eating, they took photos of Max and the flowers.",
      "explanation": "Nach dem Essen haben sie Fotos gemacht. The time phrase nach dem Essen tells you the order."
    },
    {
      "id": "l5332_e4",
      "type": "shift_select",
      "prompt": "How long were they in the park?",
      "options": [
        "From ten to one",
        "From eight to ten",
        "All day",
        "For one hour"
      ],
      "target_answer": "From ten to one",
      "meaning": "They met at ten and went home at one, so three hours.",
      "explanation": "The story gives two clock times: um zehn Uhr ... getroffen and um eins ... nach Hause gegangen. Ten to one is three hours."
    },
    {
      "id": "l5332_e5",
      "type": "literal_gloss",
      "prompt": "Which English follows the German words most closely?",
      "german": "Im Garten gibt es viele Bäume und Blumen.",
      "natural": "In the garden there are many trees and flowers.",
      "options": [
        "In the garden it gives many trees and flowers",
        "In the garden there are many trees and flowers",
        "The garden gives many trees and flowers",
        "Many trees and flowers give the garden"
      ],
      "target_answer": "In the garden it gives many trees and flowers",
      "meaning": "In the garden there are many trees and flowers.",
      "explanation": "German says es gibt — literally 'it gives' — where English says 'there is/are'. The odd English is the lens; the natural sentence is what you mean."
    }
  ],
  "twist": {
    "prompt": "Without looking back — rebuild the picnic: 'We eat bread and drink water.'",
    "target_answer": "Wir essen Brot und trinken Wasser",
    "word_bank": [
      "Wir",
      "essen",
      "Brot",
      "und",
      "trinken",
      "Wasser",
      "Kaffee"
    ],
    "explanation": "The story tells it in the past, but the same thought in the present is Wir essen Brot und trinken Wasser. The verb stays in second position; und links two equal clauses."
  },
  "summary": {
    "outcome": "Follow a Perfekt diary with time phrases, then answer sequence and duration questions.",
    "use_example": {
      "german": "Um zehn Uhr haben sie sich im Park getroffen, und um eins sind sie nach Hause gegangen.",
      "english": "At ten they met in the park, and at one they went home."
    },
    "takeaway": "Time phrases are the skeleton of a past-tense story. Find the clock words first; the participles then hang on them.",
    "curiosity_teaser": "Next: a baker, a broken car, and a bicycle that is almost as fast."
  }
};

export default lesson;
