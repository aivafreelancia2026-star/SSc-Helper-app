export type Chapter = {
  id: string;
  unit: string;
  number: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  status: "coming-soon" | "available" | "completed";
  periods: number | null;
  subArea: "Physics" | "Chemistry" | "Biology" | null;
  // Language/literature subjects (Telugu, Hindi, English) use these instead
  // of periods/subArea — a lesson's poet/author and its genre, rather than
  // a science chapter's period count and topic area.
  author?: string | null;
  genre?: string | null;
  indexData?: Array<{
    unit: string;
    chapterNo: number | string;
    title: string;
    pageNo: number;
    periods: number | null;
    subArea: string | null;
    genre?: string;
  }>;
};

export type ClassContent = {
  class: number;
  subject: string;
  subAreas: string[];
  totalPages: number;
  chapters: Chapter[];
};

// Static imports (not a dynamic require) so Next.js can bundle each JSON
// properly — add a new line here whenever a class+subject combo gets real
// chapter data, same pattern as subjects.ts's HUBS lookup for the subject
// list itself.
import class6Science from "@/data/classes/C6-Science.json";
import class6Telugu from "@/data/classes/C6-Telugu.json";
import class6Hindi from "@/data/classes/C6-Hindi.json";
import class6Maths from "@/data/classes/C6-Maths.json";
import class8English from "@/data/classes/C8-English.json";

const CLASS_CONTENT: Partial<Record<string, ClassContent>> = {
  "6-Science": class6Science as ClassContent,
  "6-Telugu": class6Telugu as ClassContent,
  "6-Hindi": class6Hindi as ClassContent,
  "6-Maths": class6Maths as ClassContent,
  "8-English": class8English as ClassContent,
};

export function loadClassContent(classGrade: number, subject: string): ClassContent | null {
  const normalizedKey = `${classGrade}-${subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()}`;
  return CLASS_CONTENT[normalizedKey] ?? CLASS_CONTENT[`${classGrade}-${subject}`] ?? null;
}

export function getChapterById(content: ClassContent, id: string): Chapter | null {
  return content.chapters.find((c) => c.id === id) ?? null;
}

export function getChaptersByUnit(content: ClassContent, unit: string): Chapter[] {
  return content.chapters.filter((c) => c.unit === unit && c.id !== "index" && c.id !== "intro");
}

export function getChaptersBySubArea(
  content: ClassContent,
  subArea: "Physics" | "Chemistry" | "Biology",
): Chapter[] {
  return content.chapters.filter((c) => c.subArea === subArea);
}
