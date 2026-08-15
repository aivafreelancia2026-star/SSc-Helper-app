import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const STUDENT_TASKS = [
  "పాఠంలోని బొమ్మను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న ‘పదాలు - అర్థాలు’ పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

const ENTRANCE_QUESTIONS = [
  "మంధరకం ఎవరు?",
  "చిత్రాంగుడు ఎవరు?",
  "ఈ మాటలను మంధరకం ఎందుకు అనాల్సి వచ్చింది?",
  "మొదలైన విషయాలను ఈ పాఠం చదివి తెలుసుకుందాం.",
];

const STORY_PROMPTS = [
  "కాకి, ఎలుక, తాబేలు స్నేహంగా ఉండే కథారంభం నుంచి మీకు తెలిసిన విషయాన్ని రాయండి.",
  "కాకి ఎలుకతో ఎలా మాట్లాడింది? దాని మాటల్లోని ఆందోళనను మీ మాటల్లో రాయండి.",
];

export function C6TeluguCh2Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          పాఠ్యభాగ వివరాలు
        </h3>
        <p className="px-6 pb-5 pt-4 text-lg leading-loose">
          ఈ పాఠం ‘కథ’ అనే ప్రక్రియకు చెందినది. ఆకట్టుకొనే కథనం, సరళత, పాత్రలకు తగిన
          సంభాషణలతో కూడుకొని ఉండేదే కథ. విష్ణుశర్మ ‘పంచతంత్రం’ ఆధారంగా చిన్నయసూరి
          తెలుగులోకి అనువదించిన ‘మిత్రలాభం’లోని కథకు సరళ వచన రూపమే ఈ పాఠ్యభాగం.
        </p>
      </section>

      <ReadingTaskChecklist
        title="విద్యార్థులకు సూచనలు"
        tasks={STUDENT_TASKS}
        storageKey="c6-telugu-ch2-page2-student-tasks"
      />

      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <div className="space-y-4 px-6 py-5">
          <p className="text-lg leading-loose">
            “చిత్రాంగా! భయపడకు ఇప్పటికికు మేము ముగ్గురం స్నేహితులం. ఇప్పుడు నువ్వు కూడా
            కలిశావు. నువ్వు కూడా మాతోనే ఉండు. ఒకరికొకరం సహాయపడుతూ కలిసిమెలిసి ఉందాం”
            అంటూ మంధరకం అన్నది.
          </p>
          {ENTRANCE_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page2-entrance-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg leading-loose">
            ఈ భాగంలో కాకి, ఎలుక, తాబేలు మధ్య స్నేహం గురించి కథ మొదలవుతుంది. పూర్తి కథను
            చదివి, ముఖ్య విషయాలను మీ మాటల్లో రాయండి.
          </p>
          {STORY_PROMPTS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page2-story-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
