import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఎవరెవరున్నారు? ఏం జరుగుతున్నది?",
  "బొమ్మ ద్వారా కథను ఊహించండి.",
  "ఇటువంటి కథలు మీకు తెలుసా? వీటిని ఏమంటారు?",
  "మన తెలంగాణ ప్రాంతంలోని జానపదకథలు మీకేమైనా తెలుసా? ఏమిటవి?",
];

// Book page 94 (PDF/app P103) — Chapter 10 title page: "బాలనాగమ్మ", a
// famous Telangana జానపదకథ (folk tale).
export function C6TeluguCh10Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">10</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">బాలనాగమ్మ</h2>
            <p className="mt-2 text-lg font-semibold">జానపదకథ</p>
          </div>
        </div>
      </section>

      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <FigureNote emoji="🧞‍♂️🧴👦✨" caption="ఒక సీసాలోంచి బయటకు వచ్చిన మాయల ఫకీరు, పిల్లవాడి ముందు కనిపిస్తున్న దృశ్యం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch10-page1-q${index + 1}`}
              quickWords={["జానపదకథ", "మాయలఫకీరు", "బాలనాగమ్మ"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
