import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "హుస్సేన్‌సాగర్‌లోని బుద్ధ విగ్రహం గురించి మీకు తెలిసింది రాయండి.",
  "పాలమూరు జిల్లాలోని పిల్లలమర్రి గురించి ఈ పేజీ ద్వారా ఏమి తెలుసుకున్నారు?",
  "మీరు చూసిన ఒక దర్శనీయ స్థలం గురించి లేఖలో చెప్పినట్టు రాయండి.",
];

export function C6TeluguCh4Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <Image
          src="/assets/textbooks/c6-telugu/ch4/page-45-buddha.webp"
          alt="హుస్సేన్‌సాగర్‌లో బుద్ధ విగ్రహం"
          width={575}
          height={360}
          className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
        />
        <div className="grid gap-4">
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-45-fort.webp"
            alt="చారిత్రక కోట నిర్మాణం"
            width={505}
            height={400}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-45-tree.webp"
            alt="పిల్లలమర్రి చెట్టు"
            width={590}
            height={300}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page7-q${index + 1}`}
              quickWords={["హుస్సేన్‌సాగర్", "బుద్ధ విగ్రహం", "పాలమూరు", "పిల్లలమర్రి", "దర్శనీయ స్థలం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
