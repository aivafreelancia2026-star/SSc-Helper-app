import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const LANGUAGE_TASKS = [
  "నాల్గవ పాఠాన్ని చదివి అందులో ఉన్న సరళాక్షరాలు, పరుషాక్షరాలు, మహాప్రాణాలు, అనునాసికాలను గుర్తించి రాయండి.",
  "కింది వాక్యాన్ని చదవండి. గీత, లత వంటి పదాల్లో స్త్రీలింగ పదాలను గుర్తించండి.",
  "కథలోని పుంలింగ, స్త్రీలింగ, నపుంసకలింగ పదాలను గుర్తించి రాయండి.",
];

const SELF_CHECK = [
  "నాకు ఇష్టమైన కాలం గురించి చెప్పగలను.",
  "అపరిచితమైన కవితను చదివి ప్రశ్నలకు జవాబులు రాయగలను.",
  "పాఠ్యభాగ సారాంశాన్ని సొంతమాటల్లో రాయగలను.",
  "నాకు నచ్చిన ప్రకృతి దృశ్యాన్ని వర్ణిస్తూ వాక్యం రాయగలను.",
];

export function C6TeluguCh3Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          VI. భాషను గురించి తెలుసుకుందాం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {LANGUAGE_TASKS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page8-language-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          వానకాలాన్ని వర్ణించే రెండు మంచి పాటలు లేదా కవితలు సేకరించండి. నివేదిక రాసి,
          చదివి వినిపించండి.
        </p>
      </section>

      <ReadingTaskChecklist
        title="నేనివి చేయగలనా?"
        tasks={SELF_CHECK}
        storageKey="c6-telugu-ch3-page8-self-check"
      />
    </div>
  );
}
