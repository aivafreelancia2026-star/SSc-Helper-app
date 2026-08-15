import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "తాబేలు కొత్తగా వచ్చిన జింకతో మాట్లాడిన మాటలు వినాయకరమా? మీరు మీతో కలిసిన కొత్త స్నేహితులతో ఎట్లా మాట్లాడతారో చెప్పండి.",
  "కలిసిమెలిసి ఉండడం వల్ల కలిగే లాభం ఏమిటి?",
];

const STORY_PROMPTS = [
  "జింక భయపడుతూ వచ్చిందని తెలుసుకున్న తాబేలు ఎలా ధైర్యం చెప్పింది?",
  "కాకి, ఎలుక, తాబేలు, జింక మధ్య స్నేహం ఎలా పెరుగుతోంది?",
];

export function C6TeluguCh2Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <Image
        src="/assets/textbooks/c6-telugu/ch2/page-21-picture.webp"
        alt="అడవిలో కాకి, ఎలుక, తాబేలు ఉన్న చిత్రం"
        width={1078}
        height={430}
        className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ఆలోచించండి-చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page3-q${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg leading-loose">
            ఈ భాగంలో మిత్రులు జింక గురించి ఆలోచిస్తారు. జింక కనిపించకపోవడంతో వారు ఆందోళన
            చెందుతారు. కథను చదివి ముఖ్య సంఘటనలను మీ మాటల్లో రాయండి.
          </p>
          {STORY_PROMPTS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page3-story-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
