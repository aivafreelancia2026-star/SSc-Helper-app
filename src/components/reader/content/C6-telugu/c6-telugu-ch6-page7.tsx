import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "ఈ నిశ్చబాలుడు అసాధ్యుడు అనే భావం వచ్చే పద్యపంక్తి ఏది? ఆ పద్యాన్ని దాని భావాన్ని రాయండి.",
  "కింది పద్యం చదవండి. భావంలోని ఖాళీలు పూరించండి.",
  "ఉత్కోచం పెద్దలందరూ అన్నమమ్ములిద్దరిని మెచ్చుకునేవారు. మీ చుట్టుపక్కలవారు నిన్ను మెచ్చుకునేటట్లుగా నీవు ఏం చేస్తావు?",
  "‘కాళ్లతో పారగడం’ అంటే మీకు ఏమి అర్థమయింది?",
  "తిప్పన - పోతనలను రామలక్ష్మణులతో ఎందుకు పోల్చారు?",
  "ఈ పాఠం రాసిన కవి గురించి సొంతమాటల్లో రాయండి.",
];

export function C6TeluguCh6Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="px-5 py-5">
          <TeluguAnswerBox
            question="ఈనాటి కాలంలో సోదరుల మధ్య ప్రేమ ఎట్లా ఉంటుందని మీరు అనుకుంటున్నారు?"
            storageKey="c6-telugu-ch6-page7-listening"
            quickWords={["సోదరులు", "ప్రేమ", "గౌరవం", "సహాయం", "కుటుంబం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch6-page7-q${index + 1}`}
              quickWords={["పోతన", "తిప్పన", "భావం", "రామలక్ష్మణులు", "కవి"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
