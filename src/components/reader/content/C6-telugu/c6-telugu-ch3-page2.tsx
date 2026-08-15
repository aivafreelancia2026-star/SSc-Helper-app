import Image from "next/image";
import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";

const STUDENT_TASKS = [
  "పాఠంలోని బొమ్మను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న ‘పదాలు - అర్థాలు’ పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

export function C6TeluguCh3Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          పాఠ్యభాగ వివరాలు
        </h3>
        <p className="px-6 pb-5 pt-4 text-lg leading-loose">
          ఈ పాఠ్యభాగం ‘ఖండకావ్యం’ ప్రక్రియకు చెందినది. మనోవైచిత్ర్యం కలిగిన ఖండికలతో
          కూడి ఉన్న కావ్యం ఖండకావ్యం.
        </p>
      </section>

      <section className="rounded-sm border border-pink-400 bg-pink-50/50">
        <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
          కవి పరిచయం
        </h3>
        <div className="grid gap-5 px-5 pb-5 pt-4 md:grid-cols-[170px_1fr]">
          <div className="space-y-3 text-center">
            <Image
              src="/assets/textbooks/c6-telugu/ch3/page-30-poet.webp"
              alt="డా॥ పల్లా దుర్గయ్య చిత్రం"
              width={175}
              height={215}
              className="mx-auto h-auto w-full max-w-[150px] border border-pink-200 bg-white"
            />
            <div className="text-base font-bold leading-loose text-foreground">
              <p>25.05.1914</p>
              <p>19.12.1983</p>
            </div>
          </div>
          <p className="text-lg leading-loose">
            డా॥ పల్లా దుర్గయ్య మహబూబాబాద్ జిల్లాలో జన్మించారు. తెలుగులో మెట్టుమొదటి
            ఎం.ఎ. పట్టా అందుకున్నాడు. రచనలలో హాస్యం, తెలంగాణ పదజాలం సజీవంగా కనిపిస్తాయి.
          </p>
        </div>
      </section>

      <ReadingTaskChecklist
        title="విద్యార్థులకు సూచనలు"
        tasks={STUDENT_TASKS}
        storageKey="c6-telugu-ch3-page2-student-tasks"
      />

      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          వర్షాకాలం వచ్చిందంటే ప్రకృతి పులకరిస్తుంది. పిల్లలు ఆనందపడతారు. వేసవి కష్టాల
          తరువాత వానలు కొంత సేదతీరుస్తాయి. ఈ భావాన్ని ఈ పాఠం ద్వారా తెలుసుకుందాం.
        </p>
      </section>
    </div>
  );
}
