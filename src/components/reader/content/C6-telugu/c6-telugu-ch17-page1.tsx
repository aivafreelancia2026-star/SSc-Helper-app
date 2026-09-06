import { FigureNote } from "@/components/reader/figure-note";

// Book page 151 (PDF/app P160) — ఉపవాచకం Chapter 5: "వాగ్గేయకారుడు
// రామదాసు" — the story of Bhakta Ramadasu, opens with background on the
// Godavari, Bhadrachalam, and the Golconda kingdom under Tanisha.
export function C6TeluguCh17Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="px-6 py-5 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#765f31]">వాగ్గేయకారుడు రామదాసు</h2>
          <p className="mt-2 text-sm font-semibold text-foreground/60">ఉపవాచకం 5</p>
        </div>
      </section>

      <FigureNote emoji="🎶🙏🪕" caption="తంబుర పట్టుకున్న భక్త రామదాసు చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">గోదావరి - భద్రాచలం</h3>
        <p className="px-5 py-4">
          భారతదేశంలో పవిత్రమైన నదుల్లో గంగా యమునల తర్వాత చెప్పుకోదగ్గది గోదావరి. గోదావరి
          మానవులకు సకల సౌభాగ్యాలను ప్రసాదిస్తుంది. ఇది దక్షిణ భారతదేశంలోని నదుల్లోకెల్లా
          పొడవైనది. మహారాష్ట్రలోని నాసిక్ త్రయంబకేశ్వర క్షేత్రంలో పుట్టి, ఎన్నో కొండల మధ్య
          ఇరుకైన మార్గాలగుండా చిన్న చిన్న నదులు కలుపుకుంటూ 900 మైళ్ళు ప్రయాణించి బంగాళాఖాతంలో
          కలుస్తుంది.
        </p>
        <p className="px-5 py-4">
          ఈ గోదావరికి ఉత్తరపుటొడ్డున దట్టమైన అడవుల మధ్య భద్రాచలం ఉన్నది. అయితే ఆ అడవుల
          మధ్యనే 16వ శతాబ్దం తర్వాత ప్రస్తుతం ఉన్న భద్రాచలం పుణ్యక్షేత్రం రూపుదిద్దుకున్నది.
          భద్రాచలాన్నే భద్రాద్రి లేక భద్రగిరి అని కూడా అంటారు.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">గోల్కొండ రాజ్యం - తానాషా</h3>
        <p className="px-5 py-4">
          దక్షిణ భారత రాజ్యాల్లో గోల్కొండ రాజ్యం కూడా ఒకటి. గోల్కొండను పాలించిన రాజులు
          ప్రజల హితం కోరినవారు. ధర్మబద్ధంగా పాలించారు. ఆ రాజుల మాతృభాష తెలుగు కాదు. అయినా
          వాళ్ళలో కొందరు తెలుగు నేర్చుకొని తెలుగు భాషను ప్రోత్సహించి తెలుగు కావ్యాలను
          అంకితంగా తీసుకున్నారుగదా. తెలుగు చాటువుల్లో కనిపించే 'మల్కిభరాముడు' గోల్కొండ ప్రభువైన
          'ఇబ్రాహీం కులీకుతుబ్‌షా' అన్నది అందరికీ తెలిసిన విషయమే.
        </p>
        <p className="px-5 py-4">
          కుతుబ్ షాహి వంశంలోని నాలుగోరాజు మహమ్మద్ కులీకుతుబ్‌షా కాలంలోనే నేటి హైదరాబాద్ నగరం
          నిర్మాణమయింది. గోల్కొండ రాజ్యాన్ని పాలించిన చిట్టచివరి రాజు అబుల్ హసన్ కుతుబ్‌షా.
          ఎంతో ఉత్తముడైన తన ప్రజలందర్నీ నిష్పక్షపాత బుద్ధితో పాలించి ప్రజలచేత 'తానాషా' అనే
          బిరుదును పొందాడు. 'తానాషా' అంటే మంచి రాజు అని అర్థం. తానాషానే సాధారణంగా తానీషా అని
          అంటారు.
        </p>
      </section>
    </div>
  );
}
