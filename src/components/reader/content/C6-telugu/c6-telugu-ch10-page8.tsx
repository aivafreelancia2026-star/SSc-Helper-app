import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "పెద్దలు చెప్పిన మాట వినకపోవడం వల్ల ఎట్లాంటి ఇబ్బందులు వస్తాయి?",
  "మాయల ఫకీరు బాలనాగమ్మను ఎత్తుకుపోయిన సంఘటన వల్ల మీకు ఇతర కథలలోని ఇట్లాంటి సంఘటనలు గుర్తుకువస్తున్నాయా? చెప్పండి.",
];

// Book page 101 (PDF/app P110) — the fakir abducts Balanagamma; her son
// Balavaddiraju, now grown, sets out on a brave rescue mission, battling
// magical serpents along the way.
export function C6TeluguCh10Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          మాయల ఫకీరు బాలనాగమ్మను ఎత్తుకుపోతాడు. ఈలోగా బాలవద్దిరాజు పెద్దవాడై, తల్లిని రక్షించడానికి
          బయలుదేరతాడు. దారిలో అనేక ప్రమాదకరమైన మాయా జీవులను ఎదుర్కొంటూ, ధైర్యంగా ముందుకు సాగుతాడు.
        </p>
      </section>

      <FigureNote emoji="⚔️🐍🧑‍🎤" caption="బహుతలాల సర్పంతో పోరాడుతున్న యువ వీరుడి చిత్రం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch10-page8-discuss-${i + 1}`}
              quickWords={["బాలవద్దిరాజు", "సాహసం", "మాటవినడం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
