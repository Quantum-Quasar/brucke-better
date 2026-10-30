import type { LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
import type { CurriculumData } from "../curriculum-core";

// ---------------------------------------------------------------------------
// El Puente — the Spanish trail. 30 topics on one spine, plus cluster sprigs
// and 15 support branches. Every core, sprig, and branch lesson is authored.
// ---------------------------------------------------------------------------

export const ES_TOTAL_TOPICS = 30;

export const esSprigId = (topicId: number, index: number) => topicId * 100 + index;

const shell = (id: number, title: string, plan: string): LessonShell => ({ id, title, plan, authored: true });

const authoredCore = (id: number, title: string): LessonShell => ({
  id,
  title,
  plan: "Authored — full content lives in data/spanish/lessons-es.ts.",
  authored: true,
});

export const ES_TOPICS: TopicCluster[] = [
  {
    id: 1,
    title: "The Spanish Inside Your English",
    blurb: "The Latinate inheritance, el/la, quiero, and lo as 'it' walking left.",
    core: authoredCore(1, "The Spanish Inside Your English"),
    sprigs: [
      shell(esSprigId(1, 1), "Hidden Twins: Places & Colors", "Direct cognates gym: la casa, el hotel, azul, rojo, grande, pequeño — recognition drills."),
      shell(esSprigId(1, 2), "First Sentences Gym", "Quiero el… pattern drills: assemble simple sentences from the first conversions."),
      shell(esSprigId(1, 3), "The Register Ladder", "want→desire (desear), go in→enter (entrar), finish→terminate (terminar): formal English revealing everyday Spanish."),
    ],
  },
  {
    id: 2,
    title: "The -CIÓN Bridge",
    blurb: "Hundreds of nouns convert whole: tradición, confirmación — and every one takes la.",
    core: authoredCore(2, "The -CIÓN Bridge"),
    sprigs: [
      shell(esSprigId(2, 1), "-CIÓN Is Always Feminine", "la complicación, la pasión, la invitación — decoding grammatical gender straight from the suffix."),
      shell(esSprigId(2, 2), "The Article Switch Gym", "Mixed conversion drills: switch between masculine el and feminine la with confidence."),
    ],
  },
  {
    id: 3,
    title: "The -ar Engine: Verbs from Nouns",
    blurb: "Noun → verb: confirmación → confirmar. Hundreds of infinitives, ready to use.",
    core: authoredCore(3, "The -ar Engine: Verbs from Nouns"),
    sprigs: [
      shell(esSprigId(3, 1), "The Celebrar Trap", "Strip the whole -ación before -ar arrives: celebración → celebrar, not *celebratar."),
      shell(esSprigId(3, 2), "Quiero + Infinitive Gym", "quiero visitar, quiero participar — stack verbs smoothly without English 'to'."),
      shell(esSprigId(3, 3), "The -er & -ir Verb Bridges", "comer (edible), beber (beverage), comprender (comprehend), vivir (vivid), decidir — Spanish's other two verb classes."),
    ],
  },
  {
    id: 4,
    title: "Negation: The Clean 'No'",
    blurb: "Spanish negation is one direct word: no quiero, no lo quiero.",
    core: authoredCore(4, "Negation: The Clean 'No'"),
    sprigs: [
      shell(esSprigId(4, 1), "Refusal Gym: no quiero nada", "Double negation in Spanish: no quiero nada and no voy nunca reinforce the refusal."),
      shell(esSprigId(4, 2), "Negating the Pronoun", "Placing no right before the walking pronoun: no lo quiero, no la quiero."),
    ],
  },
  {
    id: 5,
    title: "Ser & Estar: The Two Beings",
    blurb: "es (characteristic) vs está (state/location) — the two ways Spanish sees existence.",
    core: authoredCore(5, "Ser & Estar: The Two Beings"),
    sprigs: [
      shell(esSprigId(5, 1), "Es vs Está Gym", "Characteristic vs state discrimination: es bueno vs está caliente, está aquí vs es grande."),
      shell(esSprigId(5, 2), "Description Agreement Gym", "Matching adjective endings to gender: el pastel es bueno, la tradición es buena."),
      shell(esSprigId(5, 3), "Chameleon Adjectives: listo, aburrido & rico", "How ser vs estar flips adjective meaning: es listo (clever) vs está listo (ready), es aburrido (boring) vs está aburrido (bored), es rico (rich) vs está rico (delicious)."),
    ],
  },
  {
    id: 6,
    title: "The -dad & -mente Bridges",
    blurb: "Quality nouns in -dad and adverbs in -mente: universidad, exactamente.",
    core: authoredCore(6, "The -dad & -mente Bridges"),
    sprigs: [
      shell(esSprigId(6, 1), "The -dad Feminine Squad", "-ty → -dad: ciudad, realidad, verdad — 100% feminine nouns decoded instantly."),
      shell(esSprigId(6, 2), "The -mente Adverb Factory", "-ly → feminine adjective + -mente: naturalmente, perfectamente, rápidamente."),
    ],
  },
  {
    id: 7,
    title: "Questions: Inverted & Intonation",
    blurb: "Inverted question marks ¿?, question words with accents, and por qué vs porque.",
    core: authoredCore(7, "Questions: Inverted & Intonation"),
    sprigs: [
      shell(esSprigId(7, 1), "dónde, qué & quién", "The accented question words: ¿dónde está?, ¿qué quieres?, ¿quién es?, ¿cuándo?, ¿cuánto?"),
      shell(esSprigId(7, 2), "por qué vs porque", "Asking why (por qué, two words accented) vs answering because (porque, one word)."),
    ],
  },
  {
    id: 8,
    title: "The -ico & -al Bridges",
    blurb: "Adjectives in -ico with mandatory tildes, and invariable -al cognates.",
    core: authoredCore(8, "The -ico & -al Bridges"),
    sprigs: [
      shell(esSprigId(8, 1), "The Esdrújula Accent Gym", "mágico, público, básico, económico, clásico — the accent mark tells your voice where to jump."),
      shell(esSprigId(8, 2), "The -al Invariable Passport", "natural, central, formal, personal, internacional — adjectives that never change for gender in the singular."),
    ],
  },
  {
    id: 9,
    title: "tú & usted: The T-V Line",
    blurb: "Informal tú vs polite usted (worn-down Vuestra Merced), greetings and social register.",
    core: authoredCore(9, "tú & usted: The T-V Line"),
    sprigs: [
      shell(esSprigId(9, 1), "Addressing with Respect", "Using 3rd-person verbs with usted: ¿cómo está usted? vs ¿cómo estás?"),
      shell(esSprigId(9, 2), "The Politeness Toolkit", "por favor, muchas gracias, buenos días, señor/señora — social courtesies in context."),
    ],
  },
  {
    id: 10,
    title: "tener & hay",
    blurb: "Possession with tener ('to hold') and existence with hay ('there is/are').",
    core: authoredCore(10, "tener & hay"),
    sprigs: [
      shell(esSprigId(10, 1), "tengo & tienes Gym", "Irregular first person tengo and stem-changing tienes/tiene/tenemos/tienen in possession drills."),
      shell(esSprigId(10, 2), "hay: The Universal Existence", "hay un problema, ¿hay café?, no hay nada — existence independent of number."),
      shell(esSprigId(10, 3), "Boot Verbs: e→ie, o→ue & e→i Under Stress", "Why querer (quiero/queremos), poder (puedo/podemos), tener (tienes/tenemos), and pedir (pido/pedimos) split their stem vowel only when stressed."),
    ],
  },
  {
    id: 11,
    title: "Adjective Agreement",
    blurb: "Descriptive adjectives following the noun: -o/-a/-os/-as patterns.",
    core: authoredCore(11, "Adjective Agreement"),
    sprigs: [
      shell(esSprigId(11, 1), "Noun-First Word Order", "el libro rojo, la casa blanca — painting the object before coloring it."),
      shell(esSprigId(11, 2), "Plural Concord Drills", "los hoteles grandes, las ciudades hermosas — concord across number and gender."),
      shell(esSprigId(11, 3), "Diminutives & Augmentatives: -ito, -illo & -ón", "From poquito and cafecito (-ito) to word-builders bocadillo ('sandwich' < bocado), pesadilla ('nightmare' < pesado), and limón (< lima)."),
    ],
  },
  {
    id: 12,
    title: "The Near Future: ir a",
    blurb: "voy a + infinitive — express future plans without learning a new tense.",
    core: authoredCore(12, "The Near Future: ir a"),
    sprigs: [
      shell(esSprigId(12, 1), "voy, vas, va Drills", "Conjugating ir (voy, vas, va, vamos, van) and attaching newly converted -ar verbs: voy a visitar."),
      shell(esSprigId(12, 2), "Near Future in Conversation", "Talking about today and tomorrow: mañana voy a organizar, hoy vamos a celebrar."),
      shell(esSprigId(12, 3), "Pronoun Hook vs Left-Walk: lo quiero vs quiero verlo", "Why Spanish lets object pronouns either walk left of the conjugated verb (Lo quiero ver) or hook onto the tail of the infinitive (Quiero verlo, Voy a comprarlo)."),
    ],
  },
  {
    id: 13,
    title: "por vs para",
    blurb: "Cause/exchange (por) vs goal/destination (para) — resolving the classic struggle.",
    core: authoredCore(13, "por vs para"),
    sprigs: [
      shell(esSprigId(13, 1), "para: The Arrow", "Destination, deadline, recipient, goal: un regalo para ti, para mañana, para comprender."),
      shell(esSprigId(13, 2), "por: The Motive and Path", "Because of, in exchange for, through: gracias por la invitación, por la mañana, por aquí."),
    ],
  },
  {
    id: 14,
    title: "Possessives Agree with the Thing",
    blurb: "mi, tu, su, mis, tus, sus — possessives agree with the possession, not the owner.",
    core: authoredCore(14, "Possessives Agree with the Thing"),
    sprigs: [
      shell(esSprigId(14, 1), "Singular vs Plural Possessions", "mi amigo vs mis amigos, su libro vs sus libros, nuestro/nuestra."),
      shell(esSprigId(14, 2), "Disambiguating su", "Why su hermano means 'his, her, your (usted), or their brother' and how Spanish clarifies it."),
      shell(esSprigId(14, 3), "Three Distances of Space: este, ese & aquel", "Matching Spanish's three spatial zones to the three persons: aquí/este (near me), ahí/ese (near you), allí/aquel (over yonder)."),
    ],
  },
  {
    id: 15,
    title: "Numbers & Ages: 1–100",
    blurb: "Counting, prices, and expressing age as possession: tengo treinta años.",
    core: authoredCore(15, "Numbers & Ages: 1–100"),
    sprigs: [
      shell(esSprigId(15, 1), "Numbers 1 to 30", "uno, dos, tres to treinta: foundational counting and diphthong twins siete (7), nueve (9), diez (10)."),
      shell(esSprigId(15, 2), "Age as Possession", "Why Spanish says 'I have years': tener with age (tengo treinta años) and numbers 30–100."),
      shell(esSprigId(15, 3), "Tener Expressions: hambre, sed & razón", "Possessing physical states with tener: tener hambre (f-→h- famine), tener sed, tener frío/calor, and tener razón ('to be right')."),
    ],
  },
  {
    id: 16,
    title: "Days, Months & Dates",
    blurb: "lunes, martes, en enero — calendar vocabulary and scheduling meetings.",
    core: authoredCore(16, "Days, Months & Dates"),
    sprigs: [
      shell(esSprigId(16, 1), "The Days of the Planets", "lunes (Moon), martes (Mars), miércoles (Mercury), jueves (Jove), viernes (Venus), sábado, domingo."),
      shell(esSprigId(16, 2), "Dates & Appointments", "el lunes ('on Monday'), los lunes ('on Mondays'), en enero, el cinco de mayo."),
    ],
  },
  {
    id: 17,
    title: "The -ado / -ido Past",
    blurb: "Pretérito perfecto with haber: he confirmado, he comido — the English -ed cousin.",
    core: authoredCore(17, "The -ado / -ido Past"),
    sprigs: [
      shell(esSprigId(17, 1), "Forming Participles", "-ar → -ado (hablado), -er/-ir → -ido (comido, vivido), plus irregulars hecho (fact) and visto (vista)."),
      shell(esSprigId(17, 2), "The haber Auxiliary", "he, has, ha, hemos, han + invariable participle: describing recent and life experiences."),
    ],
  },
  {
    id: 18,
    title: "The Preterite: The Dot in Time",
    blurb: "hablé, comí, fue — completed single past events bounded in time.",
    core: authoredCore(18, "The Preterite: The Dot in Time"),
    sprigs: [
      shell(esSprigId(18, 1), "-ar Preterite Endings", "hablé, hablaste, habló, hablamos, hablaron: how the stress mark separates hablo ('I speak') from habló ('he spoke')."),
      shell(esSprigId(18, 2), "The Famous Irregulars", "fui/fue (shared by ser and ir!), hice/hizo (hacer), tuve/tuvo (tener) in past narratives."),
    ],
  },
  {
    id: 19,
    title: "The Imperfect: The Storytelling Past",
    blurb: "hablaba, comía, era, estaba — ongoing background action, descriptions, and past habits.",
    core: authoredCore(19, "The Imperfect: The Storytelling Past"),
    sprigs: [
      shell(esSprigId(19, 1), "-aba and -ía Paradigms", "The rhythmic endings of memory: hablaba (-ar) and comía/vivía (-er/-ir), plus era (ser)."),
      shell(esSprigId(19, 2), "Setting the Scene: Preterite vs Imperfect", "The background canvas (estaba, vivía, era) interrupted by the event dot (llegó, vi, fue)."),
    ],
  },
  {
    id: 20,
    title: "desde hace & Present Duration",
    blurb: "vivo aquí desde hace tres años — using present tense for actions that continue.",
    core: authoredCore(20, "desde hace & Present Duration"),
    sprigs: [
      shell(esSprigId(20, 1), "desde vs desde hace", "Starting point (desde el lunes) vs elapsed duration (desde hace tres años) with the present tense."),
      shell(esSprigId(20, 2), "Llevar + Time Expressions", "llevar tres años aquí: Spanish's ultra-natural 'carry time' idiom for ongoing duration."),
    ],
  },
  {
    id: 21,
    title: "Comparatives: más, menos, mejor",
    blurb: "más... que, menos... que, tan... como, and irregular mejor/peor.",
    core: authoredCore(21, "Comparatives: más, menos, mejor"),
    sprigs: [
      shell(esSprigId(21, 1), "Superiority and Inferiority", "más grande que, menos caro que, and superlatives el/la más grande."),
      shell(esSprigId(21, 2), "Equality and Irregulars", "tan... como ('as... as'), mejor ('better/best'), and peor ('worse/worst')."),
    ],
  },
  {
    id: 22,
    title: "Double Object Pronouns",
    blurb: "me lo da, te lo digo — pronouns stacking before the verb, and le lo becoming se lo.",
    core: authoredCore(22, "Double Object Pronouns"),
    sprigs: [
      shell(esSprigId(22, 1), "The Pronoun Highway Order", "People before things: Indirect object (me, te, nos) precedes direct object (lo, la): me lo da, te lo digo."),
      shell(esSprigId(22, 2), "The se lo Softening Rule", "Why *le lo sounds like a tongue-twister and becomes se lo (Se lo doy 'I give it to him/her')."),
    ],
  },
  {
    id: 23,
    title: "Direct vs Indirect Objects: lo/la vs le",
    blurb: "lo/la (accusative) vs le/les (dative) — clarifying target and recipient.",
    core: authoredCore(23, "Direct vs Indirect Objects: lo/la vs le"),
    sprigs: [
      shell(esSprigId(23, 1), "The Personal 'a'", "Placing 'a' before specific human direct objects: veo a María, conozco a tu hermano, invito a mi amigo."),
      shell(esSprigId(23, 2), "Dative Pronoun Redundancy", "Why Spanish loves saying 'to whom' twice: Le doy el libro a María, A mí me gusta."),
      shell(esSprigId(23, 3), "Saber vs Conocer", "Knowing facts and skills (sé nadar, sé dónde está) vs knowing people and places (conozco Madrid, conozco a María)."),
    ],
  },
  {
    id: 24,
    title: "Reflexives & Daily Life",
    blurb: "me llamo, levantarse, acostarse — reflexives as self-action and daily routine.",
    core: authoredCore(24, "Reflexives & Daily Life"),
    sprigs: [
      shell(esSprigId(24, 1), "Morning to Night Routine", "levantarse (me levanto), lavarse, vestirse, acostarse (me acuesto) across a full day."),
      shell(esSprigId(24, 2), "Non-Literal & Reciprocal Reflexives", "irse ('to leave'), quedarse ('to stay'), and nos vemos ('we see each other')."),
    ],
  },
  {
    id: 25,
    title: "Gustar: The Inverted Liking",
    blurb: "me gusta el café = coffee pleases me — the subject is the thing liked.",
    core: authoredCore(25, "Gustar: The Inverted Liking"),
    sprigs: [
      shell(esSprigId(25, 1), "gusta vs gustan", "Singular vs plural agreement: me gusta el café / me gusta viajar vs me gustan los libros."),
      shell(esSprigId(25, 2), "The Gustar Family", "encantar (me encanta), interesar (me interesa), importar (no me importa), doler (me duele la cabeza)."),
    ],
  },
  {
    id: 26,
    title: "The Would-World & Subjunctive Preview",
    blurb: "me gustaría, podrías, and the opposite-vowel subjunctive after wishes.",
    core: authoredCore(26, "The Would-World & Subjunctive Preview"),
    sprigs: [
      shell(esSprigId(26, 1), "The Conditional of Politeness", "Infinitive + -ía: me gustaría reservar, ¿podrías ayudarme?, sería fantástico."),
      shell(esSprigId(26, 2), "Triggering the Subjunctive", "The opposite-vowel switch (-ar → -e, -er/-ir → -a) after quiero que and es importante que."),
      shell(esSprigId(26, 3), "Ojalá & W.E.I.R.D.O. Triggers", "Arabic-heritage ojalá ('God willing / hopefully') and wishes, emotions, and doubts in the subjunctive."),
    ],
  },
  {
    id: 27,
    title: "The Silent H & Palatal Shifts",
    blurb: "Historical sound shifts: f- → h- (hacer, hijo, hierro, hambre, hermoso), -ct- → -ch- (noche, leche, ocho, hecho), pl-/cl- → ll- (llave, lluvia, lleno, llamar).",
    core: authoredCore(27, "The Silent H & Palatal Shifts"),
    sprigs: [
      shell(esSprigId(27, 1), "The Silent H Decoded", "hacer ↔ fact, hijo ↔ filial, hierro ↔ ferrous, hambre ↔ famine, hermoso ↔ formosa: seeing Latin F behind Spanish H."),
      shell(esSprigId(27, 2), "The Palatal Twins: -ch- & ll-", "noctem → noche, lactem → leche, factum → hecho (-ct- → -ch-) and clāvis → llave, plēnus → lleno (cl-/pl- → ll-)."),
    ],
  },
  {
    id: 28,
    title: "que & quien: Connective Tissue",
    blurb: "Relative pronouns connecting ideas: la persona que conozco, lo que quiero.",
    core: authoredCore(28, "que & quien: Connective Tissue"),
    sprigs: [
      shell(esSprigId(28, 1), "que as the Master Connector", "Why Spanish uses que for BOTH people and things (el hombre que habla, el café que quiero), never dropping 'that'."),
      shell(esSprigId(28, 2), "lo que: The Thing That / What", "Using neuter lo que for 'what / the thing that': Comprendo lo que dices, Lo que quiero es descansar."),
      shell(esSprigId(28, 3), "Verb Dynasties: poner, tener, traer & mostrar Matrices", "Language Transfer's Latin prefix × root matrix: suponer/proponer/componer, obtener/mantener, atraer/distraer, mostrar/demostrar."),
    ],
  },
  {
    id: 29,
    title: "Spanish Idioms as Thought",
    blurb: "tener ganas de, darse cuenta de, echar de menos, ojalá — cultural metaphors in everyday speech.",
    core: authoredCore(29, "Spanish Idioms as Thought"),
    sprigs: [
      shell(esSprigId(29, 1), "Everyday Idioms in Action", "tener ganas de ('to feel like'), darse cuenta de ('to realize'), de repente ('suddenly')."),
      shell(esSprigId(29, 2), "Arabic Heritage & Cultural Turns", "ojalá ('inshallah'), hasta ('hatta'), azul ('lazaward'), and la sobremesa."),
    ],
  },
  {
    id: 30,
    title: "Capstone: El Puente Reading",
    blurb: "One connected Madrid story synthesizing all 9 conversion bridges and key structures.",
    core: authoredCore(30, "Capstone: El Puente Reading"),
    sprigs: [
      shell(esSprigId(30, 1), "A Day in Madrid: Reading", "Connected narrative in Madrid combining ser/estar, preterite/imperfect, gustar, and object pronouns."),
      shell(esSprigId(30, 2), "Trap Watch: False Friends in the Wild", "Mastering all 18 false friends (actualmente, embarazada, librería, éxito, asistir, recordar, sensible, sopa, realizar, lectura, delito, compromiso)."),
      shell(esSprigId(30, 3), "The Whole-Trail Review Game", "Mixed-mode synthesis across all 30 topics of El Puente."),
    ],
  },
];

export const ES_TRAIL_BRANCHES: TrailBranch[] = [
  {
    id: 5010,
    attach: 1,
    title: "First Words, First Spoken",
    blurb: "¡Hola!, gracias, por favor — social foundations and introductions.",
    lessons: [
      shell(5011, "¡Hola! y Gracias", "Greetings, thanks and politeness in dialogue drills; social warmth culture."),
      shell(5012, "The Alphabet & Me llamo", "El alfabeto, spelling your name, me llamo — introducing yourself with taught pieces."),
    ],
  },
  {
    id: 5020,
    attach: 1,
    title: "The Sound Gym",
    blurb: "The 5 pure vowels (a, e, i, o, u) and the written accent mark.",
    lessons: [
      shell(5021, "The Five Pure Vowels", "Never glide into diphthongs: clean vowel training and acute accent rules."),
    ],
  },
  {
    id: 5030,
    attach: 2,
    title: "False Friends Preview",
    blurb: "actualmente is 'currently' — a first walk through the trap deck.",
    lessons: [
      shell(5031, "Actualmente, Librería & Co.", "Key false friends in contrastive recall drills: actualmente, librería, éxito, asistir, recordar, sensible, sopa, embarazada."),
    ],
  },
  {
    id: 5040,
    attach: 9,
    title: "tú y usted in the Street",
    blurb: "When to use tú vs usted in Spain and Latin America.",
    lessons: [
      shell(5041, "The Social Line", "Register decisions with tú, usted, and ustedes across Spain and Latin America."),
    ],
  },
  {
    id: 5050,
    attach: 12,
    title: "En la ciudad",
    blurb: "aquí, allí, todo recto — navigating streets and plazas.",
    lessons: [
      shell(5051, "Directions & Places", "Asking ¿Dónde está…? and navigating with todo recto, a la izquierda, a la derecha, aquí, allí."),
    ],
  },
  {
    id: 5060,
    attach: 15,
    title: "Shopping & Euros",
    blurb: "¿Cuánto cuesta? — prices, market Spanish, and numbers under pressure.",
    lessons: [
      shell(5061, "¿Cuánto es?", "Asking prices with ¿Cuánto cuesta? / ¿Cuánto es?, numbers 1–100, and pedir la cuenta."),
    ],
  },
  {
    id: 5070,
    attach: 17,
    title: "The Past in the Wild",
    blurb: "Negative and question sentences with the pretérito perfecto.",
    lessons: [
      shell(5071, "No he terminado", "Keeping haber and its participle glued together: No he terminado, ¿Ya has comido?, Nunca he visto."),
    ],
  },
  {
    id: 5080,
    attach: 24,
    title: "La Rutina Diaria",
    blurb: "Reflexive chains across a whole morning and evening.",
    lessons: [
      shell(5081, "De la mañana a la noche", "Chaining reflexives (me levanto, me lavo, me acuesto) and time markers across a realistic day."),
    ],
  },
  {
    id: 5090,
    attach: 28,
    title: "que & quien",
    blurb: "Advanced relative pronouns and clauses.",
    lessons: [
      shell(5091, "Relative Clauses in Depth", "que, quien (after prepositions: la persona con quien hablo), lo que, and donde."),
    ],
  },
  {
    id: 5100,
    attach: 26,
    title: "El Condicional & Subjuntivo",
    blurb: "Politeness and hypotheticals expanded.",
    lessons: [
      shell(5101, "Hypothetical Situations", "Conditional -ía across verbs and polite/hypothetical expressions."),
    ],
  },
  {
    id: 5110,
    attach: 10,
    title: "The Boot-Verb Gym",
    blurb: "Mastering e→ie, o→ue, e→i stem changers and -go verbs.",
    lessons: [
      shell(5111, "o→ue & e→ie: puedo, duermo, empiezo", "Why the vowel splits inside the singular and 3rd-person plural boot, and stays single in nosotros."),
      shell(5112, "e→i & -go Verbs: pido, digo, hago, pongo", "Ordering with pido, telling with digo, doing with hago, and putting with pongo."),
    ],
  },
  {
    id: 5120,
    attach: 13,
    title: "Tapas, Mesa & Comida",
    blurb: "Ordering food, drinks, and tapas at a Spanish table.",
    lessons: [
      shell(5121, "En el Restaurante: La Mesa & La Cuenta", "Reserving una mesa, ordering with quiero / para mí, and asking for la cuenta."),
      shell(5122, "Pan, Queso, Vino & El Agua Fría", "Table staples and why feminine agua and hambre take masculine el in the singular (el agua fría)."),
    ],
  },
  {
    id: 5130,
    attach: 12,
    title: "Viajes, Trenes & Estaciones",
    blurb: "Trains, tickets, stations, and round-trip travel across the Spanish-speaking world.",
    lessons: [
      shell(5131, "La Estación, El Tren & El Billete", "Navigating la estación, el tren, el billete, and departure times."),
      shell(5132, "Ida y Vuelta, Salida & Llegada", "Buying one-way (sencillo / de ida) and round-trip (de ida y vuelta) tickets with para + city."),
    ],
  },
  {
    id: 5140,
    attach: 14,
    title: "Familia, Profesiones & Pasiones",
    blurb: "Professions without 'un/una' and cultural passions.",
    lessons: [
      shell(5141, "Médico, Profesor & Actor (No 'un'!)", "Why Spanish drops un/una after ser before unmodified professions: Soy profesor, Ella es doctora."),
      shell(5142, "La Música, El Cine & Los Libros", "Talking about music, cinema, and books with me gusta / me encanta + definite article."),
    ],
  },
  {
    id: 5150,
    attach: 18,
    title: "El Cuerpo, La Ropa & Los Colores",
    blurb: "Body parts with me duele and wearing clothes with llevar.",
    lessons: [
      shell(5151, "La Cabeza, La Mano & El Corazón", "Why la mano is feminine despite -o, and expressing aches with me duele la cabeza."),
      shell(5152, "El Abrigo, El Vestido & Los Colores", "Describing clothing with llevar ('to wear/carry') and post-nominal color agreement."),
    ],
  },
];

export const ES_TRAIL_GATES: TrailGate[] = [
  {
    id: 1,
    afterTopic: 7,
    requiredStars: 12,
    title: "The Decode Gate",
    why: "Topics 1–7 install the conversion core: -CIÓN, -ar/-er/-ir verb engines, negation, ser vs estar, -dad, -mente, and questions. Every topic ahead assumes you can decode words on sight — bank 12 stars in this stretch before moving on.",
  },
  {
    id: 2,
    afterTopic: 10,
    requiredStars: 5,
    title: "The Verb Gate",
    why: "Topics 8–10 add -ico, -al, the T-V address line, tener, hay, and stem-changing boot verbs. The sentence machine ahead assumes solid verbs — earn 5 stars in this stretch.",
  },
  {
    id: 3,
    afterTopic: 14,
    requiredStars: 7,
    title: "The Sentence Gate",
    why: "Topics 11–14 assemble the sentence machine: adjective agreement, diminutives, near future, pronoun hooking, por vs para, possessives, and demonstratives. Time travel ahead reuses them continuously — bank 7 stars here.",
  },
  {
    id: 4,
    afterTopic: 21,
    requiredStars: 9,
    title: "The Past Gate",
    why: "Topics 15–21 give you numbers, tener idioms, all three past tenses, duration with desde hace, and comparatives. The deep engine ahead reuses past and pronoun structures — earn 9 stars in this stretch.",
  },
  {
    id: 5,
    afterTopic: 26,
    requiredStars: 7,
    title: "The Deep Engine Gate",
    why: "Topics 22–26 install double object pronouns, se lo, personal 'a', saber vs conocer, reflexives, gustar, the conditional, and the subjunctive. The synthesis stretch is pure reading and recall — carry 7 stars with you.",
  },
];

// Authored status lives on the shells, so curriculum consumers never pull the
// full lesson bodies into their bundle.
const ES_AUTHORED_SHELLS = new Map<number, LessonShell>();
for (const topic of ES_TOPICS) {
  if (topic.core.authored) ES_AUTHORED_SHELLS.set(topic.core.id, topic.core);
  for (const sprig of topic.sprigs) {
    if (sprig.authored) ES_AUTHORED_SHELLS.set(sprig.id, sprig);
  }
}
for (const branch of ES_TRAIL_BRANCHES) {
  for (const lesson of branch.lessons) {
    if (lesson.authored) ES_AUTHORED_SHELLS.set(lesson.id, lesson);
  }
}

export const ES_AUTHORED_LESSON_COUNT = ES_AUTHORED_SHELLS.size;

export const SPANISH_CURRICULUM: CurriculumData = {
  topics: ES_TOPICS,
  trailBranches: ES_TRAIL_BRANCHES,
  trailGates: ES_TRAIL_GATES,
  totalTopics: ES_TOTAL_TOPICS,
  lessonCount: ES_AUTHORED_LESSON_COUNT,
};

export const getSpanishAuthoredLesson = (lessonId: number) => ES_AUTHORED_SHELLS.get(lessonId);
