import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SELF_CHECK = [
  "చీమలబారు కవిత రాయడంలో కవి ఉద్దేశం చెప్పగలను.",
  "వచనకవితను చదివి ప్రశ్నలకు జవాబులు రాయగలను.",
  "కవితా సారాంశాన్ని సొంతమాటల్లో రాయగలను.",
  "పాఠం ఆధారం చేసుకొని గేయాన్ని రాయగలను.",
];

// Book page 92 (PDF/app P101) — the dvandva-samasam identification
// exercise (built around an unrelated paragraph about two generous
// brothers), project work, self-assessment, maxim, then a supplementary
// "చదువండి - తెలుసుకోండి" reading begins: a passage from Gandhi's
// autobiography సత్యశోధన about his schooldays. Summarized thematically
// below rather than transcribed, since it's still someone's narrative
// prose (an autobiography excerpt), continued on the next page.
export function C6TeluguCh9Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది పేరాను చదివి అందులోని ద్వంద్వసమాస పదాలను గుర్తించి రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 italic">
            ఒక ఊరిలో ఇద్దరు అన్నదమ్ములు ఉండేవారు. వారు ఇతరులకు సహాయం చేసే గుణం కలవారు. ఇతరుల
            కష్టసుఖాలు తెలిసినవారు. ఎవరు వచ్చి అడిగినా, వారి కలిమిలేములను గురించి ఆలోచించకుండా
            తమకున్నంతలో దానధర్మాలు చేసేవారు. ఇట్లా జీవిస్తూ అందరి ప్రేమాభిమానాలు చూరగొన్నారు. మంచి
            కీర్తిప్రతిష్ఠలు పొందారు.
          </p>
          <TeluguAnswerBox
            question="పేరాలోని ద్వంద్వసమాస పదాలను రాయండి"
            storageKey="c6-telugu-ch9-page9-dvandva-find"
            quickWords={["అన్నదమ్ములు", "కష్టసుఖాలు", "కలిమిలేములు", "దానధర్మాలు", "ప్రేమాభిమానాలు", "కీర్తిప్రతిష్ఠలు"]}
          />
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>మీ పరిసరాలలోని జంతువులను, పక్షులను, కీటకాలను గమనించి వాటి ప్రత్యేకతలను పట్టిక రూపంలో రాయండి.</p>
          <p className="text-xs italic text-foreground/50">(ఉదా: తేనెటీగ — పూల నుంచి తేనెను సేకరిస్తుంది)</p>
          <TeluguAnswerBox
            question="మీ పట్టికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch9-page9-project"
            quickWords={["తేనెటీగ", "చీమ", "పక్షి", "ప్రత్యేకత"]}
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
            మంచి పనులన్నింటికీ మూలం క్రమశిక్షణయే. — బర్క్
          </p>
        </div>
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">చదువండి - తెలుసుకోండి</h3>
        <p className="px-5 py-4">
          మహాత్మా గాంధీ తన ఆత్మకథ 'సత్యశోధన'లో తన బాల్యంలో బడిలో జరిగిన ఒక సంఘటనను గుర్తుచేసుకుంటాడు
          — తన చేతిరాత అంతగా బాగోలేదని, దానిని మెరుగుపరచుకోవడంలో ఆయన ఎదుర్కొన్న ఇబ్బందుల గురించి,
          ఆ అనుభవం తనకు నేర్పిన పాఠం గురించి ఈ కథనం (కొనసాగింపు తర్వాతి పేజీలో) చెబుతుంది.
        </p>
      </section>
    </div>
  );
}
