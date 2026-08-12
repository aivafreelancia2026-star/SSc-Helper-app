// Same "not reproduced" reasoning as IconGallery, but for a single
// photographic figure rather than a grid of items — a large representative
// emoji stands in for the actual textbook photo, with the original caption
// kept so the reference is still meaningful.
export function FigureNote({ emoji, caption }: { emoji: string; caption: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-[16px] border border-border/50 bg-white/70 p-6">
      <span className="text-5xl">{emoji}</span>
      <p className="text-center font-body text-xs italic text-foreground/50">{caption}</p>
    </div>
  );
}
