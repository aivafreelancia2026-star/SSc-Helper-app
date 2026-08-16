import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MEANINGS = [
  "మంచి బుద్ధి కలవాడా! ఇతర శ్రీకాంతుడికి సొదరుడిలా మెలగాలి.",
  "శ్రీకాళహస్తీశ్వరా! ‘నాకు కోరికలు పుట్టవే’ అని తెలివైనవారు భావపడుతుంటారు.",
  "ఓ కుమారీ! నీవు ఇతరులకు చేసిన మేలును ఎప్పుడూ బయటికి చెప్పకు.",
  "కాలిన ఇనుముపై నీళ్లువేస్తే ఆవిరైపోతాయి; అదే నీళ్లు తామరాకుపై ముత్యాల్లా కనిపిస్తాయి.",
  "ఓ తనయా! ఎప్పుడూ అనసరమైన మాటలు చెప్పకు.",
  "మంచిగనాలు కలవాడా! మనిషి భగవంతుడు అనే ఆలోచనతో ప్రజలకు సేవ చేయాలి.",
  "భరతసింహా! కాలనాగు కంటే ప్రమాదకరమైనవారు ఉంటారు; వాళ్లతో జాగ్రత్తగా ఉండాలి.",
  "భరతఖండానికి తిలకం వంటివాడా! మంచి నడవడిక గలవాడే గొప్పవాడు.",
];

const QUESTIONS = [
  "శతకపద్యాలు చదివారుకదా! నీతి గొప్పతనం గురించి చెప్పండి.",
  "ఒకరు పద్యం చదవండి. మరొకరు భావం చెప్పండి.",
];

export function C6TeluguCh5Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">తాత్పర్యాలు</h3>
        <div className="space-y-3 px-5 py-5">
          {MEANINGS.map((meaning, index) => (
            <p key={meaning} className="rounded-[12px] border border-border/60 bg-white/80 px-4 py-3 text-lg leading-loose">
              {index + 1}. {meaning}
            </p>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch5-page7-q${index + 1}`}
              quickWords={["శతకపద్యాలు", "నీతి", "పద్యం", "భావం", "మంచి బుద్ధి"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
