import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const POETS = [
  ["కుమారీ శతకం - పక్కి వెంకట నరసింహకవి", "/assets/textbooks/c6-telugu/ch5/page-53-kumara.webp", "పక్కి వెంకట నరసింహకవి చిత్రం"],
  ["సుభాషిత రత్నావళి - ఏనుగు లక్ష్మణకవి", "/assets/textbooks/c6-telugu/ch5/page-53-subhashita.webp", "ఏనుగు లక్ష్మణకవి చిత్రం"],
  ["ప్రభుతయ శతకం - కొక్కొండ నారాయణరావు", "/assets/textbooks/c6-telugu/ch5/page-53-prabhutvamu.webp", "కొక్కొండ నారాయణరావు చిత్రం"],
  ["గాంధీశత శతకం - శిరిశినహల్ కృష్ణమాచార్యులు", "/assets/textbooks/c6-telugu/ch5/page-53-srinivasa.webp", "శిరిశినహల్ కృష్ణమాచార్యులు చిత్రం"],
];

export function C6TeluguCh5Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-pink-300 bg-pink-50/50">
        <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">కవి పరిచయాలు</h3>
        <div className="space-y-5 px-5 pb-5 pt-4">
          {POETS.map(([title, image, alt], index) => (
            <div key={title} className="grid gap-4 rounded-[14px] bg-white/80 p-4 md:grid-cols-[150px_1fr]">
              <Image src={image} alt={alt} width={160} height={190} className="mx-auto h-auto w-full max-w-[160px] rounded-[12px] border border-border/60 bg-white shadow-sm" />
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-red-600">
                  {index + 3}. {title}
                </h4>
                <TeluguAnswerBox
                  question={`${title} గురించి ఈ పేజీలో తెలిసిన విషయాలు రాయండి.`}
                  storageKey={`c6-telugu-ch5-page3-poet-${index + 1}`}
                  quickWords={["శతకం", "కవి", "రచించారు", "పద్యాలు", "గ్రామం", "ప్రసిద్ధి"]}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
