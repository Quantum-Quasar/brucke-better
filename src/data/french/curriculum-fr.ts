import type { LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";

// ---------------------------------------------------------------------------
// Le Pont — the French trail. 30 topics on one spine, plus cluster sprigs
// and 15 support branches. Every core, sprig, and branch lesson is authored.
// ---------------------------------------------------------------------------

export const FR_TOTAL_TOPICS = 30;

export const frSprigId = (topicId: number, index: number) => topicId * 100 + index;

const shell = (id: number, title: string, plan: string): LessonShell => ({ id, title, plan, authored: true });

const authoredCore = (id: number, title: string): LessonShell => ({
  id,
  title,
  plan: "Authored — full content lives in data/french/lessons-fr.ts.",
  authored: true,
});

export const FR_TOPICS: TopicCluster[] = [
  {
    id: 1,
    title: "The French Inside Your English",
    blurb: "The register ladder (ask→enquire), le gâteau, je veux — and le/la as the word for it.",
    core: authoredCore(1, "The French Inside Your English"),
    sprigs: [
      shell(frSprigId(1, 1), "Hidden Twins: Places & Colors", "Direct cognates gym: la maison, l'hôtel, le cœur, bleu, rouge — recognition drills with gender colors."),
      shell(frSprigId(1, 2), "First Sentences Gym", "Je veux le… pattern drills: assemble 6 simple sentences from the first conversions."),
      shell(frSprigId(1, 3), "The Register Ladder", "want→desire, ask→demand, go in→enter: climb to the formal English word and the French verb is waiting."),
    ],
  },
  {
    id: 2,
    title: "The -ION Bridge",
    blurb: "Thousands of nouns convert whole: invitation, tradition — and every one is feminine.",
    core: authoredCore(2, "The -ION Bridge"),
    sprigs: [
      shell(frSprigId(2, 1), "L'Elision Gym", "la → l' before vowels: l'opinion, l'organisation — the apostrophe marks a vowel sacrificed."),
      shell(frSprigId(2, 2), "-ION Discrimination Drills", "Mixed conversion drills: convert 8 -ION nouns and place la or l' before each."),
    ],
  },
  {
    id: 3,
    title: "The -ation Engine",
    blurb: "Noun → verb: confirmation → confirmer. Thousands of infinitives, almost free.",
    core: authoredCore(3, "The -ation Engine"),
    sprigs: [
      shell(frSprigId(3, 1), "The Célébrer Trap", "Not *célébrater: the whole -ation goes before -er arrives. Discrimination drills."),
      shell(frSprigId(3, 2), "Je veux + Infinitive Gym", "je veux visiter, je veux organiser — build 8 sentences with newly converted verbs."),
      shell(frSprigId(3, 3), "The -ir & -re Verb Bridges", "finir (English finish), choisir (choose), vendre (vendor), répondre (respond) — French's other two verb classes."),
    ],
  },
  {
    id: 4,
    title: "Ne...Pas: The Sandwich",
    blurb: "Negation wraps the verb: je ne veux pas. Pas is literally a footstep.",
    core: authoredCore(4, "Ne...Pas: The Sandwich"),
    sprigs: [
      shell(frSprigId(4, 1), "Pas Un Pas", "The etymology gym: ne vais pas un pas — negation as refusing to take a step."),
      shell(frSprigId(4, 2), "Negation in the Wild", "Flip 10 sentences to the negative without changing anything else."),
    ],
  },
  {
    id: 5,
    title: "être & Its Secrets",
    blurb: "c'est, je suis (lit. 'I follow'), vous êtes — the being-verbs as evidence.",
    core: authoredCore(5, "être & Its Secrets"),
    sprigs: [
      shell(frSprigId(5, 1), "je suis: I Follow", "The sequence/sequel etymology; suis/es/est drills with description sentences."),
      shell(frSprigId(5, 2), "C'est Gym", "C'est bon, c'est la vie: 8 identification sentences and questions on them."),
    ],
  },
  {
    id: 6,
    title: "The -ité & -ance Bridges",
    blurb: "Two more noun conversions — and the endings that decode gender for you.",
    core: authoredCore(6, "The -ité & -ance Bridges"),
    sprigs: [
      shell(frSprigId(6, 1), "The Feminine Squad", "-ion, -ité, -ance: convert 12 nouns and read their gender straight off the ending."),
      shell(frSprigId(6, 2), "Liberté & Society Sentences", "La liberté est… — build sentences converting -ité and -ance nouns into the wild."),
      shell(frSprigId(6, 3), "The -ment & -able Twin Bridges", "Adverbs in -ment (exactement, naturellement) and adjectives in -able/-ible (possible, capable)."),
    ],
  },
  {
    id: 7,
    title: "Questions à la Française",
    blurb: "Three ladders of asking: intonation → est-ce que → inversion.",
    core: authoredCore(7, "Questions à la Française"),
    sprigs: [
      shell(frSprigId(7, 1), "Est-ce que Drills", "'Is it that': turn statements into questions without moving a single word."),
      shell(frSprigId(7, 2), "Question-Word Twins", "où ↔ ubiquitous, pourquoi ↔ wherefore, quand, comment, combien — the cognate question words."),
    ],
  },
  {
    id: 8,
    title: "The -eur Bridge",
    blurb: "doctor → docteur, color → couleur — and the rebels that break the rule.",
    core: authoredCore(8, "The -eur Bridge"),
    sprigs: [
      shell(frSprigId(8, 1), "Couleur: The Famous Rebel", "la couleur, l'erreur, la peur, la chaleur: why abstract Latin -or nouns stayed feminine in French."),
      shell(frSprigId(8, 2), "-eur Discrimination Drills", "Convert -or/-er nouns to -eur and decide le vs la using the agent vs quality rule."),
    ],
  },
  {
    id: 9,
    title: "vous & tu",
    blurb: "The T–V line: vous and tu, merci and bonjour — politeness as a system.",
    core: authoredCore(9, "vous & tu"),
    sprigs: [
      shell(frSprigId(9, 1), "Merci & Bonjour Gym", "Greetings, thanks, s'il vous plaît — the politeness set in dialogue drills."),
      shell(frSprigId(9, 2), "The vous Register", "When vous is required; vous voulez vs tu veux and the universal -ez ending."),
    ],
  },
  {
    id: 10,
    title: "avoir & the H It Lost",
    blurb: "j'ai, hôtel/hospital, homme/human — avoir is have, and French never says its H.",
    core: authoredCore(10, "avoir & the H It Lost"),
    sprigs: [
      shell(frSprigId(10, 1), "The H-Drop Doublets", "hôtel/hospital, homme/human, hiver/hibernate — French's silent H as an etymological fingerprint."),
      shell(frSprigId(10, 2), "J'ai Gym", "J'ai un gâteau, j'ai trente ans — have-sentences including age as possession."),
      shell(frSprigId(10, 3), "Liaison & Silent Consonants: CaReFuL", "Why final consonants go silent except C, R, F, L — and wake up before a vowel in liaison (vous avez, les amis)."),
    ],
  },
  {
    id: 11,
    title: "Adjectives & the Silent -s",
    blurb: "Feminine -e, plural -s written but not said: grand, grande, grands, grandes.",
    core: authoredCore(11, "Adjectives & the Silent -s"),
    sprigs: [
      shell(frSprigId(11, 1), "The e and the s", "Feminine -e wakes the sleeping final consonant (grand → grande); plural -s stays silent."),
      shell(frSprigId(11, 2), "Color & Size Gym", "Le jardin vert, la maison blanche — adjective placement after the noun."),
      shell(frSprigId(11, 3), "BAGS: Adjectives Before the Noun", "Beauty, Age, Goodness, Size (beau, jeune, bon, petit, grand, nouveau) — the high-frequency rebels that step in front."),
    ],
  },
  {
    id: 12,
    title: "The Near Future",
    blurb: "aller + infinitive: je vais visiter — and aller is amble.",
    core: authoredCore(12, "The Near Future"),
    sprigs: [
      shell(frSprigId(12, 1), "Amble & Go", "The ambulāre etymology; vais, vas, va, allons, allez in motion drills."),
      shell(frSprigId(12, 2), "Future Gym", "Near-future sentences chaining je vais / tu vas / on va with converted verbs."),
    ],
  },
  {
    id: 13,
    title: "à, de, chez",
    blurb: "The two master prepositions, their fusions (au, du), and chez.",
    core: authoredCore(13, "à, de, chez"),
    sprigs: [
      shell(frSprigId(13, 1), "au & du Fusions", "à + le = au, de + le = du, de + les = des: mandatory contractions as word-glue."),
      shell(frSprigId(13, 2), "Chez, the House Word", "chez Marie, chez le docteur, chez moi — the Latin casa preposition with no English twin."),
      shell(frSprigId(13, 3), "The Partitive: du, de la & Negative de", "Why French says 'some bread' (du pain, de la soupe) and collapses it to bare de after negation (pas de pain)."),
    ],
  },
  {
    id: 14,
    title: "Possessives Agree with the Thing",
    blurb: "mon/ma/mes, son/sa/ses — they follow the noun's gender, never the owner's.",
    core: authoredCore(14, "Possessives Agree with the Thing"),
    sprigs: [
      shell(frSprigId(14, 1), "The Trap Named", "mon frère / ma sœur, son frère ('his OR her brother'), and mon before feminine vowels (mon opinion)."),
      shell(frSprigId(14, 2), "Famille Gym", "Drills across père, mère, frère, sœur, famille with mon/ma/mes, ton/ta/tes, son/sa/ses."),
      shell(frSprigId(14, 3), "Demonstratives & Stressed Pronouns", "Pointing with ce/cet/cette/ces and standing alone after prepositions with moi, toi, lui, elle, nous, vous."),
    ],
  },
  {
    id: 15,
    title: "Numbers & the Four-Twenties",
    blurb: "1–100, j'ai trente ans — and quatre-vingts is four score, like Gettysburg.",
    core: authoredCore(15, "Numbers & the Four-Twenties"),
    sprigs: [
      shell(frSprigId(15, 1), "Counting Cognates Gym", "un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix, vingt — Latin roots in everyday counting."),
      shell(frSprigId(15, 2), "Four Score & Seven", "soixante-dix (60+10), quatre-vingts (4×20), and expressing age with avoir (j'ai trente ans)."),
    ],
  },
  {
    id: 16,
    title: "Days, Months & Dates",
    blurb: "lundi (moon-day), en janvier — and aujourd'hui is 'on the day of today'.",
    core: authoredCore(16, "Days, Months & Dates"),
    sprigs: [
      shell(frSprigId(16, 1), "The Sky Calendar", "lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche — the Roman planetary week."),
      shell(frSprigId(16, 2), "En janvier Gym", "Months with en (en janvier, en juillet), dates with le, and aujourd'hui / demain / hier."),
    ],
  },
  {
    id: 17,
    title: "The -é Past",
    blurb: "Passé composé with avoir: j'ai mangé — the -é is the English -ed.",
    core: authoredCore(17, "The -é Past"),
    sprigs: [
      shell(frSprigId(17, 1), "Participle Twins", "mangé, décidé, parlé, trouvé, donné, aimé, fini, compris, pris, vu — the -é/-i/-u participle system."),
      shell(frSprigId(17, 2), "Hier j'ai… Story Drills", "Narrate a past day in passé composé sentences with avoir."),
    ],
  },
  {
    id: 18,
    title: "Motion Takes être",
    blurb: "je suis allé(e): the motion verbs form their past with être and agree.",
    core: authoredCore(18, "Motion Takes être"),
    sprigs: [
      shell(frSprigId(18, 1), "The être House", "allé, arrivé, venu, parti, sorti, monté, descendu, resté, tombé, né — the doorway-and-motion verb house."),
      shell(frSprigId(18, 2), "Agreement Drills", "allée, allés, allées: why participles wear gender and plural agreements only inside the être house."),
    ],
  },
  {
    id: 19,
    title: "The Storytelling Past",
    blurb: "The imparfait: c'était, j'avais, j'habitais — the background tense of was + -ing.",
    core: authoredCore(19, "The Storytelling Past"),
    sprigs: [
      shell(frSprigId(19, 1), "Was & Was-Ing", "The -ais/-ait imparfait camera lens: c'était, il y avait, j'avais, je voulais."),
      shell(frSprigId(19, 2), "Imparfait vs Composé", "Background canvas (imparfait) interrupted by the event dot (passé composé)."),
    ],
  },
  {
    id: 20,
    title: "depuis & the Perfect Split",
    blurb: "J'habite ici depuis trois ans — present tense where English reaches for have lived.",
    core: authoredCore(20, "depuis & the Perfect Split"),
    sprigs: [
      shell(frSprigId(20, 1), "The Trap Lesson", "depuis + present tense: why ongoing actions stay in the present in French."),
      shell(frSprigId(20, 2), "Since & For Gym", "depuis quand ? — building duration sentences across work, study, and residence."),
    ],
  },
  {
    id: 21,
    title: "Plus, Moins, aussi",
    blurb: "Comparatives with que; bon→meilleur is good→better's twin suppletion.",
    core: authoredCore(21, "Plus, Moins, aussi"),
    sprigs: [
      shell(frSprigId(21, 1), "The Twin Suppletions", "bon → meilleur (ameliorate) and mauvais → pire (pejorative): frozen Latin comparatives."),
      shell(frSprigId(21, 2), "Comparison Gym", "plus… que, moins… que, aussi… que across cities, food, and ideas."),
    ],
  },
  {
    id: 22,
    title: "en & y",
    blurb: "j'en veux (of it), j'y vais (there) — pronouns for places and quantities.",
    core: authoredCore(22, "en & y"),
    sprigs: [
      shell(frSprigId(22, 1), "en: Of It", "en replaces de + noun and partitives: Tu veux du café ? — Oui, j'en veux."),
      shell(frSprigId(22, 2), "y: There", "y replaces à/dans/chez + place: Tu vas à Paris ? — Oui, j'y vais."),
    ],
  },
  {
    id: 23,
    title: "Pronouns Walk Left",
    blurb: "me, te, le, la, nous, vous, lui, leur before the verb — topic 1's reframe, completed.",
    core: authoredCore(23, "Pronouns Walk Left"),
    sprigs: [
      shell(frSprigId(23, 1), "The Full Left-Walk", "je te vois, tu me comprends, il nous écoute — direct object pronouns walking before the verb."),
      shell(frSprigId(23, 2), "lui & leur", "je lui parle ('I speak to him OR to her'), je leur donne — gender-neutral indirect objects."),
      shell(frSprigId(23, 3), "The Double-Pronoun Highway", "Stacking two pronouns before the verb in strict order: me le, le lui, and y/en last."),
    ],
  },
  {
    id: 24,
    title: "Reflexives & la Routine",
    blurb: "se lever, je m'appelle — the daily round with self-directed verbs.",
    core: authoredCore(24, "Reflexives & la Routine"),
    sprigs: [
      shell(frSprigId(24, 1), "I Call Myself", "je m'appelle, tu t'appelles, on se voit — reflexive pronouns in everyday interaction."),
      shell(frSprigId(24, 2), "The Morning Round", "se lever, se laver, s'habiller, se coucher — chaining daily routine verbs."),
    ],
  },
  {
    id: 25,
    title: "il y a",
    blurb: "'It has there' = there is — and with time, ago.",
    core: authoredCore(25, "il y a"),
    sprigs: [
      shell(frSprigId(25, 1), "It Has There", "il y a un café ('there is a café') vs il y a trois ans ('three years ago')."),
      shell(frSprigId(25, 2), "il y a Gym", "Negating and questioning existence: il n'y a pas de…, est-ce qu'il y a…?"),
    ],
  },
  {
    id: 26,
    title: "The Would-World",
    blurb: "je voudrais and the politeness escalator; the future tense is infinitive + avoir.",
    core: authoredCore(26, "The Would-World"),
    sprigs: [
      shell(frSprigId(26, 1), "Je voudrais", "vouloir, pouvoir, faire in the conditional (je voudrais, tu pourrais, je ferais)."),
      shell(frSprigId(26, 2), "The -ai Future", "Infinitive + avoir's present endings: je parlerai, tu visiteras, on ira."),
    ],
  },
  {
    id: 27,
    title: "il faut",
    blurb: "'It is needed' — obligation without a subject, and the subjunctive door.",
    core: authoredCore(27, "il faut"),
    sprigs: [
      shell(frSprigId(27, 1), "It Is Needed", "il faut + infinitive (il faut partir, il faut voir) and il me faut + noun."),
      shell(frSprigId(27, 2), "The Subjunctive Door", "il faut que tu sois là, je veux que tu viennes — when necessity or desire crosses between two subjects."),
      shell(frSprigId(27, 3), "Savoir vs Connaître", "Knowing facts and skills (je sais nager) vs being familiar with people and places (je connais Paris)."),
    ],
  },
  {
    id: 28,
    title: "qui & que",
    blurb: "Relative pronouns — que is the most French word in French.",
    core: authoredCore(28, "qui & que"),
    sprigs: [
      shell(frSprigId(28, 1), "The Man That Knows", "qui for the subject after the gap (l'homme qui parle), que for the object (le café que je veux)."),
      shell(frSprigId(28, 2), "Que Everywhere", "je pense que, je sais que, c'est… que — que as the master clause connector."),
      shell(frSprigId(28, 3), "Verb Dynasties: venir, tenir & prendre Matrices", "Prefix × root matrices: re-/de-/ob-/main-/com-/ap- across venir, tenir, and prendre."),
    ],
  },
  {
    id: 29,
    title: "The French Mind",
    blurb: "avoir faim, ça va, coup de foudre — idioms as thought, register recap.",
    core: authoredCore(29, "The French Mind"),
    sprigs: [
      shell(frSprigId(29, 1), "Have-Hunger & Co", "Feelings as possessions with avoir: avoir faim, soif, peur, raison, besoin de."),
      shell(frSprigId(29, 2), "The Register Ladder Recap", "Walking the 9 conversion bridges from English formal register into everyday French."),
      shell(frSprigId(29, 3), "Spoken French Shortcuts", "on = nous, dropped ne, t'as / y'a — decoding fast street French without losing the structure."),
    ],
  },
  {
    id: 30,
    title: "Capstone: Le Pont Reading",
    blurb: "One connected Paris story built from everything — conversions in plain sight.",
    core: authoredCore(30, "Capstone: Le Pont Reading"),
    sprigs: [
      shell(frSprigId(30, 1), "A Day in Paris: Reading", "The capstone narrative in Paris synthesizing all 9 conversion bridges and tense frames."),
      shell(frSprigId(30, 2), "Trap Watch: False Friends in the Wild", "High-frequency false friends (actuellement, librairie, attendre, raisin, journée, location) in context."),
      shell(frSprigId(30, 3), "The Whole-Trail Review Game", "Mixed-mode synthesis across all 30 topics of Le Pont."),
    ],
  },
];

export const FR_TRAIL_BRANCHES: TrailBranch[] = [
  {
    id: 5010,
    attach: 1,
    title: "First Words, First Spoken",
    blurb: "Bonjour, merci, je m'appelle — and the alphabet (w is double-v!).",
    lessons: [
      shell(5011, "Bonjour & Merci", "Greetings, thanks and ça va in dialogue drills; la bise culture."),
      shell(5012, "The Alphabet & Je m'appelle", "l'alphabet (w = double-v), spelling your name, je m'appelle — introductions from taught pieces."),
    ],
  },
  {
    id: 5020,
    attach: 1,
    title: "The Nasal Clinic",
    blurb: "on, en, an, in — think the N, don't say it.",
    lessons: [
      shell(5021, "Think the N", "The four nasal vowels with minimal pairs and the 'moving toward N' technique."),
    ],
  },
  {
    id: 5030,
    attach: 2,
    title: "False Friends Preview",
    blurb: "actuellement is 'currently' — a first walk through the trap deck.",
    lessons: [
      shell(5031, "Actuellement, Librairie & Co.", "Six highest-value false friends in contrastive recall drills; link-out to the Review Hub deck."),
    ],
  },
  {
    id: 5040,
    attach: 9,
    title: "The Tutoiement Line",
    blurb: "tutoyer/vouvoyer — and on, the worn-down homme.",
    lessons: [
      shell(5041, "Tutoyer & Vouvoyer", "Choosing tu vs vous as social verbs, and how on ('one/the man') became spoken French's everyday 'we'."),
    ],
  },
  {
    id: 5050,
    attach: 12,
    title: "Dans la ville",
    blurb: "ici, là, tout droit — directions in the street.",
    lessons: [
      shell(5051, "Lieu & Direction: ici, là, tout droit", "Navigating streets: tout droit, à gauche, à droite, où est la gare ?"),
    ],
  },
  {
    id: 5060,
    attach: 15,
    title: "Shopping & Euros",
    blurb: "Combien ? — prices, euros, and numbers under pressure.",
    lessons: [
      shell(5061, "C'est combien ?", "Asking prices, ordering with numbers 1–100, and l'addition at the bistro."),
    ],
  },
  {
    id: 5070,
    attach: 17,
    title: "The Past in the Wild",
    blurb: "Negation and questions inside the passé composé.",
    lessons: [
      shell(5071, "Je n'ai pas mangé", "The sandwich wraps the auxiliary (je n'ai pas compris, tu n'as pas vu) and déjà slots inside."),
    ],
  },
  {
    id: 5080,
    attach: 24,
    title: "La Routine complète",
    blurb: "Reflexive chains across a whole day.",
    lessons: [
      shell(5081, "De matin à soir", "Chaining reflexives (se lever, se laver, s'habiller, se coucher) across a full day."),
    ],
  },
  {
    id: 5090,
    attach: 30,
    title: "dont & où",
    blurb: "The remaining relative pronouns.",
    lessons: [
      shell(5091, "Dont & Où", "dont ('of which / whose') for de-verbs and où as relative 'where/when'."),
    ],
  },
  {
    id: 5100,
    attach: 26,
    title: "Le Conditionnel complet",
    blurb: "The full would-world paradigm.",
    lessons: [
      shell(5101, "Tout le conditionnel", "Building any conditional from the future stem + imparfait ending (-ais, -ait)."),
    ],
  },
  {
    id: 5110,
    attach: 10,
    title: "Liaison & Elision Ear Clinic",
    blurb: "How dormant final consonants wake up before vowels in spoken French.",
    lessons: [
      shell(5111, "Dormant Consonants Wake Up", "S→/z/ (vous avez, les amis), T→/t/ (c'est un), N→/n/ (un ami) — reading connected French speech."),
      shell(5112, "H muet vs H aspiré", "Why l'hôtel and l'homme elide and link, while le héros refuses elision."),
    ],
  },
  {
    id: 5120,
    attach: 13,
    title: "À Table: Boulangerie & Bistro",
    blurb: "Bread, cheese, wine, water, and ordering at a French table.",
    lessons: [
      shell(5121, "Le Pain, Le Fromage, Le Vin & L'Eau", "The French table staples with definite vs partitive articles (le pain vs du pain)."),
      shell(5122, "Commander au Bistro", "Taking a table, ordering with je prends / je voudrais, and asking for l'addition."),
    ],
  },
  {
    id: 5130,
    attach: 12,
    title: "Voyages, Gare & Transports",
    blurb: "Trains, tickets, stations, and departures across France.",
    lessons: [
      shell(5131, "Le Train, Le Billet & La Gare", "Navigating the SNCF: le train, le billet, la gare, réservations, and platforms."),
      shell(5132, "Départ, Arrivée & Aller-Retour", "Combining aller, partir, arriver, and prendre for real travel scenarios."),
    ],
  },
  {
    id: 5140,
    attach: 14,
    title: "Les Métiers & Les Passions",
    blurb: "Professions without articles and cultural passions.",
    lessons: [
      shell(5141, "Docteur, Professeur & Acteur", "Why French drops 'a/an' before professions after être: Je suis professeur, il est docteur."),
      shell(5142, "La Musique, Le Cinéma & Le Livre", "Talking about arts, cinema, books, and passions with aimer and préférer."),
    ],
  },
  {
    id: 5150,
    attach: 18,
    title: "Le Corps & Les Vêtements",
    blurb: "Body parts with avoir mal à and everyday clothing.",
    lessons: [
      shell(5151, "La Tête, La Main & Le Cœur", "Expressing aches with avoir mal à la tête and definite articles with body parts."),
      shell(5152, "Le Manteau & La Robe", "Clothing doublets (manteau/mantle, robe/wardrobe) and adjective placement with colors."),
    ],
  },
];

export const FR_TRAIL_GATES: TrailGate[] = [
  {
    id: 1,
    afterTopic: 7,
    requiredStars: 12,
    title: "The Decode Gate",
    why: "Topics 1–7 install the conversion engine: -ION, -ation→-er, -ité, -ance, -ment, -able, plus être, the ne...pas sandwich and questions. Every topic ahead assumes you can decode vocabulary on sight — bank 12 stars in this stretch before moving on.",
  },
  {
    id: 2,
    afterTopic: 10,
    requiredStars: 5,
    title: "The Machine Gate",
    why: "Topics 8–10 add the -eur bridge, the T–V politeness line, avoir, and liaison. The sentence machine ahead (adjectives, near future, prepositions, possessives) assumes solid verbs — earn 5 stars in this stretch.",
  },
  {
    id: 3,
    afterTopic: 14,
    requiredStars: 7,
    title: "The Sentence Gate",
    why: "Topics 11–14 assemble the sentence machine: adjective agreement and BAGS placement, the near future, prepositions and partitives, and possessives. Time travel ahead reuses them in every example — bank 7 stars here.",
  },
  {
    id: 4,
    afterTopic: 21,
    requiredStars: 9,
    title: "The Past Gate",
    why: "Topics 15–21 hand you numbers, all three pasts, depuis, and comparatives. The deep engine ahead reuses past-tense and pronoun-heavy sentences — earn 9 stars in this stretch.",
  },
  {
    id: 5,
    afterTopic: 26,
    requiredStars: 7,
    title: "The Engine Gate",
    why: "Topics 22–26 install en/y, the left-walking pronouns, reflexives, il y a, and the conditional would-world. The synthesis stretch is pure reading and recall — carry 7 stars with you.",
  },
];

// Authored status lives on the shells, so curriculum consumers never pull the
// full lesson bodies into their bundle.
const FR_AUTHORED_SHELLS = new Map<number, LessonShell>();
for (const topic of FR_TOPICS) {
  if (topic.core.authored) FR_AUTHORED_SHELLS.set(topic.core.id, topic.core);
  for (const sprig of topic.sprigs) {
    if (sprig.authored) FR_AUTHORED_SHELLS.set(sprig.id, sprig);
  }
}
for (const branch of FR_TRAIL_BRANCHES) {
  for (const lesson of branch.lessons) {
    if (lesson.authored) FR_AUTHORED_SHELLS.set(lesson.id, lesson);
  }
}

export const FR_AUTHORED_LESSON_COUNT = FR_AUTHORED_SHELLS.size;

export const getFrenchAuthoredLesson = (lessonId: number) => FR_AUTHORED_SHELLS.get(lessonId);
