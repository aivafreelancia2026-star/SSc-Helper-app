import { FigureNote } from "@/components/reader/figure-note";

const STUDENT_TIPS = [
  "పాఠంలోని బొమ్మను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
];

// Book page 85 (PDF/app P94) — background note (గేయ కవిత form, from
// Potlapalli Ramarao's "ఆత్మవేదన" collection), poet bio, reading tips,
// and the ప్రవేశిక lead-in.
export function C6TeluguCh9Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాఠ్యభాగ వివరాలు</h3>
        <p className="px-5 py-4">
          ఈ పాఠ్యభాగం 'గేయ కవిత' అనే సాహిత్య ప్రక్రియకు చెందినది. గానం చేయడానికి అనుకూలంగా ఉండే
          కవితను గేయ కవిత అంటారు. ఈ పాఠం పొట్లపల్లి రామారావు రచించిన 'ఆత్మవేదన' కవితాసంపుటి లోనిది.
        </p>
      </section>

      <section className="overflow-hidden rounded-sm border-2 border-pink-400 bg-pink-50/50">
        <h3 className="bg-pink-500 px-5 py-2 text-lg font-bold text-white">కవి పరిచయం</h3>
        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start">
          <div className="mx-auto w-32 shrink-0 sm:mx-0">
            <FigureNote emoji="📖🧑‍🏫" caption="పొట్లపల్లి రామారావు (1917–2001)" />
          </div>
          <p>
            పొట్లపల్లి రామారావు హనుమకొండ జిల్లా ధర్మసాగరం మండలం తాటికాయల గ్రామంలో జన్మించాడు. ఆత్మవేదన,
            మెరుపులు, చుక్కలు మొదలైన కవితా సంపుటాలు, మహత్కాంక్ష, జీవితం (ఖండికలు), పగ మున్నగు రచనలు
            చేశాడు. ఈయన రచించిన 'జైలు' కథల సంపుటి బాగా ప్రసిద్ధి పొందింది. ఈయన రచన వాడుక భాషలో,
            సరళమైన శబ్దాలతో సుందరమైన శైలితో సాగింది.
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
          సృష్టిలోని ప్రాణులు విలక్షణమైన నైపుణ్యాలను కలిగి ఉంటాయి. చిన్న ప్రాణులైన చీమలు ఎంత
          కష్టపడతాయో, ఎంత క్రమశిక్షణతో మెలుగుతాయో తెలుసుకోవడానికి ఈ పాఠం చదవండి.
        </p>
      </section>
    </div>
  );
}
