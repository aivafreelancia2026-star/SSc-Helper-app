import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";

const STUDENT_TASKS = [
  "పాఠంలోని బొమ్మలు చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న ‘పదాలు - అర్థాలు’ పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

export function C6TeluguCh4Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-6 pb-6 pt-5 text-lg leading-loose">
          లేఖా రచనను పరిచయం చేస్తూ తెలంగాణలోని ప్రముఖ దర్శనీయ స్థలాలను గురించి తెలియజేయడమే
          ఈ పాఠం ఉద్దేశం.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          పాఠ్యభాగ వివరాలు
        </h3>
        <p className="px-6 pb-5 pt-4 text-lg leading-loose">
          ఈ పాఠం ‘లేఖారచన’ ప్రక్రియకు చెందినది. లేఖలో విషయం ప్రధానం. ఇది వచనరూపంలో
          ఉంటుంది. లేఖల్లో వ్యక్తిగత లేఖలు, కార్యాలయ లేఖలు, వ్యాపార లేఖలు, పత్రికలకు
          లేఖలు తదితర భేదాలుంటాయి.
        </p>
      </section>

      <ReadingTaskChecklist
        title="విద్యార్థులకు సూచనలు"
        tasks={STUDENT_TASKS}
        storageKey="c6-telugu-ch4-page2-student-tasks"
      />

      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          వివిధ ప్రాంతాల సందర్శన మనకు విజ్ఞానాన్ని పెంచుతుంది. చారిత్రక స్థలాలు, దర్శనీయ
          స్థలాలు, ప్రముఖ ప్రదేశాల గురించి తెలుసుకోవడానికి లేఖారూపంలో ఉన్న ఈ పాఠం చదవండి.
        </p>
      </section>
    </div>
  );
}
