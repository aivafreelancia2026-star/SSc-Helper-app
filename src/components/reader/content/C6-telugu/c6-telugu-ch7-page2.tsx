import { FigureNote } from "@/components/reader/figure-note";

const STUDENT_TIPS = [
  "పాఠంలోని బొమ్మను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న 'పదాలు - అర్థాలు' పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

// Book page 65 (PDF P74) — background note (దwipada form, from Ranganatha
// Ramayanam's యుద్ధకాండ), poet bio (Gona Buddareddi, 13th century), reading
// tips, and the ప్రవేశిక (lead-in) explaining the three tiers of helpfulness
// the chapter frames — all factual/instructional, safe to reproduce in full.
export function C6TeluguCh7Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పార్శ్వభాగ వివరాలు</h3>
        <p className="px-5 py-4">
          ఈ పాఠం 'ద్విపద' ప్రక్రియకు చెందినది. ద్విపదలో రెండు పాదాలుంటాయి. ఇది పాడుకోవడానికి అనువుగా
          ఉంటుంది. ఈ పాఠం 'రంగనాథ రామాయణం' లోని 'యుద్ధకాండ' లోనిది.
        </p>
      </section>

      <section className="overflow-hidden rounded-sm border-2 border-pink-400 bg-pink-50/50">
        <h3 className="bg-pink-500 px-5 py-2 text-lg font-bold text-white">కవి పరిచయం</h3>
        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start">
          <div className="mx-auto w-32 shrink-0 sm:mx-0">
            <FigureNote emoji="📜👑" caption="గోన బుద్ధారెడ్డి (13వ శతాబ్దం)" />
          </div>
          <p>
            గోన బుద్ధారెడ్డి 13వ శతాబ్దివాడు. ఇతడు కాకతీయుల సామంతరాజు. వర్తమాన పురం (ప్రస్తుతం నందివడ్డెమాన్,
            నాగర్‌కర్నూలు జిల్లా లోనిది) రాజధానిగా పాలించాడు. తన తండ్రిపేరిట 'రంగనాథ రామాయణం' యుద్ధకాండ వరకు
            ఇతడు రాయగా మిగిలిన భాగాన్ని ఇతని కుమారులు కాచ భూపతి, విఠలనాథుడు పూర్తిచేశారు. ఇది తెలుగులో తొలి
            రామాయణం. ఇందులోని శైలి సరళంగా, మధురంగా ఉంటుంది.
          </p>
        </div>
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">విద్యార్థులకు సూచనలు</h3>
        <ul className="space-y-2 px-5 py-4">
          {STUDENT_TIPS.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="mt-1 text-pink-500">★</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-5 py-4">
          పరస్పర సహాయసహకారాలు మనుషులకైనా, జంతువులకైనా అవసరం. అయితే సమాజంలో మూడురకాల వారుంటారు. మొదటిరకం వారు
          అధములు. వీరు ఎవరైనా సహాయం చేయుమని కోరినా చేయరు. రెండవరకం వారు మధ్యములు. వీరు ఎవరైనా సహాయం చేయుమని
          కోరితేనే సహాయం చేస్తారు. మూడవరకం వారు ఉత్తములు. వీరు ఇతరుల అవసరాలను గుర్తించి తముకు తాముగా సహాయం
          చేస్తారు. ఉత్తమ లక్షణం గలిగిన ఉడుత గురించి ఈ పాఠంలో చదువుకుందాం.
        </p>
      </section>
    </div>
  );
}
