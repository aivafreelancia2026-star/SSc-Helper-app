import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "కంటికి కనురెప్ప, చేతికి కంచె. ఇట్లా దేశానికి ఎవరు రక్ష? ఇటువంటివే మరికొన్ని చెప్పండి.",
  "“జన్మభూమి కవచమైన ఘనవీరులు జవానులు” అని కవి ఎందుకన్నారు?",
  "‘నీతి కర్తవ్యులు’ అని ఎవరిని అంటారు?",
];

export function C6TeluguCh1Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">II</h2>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch1/page-14-picture.webp"
        alt="జవాను, రైతు, జాతీయ జెండా మరియు పొలంలో దున్నుతున్న రైతు చిత్రం"
        width={540}
        height={1160}
        className="mx-auto h-auto w-full max-w-md rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఆలోచించండి-చెప్పండి
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch1-page4-q${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
