import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఎవరెవరున్నారు?",
  "పిల్లవాడు ఏం చేస్తున్నాడు?",
  "ఆ పిల్లవాడిని చూస్తే మీకేమనిపిస్తున్నది?",
  "ఇట్లాంటివాళ్ళ జీవితం ఎట్లా ఉంటుందని అనుకుంటున్నారు?",
];

// Book page 108 (PDF/app P117) — Chapter 11 title page: "పల్లెటూరి
// పిల్లగాడా!" (Village Boy!) by సుద్దాల హనుమంతు, a song about child
// labor.
export function C6TeluguCh11Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">11</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">పల్లెటూరి పిల్లగాడా!</h2>
            <p className="mt-2 text-lg font-semibold">సుద్దాల హనుమంతు</p>
          </div>
        </div>
      </section>

      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <FigureNote emoji="🔧🚲👦🏪" caption="సైకిల్ బాగుచేస్తున్న మెకానిక్‌కు సాయం చేస్తున్న చిన్నపిల్లవాడి చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch11-page1-q${index + 1}`}
              quickWords={["పిల్లవాడు", "పని", "బాధ", "జీవితం"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-5 py-4">
          గ్రామాల్లోని కొంతమంది బీదపిల్లలు బడికి పోకుండా పశువులను కాస్తున్నారు. కూలి పనులకు
          పోతున్నారు. ఎండలో వానలో తిరుగుతూ బాధలు పడుతున్నారు. అర్ధాకలితో జీవిస్తున్నారు. వారు పడే
          కష్టాలను, కన్నీళ్లను మనకు తెలియజేస్తూ అటువంటి బాలకార్మిక వ్యవస్థను నిర్మూలించాలనే
          ఆలోచనల్ని రేకెత్తింప చేయడమే ఈ పాఠం ఉద్దేశం.
        </p>
      </section>
    </div>
  );
}
