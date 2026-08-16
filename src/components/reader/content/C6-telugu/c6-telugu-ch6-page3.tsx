import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK = [
  "‘తమ్మునిమీద ఈగను వాలనీయడు’ అంటే మీకేమర్థమయింది?",
  "అన్న తన తమ్ముడుకాళ్లు తమ్మునికి ఇచ్చాడు. ఇట్లా తమ్ముని కోసం అన్న ఇంకా ఏమేమి చేయవచ్చు?",
  "‘తిప్పన పోతన’లకు తగినట్లుగా అంటే ఏమిటో తెలుపండి. మరి మీ ఇంట్లో మీరు మీ అన్నదమ్ములతోటి లేదా అక్కాచెల్లెళ్లతోటి ఎట్లా ఉంటారు?",
];

export function C6TeluguCh6Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <Image src="/assets/textbooks/c6-telugu/ch6/page-65-pothana.webp" alt="పోతన బాల్యంలో అన్న తమ్ముళ్ల దృశ్యం" width={475} height={715} className="mx-auto h-auto w-full max-w-2xl rounded-[18px] border border-border/60 bg-white shadow-sm" />
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I పద్య భావాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox question="పోతన బాల్యంలో అన్న తమ్ముళ్ల ప్రేమ ఎలా కనిపిస్తుంది?" storageKey="c6-telugu-ch6-page3-summary" quickWords={["పోతన", "తిప్పన", "అన్న", "తమ్ముడు", "ప్రేమ"]} />
        </div>
      </section>
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK.map((q, i) => (
            <TeluguAnswerBox key={q} question={`${i + 1}. ${q}`} storageKey={`c6-telugu-ch6-page3-think-${i + 1}`} quickWords={["అన్న", "తమ్ముడు", "ప్రేమ", "ఇల్లు", "సహాయం"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
