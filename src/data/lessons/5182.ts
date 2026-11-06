import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5182,
  "slug": "lehnwoerter-ii-hotel-taxi-bus-theater-hobby",
  "title": "Lehnwörter II: Hotel, Taxi, Bus, Theater, das Hobby",
  "subtitle": "the travel-and-leisure layer — short Bus, long Theater, and the stress German imposes",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "hotel",
    "taxi",
    "bus",
    "theater",
    "hobby",
    "nehmen",
    "fahren",
    "gehen",
    "teuer",
    "schwimmen",
    "stadt",
    "fünf",
    "sechs"
  ],
  "table_word_ids": [
    "hotel",
    "taxi",
    "bus",
    "theater",
    "hobby",
    "nehmen",
    "fahren",
    "gehen",
    "teuer",
    "schwimmen",
    "stadt",
    "fünf",
    "sechs",
    "ärger",
    "fangen"
  ],
  "hook": {
    "title": "The Travel Layer",
    "content": "The travel-and-leisure words are German's most cosmopolitan shelf — Latin, Greek, French and English itself, all pronounced with German rules. das Hotel is one word wearing three English masks: Latin hospitale became French hôtel, and English borrowed the family three times as hostel, hotel and hospital. das Taxi is a shortening: the meter on the roof that charged you was the Taxameter — Latin taxa, 'charge', the same root as English tax — and the cab took the meter's name. der Bus is Latin omnibus, 'for all' — a French omnibus car shortened until only the Latin ending survived. das Theater is Greek théatron, 'the viewing place' — and English theory is the same Greek viewing-root: a theory is a way of seeing. das Hobby is the newest arrival, borrowed straight from English and pluralized German-style: die Hobbys. And watch the stress German imposes: Bus is short and blunt, but Theater carries the beat in the middle — te-A-ter — where English says THI-ater.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "For All",
        "content": "Omnibus is Latin 'for all' — the dative plural of omnis. The Paris passenger car of the 1820s was the voiture omnibus, the car-for-all, and the nickname outlived the joke: both languages kept the short form, bus, and forgot the Latin."
      }
    ]
  },
  "pattern": {
    "title": "Taking the Bus, Taking a Taxi",
    "content": "Transport takes mit + dem: Wir fahren mit dem Bus in die Stadt. Destination takes zu or in + das: zum Hotel, ins Theater. The vehicle frame: Wir nehmen ein Taxi zum Hotel — nehmen does the taking. Der Bus kommt um sechs Uhr. Duration: Es dauert fünf Minuten mit dem Taxi. And the leisure frame: Mein Hobby ist Schwimmen — the verb dressed as a noun. The articles: das Hotel, das Taxi, das Theater, das Hobby — only der Bus is der, the one short blunt exception.",
    "footnotes": [],
    "linguist_note": "German stress is the arrival stamp. Bus kept its single blunt syllable; Theater moved the beat to the middle — te-A-ter — a Greek-French rhythm English never adopted; Hobby folded into German plurals (die Hobbys) while staying English in spelling."
  },
  "exercises": [
    {
      "id": "l5182_e1",
      "type": "matching_pairs",
      "prompt": "The travel-and-leisure shelf in its frames — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "tv1",
          "english": "The bus comes at six o'clock",
          "german": "Der Bus kommt um sechs Uhr"
        },
        {
          "id": "tv2",
          "english": "We take a taxi to the hotel",
          "german": "Wir nehmen ein Taxi zum Hotel"
        },
        {
          "id": "tv3",
          "english": "We are going to the theater today",
          "german": "Wir gehen heute ins Theater"
        },
        {
          "id": "tv4",
          "english": "The hotel is very expensive",
          "german": "Das Hotel ist sehr teuer"
        },
        {
          "id": "tv5",
          "english": "My hobby is swimming",
          "german": "Mein Hobby ist Schwimmen"
        }
      ],
      "target_answer": "Der Bus kommt um sechs Uhr, Wir nehmen ein Taxi zum Hotel, Wir gehen heute ins Theater, Das Hotel ist sehr teuer, Mein Hobby ist Schwimmen",
      "meaning": "bus, taxi, hotel, theater, hobby",
      "explanation": "nehmen takes the taxi, mit + dem takes the bus, ins Theater is the destination frame, and das Hobby dresses a verb as a noun. Five loans, one grammar."
    },
    {
      "id": "l5182_e2",
      "type": "shift_select",
      "prompt": "'_____ Bus kommt um sechs Uhr' — which masculine article does the clipped vehicle noun Bus take?",
      "options": [
        "der",
        "das",
        "die"
      ],
      "target_answer": "der",
      "meaning": "der Bus — the one masculine on the travel shelf",
      "explanation": "Bus is the exception: das Hotel, das Taxi, das Theater, das Hobby — but der Bus. The shortest, bluntest word on the shelf is also the only one that refused the neuter default."
    },
    {
      "id": "l5182_e3",
      "type": "reverse_cognate",
      "prompt": "German 'das Schauspielhaus' or its Greek-rooted international twin names a stage playhouse. What is that English venue noun (US spelling)?",
      "options": [
        "museum",
        "cinema",
        "stadium",
        "theater"
      ],
      "target_answer": "theater",
      "meaning": "das Theater = the theater",
      "explanation": "Theater is the same Greek viewing-word English kept: théatron, 'the viewing place'. ins Theater gehen — off to the viewing place. (das Kino, from lesson 5181, is where you watch films instead.)"
    },
    {
      "id": "l5182_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the transport frame: 'We go by bus into the city'",
      "tile_options": [
        "fahren",
        "der",
        "dem",
        "die",
        "Bus",
        "Wir",
        "Stadt",
        "mit",
        "in",
        "zum"
      ],
      "target_answer": "Wir fahren mit dem Bus in die Stadt",
      "meaning": "We go by bus into the city",
      "explanation": "Vehicle takes mit + dem; motion into a place takes in + accusative (in die Stadt), while standing in a place takes dative (in der Stadt, im Haus). zum in the bank belongs to destinations like zum Hotel, not to vehicles."
    },
    {
      "id": "l5182_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"That's five minutes by taxi\"",
      "target_answer": "Das sind fünf Minuten mit dem Taxi",
      "meaning": "That's five minutes by taxi",
      "word_bank": [
        "Minuten",
        "dem",
        "sind",
        "zehn",
        "zu",
        "Bus",
        "mit",
        "fünf",
        "Taxi",
        "Das"
      ],
      "explanation": "Distance answers in time: das sind fünf Minuten mit dem Taxi. mit + dem names the vehicle, and the bank's zehn proves the frame scales — zehn Minuten mit dem Bus.",
      "idea": "That's five minutes by taxi",
      "idea_parts": [
        "That's five",
        "minutes by taxi (verb in position 2)"
      ],
      "cues": [
        "Start with \"Das\" and anchor \"sind\" in position 2.",
        "Close the frame with \"Taxi\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Handle the travel words — der Bus, das Taxi, zum Hotel, ins Theater — and read the stress German imposes on its loans.",
    "use_example": {
      "german": "Wir nehmen ein Taxi zum Hotel — der Bus kommt um sechs Uhr.",
      "english": "We take a taxi to the hotel — the bus comes at six o'clock."
    },
    "takeaway": "Hotel, Taxi, Bus, Theater, Hobby — hospitale, taxa, omnibus, théatron and English itself; Bus is short and blunt, Theater is te-A-ter, and das rules the shelf except der Bus.",
    "curiosity_teaser": "Next: what you wear — der Schuh, die Hose, das Hemd, der Mantel, die Jacke."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Lehnwörter II: Hotel, Taxi, Bus, Theater, das Hobby (That's five minutes by taxi):",
    "target_answer": "Das sind fünf Minuten mit dem Taxi",
    "word_bank": [
      "Minuten",
      "nicht",
      "fünf",
      "dem",
      "heute",
      "mit",
      "Taxi",
      "sind",
      "Das"
    ],
    "explanation": "Re-assembling \"Das sind fünf Minuten mit dem Taxi\" from scratch locks in the structural pattern of Lehnwörter II: Hotel, Taxi, Bus, Theater, das Hobby without relying on short-term echo."
  }
};

export default lesson;
