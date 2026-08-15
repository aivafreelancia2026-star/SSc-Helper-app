import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "మీన ఎవరికీ లేఖ రాస్తోంది?",
  "లేఖలో మొదటగా ఆమె ఏ యాత్ర గురించి చెబుతోంది?",
  "నాగార్జునసాగర్ ఆనకట్ట గురించి మీకు తెలిసిన రెండు విషయాలు రాయండి.",
];

export function C6TeluguCh4Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I</h3>
        <div className="grid gap-4 px-5 py-5 md:grid-cols-[0.85fr_1fr]">
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-41-writing.webp"
            alt="లేఖ రాస్తున్న బాలిక"
            width={435}
            height={470}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
          <div className="space-y-4">
            <p className="text-lg leading-loose">
              తేదీ 10.10.2014తో మొదలయ్యే ఈ లేఖలో మీన తన స్నేహితురాలు లతకు తెలంగాణలో చూసిన దర్శనీయ
              స్థలాల గురించి చెబుతోంది. యాత్రలో మొదటగా నాగార్జునసాగర్ ప్రాంతాన్ని గుర్తు చేస్తోంది.
            </p>
            <Image
              src="/assets/textbooks/c6-telugu/ch4/page-41-dam.webp"
              alt="నాగార్జునసాగర్ ఆనకట్ట"
              width={515}
              height={305}
              className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page3-q${index + 1}`}
              quickWords={["మీన", "లత", "లేఖ", "నాగార్జునసాగర్", "ఆనకట్ట", "యాత్ర"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
