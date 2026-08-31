import { FigureNote } from "@/components/reader/figure-note";

// Book page 78 (PDF/app P87) — narration continues (lotus flowers,
// gratitude to the people who built the lake, a proverb about unity).
export function C6TeluguCh8Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          తనలో అందంగా విచ్చుకున్న తామరపూలను సిగలో పెట్టుకున్నట్లుగా చెరువు వర్ణించుకుంటుంది. తనను
          నిర్మించడానికి ప్రజలు పడ్డ కష్టాన్ని గుర్తుచేసుకుంటూ, 'కలసి ఉంటే కలదు సుఖం' అని పెద్దలు
          చెప్పిన మాటను గుర్తుచేస్తుంది — మత్స్యకారులు తనలో చేపలు పట్టడం, మహిళలు బుట్టలతో అక్కడే
          నిలబడటం లాంటి దృశ్యాలను వివరిస్తుంది.
        </p>
      </section>

      <FigureNote
        emoji="🎣🐟🧺👩" caption="వలతో చేపలు పడుతున్న మత్స్యకారులు, బుట్టలతో పక్కనే నిలబడిన మహిళలు" />
    </div>
  );
}
