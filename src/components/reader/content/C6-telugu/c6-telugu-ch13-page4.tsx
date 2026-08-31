import { FigureNote } from "@/components/reader/figure-note";

// Book page 134 (PDF/app P143) — Hanumappa Nayudu, a local, bravely
// steals Somanadri's horse and gets it to the Nizam's camp despite
// nearly dying in the attempt.
export function C6TeluguCh13Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          బోచెంగన్నపల్లి గ్రామానికి చెందిన హనుమప్ప నాయుడు అనే బోయ సర్దారు ఈ విషయం తెలుసుకుని, జొన్న
          చొప్పును ఒక మోపుగా కట్టి తలపై పెట్టుకుని నిజాం దేరాలను సమీపించి, చౌర్యానికి ప్రయత్నిస్తాడు.
          గుర్రాన్ని చూసి తక్కువ ధరకు అమ్మేస్తానని సైనికులను నమ్మించి, రాత్రి అందరూ నిద్రించాక
          గుర్రాన్ని కట్టిన గూటాన్ని పెకిలించి, తనమీద గడ్డి కప్పుకుని పడుకున్నట్లు నటిస్తాడు. అర్ధరాత్రి
          అలజడి రేగకుండా, భయంకరమైన నొప్పిని ఓర్చుకుంటూ, తన కుడిచేతికి కట్టిన కత్తితో కుడిచేతినే నరుక్కుని,
          రక్తపు మడుగులో ఉన్న మోచేతిని తలపాగాలో చుట్టి, గుర్రాన్ని తీసుకుని దేరాలు దాటి పారిపోతాడు.
        </p>
      </section>

      <FigureNote emoji="🌾🐴🌙" caption="గడ్డి మోపు కింద దాక్కుని, గాయపడిన చేతితో గుర్రాన్ని తీసుకువెళ్తున్న హనుమప్ప నాయుడు చిత్రం" />
    </div>
  );
}
