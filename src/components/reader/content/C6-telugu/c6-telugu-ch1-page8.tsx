import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THREE_SOUND_QUESTIONS = [
  "ఎత్తండి = .......... + .......... + .......... = ..........",
  "దుర్గతి = .......... + .......... + .......... = ..........",
  "సాధ్వి = .......... + .......... + .......... = ..........",
];

const SAME_LETTER_TASK = [
  "“బలరాం మంచి ఫలాలు కోసం పల్లెలో తోటకు పోయాడు. తోటలో పామును చూసి భయపడ్డాడు” వాక్యంలో ఒకే వర్ణం పలుమార్లు ఉన్న పదాలను గుర్తించండి.",
];

const PROJECT_TASK = [
  "మీ సమీపంలోని రైతులు / విరాంత సైనికులను కలవండి. వారు చేస్తున్న సేవలను గురించి తెలుసుకొని నివేదిక రాయండి.",
];

const SELF_CHECK_TASKS = [
  "గేయాన్ని అభినయంతో పాడగలను. ప్రగతి మార్దవుకులను గురించి చెప్పగలను.",
  "అపరిచిత గేయాన్ని చదివి అర్థం చేసుకొని, ప్రశ్నలకు సరైన జవాబులు గుర్తించగలను.",
  "గేయ సారాంశాన్ని సొంతమాటల్లో రాయగలను.",
  "పాఠం ఆధారంగా కొత్త గేయాన్ని రాయగలను.",
];

export function C6TeluguCh1Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          VI. భాషను గురించి తెలుసుకుందాం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది పదాల్లో సంయుక్త, ద్విత్వాక్షరాల్లోని ధ్వనులు రాయండి.
          </p>
          {THREE_SOUND_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch1-page8-sound-${index + 1}`}
            />
          ))}

          <TeluguAnswerBox
            question={`3. ${SAME_LETTER_TASK[0]}`}
            storageKey="c6-telugu-ch1-page8-same-letter"
          />
        </div>
      </section>

      <ReadingTaskChecklist
        title="ప్రాజెక్టు పని"
        tasks={PROJECT_TASK}
        storageKey="c6-telugu-ch1-page8-project"
      />

      <ReadingTaskChecklist
        title="నేనివి చేయగలనా?"
        tasks={SELF_CHECK_TASKS}
        storageKey="c6-telugu-ch1-page8-self-check"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-[#f4efe4] p-5 text-center">
        <h3 className="mb-3 inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">సూక్తి</h3>
        <p className="text-lg font-semibold leading-loose">
          ధైర్యంగా నువ్వు ఒక్క అడుగు వేస్తే, విజయం పది అడుగులు ముందుకు వస్తుంది.
        </p>
        <p className="mt-2 text-base font-semibold text-foreground/70">- విశ్వకవి రవీంద్రనాథ్ ఠాగూర్</p>
      </section>
    </div>
  );
}
