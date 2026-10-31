import type { Lesson } from "../lib/types";

// Optional reading-comprehension branches for the German trail. Each lesson is
// a short passage plus five checks: the learner reads first, then answers
// who/what/where/why questions before doing one close-reading task.
// Slugs start with "story-" so the reader can label the pattern step as the
// story and the table as the word bank.
export const READING_LESSONS: Lesson[] = [
  {
    id: 9001,
    slug: "story-s1-max-laeuft-weg",
    title: "Max läuft weg",
    subtitle: "A present-tense story: a dog, an open door, and a happy ending",
    phase: 2,
    spineStory: true,
    label: "s1",
    shift_categories: [],
    word_ids: ["hund", "stadt", "laufen", "schnell", "klein", "braun", "müde", "abend"],
    table_word_ids: [
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
      "haus",
    ],
    hook: {
      title: "Before You Read",
      content:
        "This is a short story in the present tense, so everything happens in front of you. Follow three things: the dog Max, the open door, and how Paul feels. Read it once for the story, then once for the words you already know. You do not need every word to understand what happens.",
      footnotes: [
        {
          marker: "1",
          title: "Bellen",
          content:
            "das Bellen = barking. It appears in the story as a sound, not as a new grammar rule. You can hear it and keep reading.",
        },
        {
          marker: "2",
          title: "überall",
          content:
            "überall = everywhere. It is the picture-word for Paul's search: in the garden, in the house, everywhere.",
        },
        {
          marker: "3",
          title: "spielen",
          content:
            "spielen = to play. Jeden Morgen spielen Paul und Max im Garten = every morning Paul and Max play in the garden.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Paul hat einen Hund. Sein Hund heißt Max. Max ist klein, braun und sehr schnell.\n\nJeden Morgen spielen Paul und Max im Garten. Aber heute ist die Tür offen. Max läuft in die Stadt. Paul sucht Max überall. Er geht in den Garten und in das Haus. Max ist nicht da. Paul ist traurig.\n\nDann hört Paul ein lautes Bellen. Max kommt zu Paul. Paul lacht und sagt: „Max! Du bist wieder da!“\n\nAm Abend sind Paul und Max müde. Sie schlafen im Haus.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5321_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        vocab_hints: [
          { word: "offen", translation: "open" },
          { word: "überall", translation: "everywhere" },
        ],
        matching_pairs: [
          { id: "m1", english: "Paul has a dog.", german: "Paul hat einen Hund." },
          { id: "m2", english: "Max is small, brown, and very fast.", german: "Max ist klein, braun und sehr schnell." },
          { id: "m3", english: "Today the door is open.", german: "Heute ist die Tür offen." },
          { id: "m4", english: "Max runs into the city.", german: "Max läuft in die Stadt." },
          { id: "m5", english: "Paul searches for Max everywhere.", german: "Paul sucht Max überall." },
          { id: "m6", english: "In the evening Paul and Max are tired.", german: "Am Abend sind Paul und Max müde." },
        ],
        target_answer:
          "Paul hat einen Hund., Max ist klein, braun und sehr schnell., Heute ist die Tür offen., Max läuft in die Stadt., Paul sucht Max überall., Am Abend sind Paul und Max müde.",
        meaning: "the story beats: Paul, Max, the open door, the search, the happy ending",
        explanation:
          "Six sentences carry the whole plot. If you can re-tell these six beats, you have read the story.",
      },
      {
        id: "l5321_e2",
        type: "shift_select",
        prompt: "Why does Paul search for Max?",
        options: [
          "Because Max runs into the city.",
          "Because Max is hungry.",
          "Because Paul wants to buy bread.",
          "Because the garden is closed.",
        ],
        target_answer: "Because Max runs into the city.",
        meaning: "Max leaves through the open door, so Paul goes looking for him.",
        explanation:
          "The cause is the open door: Max läuft in die Stadt. Paul's search is the result, not the cause.",
      },
      {
        id: "l5321_e3",
        type: "shift_select",
        prompt: "Where does Paul look for Max?",
        options: [
          "In the garden and in the house",
          "In the city and at the station",
          "In the kitchen and in the garden",
          "At the market and in the house",
        ],
        target_answer: "In the garden and in the house",
        meaning: "Paul searches the garden and the house before Max comes back.",
        explanation:
          "The text says: Er geht in den Garten und in das Haus. Those are the two places he checks.",
      },
      {
        id: "l5321_e4",
        type: "shift_select",
        prompt: "How does Paul feel before Max comes back?",
        options: ["Sad", "Angry", "Hungry", "Cold"],
        target_answer: "Sad",
        meaning: "Paul is sad while Max is missing.",
        explanation: "The sentence Paul ist traurig gives the feeling directly; then Max comes back and Paul laughs.",
      },
      {
        id: "l5321_e5",
        type: "syntax_builder",
        prompt: "Rebuild the sentence: 'Max comes back to Paul.'",
        target_answer: "Max kommt zu Paul",
        meaning: "Max comes back to Paul.",
        word_bank: ["Max", "kommt", "zu", "Paul", "nach", "Hause"],
        explanation:
          "German puts the destination after the verb: Max kommt zu Paul. The extra chips are there to make you choose the right ending.",
      },
    ],
    twist: {
      prompt: "Without looking back — rebuild the last scene: 'The dog runs quickly home.'",
      target_answer: "Der Hund läuft schnell nach Hause",
      word_bank: ["Der", "Hund", "läuft", "schnell", "nach", "Hause", "Stadt"],
      explanation:
        "nach Hause is the fixed phrase for 'home' (direction). Keep the verb in second position and the direction at the end: Der Hund läuft schnell nach Hause.",
    },
    summary: {
      outcome: "Read a short present-tense story and answer who, where, and how questions.",
      use_example: {
        german: "Max läuft in die Stadt. Paul sucht ihn überall.",
        english: "Max runs into the city. Paul searches for him everywhere.",
      },
      takeaway:
        "A story is a chain of small sentences: who does what, where it happens, and how it ends. You do not need every word to follow the chain.",
      curiosity_teaser: "Next: a lost puppy, a kind girl, and an old man on a bench.",
    },
  },
  {
    id: 5322,
    slug: "story-der-kleine-hund",
    title: "Der kleine Hund",
    subtitle: "Anna finds a lost puppy and follows him to the person who misses him",
    phase: 2,
    shift_categories: [],
    word_ids: ["wetter", "sonne", "bank", "entschuldigung", "laufen", "froh"],
    table_word_ids: [
      "hören",
      "wetter",
      "sonne",
      "himmel",
      "minute",
      "scheinen",
      "bank",
      "entschuldigung",
      "laufen",
      "froh",
      "hund",
      "garten",
      "baum",
      "alt",
      "mann",
      "frau",
      "süß",
      "müde",
      "glücklich",
      "allein",
      "sitzen",
      "stehen",
      "danke",
      "helfen",
      "finden",
      "suchen",
    ],
    hook: {
      title: "Before You Read",
      content:
        "A small dog is alone in the garden. Anna does not know whose dog he is, so she follows him. Watch the weather at the start and the old man at the end: they tell you what kind of day this is.",
      footnotes: [
        {
          marker: "1",
          title: "folgen",
          content:
            "folgen = to follow. It takes a dative person: Anna folgt ihm = Anna follows him. You only need to recognise it here.",
        },
        {
          marker: "2",
          title: "Gern geschehen",
          content:
            "Gern geschehen = 'you're welcome' (literally: gladly done). It is the polite answer to danke.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Es ist Samstag. Das Wetter ist schön. Die Sonne scheint, und der Himmel ist blau.\n\nAnna geht in den Garten. Dort sieht sie einen kleinen Hund. Der Hund ist braun und weiß. Er sitzt allein unter einem Baum.\n\nAnna geht langsam zu ihm. „Hallo, kleiner Hund“, sagt sie. Der Hund steht auf und läuft langsam. Anna folgt ihm.\n\nNach zwei Minuten sehen sie einen alten Mann. Er sitzt auf einer Bank und ist traurig. „Entschuldigung, ist das Ihr Hund?“, fragt Anna. Der Mann lächelt. „Ja! Vielen Dank! Ich habe ihn gesucht.“\n\nDer Hund läuft schnell zu dem Mann. Anna hört, wie der Mann lacht. Sie ist müde, aber sehr froh.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5322_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        matching_pairs: [
          { id: "m1", english: "The weather is beautiful.", german: "Das Wetter ist schön." },
          { id: "m2", english: "The sun is shining.", german: "Die Sonne scheint." },
          { id: "m3", english: "The dog sits alone under a tree.", german: "Der Hund sitzt allein unter einem Baum." },
          { id: "m4", english: "Anna follows him.", german: "Anna folgt ihm." },
          { id: "m5", english: "The old man sits on a bench.", german: "Der alte Mann sitzt auf einer Bank." },
          { id: "m6", english: "Anna is tired but very glad.", german: "Anna ist müde, aber sehr froh." },
        ],
        target_answer:
          "Das Wetter ist schön., Die Sonne scheint., Der Hund sitzt allein unter einem Baum., Anna folgt ihm., Der alte Mann sitzt auf einer Bank., Anna ist müde, aber sehr froh.",
        meaning: "the story beats: the sunny day, the lost dog, the old man, the happy ending",
        explanation:
          "The weather opens the story, the dog moves it, and the old man resolves it. Six beats, one small adventure.",
      },
      {
        id: "l5322_e2",
        type: "shift_select",
        prompt: "Where does Anna find the dog?",
        options: ["In the garden", "At the market", "In the city", "In a café"],
        target_answer: "In the garden",
        meaning: "Anna meets the dog in the garden.",
        explanation: "The second paragraph begins Anna geht in den Garten. Dort sieht sie einen kleinen Hund.",
      },
      {
        id: "l5322_e3",
        type: "shift_select",
        prompt: "Why is the old man sad?",
        options: [
          "He has lost his dog.",
          "He is hungry.",
          "He is cold.",
          "He cannot find his house.",
        ],
        target_answer: "He has lost his dog.",
        meaning: "The old man is sad because his dog is missing.",
        explanation:
          "The man says Ich habe ihn gesucht — 'I have been looking for him.' His sadness and the dog's return answer the same question.",
      },
      {
        id: "l5322_e4",
        type: "shift_select",
        prompt: "What does Anna hear at the end?",
        options: ["The man laughing", "A train", "A dog barking", "The rain"],
        target_answer: "The man laughing",
        meaning: "Anna hears the old man laugh when the dog returns.",
        explanation: "The last paragraph says Anna hört, wie der Mann lacht — she hears the man laugh.",
      },
      {
        id: "l5322_e5",
        type: "literal_gloss",
        prompt: "Which English follows the German words most closely?",
        german: "Der Hund läuft schnell zu dem Mann.",
        natural: "The dog runs quickly over to the man.",
        options: [
          "The dog runs fast to the man",
          "The dog runs quickly over to the man",
          "The man runs fast to the dog",
          "The dog slowly leaves the man",
        ],
        target_answer: "The dog runs fast to the man",
        meaning: "The dog runs fast to the man.",
        explanation:
          "zu dem Mann is literally 'to the man' — the dative destination. The natural English 'over to the man' adds a direction word German does not need.",
      },
    ],
    twist: {
      prompt: "Without looking back — rebuild: 'The dog sits alone under a tree.'",
      target_answer: "Der Hund sitzt allein unter einem Baum",
      word_bank: ["Der", "Hund", "sitzt", "allein", "unter", "einem", "Baum", "Bank"],
      explanation:
        "unter einem Baum is the dative picture of where the dog sits. The bench (Bank) is a distractor; the story puts the dog under the tree.",
    },
    summary: {
      outcome: "Read a short story about a lost dog and answer where, why, and what-happens questions.",
      use_example: {
        german: "Der Hund sitzt allein unter einem Baum. Anna folgt ihm zu einem alten Mann.",
        english: "The dog sits alone under a tree. Anna follows him to an old man.",
      },
      takeaway:
        "Weather and feelings are story clues. A sunny start and a sad old man tell you the problem before the dialogue names it.",
      curiosity_teaser: "Next branch: a train, rain, and a wrong bus in Paris.",
    },
  },
  {
    id: 9002,
    slug: "story-s2-eine-reise-mit-pannen",
    title: "Eine Reise mit Pannen",
    subtitle: "A trip to Paris goes wrong in small ways — and becomes a memory",
    phase: 3,
    spineStory: true,
    label: "s2",
    shift_categories: [],
    word_ids: ["postkarte", "rucksack", "land", "nass", "regen", "wetter", "markt", "familie"],
    table_word_ids: [
      "postkarte",
      "rucksack",
      "land",
      "nass",
      "regen",
      "wetter",
      "markt",
      "familie",
      "zug",
      "fahrt",
      "urlaub",
      "freund",
      "geld",
      "stunde",
      "spät",
      "suppe",
      "obst",
    ],
    hook: {
      title: "Before You Read",
      content:
        "This story uses the conversational past (Perfekt), the tense Germans actually speak in when they tell you about last week. Do not stop at every participle: follow the sequence — first the train, then the rain, then the wrong bus, then the market. The ending tells you how to feel about all of it.",
      footnotes: [
        {
          marker: "1",
          title: "Verspätung",
          content:
            "die Verspätung = delay. der Zug hatte eine Stunde Verspätung = the train was an hour late. It is a compound of spät (late).",
        },
        {
          marker: "2",
          title: "Regenschirm & Café",
          content:
            "der Regenschirm = umbrella (Regen + Schirm); das Café = café. Both are glossed here because the story needs them and they are not part of the lesson's word bank.",
        },
        {
          marker: "3",
          title: "Zum Glück",
          content:
            "zum Glück = luckily / fortunately. It is the story's turn signal: after it, something good happens.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Lea und Mia sind Freundinnen. Letzte Woche sind sie mit dem Zug nach Paris gefahren. Sie wollen ein neues Land sehen, und sie haben ihre Rucksäcke gepackt. Am Anfang war alles gut.\n\nDann hatte der Zug eine Stunde Verspätung. Die beiden haben gewartet und Musik gehört. Mia war ein bisschen nervös, aber sie haben auch gelacht.\n\nIn Paris hat es stark geregnet. Lea und Mia hatten keinen Regenschirm und sind ganz nass geworden. Zum Glück haben sie ein kleines Café gefunden. Dort haben sie eine warme Suppe gegessen.\n\nAm nächsten Tag wollten sie die Stadt sehen. Aber sie haben den falschen Bus genommen. Plötzlich waren sie in einer anderen Straße. Zuerst waren sie traurig, aber dann haben sie einen schönen Markt gefunden. Dort haben sie Obst gekauft und Postkarten geschrieben.\n\nAm Abend waren sie sehr müde, aber sie haben viel gelacht. Die Reise war nicht perfekt, aber sie war besonders.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5331_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        vocab_hints: [
          { word: "Zug", translation: "train" },
          { word: "Stunde", translation: "hour" },
          { word: "geregnet", translation: "rained (participle of regnen)" },
          { word: "falschen", translation: "wrong (accusative)" },
          { word: "Bus", translation: "bus" },
          { word: "schönen", translation: "beautiful (accusative)" },
          { word: "gelacht", translation: "laughed (participle of lachen)" },
        ],
        matching_pairs: [
          { id: "m1", english: "Last week they went to Paris by train.", german: "Letzte Woche sind sie mit dem Zug nach Paris gefahren." },
          { id: "m2", english: "The train was an hour late.", german: "Der Zug hatte eine Stunde Verspätung." },
          { id: "m3", english: "It rained heavily in Paris.", german: "In Paris hat es stark geregnet." },
          { id: "m4", english: "They took the wrong bus.", german: "Sie haben den falschen Bus genommen." },
          { id: "m5", english: "Then they found a beautiful market.", german: "Dann haben sie einen schönen Markt gefunden." },
          { id: "m6", english: "In the evening they were tired but laughed a lot.", german: "Am Abend waren sie müde, aber sie haben viel gelacht." },
        ],
        target_answer:
          "Letzte Woche sind sie mit dem Zug nach Paris gefahren., Der Zug hatte eine Stunde Verspätung., In Paris hat es stark geregnet., Sie haben den falschen Bus genommen., Dann haben sie einen schönen Markt gefunden., Am Abend waren sie müde, aber sie haben viel gelacht.",
        meaning: "the trip's sequence: train, delay, rain, wrong bus, market, tired but happy",
        explanation:
          "The six beats are a sequence, not a list. The story is built to be re-told in order.",
      },
      {
        id: "l5331_e2",
        type: "shift_select",
        prompt: "What was the first problem on the trip?",
        options: [
          "The train was late.",
          "It rained.",
          "They took the wrong bus.",
          "They lost their money.",
        ],
        target_answer: "The train was late.",
        meaning: "The train delay comes before the rain and the wrong bus.",
        explanation:
          "The first problem is the Verspätung. The rain comes after they arrive in Paris; the bus comes the next day.",
      },
      {
        id: "l5331_e3",
        type: "shift_select",
        prompt: "Why did Lea and Mia get wet?",
        options: [
          "They had no umbrella.",
          "They fell into the river.",
          "They forgot their bags.",
          "The café was closed.",
        ],
        target_answer: "They had no umbrella.",
        meaning: "They had no umbrella, so the rain soaked them.",
        explanation:
          "The sentence says: Lea und Mia hatten keinen Regenschirm und sind ganz nass geworden. No umbrella, therefore wet.",
      },
      {
        id: "l5331_e4",
        type: "shift_select",
        prompt: "How did the trip end?",
        options: [
          "They were tired but happy.",
          "They went home angry.",
          "They missed the train home.",
          "They stayed in Paris forever.",
        ],
        target_answer: "They were tired but happy.",
        meaning: "They end the trip tired, but laughing and calling it special.",
        explanation:
          "The last two sentences say they were tired and laughed a lot, and the trip was not perfect but special.",
      },
      {
        id: "l5331_e5",
        type: "transcribe",
        prompt: "Render the thought in German: 'They took the wrong bus.'",
        idea: "They took the wrong bus.",
        cues: [
          "Start with 'They have...' — the Perfekt bracket.",
          "The participle goes at the very end.",
          "genommen is the participle of nehmen.",
        ],
        target_answer: "Sie haben den falschen Bus genommen",
        meaning: "They took the wrong bus.",
        word_bank: ["Sie", "haben", "den", "falschen", "Bus", "genommen", "Zug"],
        explanation:
          "Perfekt bracket: Sie haben ... genommen. The accusative object is den falschen Bus; the participle closes the sentence.",
      },
    ],
    twist: {
      prompt: "Without looking back — say in German: 'They found a beautiful market.'",
      target_answer: "Sie haben einen schönen Markt gefunden",
      word_bank: ["Sie", "haben", "einen", "schönen", "Markt", "gefunden", "Bus"],
      explanation:
        "einen schönen Markt is the accusative object; gefunden is the participle of finden. The bracket stays open until the last word.",
    },
    summary: {
      outcome: "Follow a Perfekt narrative, sequence its events, and answer cause-and-feeling questions.",
      use_example: {
        german: "Sie haben den falschen Bus genommen, aber dann einen schönen Markt gefunden.",
        english: "They took the wrong bus, but then found a beautiful market.",
      },
      takeaway:
        "In a Perfekt story, the participle at the end is the action; the auxiliary at the front only carries the time. Read the bracket as one unit.",
      curiosity_teaser: "Next: a sunny Saturday, a bench, and a dog called Max.",
    },
  },
  {
    id: 5332,
    slug: "story-ein-tag-im-park",
    title: "Ein Tag im Park",
    subtitle: "A Perfekt diary of one ordinary Saturday with a friend and a dog",
    phase: 3,
    shift_categories: [],
    word_ids: ["sonne", "bank", "wetter", "laufen", "froh", "blume", "junge"],
    table_word_ids: [
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
      "wochenende",
    ],
    hook: {
      title: "Before You Read",
      content:
        "This is a diary-style story: Anna tells you what she did on Saturday, step by step. The time phrases are your map — am Morgen, um zehn Uhr, nach dem Essen, um eins. Follow the clock even if a participle is new.",
      footnotes: [
        {
          marker: "1",
          title: "sich treffen",
          content:
            "sich treffen = to meet. Wir haben uns im Park getroffen = we met in the park. The sich moves to uns for wir; you only need to recognise the chunk.",
        },
        {
          marker: "2",
          title: "sich hinsetzen",
          content:
            "sich hinsetzen = to sit down. Sie haben sich hingesetzt = they sat down. The separable prefix ge- sits inside the participle: hinge-setzt.",
        },
        {
          marker: "3",
          title: "Es gibt",
          content:
            "es gibt = there is / there are, literally 'it gives'. You will meet it in the close-reading exercise.",
        },
        {
          marker: "4",
          title: "frühstücken & anrufen",
          content:
            "frühstücken = to have breakfast; anrufen = to call someone. Sie hat gefrühstückt ... ihre Freundin Lisa angerufen = she had breakfast ... called her friend Lisa.",
        },
        {
          marker: "5",
          title: "Foto, Bild, Park",
          content:
            "das Foto = photo; das Bild = picture; der Park = park. The story uses all three in the picnic scene.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Am Samstag war das Wetter schön. Die Sonne schien, und es war warm.\n\nAnna ist um acht Uhr aufgestanden. Sie hat gefrühstückt und einen Kaffee getrunken. Dann hat sie ihre Freundin Lisa angerufen. Um zehn Uhr haben sie sich im Park getroffen. Lisa hat ihren Hund Max mitgebracht. Max ist klein, braun und sehr freundlich.\n\nSie sind zusammen spazieren gegangen und haben viel gelacht. Im Park gibt es viele Bäume und Blumen. Ein Mädchen und ein Junge spielen mit einem Ball. Sie haben eine Bank gefunden und sich hingesetzt. Dort haben sie Brot gegessen und Wasser getrunken.\n\nNach dem Essen haben sie Fotos gemacht. Lisa hat viele schöne Bilder von Max und den Blumen gemacht. Um eins sind sie nach Hause gegangen. Es war ein schöner Tag.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5332_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        matching_pairs: [
          { id: "m1", english: "On Saturday the weather was beautiful.", german: "Am Samstag war das Wetter schön." },
          { id: "m2", english: "Anna got up at eight.", german: "Anna ist um acht Uhr aufgestanden." },
          { id: "m3", english: "At ten they met in the park.", german: "Um zehn Uhr haben sie sich im Park getroffen." },
          { id: "m4", english: "Lisa brought her dog Max.", german: "Lisa hat ihren Hund Max mitgebracht." },
          { id: "m5", english: "They found a bench and sat down.", german: "Sie haben eine Bank gefunden und sich hingesetzt." },
          { id: "m6", english: "At one they went home.", german: "Um eins sind sie nach Hause gegangen." },
        ],
        target_answer:
          "Am Samstag war das Wetter schön., Anna ist um acht Uhr aufgestanden., Um zehn Uhr haben sie sich im Park getroffen., Lisa hat ihren Hund Max mitgebracht., Sie haben eine Bank gefunden und sich hingesetzt., Um eins sind sie nach Hause gegangen.",
        meaning: "the Saturday timeline: morning, ten o'clock, the bench, one o'clock",
        explanation:
          "The time phrases order the story. If you can line up the clock, the participles have a place to sit.",
      },
      {
        id: "l5332_e2",
        type: "shift_select",
        prompt: "Who is Max?",
        options: ["Lisa's dog", "Anna's brother", "A cat", "A friend from work"],
        target_answer: "Lisa's dog",
        meaning: "Max is Lisa's small brown dog.",
        explanation: "Lisa hat ihren Hund Max mitgebracht — Lisa brought her dog Max.",
      },
      {
        id: "l5332_e3",
        type: "shift_select",
        prompt: "What did they do after eating?",
        options: [
          "They took photos.",
          "They went swimming.",
          "They cooked dinner.",
          "They read a book.",
        ],
        target_answer: "They took photos.",
        meaning: "After eating, they took photos of Max and the flowers.",
        explanation:
          "Nach dem Essen haben sie Fotos gemacht. The time phrase nach dem Essen tells you the order.",
      },
      {
        id: "l5332_e4",
        type: "shift_select",
        prompt: "How long were they in the park?",
        options: ["From ten to one", "From eight to ten", "All day", "For one hour"],
        target_answer: "From ten to one",
        meaning: "They met at ten and went home at one, so three hours.",
        explanation:
          "The story gives two clock times: um zehn Uhr ... getroffen and um eins ... nach Hause gegangen. Ten to one is three hours.",
      },
      {
        id: "l5332_e5",
        type: "literal_gloss",
        prompt: "Which English follows the German words most closely?",
        german: "Im Garten gibt es viele Bäume und Blumen.",
        natural: "In the garden there are many trees and flowers.",
        options: [
          "In the garden it gives many trees and flowers",
          "In the garden there are many trees and flowers",
          "The garden gives many trees and flowers",
          "Many trees and flowers give the garden",
        ],
        target_answer: "In the garden it gives many trees and flowers",
        meaning: "In the garden there are many trees and flowers.",
        explanation:
          "German says es gibt — literally 'it gives' — where English says 'there is/are'. The odd English is the lens; the natural sentence is what you mean.",
      },
    ],
    twist: {
      prompt: "Without looking back — rebuild the picnic: 'We eat bread and drink water.'",
      target_answer: "Wir essen Brot und trinken Wasser",
      word_bank: ["Wir", "essen", "Brot", "und", "trinken", "Wasser", "Kaffee"],
      explanation:
        "The story tells it in the past, but the same thought in the present is Wir essen Brot und trinken Wasser. The verb stays in second position; und links two equal clauses.",
    },
    summary: {
      outcome: "Follow a Perfekt diary with time phrases, then answer sequence and duration questions.",
      use_example: {
        german: "Um zehn Uhr haben sie sich im Park getroffen, und um eins sind sie nach Hause gegangen.",
        english: "At ten they met in the park, and at one they went home.",
      },
      takeaway:
        "Time phrases are the skeleton of a past-tense story. Find the clock words first; the participles then hang on them.",
      curiosity_teaser: "Next: a baker, a broken car, and a bicycle that is almost as fast.",
    },
  },
  {
    id: 9003,
    slug: "story-s3-fahrrad-statt-auto",
    title: "Fahrrad statt Auto",
    subtitle: "Tom's car breaks down, and a borrowed bicycle changes his mind",
    phase: 3,
    spineStory: true,
    label: "s3",
    shift_categories: [],
    word_ids: ["rad", "fahrrad", "auto", "teuer", "schnell", "langsam", "gleich"],
    table_word_ids: [
      "rad",
      "gesundheit",
      "fahrrad",
      "auto",
      "teuer",
      "schnell",
      "langsam",
      "gleich",
      "bäckerei",
      "bäcker",
      "stadt",
      "freund",
      "danke",
      "minute",
      "stunde",
      "geld",
      "zug",
    ],
    hook: {
      title: "Before You Read",
      content:
        "This story is built on comparisons: faster than, slower than, almost as fast. Watch the words als and wie — they are the hinges. The plot is simple: a car stops working, a friend lends a bicycle, and Tom discovers something.",
      footnotes: [
        {
          marker: "1",
          title: "Benzin & kaputt",
          content:
            "das Benzin = petrol/gas; kaputt = broken. Both are glossed here because the story needs them and they are not in the lesson's word bank.",
        },
        {
          marker: "2",
          title: "ein paar",
          content:
            "ein paar Minuten = a few minutes. Do not confuse it with das Paar (a pair); the small p is the quantity word.",
        },
        {
          marker: "3",
          title: "als vs. wie",
          content:
            "schneller als = faster than; gleich schnell wie = as fast as. German separates the two jobs that English 'as/than' also keeps apart.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Tom ist Bäcker. Er arbeitet in einer kleinen Bäckerei in der Stadt. Eigentlich fährt er jeden Tag mit dem Auto zur Arbeit. Aber das Benzin ist sehr teuer, und sein Auto ist alt.\n\nHeute ist das Auto kaputt. Tom weiß nicht, was er machen soll. Da kommt sein Freund Alex. „Ich kann dir mein Fahrrad geben“, sagt Alex.\n\nTom setzt sich auf das Fahrrad und fährt zur Bäckerei. Das geht schneller als mit dem Auto! Er ist nur ein paar Minuten langsamer. Am Nachmittag fährt Tom mit dem Rad zurück.\n\n„Danke, Alex! Ich kaufe mir auch ein Fahrrad. Mit dem Fahrrad bin ich fast gleich schnell. Außerdem ist es gut für meine Gesundheit.“\n\nAlex lacht. „Super! Dann machen wir zusammen eine Fahrt.“",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5341_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        vocab_hints: [{ word: "fast", translation: "almost" }],
        matching_pairs: [
          { id: "m1", english: "Normally Tom drives to work by car every day.", german: "Eigentlich fährt er jeden Tag mit dem Auto zur Arbeit." },
          { id: "m2", english: "But the gas is very expensive.", german: "Aber das Benzin ist sehr teuer." },
          { id: "m3", english: "Today the car is broken.", german: "Heute ist das Auto kaputt." },
          { id: "m4", english: "Alex gives Tom his bicycle.", german: "Alex gibt Tom sein Fahrrad." },
          { id: "m5", english: "That is faster than by car.", german: "Das geht schneller als mit dem Auto." },
          { id: "m6", english: "By bike I am almost as fast.", german: "Mit dem Fahrrad bin ich fast gleich schnell." },
        ],
        target_answer:
          "Eigentlich fährt er jeden Tag mit dem Auto zur Arbeit., Aber das Benzin ist sehr teuer., Heute ist das Auto kaputt., Alex gibt Tom sein Fahrrad., Das geht schneller als mit dem Auto., Mit dem Fahrrad bin ich fast gleich schnell.",
        meaning: "the story beats: the car, the cost, the breakdown, the borrowed bike, the comparison",
        explanation:
          "The middle two sentences are the turn: the car fails, and the bicycle arrives. The last two are Tom's conclusion.",
      },
      {
        id: "l5341_e2",
        type: "shift_select",
        prompt: "Why does Tom not drive today?",
        options: [
          "His car is broken.",
          "He lost his keys.",
          "The bakery is closed.",
          "He wants to walk.",
        ],
        target_answer: "His car is broken.",
        meaning: "The car is broken, so Tom cannot drive it.",
        explanation: "Heute ist das Auto kaputt is the direct cause. The expensive gas is background, not today's problem.",
      },
      {
        id: "l5341_e3",
        type: "shift_select",
        prompt: "How does Tom feel about the bike ride?",
        options: [
          "Surprised that it is almost as fast",
          "Angry because it is slow",
          "Tired and hungry",
          "Afraid of the traffic",
        ],
        target_answer: "Surprised that it is almost as fast",
        meaning: "Tom is surprised: the bicycle is almost as fast as his car.",
        explanation:
          "Das geht schneller als mit dem Auto! and fast gleich schnell show surprise and a changed opinion.",
      },
      {
        id: "l5341_e4",
        type: "shift_select",
        prompt: "What does Tom decide at the end?",
        options: [
          "He wants to buy a bicycle.",
          "He wants to buy a new car.",
          "He wants to change jobs.",
          "He wants to sell his bakery.",
        ],
        target_answer: "He wants to buy a bicycle.",
        meaning: "Tom decides to buy his own bicycle.",
        explanation:
          "Ich kaufe mir auch ein Fahrrad is his decision. The health and money reasons support it.",
      },
      {
        id: "l5341_e5",
        type: "transcribe",
        prompt: "Render the thought in German: 'He drives with the bicycle into the city.'",
        idea: "He drives with the bicycle into the city.",
        cues: [
          "Start with Er fährt — the verb stays in second position.",
          "mit dem Fahrrad is the means of transport.",
          "The destination uses in + accusative: in die Stadt.",
        ],
        target_answer: "Er fährt mit dem Fahrrad in die Stadt",
        meaning: "He drives with the bicycle into the city.",
        word_bank: ["Er", "fährt", "mit", "dem", "Fahrrad", "in", "die", "Stadt", "Auto"],
        explanation:
          "Er fährt ... in die Stadt: the verb is second, the means is mit dem Fahrrad, and the destination is in die Stadt (motion → accusative).",
      },
    ],
    twist: {
      prompt: "Without looking back — say in German: 'With the bicycle I am almost as fast.'",
      target_answer: "Mit dem Fahrrad bin ich fast gleich schnell",
      word_bank: ["Mit", "dem", "Fahrrad", "bin", "ich", "fast", "gleich", "schnell", "Auto"],
      explanation:
        "Fronting mit dem Fahrrad pulls the verb bin into second position: Mit dem Fahrrad bin ich ... The comparison stays fast gleich schnell.",
    },
    summary: {
      outcome: "Read a comparison-driven story and answer cause, opinion, and decision questions.",
      use_example: {
        german: "Das geht schneller als mit dem Auto, und es ist gut für meine Gesundheit.",
        english: "That is faster than by car, and it is good for my health.",
      },
      takeaway:
        "Comparisons carry a story's argument: schneller als, langsamer als, gleich schnell wie. Find the hinge word and you find the claim.",
      curiosity_teaser: "Next: a birthday, a broken bus, and a very wet arrival.",
    },
  },
  {
    id: 9004,
    slug: "story-s4-die-verspaetung",
    title: "Die Verspätung",
    subtitle: "Lukas is late to a birthday — and the reason is not what Sarah thinks",
    phase: 3,
    spineStory: true,
    label: "s4",
    shift_categories: [],
    word_ids: ["entschuldigung", "stunde", "spät", "regen", "nass", "bus", "zug", "nachbar"],
    table_word_ids: [
      "geschenk",
      "entschuldigung",
      "stunde",
      "spät",
      "regen",
      "nass",
      "bus",
      "zug",
      "nachbar",
      "geburtstag",
      "freund",
      "tasche",
      "uhr",
      "stadt",
      "straße",
      "wetter",
      "blau",
    ],
    hook: {
      title: "Before You Read",
      content:
        "A small misunderstanding drives this story. Lukas is late, Sarah looks angry, and then she laughs. Read for the reason Lukas is late and for the moment the mood changes. The past tense is Perfekt again, with a few simple past forms (war, hatte).",
      footnotes: [
        {
          marker: "1",
          title: "Stift & Busfahrer",
          content:
            "der Stift = pen; der Busfahrer = bus driver. Both are glossed here because the story needs them and they are not in the lesson's word bank.",
        },
        {
          marker: "2",
          title: "Es tut mir leid",
          content:
            "Es tut mir leid = I am sorry (literally: it does me sorrow). A fixed apology chunk; no need to build it from parts yet.",
        },
        {
          marker: "3",
          title: "Spaß",
          content:
            "der Spaß = fun/joke. Ich habe nur Spaß gemacht = I was only joking. It tells you Sarah's anger was not real.",
        },
        {
          marker: "4",
          title: "warten & sich entscheiden",
          content:
            "warten = to wait; sich entscheiden = to decide. Lukas wartet auf der Straße und entscheidet sich zu laufen.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Lukas will zu seiner Freundin Sarah fahren. Sarah ist seine Nachbarin, und sie hat heute Geburtstag. In seiner Tasche ist ein Geschenk: ein schöner, blauer Stift.\n\nLukas sitzt im Bus und schaut auf die Uhr. Es ist schon spät. Plötzlich bleibt der Bus stehen. Der Busfahrer sagt: „Der Bus ist kaputt. Alle müssen aussteigen.“\n\nLukas steigt aus und wartet auf der Straße. Eine Frau sagt: „Ich weiß nicht, ob heute noch ein Bus kommt.“ Lukas entscheidet sich zu laufen. Es regnet stark, und er wird ganz nass.\n\nEndlich kommt er an. Sarah öffnet die Tür. „Warum bist du so spät?“, fragt sie. „Entschuldigung! Der Bus war kaputt“, sagt Lukas. Sarah lacht. „Das ist kein Problem. Ich habe nur Spaß gemacht. Du bist ganz nass!“\n\nAm Abend sind sie zusammen, und Lukas ist froh.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5342_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        matching_pairs: [
          { id: "m1", english: "Lukas wants to go to his friend Sarah.", german: "Lukas will zu seiner Freundin Sarah fahren." },
          { id: "m2", english: "Today is her birthday.", german: "Sie hat heute Geburtstag." },
          { id: "m3", english: "Suddenly the bus stops.", german: "Plötzlich bleibt der Bus stehen." },
          { id: "m4", english: "The bus is broken.", german: "Der Bus ist kaputt." },
          { id: "m5", english: "Lukas decides to walk.", german: "Lukas entscheidet sich zu laufen." },
          { id: "m6", english: "Sarah laughs and says it is no problem.", german: "Sarah lacht und sagt, dass es kein Problem ist." },
        ],
        target_answer:
          "Lukas will zu seiner Freundin Sarah fahren., Sie hat heute Geburtstag., Plötzlich bleibt der Bus stehen., Der Bus ist kaputt., Lukas entscheidet sich zu laufen., Sarah lacht und sagt, dass es kein Problem ist.",
        meaning: "the story beats: the birthday, the broken bus, the walk, the joke",
        explanation:
          "The six beats set up a problem (late), a cause (broken bus), and a twist (Sarah was joking).",
      },
      {
        id: "l5342_e2",
        type: "shift_select",
        prompt: "Why is Lukas on the bus?",
        options: [
          "He is going to Sarah's birthday.",
          "He is going to work.",
          "He is going home.",
          "He is going to the bakery.",
        ],
        target_answer: "He is going to Sarah's birthday.",
        meaning: "Lukas is on his way to Sarah's birthday.",
        explanation:
          "The first two sentences name the destination and the occasion: zu seiner Freundin Sarah ... Sie hat heute Geburtstag.",
      },
      {
        id: "l5342_e3",
        type: "shift_select",
        prompt: "What is the problem with the bus?",
        options: ["It is broken.", "It is late.", "It is full.", "It is going the wrong way."],
        target_answer: "It is broken.",
        meaning: "The bus breaks down, so everyone has to get off.",
        explanation:
          "The driver says Der Bus ist kaputt. The delay is a result of the breakdown, not a separate problem.",
      },
      {
        id: "l5342_e4",
        type: "shift_select",
        prompt: "Why is Lukas wet?",
        options: [
          "It is raining and he walks.",
          "He fell into a river.",
          "He washed his face.",
          "Sarah threw water on him.",
        ],
        target_answer: "It is raining and he walks.",
        meaning: "Lukas walks through the rain, so he arrives wet.",
        explanation:
          "Es regnet stark, und er wird ganz nass comes directly after his decision to walk. Cause and result sit in one sentence.",
      },
      {
        id: "l5342_e5",
        type: "literal_gloss",
        prompt: "Which English follows the German words most closely?",
        german: "Er kommt zu spät.",
        natural: "He arrives too late.",
        options: [
          "He comes too late",
          "He arrives too late",
          "He comes too early",
          "He comes too fast",
        ],
        target_answer: "He comes too late",
        meaning: "He arrives too late.",
        explanation:
          "German kommen covers both 'come' and 'arrive'. zu spät is 'too late'. The literal English 'comes too late' is the bridge to the natural 'arrives too late'.",
      },
    ],
    twist: {
      prompt: "Without looking back — say in German: 'The man arrived too late.'",
      target_answer: "Der Mann ist zu spät gekommen",
      word_bank: ["Der", "Mann", "ist", "zu", "spät", "gekommen", "Bus"],
      explanation:
        "Motion verbs like kommen take sein in the Perfekt: Der Mann ist ... gekommen. zu spät stays as the fixed time phrase.",
    },
    summary: {
      outcome: "Read a Perfekt story with a misunderstanding and answer cause and inference questions.",
      use_example: {
        german: "Der Bus war kaputt, und Lukas ist zu spät gekommen.",
        english: "The bus was broken, and Lukas arrived too late.",
      },
      takeaway:
        "A story's mood can turn on one sentence. Sarah's laughter changes 'angry girlfriend' into 'joke' — read for that turn.",
      curiosity_teaser: "Next: a library, a fallen book, and a letter about a treasure.",
    },
  },
  {
    id: 5351,
    slug: "story-das-geheimnis-der-bibliothek",
    title: "Das Geheimnis der Bibliothek",
    subtitle: "A book falls in a library-bar, and a letter hides a treasure",
    phase: 3,
    shift_categories: [],
    word_ids: ["brief", "buch", "alt", "finden", "suchen", "nacht", "licht"],
    table_word_ids: [
      "brief",
      "buch",
      "alt",
      "boden",
      "finden",
      "suchen",
      "nacht",
      "licht",
      "geschenk",
      "mann",
      "frau",
      "freund",
      "gruppe",
      "geburtstag",
      "tisch",
      "stuhl",
      "haus",
      "zimmer",
      "geld",
      "wort",
      "zeit",
    ],
    hook: {
      title: "Before You Read",
      content:
        "This is a capstone reading: a mystery scene with a hook and an open ending. Read for four things — the place, the noise, the object, and what the letter says. The grammar is familiar: Perfekt, dative, and a subclause or two. The new words are glossed so the mystery stays in front of you.",
      footnotes: [
        {
          marker: "1",
          title: "Geräusch & Boden",
          content:
            "das Geräusch = noise; der Boden = floor. Ein Buch ist auf den Boden gefallen = a book has fallen to the floor.",
        },
        {
          marker: "2",
          title: "Schatz & Geheimnis",
          content:
            "der Schatz = treasure; das Geheimnis = secret. The story is built on the second, and the letter promises the first.",
        },
        {
          marker: "3",
          title: "aufheben",
          content:
            "aufheben = to pick up. Sie hebt es auf = she picks it up. The separable prefix auf flies to the end.",
        },
        {
          marker: "4",
          title: "Trotzdem",
          content:
            "trotzdem = nevertheless / all the same. It signals the story's feeling: they do not find the treasure, but they are happy.",
        },
        {
          marker: "5",
          title: "Bar, Geschichte, Abenteuer",
          content:
            "die Bar = bar; die Geschichte = story; das Abenteuer = adventure. The house is a library with a bar, and the letter tells a story.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Paul arbeitet in einem besonderen Haus. In diesem Haus gibt es viele Bücher, aber auch eine Bar. Die Leute kommen, lesen und trinken.\n\nHeute hilft ihm seine Freundin Paula. Eine Gruppe feiert Geburtstag. Es wird ein langer Abend.\n\nPlötzlich hören Paul und Paula ein lautes Geräusch: BUMM! Ein Buch ist auf den Boden gefallen. Paula geht nach hinten. Dort steht ein altes Buch. Sie hebt es auf und findet einen kleinen Brief.\n\nPaul und Paula lesen den Brief zusammen. Der Brief erzählt eine alte Geschichte: In dem Haus gibt es einen Schatz!\n\nSie suchen den ganzen Abend, aber sie finden den Schatz nicht. Sie müssen ein anderes Mal weitersuchen. Trotzdem sind sie glücklich. Ein Haus voller Bücher ist immer ein Abenteuer.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5351_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        matching_pairs: [
          { id: "m1", english: "Paul works in a special house.", german: "Paul arbeitet in einem besonderen Haus." },
          { id: "m2", english: "In this house there are many books and a bar.", german: "In diesem Haus gibt es viele Bücher und eine Bar." },
          { id: "m3", english: "Suddenly they hear a loud noise.", german: "Plötzlich hören sie ein lautes Geräusch." },
          { id: "m4", english: "A book has fallen to the floor.", german: "Ein Buch ist auf den Boden gefallen." },
          { id: "m5", english: "Paula finds a small letter.", german: "Paula findet einen kleinen Brief." },
          { id: "m6", english: "They search all evening but do not find the treasure.", german: "Sie suchen den ganzen Abend, aber sie finden den Schatz nicht." },
        ],
        target_answer:
          "Paul arbeitet in einem besonderen Haus., In diesem Haus gibt es viele Bücher und eine Bar., Plötzlich hören sie ein lautes Geräusch., Ein Buch ist auf den Boden gefallen., Paula findet einen kleinen Brief., Sie suchen den ganzen Abend, aber sie finden den Schatz nicht.",
        meaning: "the mystery beats: the place, the noise, the fallen book, the letter, the search",
        explanation:
          "Every beat adds one piece of the mystery. The ending deliberately leaves the search unfinished.",
      },
      {
        id: "l5351_e2",
        type: "shift_select",
        prompt: "What kind of place is Paul's workplace?",
        options: ["A library with a bar", "A normal bar", "A school", "A hotel"],
        target_answer: "A library with a bar",
        meaning: "Paul works in a book-filled house that also has a bar.",
        explanation:
          "The text never says Bibliothek, but it describes one: viele Bücher, eine Bar, die Leute kommen, lesen und trinken.",
      },
      {
        id: "l5351_e3",
        type: "shift_select",
        prompt: "What causes the loud noise?",
        options: [
          "A book falls to the floor.",
          "A guest shouts.",
          "The music stops.",
          "A glass breaks.",
        ],
        target_answer: "A book falls to the floor.",
        meaning: "The noise is a book falling to the floor.",
        explanation:
          "The colon after Geräusch explains it: Ein Buch ist auf den Boden gefallen. The mystery starts with a small accident.",
      },
      {
        id: "l5351_e4",
        type: "shift_select",
        prompt: "What does the letter talk about?",
        options: ["A hidden treasure", "A birthday party", "A lost dog", "A train journey"],
        target_answer: "A hidden treasure",
        meaning: "The letter tells an old story about a treasure in the house.",
        explanation:
          "Der Brief erzählt eine alte Geschichte: In dem Haus gibt es einen Schatz! The treasure is the letter's promise, not something they find that night.",
      },
      {
        id: "l5351_e5",
        type: "transcribe",
        prompt: "Render the thought in German: 'They find an old book with a letter.'",
        idea: "They find an old book with a letter.",
        cues: [
          "Start with Sie finden — present tense is enough.",
          "ein altes Buch: the adjective takes -es after ein (neuter).",
          "mit einem Brief is the dative accompaniment.",
        ],
        target_answer: "Sie finden ein altes Buch mit einem Brief",
        meaning: "They find an old book with a letter.",
        word_bank: ["Sie", "finden", "ein", "altes", "Buch", "mit", "einem", "Brief", "Tisch"],
        explanation:
          "ein altes Buch (neuter nominative/accusative after ein) and mit einem Brief (dative) show two case jobs in one short sentence.",
      },
    ],
    twist: {
      prompt: "Without looking back — say in German: 'They do not find the book.'",
      target_answer: "Sie finden das Buch nicht",
      word_bank: ["Sie", "finden", "das", "Buch", "nicht", "Brief"],
      explanation:
        "nicht comes after the accusative object: Sie finden das Buch nicht. The letter (Brief) is in the story, but this sentence is about the book.",
    },
    summary: {
      outcome: "Read a mystery passage, identify its turning points, and distinguish what happens from what is promised.",
      use_example: {
        german: "Sie finden den Schatz nicht, aber sie sind trotzdem glücklich.",
        english: "They do not find the treasure, but they are happy all the same.",
      },
      takeaway:
        "A mystery can end without a solution. The story's job is to make the search interesting, not to hand you the treasure.",
      curiosity_teaser: "Next: a Monday morning, a thermometer, and a plan that fails.",
    },
  },
  {
    id: 9005,
    slug: "story-s5-max-und-der-kranke-montag",
    title: "Max und der kranke Montag",
    subtitle: "Max pretends to be sick — his mother's thermometer has other ideas",
    phase: 3,
    spineStory: true,
    label: "s5",
    shift_categories: [],
    word_ids: ["fieber", "bauch", "krank", "mutter", "kind", "montag", "morgen", "bett"],
    table_word_ids: [
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
      "schule",
    ],
    hook: {
      title: "Before You Read",
      content:
        "A short, funny capstone story: Max wants a day off, so he invents an illness. Read for the plan, the evidence, and the moment the plan fails. One sentence uses the would-form (wärst / würdest); it is glossed, so you can enjoy the joke without stopping to build it.",
      footnotes: [
        {
          marker: "1",
          title: "blass, Thermometer, Temperatur",
          content:
            "blass = pale; das Thermometer = thermometer; die Temperatur = temperature. These are the story's evidence words.",
        },
        {
          marker: "2",
          title: "Erkältung & Bauch",
          content:
            "die Erkältung = a cold (illness); der Bauch = belly. Mein Bauch tut weh = my belly hurts.",
        },
        {
          marker: "3",
          title: "wärst / würdest",
          content:
            "Wenn du wirklich krank wärst, würdest du nicht so schnell sprechen = If you were really sick, you would not speak so quickly. This is the would-world (Konjunktiv II); recognise the shape, do not produce it yet.",
        },
        {
          marker: "4",
          title: "seufzen & scheitern",
          content:
            "seufzen = to sigh; scheitern = to fail. Max seufzt. Sein Plan ist gescheitert = Max sighs. His plan has failed.",
        },
        {
          marker: "5",
          title: "Plan & Zimmer",
          content:
            "der Plan = plan; das Zimmer = room. Max's plan, and the room his mother enters.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Es ist Montagmorgen. Max will nicht zur Schule gehen. Er liegt im Bett und hat eine Idee: Er sagt, er ist krank.\n\n„Mama, mir geht es nicht gut!“, ruft er. Seine Mutter kommt ins Zimmer. „Du siehst blass aus. Hast du Fieber?“\n\nMax sagt: „Ja, ich habe Fieber. Und mein Bauch tut weh.“ Seine Mutter holt das Thermometer. Max wartet und lächelt. Er denkt: „Mein Plan funktioniert.“\n\nDie Mutter kommt zurück und schaut auf das Thermometer. „Max, du hast kein Fieber. Deine Temperatur ist normal.“ Max ist überrascht. „Vielleicht ist es nur eine kleine Erkältung“, sagt er. Die Mutter schüttelt den Kopf. „Wenn du wirklich krank wärst, würdest du nicht so schnell sprechen. Du gehst heute zur Schule.“\n\nMax seufzt. Sein Plan ist gescheitert. Aber er denkt schon über einen neuen Plan nach.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5352_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        vocab_hints: [{ word: "Schule", translation: "school" }],
        matching_pairs: [
          { id: "m1", english: "Max does not want to go to school.", german: "Max will nicht zur Schule gehen." },
          { id: "m2", english: "He says that he is sick.", german: "Er sagt, dass er krank ist." },
          { id: "m3", english: "His mother gets the thermometer.", german: "Seine Mutter holt das Thermometer." },
          { id: "m4", english: "Max does not have a fever.", german: "Max hat kein Fieber." },
          { id: "m5", english: "His mother sends him to school.", german: "Die Mutter schickt ihn zur Schule." },
          { id: "m6", english: "His plan has failed.", german: "Sein Plan ist gescheitert." },
        ],
        target_answer:
          "Max will nicht zur Schule gehen., Er sagt, dass er krank ist., Seine Mutter holt das Thermometer., Max hat kein Fieber., Die Mutter schickt ihn zur Schule., Sein Plan ist gescheitert.",
        meaning: "the story beats: the plan, the evidence, the failure",
        explanation:
          "The six beats are a small courtroom scene: claim, evidence, verdict, consequence.",
      },
      {
        id: "l5352_e2",
        type: "shift_select",
        prompt: "Why does Max stay in bed?",
        options: [
          "He wants a free day.",
          "He is really sick.",
          "He is tired from school.",
          "He has a doctor's appointment.",
        ],
        target_answer: "He wants a free day.",
        meaning: "Max wants a day off, so he pretends to be sick.",
        explanation:
          "The first paragraph says Max will nicht zur Schule gehen and then he says he is krank. The illness is the plan, not the cause.",
      },
      {
        id: "l5352_e3",
        type: "shift_select",
        prompt: "How does the mother find out the truth?",
        options: [
          "The thermometer shows no fever.",
          "Max tells her.",
          "The doctor calls.",
          "She sees Max play football.",
        ],
        target_answer: "The thermometer shows no fever.",
        meaning: "The thermometer shows a normal temperature, so the mother knows Max is pretending.",
        explanation:
          "The evidence is the thermometer: Du hast kein Fieber. Deine Temperatur ist normal. Max's speed of speech is the second clue.",
      },
      {
        id: "l5352_e4",
        type: "shift_select",
        prompt: "What does the mother mean by 'Du bist nicht krank'?",
        options: [
          "She knows he is pretending.",
          "She thinks he is very sick.",
          "She wants him to stay home.",
          "She is a doctor.",
        ],
        target_answer: "She knows he is pretending.",
        meaning: "The mother sees through the act and sends him to school.",
        explanation:
          "She has the thermometer evidence and says he speaks too quickly for a sick person. Her conclusion is that he is not ill.",
      },
      {
        id: "l5352_e5",
        type: "literal_gloss",
        prompt: "Which English follows the German words most closely?",
        german: "Er hat gesagt, dass er krank ist.",
        natural: "He said that he is sick.",
        options: [
          "He has said that he sick is",
          "He said that he is sick",
          "He says that he was sick",
          "He said that he is healthy",
        ],
        target_answer: "He has said that he sick is",
        meaning: "He said that he is sick.",
        explanation:
          "The dass-clause sends the verb to the end: ... dass er krank ist = literally 'that he sick is'. English keeps 'that he is sick'; German keeps 'is' last.",
      },
    ],
    twist: {
      prompt: "Without looking back — give the mother's verdict in German: 'He is not sick.'",
      target_answer: "Er ist nicht krank",
      word_bank: ["Er", "ist", "nicht", "krank", "Fieber"],
      explanation:
        "nicht comes after the verb: Er ist nicht krank. The mother's evidence is the missing fever; the verdict is this short sentence.",
    },
    summary: {
      outcome: "Read a humorous Perfekt story, follow a claim-evidence-verdict structure, and read a dass-clause.",
      use_example: {
        german: "Er hat gesagt, dass er krank ist, aber seine Mutter hat kein Fieber gefunden.",
        english: "He said that he is sick, but his mother found no fever.",
      },
      takeaway:
        "A story can be a small argument: claim, evidence, verdict. The dass-clause puts the verdict's verb at the end, where the evidence lands.",
      curiosity_teaser: "You have finished the required reading spine. Re-read any story for the pleasure of recognising the machinery.",
    },
  },
  {
    id: 5361,
    slug: "story-der-rote-schal",
    title: "Der rote Schal",
    subtitle: "A red scarf disappears at the market — and a stranger brings it back",
    phase: 2,
    shift_categories: [],
    word_ids: [
      "schal",
      "rot",
      "markt",
      "junge",
      "finden",
      "suchen",
      "tasche",
      // Review weave for the Gefühle/Adjektive branches (5311/5312).
      "liebe",
      "nett",
      "wütend",
      "stolz",
      "freude",
      "richtig",
      "falsch",
      "sauber",
      "leer",
      "offen",
    ],
    table_word_ids: [
      "schal",
      "rot",
      "markt",
      "junge",
      "finden",
      "suchen",
      "danke",
      "tasche",
      "frau",
      "mann",
      "apfel",
      "tisch",
      "unter",
      "neben",
      "froh",
      "hund",
      "liebe",
      "nett",
      "wütend",
      "stolz",
      "freude",
      "richtig",
      "falsch",
      "sauber",
      "leer",
      "offen",
    ],
    hook: {
      title: "Before You Read",
      content:
        "A small everyday mystery: Mia is at the market, and her red scarf disappears. Follow three things — what she buys, where the scarf goes, and who finds it. The story stays in the present tense.",
      footnotes: [
        {
          marker: "1",
          title: "tragen",
          content:
            "tragen = to wear or carry. Sie trägt einen roten Schal = she is wearing a red scarf. The accusative object is einen roten Schal.",
        },
        {
          marker: "2",
          title: "weg",
          content:
            "weg = gone / away. Plötzlich ist der Schal weg = suddenly the scarf is gone. It is a picture-word, not a verb.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Mia ist auf dem Markt. Sie trägt einen roten Schal. Der Schal ist warm und weich.\n\nMia sieht einen Apfel und kauft ihn. Sie legt den Apfel in ihre Tasche. Dann sucht sie ihren Schal. Der Schal ist weg!\n\nMia sucht unter dem Tisch und neben der Tasche. Sie fragt eine Frau: „Haben Sie meinen Schal gesehen?“ Die Frau schüttelt den Kopf.\n\nDa kommt ein Junge. Er hat einen roten Schal in der Hand. „Ist das dein Schal?“, fragt er. „Ja! Danke!“, sagt Mia. Sie ist froh und lächelt.\n\nMia ist zuerst wütend, aber der Junge ist sehr nett. Jetzt ist sie stolz und voller Freude. Der Schal ist rot und sauber, ihre Tasche ist leer, und die Tür des Ladens ist offen. „Das ist richtig, nicht falsch“, sagt sie.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5361_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        matching_pairs: [
          { id: "m1", english: "Mia is at the market.", german: "Mia ist auf dem Markt." },
          { id: "m2", english: "She is wearing a red scarf.", german: "Sie trägt einen roten Schal." },
          { id: "m3", english: "Suddenly the scarf is gone.", german: "Plötzlich ist der Schal weg." },
          { id: "m4", english: "A boy has a red scarf in his hand.", german: "Ein Junge hat einen roten Schal in der Hand." },
          { id: "m5", english: "Is that your scarf?", german: "Ist das dein Schal?" },
          { id: "m6", english: "Mia is glad and smiles.", german: "Mia ist froh und lächelt." },
        ],
        target_answer:
          "Mia ist auf dem Markt., Sie trägt einen roten Schal., Plötzlich ist der Schal weg., Ein Junge hat einen roten Schal in der Hand., Ist das dein Schal?, Mia ist froh und lächelt.",
        meaning: "the story beats: the market, the red scarf, the search, the boy, the thank-you",
        explanation:
          "Six sentences carry the whole scene. The scarf is the object everyone is looking for.",
      },
      {
        id: "l5361_e2",
        type: "shift_select",
        prompt: "Where is Mia?",
        options: ["At the market", "At the station", "In the park", "At school"],
        target_answer: "At the market",
        meaning: "Mia is at the market.",
        explanation: "The first sentence says Mia ist auf dem Markt.",
      },
      {
        id: "l5361_e3",
        type: "shift_select",
        prompt: "What does Mia lose?",
        options: ["Her red scarf", "Her bag", "Her apple", "Her money"],
        target_answer: "Her red scarf",
        meaning: "Mia loses her red scarf.",
        explanation:
          "She buys an apple and puts it in her bag, but then Der Schal ist weg — the scarf is gone.",
      },
      {
        id: "l5361_e4",
        type: "shift_select",
        prompt: "Who finds the scarf?",
        options: ["A boy", "A dog", "An old man", "A woman"],
        target_answer: "A boy",
        meaning: "A boy finds the scarf and returns it.",
        explanation:
          "Da kommt ein Junge. Er hat einen roten Schal in der Hand. The woman she asks only shakes her head.",
      },
      {
        id: "l5361_e5",
        type: "literal_gloss",
        prompt: "Which English follows the German words most closely?",
        german: "Der Junge findet den Schal unter einem Tisch.",
        natural: "The boy finds the scarf under a table.",
        options: [
          "The boy finds the scarf under a table",
          "The scarf finds the boy under a table",
          "The boy loses the scarf under a table",
          "The boy finds the table under a scarf",
        ],
        target_answer: "The boy finds the scarf under a table",
        meaning: "The boy finds the scarf under a table.",
        explanation:
          "finden takes an accusative object (den Schal), and unter einem Tisch is the dative place where it was hiding.",
      },
    ],
    twist: {
      prompt: "Without looking back — say in German: 'The woman is at the market.'",
      target_answer: "Die Frau ist auf dem Markt",
      word_bank: ["Die", "Frau", "ist", "auf", "dem", "Markt", "Mann"],
      explanation:
        "auf dem Markt is the dative location. The man is a distractor; the story follows Mia and a boy.",
    },
    summary: {
      outcome: "Read a short present-tense mystery and answer where, what, and who questions.",
      use_example: {
        german: "Mia sucht ihren Schal. Ein Junge findet ihn unter einem Tisch.",
        english: "Mia looks for her scarf. A boy finds it under a table.",
      },
      takeaway:
        "A lost-object story is built from place words: auf dem Markt, in der Tasche, unter dem Tisch. Follow the places and the object reappears.",
      curiosity_teaser: "Next optional reading: a family trip to a lake and a change in the weather.",
    },
  },
  {
    id: 5362,
    slug: "story-der-ausflug-zum-see",
    title: "Der Ausflug zum See",
    subtitle: "A family trip to a lake: sun, swimming, rain, and a tree",
    phase: 3,
    shift_categories: [],
    word_ids: [
      "ausflug",
      "wetter",
      "sonne",
      "regen",
      "baum",
      "familie",
      "kind",
      // Review weave for the Gefühle/Adjektive branches (5311/5312).
      "liebe",
      "nett",
      "wütend",
      "stolz",
      "freude",
      "richtig",
      "falsch",
      "sauber",
      "leer",
      "offen",
    ],
    table_word_ids: [
      "ausflug",
      "see",
      "wetter",
      "sonne",
      "regen",
      "baum",
      "familie",
      "kind",
      "wasser",
      "fluss",
      "berg",
      "auto",
      "schwimmen",
      "wochenende",
      "schön",
      "müde",
      "liebe",
      "nett",
      "wütend",
      "stolz",
      "freude",
      "richtig",
      "falsch",
      "sauber",
      "leer",
      "offen",
    ],
    hook: {
      title: "Before You Read",
      content:
        "A Perfekt family story with a simple shape: a good morning, a rainy afternoon, a warm ending. Watch the comparisons — größer als, schöner — and the weather words. The story is about a trip to a lake, not the sea.",
      footnotes: [
        {
          marker: "1",
          title: "der See / die See",
          content:
            "der See = lake; die See = sea. The article changes the meaning, so the story uses der See and the neuter pronoun pattern around it.",
        },
        {
          marker: "2",
          title: "schwimmen",
          content:
            "schwimmen = to swim. Die Kinder sind im Wasser geschwommen = the children swam in the water. The participle is geschwommen.",
        },
      ],
    },
    pattern: {
      title: "Die Geschichte",
      content:
        "Am Wochenende hat Familie Braun einen Ausflug zum See gemacht. Sie sind mit dem Auto gefahren. Der See ist größer als der Fluss in der Stadt.\n\nDas Wetter war schön, und die Sonne schien. Die Kinder sind im Wasser geschwommen. Sie haben viel gelacht.\n\nAm Nachmittag hat es geregnet. Die Familie hat unter einem Baum gewartet. Der Regen war stärker als am Morgen.\n\nDann sind sie nach Hause gefahren. Der Ausflug war nicht perfekt, aber schön. Die Kinder waren müde und glücklich.\n\nDie Kinder waren stolz und voller Freude. Das Wetter war richtig gut, nicht falsch. Die Decke war sauber, der Korb war leer, und die Tür des Autos war offen. Die Eltern waren nett, die Kinder waren nicht wütend.",
      footnotes: [],
    },
    exercises: [
      {
        id: "l5362_e1",
        type: "matching_pairs",
        prompt: "Reading check — match each story sentence with its English meaning:",
        matching_pairs: [
          { id: "m1", english: "The Braun family took a trip to the lake.", german: "Familie Braun hat einen Ausflug zum See gemacht." },
          { id: "m2", english: "They drove by car.", german: "Sie sind mit dem Auto gefahren." },
          { id: "m3", english: "The lake is bigger than the river.", german: "Der See ist größer als der Fluss." },
          { id: "m4", english: "The children swam in the water.", german: "Die Kinder sind im Wasser geschwommen." },
          { id: "m5", english: "In the afternoon it rained.", german: "Am Nachmittag hat es geregnet." },
          { id: "m6", english: "The family waited under a tree.", german: "Die Familie hat unter einem Baum gewartet." },
        ],
        target_answer:
          "Familie Braun hat einen Ausflug zum See gemacht., Sie sind mit dem Auto gefahren., Der See ist größer als der Fluss., Die Kinder sind im Wasser geschwommen., Am Nachmittag hat es geregnet., Die Familie hat unter einem Baum gewartet.",
        meaning: "the trip's sequence: lake, car, swimming, rain, tree, home",
        explanation:
          "The six beats are a weather arc: a sunny morning, a swim, a rainy afternoon, shelter, and a warm ending.",
      },
      {
        id: "l5362_e2",
        type: "shift_select",
        prompt: "Where did the family go?",
        options: ["To a lake", "To a mountain", "To the city", "To a museum"],
        target_answer: "To a lake",
        meaning: "The family went to a lake.",
        explanation:
          "Der Ausflug zum See — zum See means to the lake (der See). The mountain (der Berg) is in the word bank only as a contrast.",
      },
      {
        id: "l5362_e3",
        type: "shift_select",
        prompt: "What did the children do in the water?",
        options: [
          "They swam",
          "They climbed a tree",
          "They read books",
          "They cooked dinner",
        ],
        target_answer: "They swam",
        meaning: "The children swam in the water.",
        explanation:
          "Die Kinder sind im Wasser geschwommen. schwimmen is the verb; geschwommen is its participle.",
      },
      {
        id: "l5362_e4",
        type: "shift_select",
        prompt: "Why did the family wait under a tree?",
        options: ["It rained", "It was too hot", "They were hungry", "They lost the car"],
        target_answer: "It rained",
        meaning: "They waited under the tree because it started to rain.",
        explanation:
          "Am Nachmittag hat es geregnet. Die Familie hat unter einem Baum gewartet. The rain causes the waiting.",
      },
      {
        id: "l5362_e5",
        type: "literal_gloss",
        prompt: "Which English follows the German words most closely?",
        german: "Der See ist größer als der Fluss.",
        natural: "The lake is bigger than the river.",
        options: [
          "The lake is bigger than the river",
          "The river is bigger than the lake",
          "The lake is as big as the river",
          "The lake is smaller than the river",
        ],
        target_answer: "The lake is bigger than the river",
        meaning: "The lake is bigger than the river.",
        explanation:
          "größer is the comparative of groß; als marks the second item. The river is the smaller one here.",
      },
    ],
    twist: {
      prompt: "Without looking back — say in German: 'The lake is bigger than the river.'",
      target_answer: "Der See ist größer als der Fluss",
      word_bank: ["Der", "See", "ist", "größer", "als", "der", "Fluss", "Berg"],
      explanation:
        "Comparative + als: Der See ist größer als der Fluss. The mountain (Berg) is a distractor; the comparison is lake versus river.",
    },
    summary: {
      outcome: "Read a Perfekt family-trip story with comparatives and weather words, then answer why and what questions.",
      use_example: {
        german: "Der See ist größer als der Fluss, und am Nachmittag hat es geregnet.",
        english: "The lake is bigger than the river, and in the afternoon it rained.",
      },
      takeaway:
        "Weather and comparisons give a trip story its shape: a sunny morning, a rainy afternoon, and a warm conclusion.",
      curiosity_teaser: "You have finished the optional reading library. Re-read any passage for the pleasure of recognising the machinery.",
    },
  },
];
