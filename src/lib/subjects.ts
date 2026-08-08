import class6 from "@/data/classes/C6.json";
import class7 from "@/data/classes/C7.json";
import class8 from "@/data/classes/C8.json";
import class9 from "@/data/classes/C9.json";
import class10 from "@/data/classes/C10.json";

export type Subject = {
  name: string;
  file: string;
  subAreas?: string[];
};

type ClassHub = {
  class: number;
  subjects: { name: string; file: string; subAreas?: string[] }[];
};

// Source of truth is the JSON hub files under src/data/classes/ — one hub
// per class, one file per subject (currently just `{ chapters: [] }`
// placeholders, ready for the PDF-extraction pipeline to fill in). Classes
// not listed here fall through to null ("content coming soon") rather than
// guessing they match another class.
const HUBS: Partial<Record<number, ClassHub>> = {
  6: class6,
  7: class7,
  8: class8,
  9: class9,
  10: class10,
};

export function getSubjectsForClass(classGrade: number): Subject[] | null {
  const hub = HUBS[classGrade];
  if (!hub) return null;
  return hub.subjects.map(({ name, file, subAreas }) => ({ name, file, subAreas }));
}
