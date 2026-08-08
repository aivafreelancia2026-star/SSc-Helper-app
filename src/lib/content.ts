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
  indexData?: Array<{
    unit: string;
    chapterNo: number;
    title: string;
    pageNo: number;
    periods: number | null;
    subArea: string | null;
  }>;
};

export type ClassContent = {
  class: number;
  subject: string;
  subAreas: string[];
  totalPages: number;
  chapters: Chapter[];
};

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
