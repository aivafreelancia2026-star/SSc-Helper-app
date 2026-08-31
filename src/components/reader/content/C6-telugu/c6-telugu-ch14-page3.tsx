import { FigureNote } from "@/components/reader/figure-note";

// Book page 138 (PDF/app P147) — the inevitable war: Pagididdaraju
// refuses tribute to Kakatiya emperor Prataparudra, and Sammakka fights
// heroically alongside her family, losing them all before mysteriously
// vanishing at Chilakalagutta.
export function C6TeluguCh14Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">యుద్ధం అనివార్యం</h3>
        <p className="px-5 py-4">
          కరువు వచ్చినప్పుడు ప్రజలపై నిర్బంధంగా పన్నులు వసూలు చేయడం సమ్మక్కకు ఇష్టం లేక, కాకతీయులకు
          కట్టాల్సిన కప్పం కట్టదు. దీంతో కోపగించిన కాకతీయ చక్రవర్తి ప్రతాపరుద్రుడు మేడారంపై యుద్ధం
          ప్రకటిస్తాడు.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">సమ్మక్క వీరోచిత పోరాటం</h3>
        <p className="px-5 py-4">
          యుద్ధవార్త విన్న సమ్మక్క భయపడదు — భర్తకు ధైర్యాన్ని నూరిపోసి, ప్రజలకోసం ప్రాణాలివ్వడానికైనా
          సిద్ధమని యుద్ధరంగంలోకి దిగుతుంది. కొడుకు జంపన్న, భర్త పగిడిద్దరాజు, కూతుళ్ళు నాగులమ్మ,
          సారలమ్మ అందరూ వీరోచితంగా పోరాడి వీరమరణం పొందుతారు — గాయపడిన జంపన్న సంపెంగవాగులో దూకి
          ప్రాణత్యాగం చేస్తాడు (ఆ వాగుకే తర్వాత 'జంపన్నవాగు' అని పేరు వచ్చింది). చివరకు సమ్మక్క ఒక్కతే
          మిగిలి, కత్తి పట్టి శత్రుసైన్యాలను ఎదుర్కొంటుంది.
        </p>
      </section>

      <FigureNote emoji="⚔️🌳🏔️" caption="చిలకలగుట్ట వద్ద కత్తి పట్టి పోరాడుతున్న సమ్మక్క చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          యుద్ధంలో గాయపడిన సమ్మక్క గుర్రంమీద ఈశాన్యదిక్కున ఉన్న చిలకలగుట్టవైపు వెళ్ళిపోతుంది. ఎంత
          వెతికినా ఆమె మళ్ళీ ఎవరికీ కనిపించదు. వెతుకుతున్న గిరిజనులకు ఒక వేపచెట్టు, దాని కింద ఒక
          పుట్ట, ఆ పుట్టపై కుంకుమ బరిణ కనిపిస్తుంది — అందులో పసుపు, కుంకుమ, చెట్టుమూలికలు
          కనిపిస్తాయి. సమ్మక్క తల్లి దేవతారూపం పొందిందని గిరిజనులు నమ్ముతారు.
        </p>
      </section>
    </div>
  );
}
