export function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border-2 border-primary/30 bg-primary/5 px-4 py-3 text-center">
      <p className="font-body text-xs italic text-primary/80">{children}</p>
    </div>
  );
}
