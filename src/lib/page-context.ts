import { PAGES } from "@/lib/pages";

// Human-readable "where the user is" label for feedback — the raw pathname
// alone isn't enough for /reader, since which page/chapter you're on lives
// in the query string (?class=&subject=&page=), not the route itself.
export function getPageContextLabel(pathname: string, searchParams: URLSearchParams): string {
  if (pathname === "/reader") {
    const classGrade = searchParams.get("class");
    const subject = searchParams.get("subject");
    const page = searchParams.get("page");
    const total = searchParams.get("total");
    if (classGrade && subject && page) {
      return `Class ${classGrade} ${subject} — Page ${page}${total ? `/${total}` : ""}`;
    }
    return "Reader";
  }

  if (pathname === "/dashboard") {
    const classGrade = searchParams.get("class");
    return classGrade ? `Dashboard — Class ${classGrade}` : "Dashboard";
  }

  const entry = Object.values(PAGES).find((p) => p.route === pathname);
  return entry?.description ?? pathname;
}
