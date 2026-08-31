import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "కష్టాల్లో ఉన్న పిల్లలను తల్లిదండ్రులు ఎట్లా చూసుకుంటారు?",
  "ముఖ్యమైన పనులను అసమర్థులకు అప్పగిస్తే ఎట్లాంటి ఇబ్బందులు వస్తాయి?",
];

// Book page 99 (PDF/app P108) — the మాయల ఫకీరు (magical fakir) enters
// the story with his magical powers, setting up the central conflict.
// Section III begins.
export function C6TeluguCh10Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          ఇక్కడ కథలోకి మాయల ఫకీరు ప్రవేశిస్తాడు — తన మాయాశక్తులతో అందరినీ భయపెడుతూ ఉంటాడు. అతని
          భయంకర రూపాన్ని, అతని పెంపుడు కుక్కను కథ వర్ణిస్తుంది.
        </p>
      </section>

      <FigureNote emoji="🧙‍♂️🐕💀" caption="పుర్రెల దండతో, కుక్కతో కూడిన మాయల ఫకీరు చిత్రం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch10-page6-discuss-${i + 1}`}
              quickWords={["తల్లిదండ్రులు", "బాధ్యత", "అసమర్థులు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III</h3>
        <p className="px-5 py-4">కథ మరింత ముందుకు సాగుతుంది — మాయల ఫకీరు, రాజ్యంలోని పరిస్థితుల మధ్య ఉద్రిక్తత పెరుగుతుంది.</p>
      </section>
    </div>
  );
}
