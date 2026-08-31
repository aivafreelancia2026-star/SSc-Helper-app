import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'పాలబుగ్గల జీతగాడు' అంటే నీకు ఏమని అర్థం అయింది?",
  "'దొడ్డికీవే దొరవైపోయావా' అని కవి పిల్లవాడిని ఎందుకు అన్నాడు?",
  "'చేతికఱ్ఱే తోడయ్యిందా?' అనడంలో అర్థం ఏమిటి?",
];

// Book page 110 (PDF/app P119) — first stanza (thematic summary, not
// transcribed — it's a song/poem): the poet addresses a young cattle-
// herding boy with deep sympathy, noting how long it's been since he
// last drank milk himself, even as he tends the cattle that produce it.
export function C6TeluguCh11Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">చరణం I — భావం</h3>
        <p className="px-5 py-4">
          కవి ఒక చిన్న పల్లెటూరి పిల్లవాడిని — పశువులు కాసే బాలుడిని — ఆప్యాయంగా పలకరిస్తాడు. అతను
          రోజంతా పశువుల మధ్య, ఎండలో తిరుగుతూ, తానే పాలుత్రాగి ఎన్నాళ్లయిందో గుర్తులేని దీనస్థితిలో
          ఉన్నాడని కవి బాధపడతాడు. ఇంత చిన్నవయసులోనే జీతగానిగా మారిన ఆ బాలుని కష్టాన్ని, అతనికి
          తోడుగా ఉన్నదల్లా ఒక చేతికర్రేనని కవి వేదనతో వర్ణిస్తాడు.
        </p>
      </section>

      <FigureNote emoji="😢🐄🌵🥢" caption="కర్ర పట్టుకుని ఏడుస్తూ, తుమ్మచెట్ల మధ్య పశువులను మేపుతున్న చిన్నపిల్లవాడి చిత్రం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch11-page3-discuss-${i + 1}`}
              quickWords={["జీతగాడు", "పశువులు", "కష్టం", "బాధ"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
