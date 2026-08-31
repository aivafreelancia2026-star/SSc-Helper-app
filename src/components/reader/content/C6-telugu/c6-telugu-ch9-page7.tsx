import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SHORT_ANSWERS = [
  "చీమలను చూసి మనం నేర్చుకోవాల్సిన విషయాలేవి?",
  "'కోటివిద్యలు కూటికొరకే కదా!' ఈ వాక్యాన్ని సమర్థిస్తూ రాయండి.",
  "ఏ పనీ లేకుండా వృథాగా తిరగడం వల్ల కలిగే అనర్థాలు ఏమిటి?",
  "పొట్లపల్లి రామారావు గురించి రాయండి.",
];

// Book page 90 (PDF/app P99) — Section III (short answers + a choice of
// two ten-sentence essay prompts) and Section IV (creative response
// about birds, paralleling the ants theme).
export function C6TeluguCh9Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {SHORT_ANSWERS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch9-page7-short-${i + 1}`}
              quickWords={["చీమలు", "శ్రమ", "క్రమశిక్షణ", "కవి"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
          <TeluguAnswerBox
            question="అ. చీమలబారు కవితా సారాంశాన్ని సొంతమాటల్లో రాయండి. (లేదా)"
            storageKey="c6-telugu-ch9-page7-summary"
            quickWords={["చీమలు", "వరుస", "శ్రమ", "పొదుపు"]}
          />
          <TeluguAnswerBox
            question="ఆ. చీమలు మానవాళికి ఇచ్చే సందేశం ఏమిటి?"
            storageKey="c6-telugu-ch9-page7-message"
            quickWords={["సందేశం", "శ్రమ", "క్రమశిక్షణ", "ఐక్యత"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <div className="px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="చీమలబారు కవితలో చీమల ప్రత్యేకతలు తెలుసుకున్నారుకదా! అట్లాగే మీరు గమనించిన పక్షుల్లోని ప్రత్యేకతలను కవిత/గేయరూపంలో రాయండి."
            storageKey="c6-telugu-ch9-page7-bird-poem"
            quickWords={["పక్షులు", "కవిత", "గేయం", "ప్రత్యేకత"]}
          />
        </div>
      </section>
    </div>
  );
}
