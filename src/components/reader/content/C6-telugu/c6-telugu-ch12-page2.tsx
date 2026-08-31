const STUDENT_TIPS = [
  "పాఠంలోని బొమ్మలను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న 'పదాలు - అర్థాలు' పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

// Book page 119 (PDF/app P128) — lesson intent, background note (this
// lesson is written as a సంభాషణ/dialogue between characters), reading
// tips, and the ప్రవేశిక lead-in.
export function C6TeluguCh12Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-5 py-4">
          మన చుట్టూ ఉన్న చెట్లూచేమలు, నదులు ఇవన్నీ ప్రకృతిలో భాగమే. అవి మనకు జీవనాధారమై రక్షణ
          కవచమై నిలుస్తున్నాయి. వాటికి హాని కలిగించకుండా వాటిని కాపాడుకోవడమే మన ధర్మం అని తెల్పడం
          ఈ పాఠం ఉద్దేశం.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాఠ్యభాగ వివరాలు</h3>
        <p className="px-5 py-4">
          ఈ పాఠం సంభాషణ అనే ప్రక్రియకు చెందినది. ఇద్దరు లేదా అంతకంటే ఎక్కువమంది వ్యక్తుల మధ్య జరిగే
          మాటల కొనసాగింపు సంభాషణ. సంభాషణలు మన కళ్ళముందు పాత్రలు మాట్లాడినట్లు అనుభూతిని
          కలిగిస్తాయి.
        </p>
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
          చెట్లు, పక్షులు, జంతువులు, బావులు, నదులు, చెరువులు మొదలైనవన్నీ ఈ అందమైన ప్రపంచంలో
          భాగంగా ఉన్నాయి. వీటిని మనం జాగ్రత్తగా వినియోగించుకుంటూ సుఖంగా జీవించే ప్రయత్నం చేయాలి.
          కానీ మనిషి తన బాధ్యతను మరచిపోయి ప్రకృతిని రక్షించుకోవడంలో అశ్రద్ధ చేస్తున్నాడు. అందువల్ల
          ఎన్నో అవస్థలు పడుతున్నాడు. ఆ సంగతులన్నీ తెలుసుకోవాలని ఉందా! అయితే ఈ పాఠం చదవండి.
        </p>
      </section>
    </div>
  );
}
