import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const FILL_BLANKS = [
  "దేవతలు దేవం .......... తమ సర్వస్వాన్ని త్యాగం చేశారు.",
  "హితం .......... దేనిని సాధించలేం.",
  "అతడు కుంచె .......... చిత్రాలు గీశాడు.",
  "వాదాలు పెట్టుకోవడం .......... మనస్సు ప్రశాంతతను కోల్పోతుంది.",
  "బాలిక .......... బహుమానాలు తీసుకోవడానికి వేదికపైకి ఎక్కారు.",
  "రైతు నాగలి .......... పొలం దున్నాడు.",
  "చెరువు .......... బట్టలు ఉతికొద్దు.",
  "పెద్దలమాటలు .......... గౌరవించాలి.",
  "పసివాడు పాల .......... ఏడుస్తున్నాడు.",
  "బాలబాలికలు స్వయంకృషి .......... పైకి రావాలి.",
  "సూసీత .......... మానస తెలివైనది.",
];

const EXPRESSIONS = [
  "ఆహా! ఆ బంగారు లేడి ఎంత బాగున్నది.",
  "ఆశ ఉండాలి అట్లని అత్యాశ పనికిరాదు.",
  "శభాష్ అని కవి ప్రశంసను మెచ్చుకున్నారు.",
  "విజ్ఞానం మరియు వినోదం అందరికీ అవసరం.",
  "అయ్యో! ఆ కుక్క కరుస్తుంది.",
  "ధనం సంపాదించాలి, అయితే అందులో కొంత దానం కూడా చేయాలి.",
];

const SELF_CHECK = [
  "శతక పద్యాల గొప్పదనం గురించి చెప్పగలను.",
  "అపరిచిత పద్యాన్ని చదివి తప్పొప్పులను గుర్తించగలను.",
  "శతక కవుల వల్ల సమాజానికి కలిగే మేలు గురించి రాయగలను.",
  "శతక పద్యాల్లోని భావాల ఆధారంగా మనం చేయదగునవి, చేయవలసినవి పట్టిక రూపంలో తయారుచేసి ప్రదర్శించగలను.",
];

export function C6TeluguCh5Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">విభక్తి ప్రత్యయాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {FILL_BLANKS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch5-page11-fill-${index + 1}`}
              quickWords={["తో", "ను", "కి", "లో", "వలన", "కంటే", "విభక్తి"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">అవ్యయం</h3>
        <p className="px-5 pt-4 text-lg leading-loose">
          లింగ, వచన, విభక్తులు లేని పదాలు అవ్యయాలు. కింది వాక్యాల్లోని అవ్యయ పదాలను గుర్తించండి.
        </p>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {EXPRESSIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch5-page11-avyayam-${index + 1}`}
              quickWords={["ఆహా", "అట్లని", "శభాష్", "మరియు", "అయ్యో", "అయితే"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">నేనివి చేయగలనా?</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {SELF_CHECK.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question} - అవును / కాదు`}
              storageKey={`c6-telugu-ch5-page11-self-${index + 1}`}
              quickWords={["అవును", "కాదు", "చేయగలను", "ఇంకా సాధన చేస్తాను"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
