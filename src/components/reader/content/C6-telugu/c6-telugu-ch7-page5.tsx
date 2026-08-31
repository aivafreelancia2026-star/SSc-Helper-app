import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "రామలక్ష్మణుల సంభాషణ ద్వారా మీరు ఏమి గ్రహించారు?",
  "'ఉడుతాభక్తి' అంటే ఏమిటి?",
];

// Book page 68 (PDF P77) — closing verse + the chapter's own తాత్పర్యం
// (story paraphrase). Written here as an original summary in my own
// words rather than copying the textbook's paraphrase paragraph, and the
// original verse lines are not transcribed at all — consistent with the
// rest of this chapter.
export function C6TeluguCh7Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">తాత్పర్యం</h3>
        <p className="px-5 py-4">
          వానరులు సముద్రంపై పెద్దపెద్ద బండరాళ్లు, చెట్లు, కొండలు తెచ్చి వారధి కడుతుండగా, ఒక చిన్న ఉడుత
          తనవంతుగా నీళ్లలో మునిగి, ఇసుకలో పొర్లి, ఆ ఇసుక రేణువులను శరీరానికి అంటించుకుని వేగంగా వచ్చి
          వారధిపై రాల్చుతూ ఉంటుంది. బలవంతులైన వానరులు కొండలను మోసుకొస్తుంటే, తన సాయం వల్ల ఎంత ప్రయోజనం
          ఉంటుందో అని ఆలోచించకుండా, భక్తితో ఆమె తన శక్తిమేరకు సాయం చేస్తూనే ఉంటుంది. ఇది గమనించిన
          శ్రీరాముడు లక్ష్మణునితో — ఎంత చిన్న సాయమైనా, భక్తితో మనస్ఫూర్తిగా చేస్తే అది గొప్పదే అవుతుందని,
          అందులో పరిమాణం కాదు భావమే ముఖ్యమని చెబుతాడు. సంతోషించిన శ్రీరాముడు ఉడుతను ప్రేమగా దగ్గరకు
          తీసుకుని, తన వేళ్లతో ఆమె వీపుపై నిమురుతాడు — ఆ మూడు రేఖలు ఉడుత వీపుపై అందంగా, శాశ్వతంగా
          నిలిచిపోయాయని చెబుతారు.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch7-page5-discuss-${i + 1}`}
              quickWords={["భక్తి", "రాముడు", "లక్ష్మణుడు", "ఉడుత", "సాయం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
