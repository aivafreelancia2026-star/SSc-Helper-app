import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "తేళ్ళు, పాములు భయంతో ఎందుకు అల్లాడుతున్నాయి?",
  "పర్యావరణ పరిరక్షణకై మీపాఠశాలలో ఎటువంటి కార్యక్రమాలను నిర్వహిస్తారు?",
  "చెరువులు, బావులు నీళ్లతో కళకళలాడడం కోసం ఊరి ప్రజలకు ఎట్లాంటి సలహాలను ఇస్తావు?",
];

// Book page 125 (PDF/app P134) — a పాట (song, embedded within the
// dialogue) urging forest and water conservation and warning against
// pollution — summarized thematically here (it's still verse) rather
// than transcribed.
export function C6TeluguCh12Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాట — భావం</h3>
        <p className="px-5 py-4">
          అడవులను పెంచాలని, జంతువులను కాపాడాలని, నీటిని ఆదా చేయాలని, బావులను పెంచాలని ఈ పాట
          పిలుపునిస్తుంది. కాలుష్యాన్ని తగ్గించాలని, సెల్‌టవర్ల రేడియేషన్‌ను నిలిపివేయాలని, జీవులన్నీ
          భయం లేకుండా బతికే వాతావరణాన్ని కల్పించాలని పాట కోరుతుంది.
        </p>
      </section>

      <FigureNote emoji="🏭💨📡🐦" caption="కర్మాగార పొగగొట్టాల నుండి లేస్తున్న కాలుష్య రాక్షసుడు, సెల్‌టవర్ తరంగాలు, చనిపోతున్న పక్షులు, నరికిన చెట్ల మొదళ్లు" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch12-page8-discuss-${i + 1}`}
              quickWords={["పర్యావరణం", "నీరు", "కాలుష్యం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
