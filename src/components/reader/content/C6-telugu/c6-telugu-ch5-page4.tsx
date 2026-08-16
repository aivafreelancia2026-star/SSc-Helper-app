import Image from "next/image";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const POETS = [
  ["భరతసింహ శతకం - సూరోజు బాలనరసింహాచారి", "/assets/textbooks/c6-telugu/ch5/page-54-bharatasimha.webp", "సూరోజు బాలనరసింహాచారి చిత్రం"],
  ["భవ్యచరిత శతకం - డాక్టర్ టి.వి. నారాయణ", "/assets/textbooks/c6-telugu/ch5/page-54-bhavyacharita.webp", "డాక్టర్ టి.వి. నారాయణ చిత్రం"],
];

const STUDENT_INSTRUCTIONS = [
  "పాఠంలోని బొమ్మలను చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న పదాలు - అర్థాలు పట్టిక చూసి తెలియని పదాలకు అర్థాలు తెలుసుకోండి.",
];

export function C6TeluguCh5Page4() {
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
                  {index + 7}. {title}
                </h4>
                <TeluguAnswerBox
                  question={`${title} గురించి ఈ పేజీలో తెలిసిన విషయాలు రాయండి.`}
                  storageKey={`c6-telugu-ch5-page4-poet-${index + 1}`}
                  quickWords={["శతకం", "కవి", "ప్రసిద్ధి", "రచనలు", "తెలంగాణ", "విద్యావేత్త"]}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">విద్యార్థులకు సూచనలు</h3>
        <ul className="space-y-3 px-6 py-5 text-lg leading-loose">
          {STUDENT_INSTRUCTIONS.map((item) => (
            <li key={item} className="rounded-[12px] border border-cyan-100 bg-white/70 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          జీవితంలో అనుభవాల ద్వారా ఎన్నో విషయాలు తెలుసుకుంటూ ఉంటాము. అలానే పద్యాల రూపంలో కవులు మనకు అందించిన మంచి
          విషయాలను ఈ పాఠంలో చదివి తెలుసుకుందాం.
        </p>
      </section>
    </div>
  );
}
