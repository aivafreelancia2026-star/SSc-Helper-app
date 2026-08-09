// Fired by the nav bar's Reset button, listened for by every FillInTable
// currently mounted (i.e. only the ones on the page actually being viewed —
// other pages' saved answers are untouched since their components aren't
// mounted to hear it).
export const RESET_PAGE_ANSWERS_EVENT = "ssc:reset-page-answers";
