import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SELF_CHECK = [
  "పాఠాన్ని రాగ, భావయుక్తంగా పాడగలను.",
  "అపరిచిత పద్యాన్ని చదివి ప్రశ్నలకు సరైన జవాబులను గుర్తించగలను.",
  "పాఠ్యభాగ సారాంశాన్ని సొంతమాటల్లో రాయగలను.",
  "ఇతరుల అవసరానికి సహాయం చేయడంలో గల తృప్తిని వివరిస్తూ వ్యాసం/గేయం రాయగలను.",
];

// Book page 73 (PDF/app P82) — final page of Chapter 7 (ఉడుత సాయం): a
// vibhakti-pratyaya + parts-of-speech identification table (built around
// an unrelated paragraph about Ujjain/Vikramarka, given as free-text
// since the table needs 4 open columns per word), the chapter's project
// work, self-assessment, and closing maxim.
export function C6TeluguCh7Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            3. కింది పేరాలో ఉన్న విభక్తి ప్రత్యయాలను, భాషాభాగాలను గుర్తించి పట్టికలో రాయండి.
          </p>
          <p className="rounded-md bg-amber-50/50 p-3 italic">
            (ఉజ్జయిని, విక్రమార్కుని గురించిన పేరా — పాఠ్యపుస్తకంలో చూడండి)
          </p>
          <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60">
            <table className="w-full border-collapse text-center text-xs">
              <thead>
                <tr className="bg-[#765f31] text-white">
                  <th className="border border-white/30 px-2 py-2">ప్రత్యయము</th>
                  <th className="border border-white/30 px-2 py-2">విభక్తి పేరు</th>
                  <th className="border border-white/30 px-2 py-2">భాషాభాగ పదం</th>
                  <th className="border border-white/30 px-2 py-2">భాషాభాగం పేరు</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((row) => (
                  <tr key={row} className={row % 2 === 0 ? "bg-amber-50/50" : "bg-white"}>
                    <td className="border border-[#8b7a58]/30 px-2 py-2 text-foreground/30">…</td>
                    <td className="border border-[#8b7a58]/30 px-2 py-2 text-foreground/30">…</td>
                    <td className="border border-[#8b7a58]/30 px-2 py-2 text-foreground/30">…</td>
                    <td className="border border-[#8b7a58]/30 px-2 py-2 text-foreground/30">…</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TeluguAnswerBox
            question="పట్టికలో గుర్తించిన ప్రత్యయాలు, విభక్తులు, భాషాభాగాలను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch7-page10-table"
            quickWords={["ప్రత్యయము", "విభక్తి", "నామవాచకం", "క్రియ"]}
          />
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>రామాయణంలో పాత్రల పేర్లు తెలుసుకొని రాయండి. నివేదిక రాసి ప్రదర్శించండి.</p>
          <TeluguAnswerBox
            question="మీ నివేదికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch7-page10-project"
            quickWords={["రాముడు", "సీత", "లక్ష్మణుడు", "హనుమంతుడు", "రావణుడు"]}
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
          <div className="space-y-1 px-4 py-4 text-sm">
            <p className="font-semibold italic">యాంతి న్యాయ ప్రవృత్తస్య తిర్యంచోపి సహాయతాః ।</p>
            <p className="text-foreground/70">
              <span className="font-semibold">భావం:</span> న్యాయమార్గంలో నడిచే మహానుభావునికి పశుపక్ష్యాదులు
              కూడా సహాయపడతాయి.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
