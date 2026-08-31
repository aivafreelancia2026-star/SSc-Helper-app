import { FigureNote } from "@/components/reader/figure-note";

// Book page 136 (PDF/app P145) — ఉపవాచకం Chapter 2: "మన జాతర - జన జాతర"
// (సమ్మక్క-సారక్కల మేడారం జాతర). Explains what a jatara means to
// Telangana communities and introduces Medaram, Asia's largest tribal
// gathering.
export function C6TeluguCh14Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="px-6 py-5 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#765f31]">మన జాతర - జన జాతర</h2>
          <p className="mt-2 text-sm font-semibold text-foreground/60">
            (సమ్మక్క - సారక్కల మేడారం జాతర) — ఉపవాచకం 2
          </p>
        </div>
      </section>

      <FigureNote emoji="🛕🎉👣" caption="మేడారం జాతరకు వచ్చిన లక్షలాది భక్తుల సందడి చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">జాతర అంటే ఏమిటి?</h3>
        <p className="px-5 py-4">
          జాతర అంటే జనం ఒక్కచోట కూడి, కష్టసుఖాలు పంచుకోవడం. 'జాతర' అనే మాట సంస్కృత పదం 'యాత్ర'కు
          వికృతిరూపం. దూరంగా ఉండే బంధువులు, మిత్రులు కూడా ఒక ఊరిలో కలుసుకుని మాట్లాడుకునేది
          జాతరల్లోనే. ఇలా వాగుపక్కన, అడవి మధ్యన రెండు మూడు రోజులు జరిగే జాతరల వెనుక అసలు ఉద్దేశం
          మనుషులు కలుసుకోవడం, పరస్పరం పంచుకోవడం.
        </p>
      </section>

      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">జాతర జరిగే స్థలం</h3>
        <p className="px-5 py-4">
          ప్రస్తుతం భారతదేశంలోనే అతిపెద్ద గిరిజన జాతరగా పేరుపొందిన 'మేడారం' జాతర గురించి తెలుసుకుందాం.
          జయశంకర్ జిల్లా తాడ్వాయి మండలం మేడారం గ్రామం దగ్గర అడవిమధ్యలో 'చిలకల గుట్ట' ఉంది. చుట్టూ
          దట్టమైన అడవి. ఇక్కడ రెండేళ్లకొకసారి మూడు రోజులపాటు జాతర జరుగుతుంది — మాఘ శుద్ధ పౌర్ణమి
          (ఫిబ్రవరిలో) మొదలుకొని మూడురోజులపాటు జరిగే ఈ జాతరనే సమ్మక్క-సారక్క జాతర అంటారు. తెలంగాణతో
          పాటు ఆంధ్రప్రదేశ్, మహారాష్ట్ర, ఛత్తీస్‌గఢ్, జార్ఖండ్, మధ్యప్రదేశ్ రాష్ట్రాల నుండి కూడా
          లక్షలాది భక్తులు వచ్చి మొక్కులు తీర్చుకుంటారు.
        </p>
      </section>
    </div>
  );
}
