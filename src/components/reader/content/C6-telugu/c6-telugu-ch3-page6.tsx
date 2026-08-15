import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const READING_QUESTIONS = [
  "కింది భావం వచ్చే వాక్యాలను పాఠంలో వెతికి రాయండి: నదుమునింత పొనికి గర్వపడేవారి గర్వం నీరై సముద్రంలో కలిసిపోతుంది.",
  "కింది కవితను చదివి, ప్రశ్నలకు జవాబులు రాయండి.",
];

const POEM_RESPONSE = [
  "వాన ఎట్లా కురిసింది?",
  "వాన వేడిని నింపడానికి కురిసింది?",
  "వానవల్ల కలిగే లాభమేమిటి?",
  "హారివిల్లు అంటే ఏమిటి?",
  "పై కవితలో ఉన్న జంటపదాలు ఏవి?",
];

const SELF_WRITING = [
  "వర్షాలు వల్ల ఏం జరుగుతుందో తెలుసుకున్నారు కదా! మరి శీతాకాలంలో ఎట్లా ఉంటుంది?",
  "‘చిన్ని చిన్ని కప్పు గుడిసెల్ పడి కూలగ దాడిచేసితివా?’ అని కవి ఎందుకు అన్నట్లు?",
  "వర్షాలు కోసం ఎవరెవరు ఎదురుచూస్తారు? ఎందుకు?",
  "డా॥ పల్లా దుర్గయ్య గురించి రాయండి.",
  "పాఠ్యభాగ సారాంశాన్ని సొంతమాటల్లో రాయండి.",
];

export function C6TeluguCh3Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {READING_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page6-reading-${index + 1}`}
            />
          ))}
          {POEM_RESPONSE.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ", "ఉ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch3-page6-poem-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {SELF_WRITING.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page6-self-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
