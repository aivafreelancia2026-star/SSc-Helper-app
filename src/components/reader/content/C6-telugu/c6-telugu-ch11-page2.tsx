import { FigureNote } from "@/components/reader/figure-note";

// Book page 109 (PDF/app P118) — background note (this is a 'పాట', song,
// from Suddala Hanumanthu's centenary song collection also titled
// 'పల్లెటూరి పిల్లగాడ'), poet bio, and lead-in.
export function C6TeluguCh11Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాఠ్యభాగ వివరాలు</h3>
        <p className="px-5 py-4">
          ఈ పాఠం 'పాట' అనే ప్రక్రియకు సంబంధించినది. ఒక పల్లవి, కొన్ని చరణాలతో లయాత్మకంగా
          పాడుకోవడానికి అనువుగా ఉండేదే పాట. సుద్దాల హనుమంతు రాసిన ఈ పాట ఆయన శతజయంతి సందర్భంగా
          ప్రచురించిన 'పల్లెటూరి పిల్లగాడ' అనే పాటల సంకలనం లోనిది.
        </p>
      </section>

      <section className="overflow-hidden rounded-sm border-2 border-pink-400 bg-pink-50/50">
        <h3 className="bg-pink-500 px-5 py-2 text-lg font-bold text-white">కవి పరిచయం</h3>
        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start">
          <div className="mx-auto w-32 shrink-0 sm:mx-0">
            <FigureNote emoji="🎤✍️" caption="సుద్దాల హనుమంతు (1910–1982)" />
          </div>
          <p>
            యాదాద్రి భువనగిరి జిల్లాలోని పాలడుగు గ్రామంలో జన్మించిన సుద్దాల హనుమంతు రెండో ఫారం వరకు
            చదువుకున్నాడు. ఆయన తన పాటల ద్వారా సామాజిక సమస్యలను, పేదల జీవితాలను ప్రజల ముందుకు
            తీసుకువచ్చిన ప్రజాకవి.
          </p>
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-5 py-4">
          పల్లెల్లో నివసించే కొందరు బీదపిల్లలు సరైన తిండిలేక, బడికి పోకుండా పశువులను కాస్తున్నారు.
          అటువంటి వాళ్ళ జీవితం ఎట్లా ఉంటుందో ఈ పాఠంలో చూద్దాం.
        </p>
      </section>
    </div>
  );
}
