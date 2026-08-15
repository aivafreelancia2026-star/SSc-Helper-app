import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "రైతులను “శ్రమ దాచని హారికులను” ఎందుకన్నారు?",
  "“భరతమాత పురోగతికి ప్రాతిపదికలు ఘనులు” అనే వాక్యం ద్వారా మీకేమర్థమయింది?",
  "“రుధిరం స్వేదమ్ము కాగా పసిడిని పండించుచట్టి” అంటే మీకేమర్థమయింది?",
];

export function C6TeluguCh1Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">I</h2>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch1/page-13-picture.webp"
        alt="రైతులను స్మరిస్తూ ప్రార్థిస్తున్న పిల్లలు మరియు పచ్చని పొలాల చిత్రం"
        width={940}
        height={610}
        className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm"
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
              storageKey={`c6-telugu-ch1-page3-q${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
