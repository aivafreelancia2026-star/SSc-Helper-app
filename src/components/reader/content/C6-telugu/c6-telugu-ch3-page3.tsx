import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_QUESTIONS = [
  "మేఘాన్ని సముద్రంతరపు నీటికి మిడిసినచే వారితో కవి ఎందుకు పోల్చి ఉంటాడు?",
  "వర్షం పడదాని కవి వర్ణించాడుకదా! జోరువాన పడుతుంటే మీకెలా అనిపిస్తుంది?",
];

const STORY_PROMPTS = [
  "వాన మొదలయ్యే సమయంలో మేఘాలు, చినుకులు, గాలి ఎలా కనిపిస్తాయో మీ మాటల్లో రాయండి.",
  "వానవల్ల ఊరికి కలిగే మార్పులను గమనించి రాయండి.",
];

export function C6TeluguCh3Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">I</h2>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch3/page-31-rain.webp"
        alt="భారీ వర్షం పడుతున్న గ్రామ దృశ్యం"
        width={480}
        height={1210}
        className="mx-auto h-auto w-full max-w-md rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఆలోచించండి-చెప్పండి
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page3-think-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {STORY_PROMPTS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page3-prompt-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
