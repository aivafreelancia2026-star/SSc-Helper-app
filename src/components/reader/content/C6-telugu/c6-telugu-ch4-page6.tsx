import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_AND_SAY = [
  "అనాటి విగ్రహాలకు శిలలను వాడేవారు కదా! మరి ఈరోజుల్లో విగ్రహల తయారీకి వేటిని వాడుతున్నారు?",
  "‘సింగరేణి కార్మికుల కష్టం మన ఇంటికి కాంతిగా మారింది’ అంటే మీకేమి అర్థమైంది?",
];

const QUESTIONS = [
  "హైదరాబాద్ నగరంలో చూసే ప్రదేశాల పేర్లు రాయండి.",
  "చార్మినార్, గోల్కొండ వంటి కట్టడాలు మన సంస్కృతికి ఎలా గుర్తుగా నిలుస్తాయి?",
];

export function C6TeluguCh4Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_AND_SAY.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page6-think-${index + 1}`}
              quickWords={["విగ్రహాలు", "శిలలు", "సింగరేణి", "కార్మికులు", "కాంతి"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III</h3>
        <div className="grid gap-4 px-5 py-5 md:grid-cols-[0.75fr_1fr]">
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-44-golconda.webp"
            alt="గోల్కొండ కోట"
            width={455}
            height={310}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-44-charminar.webp"
            alt="చార్మినార్"
            width={320}
            height={405}
            className="mx-auto h-auto w-full max-w-sm rounded-[14px] border border-border/60 bg-white shadow-sm"
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
              storageKey={`c6-telugu-ch4-page6-q${index + 1}`}
              quickWords={["హైదరాబాద్", "చార్మినార్", "గోల్కొండ", "సంస్కృతి", "కట్టడాలు"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
