import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_AND_SAY = [
  "శైలజకు తల్లిదండ్రులు ఎల్లాంటి జాగ్రత్తలు చెప్పి ఉంటారో ఊహించి చెప్పండి.",
  "ఇంత గొప్ప నిర్మాణం ఎట్లా కట్టారో! అనడం వెనుక అంతర్యం ఏమిటి?",
];

const QUESTIONS = [
  "కాకతీయుల చరిత్ర గురించి ఈ పేజీలో చదివిన విషయాన్ని మీ మాటల్లో రాయండి.",
  "వేయి స్తంభాల గుడి, కోట, చారిత్రక కట్టడాలు మనకు ఏమి తెలియజేస్తాయి?",
];

export function C6TeluguCh4Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="grid gap-4 md:grid-cols-3">
        <Image
          src="/assets/textbooks/c6-telugu/ch4/page-42-building.webp"
          alt="పచ్చిక బయలుతో భవనం"
          width={580}
          height={260}
          className="h-full w-full rounded-[14px] border border-border/60 object-cover shadow-sm md:col-span-2"
        />
        <Image
          src="/assets/textbooks/c6-telugu/ch4/page-42-temple.webp"
          alt="చారిత్రక ఆలయ నిర్మాణం"
          width={525}
          height={300}
          className="h-full w-full rounded-[14px] border border-border/60 object-cover shadow-sm"
        />
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_AND_SAY.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page4-think-${index + 1}`}
              quickWords={["శైలజ", "జాగ్రత్తలు", "నిర్మాణం", "అంతర్యం", "తల్లిదండ్రులు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II</h3>
        <div className="grid gap-4 px-5 py-5 md:grid-cols-[0.8fr_1fr]">
          <Image
            src="/assets/textbooks/c6-telugu/ch4/page-42-fort.webp"
            alt="కోట ప్రవేశద్వారం"
            width={440}
            height={305}
            className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm"
          />
          <div className="space-y-4">
            {QUESTIONS.map((question, index) => (
              <TeluguAnswerBox
                key={question}
                question={`${index + 1}. ${question}`}
                storageKey={`c6-telugu-ch4-page4-q${index + 1}`}
                quickWords={["కాకతీయులు", "వేయి స్తంభాల గుడి", "కోట", "చరిత్ర", "కట్టడాలు"]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
