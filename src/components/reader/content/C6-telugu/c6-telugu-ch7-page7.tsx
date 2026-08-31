import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MCQ2 = [
  { q: "గొప్ప విషయం", options: "క) అపకారికి ఉపకారం చేయడం   ఖ) ఉపకారికి ఉపకారం చేయడం   గ) అపకారికి అపకారం చేయడం   ఘ) ఏదీకాదు" },
  { q: "పద్యంలో 'తప్పు' అనే అర్థం వచ్చే పదం", options: "క) ఎన్నక   ఖ) నెపము   గ) విపరీతము   ఘ) నేర్పరి" },
  { q: "పద్యమకుటం", options: "క) సుమతీ   ఖ) కుమతీ   గ) మందమతి   ఘ) ఏదీకాదు" },
];

const SHORT_ANSWERS = [
  "తొందరగా సేతువు నిర్మాణం కొనసాగాలని ఉడుత అనుకోవడంలో గల ఉద్దేశం ఏమిటి?",
  "'భక్తితో చేసే చిన్నపనైనా పెద్ద ఫలితాన్ని ఇస్తుంది.' సమర్థిస్తూ రాయండి.",
  "రాముడు ఉడుత చేసిన సహాయాన్ని మెచ్చుకొని వీపును దువ్వాడు. అట్లాగే మీరు చేసిన సహాయాన్ని ఇతరులు మెచ్చుకున్న సంఘటన గురించి రాయండి.",
  "ఈ పాఠం ఆధారంగా గోన బుద్ధారెడ్డి కథ చెప్పిన విధానం ఎట్లా ఉన్నది?",
];

// Book page 70 (PDF P79) — MCQ section wraps up, then స్వీయరచన (own-
// writing, short answers + a summary essay) and సృజనాత్మకత (creative
// response — a poem-form option marked "లేదా"/optional in the book, and a
// picture-based conversation prompt referencing the facing page's
// illustration, which appears as this app's own page 8).
export function C6TeluguCh7Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          {MCQ2.map((item, i) => (
            <div key={item.q} className="space-y-1">
              <p className="font-semibold">
                {String.fromCharCode(3080 + i)}. {item.q}
              </p>
              <p className="text-foreground/70">{item.options}</p>
              <TeluguAnswerBox
                question="మీ జవాబు (అక్షరం రాయండి: క/ఖ/గ/ఘ)"
                storageKey={`c6-telugu-ch7-page7-mcq-${i + 1}`}
                quickWords={["క", "ఖ", "గ", "ఘ"]}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {SHORT_ANSWERS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch7-page7-short-${i + 1}`}
              quickWords={["భక్తి", "సాయం", "ఉడుత", "రాముడు", "కథ"]}
            />
          ))}
          <p className="font-semibold text-pink-600">2. కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
          <TeluguAnswerBox
            question="'ఉడుత సాయం' పార్శ్వభాగ సారాంశాన్ని సొంత మాటల్లో రాయండి."
            storageKey="c6-telugu-ch7-page7-summary"
            quickWords={["వానరులు", "వారధి", "ఉడుత", "భక్తి", "రాముడు"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p>
            <span className="font-semibold text-pink-600">1.</span> ఈ పాఠాన్ని గేయరూపంలో రాయండి.{" "}
            <span className="italic text-foreground/50">(ఇది ఐచ్ఛికం — వదిలేయవచ్చు)</span>
          </p>
          <TeluguAnswerBox
            question="2. పక్కపేజీలోని బొమ్మను చూసి సంభాషణలు రాయండి."
            storageKey="c6-telugu-ch7-page7-conversation"
            quickWords={["ఉడుత", "చీమ", "సాయం", "పండు", "మాట్లాడుకున్నారు"]}
          />
        </div>
      </section>
    </div>
  );
}
