import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SANDHI_EXAMPLES = ["వారు + ఉండిరి = వారుండిరి", "ఎవరికి + ఎంత = ఎవరికెంత", "ఇంక + ఒకరు = ఇంకొకరు"];
const SANDHI_ITEMS = ["మీరు + ఎవరు", "పది + ఇంతలు", "ఏది + ఐనా", "పట్టిన + అంత"];

const SELF_CHECK = [
  "నాకు తెలిసిన ఒక జానపదకథను సొంతమాటల్లో చెప్పగలను.",
  "పాఠం ఆధారంగా పాత్రల స్వభావాన్ని గురించి పట్టికలో రాయగలను.",
  "బాలనాగమ్మ కథను సొంత మాటల్లో రాయగలను.",
  "పాఠం ఆధారంగా సంభాషణలు రాయగలను.",
];

// Book page 107 (PDF/app P116) — final page of Chapter 10: కలిపి రాయడం
// (sandhi/combining words) grammar section, project work, self-
// assessment, and closing maxim.
export function C6TeluguCh10Page14() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">కలిపి రాయడం (సంధి)</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p>కింది వాటిని పరిశీలించండి.</p>
          <div className="space-y-1 rounded-md bg-amber-50/50 p-3">
            {SANDHI_EXAMPLES.map((line, i) => (
              <p key={line}>
                {i + 1}. {line}
              </p>
            ))}
          </div>
          <p>
            పై ఉదాహరణల్లో రెండేసి పదాలు కలిసి ఒకే పదంగా ఏర్పడటం గమనించారుకదా! ఇట్లా రాయడాన్ని
            కలిపిరాయడం అంటారు. దీనికే 'సంధి' అని పేరు.
          </p>

          <p className="font-semibold text-pink-600">2. కింది పదాలను కలిపి రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">ఉదా: సెలవు + ఇచ్చి = సెలవిచ్చి</p>
          {SANDHI_ITEMS.map((item, i) => (
            <TeluguAnswerBox
              key={item}
              question={`${String.fromCharCode(3077 + i)}. ${item} =`}
              storageKey={`c6-telugu-ch10-page14-sandhi-${i + 1}`}
              quickWords={["కలిపి", "సంధి"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>గ్రంథాలయంనుంచి గాని, వార్తాపత్రికలనుంచి గాని ఏదైనా జానపద కథను సేకరించి, నివేదిక రాసి తరగతిలో చెప్పండి.</p>
          <TeluguAnswerBox
            question="మీ నివేదికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch10-page14-project"
            quickWords={["జానపదకథ", "నివేదిక"]}
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
            చుట్టూ ఆవరించి ఉన్న చీకటిని తిట్టుకుంటూ కూర్చోవడం కంటే ప్రయత్నించి చిన్న దీపాన్నయిన
            వెలిగించడం మంచిది.
          </p>
        </div>
      </section>
    </div>
  );
}
