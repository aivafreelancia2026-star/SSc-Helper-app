import { FigureNote } from "@/components/reader/figure-note";

// Book page 67 (PDF P76) — second verse (padyam II), thematic summary only
// (no verbatim transcription, per policy). No discussion box on this
// particular book page.
export function C6TeluguCh7Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పద్యం II — భావం</h3>
        <p className="px-5 py-4">
          భక్తితో సాయం చేస్తున్న ఉడుతను వానరాధిపతి గమనిస్తాడు — తన బలం, పరిమాణంతో పోలిస్తే ఏమాత్రం సరిపోదని
          తెలిసినా, ఆగకుండా నీళ్లలో మునిగి ఇసుకలో పొర్లి, వేగంగా వచ్చి ఆ ఇసుక రేణువులను వారధిపై రాలుస్తూనే
          ఉంటుంది. ఆమె నిష్కల్మషమైన భక్తిని, ప్రేమను గమనించిన శ్రీరాముడు ఆమెను చేతుల్లోకి తీసుకుని ప్రేమగా
          నిమురుతాడు. పక్కనే ఉన్న లక్ష్మణుడు, హనుమంతుడు ఈ దృశ్యాన్ని చూస్తుంటారు.
        </p>
      </section>

      <FigureNote
        emoji="🙏🐿️👑"
        caption="శ్రీరాముడు తన చేతుల్లోకి తీసుకున్న ఉడుతను ప్రేమగా నిమురుతుండగా, పక్కనే లక్ష్మణుడు, హనుమంతుడు చూస్తున్న దృశ్యం"
      />
    </div>
  );
}
