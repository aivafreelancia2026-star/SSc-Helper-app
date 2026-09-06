import { FigureNote } from "@/components/reader/figure-note";

// Book page 145 (PDF/app P154) — ఉపవాచకం Chapter 4: "తెలంగాణ పల్లెలు -
// సంస్కృతి", an essay celebrating Telangana village culture — farming,
// festivals, occupational communities, and more.
export function C6TeluguCh16Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <FigureNote emoji="🌾🏘️🌸" caption="తాటిచెట్లు, గడ్డికప్పు ఇళ్లు, నీళ్ళు మోస్తున్న మహిళ, పొలం దున్నుతున్న రైతుతో కూడిన తెలంగాణ పల్లె దృశ్యం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4 italic">
          భాషలో యాసల సొగసులు... కట్టుబొట్టులో సాంస్కృతిక విలువలు... పండుగల్లో ఆధ్యాత్మిక
          పరిమళాలు... పిలుపుల్లో బంధుత్వాల అనుబంధాలు... జాతరల్లో సామూహిక సంబురాలు... చేతల్లో
          ఆతిథ్యపు సౌరభాలు... ఇక్కడి రైతన్నలు, వృత్తికార్మికులు అనన్య సామాన్య ప్రతిభా
          సంపన్నులు... మానవీయ విలువలకు దర్పణాలు...
        </p>
      </section>

      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="px-6 py-5 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#765f31]">తెలంగాణ పల్లెలు - సంస్కృతి</h2>
          <p className="mt-2 text-sm font-semibold text-foreground/60">ఉపవాచకం 4</p>
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          తెలంగాణ సంస్కృతికి పల్లెలు పట్టుగొమ్మలు. ఆట, పాట, భాష, యాస, ఇప్పటికీ పల్లెల్లో సజీవంగా
          ఉన్నాయి. రైతులు, వివిధ వృత్తులవారు ఒకరికొకరు సహకరించుకుంటూ బతికేవారు. పల్లెల్లో
          ప్రజలంతా ప్రధానంగా వ్యవసాయం మీద ఆధారపడి జీవించేవారు. ఊరిమీది చెరువుతో, ఊరి కింది
          వాగుతో వారు సహజీవనం చేసేవారు. వివిధ కులాలవారు తమ వృత్తికి సంబంధించిన వస్తువులు
          తయారుచేసేవారు. వస్తుమార్పిడి జరిగేది. రైతు పండించిన పంటలో అందరికీ భాగం దక్కేది.
          పండుగలు, జాతరలు, పెండ్లిండ్లకు అన్ని వృత్తులవారి భాగస్వామ్యం ఉండేది. ప్రతి పండుగలో
          పాట ఒక భాగమైపోయేది. పాటలేని పండుగలు, వేడుకలు తెలంగాణలో లేనేలేవు.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">కొత్త పంట</h3>
        <p className="px-5 py-4">
          'కొత్తంత పండుగలేదు — అత్తంత అత్తు లేదు' అన్నది తెలంగాణలో ఒక సామెత. పంట పండగానే ప్రతి
          ఇంట్లో చేసుకునే పండుగ 'కొత్త'. వడ్లను దంచి, కొత్తబియ్యం తీసి, వండి, పదిమందిని పిలిచి,
          కడుపునిండా భోజనం పెట్టి పంపడమే కొత్త పండుగ. ఏడాదిలో రెండుసార్లు పంటను తీస్తారు
          కాబట్టి కొత్త పండుగను రెండుసార్లు చేసుకుంటారు — యాసంగి కొత్తకు కూరగాయలు కరువు,
          వానకాలం కొత్తకు పచ్చటాకులు కరువు అంటారు.
        </p>
      </section>
    </div>
  );
}
