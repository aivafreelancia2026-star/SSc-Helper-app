import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUOTES = [
  "ఆహా! ఆ బంగారు లేడి ఎంత బాగున్నది.",
  "ఆశ ఉండాలి అట్లని అత్యాశ పనికిరాదు.",
  "శభాష్ అని కవి ప్రశంసను మెచ్చుకున్నారు.",
  "విజ్ఞానం మరియు వినోదం అందరికీ అవసరం.",
  "అయ్యో! ఆ కుక్క కరుస్తుంది.",
  "ధనం సంపాదించాలి, అయితే అందులో కొంత దానం కూడా చేయాలి.",
];

export function C6TeluguCh5Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">అవ్యయ పదాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">1. కింది వాక్యాల్లో ఉన్న అవ్యయపదాలకింద గీతగీయండి.</p>
          {QUOTES.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch5-page12-avyayam-${index + 1}`}
              quickWords={["ఆహా", "అట్లని", "శభాష్", "మరియు", "అయ్యో", "అయితే"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-[#f4efe4] text-center">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="px-5 py-5">
          <TeluguAnswerBox
            question="మీకు బాగా నచ్చిన శతకాల్లో ఏవైనా 5 పద్యాలను సేకరించి భావాలు రాయండి. నివేదిక రాసి చదివి వినిపించండి."
            storageKey="c6-telugu-ch5-page12-project"
            quickWords={["శతకం", "పద్యాలు", "భావాలు", "నివేదిక", "సేకరించండి"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white text-center">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">సూక్తి</h3>
        <p className="px-5 py-5 text-xl font-bold leading-loose">
          పొట్టంత బంగారం కాదు. కొట్టంత ఇత్తడి కాదు. తెలివైనవాడు మంచిని ఎక్కడినుండైనా స్వీకరిస్తాడు.
        </p>
      </section>
    </div>
  );
}
