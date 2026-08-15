import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఎవరెవరున్నారు? ఏం చేస్తున్నారు?",
  "ఉత్తరంలో ఏమి ఉండవచ్చు?",
  "మీమెప్పుడైనా ఉత్తరాలు రాయడం, చదవడం చేశారా?",
  "మీ ఊరి గురించి లేదా మీరు చూసిన ప్రాంతం గురించి ఎవరైనా ఉత్తరాలు రాశారా?",
];

export function C6TeluguCh4Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">
            4
          </div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">లేఖ</h2>
          </div>
        </div>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch4/page-39-picture.webp"
        alt="అమ్మమ్మతో కలిసి లేఖ చదువుతున్న బాలిక చిత్రం"
        width={770}
        height={770}
        priority
        className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="space-y-4">
        <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
          బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
        </h3>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page1-q${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
