import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_AND_SAY = [
  "చేసిన మేలును చెప్పుకోకూడదని కవి ఎందుకు అని ఉండవచ్చు?",
  "వామనావతారమని కవి అన్నాడు కదా! వామనావతారంలో కలిగే పరిణామాలు ఎట్లా ఉంటాయి?",
  "కదపకుండా విషమున్నాడు కాలనాగన్ను ప్రమాదకరమని కవి అన్నాడుకదా! అది ఎట్లా చెప్పండి.",
  "‘మానవుడే మాధవుడని భావించి ప్రజలసేవ చేయాలి’ అట్లా చేసి గొప్పపేరు తెచ్చుకున్న కొందరి గురించి చెప్పండి.",
];

const PADYAM_PROMPTS = [
  "కొక్కొండ నారాయణరావు పద్యంలో చెప్పిన భావం ఏమిటి?",
  "శిరిశినహల్ కృష్ణమాచార్యులు పద్యంలో గాంధీగారి గురించి ఏ భావం ఉంది?",
  "సూరోజు బాలనరసింహాచారి పద్యంలో ఉన్న హెచ్చరికను మీ మాటల్లో రాయండి.",
  "డాక్టర్ టి.వి. నారాయణ పద్యంలో మానవసేవ గురించి చెప్పిన భావం ఏమిటి?",
];

export function C6TeluguCh5Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="grid gap-4 md:grid-cols-2">
        <Image src="/assets/textbooks/c6-telugu/ch5/page-56-gandhi.webp" alt="గాంధీజీకి నమస్కరిస్తున్న ప్రజలు" width={250} height={275} className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm" />
        <Image src="/assets/textbooks/c6-telugu/ch5/page-56-students.webp" alt="విద్యార్థులు మాట్లాడుతున్న చిత్రం" width={330} height={295} className="h-auto w-full rounded-[14px] border border-border/60 bg-white shadow-sm" />
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_AND_SAY.map((question, index) => (
            <TeluguAnswerBox key={question} question={`${index + 1}. ${question}`} storageKey={`c6-telugu-ch5-page6-think-${index + 1}`} quickWords={["మేలు", "వామనావతారం", "విషం", "ప్రమాదం", "మానవసేవ", "గాంధీ"]} />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III పద్య భావాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {PADYAM_PROMPTS.map((question, index) => (
            <TeluguAnswerBox key={question} question={`${index + 5}. ${question}`} storageKey={`c6-telugu-ch5-page6-padyam-${index + 1}`} quickWords={["భావం", "కవి", "శతకం", "గాంధీ", "మానవసేవ", "నీతిపాఠం"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
