import type { ComponentType } from "react";
import { C6ScienceCh1Page1 } from "@/components/reader/content/c6-science-ch1-page1";
import { C6ScienceCh1Page2 } from "@/components/reader/content/c6-science-ch1-page2";
import { C6ScienceCh1Page3 } from "@/components/reader/content/c6-science-ch1-page3";
import { C6ScienceCh1Page4 } from "@/components/reader/content/c6-science-ch1-page4";
import { C6ScienceCh1Page5 } from "@/components/reader/content/c6-science-ch1-page5";

// Keyed by chapter id + page-within-that-chapter (1-based), NOT the book's
// absolute page number — chapter page ranges have already shifted once
// (see the intro/index overlap fix) and will again as more chapters get
// real content, so content must stay addressable independent of that.
const REGISTRY: Record<string, Record<number, ComponentType>> = {
  "6-Science-ch1": {
    1: C6ScienceCh1Page1,
    2: C6ScienceCh1Page2,
    3: C6ScienceCh1Page3,
    4: C6ScienceCh1Page4,
    5: C6ScienceCh1Page5,
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
