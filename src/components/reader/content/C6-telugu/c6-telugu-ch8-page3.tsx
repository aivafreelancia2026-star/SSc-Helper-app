import { FigureNote } from "@/components/reader/figure-note";

// Book page 76 (PDF/app P85) — narration continues (thematic summary,
// not transcribed).
export function C6TeluguCh8Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          చెరువు తనగురించి మరిన్ని విషయాలు చెప్పుకుంటూ, రైతులు తనచుట్టూ పొలాలు దున్నుకోవడం, పశువులు
          మేపుకోవడం, సాయంకాలం అందమైన సూర్యాస్తమయ దృశ్యాన్ని చూసుకోవడం గురించి వివరిస్తుంది.
        </p>
      </section>

      <FigureNote
        emoji="🐂🌾🦆🌅"
        caption="ఎద్దులతో పొలం దున్నుతున్న రైతు, చెరువు దగ్గర బాతులు, సాయంకాల సూర్యాస్తమయ దృశ్యం"
      />
    </div>
  );
}
