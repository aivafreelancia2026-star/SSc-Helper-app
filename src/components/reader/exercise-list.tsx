// "Improve your learning" — the numbered end-of-chapter question set.
// Questions are long-form/discussion-style (no single right answer, meant
// for a notebook or class discussion), so this is read-only text, not a
// gradable input like FillInTable. Sub-items (a, b, c…) are optional and
// render as a lettered sub-list under their parent question; `extra` renders
// arbitrary content (e.g. a diagram) below a question's own text.
export type ExerciseItem = {
  text: string;
  subItems?: string[];
  extra?: React.ReactNode;
};

export function ExerciseList({
  title = "Improve your learning",
  items,
  start,
}: {
  title?: string;
  items: ExerciseItem[];
  start?: number;
}) {
  return (
    <div className="w-full space-y-3">
      {title && <p className="text-center font-heading text-base font-bold text-primary">{title}</p>}
      <ol
        start={start}
        className="list-decimal space-y-3 pl-5 font-body text-sm leading-relaxed text-foreground/90"
      >
        {items.map((item, i) => (
          <li key={i}>
            {item.text}
            {item.subItems && (
              <ol className="mt-1 list-[lower-alpha] space-y-1 pl-5">
                {item.subItems.map((sub, j) => (
                  <li key={j}>{sub}</li>
                ))}
              </ol>
            )}
            {item.extra}
          </li>
        ))}
      </ol>
    </div>
  );
}
