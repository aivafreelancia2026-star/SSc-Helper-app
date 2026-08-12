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
    6: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page6").then((m) => m.C6ScienceCh1Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page7").then((m) => m.C6ScienceCh1Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page8").then((m) => m.C6ScienceCh1Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page9").then((m) => m.C6ScienceCh1Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/c6-science-ch1-page10").then((m) => m.C6ScienceCh1Page10),
    ),
  },
  "6-Science-ch2": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page1").then((m) => m.C6ScienceCh2Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page2").then((m) => m.C6ScienceCh2Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page3").then((m) => m.C6ScienceCh2Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page4").then((m) => m.C6ScienceCh2Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page5").then((m) => m.C6ScienceCh2Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page6").then((m) => m.C6ScienceCh2Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page7").then((m) => m.C6ScienceCh2Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page8").then((m) => m.C6ScienceCh2Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page9").then((m) => m.C6ScienceCh2Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/c6-science-ch2-page10").then((m) => m.C6ScienceCh2Page10),
    ),
  },
  "6-Science-ch3": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page1").then((m) => m.C6ScienceCh3Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page2").then((m) => m.C6ScienceCh3Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page3").then((m) => m.C6ScienceCh3Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page4").then((m) => m.C6ScienceCh3Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page5").then((m) => m.C6ScienceCh3Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page6").then((m) => m.C6ScienceCh3Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/c6-science-ch3-page7").then((m) => m.C6ScienceCh3Page7),
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
