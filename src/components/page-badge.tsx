// Pinned page-position indicator, shown in the same spot on every reader
// page (index and chapter views alike) rather than each view drawing its
// own inline badge in a slightly different place.
export function PageBadge({ page, totalPages }: { page: number; totalPages: number }) {
  return (
    <span className="fixed right-4 top-24 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-center font-heading text-xs font-bold leading-tight text-on-primary shadow-[0_4px_12px_rgba(79,70,229,0.35)]">
      {page}/{totalPages}
    </span>
  );
}
