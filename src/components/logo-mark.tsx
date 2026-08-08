const SIZES = {
  sm: "h-9 w-9 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-16 w-16 text-2xl",
};

export function LogoMark({ size = "md" }: { size?: keyof typeof SIZES }) {
  const dimension = SIZES[size];

  return (
    <div
      className={`${dimension} mx-auto flex items-center justify-center rounded-[28%] font-heading font-bold text-on-primary`}
      style={{
        background: "linear-gradient(155deg, var(--color-primary), var(--color-secondary))",
        boxShadow:
          "6px 6px 14px rgba(79,70,229,0.35), -4px -4px 10px rgba(255,255,255,0.6), inset 1px 1px 2px rgba(255,255,255,0.4)",
      }}
    >
      S
    </div>
  );
}

export function BackgroundBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-blob-drift absolute -left-16 -top-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-secondary)" }}
      />
      <div
        className="animate-blob-drift absolute -bottom-24 -right-10 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-accent)", animationDelay: "2s" }}
      />
    </div>
  );
}
