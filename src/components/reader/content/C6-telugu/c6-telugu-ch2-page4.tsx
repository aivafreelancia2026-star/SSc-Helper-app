import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const STORY_PROMPTS = [
  "జింకకు ఏమి ప్రమాదం కలిగింది?",
  "ఎలుక జింకను రక్షించడానికి ఏం చేయాలని అనుకుంది?",
  "స్నేహితులు కలిసి ఉంటే సమస్యను ఎలా ఎదుర్కొనగలరో ఈ భాగం ఆధారంగా రాయండి.",
];

export function C6TeluguCh2Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <Image
        src="/assets/textbooks/c6-telugu/ch2/page-22-picture.webp"
        alt="అడవిలో జింక నిలబడి ఉన్న చిత్రం"
        width={1078}
        height={520}
        className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <Image
        src="/assets/textbooks/c6-telugu/ch2/page-22-caught.webp"
        alt="వలలో చిక్కుకున్న జింక చిత్రం"
        width={310}
        height={260}
        className="mx-auto h-auto w-full max-w-xs rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">కథను అర్థం చేసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {STORY_PROMPTS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page4-q${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
