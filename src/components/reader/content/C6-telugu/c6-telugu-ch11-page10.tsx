import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SELF_CHECK = [
  "పాటను రాగంతో, అభినయంతో పాడగలను.",
  "అపరిచిత పేరాను చదివి జవాబులు రాయగలను.",
  "'పిల్లల జీవితాలు చదువుకుంటేనే బాగుపడతాయి' అనే అంశాన్ని సమర్థిస్తూ రాయగలను.",
  "పల్లెటూరి పిల్లగాని జీవితాన్ని ఆత్మకథగా రాయగలను.",
];

// Book page 117 (PDF/app P126) — final page of Chapter 11: self-
// assessment, closing maxim, and a bonus "చదువండి - తెలుసుకోండి" reading
// of traditional చమత్కార పద్యాలు (witty riddle-verses, centuries-old oral
// tradition — included since the exercise itself needs the verse text to
// be solvable, same treatment as the Sumati Shatakam verse earlier).
export function C6TeluguCh11Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
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
            బాలలు భవితకు పునాదులు. వారి బాల్యాన్ని మొగ్గలోనే తుంచకండి.
          </p>
        </div>
      </section>

      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">చదువండి - తెలుసుకోండి: చమత్కార పద్యాలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <div className="rounded-md bg-white p-3">
            <p className="mb-1 font-semibold text-pink-600">1. ఆకుంటే - ఈకుంటే - మీకుంటే - మాకుంటే అనే పదాలతో సరదాగా ఒక కవి చెప్పిన పద్యం:</p>
            <p className="italic">
              ఆకుంటే వృక్షంబగు ఈకుంటే లోభియౌను హీనాత్ముండౌ మీకుంటే మాకిమ్మా మాకుంటే మేము రాము
              మల్కిభరామా!
            </p>
          </div>

          <div className="rounded-md bg-white p-3">
            <p className="mb-1 font-semibold text-pink-600">
              2. ఈ పద్యంలో దాగివున్న వస్తువు ఏమిటో ఊహించండి — ఇది వంకాయ తోటలో, వరి మళ్ళలో, జొన్న
              చేలలో, తలుపు మూలలో, తలపైనా ఉంటుంది:
            </p>
            <p className="italic">
              వంగ తోట నుండు వరి మళ్ళలో నుండు జొన్న చేల నుండు చోద్యముగను తలుపు మూల నుండు తల పైన
              నుండును దీని భావమేమి తెలిసికొనుడు.
            </p>
            <TeluguAnswerBox
              question="ఈ పద్యంలో దాగివున్న వస్తువు ఏమిటి?"
              storageKey="c6-telugu-ch11-page10-riddle2"
              quickWords={["పురుగు", "గూడు", "పేను"]}
            />
          </div>

          <div className="rounded-md bg-white p-3">
            <p className="mb-1 font-semibold text-pink-600">
              3. ఈ పద్యంలో మూడు పాదాలలోని మూడు ప్రశ్నలకూ ఒకటే సమాధానం — 'కాయనే' (కాయడానికి):
            </p>
            <p className="italic">
              మామిడేల పూచు మండు వేసంగిని! బాలుఁడేల పోవు పసుల వెంట రాజుసేన నేల రహిఁ జేర్చుచుండును!
              మూట నొక్కమాట ముద్దుకృష్ణ!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
