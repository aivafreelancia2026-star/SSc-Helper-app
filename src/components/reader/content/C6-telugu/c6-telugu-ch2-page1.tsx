import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఎవరెవరున్నారు?",
  "ఆ పిల్లలు ఏం చేస్తున్నారు? ఏం మాట్లాడుతున్నారు?",
  "పై బొమ్మ చూస్తే మీకే భావన కలిగింది?",
];

export function C6TeluguCh2Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">
            2
          </div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">స్నేహబంధం</h2>
            <p className="mt-3 border-t-4 border-white/90 pt-2 text-right text-lg font-semibold">
              చిన్నయసూరి
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch2/page-19-picture.webp"
        alt="ఉపాధ్యాయురాలు పిల్లలతో మాట్లాడుతున్న చిత్రం"
        width={920}
        height={640}
        priority
        className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm"
      />

      <section className="space-y-4">
        <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
          బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
        </h3>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-sm border border-[#8b7a58] bg-white">
          <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">
            ప్రశ్నలు
          </h3>
          <div className="space-y-4 px-5 pb-5 pt-4">
            {QUESTIONS.map((question, index) => (
              <TeluguAnswerBox
                key={question}
                question={`${index + 1}. ${question}`}
                storageKey={`c6-telugu-ch2-page1-q${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-cyan-500 bg-cyan-50/40">
          <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">
            పాఠం ఉద్దేశం
          </h3>
          <p className="px-6 pb-6 pt-5 text-lg leading-loose">
            స్నేహమనేది చాలా విలువైనది. మంచి మిత్రులతో స్నేహం చేయడం చాలా అవసరం.
            స్నేహానికి గొప్పదనాన్ని తెలుసు చేయడం, విద్యార్థుల్లో స్నేహభావాన్ని పెంపొందించడం
            ఈ పాఠం ఉద్దేశం.
          </p>
        </div>
      </section>
    </div>
  );
}
