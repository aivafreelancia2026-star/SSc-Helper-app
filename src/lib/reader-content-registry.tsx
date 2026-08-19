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
  "6-Science-intro": {
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-intro-page8").then((m) => m.C6ScienceIntroPage8),
    ),
  },
  "6-Science-ch1": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page1").then((m) => m.C6ScienceCh1Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page2").then((m) => m.C6ScienceCh1Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page3").then((m) => m.C6ScienceCh1Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page4").then((m) => m.C6ScienceCh1Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page5").then((m) => m.C6ScienceCh1Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page6").then((m) => m.C6ScienceCh1Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page7").then((m) => m.C6ScienceCh1Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page8").then((m) => m.C6ScienceCh1Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page9").then((m) => m.C6ScienceCh1Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch1-page10").then((m) => m.C6ScienceCh1Page10),
    ),
  },
  "6-Science-ch2": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page1").then((m) => m.C6ScienceCh2Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page2").then((m) => m.C6ScienceCh2Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page3").then((m) => m.C6ScienceCh2Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page4").then((m) => m.C6ScienceCh2Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page5").then((m) => m.C6ScienceCh2Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page6").then((m) => m.C6ScienceCh2Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page7").then((m) => m.C6ScienceCh2Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page8").then((m) => m.C6ScienceCh2Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page9").then((m) => m.C6ScienceCh2Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch2-page10").then((m) => m.C6ScienceCh2Page10),
    ),
  },
  "6-Science-ch3": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page1").then((m) => m.C6ScienceCh3Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page2").then((m) => m.C6ScienceCh3Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page3").then((m) => m.C6ScienceCh3Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page4").then((m) => m.C6ScienceCh3Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page5").then((m) => m.C6ScienceCh3Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page6").then((m) => m.C6ScienceCh3Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch3-page7").then((m) => m.C6ScienceCh3Page7),
    ),
  },
  "6-Science-ch4": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page1").then((m) => m.C6ScienceCh4Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page2").then((m) => m.C6ScienceCh4Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page3").then((m) => m.C6ScienceCh4Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page4").then((m) => m.C6ScienceCh4Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page5").then((m) => m.C6ScienceCh4Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page6").then((m) => m.C6ScienceCh4Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page7").then((m) => m.C6ScienceCh4Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page8").then((m) => m.C6ScienceCh4Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page9").then((m) => m.C6ScienceCh4Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page10").then((m) => m.C6ScienceCh4Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page11").then((m) => m.C6ScienceCh4Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page12").then((m) => m.C6ScienceCh4Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch4-page13").then((m) => m.C6ScienceCh4Page13),
    ),
  },
  "6-Science-ch5": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page1").then((m) => m.C6ScienceCh5Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page2").then((m) => m.C6ScienceCh5Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page3").then((m) => m.C6ScienceCh5Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page4").then((m) => m.C6ScienceCh5Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page5").then((m) => m.C6ScienceCh5Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page6").then((m) => m.C6ScienceCh5Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page7").then((m) => m.C6ScienceCh5Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page8").then((m) => m.C6ScienceCh5Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch5-page9").then((m) => m.C6ScienceCh5Page9),
    ),
  },
  "6-Telugu-ch1": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page1").then((m) => m.C6TeluguCh1Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page2").then((m) => m.C6TeluguCh1Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page3").then((m) => m.C6TeluguCh1Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page4").then((m) => m.C6TeluguCh1Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page5").then((m) => m.C6TeluguCh1Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page6").then((m) => m.C6TeluguCh1Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page7").then((m) => m.C6TeluguCh1Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch1-page8").then((m) => m.C6TeluguCh1Page8),
    ),
  },
  "6-Telugu-ch2": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page1").then((m) => m.C6TeluguCh2Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page2").then((m) => m.C6TeluguCh2Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page3").then((m) => m.C6TeluguCh2Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page4").then((m) => m.C6TeluguCh2Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page5").then((m) => m.C6TeluguCh2Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page6").then((m) => m.C6TeluguCh2Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page7").then((m) => m.C6TeluguCh2Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page8").then((m) => m.C6TeluguCh2Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page9").then((m) => m.C6TeluguCh2Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch2-page10").then((m) => m.C6TeluguCh2Page10),
    ),
  },
  "6-Telugu-ch3": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page1").then((m) => m.C6TeluguCh3Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page2").then((m) => m.C6TeluguCh3Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page3").then((m) => m.C6TeluguCh3Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page4").then((m) => m.C6TeluguCh3Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page5").then((m) => m.C6TeluguCh3Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page6").then((m) => m.C6TeluguCh3Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page7").then((m) => m.C6TeluguCh3Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page8").then((m) => m.C6TeluguCh3Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page9").then((m) => m.C6TeluguCh3Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch3-page10").then((m) => m.C6TeluguCh3Page10),
    ),
  },
  "6-Telugu-ch4": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page1").then((m) => m.C6TeluguCh4Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page2").then((m) => m.C6TeluguCh4Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page3").then((m) => m.C6TeluguCh4Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page4").then((m) => m.C6TeluguCh4Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page5").then((m) => m.C6TeluguCh4Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page6").then((m) => m.C6TeluguCh4Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page7").then((m) => m.C6TeluguCh4Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page8").then((m) => m.C6TeluguCh4Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page9").then((m) => m.C6TeluguCh4Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page10").then((m) => m.C6TeluguCh4Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page11").then((m) => m.C6TeluguCh4Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch4-page12").then((m) => m.C6TeluguCh4Page12),
    ),
  },
  "6-Telugu-ch5": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page1").then((m) => m.C6TeluguCh5Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page2").then((m) => m.C6TeluguCh5Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page3").then((m) => m.C6TeluguCh5Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page4").then((m) => m.C6TeluguCh5Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page5").then((m) => m.C6TeluguCh5Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page6").then((m) => m.C6TeluguCh5Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page7").then((m) => m.C6TeluguCh5Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page8").then((m) => m.C6TeluguCh5Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page9").then((m) => m.C6TeluguCh5Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page10").then((m) => m.C6TeluguCh5Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page11").then((m) => m.C6TeluguCh5Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch5-page12").then((m) => m.C6TeluguCh5Page12),
    ),
  },
  "6-Telugu-ch6": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page1").then((m) => m.C6TeluguCh6Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page2").then((m) => m.C6TeluguCh6Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page3").then((m) => m.C6TeluguCh6Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page4").then((m) => m.C6TeluguCh6Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page5").then((m) => m.C6TeluguCh6Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page6").then((m) => m.C6TeluguCh6Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page7").then((m) => m.C6TeluguCh6Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page8").then((m) => m.C6TeluguCh6Page8),
    ),
  },
  "6-Maths-ch1": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page1").then((m) => m.C6MathsCh1Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page2").then((m) => m.C6MathsCh1Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page3").then((m) => m.C6MathsCh1Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page4").then((m) => m.C6MathsCh1Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page5").then((m) => m.C6MathsCh1Page5),
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
