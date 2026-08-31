import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "చీమలు అనవసరంగా తిరుగవు అనడంలో కవి ఉద్దేశం ఏమై ఉంటుంది?",
  "మనిషి కలసిమెలసి ఉండకపోవడానికి కారణాలు ఏమై ఉండవచ్చు?",
  "ఎవరో ఒక నేత లేకుండ ఇంత కట్టుదిట్టంగా మనుషులం నడవలేమని కవి ఎందుకన్నాడో ఆలోచించి చెప్పండి.",
];

// Book page 86 (PDF/app P95) — first stanza (thematic summary, not
// transcribed): the poet addresses a line of ants marching busily along.
export function C6TeluguCh9Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పద్యభాగం I — భావం</h3>
        <p className="px-5 py-4">
          కవి చిన్నచిన్న చీమలను చూసి, "ఎక్కడికి ఇంత హడావిడిగా వెళ్తున్నారు?" అని ప్రశ్నిస్తాడు. చీమలు
          ఎప్పుడూ ఖాళీగా తిరగవని, ప్రతి కదలికకూ ఒక ప్రయోజనం ఉంటుందని గమనిస్తాడు. అంత క్రమశిక్షణతో,
          ఎవరో ఒక నాయకుడు నడిపిస్తున్నట్లుగా వరుసతప్పకుండా అవి కదలడాన్ని చూసి, మనుషులు కూడా అంత
          ఐక్యతతో ఎందుకు మెలగలేకపోతున్నారో కవి ఆలోచిస్తాడు.
        </p>
      </section>

      <FigureNote emoji="🐜🐜🐜🌿" caption="మొక్కల దారి వెంబడి పొడవైన వరుసలో నడుస్తున్న చీమల దృశ్యం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch9-page3-discuss-${i + 1}`}
              quickWords={["చీమలు", "క్రమశిక్షణ", "ఐక్యత", "నాయకుడు"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
