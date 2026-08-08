// Standalone "Page: X/N" card, pinned to the top-right corner of the
// reader's own content area (its parent must be `relative`) rather than
// the viewport — fixed positioning made it overlap the persistent
// header/nav/class-selector stack above this content.
export function PageBadge({ page, totalPages }: { page: number; totalPages: number }) {
  return (
    <div className="absolute right-4 top-2 z-10 flex flex-col items-center gap-0.5 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-4 py-2.5 text-center shadow-[0_6px_16px_rgba(79,70,229,0.35)]">
      <span className="font-heading text-[10px] font-semibold uppercase tracking-wide text-on-primary/70">
        Page
      </span>
      <span className="font-heading text-lg font-bold leading-none text-on-primary">
        {page}/{totalPages}
      </span>
    </div>
  );
}
