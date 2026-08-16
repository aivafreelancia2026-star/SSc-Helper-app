import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఎవరెవరు ఏం చేస్తున్నారో చెప్పండి.",
  "వాటిలో మీరు ఆడేవి? ఆడనివి?",
  "మీకు ఏ ఆట అంటే ఇష్టం? ఆ ఆటను ఎట్లా ఆడుతారో చెప్పండి.",
];

export function C6TeluguCh6Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">6</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">పోతన బాల్యం</h2>
            <p className="mt-2 text-lg font-semibold">డా॥ వానమామలై వరదాచార్యులు</p>
          </div>
        </div>
      </section>
      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <Image src="/assets/textbooks/c6-telugu/ch6/page-63-picture.webp" alt="పిల్లలు ఆటలు ఆడుతున్న చిత్రం" width={700} height={605} priority className="mx-auto h-auto w-full max-w-3xl rounded-[18px] border border-border/60 bg-white shadow-sm" />
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox key={question} question={`${index + 1}. ${question}`} storageKey={`c6-telugu-ch6-page1-q${index + 1}`} quickWords={["పిల్లలు", "ఆటలు", "ఆడుతున్నారు", "ఇష్టం", "చెప్పండి"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
