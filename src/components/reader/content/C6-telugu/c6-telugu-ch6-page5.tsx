import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK = [
  "“దూకుతూవున్నాడు”నాడు కదా! ఇవి కాక ఇంకా పిల్లలు ఏమి చేష్టలు చేస్తారో చెప్పండి.",
  "‘చెరగని వీరుడుకి పెద్ద మెదడు’ అంటే మీకేమి అర్థమయింది?",
];

export function C6TeluguCh6Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <Image src="/assets/textbooks/c6-telugu/ch6/page-67-worship.webp" alt="శివలింగం వద్ద తల్లి పిల్లవాడు ప్రార్థిస్తున్న చిత్రం" width={855} height={800} className="mx-auto h-auto w-full max-w-3xl rounded-[18px] border border-border/60 bg-white shadow-sm" />
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III పద్య భావాలు</h3>
        <div className="px-5 py-5">
          <TeluguAnswerBox question="పోతన బాల్యంలో భక్తి భావం ఎలా కనిపించింది?" storageKey="c6-telugu-ch6-page5-summary" quickWords={["పోతన", "భక్తి", "శివుడు", "ప్రార్థన", "తల్లి"]} />
        </div>
      </section>
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK.map((q, i) => (
            <TeluguAnswerBox key={q} question={`${i + 1}. ${q}`} storageKey={`c6-telugu-ch6-page5-think-${i + 1}`} quickWords={["పిల్లలు", "చేష్టలు", "వీరుడు", "మెదడు", "అర్థం"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
