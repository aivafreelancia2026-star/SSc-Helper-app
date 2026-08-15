import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_QUESTIONS_TOP = [
  "ప్రజలందరు పులకితులైపోయారని కవి ఎందుకన్నాడు?",
  "‘భూనతి రామచిలుకయ్యో’ అని కవి ఎందుకన్నాడు?",
  "వానలు పడడం వల్ల వాతావరణం ఎట్లా మారుతుంది? ఏమేం జరుగుతుంది?",
];

const THINK_QUESTIONS_SIDE = [
  "మబ్బులను చూసి గుడిసెల కప్పులు, గుంజలు ఎందుకు గడగడలాడినాయి?",
  "‘శరీరములను రిపులకు అప్పచెప్పుట’ అంటే నీకేమి అర్థమయింది?",
  "పుడిసెడు మేడకాపురము అని కవి అన్నాడు కదా! పేదల కాపురాలు ఎట్లా ఉంటాయి?",
];

export function C6TeluguCh3Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఆలోచించండి-చెప్పండి
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_QUESTIONS_TOP.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page4-top-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">III</h2>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch3/page-32-farmers.webp"
        alt="వర్షంలో రైతులు, ఎద్దులు పొలంలో నడుస్తున్న దృశ్యం"
        width={910}
        height={430}
        className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఆలోచించండి-చెప్పండి
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_QUESTIONS_SIDE.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page4-side-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
