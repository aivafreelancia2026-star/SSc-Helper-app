import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const ACTING_TASKS = ["గేయాన్ని పాడుతూ అభినయించండి."];

const THINK_QUESTIONS = [
  "ప్రకృతి మార్దవుకులని ఎవరంటారు? ఇట్లాంటివారి ఎల్ల కొన్ని చెప్పండి. సమాజానికి వీరి అవసరం ఏమిటి?",
];

const KEY_WORD_TASKS = [
  "పాఠాన్ని చదవండి. రైతులు, సైనికుల గొప్పదనాన్ని తెలిపే ముఖ్యమైన పదాలను గుర్తించి రాయండి.",
];

const FILL_QUESTIONS = [
  "భరతమాతకు నమస్కారం చేసే పదాలు",
  "పల్లెలు సుభారత గృహసీమకు ఏమిటి?",
  "‘ప్రగతికి సోపానాలు’ లో సోపానాలు అంటే ఏమిటి?",
  "నివాసం అనే అర్థం వచ్చే పదాలు",
];

export function C6TeluguCh1Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#765f31] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">సారాంశం</h3>
        <div className="space-y-4 px-6 py-5 text-lg leading-loose">
          <p>
            రైతులకు సైనికులకు వందనాలు. వెచ్చుకోవడం అనే చల్లని వందనాలను వారికి సమర్పిస్తున్నాం.
            కష్టాన్ని దాచుకోని రైతులకు, ఎవరికీ తలవంచని సైనికులకు దేశాభివృద్ధికి మార్గమైన ఈ
            గొప్పవారికి వందనాలు, అభినందనలు.
          </p>
          <p>
            నెల్లలు సంతోషపడేటట్లుగా, నేత్రం చెమరుగా మారుతుండగా, బంగారాన్ని పండిస్తూ,
            అభివృద్ధికి బాటలు చూపే రైతులకు వందనాలు. కంటికి రెప్పవలె, చేతిముట్టా కంచెవలె,
            ఈ జన్మభూమికి కవచంవలె ఉండి కాపాడుతున్న గొప్ప వీరులైన జవానులకు వందనాలు.
          </p>
        </div>
      </section>

      <section className="rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-pink-600">ఇవి చేయండి</h2>
      </section>

      <ReadingTaskChecklist
        title="I. విని, అర్థం చేసుకొని, ఆలోచించి మాట్లాడడం"
        tasks={ACTING_TASKS}
        storageKey="c6-telugu-ch1-page5-acting"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థం చేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 2}. ${question}`}
              storageKey={`c6-telugu-ch1-page5-think-q${index + 1}`}
            />
          ))}
        </div>
      </section>

      <ReadingTaskChecklist
        title="II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం"
        tasks={KEY_WORD_TASKS}
        storageKey="c6-telugu-ch1-page5-key-words"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఖాళీలను పూరించండి
        </h3>
        <p className="px-5 pt-4 text-base leading-loose text-foreground/80">
          పల్లెలు మనపాలిటి కల్పతరువులా - నవభారత గృహసీమకు మెటిదీలలా మానవతకు మందిరాలు
          మమతలకి పట్టినిల్లు - మన సంపద నిలయాలు భరతమాత నమాలు ప్రగతికి సోపానాలు
          సురగి తారాణాలు - ముద్దుగా త్రిటికి మనుగడ మణిదీపాలు
        </p>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {FILL_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch1-page5-fill-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
