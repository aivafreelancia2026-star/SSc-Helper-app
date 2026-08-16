import Image from "next/image";

const SIZES = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function LogoMark({ size = "md" }: { size?: keyof typeof SIZES }) {
  const dimension = SIZES[size];

  return (
    <div
      className={`${dimension} mx-auto overflow-hidden rounded-[28%] bg-[#020817] shadow-[6px_6px_14px_rgba(79,70,229,0.25),-4px_-4px_10px_rgba(255,255,255,0.55)]`}
      aria-label="SSC Helper"
    >
      <Image
        src="/assets/brand/ssc-helper-icon.png"
        alt=""
        width={1024}
        height={1024}
        priority={size === "lg"}
        className="h-full w-full object-cover"
      />
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
