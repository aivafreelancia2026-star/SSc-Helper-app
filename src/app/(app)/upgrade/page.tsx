import { BackgroundBlobs, LogoMark } from "@/components/logo-mark";
import { PAGES } from "@/lib/pages";

const AI_FEATURES = [
  "AI reads the current textbook page and explains it in simple words",
  "Ask doubts from the lesson while studying",
  "Practice questions generated from the page",
  "Short summaries, meanings, and revision help",
  "Extra support for Telugu answers and writing practice",
];

const COMING_FEATURES = [
  "Page-wise AI tutor",
  "Voice-style explanation flow",
  "Homework and revision tasks",
  "Personal weak-topic practice",
];

const PLANS = [
  {
    name: "Base",
    price: "₹69",
    note: "For one student",
    badge: "Base plan",
    highlight: false,
    features: ["Page-reading AI tutor", "Ask lesson doubts", "Practice from current page"],
  },
  {
    name: "Plus",
    price: "₹79",
    note: "More guided practice",
    badge: "Popular",
    highlight: true,
    features: ["Everything in Base", "More revision tasks", "Better writing support"],
  },
  {
    name: "Pro",
    price: "₹99",
    note: "Full AI learning support",
    badge: "Best value",
    highlight: false,
    features: ["Everything in Plus", "Weak-topic practice", "Deeper answer help"],
  },
];

export default function UpgradePage() {
  return (
    <main data-page-id={PAGES.upgrade.id} className="relative min-h-full overflow-hidden px-4 py-6 pb-28 sm:px-6">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-[32px] border border-white/60 bg-white/85 p-6 shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm lg:p-8">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size="md" />
              <span className="rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-bold text-primary">
                Premium AI
              </span>
            </div>

            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Unlock SSC Helper AI
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/65 sm:text-lg">
              Give students an AI tutor that reads the page they are studying, explains it clearly, and helps them
              practice with lesson-based tasks.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-[28px] border bg-white/90 p-5 shadow-[8px_8px_20px_rgba(79,70,229,0.1),-6px_-6px_16px_rgba(255,255,255,0.75)] ${
                  plan.highlight ? "border-primary/45 ring-4 ring-primary/10" : "border-white/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-xl font-bold text-foreground">{plan.name}</p>
                    <div className="mt-2 flex items-end gap-1">
                      <span className="font-heading text-5xl font-bold text-primary">{plan.price}</span>
                      <span className="pb-2 text-sm font-semibold text-foreground/55">/ month</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-foreground/55">{plan.note}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      plan.highlight ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-2 rounded-[14px] bg-primary/5 px-3 py-2">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <p className="text-sm font-semibold leading-6 text-foreground/75">{feature}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full cursor-pointer rounded-[20px] py-3.5 font-heading text-base font-bold transition-all duration-150 ease-out active:translate-y-1 focus-visible:outline-none focus-visible:ring-4 ${
                    plan.highlight
                      ? "bg-accent text-on-primary shadow-[0_6px_0_#c2410c,0_10px_18px_rgba(234,88,12,0.35)] hover:brightness-105 active:shadow-[0_2px_0_#c2410c,0_4px_10px_rgba(234,88,12,0.35)] focus-visible:ring-accent/30"
                      : "border-2 border-border bg-white text-foreground shadow-[0_4px_0_rgba(79,70,229,0.14)] hover:bg-muted active:shadow-[0_1px_0_rgba(79,70,229,0.14)] focus-visible:ring-primary/25"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-foreground/50">Payment connection will be enabled before launch.</p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[8px_8px_20px_rgba(79,70,229,0.1),-6px_-6px_16px_rgba(255,255,255,0.75)] sm:p-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">What AI will do</h2>
            <div className="mt-4 grid gap-3">
              {AI_FEATURES.map((feature) => (
                <div key={feature} className="flex gap-3 rounded-[18px] border border-border/70 bg-white/75 p-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-6 text-foreground/75">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[8px_8px_20px_rgba(79,70,229,0.1),-6px_-6px_16px_rgba(255,255,255,0.75)] sm:p-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">Coming with AI</h2>
            <div className="mt-4 space-y-3">
              {COMING_FEATURES.map((feature) => (
                <p key={feature} className="rounded-[16px] bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
