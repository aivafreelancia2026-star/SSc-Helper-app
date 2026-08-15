import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో ఏం జరుగుతున్నది ?",
  "పిల్లలు ఏమని నినాదాలు ఇస్తున్నారు ?",
  "జై జవాన్! అని ఎందుకంటున్నారు?",
  "జవాను దేశానికి సేవ చేస్తాడు కదా! ఇతనివలె దేశం కోసం పాటుపడేవాళ్ళు ఎవరు?",
];

export function C6TeluguCh1Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">
            1
          </div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">అభినందన</h2>
            <p className="mt-3 border-t-4 border-white/90 pt-2 text-right text-lg font-semibold">
              - శేషం లక్ష్మీనారాయణాచార్య
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/textbooks/c6-telugu/ch1/page-11-picture.webp"
        alt="సైనిక దినోత్సవం సందర్భంగా పిల్లలు నినాదాలు చేస్తున్న చిత్రం"
        width={650}
        height={590}
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
                storageKey={`c6-telugu-ch1-page1-q${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-cyan-500 bg-cyan-50/40">
          <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">
            పాఠం ఉద్దేశం
          </h3>
          <p className="px-6 pb-6 pt-5 text-lg leading-loose">
            ఈ దేశం బాగోగులు కోరుతూ, అందుకోసం నిరంతరం శ్రమించే కర్మవీరులు ఎంతోమంది ఉన్నారు.
            అలాంటివారిలో ముందుండే రైతులు, సైనికులు. వారిని స్ఫూర్తించుకుంటూ వారి శ్రమను,
            గొప్పతనాన్ని తెలియజెప్పడమే ఈ పాఠం ఉద్దేశం.
          </p>
        </div>
      </section>
    </div>
  );
}
