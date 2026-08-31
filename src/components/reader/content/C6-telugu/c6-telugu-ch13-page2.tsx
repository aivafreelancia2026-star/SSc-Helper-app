import { FigureNote } from "@/components/reader/figure-note";

// Book page 132 (PDF/app P141) — Somanadri builds Gadwal fort near
// Uppedu, whose fort is under Golconda's Syed Dawood Miya; a land
// dispute leads Dawood Miya to declare war.
export function C6TeluguCh13Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          సోమనాద్రి 'పూడూరు'ను రాజధానిగా చేసుకుని ఆ ప్రాంతాన్ని పాలిస్తుండగా, వేటకు వెళ్ళిన అతను ఒక
          ప్రాంతం తన రాజధానికి అనుకూలంగా ఉంటుందని భావించి అక్కడ కోట నిర్మాణం మొదలుపెడతాడు.
          అయితే ఆ ప్రాంతానికి సమీపంలోని 'ఉప్పేడు' కోటను గోల్కొండ నవాబు తరపున సయ్యద్ దావూద్ మియా
          పాలిస్తుంటాడు. తన ఏలుబడిలో ఉన్న స్థలంలో కోట కట్టడానికి వీలులేదని అతను అభ్యంతరం చెప్తాడు.
          సోమనాద్రి తగిన కప్పం చెల్లిస్తానని ఒప్పించి వేగంగా కోట నిర్మాణం పూర్తి చేస్తాడు — కానీ
          మాట ప్రకారం కప్పం చెల్లించడు. దీంతో దావూద్ మియా ఆగ్రహించి యుద్ధం ప్రకటిస్తాడు.
        </p>
      </section>

      <FigureNote emoji="🏰⚔️🗡️" caption="గద్వాల కోట ప్రవేశ ద్వారం ముందు కత్తి పట్టుకున్న సోమనాద్రి చిత్రం" />
    </div>
  );
}
