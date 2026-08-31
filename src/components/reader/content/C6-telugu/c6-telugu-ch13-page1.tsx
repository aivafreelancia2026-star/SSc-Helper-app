import { FigureNote } from "@/components/reader/figure-note";

// Book page 131 (PDF/app P140) — opening page of the ఉపవాచకం
// (supplementary reader) "సోమనాద్రి", a చారిత్రక వీరగాథ (historical
// ballad) about the founder of the Gadwal principality. This is
// biographical/historical content (like an encyclopedia entry on a real
// historical figure) rather than creative fiction, but still written
// here as an original summary in my own words rather than a paragraph-
// by-paragraph copy of the textbook's account.
export function C6TeluguCh13Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="px-6 py-5 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#765f31]">సోమనాద్రి</h2>
          <p className="mt-2 text-sm font-semibold text-foreground/60">చారిత్రక వీరగాథ — ఉపవాచకం 1</p>
        </div>
      </section>

      <FigureNote emoji="🏰⚔️👑" caption="గద్వాల కోట ప్రవేశ ద్వారం ముందు కత్తి పట్టుకున్న వీరుడి చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">గద్వాల సంస్థానం</h3>
        <p className="px-5 py-4">
          శతాబ్దాల క్రితం రెడ్డి, వెలమ వీరులు తమ బలంతో స్వతంత్ర రాజ్యాలను స్థాపించుకున్నారు. కాలక్రమంలో
          అవి ఓరుగల్లు, విజయనగర సామ్రాజ్యాల పాలనలోకి, ఆ తర్వాత నిజాం నవాబు కింద సామంత సంస్థానాలుగా
          మారాయి. వాటిలో ప్రసిద్ధి చెందినది గద్వాల సంస్థానం.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">సోమనాద్రి పరిచయం</h3>
        <p className="px-5 py-4">
          గద్వాల సంస్థాన రాజులలో మొదటివాడు, ప్రసిద్ధుడు సోమనాద్రి — ఇతనికి 'పెద్ద సోమభూపాలుడు' అనే
          పేరు కూడా ఉంది. క్రీ.శ. 1750 ప్రాంతానికి చెందినవాడు. తల్లిదండ్రులు బక్కమ్మ, పెద్దారెడ్డి;
          భార్య లింగమ్మ. గద్వాల కోటను నిర్మించింది ఇతడే. అనేక యుద్ధాలలో విజయం సాధించిన సోమనాద్రికి
          దైవానుగ్రహంతో గొప్ప నిధి లభించింది. ఆ సంపదతో నగరాన్ని, దేవాలయాలను అభివృద్ధి చేసి, కంచి,
          శ్రీరంగం, తిరుపతి వంటి ప్రాంతాల నుండి వచ్చిన కళాకారులను ఆదరించి బహుమతులిచ్చిన కళాభిమాని
          కూడా. గద్వాల సంస్థానంలోని కాణాదం పెద్దన వంటి కవులు రామాయణాది గ్రంథాలు రచించడంతో ఈ
          సంస్థానం తెలుగు సాహిత్యాభివృద్ధికి కూడా తోడ్పడింది.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">వ్యక్తిత్వం</h3>
        <p className="px-5 py-4">
          సోమనాద్రి ఆరడుగుల ఎత్తు, గంభీరమైన శరీరదారుఢ్యం కలిగినవాడు. మిత్రులకు సౌమ్యంగా, శత్రువులకు
          భయంకరంగా కనిపించేవాడు. తెల్లని జాతిగుర్రంపై స్వారీ చేస్తూ యుద్ధరంగంలో అజేయుడిగా నిలిచేవాడు.
        </p>
      </section>
    </div>
  );
}
