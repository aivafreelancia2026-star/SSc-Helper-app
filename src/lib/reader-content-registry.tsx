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
  "6-Hindi-ch_read_1": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch-read-1-page1").then(
        (m) => m.C6HindiChRead1Page1,
      ),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch-read-1-page2").then(
        (m) => m.C6HindiChRead1Page2,
      ),
    ),
  },
  "6-Hindi-ch_read_2": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch-read-2-page1").then(
        (m) => m.C6HindiChRead2Page1,
      ),
    ),
  },
  "6-Hindi-ch1": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch1-page1").then(
        (m) => m.C6HindiCh1Page1,
      ),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch1-page2").then(
        (m) => m.C6HindiCh1Page2,
      ),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch1-page3").then(
        (m) => m.C6HindiCh1Page3,
      ),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch1-page4").then(
        (m) => m.C6HindiCh1Page4,
      ),
    ),
  },
  "6-Hindi-ch2": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch2-page1").then(
        (m) => m.C6HindiCh2Page1,
      ),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch2-page2").then(
        (m) => m.C6HindiCh2Page2,
      ),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch2-page3").then(
        (m) => m.C6HindiCh2Page3,
      ),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch2-page4").then(
        (m) => m.C6HindiCh2Page4,
      ),
    ),
  },
  "6-Hindi-ch3": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch3-page1").then(
        (m) => m.C6HindiCh3Page1,
      ),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch3-page2").then(
        (m) => m.C6HindiCh3Page2,
      ),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch3-page3").then(
        (m) => m.C6HindiCh3Page3,
      ),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch3-page4").then(
        (m) => m.C6HindiCh3Page4,
      ),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch3-page5").then(
        (m) => m.C6HindiCh3Page5,
      ),
    ),
  },
  "6-Hindi-ch4": {
    1: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch4-page1").then(
        (m) => m.C6HindiCh4Page1,
      ),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch4-page2").then(
        (m) => m.C6HindiCh4Page2,
      ),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch4-page3").then(
        (m) => m.C6HindiCh4Page3,
      ),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/c6-hindi-ch4-page4").then(
        (m) => m.C6HindiCh4Page4,
      ),
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
  "6-Science-ch6": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page1").then((m) => m.C6ScienceCh6Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page2").then((m) => m.C6ScienceCh6Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page3").then((m) => m.C6ScienceCh6Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page4").then((m) => m.C6ScienceCh6Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page5").then((m) => m.C6ScienceCh6Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page6").then((m) => m.C6ScienceCh6Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page7").then((m) => m.C6ScienceCh6Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page8").then((m) => m.C6ScienceCh6Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page9").then((m) => m.C6ScienceCh6Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page10").then((m) => m.C6ScienceCh6Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch6-page11").then((m) => m.C6ScienceCh6Page11),
    ),
  },
  "6-Science-ch7": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page1").then((m) => m.C6ScienceCh7Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page2").then((m) => m.C6ScienceCh7Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page3").then((m) => m.C6ScienceCh7Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page4").then((m) => m.C6ScienceCh7Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page5").then((m) => m.C6ScienceCh7Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page6").then((m) => m.C6ScienceCh7Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page7").then((m) => m.C6ScienceCh7Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page8").then((m) => m.C6ScienceCh7Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch7-page9").then((m) => m.C6ScienceCh7Page9),
    ),
  },
  "6-Science-ch8": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page1").then((m) => m.C6ScienceCh8Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page2").then((m) => m.C6ScienceCh8Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page3").then((m) => m.C6ScienceCh8Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page4").then((m) => m.C6ScienceCh8Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page5").then((m) => m.C6ScienceCh8Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page6").then((m) => m.C6ScienceCh8Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page7").then((m) => m.C6ScienceCh8Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page8").then((m) => m.C6ScienceCh8Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch8-page9").then((m) => m.C6ScienceCh8Page9),
    ),
  },
  "6-Science-ch9": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page1").then((m) => m.C6ScienceCh9Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page2").then((m) => m.C6ScienceCh9Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page3").then((m) => m.C6ScienceCh9Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page4").then((m) => m.C6ScienceCh9Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page5").then((m) => m.C6ScienceCh9Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page6").then((m) => m.C6ScienceCh9Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page7").then((m) => m.C6ScienceCh9Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page8").then((m) => m.C6ScienceCh9Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page9").then((m) => m.C6ScienceCh9Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch9-page10").then((m) => m.C6ScienceCh9Page10),
    ),
  },
  "6-Science-ch10": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page1").then((m) => m.C6ScienceCh10Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page2").then((m) => m.C6ScienceCh10Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page3").then((m) => m.C6ScienceCh10Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page4").then((m) => m.C6ScienceCh10Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page5").then((m) => m.C6ScienceCh10Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page6").then((m) => m.C6ScienceCh10Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page7").then((m) => m.C6ScienceCh10Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page8").then((m) => m.C6ScienceCh10Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page9").then((m) => m.C6ScienceCh10Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page10").then((m) => m.C6ScienceCh10Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page11").then((m) => m.C6ScienceCh10Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch10-page12").then((m) => m.C6ScienceCh10Page12),
    ),
  },
  "6-Science-ch11": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page1").then((m) => m.C6ScienceCh11Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page2").then((m) => m.C6ScienceCh11Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page3").then((m) => m.C6ScienceCh11Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page4").then((m) => m.C6ScienceCh11Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page5").then((m) => m.C6ScienceCh11Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page6").then((m) => m.C6ScienceCh11Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page7").then((m) => m.C6ScienceCh11Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch11-page8").then((m) => m.C6ScienceCh11Page8),
    ),
  },
  "6-Science-ch12": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page1").then((m) => m.C6ScienceCh12Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page2").then((m) => m.C6ScienceCh12Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page3").then((m) => m.C6ScienceCh12Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page4").then((m) => m.C6ScienceCh12Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page5").then((m) => m.C6ScienceCh12Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page6").then((m) => m.C6ScienceCh12Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page7").then((m) => m.C6ScienceCh12Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page8").then((m) => m.C6ScienceCh12Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch12-page9").then((m) => m.C6ScienceCh12Page9),
    ),
  },
  "6-Science-ch13": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page1").then((m) => m.C6ScienceCh13Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page2").then((m) => m.C6ScienceCh13Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page3").then((m) => m.C6ScienceCh13Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page4").then((m) => m.C6ScienceCh13Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page5").then((m) => m.C6ScienceCh13Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page6").then((m) => m.C6ScienceCh13Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page7").then((m) => m.C6ScienceCh13Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page8").then((m) => m.C6ScienceCh13Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page9").then((m) => m.C6ScienceCh13Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page10").then((m) => m.C6ScienceCh13Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page11").then((m) => m.C6ScienceCh13Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page12").then((m) => m.C6ScienceCh13Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page13").then((m) => m.C6ScienceCh13Page13),
    ),
    14: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page14").then((m) => m.C6ScienceCh13Page14),
    ),
    15: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch13-page15").then((m) => m.C6ScienceCh13Page15),
    ),
  },
  "6-Science-ch14": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page1").then((m) => m.C6ScienceCh14Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page2").then((m) => m.C6ScienceCh14Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page3").then((m) => m.C6ScienceCh14Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page4").then((m) => m.C6ScienceCh14Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page5").then((m) => m.C6ScienceCh14Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page6").then((m) => m.C6ScienceCh14Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page7").then((m) => m.C6ScienceCh14Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page8").then((m) => m.C6ScienceCh14Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page9").then((m) => m.C6ScienceCh14Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page10").then((m) => m.C6ScienceCh14Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page11").then((m) => m.C6ScienceCh14Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page12").then((m) => m.C6ScienceCh14Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page13").then((m) => m.C6ScienceCh14Page13),
    ),
    14: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch14-page14").then((m) => m.C6ScienceCh14Page14),
    ),
  },
  "6-Science-ch15": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page1").then((m) => m.C6ScienceCh15Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page2").then((m) => m.C6ScienceCh15Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page3").then((m) => m.C6ScienceCh15Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page4").then((m) => m.C6ScienceCh15Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page5").then((m) => m.C6ScienceCh15Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page6").then((m) => m.C6ScienceCh15Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page7").then((m) => m.C6ScienceCh15Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page8").then((m) => m.C6ScienceCh15Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page9").then((m) => m.C6ScienceCh15Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page10").then((m) => m.C6ScienceCh15Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page11").then((m) => m.C6ScienceCh15Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch15-page12").then((m) => m.C6ScienceCh15Page12),
    ),
  },
  "6-Science-ch16": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page1").then((m) => m.C6ScienceCh16Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page2").then((m) => m.C6ScienceCh16Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page3").then((m) => m.C6ScienceCh16Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page4").then((m) => m.C6ScienceCh16Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page5").then((m) => m.C6ScienceCh16Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page6").then((m) => m.C6ScienceCh16Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page7").then((m) => m.C6ScienceCh16Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page8").then((m) => m.C6ScienceCh16Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page9").then((m) => m.C6ScienceCh16Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page10").then((m) => m.C6ScienceCh16Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page11").then((m) => m.C6ScienceCh16Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page12").then((m) => m.C6ScienceCh16Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page13").then((m) => m.C6ScienceCh16Page13),
    ),
    14: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page14").then((m) => m.C6ScienceCh16Page14),
    ),
    15: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page15").then((m) => m.C6ScienceCh16Page15),
    ),
    16: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page16").then((m) => m.C6ScienceCh16Page16),
    ),
    17: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page17").then((m) => m.C6ScienceCh16Page17),
    ),
    18: dynamic(() =>
      import("@/components/reader/content/C6-science/c6-science-ch16-page18").then((m) => m.C6ScienceCh16Page18),
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
    9: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page9").then((m) => m.C6TeluguCh6Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch6-page10").then((m) => m.C6TeluguCh6Page10),
    ),
  },
  "6-Telugu-ch7": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page1").then((m) => m.C6TeluguCh7Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page2").then((m) => m.C6TeluguCh7Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page3").then((m) => m.C6TeluguCh7Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page4").then((m) => m.C6TeluguCh7Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page5").then((m) => m.C6TeluguCh7Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page6").then((m) => m.C6TeluguCh7Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page7").then((m) => m.C6TeluguCh7Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page8").then((m) => m.C6TeluguCh7Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-telugu/c6-telugu-ch7-page9").then((m) => m.C6TeluguCh7Page9),
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
    6: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page6").then((m) => m.C6MathsCh1Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page7").then((m) => m.C6MathsCh1Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page8").then((m) => m.C6MathsCh1Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page9").then((m) => m.C6MathsCh1Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page10").then((m) => m.C6MathsCh1Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page11").then((m) => m.C6MathsCh1Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page12").then((m) => m.C6MathsCh1Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page13").then((m) => m.C6MathsCh1Page13),
    ),
    14: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page14").then((m) => m.C6MathsCh1Page14),
    ),
    15: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch1-page15").then((m) => m.C6MathsCh1Page15),
    ),
  },
  "6-Maths-ch2": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page1").then((m) => m.C6MathsCh2Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page2").then((m) => m.C6MathsCh2Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page3").then((m) => m.C6MathsCh2Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page4").then((m) => m.C6MathsCh2Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page5").then((m) => m.C6MathsCh2Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page6").then((m) => m.C6MathsCh2Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page7").then((m) => m.C6MathsCh2Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page8").then((m) => m.C6MathsCh2Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page9").then((m) => m.C6MathsCh2Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page10").then((m) => m.C6MathsCh2Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page11").then((m) => m.C6MathsCh2Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page12").then((m) => m.C6MathsCh2Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch2-page13").then((m) => m.C6MathsCh2Page13),
    ),
  },
  "6-Maths-ch3": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page1").then((m) => m.C6MathsCh3Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page2").then((m) => m.C6MathsCh3Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page3").then((m) => m.C6MathsCh3Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page4").then((m) => m.C6MathsCh3Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page5").then((m) => m.C6MathsCh3Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page6").then((m) => m.C6MathsCh3Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page7").then((m) => m.C6MathsCh3Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page8").then((m) => m.C6MathsCh3Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page9").then((m) => m.C6MathsCh3Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page10").then((m) => m.C6MathsCh3Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page11").then((m) => m.C6MathsCh3Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page12").then((m) => m.C6MathsCh3Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page13").then((m) => m.C6MathsCh3Page13),
    ),
    14: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page14").then((m) => m.C6MathsCh3Page14),
    ),
    15: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page15").then((m) => m.C6MathsCh3Page15),
    ),
    16: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page16").then((m) => m.C6MathsCh3Page16),
    ),
    17: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page17").then((m) => m.C6MathsCh3Page17),
    ),
    18: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page18").then((m) => m.C6MathsCh3Page18),
    ),
    19: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page19").then((m) => m.C6MathsCh3Page19),
    ),
    20: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch3-page20").then((m) => m.C6MathsCh3Page20),
    ),
  },
  "6-Maths-ch4": {
    1: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch4-page1").then((m) => m.C6MathsCh4Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C6-maths/c6-maths-ch4-page2").then((m) => m.C6MathsCh4Page2),
    ),
  },
  "8-English-ch1": {
    1: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page1").then((m) => m.C8EnglishCh1Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page2").then((m) => m.C8EnglishCh1Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page3").then((m) => m.C8EnglishCh1Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page4").then((m) => m.C8EnglishCh1Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page5").then((m) => m.C8EnglishCh1Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page6").then((m) => m.C8EnglishCh1Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page7").then((m) => m.C8EnglishCh1Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page8").then((m) => m.C8EnglishCh1Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page9").then((m) => m.C8EnglishCh1Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page10").then((m) => m.C8EnglishCh1Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page11").then((m) => m.C8EnglishCh1Page11),
    ),
    12: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page12").then((m) => m.C8EnglishCh1Page12),
    ),
    13: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page13").then((m) => m.C8EnglishCh1Page13),
    ),
    14: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch1-page14").then((m) => m.C8EnglishCh1Page14),
    ),
  },
  "8-English-ch2": {
    1: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page1").then((m) => m.C8EnglishCh2Page1),
    ),
    2: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page2").then((m) => m.C8EnglishCh2Page2),
    ),
    3: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page3").then((m) => m.C8EnglishCh2Page3),
    ),
    4: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page4").then((m) => m.C8EnglishCh2Page4),
    ),
    5: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page5").then((m) => m.C8EnglishCh2Page5),
    ),
    6: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page6").then((m) => m.C8EnglishCh2Page6),
    ),
    7: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page7").then((m) => m.C8EnglishCh2Page7),
    ),
    8: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page8").then((m) => m.C8EnglishCh2Page8),
    ),
    9: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page9").then((m) => m.C8EnglishCh2Page9),
    ),
    10: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page10").then((m) => m.C8EnglishCh2Page10),
    ),
    11: dynamic(() =>
      import("@/components/reader/content/C8-English/c8-english-ch2-page11").then((m) => m.C8EnglishCh2Page11),
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
