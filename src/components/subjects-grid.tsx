"use client";

import { useState } from "react";
import { BookIcon } from "@/components/icons";
import { InfoModal } from "@/components/info-modal";
import type { Subject } from "@/lib/subjects";

export function SubjectsGrid({ subjects }: { subjects: Subject[] }) {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  return (
    <>
      <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-3">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            type="button"
            onClick={() => setActiveSubject(subject)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-[24px] border border-white/60 bg-white/80 p-4 text-center shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)] transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            <BookIcon className="h-6 w-6 text-primary" />
            <span className="font-heading text-sm font-semibold text-foreground">
              {subject.name}
            </span>
            {subject.subAreas && (
              <span className="font-body text-[10px] leading-tight text-foreground/40">
                {subject.subAreas.join(" · ")}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeSubject && (
        <InfoModal
          title={activeSubject.name}
          message={`${activeSubject.name} chapters aren't available yet — check back soon.`}
          onClose={() => setActiveSubject(null)}
        />
      )}
    </>
  );
}
