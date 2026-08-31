import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో మీకు ఏమేమి కనిపిస్తున్నాయి?",
  "ప్రజలకు చెరువుల అవసరం ఏమిటి?",
  "ప్రస్తుతం చెరువుల పరిస్థితి ఎట్లా ఉన్నది?",
  "చెరువు గురించి మీకు తెలిసిన విషయాలు చెప్పండి.",
];

// Book page 74 (PDF/app P83) — Chapter 8 title page: "చెరువు" (The Lake),
// written as a స్వగతం (first-person monologue) where the lake itself
// narrates. Illustration replaced with an emoji stand-in per policy.
export function C6TeluguCh8Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">8</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">చెరువు</h2>
          </div>
        </div>
      </section>

      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <FigureNote
        emoji="🏞️🛶🏘️🌳"
        caption="పడవతో కూడిన అందమైన చెరువు చిత్రం — గడ్డి కప్పు ఇళ్లు, చెట్లతో కూడిన గ్రామ దృశ్యం"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch8-page1-q${index + 1}`}
              quickWords={["చెరువు", "నీరు", "గ్రామం", "ప్రజలు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-5 py-4">
          తెలంగాణ ప్రాంతంలో దాదాపు ప్రతి ఊరిలోను చెరువులున్నాయి. అవి ప్రజావసరాలకు, సంస్కృతీ సంప్రదాయాలకు
          నిలయాలు. పశుపక్షి మృగ కీటకాలకు ఆవాసాలు. వృత్తులకు ఉనికిపట్టు. అటువంటి చెరువులను మనం
          సంరక్షించుకొంటే అవి మనను సంరక్షిస్తాయని తెల్పడము, తెలుగు భాషా సౌందర్యాన్ని పెంపొందించే జాతీయాలు,
          సామెతల గురించి తెలుపడం ఈ పాఠం ఉద్దేశం.
        </p>
      </section>
    </div>
  );
}
