import Image from "next/image";
import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";

const STUDENT_TASKS = [
  "పాఠంలోని బొమ్మను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న ‘పదాలు - అర్థాలు’ పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

export function C6TeluguCh1Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          పాఠ్యభాగ వివరాలు
        </h3>
        <p className="px-6 pb-5 pt-4 text-lg leading-loose">
          ఈ పాఠం గేయ ప్రక్రియకు చెందినది. గేయం పాడుకోవడానికి వీలుగా ఉంటుంది. ఈ గేయం
          శేషం లక్ష్మీనారాయణాచార్య రచించిన “స్వర్గభారతి” అనే గేయసంకలనం నుండి తీసుకోబడింది.
        </p>
      </section>

      <section className="rounded-sm border border-pink-400 bg-pink-50/50">
        <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
          కవి పరిచయం
        </h3>
        <div className="grid gap-5 px-5 pb-5 pt-4 md:grid-cols-[180px_1fr]">
          <div className="space-y-3 text-center">
            <Image
              src="/assets/textbooks/c6-telugu/ch1/page-12-poet.webp"
              alt="శేషం లక్ష్మీనారాయణాచార్య చిత్రం"
              width={190}
              height={270}
              className="mx-auto h-auto w-full max-w-[150px] border border-pink-200 bg-white"
            />
            <div className="text-base font-bold leading-loose text-foreground">
              <p>(15-04-1947)</p>
              <p>(17-05-1998)</p>
            </div>
          </div>
          <div className="space-y-4 text-lg leading-loose">
            <p>
              శేషం లక్ష్మీనారాయణాచార్య స్వస్థలం కరీంనగర్ జిల్లాలోని నగునూర్. కనకమ్మ,
              నరహరిన్వామి దంపతులకు జన్మించిన ఈయన బాల్యంలో రంగారెడ్డి జిల్లాలో తెలుగు
              భాషోపాధ్యాయునిగా పనిచేశాడు.
            </p>
            <p>
              ఈయన అనేక పద్య, వచన, గేయ కవితలను రచించాడు. అవి వివిధ పత్రికల్లో ప్రచురింపబడ్డాయి.
              టీవీ, రేడియోలో ప్రసారమయ్యాయి. అనేకమంది శ్రోతలను ఆకట్టుకున్నాయి.
            </p>
          </div>
        </div>
      </section>

      <ReadingTaskChecklist
        title="విద్యార్థులకు సూచనలు"
        tasks={STUDENT_TASKS}
        storageKey="c6-telugu-ch1-page2-student-tasks"
      />

      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          దేశానికి వెన్నెముక రైతు. దేశాన్ని కంటిరెప్పలా కాపాడేవాడు సైనికుడు. వారిద్దరూ
          లేకపోతే దేశప్రజలకు తిండి, దేశానికి రక్షణ ఉండదు. దేశం కోసం వాళ్లిద్దరూ పడే
          శ్రమను గుర్తించడానికి ఈ పాఠం చదివి తెలుసుకోండి.
        </p>
      </section>
    </div>
  );
}
