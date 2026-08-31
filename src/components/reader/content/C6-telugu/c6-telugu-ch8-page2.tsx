const STUDENT_TIPS = [
  "పాఠంలోని బొమ్మను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న 'పదాలు - అర్థాలు' పట్టిక చూసి, తెలియని పదాలకు అర్థాలను తెలుసుకోండి.",
];

// Book page 75 (PDF/app P84) — background note (this lesson is written as
// స్వగతం, a first-person monologue), reading tips, and the ప్రవేశిక
// (lead-in) where the lake introduces itself. The opening narration
// (Section I start) is summarized thematically below rather than
// transcribed, per policy.
export function C6TeluguCh8Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాఠ్యభాగ వివరాలు</h3>
        <p className="px-5 py-4">
          ఈ పాఠం స్వగతం ప్రక్రియకు చెందినది. అంటే ఎవరికి వారే తమకు సంబంధించిన విషయాలను తమలో తాము
          అనుకోవడం, ఎదుటివారికి తెలిసేటట్లుగా చెప్పుకోవడం స్వగతం. ఇది ఉత్తమపురుష కథనంలో ఉంటుంది.
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
          ఊరి సౌందర్యానికి తొలిమెట్టుగా, వ్యవసాయానికి ప్రధాన వనరుగా చెరువు తనను తాను పరిచయం చేసుకుంటుంది.
          బతుకమ్మలను సాగనంపే వేళ, వినాయక నిమజ్జనం వేళ ఊరి ప్రజలు తనచెంతకే వస్తారని, పిల్లలకు వేసవి
          ఆటవిడుపుగా, పశుపక్ష్యాదులకు నీటినిచ్చే కేంద్రంగా తానున్నానని చెరువు తన హృదయాంతరంగ భావాన్ని
          చెప్పుకోబోతుంది — పల్లెటూరి కల్పవల్లిగా పేరొందిన చెరువు కథ ఇక్కడ మొదలవుతుంది.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I — తొలిపలుకులు</h3>
        <p className="px-5 py-4">
          తెల్లవారుతున్న వేళ సూర్యోదయాన్ని వర్ణిస్తూ, తాను సమాజానికి కల్పతరువు వంటిదని చెరువు తన కథను
          మొదలుపెడుతుంది.
        </p>
      </section>
    </div>
  );
}
