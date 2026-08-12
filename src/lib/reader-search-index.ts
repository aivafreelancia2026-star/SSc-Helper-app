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
};

export function getPageKeywords(chapterId: string, pageInChapter: number): string {
  return KEYWORDS[chapterId]?.[pageInChapter] ?? "";
}
