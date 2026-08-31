import { FigureNote } from "@/components/reader/figure-note";

// Book page 140 (PDF/app P149) — final page: offerings (బంగారం
// jaggery-gold), the jatara's history since 1940 and official government
// recognition since 1996, and a closing environmental-protection message.
export function C6TeluguCh14Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <FigureNote emoji="🌾🎁🙏" caption="గద్దెల వద్ద భక్తులు సమర్పించిన బెల్లం, వస్త్రాలు, రంగురంగుల మొక్కుబడుల కుప్ప" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">అమ్మవారి మొక్కులు</h3>
        <p className="px-5 py-4">
          భక్తులు రకరకాలుగా మొక్కులు చెల్లించుకుంటారు. ఈ జాతరలో బెల్లాన్ని 'బంగారం' అంటారు — భక్తులు
          తమ బరువుకు సరిపోయిన బెల్లాన్ని కొని అమ్మవారికి సమర్పించుకుంటారు. అంతేకాకుండా బట్టలు,
          తలవెంట్రుకలు, వెదురుతొట్టెలు కట్టడం, కోళ్ళను కట్టివేయడం వంటి రూపాల్లో కూడా మొక్కులు
          తీర్చుకుంటారు.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          వందల సంవత్సరాల చరిత్ర ఉన్న ఈ జాతర 1940 నుండి ఎక్కువ ప్రాచుర్యంలోకి వచ్చింది. 1996
          సంవత్సరం నుండి ప్రభుత్వం ఈ పండుగను అధికారికంగా నిర్వహిస్తున్నది. తెలంగాణ రాష్ట్రం
          ఏర్పడిన తర్వాత ఈ పండుగకు మరింత ప్రాచుర్యం ఏర్పడింది.
        </p>
      </section>

      <section className="rounded-sm border-2 border-emerald-500 bg-emerald-50/40">
        <h3 className="bg-emerald-600 px-5 py-2 text-lg font-bold text-white">పర్యావరణాన్ని రక్షించండి</h3>
        <p className="px-5 py-4">
          మానవ మనుగడకు, అభివృద్ధికి ప్రకృతి ఎంతో ముఖ్యం. చెట్లు, గుట్టలు, వాగులు, వంకలు, ఏర్లు వీటిని
          కాపాడుకోవాల్సిన బాధ్యత మనమీద ఉంది. ఇప్పుడు ప్లాస్టిక్ వాడకం పెరిగి, జాతరలకు వెళ్ళినప్పుడు
          ప్లాస్టిక్ చెత్త కుప్పలుగా తయారవుతూ పర్యావరణాన్ని దెబ్బతీస్తున్నది. జాతరలతో సుఖసంతోషాలు
          పొందాలే కానీ పర్యావరణాన్ని పాడుచేసుకోకూడదు — ఏ జాతరకు వెళ్ళినా పర్యావరణానికి హాని కలిగించే
          పనులు చేయకూడదు.
        </p>
      </section>
    </div>
  );
}
