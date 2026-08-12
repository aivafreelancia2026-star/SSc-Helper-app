// "What we have learnt" — the bulleted chapter recap that appears at the
// end of every textbook chapter.
export function SummaryBox({ title = "What we have learnt", points }: { title?: string; points: string[] }) {
  return (
    <div className="w-full space-y-2 rounded-[16px] border-2 border-primary/40 bg-primary/5 p-4">
      <p className="font-heading text-sm font-bold text-primary">{title}</p>
      <ul className="list-disc space-y-1.5 pl-5 font-body text-sm leading-relaxed text-foreground/80">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
