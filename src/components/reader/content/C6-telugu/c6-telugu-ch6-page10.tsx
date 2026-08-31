import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MATCH_LEFT = ["నామవాచకం", "సర్వనామం", "విశేషణం", "క్రియ", "అవ్యయం"];
const MATCH_RIGHT = ["చదివింది", "కాని", "ఆమె", "ఎర్రని", "హైదరాబాదు"];

const FILL_BLANKS = [
  "నామవాచకానికి లేదా సర్వనామానికి ఉన్న గుణాన్ని తెలిపేది",
  "నామవాచకానికి బదులుగా వాడేది",
  "పనిని తెలిపే మాట",
  "లింగవచనవిభక్తులు లేనిది",
  "పేరును తెలిపే పదం",
];

const SELF_CHECK = [
  "సోదరుల మధ్య ప్రేమ తగ్గడానికి గల కారణాలను చెప్పగలను.",
  "అపరిచిత పద్యాన్ని చదివి అర్థంచేసుకొని భావంలోని ఖాళీలను పూరించగలను.",
  "పోతన బాల్యాన్ని గురించి సొంతమాటల్లో రాయగలను.",
  "పాఠం ఆధారంగా వ్యాసం / సంభాషణను రాయగలను.",
];

// Book page 63 (PDF P72) — final page of Chapter 6 (పోతన బాల్యం): a
// parts-of-speech matching exercise, grammar-term fill-blanks, the
// chapter's project-work prompt, its self-assessment checklist, and the
// closing సూక్తి (maxim). All open/free-text — no single "correct" string
// to grade against for any of these, consistent with the rest of the app.
export function C6TeluguCh6Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">2. కింది వాటిని జతపరచండి.</p>
          <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60">
            <table className="w-full border-collapse text-center">
              <tbody>
                {MATCH_LEFT.map((word, i) => (
                  <tr key={word} className={i % 2 === 0 ? "bg-amber-50/50" : "bg-white"}>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 text-left font-semibold">
                      {String.fromCharCode(3077 + i)}. {word}
                    </td>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 text-foreground/40">( &nbsp;&nbsp;&nbsp; )</td>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 text-left font-semibold">
                      {String.fromCharCode(3079 + i)}. {MATCH_RIGHT[i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TeluguAnswerBox
            question="జతపరిచిన జవాబులను ఇక్కడ రాయండి (ఉదా: అ-ఖ)"
            storageKey="c6-telugu-ch6-page10-match"
            quickWords={MATCH_LEFT}
          />

          <p className="text-base font-bold text-pink-600">3. కింది ఖాళీలను పూరించండి.</p>
          {FILL_BLANKS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q} ..........................`}
              storageKey={`c6-telugu-ch6-page10-fill-${i + 1}`}
              quickWords={["నామవాచకం", "సర్వనామం", "విశేషణం", "క్రియ", "అవ్యయం"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>
            మీకు తెలిసిన వారిలో ఎవరైనా ఆత్మీయంగా కలిసివుండే అన్నదమ్ముల కుటుంబాన్ని కలవండి. ఆ అన్నదమ్ములు
            ఏవిధంగా కలిసి మెలిసి వుంటున్నారో తెలుసుకొని నివేదిక రాయండి. ప్రదర్శించండి.
          </p>
          <TeluguAnswerBox
            question="మీ నివేదికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch6-page10-project"
            quickWords={["అన్నదమ్ములు", "కుటుంబం", "ప్రేమ", "కలిసి", "నివేదిక"]}
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
        <div className="flex">
          <div className="flex w-28 shrink-0 items-center justify-center bg-[#765f31] px-3 py-6 text-lg font-bold text-white">
            సూక్తి
          </div>
          <p className="flex items-center px-4 py-4 text-sm font-semibold italic">
            గాలి ఎటు వీస్తుంటే అటు పుష్ప పరిమళం కూడా వ్యాపిస్తుంది. కానీ సత్పురుషుడు చేసిన సత్కార్యాలు గాలికే
            ఎదురుగా వెళ్ళి కీర్తిని వ్యాపింపచేస్తాయి.
          </p>
        </div>
      </section>
    </div>
  );
}
