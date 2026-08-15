import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SYNONYM_LINES = [
  "భారతీయులు స్వాతంత్ర్యం సాధించి విజయ బావుటా ఎగుర వేశారు. నాటినుండి జాతీయ పండుగలకు పతాకాన్ని ఎగురవేసి ఆ జెండాకు వందనం చేస్తున్నారు.",
  "పూర్వకాలంలో రాజులు భిక్షం ధరించేవారు. అవి పదును పెట్టి యుద్ధరంగంలోకి వెళ్ళేవారు. ఆ కత్తి తోనే యుద్ధం చేసేవారు.",
];

const AKSHARA_QUESTIONS = [
  "య = .......... + ..........",
  "కా = .......... + ..........",
  "హా = .......... + ..........",
];

export function C6TeluguCh1Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          V. పదజాల వినియోగం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది వాక్యాలను చదవండి. ఒకే అర్థం వచ్చే పదాలను గుర్తించి రాయండి.
          </p>
          {SYNONYM_LINES.map((line, index) => (
            <TeluguAnswerBox
              key={line}
              question={`${["ఆ", "ఇ"][index]}. ${line}`}
              storageKey={`c6-telugu-ch1-page7-synonyms-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          VI. భాషను గురించి తెలుసుకుందాం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4 text-lg leading-loose">
          <p>
            ధ్వని అనే మాటకు చప్పుడు, శబ్దం అని అర్థం. భాషా విషయంలో మాత్రం ధ్వని అంటే నోటితో
            పలికేది అని అర్థం.
          </p>
          <p>
            భాషాధ్వనులకు చెందిన అక్షరపు గుర్తుల పట్టికను వర్ణమాల లేదా అక్షరమాల అని అంటారు.
          </p>
          <p className="font-semibold text-pink-600">
            కింది అక్షరాల్లో రెండేసి వర్ణాలున్నాయి. వాటిని గుర్తించండి.
          </p>
          {AKSHARA_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch1-page7-akshara-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
