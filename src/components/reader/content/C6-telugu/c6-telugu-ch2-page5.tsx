import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "కన్నవాళ్ళకు స్నేహితులకు దూరంగా ఉంటే కలిగే బాధ ఎట్లాంటిదో చెప్పండి.",
  "రాజకుమారుడు చేసిన పని మంచిదా? చెడ్డదా? వివరించండి.",
  "ఎలుక తాబేలును ఎందుకు కోపించి ఉండవచ్చు?",
  "‘ఉపాయంతో అపాయాన్ని తప్పించుకోవచ్చు’ ఎట్లాగో చెప్పండి.",
];

export function C6TeluguCh2Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <Image
        src="/assets/textbooks/c6-telugu/ch2/page-23-deer.webp"
        alt="రాజకుమారుడు జింకను ఆదరిస్తున్న చిత్రం"
        width={340}
        height={360}
        className="mx-auto h-auto w-full max-w-sm rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ఆలోచించండి-చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page5-q${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          ఈ భాగంలో మిత్రులు కలిసి ఉపాయం ఆలోచించి తాబేలును రక్షించడానికి ప్రయత్నిస్తారు.
          కథను చదివి స్నేహం, చాతుర్యం, సహాయం అనే అంశాలను మీ మాటల్లో రాయండి.
        </p>
      </section>
    </div>
  );
}
