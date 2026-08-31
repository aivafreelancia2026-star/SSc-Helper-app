import { FigureNote } from "@/components/reader/figure-note";

// Book page 141 (PDF/app P150) — ఉపవాచకం Chapter 3: "ఎలుకమ్మ పెళ్ళి", a
// classic folktale. A childless couple, Brahmayya and his wife, are
// given a baby mouse by a crow; the wife raises it as a daughter after
// Brahmayya transforms it into a baby girl with a mantra, naming her
// మూషిక బాల.
export function C6TeluguCh15Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="px-6 py-5 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#765f31]">ఎలుకమ్మ పెళ్ళి</h2>
          <p className="mt-2 text-sm font-semibold text-foreground/60">జానపదకథ — ఉపవాచకం 3</p>
        </div>
      </section>

      <FigureNote emoji="👴👵🐭✨" caption="బ్రహ్మయ్య, అతని భార్య ఒక చిన్న ఎలుక పిల్లను చూస్తున్న దృశ్యం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          తుంగభద్రానది ఒడ్డున ఉన్న ఒక ఊరిలో బ్రహ్మయ్య, అతని భార్య నివసిస్తుంటారు. వారికి పిల్లలు
          లేకపోవడంతో ఏదైనా తెచ్చి పెంచుకోవాలని భార్యకు కోరిక కలుగుతుంది. ధనం లేకున్నా బ్రహ్మయ్యకు
          కొన్ని అపూర్వశక్తులు ఉంటాయి. ఒకరోజు అతని కుటీరం ముందు కూర్చుని ఉండగా ఒక కాకి ఎలుక
          పిల్లను నోట కరుచుకుని వెళ్తుండగా జారి బ్రహ్మయ్య ఇంటిముందర పడుతుంది. వెంటనే బ్రహ్మయ్య,
          భార్య దానిని పైకి తీసి ఒక్కంతా తుడిచి చక్కగా నిమిరారు. భార్య భర్తను చూసి, "మనకు పిల్లలు
          లేరు కదా! మీ మంత్రశక్తిని ఉపయోగించి ఈ ఎలుకను పాపగా మార్చండి" అని కోరుతుంది.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          భార్య మాట కాదనలేక, "సరే, నీ ఇష్టం!" అంటాడు బ్రహ్మయ్య. ఏదో మంత్రం జపించి కమండలంలోని నీళ్ళను
          ఆ చిట్టెలుక మీద చల్లగానే, ఆ ఎలుక చిన్న పాపగా మారిపోతుంది. బ్రహ్మయ్య భార్య ఆనందించి ఆ
          పాపను అల్లారుముద్దుగా పెంచసాగింది. వాళ్ళిద్దరూ ఆ పాపకు 'మూషిక బాల' అని పేరు పెట్టారు.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          కొంత కాలం గడిచింది. పాప పెరిగి పెద్దదయ్యింది. ఎప్పుడూ ఒకచోట స్థిరంగా ఉండకుండా తిరగడం
          అలవాటైంది. కనిపించిన వస్తువులన్నీ కోరడం, చిరుతిండ్లకోసం వెతకడం, పచ్చి కూరగాయలు తినడం,
          పప్పుడబ్బాలు వెతకడం, వడ్లబస్తాల దగ్గర, బియ్యం బస్తాల దగ్గర తిరగడం, రంధ్రాలున్న చోటనే
          ఆటలాడుకోవడం, పిల్లలు కనిపిస్తే భయంతో ఉరుకడం — ఇవన్నీ మూషికబాలకు సహజలక్షణాలుగా
          మారిపోయాయి.
        </p>
      </section>
    </div>
  );
}
