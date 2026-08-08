export function CalloutBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full space-y-1 rounded-[16px] border-2 border-primary/40 bg-primary/5 p-4">
      <p className="font-heading text-sm font-bold text-primary">💡 {title}</p>
      <p className="font-body text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}
