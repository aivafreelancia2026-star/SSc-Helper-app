const STUDENT_TIPS = [
  "పాఠంలోని బొమ్మలను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న 'పదాలు - అర్థాలు' పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

// Book page 95 (PDF/app P104) — lesson intent, reading tips, ప్రవేశిక
// lead-in, and the story's opening (thematic summary, not transcribed —
// this is a folk narrative, treated the same as any story/poem under
// this app's copyright policy).
export function C6TeluguCh10Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-5 py-4">
          జానపద కథలను విని లేదా చదివి ఆబాలగోపాలం ఆనందిస్తారు. తెలంగాణలో అనేకమైన ప్రసిద్ధిచెందిన
          జానపద కథలున్నాయి. వాటిలో బహుళ ప్రజాదరణ పొందిన జానపదకథ 'బాలనాగమ్మ కథ'. ఈ అద్భుతకథ అనేక
          జానపద కళారూపాల్లో ప్రదర్శింపబడి ప్రజల మనస్సుల్లో స్థిరంగా నాటుకొని పోయింది. దాని గురించి
          తెలుపడమే ఈ పాఠం ఉద్దేశం.
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
          కథలలో జానపదకథలు ప్రత్యేకమైనవి. మానవాతీత శక్తులు, తంత్రాలు, సాహసకథనాలు ఈ కథలను నడిపిస్తాయి.
          అందుకే పిల్లలు ఆ కథలంటే చెవికోసుకుంటారు. చిన్నవాడైన బాలవద్దిరాజు తన తల్లిదండ్రులైన
          బాలనాగమ్మ, కార్యవద్దిరాజులకు వచ్చిన ఆపదను తొలగించేటందుకు చేసిన సాహసకథ ఇది. ఆ జానపదకథను
          ఇప్పుడు మనం తెలుసుకుందాం.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I — కథ ఆరంభం</h3>
        <p className="px-5 py-4">
          శ్రీకాశికి పడమటి దిక్కున దూరాన చక్రపట్నం అనే రాజ్యం ఉండేది. ఆ రాజ్యాన్ని నవాంభోజరాజు
          పరిపాలించేవాడు. అతని భార్య పేరు లక్ష్మీదేవమ్మ — వీరిద్దరి కథతో బాలనాగమ్మ కథ మొదలవుతుంది.
        </p>
      </section>
    </div>
  );
}
