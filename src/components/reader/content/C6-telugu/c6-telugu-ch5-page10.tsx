import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const VIBHAKTI_ROWS = ["ఆ", "ఇ", "ఈ", "ఉ", "ఊ"];
const FILL_BLANKS = [
  "చదువు .......... మూలం లక్ష్యమే.",
  "చేసిన తప్పు .......... ఒప్పుకోనేవారు ఉత్తములు.",
  "కడుపులో విషం ఉన్నవారు కాలనాగు .......... ప్రమాదకారులు.",
  "ఘటము .......... నీరు నిండుగా ఉన్నది.",
];

export function C6TeluguCh5Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          VI. భాషను గురించి తెలుసుకుందాం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            1. కింది పాఠంలో విభక్తి ప్రత్యయాలున్నాయి. వాటిని గుర్తించి రాయండి.
          </p>
          <p className="rounded-[12px] border border-border/60 bg-white/80 px-4 py-3 text-lg leading-loose">
            ఉదా: బతుకమ్మను = ను = ద్వితీయావిభక్తి
          </p>
          {VIBHAKTI_ROWS.map((label, index) => (
            <TeluguAnswerBox
              key={label}
              question={`${label}. పదం - విభక్తి ప్రత్యయం - విభక్తి పేరు రాయండి.`}
              storageKey={`c6-telugu-ch5-page10-vibhakti-${index + 1}`}
              quickWords={["పదం", "ను", "తో", "కి", "లో", "విభక్తి"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">విభక్తి ప్రత్యయాలతో పూరించండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            2. కింది ఖాళీలను సరియైన విభక్తి ప్రత్యయాలతో పూరించి అది ఏ విభక్తో రాయండి.
          </p>
          {FILL_BLANKS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch5-page10-fill-${index + 1}`}
              quickWords={["ను", "కి", "తో", "లో", "వల్ల", "కంటే", "విభక్తి"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
