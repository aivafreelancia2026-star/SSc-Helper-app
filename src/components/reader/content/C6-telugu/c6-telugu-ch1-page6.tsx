import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SELF_WRITING_QUESTIONS = [
  "‘దేశపురోగతి’ అంటే ఏమిటి? దేశపురోగతికి తోడ్పడిన వారిలో మీకు తెలిసిన వారి పేర్లు రాయండి.",
  "దేశానికి నీతికర్తవ్యుల అవసరమెంత ఏమిటి?",
  "అవిశ్రాంత సేవ్యంలో ఆకలిమంటలను ఆర్పడమంటే ఏమిటి?",
  "ఈ గేయ రచయిత గురించి సొంతమాటల్లో రాయండి.",
  "‘అభినందన’ గేయ సారాంశాన్ని మీ సొంతమాటల్లో రాయండి.",
];

const APPRECIATION_TASKS = [
  "రైతులు, సైనికులు గురించి గేయం పాడుతున్నారని భావించి ఒక చిన్న గేయాన్ని రాయండి.",
];

const VOCAB_QUESTIONS = [
  "స్వాతంత్ర్య సమరంలో ఎందరో వీరులు తమ రుధిరం చిందించారు.",
  "పసిడి ఆభరణాలకు విలువ ఎక్కువ.",
  "వర్థన పదగానే హారికులు పొలాలు దున్నుతారు.",
  "కార్మికులు తమ స్వేదం చిందించి కర్మాగారాల్లో వస్తువులను తయారుచేస్తారు.",
];

const POEM_LINES = [
  "భారతదేశానికి రైతు వెన్నెముక. కర్షకుడు కష్టపడి పంట పండిస్తేనే ప్రజల ఆకలి తీరుతుంది.",
  "హారికులు శ్రమ దేశం బుగ్గవడి ఉత్సాహం.",
];

export function C6TeluguCh1Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది ప్రశ్నకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.
          </p>
          {SELF_WRITING_QUESTIONS.slice(0, 4).map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch1-page6-self-${index + 1}`}
            />
          ))}

          <p className="pt-4 text-lg font-bold leading-loose text-pink-600">
            కింది ప్రశ్నకు 10 వాక్యాల్లో జవాబు రాయండి.
          </p>
          <TeluguAnswerBox
            question={`2. ${SELF_WRITING_QUESTIONS[4]}`}
            storageKey="c6-telugu-ch1-page6-summary-answer"
          />
        </div>
      </section>

      <ReadingTaskChecklist
        title="IV. సృజనాత్మకత / ప్రశంస"
        tasks={APPRECIATION_TASKS}
        storageKey="c6-telugu-ch1-page6-appreciation"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది వాక్యాల్లో గీత గీసిన పదాలకు అదే అర్థం వచ్చే పదాలను ఖాళీలలో రాయండి.
          </p>
          {VOCAB_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch1-page6-vocab-${index + 1}`}
            />
          ))}

          <p className="pt-4 text-lg font-bold leading-loose text-pink-600">
            కింది వాక్యాలను చదవండి. ప్రతి వాక్యంలో ఒక పదానికి అదే అర్థం వచ్చే మరికొన్ని పదాలున్నాయి.
            వాటి కింద గీత గీయండి.
          </p>
          {POEM_LINES.map((line, index) => (
            <TeluguAnswerBox
              key={line}
              question={`${["అ", "ఆ"][index]}. ${line}`}
              storageKey={`c6-telugu-ch1-page6-synonym-line-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
