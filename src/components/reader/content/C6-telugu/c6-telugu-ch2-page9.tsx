import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const CLASSIFICATION_TASKS = [
  "తెలుగుభాషలోని వర్ణాలను మూడు విధాలుగా విభజిస్తారు: అచ్చులు, హల్లులు, ఉభయాక్షరాలు.",
  "అచ్చులు ప్రాణాలు, దీర్ఘాలు అని రెండు విధాలు.",
  "హల్లులను ఉచ్చారణ విధానాన్ని బట్టి వర్గాలుగా గుర్తించండి.",
];

const LETTER_TASKS = [
  "కింది వాక్యంలో పరుషాలను గుర్తించి వాటి కింద గీత గీయండి.",
  "కింది మాటల్లో సరళాలతో మొదలైన మాటలను గుర్తించండి.",
  "కింది మాటల్లో అంతస్థాలను గుర్తించండి.",
  "కింది వాక్యంలో ఉష్మాలను గుర్తించండి.",
];

const SELF_CHECK = [
  "కథను సొంతమాటల్లో చెప్పగలను.",
  "పాఠం చదివి పాఠంలోని కీలకాంశాలను గుర్తించగలను.",
  "కథను సొంతమాటల్లో రాయగలను.",
  "జంతువులు, పక్షులను పాత్రలుగా ఉపయోగించి సొంతంగా కథ రాయగలను.",
];

export function C6TeluguCh2Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <ReadingTaskChecklist
        title="VI. భాషను గురించి తెలుసుకుందాం"
        tasks={CLASSIFICATION_TASKS}
        storageKey="c6-telugu-ch2-page9-classification"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఉచ్చారణ విధానాన్ని బట్టి హల్లులు
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {LETTER_TASKS.map((task, index) => (
            <TeluguAnswerBox
              key={task}
              question={`${index + 1}. ${task}`}
              storageKey={`c6-telugu-ch2-page9-letter-task-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-[#f4efe4] p-5 text-center">
        <h3 className="mb-3 inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">సూక్తి</h3>
        <p className="text-lg font-semibold leading-loose">
          చెడు వదులుకుని నివారిస్తాడు. మంచి పనులకు ప్రోత్సహిస్తాడు. రహస్యాలను దాస్తాడు.
          సద్గుణాలను పెంపొందిస్తాడు. ఇలాంటి మంచి మిత్రుని లక్షణాలు.
        </p>
      </section>

      <ReadingTaskChecklist
        title="నేనివి చేయగలనా?"
        tasks={SELF_CHECK}
        storageKey="c6-telugu-ch2-page9-self-check"
      />
    </div>
  );
}
