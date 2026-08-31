import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SPLIT_WORDS = ["ప్రజలెంత", "నేనెవరిని", "పోరేమిటి", "నాకింకా", "ఇవన్నీ", "సోమనాద్రి"];

const SELF_CHECK = [
  "చెరువు గురించి మాట్లాడగలను.",
  "అపరిచితమైన పేరాను చదివి ప్రశ్నలు తయారుచేయగలను.",
  "చెరువుల అవసరాన్ని వివరిస్తూ రాయగలను.",
  "‘చెరువు’ ను ప్రశంసిస్తూ కవిత/పాట రాయగలను.",
];

// Book page 83 (PDF/app P92) — final page of Chapter 8: word-splitting
// exercise (విడదీసి రాయడం), project work, self-assessment, and the
// closing maxim (an Emerson quote in Telugu translation, public domain).
export function C6TeluguCh8Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p>
            పై వాక్యాల్లో <span className="font-semibold">ఇప్పటికైనా</span> అనే మాటలో మొదటిపదం -
            ఇప్పటికి, రెండవపదం - ఐనా. ఇట్లా రాయడాన్ని విడదీసి రాయడం అంటారు.
          </p>
          <p className="font-semibold text-pink-600">2. కింది పదాలను విడదీసి రాయండి.</p>
          {SPLIT_WORDS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word} = .......................... + ..........................`}
              storageKey={`c6-telugu-ch8-page10-split-${i + 1}`}
              quickWords={["ప్రజలు", "ఎంత", "నేను", "ఎవరిని"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>
            వివిధ పత్రికల్లో వచ్చిన (పర్యావరణ) ప్రకృతిని వర్ణించే గేయాలు/వ్యాసం/కవితలను సేకరించండి.
            నివేదిక రాసి తరగతి గదిలో చదివి వినిపించండి.
          </p>
          <TeluguAnswerBox
            question="మీ నివేదికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch8-page10-project"
            quickWords={["ప్రకృతి", "పర్యావరణం", "కవిత", "గేయం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">నేనివి చేయగలనా?</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          {SELF_CHECK.map((item) => (
            <div key={item} className="flex items-center justify-between gap-3 rounded-md bg-amber-50/50 px-3 py-2">
              <p className="flex items-center gap-2">
                <span className="text-amber-500">★</span> {item}
              </p>
              <span className="shrink-0 font-semibold text-[#765f31]">అవును / కాదు</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-xl overflow-hidden rounded-md border-2 border-[#765f31]">
        <div className="flex flex-col">
          <div className="bg-[#765f31] px-4 py-2 text-center text-lg font-bold text-white">సూక్తి</div>
          <p className="px-4 py-4 text-sm font-semibold italic">
            ప్రకృతి అడుగుజాడల్లో నడవడానికి ప్రయత్నించు. అది నీకు ఎనలేని ధైర్యాన్ని నూరిపోస్తుంది. — ఎమర్సన్
          </p>
        </div>
      </section>
    </div>
  );
}
