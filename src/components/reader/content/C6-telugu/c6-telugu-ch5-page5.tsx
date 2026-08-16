import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_AND_SAY = [
  "ఇతరులు తనను పొగిడితే పొంగిపోకుండా ఉండాలని కవి అన్నాడు కదా! అట్లా ఎందుకనాడో చెప్పండి.",
  "సూర్యుడు కొండలను ధ్వంసరాశుల్ని ఎలా బయటకు అడుగుతున్నాడు? అద్దంలో చెప్పండి.",
];

const PADYAM_PROMPTS = [
  "బద్దెన చెప్పిన పద్యంలో ఉన్న నీతిని మీ మాటల్లో రాయండి.",
  "ధూర్జటి పద్యం ఏ విషయాన్ని చెబుతోంది?",
  "పక్కి వెంకట నరసింహకవి పద్యం నుండి మీకు తెలిసిన మంచి విషయం రాయండి.",
  "ఏనుగు లక్ష్మణకవి పద్యంలో నీరజము, ముత్యము వంటి పదాలతో చెప్పిన భావం ఏమిటి?",
];

export function C6TeluguCh5Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="grid gap-4 md:grid-cols-[1fr_0.85fr]">
        <div className="grid gap-4">
          <Image src="/assets/textbooks/c6-telugu/ch5/page-55-father-son.webp" alt="తండ్రి పిల్లవాడికి చెబుతున్న చిత్రం" width={290} height={260} className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm" />
          <Image src="/assets/textbooks/c6-telugu/ch5/page-55-pearl.webp" alt="నీరు, ఆకు, ముత్యం చిత్రం" width={250} height={255} className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm" />
        </div>
        <Image src="/assets/textbooks/c6-telugu/ch5/page-55-reflection.webp" alt="చేసిన పనిని తలచుకుంటున్న బాలుడు" width={220} height={265} className="mx-auto h-auto w-full max-w-sm rounded-[14px] border border-border/60 bg-white shadow-sm" />
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_AND_SAY.map((question, index) => (
            <TeluguAnswerBox key={question} question={`${index + 1}. ${question}`} storageKey={`c6-telugu-ch5-page5-think-${index + 1}`} quickWords={["పొగడడం", "వినయం", "సూర్యుడు", "కొండలు", "భావం"]} />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I - II పద్య భావాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {PADYAM_PROMPTS.map((question, index) => (
            <TeluguAnswerBox key={question} question={`${index + 1}. ${question}`} storageKey={`c6-telugu-ch5-page5-padyam-${index + 1}`} quickWords={["నీతి", "వినయం", "గురువు", "పద్యం", "భావం", "మంచి విషయం"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
