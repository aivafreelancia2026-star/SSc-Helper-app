import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SPEAKING_TASKS = ["ఈ కథను సొంతమాటల్లో చెప్పండి."];

const SPEAKING_QUESTIONS = [
  "మీరు మీ స్నేహితులకు ఎప్పుడైనా సాయపడ్డారా? ఏ విధంగా సాయం చేశారు?",
];

const WORDS = [
  "ముదురు",
  "రొప్పుతూనే",
  "ఉరుక్కుంటూ",
  "గభగభ",
  "కానుక",
  "గుట్టుకున్న",
  "కంచె",
  "అంతఃపురం",
  "కుందేలు",
  "ఊహించుకుంది",
  "పడిపడిగా",
  "నివ్వెరపోయారు",
];

const HELEN_QUESTIONS = [
  "హెలెన్ ఎటువంటిది?",
  "హెలెన్‌ను పరవశింపజేసేది ఏది?",
  "ఎవరి జీవితంలో ఆమె ఆత్మవిశ్వాసాన్ని నింపింది?",
  "హెలెన్ ఏయే దేశాలను పర్యటించింది?",
];

export function C6TeluguCh2Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-pink-600">ఇవి చేయండి</h2>
      </section>

      <ReadingTaskChecklist
        title="I. విని, అర్థం చేసుకొని, ఆలోచించి మాట్లాడడం"
        tasks={SPEAKING_TASKS}
        storageKey="c6-telugu-ch2-page6-speaking-task"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థం చేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {SPEAKING_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 2}. ${question}`}
              storageKey={`c6-telugu-ch2-page6-speaking-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది పదాలు చదవండి. పాఠంలో ఉన్న పదాలను వెతికి వాటికింద గీతగీయండి.
          </p>
          <div className="flex flex-wrap gap-2">
            {WORDS.map((word) => (
              <span
                key={word}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-base font-semibold text-primary"
              >
                {word}
              </span>
            ))}
          </div>

          <p className="pt-4 text-lg font-bold leading-loose text-pink-600">
            కింది పేరా చదవండి. ప్రశ్నలకు జవాబులు రాయండి.
          </p>
          <p className="rounded-[14px] border border-border/60 bg-muted/30 p-4 text-base leading-loose text-foreground/80">
            హెలెన్ హృదయం కరుణతో నిండినది. ఆమె తన జీవితంలో కష్టాలను జయించి, ఇతరులకు
            ఆత్మవిశ్వాసాన్ని నింపిన వ్యక్తిగా నిలిచింది.
          </p>
          {HELEN_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch2-page6-helen-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
