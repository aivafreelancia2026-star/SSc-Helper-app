import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const RELATED_WORDS = [
  "దూరం, కోట, జిల్లా, జాగ",
  "గుడి, బడి, దేవాలయం, మందిరం",
  "శిల, రాయి, గండ, బండ",
  "గాలి, నీరు, జలం, సలిలం",
  "కన్ను, నేత్రం, రెప్ప, నయనం",
];

const LANGUAGE_GROUPS = [
  "స్త్రీలింగ పదాలు",
  "పుంలింగ పదాలు",
  "నపుంసకలింగ పదాలు",
];

const SENTENCES = [
  "తెలంగాణ సంస్కృతికి, ఉనికికి, బతుకమ్మ పండుగ ప్రతీక.",
  "మాతృదేశం మన దేశంలోనే కాకుండా విదేశాల్లో కూడా జరుపుకుంటారు.",
  "పిల్లలను ఇష్టంతో, వంటితో తయారుచేస్తారు.",
  "వాణి పూల కొరకు పూలను కోసింది.",
  "కృతిమమైన రంగులు చల్లుకోవడం వల్ల అనారోగ్యం పాలవుతాం.",
];

export function C6TeluguCh4Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            3. కింది పదాల వరుసను చూడండి. ప్రతి వరుసలో సంబంధం లేని పదాన్ని గుర్తించి చుట్టండి.
          </p>
          {RELATED_WORDS.map((line, index) => (
            <TeluguAnswerBox
              key={line}
              question={`${String.fromCharCode(3077 + index)}. ${line}`}
              storageKey={`c6-telugu-ch4-page11-odd-${index + 1}`}
              quickWords={["దూరం", "బడి", "శిల", "జలం", "రెప్ప"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          VI. భాషను గురించి తెలుసుకుందాం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            1. మీకు తెలిసిన స్త్రీలింగ, పుంలింగ, నపుంసకలింగ పదాలు రాయండి.
          </p>
          {LANGUAGE_GROUPS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch4-page11-gender-${index + 1}`}
              quickWords={["అమ్మ", "నాన్న", "పిల్లవాడు", "పిల్ల", "పుస్తకం", "చెట్టు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">విభక్తి ప్రత్యయాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-sky-600">కింది వాక్యాలను గమనించండి.</p>
          {SENTENCES.map((sentence, index) => (
            <p key={sentence} className="rounded-[12px] border border-border/60 bg-white/80 px-4 py-3 text-lg leading-loose">
              {String.fromCharCode(3077 + index)}. {sentence}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
