"use client";

import { useState } from "react";
import { CopyIcon, CheckCircleIcon } from "@/components/icons";
import { getPageId } from "@/lib/page-context";

// Standalone "Page: X/N" card with a copyable page id underneath, pinned to
// the top-right corner of the reader's own content area (its parent must be
// `relative`) rather than the viewport — fixed positioning made it overlap
// the persistent header/nav/class-selector stack above this content.
export function PageBadge({
  classGrade,
  subject,
  page,
  totalPages,
}: {
  classGrade: number;
  subject: string;
  page: number;
  totalPages: number;
}) {
  const [copied, setCopied] = useState(false);
  const pageId = getPageId(classGrade, subject, page);

  async function handleCopy() {
    await navigator.clipboard.writeText(pageId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="absolute right-4 top-2 z-10 flex flex-col items-center gap-1 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-4 py-2.5 text-center shadow-[0_6px_16px_rgba(79,70,229,0.35)]">
      <span className="font-heading text-[10px] font-semibold uppercase tracking-wide text-on-primary/70">
        Page
      </span>
      <span className="font-heading text-lg font-bold leading-none text-on-primary">
        {page}/{totalPages}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy page id ${pageId}`}
        className="mt-0.5 flex cursor-pointer items-center gap-1 rounded-full bg-white/15 px-2 py-1 font-mono text-[9px] font-semibold text-on-primary transition-colors hover:bg-white/25"
      >
        {copied ? (
          <>
            <CheckCircleIcon className="h-3 w-3" />
            Copied
          </>
        ) : (
          <>
            <CopyIcon className="h-3 w-3" />
            {pageId}
          </>
        )}
      </button>
    </div>
  );
}
