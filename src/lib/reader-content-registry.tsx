import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Keyed by chapter id + page-within-that-chapter (1-based), NOT the book's
// absolute page number — chapter page ranges have already shifted once
// (see the intro/index overlap fix) and will again as more chapters get
// real content, so content must stay addressable independent of that.
//
// Lazily imported (rather than static top-level imports) so visiting one
// page doesn't bundle every other hand-built page's JS along with it — this
// matters more as more chapters get real content and the registry grows.
const REGISTRY: Record<string, Record<number, ComponentType>> = {
  "6-Science-ch1": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page1").then((m) => m.C6ScienceCh1Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page2").then((m) => m.C6ScienceCh1Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page3").then((m) => m.C6ScienceCh1Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page4").then((m) => m.C6ScienceCh1Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page5").then((m) => m.C6ScienceCh1Page5),
    ),
  },
};

export function getPageContent(
  classGrade: number,
  subject: string,
  chapterId: string,
  pageInChapter: number,
): ComponentType | null {
  return REGISTRY[`${classGrade}-${subject}-${chapterId}`]?.[pageInChapter] ?? null;
}
