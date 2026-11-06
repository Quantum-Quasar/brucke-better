import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5172,
  "slug": "entfernung-naehe-weit-fern-quer-entlang",
  "title": "Entfernung: die Nähe, weit, fern, quer, entlang",
  "subtitle": "near and far on one axis — and the two words that walk a path instead of pointing at a place",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "nähe",
    "weit",
    "fern",
    "quer",
    "entlang",
    "norden",
    "osten",
    "westen",
    "süden",
    "weg",
    "straße",
    "fluss",
    "strand",
    "umweg",
    "geradeaus",
    "eins",
    "vier",
    "zehn",
    "hälfte"
  ],
  "table_word_ids": [
    "nähe",
    "weit",
    "fern",
    "quer",
    "entlang",
    "norden",
    "osten",
    "westen",
    "süden",
    "weg",
    "straße",
    "fluss",
    "strand",
    "umweg",
    "geradeaus",
    "eins",
    "vier",
    "zehn",
    "hälfte"
  ],
  "hook": {
    "title": "One Axis: Nah to Fern",
    "content": "Distance in German is one line with two ends. die Nähe holds the near end: German nah and English nigh are the same ancient word, *nēhwaz — and English even kept the comparison: near was originally nigh's comparative, 'nigher', frozen into its own word. weit ↔ wide is a pure twin, *wīdaz, the same sound in both languages: when German asks Wie weit ist es? it is literally asking how WIDE the gap is. fern ↔ far share the ancient beyond-root; English drifted to far, German kept fern — and built das Fernsehen, the far-seer, on it. Then the two path words: entlang is ent + lang, and lang ↔ long is a pure twin — German names the path first and hangs entlang behind it: den Fluss entlang. quer is the cross-word; English queer may even be its borrowing [UNVERIFIED — check]. Nah, die Nähe, weit, fern — and two words for the shape of the road between.",
    "footnotes": [
      {
        "marker": "1",
        "title": "wie weit, never wie fern",
        "content": "German asks distance with wie weit — 'how wide' — and never with fern. fern states a fact from where you stand (der Strand ist nicht fern), while weit measures the stretch between two points. The question is wide; the answer is far."
      }
    ]
  },
  "pattern": {
    "title": "Asking, Answering, Crossing, Walking",
    "content": "Ask the stretch: Wie weit ist es? Answer with time, not numbers: Zehn Minuten zu Fuß. State remoteness: Der Weg ist nicht fern. Locate with die Nähe: in der Nähe — In der Nähe gibt es einen Markt. Cross the space: quer durch die Stadt — durch does the case work. Walk the path: Wir gehen den Fluss entlang — the path takes accusative (den Fluss) and entlang stands AFTER it, the opposite of English word order.",
    "footnotes": [],
    "linguist_note": "English split the old near-family three ways: nigh retreated into poetry, near took the daily slot, and nearly drifted into 'almost'. German kept one adjective, nah, and one noun, die Nähe — the family never had to split."
  },
  "exercises": [
    {
      "id": "l5172_e1",
      "type": "matching_pairs",
      "prompt": "The near-far axis and the two path words — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "df1",
          "english": "How far is the beach?",
          "german": "Wie weit ist der Strand?"
        },
        {
          "id": "df2",
          "english": "The way is not far",
          "german": "Der Weg ist nicht fern"
        },
        {
          "id": "df3",
          "english": "There is a market nearby",
          "german": "In der Nähe gibt es einen Markt"
        },
        {
          "id": "df4",
          "english": "I drive across the city",
          "german": "Ich fahre quer durch die Stadt"
        },
        {
          "id": "df5",
          "english": "Ten minutes on foot",
          "german": "Zehn Minuten zu Fuß"
        },
        {
          "id": "df6",
          "english": "Half of the street is new",
          "german": "Die Hälfte der Straße ist neu"
        },
        {
          "id": "df7",
          "english": "We take a detour — the way is far",
          "german": "Wir nehmen einen Umweg, der Weg ist weit"
        },
        {
          "id": "df8",
          "english": "Go straight ahead to the corner",
          "german": "Gehen Sie geradeaus bis zur Ecke"
        },
        {
          "id": "df9",
          "english": "From north to south it is far",
          "german": "Von Norden bis Süden ist es weit"
        },
        {
          "id": "df10",
          "english": "In the west is the sea, in the east the city",
          "german": "Im Westen ist das Meer, im Osten die Stadt"
        }
      ],
      "target_answer": "Wie weit ist der Strand?, Der Weg ist nicht fern, In der Nähe gibt es einen Markt, Ich fahre quer durch die Stadt, Zehn Minuten zu Fuß, Die Hälfte der Straße ist neu, Wir nehmen einen Umweg, der Weg ist weit, Gehen Sie geradeaus bis zur Ecke, Von Norden bis Süden ist es weit, Im Westen ist das Meer, im Osten die Stadt",
      "meaning": "how far, not far, nearby, across, on foot, half",
      "explanation": "wie weit asks the stretch, fern states the remoteness, die Nähe names the neighborhood, and quer durch crosses the space. Time answers where numbers fail: Zehn Minuten zu Fuß."
    },
    {
      "id": "l5172_e2",
      "type": "shift_select",
      "prompt": "'Wie _____ ist der Weg?' — which word does German use to ask HOW FAR?",
      "options": [
        "eins",
        "vier",
        "fern",
        "weit"
      ],
      "target_answer": "weit",
      "meaning": "wie weit = how far — the wide-word asks the distance",
      "explanation": "The fixed question is wie weit — literally 'how wide', the twin of wide at work. fern answers, it never asks: der Weg ist nicht fern. And eins and vier count things, not kilometers."
    },
    {
      "id": "l5172_e3",
      "type": "reverse_cognate",
      "prompt": "'weit' is a pure twin — the same ancient *wīdaz. Which English word is it?",
      "options": [
        "wide",
        "white",
        "with",
        "wit"
      ],
      "target_answer": "wide",
      "meaning": "weit ↔ wide: same sound, same root, same width",
      "explanation": "weit and wide are one word in two mouths: *wīdaz. white is the twin of a different German word (weiß), and with and wit come from other roots entirely — the width belongs to weit."
    },
    {
      "id": "l5172_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the time-answer frame: 'I wait four minutes'",
      "tile_options": [
        "warte",
        "Ich",
        "weit",
        "vier",
        "Minuten",
        "zehn"
      ],
      "target_answer": "Ich warte vier Minuten",
      "meaning": "I wait four minutes",
      "explanation": "German answers distance in time: not four streets but four minutes. warte takes the time phrase with no preposition — the same accusative frame as Ich warte zehn Minuten from the numbers lesson."
    },
    {
      "id": "l5172_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We walk along the river'",
      "target_answer": "Wir gehen den Fluss entlang",
      "meaning": "We walk along the river",
      "word_bank": [
        "die",
        "Wir",
        "quer",
        "Fluss",
        "weit",
        "den",
        "dem",
        "entlang",
        "gehen"
      ],
      "explanation": "entlang rides BEHIND the path: den Fluss entlang, never entlang den Fluss. The path takes accusative — den, not dem — which is why dem sits in the bank as the trap tile."
    }
  ],
  "summary": {
    "outcome": "Ask wie weit, answer with fern or a time, and shape the path with quer and entlang.",
    "use_example": {
      "german": "Wie weit ist der Strand? — Zehn Minuten zu Fuß.",
      "english": "How far is the beach? — Ten minutes on foot."
    },
    "takeaway": "die Nähe ↔ nigh, weit ↔ wide, fern ↔ far, entlang = ent + lang — one axis, two path words, and entlang always last.",
    "curiosity_teaser": "Next: the words English handed over — Sofa, Radio, Klavier, Computer, Kino."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Entfernung: die Nähe, weit, fern, quer, entlang (We walk along the river):",
    "target_answer": "Wir gehen den Fluss entlang",
    "word_bank": [
      "entlang",
      "gehen",
      "Wir",
      "den",
      "Fluss",
      "nicht",
      "heute"
    ],
    "explanation": "Re-assembling \"Wir gehen den Fluss entlang\" from scratch locks in the structural pattern of Entfernung: die Nähe, weit, fern, quer, entlang without relying on short-term echo."
  }
};

export default lesson;
