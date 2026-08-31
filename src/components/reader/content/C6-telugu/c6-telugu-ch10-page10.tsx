import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'కర్కోటకుడు' అంటే ఎట్లా ఉంటాడని అనుకుంటున్నావు?",
  "దుర్మార్గుల వల్ల ఎట్లాంటి నష్టాలుంటాయని భావిస్తున్నావు?",
  "గండభేరుండ పక్షులు బాలవద్దిరాజుకు సహాయం చేశాయికదా! అట్లాగే మనం కూడా ఇతరులకు ఎందుకు సహాయం చేయాలి?",
];

// Book page 103 (PDF/app P112) — the story's climax: with help from the
// mythical గండభేరుండ birds, Balavaddiraju crosses the seven seas and
// captures the magical parrot that holds the fakir's life-force,
// confronting the fakir with it.
export function C6TeluguCh10Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          గండభేరుండ పక్షుల సాయంతో బాలవద్దిరాజు సప్తసముద్రాలు దాటి, మాయల ఫకీరు ప్రాణం ఉన్న చిలుకను
          పట్టుకుంటాడు. ఆ చిలుకనే ఫకీరు బలానికి, మాయాశక్తికి మూలం. దానిని పట్టుకున్న బాలవద్దిరాజు
          ఫకీరును ఎదిరించే ధైర్యం సంపాదిస్తాడు.
        </p>
      </section>

      <FigureNote emoji="🦜🗡️😠" caption="మాయాచిలుకను పట్టుకుని మాయల ఫకీరును హెచ్చరిస్తున్న బాలవద్దిరాజు చిత్రం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch10-page10-discuss-${i + 1}`}
              quickWords={["ధైర్యం", "సహాయం", "దుర్మార్గం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
