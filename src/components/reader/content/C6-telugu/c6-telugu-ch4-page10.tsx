import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MEANINGS = ["గుడి", "ఆనవాళ్లు", "ఆనందం", "ప్రభము", "సందర్శించుట"];
const OWN_SENTENCES = ["అనుభూతి", "ఆకర్షణ", "కమ్మగా", "జ్ఞాపకం", "దర్శనం", "ప్రాచీనం", "యాత్ర", "మహనీయుడు"];

export function C6TeluguCh4Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <div className="px-5 py-5">
          <TeluguAnswerBox
            question="మీరు చూసిన యాత్రా విశేషాలను గురించి మీ మిత్రునికి లేఖ రాయండి."
            storageKey="c6-telugu-ch4-page10-letter"
            quickWords={["ప్రియమైన", "నమస్కారం", "యాత్ర", "విశేషాలు", "మిత్రుడు", "ఇట్లు"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            1. కింది పదాలు చదవండి. వీటికి అదే అర్థాలు వచ్చే పదాలను రాయండి.
          </p>
          {MEANINGS.map((word, index) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + index)}. ${word}`}
              storageKey={`c6-telugu-ch4-page10-meaning-${index + 1}`}
              quickWords={["ఆలయం", "దేవాలయం", "సంతోషం", "చూడటం", "దర్శించుట"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పదాలతో సొంత వాక్యాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">2. కింది పదాలనుపయోగించి సొంత వాక్యాలు రాయండి.</p>
          {OWN_SENTENCES.map((word, index) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + index)}. ${word}`}
              storageKey={`c6-telugu-ch4-page10-sentence-${index + 1}`}
              quickWords={["నేను", "మేము", "చూశాను", "యాత్ర", "చాలా", "గుర్తుంది"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
