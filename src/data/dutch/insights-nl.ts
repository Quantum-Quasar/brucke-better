import type { DailyInsight } from "@/lib/types";

// 28 Dutch expressions, each teaching a structural or cultural habit.
// Entries follow the shared DailyInsight shape (the german_* field names are
// historical; the content is Dutch). All expressions and example sentences are
// attested standard Dutch; uncertain folk etymologies are hedged.
export const DUTCH_INSIGHTS: DailyInsight[] = [
  {
    day: 1,
    german_expression: "de kat uit de boom kijken",
    english_meaning: "to wait and see (lit. to look the cat out of the tree)",
    cultural_etymology:
      "The image is a dog staring up at a cat that has fled into a tree; Carolus Tuinman recorded the belief in 1726 that steady staring would make the cat come down. Example: Ik kijk de kat nog even uit de boom voordat ik reageer.",
    takeaway_principle: "Dutch often thinks through concrete animal scenes rather than abstract nouns.",
  },
  {
    day: 2,
    german_expression: "een appeltje voor de dorst",
    english_meaning: "a nest egg, something saved for a rainy day (lit. a little apple for the thirst)",
    cultural_etymology:
      "Apples keep well, so storing one against later thirst became a metaphor for a reserve; the diminutive makes it modest and everyday. Example: Ze heeft een appeltje voor de dorst achter de hand.",
    takeaway_principle: "The diminutive is not only 'small' — it can make a concept unpretentious and friendly.",
  },
  {
    day: 3,
    german_expression: "de spijker op de kop slaan",
    english_meaning: "to hit the nail on the head (lit. to hit the nail on the head)",
    cultural_etymology:
      "From carpentry: a nail goes in straight only if you strike the head squarely. Example: Je sloeg de spijker op de kop met die opmerking.",
    takeaway_principle: "Dutch and English share many Germanic craft metaphors almost word for word.",
  },
  {
    day: 4,
    german_expression: "iets onder de knie krijgen",
    english_meaning: "to master something (lit. to get something under the knee)",
    cultural_etymology:
      "From wrestling: the winner pins the opponent with a knee on the chest; Tuinman defined it as 'to subdue completely' before it spread to skills. Example: Nu heb ik de grammatica onder de knie.",
    takeaway_principle: "Body-part idioms map abstract learning onto physical control.",
  },
  {
    day: 5,
    german_expression: "het heft in eigen handen nemen",
    english_meaning: "to take charge (lit. to take the handle in one's own hands)",
    cultural_etymology:
      "Heft is the grip of a knife or sword, attested in this sense since 1480; gripping the hilt pictures seizing control. Example: Na haar ontslag nam ze het heft in eigen handen.",
    takeaway_principle: "Eigen ('own') is a heavily used Dutch word, and reflexive possession is central to its view of agency.",
  },
  {
    day: 6,
    german_expression: "van de regen in de drup",
    english_meaning: "out of the frying pan into the fire (lit. from the rain into the drip)",
    cultural_etymology:
      "Drup is water dripping from eaves or branches; German has the same image in vom Regen in die Traufe. Example: Ik wilde de file vermijden en belandde van de regen in de drup.",
    takeaway_principle: "Cognate languages often share a metaphor but not the individual fossil word — drup survives mainly inside this idiom.",
  },
  {
    day: 7,
    german_expression: "boter bij de vis",
    english_meaning: "cash on delivery, payment up front (lit. butter with the fish)",
    cultural_etymology:
      "The usual explanation is kitchen practice: have the butter ready when the fish goes into the pan; a 17th-century variant is geld bij de vis. Example: Geen credit, boter bij de vis.",
    takeaway_principle: "An instruction about cooking can harden into a rule about money.",
  },
  {
    day: 8,
    german_expression: "zo ziek als een hond",
    english_meaning: "as sick as a dog (lit. as sick as a dog)",
    cultural_etymology:
      "The comparison is an intensifier rather than an observation; Dutch has a family of 'as ... as an animal' intensifiers. Example: Ik was gisteren zo ziek als een hond.",
    takeaway_principle: "Similes can signal intensity without being literally true.",
  },
  {
    day: 9,
    german_expression: "met de deur in huis vallen",
    english_meaning: "to come straight to the point (lit. to fall into the house with the door)",
    cultural_etymology:
      "The image is someone entering and immediately stating their business instead of making small talk; the precise origin is undocumented. Example: Ze viel met de deur in huis: 'Ik ga verhuizen.'",
    takeaway_principle: "Dutch directness is encoded in everyday idioms, not only in manners.",
  },
  {
    day: 10,
    german_expression: "de bloemetjes buiten zetten",
    english_meaning: "to paint the town red, to let one's hair down (lit. to put the little flowers outside)",
    cultural_etymology:
      "Probably from decorating the street or façade with flowers for a feast; the origin is not firmly documented. Example: We hebben gisteren de bloemetjes buiten gezet.",
    takeaway_principle: "A diminutive plural makes even wild celebration sound light and harmless.",
  },
  {
    day: 11,
    german_expression: "voor een appel en een ei",
    english_meaning: "for a song, dirt cheap (lit. for an apple and an egg)",
    cultural_etymology:
      "Both foods were ordinary and cheap; the expression is recorded in the 18th century. Example: Ik heb die fiets voor een appel en een ei gekocht.",
    takeaway_principle: "Basic foodstuffs are a natural measuring stick for money.",
  },
  {
    day: 12,
    german_expression: "een dubbeltje op zijn kant",
    english_meaning: "a close call, touch and go (lit. a ten-cent coin on its edge)",
    cultural_etymology:
      "A dubbeltje was a 10-cent coin, a tenth of a guilder; balanced on its edge, it could fall either way. Example: Het was een dubbeltje op zijn kant.",
    takeaway_principle: "Pre-euro currency survives inside fixed expressions.",
  },
  {
    day: 13,
    german_expression: "gezellig",
    english_meaning: "cosy, convivial, sociable — the warmth of shared company",
    cultural_etymology:
      "From gezel ('companion'); first attested in the sense 'snug' in 1240. It describes the atmosphere people create together, not just a room. Example: Het was echt gezellig.",
    takeaway_principle: "Untranslatable words are cultural evidence — teach the situations, not a single English gloss.",
  },
  {
    day: 14,
    german_expression: "lekker",
    english_meaning: "tasty; nice, pleasant (from an old sense of lekken, to lick)",
    cultural_etymology:
      "It reaches far beyond food: lekker slapen ('sleep well'), lekker weer ('nice weather'), even ironic lekker belangrijk. Example: We hebben lekker gegeten.",
    takeaway_principle: "Sensory adjectives routinely broaden into general evaluators.",
  },
  {
    day: 15,
    german_expression: "uitwaaien",
    english_meaning: "to clear one's head by walking in the wind (lit. to blow out)",
    cultural_etymology:
      "A separable verb: ik waai uit, ik ben uitgeraaiwd. The literal sense 'to blow out a flame' also exists. Example: Ik ga even uitwaaien op het strand.",
    takeaway_principle: "Separable prefixes carry direction, and Dutch productively builds new verbs from them.",
  },
  {
    day: 16,
    german_expression: "borrel",
    english_meaning: "informal drinks with snacks; a shot of jenever",
    cultural_etymology:
      "Probably from Middle Dutch borre/borne ('spring, drinking water') plus -el; the word shifted from water to strong drink. Example: Kom je naar de borrel?",
    takeaway_principle: "Etymology can be humble while the cultural ritual becomes elaborate.",
  },
  {
    day: 17,
    german_expression: "doe normaal",
    english_meaning: "act normal, don't show off (lit. do normal)",
    cultural_etymology:
      "A deeply Dutch injunction with Calvinist and egalitarian overtones; tone decides whether it is affectionate advice or a rebuke. Example: Doe normaal, je hoeft niet op te scheppen.",
    takeaway_principle: "Bare imperatives reveal social norms more directly than polite formulas.",
  },
  {
    day: 18,
    german_expression: "komt goed",
    english_meaning: "it'll be fine, no worries (lit. comes good)",
    cultural_etymology:
      "The subject het is dropped in this fixed reassuring formula; komt wel goed is a warmer variant. Example: Maak je geen zorgen, het komt goed.",
    takeaway_principle: "Dutch frequently drops subjects in colloquial set phrases.",
  },
  {
    day: 19,
    german_expression: "geen probleem",
    english_meaning: "no problem, not at all (lit. no problem)",
    cultural_etymology:
      "A transparent negation with geen before an indefinite noun, behaving as a fixed social formula. Example: 'Sorry dat ik laat ben.' 'Geen probleem.'",
    takeaway_principle: "The choice between niet and geen is grammatical, not stylistic.",
  },
  {
    day: 20,
    german_expression: "het is maar net",
    english_meaning: "it depends, it's all relative (lit. it is just exactly)",
    cultural_etymology:
      "Usually expanded as het is maar net hoe je het bekijkt; maar and net are modal particles that soften and relativise. Example: Het is maar net hoe je het bekijkt.",
    takeaway_principle: "Small modal particles carry much of Dutch conversational tone.",
  },
  {
    day: 21,
    german_expression: "eerlijk is eerlijk",
    english_meaning: "fair is fair (lit. honest is honest)",
    cultural_etymology:
      "A tautological proverb used to concede a point; the related eerlijk duurt het langst means 'honesty is the best policy'. Example: Eerlijk is eerlijk: hij had gelijk.",
    takeaway_principle: "X-is-X tautologies are a common Dutch way of closing an argument.",
  },
  {
    day: 22,
    german_expression: "de koe bij de horens vatten",
    english_meaning: "to take the bull by the horns (lit. to grab the cow by the horns)",
    cultural_etymology:
      "Dutch says koe (cow) where English says bull, but the image and meaning are identical. Example: We moeten de koe bij de horens vatten.",
    takeaway_principle: "Same metaphor, different animal — a classic idiom false friend.",
  },
  {
    day: 23,
    german_expression: "water naar de zee dragen",
    english_meaning: "to carry coals to Newcastle (lit. to carry water to the sea)",
    cultural_etymology:
      "An image of pointless effort, natural in a country defined by water management. Example: Meer regels maken is water naar de zee dragen.",
    takeaway_principle: "Landscape shapes which metaphors feel obvious.",
  },
  {
    day: 24,
    german_expression: "een gat in de dag slapen",
    english_meaning: "to sleep half the day away (lit. to sleep a hole in the day)",
    cultural_etymology:
      "Gat ('hole') pictures the missing chunk of daylight; there is no exact English idiom. Example: Hij slaapt op zondag een gat in de dag.",
    takeaway_principle: "Concrete nouns plus a verb can create vivid idiom without any abstraction.",
  },
  {
    day: 25,
    german_expression: "nu breekt mijn klomp",
    english_meaning: "well, blow me down! (lit. now my clog breaks)",
    cultural_etymology:
      "An exclamation of astonishment built on the wooden clog as a symbol of Dutchness; the origin is uncertain. Example: Nu breekt mijn klomp!",
    takeaway_principle: "Culture-specific objects can become pure exclamations.",
  },
  {
    day: 26,
    german_expression: "een broodje aap",
    english_meaning: "an urban legend (lit. a monkey sandwich)",
    cultural_etymology:
      "Popularised by Ethel Portnoy's 1978 book Broodje aap, which collected such stories; the name comes from a tale about a sandwich made of monkey meat. Example: Dat verhaal is een broodje aap.",
    takeaway_principle: "Modern coinages can become idioms within a generation.",
  },
  {
    day: 27,
    german_expression: "de kogel is door de kerk",
    english_meaning: "the decision is made, the die is cast (lit. the bullet is through the church)",
    cultural_etymology:
      "Traditionally linked to the rule that churches should be spared in war; a cannonball fired through Haarlem's St Bavo in 1573 is still shown, but Stoett doubted the story. Example: De kogel is door de kerk: we verhuizen.",
    takeaway_principle: "A vivid folk etymology can outlive the evidence — teach the idiom, hedge the story.",
  },
  {
    day: 28,
    german_expression: "zoals het klokje thuis tikt, tikt het nergens",
    english_meaning: "there's no place like home (lit. as the clock ticks at home, it ticks nowhere)",
    cultural_etymology:
      "A proverb built on a domestic diminutive (klokje) rather than an abstract claim about belonging. Example: Na drie weken reizen dacht ik: zoals het klokje thuis tikt, tikt het nergens.",
    takeaway_principle: "Dutch proverbs often prefer a homely image to a general truth.",
  },
  {
    day: 29,
    german_expression: "nu komt de aap uit de mouw",
    english_meaning: "now the truth comes out (lit. now the monkey comes out of the sleeve)",
    cultural_etymology:
      "Street conjurers kept the monkey hidden in a sleeve until the trick's finale. When the secret shows, the monkey shows. Example: Je had het de hele week verzwegen — nu komt de aap uit de mouw!",
    takeaway_principle:
      "komen (to come) drives Dutch motion idioms, and mouw is a sleeve — Dutch keeps its surprises in its clothing.",
  },
  {
    day: 30,
    german_expression: "stof tot nadenken",
    english_meaning: "food for thought (lit. dust/material for thinking)",
    cultural_etymology:
      "stof means dust, fabric and material at once — thoughts need material to chew on. Example: Dat filosofische boek gaf me veel stof tot nadenken.",
    takeaway_principle:
      "tot (until, to) + a noun phrase: Dutch aims its nouns at purposes the way English aims 'for' at them.",
  },
  {
    day: 31,
    german_expression: "de appel valt niet ver van de boom",
    english_meaning: "the apple doesn't fall far from the tree",
    cultural_etymology:
      "Dutch, English and German all keep this same proverb about children and parents — one image, three languages. Example: Zoals de vader, zoals de zoon: de appel valt niet ver van de boom.",
    takeaway_principle:
      "vallen (to fall) again — some proverbs are so obvious that every language plants the same tree.",
  },
  {
    day: 32,
    german_expression: "dweilen met de kraan open",
    english_meaning: "endless futile work (lit. to mop with the tap open)",
    cultural_etymology:
      "Mopping while the tap keeps pouring — the floor floods back as fast as you dry it. A Sisyphean image from everyday housework. Example: Zonder planning is dit dweilen met de kraan open.",
    takeaway_principle:
      "met (with) marks the instrument, and open doubles as adjective and adverb — Dutch leaves its adjectives bare.",
  },
  {
    day: 33,
    german_expression: "door de vingers kijken",
    english_meaning: "to turn a blind eye (lit. to look through one's fingers)",
    cultural_etymology:
      "Pretend not to see by looking between the fingers you politely keep in front of your eyes. Example: De docent kijkt de kleine foutjes door de vingers.",
    takeaway_principle:
      "kijken + door (through) — prepositions do the semantic work in Dutch idioms, exactly as they do in Dutch word-building.",
  },
  {
    day: 34,
    german_expression: "koekje van eigen deeg",
    english_meaning: "a taste of your own medicine (lit. a cookie of your own dough)",
    cultural_etymology:
      "When your own trick turns on you, you eat a cookie baked from your own dough. Example: Hij klaagt over rommel en krijgt nu het koekje van eigen deeg.",
    takeaway_principle:
      "koekje (little cake) is the diminutive again, and deeg (dough) — reciprocity idioms borrow from the kitchen.",
  },
  {
    day: 35,
    german_expression: "hagelslag",
    english_meaning: "chocolate sprinkles on buttered bread",
    cultural_etymology:
      "hagel is hail — the sprinkles fall on your morning slice like a hail shower. A whole nation's breakfast, named by weather. Example: Nederlands ontbijt: brood met boter en hagelslag.",
    takeaway_principle:
      "Dutch names new things by describing them plainly: hail on your bread. The compound stays transparent, and breakfast stays joyful.",
  },
  {
    day: 36,
    german_expression: "een oogje in het zeil houden",
    english_meaning: "to keep an eye on things (lit. to keep a little eye on the sail)",
    cultural_etymology:
      "From the age of sail: the lookout watched the sails for every shift of wind. The little eye never leaves the canvas. Example: Ik hou een oogje in het zeil terwijl je weg bent.",
    takeaway_principle:
      "oogje is the diminutive of oog (eye) — and holding (houden) + a body part builds watchfulness, like door de vingers kijken.",
  },
  {
    day: 37,
    german_expression: "twee vliegen in één klap",
    english_meaning: "two birds with one stone (lit. two flies with one swat)",
    cultural_etymology:
      "One clap of the tea towel, two flies down. Efficiency priced in insects instead of birds. Example: Met de fiets naar het werk: we bewegen én we sparen — twee vliegen in één klap.",
    takeaway_principle:
      "één (one) + klap (a clap/swat) — small countable nouns do the work; the thought is the same, the image is Dutch.",
  },
  {
    day: 38,
    german_expression: "een kat een kat noemen",
    english_meaning: "to call a cat a cat (to say it plainly)",
    cultural_etymology:
      "Dutch directness in one image: whatever it is, name it. No euphemism, no decoration. Example: Ik noem gewoon een kat een kat: het plan is te duur.",
    takeaway_principle:
      "noemen (to name) is the naming verb — and the idiom's plainness is the whole culture of doe normaal in miniature.",
  },
  {
    day: 39,
    german_expression: "het hart op de tong",
    english_meaning: "to wear your heart on your sleeve (lit. to have the heart on the tongue)",
    cultural_etymology:
      "English hangs the heart on the sleeve; Dutch puts it on the tongue, where every feeling gets spoken out loud. Example: Zij heeft altijd haar hart op de tong.",
    takeaway_principle:
      "The heart words (het hart) + body geography — Dutch locates honesty in the mouth, not the chest.",
  },
  {
    day: 40,
    german_expression: "door de mand vallen",
    english_meaning: "to give yourself away (lit. to fall through the basket)",
    cultural_etymology:
      "At old markets, a seller caught cheating sometimes literally fell through the basket he stood on. The lie collapses; so does the floor. Example: Door te overdrijven viel hij door de mand.",
    takeaway_principle:
      "de mand (basket) + vallen (to fall) — exposure idioms stage a small accident, and the truth does the pushing.",
  },
];
