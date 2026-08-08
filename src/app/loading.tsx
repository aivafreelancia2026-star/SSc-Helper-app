// Shown instantly on every navigation while (app)/layout.tsx's auth check
// and profile fetch (and any page-level data fetch below it) are still in
// flight — those are real network round-trips to Supabase, not something
// this can speed up, but showing feedback immediately instead of a blank
// screen is what actually fixes the "feels laggy" perception.
export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}
