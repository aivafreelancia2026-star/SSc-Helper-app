import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const PLACE_QUESTIONS = [
  "మనిషే భగవంతుడు అని తెలుసుకొని సేవ చేయాలి.",
  "తప్పును దాచిపెట్టేవారు చెడ్డవారు.",
  "గొప్పలు చెప్పుకోవడం కూడా తప్పే.",
  "మంచివారికి సేవ చేయాలి.",
];

const TRUE_FALSE = [
  "నేను తప్పుచేసి ఆ తప్పును కప్పిపుచ్చుకోను.",
  "ఇతరులకు మేలుచేసి ఆ గొప్పలు చెప్పుకోను.",
  "నాకు అందరు మంచివాళ్లుగానే కనిపిస్తారు.",
  "నేను ఎవరితోనూ వాదాలు పెట్టుకోను.",
  "నేను మంచివాళ్లతో స్నేహం చేస్తాను.",
  "ఇతరుల మధ్య గొడవలు పెడతాను.",
  "ఇతరులకు ఏదైనా అవసరముంటే ఇస్తాను.",
  "ఇతరులు నాపై కోపించినా నేను వారిపై కోపించను.",
];

export function C6TeluguCh5Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            1. కింది భావాలకు సరిపోయిన పద్యపాదాలను పాఠంలోని వెతికి రాయండి.
          </p>
          {PLACE_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch5-page8-place-${index + 1}`}
              quickWords={["పద్యపాదం", "భావం", "మేలు", "తప్పు", "సేవ", "గొప్పలు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పద్య భావం గుర్తించడం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="2. కింది పద్యాన్ని చదవండి. పై పద్యం ఆధారంగా తప్పు ఒప్పులను గుర్తించండి."
            storageKey="c6-telugu-ch5-page8-poem-summary"
            quickWords={["తప్పు", "ఒప్పు", "పద్యం", "భావం", "గుర్తించండి"]}
          />
          {TRUE_FALSE.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question} - అవును / కాదు`}
              storageKey={`c6-telugu-ch5-page8-truefalse-${index + 1}`}
              quickWords={["అవును", "కాదు", "తప్పు", "ఒప్పు", "స్నేహం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
