import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఏమి జరుగుతున్నది?",
  "ప్రయాణికులు బస్సును ఎట్లా ఎక్కుతున్నారు?",
  "మన చుట్టూ నివసిస్తున్న ఏయే ప్రాణులు ఇట్లాంటి క్రమశిక్షణను కలిగి ఉంటాయి?",
];

// Book page 84 (PDF/app P93) — Chapter 9 title page: "చీమల బారు" (A Line
// of Ants) by పొట్లపల్లి రామారావు.
export function C6TeluguCh9Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">9</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">చీమల బారు</h2>
            <p className="mt-2 text-lg font-semibold">పొట్లపల్లి రామారావు</p>
          </div>
        </div>
      </section>

      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <FigureNote emoji="🚌🧍‍♂️🧍‍♀️➡️" caption="ఒక వరుసలో బస్సు ఎక్కుతున్న ప్రయాణికుల చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch9-page1-q${index + 1}`}
              quickWords={["బస్సు", "వరుస", "క్రమశిక్షణ", "చీమలు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-5 py-4">
          మన చుట్టూ ఉన్న ప్రాణులను చూసి క్రమశిక్షణ, నిరంతరం శ్రమించడం వంటి గుణాలను నేర్చుకోవాలని
          తెలియజేయడమే ఈ పాఠం ఉద్దేశం.
        </p>
      </section>
    </div>
  );
}
