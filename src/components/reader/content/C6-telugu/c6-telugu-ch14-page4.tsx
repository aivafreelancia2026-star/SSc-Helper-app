import { FigureNote } from "@/components/reader/figure-note";

// Book page 139 (PDF/app P148) — Medaram falls to the Kakatiyas;
// Prataparudra dreams of goddess Ekaveeradevi and orders the jatara to
// begin; how the jatara is conducted (గద్దెలు, priest rituals,
// procession).
export function C6TeluguCh14Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">రాజు కల</h3>
        <p className="px-5 py-4">
          మేడారం కాకతీయుల వశమవుతుంది. విజయగర్వంతో ఉన్న ప్రతాపరుద్రుని కలలో అతని కులదైవం
          'ఏకవీరాదేవి' కనిపించి, సమ్మక్క మానవరూపంలో వచ్చిన దేవత అని, ఆమెకు జాతర జరిపించాలని
          చెప్తుందట. వెంటనే రాజు తన పురోహితుడిని మేడారం పంపి జాతర ఏర్పాట్లకు ఆదేశిస్తాడు.
        </p>
      </section>

      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">జాతర జరిగే విధానం</h3>
        <p className="px-5 py-4">
          జాతరకు ప్రత్యేకంగా గిరిజన పురోహితులు ఉంటారు. వారు నియమనిష్ఠలతో జాతర కార్యక్రమం చేస్తారు.
          చిలకలగుట్టను గిరిజనులు పవిత్రమైనదిగా భావిస్తారు — ఆ గుట్టపైకి ఎవరూ పోరు. జాతరకు ముందుగా ఒక
          కోయ యువకుడు చిలకలగుట్ట మీదికి పోయి పసుపు కుంకుమ ఉన్న బరిణను, వెదురుగదను తెచ్చి గద్దెలపై
          నిలపడంతో జాతర మొదలవుతుంది. ఆ యువకుడు పూనకంతో ఉంటాడు.
        </p>
      </section>

      <FigureNote emoji="🕺💃🐂🛒" caption="ఎడ్లబండ్లతో, గుంపులుగా జాతరకు తరలివస్తున్న భక్తులు, పండ్ల విక్రేతలతో సందడిగా ఉన్న మేడారం జాతర దృశ్యం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          సమ్మక్క గాయపడ్డ చోటును 'తల్లిగద్దె' అని, సారలమ్మ వీరమరణం పొందిన చోటును 'పిల్లగద్దె' అని
          అంటారు. ఈ తతంగాన్ని 'దేవతలను ఆహ్వానించడం' అంటారు. తర్వాత భక్తులు గద్దెలను దర్శించుకోవడం
          మొదలవుతుంది. మూడవనాడు దేవతల వనప్రవేశంతో జాతర ముగుస్తుంది.
        </p>
      </section>
    </div>
  );
}
