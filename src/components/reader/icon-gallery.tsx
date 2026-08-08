// Textbook photos aren't reproduced here (not ours to redistribute) —
// represented instead with an icon/emoji + label per item, laid out the
// same grid-with-caption way the book does.
export function IconGallery({
  items,
  caption,
}: {
  items: { emoji: string; label: string }[];
  caption: string;
}) {
  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 rounded-[12px] border border-border/50 bg-white/70 p-2"
          >
            <span className="text-3xl">{item.emoji}</span>
            <span className="text-center font-body text-[10px] leading-tight text-foreground/70">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center font-body text-xs italic text-foreground/50">{caption}</p>
    </div>
  );
}
