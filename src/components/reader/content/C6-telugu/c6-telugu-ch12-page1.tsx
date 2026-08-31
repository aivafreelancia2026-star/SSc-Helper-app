import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఎవరున్నారు?",
  "బొమ్మలోని వ్యక్తి ఏమి చేసి ఉండవచ్చు?",
  "బొమ్మలోని వ్యక్తి చేసిన పనిని మీరు అంగీకరిస్తారా? ఎందుకు?",
  "ప్రకృతిని కాపాడాలంటే ఏమి చేయాలి?",
];

// Book page 118 (PDF/app P127) — Chapter 12 title page: "కాపాడుకుందాం"
// (Let's Protect), a సంభాషణ (dialogue) about environmental protection.
export function C6TeluguCh12Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">12</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">కాపాడుకుందాం</h2>
            <p className="mt-2 text-lg font-semibold">సంభాషణ</p>
          </div>
        </div>
      </section>

      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <FigureNote emoji="🌧️🍂😢🪵" caption="ఆకుగొడుగుతో వర్షంలో నిలబడి, నరికేసిన చెట్ల మొదళ్ల మధ్య దుఃఖిస్తున్న వ్యక్తి చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch12-page1-q${index + 1}`}
              quickWords={["ప్రకృతి", "చెట్లు", "కాపాడాలి"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
