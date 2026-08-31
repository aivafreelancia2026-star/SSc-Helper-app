import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'నిర్మల భక్తి' అంటే ఏమిటి?",
  "'అడుగు దామరలు మనమున జేర్చి' అంటే నీకేమి అర్థమైంది?",
  "ఉడుత నీళ్లలో మునిగి ఇసుకలో పొర్లాడి వేగంగా వచ్చి కట్టపై రాలుస్తున్నదికదా! అట్లా ఎందుకు చేయాలని అనుకున్నది?",
];

// Book page 66 (PDF P75) — first verse (padyam I). Per this app's policy
// for literature subjects, the original ద్విపద lines are NOT transcribed
// here; instead this is a thematic summary in original wording, followed
// by the textbook's own discussion questions (functional, safe to
// include verbatim).
export function C6TeluguCh7Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పద్యం I — భావం</h3>
        <p className="px-5 py-4">
          శ్రీరాముని ఆజ్ఞతో వానరసేనాధిపతులు సముద్రంపై వారధి కట్టే పని మొదలుపెడతారు. బలమైన కోతిమూకలు
          కొండలను, పెద్దపెద్ద బండరాళ్లను మోసుకొచ్చి సముద్రంలో వేస్తుంటాయి. అదే సమయంలో ఒక చిన్న ఉడుత తనవంతు
          సాయం చేయాలని నిశ్చయించుకుంటుంది — తనలాంటి చిన్న జీవి ఏం చేయగలదో అనుకోకుండా, స్వచ్ఛమైన భక్తితో,
          తన శక్తిమేరకు సాయపడాలని బయలుదేరుతుంది.
        </p>
      </section>

      <FigureNote
        emoji="🐒🪨🌊🐿️"
        caption="వానరులు రాళ్లు మోసుకొచ్చి వారధి కడుతుండగా, ఒక చిన్న ఉడుత కూడా తనవంతు సాయం చేయాలని బయలుదేరిన దృశ్యం"
      />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch7-page3-discuss-${i + 1}`}
              quickWords={["భక్తి", "ఉడుత", "సాయం", "వారధి", "మనసా"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
