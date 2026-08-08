"use client";

import { useRouter } from "next/navigation";
import { BookIcon } from "@/components/icons";
import type { Subject } from "@/lib/subjects";
import type { Role } from "@/lib/profile";

export function SubjectsGrid({
  subjects,
  classGrade,
  role,
}: {
  subjects: Subject[];
  classGrade: number;
  role: Role;
}) {
  const router = useRouter();
  const showFilename = role === "founder" || role === "developer";

  function handleSubjectClick(subjectName: string) {
    router.push(`/reader?class=${classGrade}&subject=${encodeURIComponent(subjectName)}`);
  }

  function SubjectCard({ subject }: { subject: Subject }) {
    return (
      <button
        type="button"
        onClick={() => handleSubjectClick(subject.name)}
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-[24px] border border-white/60 bg-white/80 p-4 text-center shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)] transition-transform duration-150 ease-out active:scale-95 hover:shadow-[8px_8px_18px_rgba(79,70,229,0.15),-5px_-5px_12px_rgba(255,255,255,0.8)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
      >
        <BookIcon className="h-6 w-6 text-primary" />
        <span className="font-heading text-sm font-semibold text-foreground">{subject.name}</span>
        {subject.subAreas && (
          <span className="font-body text-[10px] leading-tight text-foreground/40">
            {subject.subAreas.join(" · ")}
          </span>
        )}
        {showFilename && (
          <span className="font-mono text-[9px] leading-tight text-foreground/35">
            {subject.file}
          </span>
        )}
      </button>
    );
  }

  // An odd subject count (e.g. Classes 8-10 have 7) leaves a lone card that
  // grid placement would push to the left edge of its own row — centering
  // it below the grid instead reads better than a left-stranded card.
  const isOdd = subjects.length % 2 !== 0;
  const gridSubjects = isOdd ? subjects.slice(0, -1) : subjects;
  const trailingSubject = isOdd ? subjects[subjects.length - 1] : null;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-lg">
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {gridSubjects.map((subject) => (
          <SubjectCard key={subject.name} subject={subject} />
        ))}
      </div>
      {trailingSubject && (
        <div className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)]">
          <SubjectCard subject={trailingSubject} />
        </div>
      )}
    </div>
  );
}
