import { FigureNote } from "@/components/reader/figure-note";

// Book page 137 (PDF/app P146) — who Sammakka and Saarakka are: the
// legend of tribal chief Medaraju finding baby Sammakka, her marriage to
// Pagididdaraju, and her benevolent rule.
export function C6TeluguCh14Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ఎవరీ సమ్మక్క - సారక్క?</h3>
        <p className="px-5 py-4">
          గిరిజనులు దేవతామూర్తులుగా కొలిచి ఆరాధించే సమ్మక్క, సారక్క ఇద్దరూ తల్లీకూతుళ్ళు, గిరిజన
          హక్కులకోసం ఎదురుతిరిగి పోరాడిన వీరవనితలు. 12వ శతాబ్దంలో పూర్వపు కరీంనగర్ జిల్లా 'పొలవాస'
          ప్రాంతాన్ని గిరిజనదొర మేదరాజు పాలిస్తుండేవాడు. సంతానం లేని అతను వేటకు వెళ్ళి అడవిలో పులుల
          మధ్య ఆడుకుంటున్న ఒక చిన్న పాపను చూసి, దేవుడిచ్చిన వరంగా భావించి ఇంటికి తెచ్చి పెంచుకుని
          'సమ్మక్క' అని పేరు పెట్టుకుంటాడు.
        </p>
      </section>

      <FigureNote emoji="🐅👶🌳" caption="అడవిలో పులుల మధ్య దొరికిన పాపను చూస్తున్న మేదరాజు చిత్రం" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          సమ్మక్క పెరిగి పెద్దదయ్యాక, కాకతీయులకు సామంతరాజైన మేడరాజు మేనల్లుడు పగిడిద్దరాజుకిచ్చి
          వివాహం చేస్తారు. సమ్మక్క మేడారం రాజ్యంలోకి అడుగుపెడుతుంది. వారికి నాగులమ్మ, సారలమ్మ అనే
          ఇద్దరు కూతుళ్ళు, జంపన్న అనే కొడుకు పుడతారు. ప్రజల పక్షం వహించి పరిపాలనలో సమ్మక్క ఎన్నో
          మార్పులు తీసుకువస్తుంది — ప్రజల బాగోగులను స్వయంగా తెలుసుకుంటుంది, అయినా మేడారం రాణి
          సమ్మక్క మాత్రం ఎప్పుడూ ప్రజల మధ్యనే ఉండేది.
        </p>
      </section>
    </div>
  );
}
