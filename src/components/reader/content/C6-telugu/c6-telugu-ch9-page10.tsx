import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

// Book page 93 (PDF/app P102) — conclusion of the Gandhi autobiography
// excerpt (సత్యశోధన): the passage ends with the lesson that careful,
// unhurried practice is what eventually makes handwriting beautiful.
// Final page of Chapter 9.
export function C6TeluguCh9Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">చదువండి - తెలుసుకోండి (కొనసాగింపు)</h3>
        <p className="px-5 py-4">
          బాల్యంలో నిర్లక్ష్యం చేసిన చేతిరాతను తర్వాత సరిచేసుకోవడం ఎంత కష్టమో గాంధీజీ తన అనుభవంతో
          వివరిస్తారు. ఓపికగా, శ్రద్ధగా అక్షరాలను దిద్దుకుంటూ సాధన చేస్తే మాత్రమే అక్షరాలు అందంగా
          మారతాయని ఆయన ఈ కథనం ద్వారా తెలియజేస్తారు. (ఈ కథనం గాంధీగారి ఆత్మకథ 'సత్యశోధన' నుండి
          తీసుకోబడింది.)
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ఆలోచించండి</h3>
        <TeluguAnswerBox
          question="గాంధీజీ అనుభవం నుండి మీరు నేర్చుకున్నదేమిటి? చేతిరాతను మెరుగుపరచుకోవడానికి మీరు ఏం చేస్తారు?"
          storageKey="c6-telugu-ch9-page10-reflect"
          quickWords={["చేతిరాత", "సాధన", "ఓపిక", "గాంధీజీ"]}
        />
      </section>
    </div>
  );
}
