import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const CREATIVE_TASKS = [
  "మీకు నచ్చిన ప్రకృతి దృశ్యాన్ని వర్ణిస్తూ వాక్యం రాయండి.",
  "ఎండాకాలంలోని వాతావరణాన్ని, ప్రజల స్థితిగతులను వర్ణిస్తూ వాక్యం రాయండి.",
];

const VOCAB_QUESTIONS = [
  "ముందు చదివిన పాఠాలనుండి కింది గుణింతాలతో కూడిన పదాలను వెతికి పట్టిక ఆధారంగా రాయండి.",
  "కింది వాక్యాల్లో గీతగీసిన పదాలకు అర్థాలు రాయండి.",
  "కింది వాక్యాలు చదవండి. ఒకే అర్థం వచ్చే పదాలకింద గీత గీయండి.",
  "కింది పదాలకు సొంతవాక్యాలు రాయండి: బొట్టలెక్క, ఆగడ, పటపట, ఆరంభోత్సంగు, పులకరించు.",
];

export function C6TeluguCh3Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <ReadingTaskChecklist
        title="IV. సృజనాత్మకత / ప్రశంస"
        tasks={CREATIVE_TASKS}
        storageKey="c6-telugu-ch3-page7-creative"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {VOCAB_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page7-vocab-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
