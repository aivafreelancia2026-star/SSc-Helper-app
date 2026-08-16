import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK = [
  "పోతనను ‘ఉక్కు బాలుడు’ అని కవి ఎందుకు అనవరించిందీ?",
  "పాడ్యంలో పోతనను కోతి అటో పొల్చాడు కదా! ఇంకా వేటిని వేటితో పోల్చవచ్చు?",
  "‘వీడు అనిభ్యుడు!’ అని ఎవరినైనా ఏఏ సందర్భాల్లో అంటారు?",
];

export function C6TeluguCh6Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="grid gap-4 md:grid-cols-2">
        <Image src="/assets/textbooks/c6-telugu/ch6/page-66-play-top.webp" alt="పిల్లలు గ్రామంలో ఆడుతున్న చిత్రం" width={355} height={260} className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm" />
        <Image src="/assets/textbooks/c6-telugu/ch6/page-66-play-bottom.webp" alt="పోతన ఇతర పిల్లలతో ఆటలాడుతున్న చిత్రం" width={530} height={390} className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm" />
      </section>
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II పద్య భావాలు</h3>
        <div className="px-5 py-5">
          <TeluguAnswerBox question="పోతన ఆటల్లో, మాట్లాడటంలో కనిపించే చురుకుదనాన్ని మీ మాటల్లో రాయండి." storageKey="c6-telugu-ch6-page4-summary" quickWords={["పోతన", "ఆటలు", "చురుకుదనం", "బాలుడు", "ధైర్యం"]} />
        </div>
      </section>
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK.map((q, i) => (
            <TeluguAnswerBox key={q} question={`${i + 1}. ${q}`} storageKey={`c6-telugu-ch6-page4-think-${i + 1}`} quickWords={["ఉక్కు బాలుడు", "పోలిక", "ధైర్యం", "సందర్భం"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
