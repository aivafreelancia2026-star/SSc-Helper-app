import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "కాకతీయ తోరణం గురించి మీకు తెలిసిన విషయాలు రాయండి.",
  "రామప్ప దేవాలయం ప్రత్యేకత ఏమిటి?",
  "సింగరేణి బొగ్గుగనుల గురించి ఈ పేజీ ద్వారా ఏమి తెలుసుకున్నారు?",
];

export function C6TeluguCh4Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-43-ramappa.webp"
            alt="రామప్ప దేవాలయం"
            width={475}
            height={310}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-43-mine.webp"
            alt="సింగరేణి బొగ్గుగని"
            width={420}
            height={315}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
        </div>
        <Image
          src="/assets/textbooks/c6-telugu/ch4/page-43-gate.webp"
          alt="కాకతీయ తోరణం"
          width={495}
          height={310}
          className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
        />
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page5-q${index + 1}`}
              quickWords={["కాకతీయ తోరణం", "రామప్ప దేవాలయం", "సింగరేణి", "బొగ్గుగనులు", "చరిత్ర"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
