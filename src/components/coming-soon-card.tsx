import { ClockIcon } from "@/components/icons";

// Placeholder shown wherever content hasn't been authored yet (a chapter
// page not yet built, a class/subject not yet available).
export function ComingSoonCard({
  message = "Our content is on its way — check back soon.",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ClockIcon className="h-6 w-6" />
      </div>
      <p className="font-heading text-base font-bold text-foreground">Coming soon</p>
      <p className="font-body text-sm text-foreground/60">{message}</p>
    </div>
  );
}
