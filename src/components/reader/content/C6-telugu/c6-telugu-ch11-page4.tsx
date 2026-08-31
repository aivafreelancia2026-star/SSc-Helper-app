import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "పంట చేనుకు కాపు ఉంటాడు కదా! పంటకు కాపు అవసరం ఏమిటి?",
  "'జీతగాని జీవితం వెలుగు లేనిది' అని కవి అన్నాడు కదా! అదెట్లాగో చెప్పండి?",
];

// Book page 111 (PDF/app P120) — second stanza: the poet asks whether
// the boy even got his morning meal, worries about him wandering the
// forest hungry and exhausted, and contrasts his life with children who
// get to go to school.
export function C6TeluguCh11Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">చరణం II — భావం</h3>
        <p className="px-5 py-4">
          కవి ఆ బాలుని గురించి మరింత ఆందోళన వ్యక్తం చేస్తాడు — తల్లి ఉదయాన్నే అన్నం పెట్టిందో లేదో,
          ఆకలితో అలమటిస్తున్నాడేమో, అడవిలో తిరిగి తిరిగి అలసిపోయాడేమో అని ప్రశ్నిస్తాడు. బడికి వెళ్లే
          అవకాశం లేని ఆ బాలుని జీవితం వెలుగు లేనిదని, అతని బాల్యం కష్టాల మధ్యే గడిచిపోతున్నదని కవి
          బాధపడతాడు.
        </p>
      </section>

      <FigureNote emoji="🏫🧒⚽🐄" caption="బడి భవనం ముందు ఆడుకుంటున్న పిల్లలు, పక్కనే పశువులు మేస్తున్న దృశ్యం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch11-page4-discuss-${i + 1}`}
              quickWords={["జీతగాడు", "బడి", "వెలుగు"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
