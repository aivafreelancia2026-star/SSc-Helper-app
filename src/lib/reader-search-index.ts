// Short, hand-picked searchable text for pages that have real authored
// content (see reader-content-registry) — pages without an entry here just
// fall back to their chapter's title/unit/subArea in PageBrowser's search,
// since most pages don't have structured body text to search yet.
const KEYWORDS: Record<string, Record<number, string>> = {
  "6-Science-ch1": {
    1: "chapati idly samosa rice dal paratha laddu kheer ice cream sundae varieties of food",
    2: "table 1 what did i eat name of student food eaten midday meals",
    3: "green chilli garlic potato salt jeera chilli powder rice pantry ingredients",
    4: "table 3 who gives us food plant animal cooking oil honey groundnut sunflower coconut bees turmeric",
    5: "cinnamon dalchini cardamom ilaichi cashew nuts almonds biryani leaves kismis fenugreek menthulu mustard avalu which part of the plant do we eat",
    6: "table 5 methods of preparing food boiling steaming rice idly food habits rajasthan chapathi roti",
    7: "table 5 fermentation roasting deep frying shallow frying peanuts pakodi puri chicken fish tasty food joseph tomato curry",
    8: "activity let us cook preservation of food pickles salt chilli powder oil smoked fish table 6 preserve",
    9: "vegetable carving keywords ingredients preservatives fragrant materials dry fruits what we have learnt improve your learning",
    10: "improve your learning exercises kichidi payasam biryani milk giving egg giving meat giving venn diagram vada dosa preserve fish mango lemons",
  },
  "6-Science-ch2": {
    1: "pin holder magnet magnets iron nails jump clips activity finding objects attracted",
    2: "story of magnet magnus lodestone bar magnet horse shoe ring disc magnet shapes",
    3: "activity magnetic materials non magnetic materials table iron filings soil archimedes",
    4: "poles of a bar magnet iron filings north south activity finding directions compass",
    5: "north pole south pole magnetic compass directional property attraction repulsion between two magnets",
    6: "like poles repel unlike poles attract earth as a magnet suspended bar magnet",
    7: "activity finding out whether object is a magnet table 2 make your own magnet magnetize nail",
    8: "magnetize nail magnetic compass cork water magnetic induction safety pin alpin",
    9: "magnetic induction keywords what we have learnt improve your learning magnetic non magnetic materials",
    10: "improve your learning exercises compass directions earth magnet toy magnets saleem ali",
  },
  "6-Science-ch3": {
    1: "rain umbrella forms of water solid liquid gaseous ice clouds ramya sowmya",
    2: "liquid form gaseous form water vapour ice water evaporation clothes drying sunlight",
    3: "evaporation clouds condensation winter breath dew grass",
    4: "activity condensation glass ice water droplets water cycle clouds kitchen stove",
    5: "rain clouds hailstones snow monsoons south west monsoon",
    6: "north east monsoon water cycle streams rivers deforestation global warming floods droughts keywords",
    7: "improve your learning water cycle diagram rainbow plastic bags dangerous pollution",
  },
  "6-Science-ch4": {
    1: "kartik dog sniffing food intake activity animals eat",
    2: "table 1 animal bird what they eat how they find food herbivores carnivores omnivores",
    3: "table 2 food habits eats only plants animals both herbivores carnivores omnivores search for food tracking down",
    4: "collecting food pond skaters bodyparts mouthparts hands feet cow butterfly frog hummingbird squirrel lion",
    5: "activity table 3 bodypart used in collecting food hen cow dog frog snake lizard vulture lion man humming bird",
    6: "bird beaks eagle sparrow duck cock wood pecker pigeon crow food habit",
    7: "table 4 similarities dissimilarities hen crow picking food with beak woodpecker parrot eagle claws scavengers",
    8: "frog tongue cow rumination how much how little elephant crane fly dog gets food",
    9: "dog teeth lion tiger rabbit squirrel using the tongue frog cow dog duck filter getting food without hunting",
    10: "leeches suckers modes of collecting food lizard spider hen butterfly nocturnal food chain crane fish frog",
    11: "food chains food web grain cat rat grass dog wolf cat deer tiger man lion fox hen worms ants aphids honeydew",
    12: "leafcutter ants keywords what we have learnt improve your learning carnivores herbivores omnivores food chain",
  },
};

export function getPageKeywords(chapterId: string, pageInChapter: number): string {
  return KEYWORDS[chapterId]?.[pageInChapter] ?? "";
}
