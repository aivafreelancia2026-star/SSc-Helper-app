import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const LISTEN_QUESTIONS = [
  "నీకు ఏ కాలం అంటే చాలా ఇష్టం? ఎందుకు?",
  "పాఠం చదివారుకదా! కవికి వర్షం గురించి ఉన్న అభిప్రాయాన్ని మీరు సమర్థిస్తారా? వ్యతిరేకిస్తారా? ఎందుకు?",
];

const SENTENCE_QUESTIONS = [
  "నదుమునింత పొనికి గర్వపడేవారి గర్వం నీరై సముద్రంలో కలిసిపోతుంది.",
  "నెరవెల్లిన నెలంతా అడవంతా మారి నీటితో కనిపిస్తున్నాయి.",
  "పటపటమని పడగొట్టె నెలమిడవడినాయి.",
  "సంసారాలు మేడల్లో హాయిగా గడుపుతున్నాయి.",
  "నల్లని మబ్బులను చూడగానే గుడిసెలు, గుంజలు గడగడలాడుతున్నాయి.",
];

const POEM_QUESTIONS = [
  "వాన ఎట్లా కురిసింది?",
  "వాన వేడిని నింపడానికి కురిసిందా?",
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

export function C6TeluguCh3Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">తాత్పర్యాలు</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          ఈ భాగంలో వర్షం రాక, వానతో పల్లెల్లో కలిగే ఆనందం, కొన్ని ఇబ్బందులు, రైతు జీవితానికి
          వానతో ఉన్న సంబంధం గురించి భావాలు ఉన్నాయి.
        </p>
      </section>

      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-pink-600">ఇవి చేయండి</h2>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థం చేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {LISTEN_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page5-listen-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది భావం వచ్చే వాక్యాలను పాఠంలో వెతికి రాయండి.
          </p>
          {SENTENCE_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ", "ఉ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch3-page5-sentence-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {[...POEM_QUESTIONS, ...SELF_WRITING].map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page5-self-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
