const DIALECT_WORDS: [string, string][] = [
  ["గమ్మున", "మాట్లాడకుండ"], ["ఇమానం", "ఒట్టు"],
  ["పిరం", "ధర ఎక్కువ"], ["కమ్మ", "పేపరు"],
  ["గొట్టు", "గటినం"], ["చెవికమ్ములు", "చెవిదుద్దులు"],
  ["జరంత", "కొంచెం"], ["కీసా", "జేబు"],
  ["లొల్లి", "గొడవ"], ["ఇగురం", "ఉపాయం"],
  ["మస్తు", "ఎక్కువ"], ["పాత్రం", "రుబ్బురాయి"],
  ["బిరాన", "తొందర"], ["విసుర్రాయి", "తిరుగలి"],
  ["సైదం", "గోధుమపిండి"], ["అంగి", "చొక్కా"],
  ["ముత్తెమంత", "కొంచెం"], ["గుల్ల", "గంప"],
  ["పైలం", "పదిలం, జాగ్రత్త"], ["పలారం", "ఫలాహారం"],
  ["బరిగ", "బెత్తం"], ["గుమ్మి", "గాదె"],
  ["నొసలు", "నుదురు"], ["కాక", "వేడి"],
  ["గజ్జెలు", "పట్టీలు / పట్టగొసులు"], ["సర్వతం/సర్దత్తం", "అట్లకాడ"],
  ["ఎనకసిరి", "తరువాత"], ["గీర, పయ్య", "చక్రం"],
  ["పిసరంత", "కొంచెం"], ["మదుగులు", "మురుకులు"],
  ["సర్తి", "జలుబు"], ["కల్యమాకు", "కరివేపాకు"],
  ["నివద్ది", "నిజం"], ["ఆగమాగం", "హడావిడి"],
];

const IDIOMS = [
  "అందేవేసిన చేయి", "అడకత్తెరలో పోకచెక్క", "అద్దపద్ద", "అన్నెము పున్నెము",
  "ఇల్లుగుల్లచేయు", "అరటిపండ్లొలిచినట్టు", "అరచేతినిమ్మపండు", "ఉగ్గపాలతోపెట్టు",
  "కంకణముకట్టుకొను", "కంట్లో వత్తులేసుకుని", "కడుపులో పెట్టుకోను", "కడుపులో చల్ల కదులకుండ",
  "కత్తినూరుట", "కన్నుకుట్టు", "కన్నులు నెత్తికెక్క", "కప్పల తక్కెడ",
  "కలగూరగంప", "కాలికి బుద్ధిచెప్పు", "కాలుగాలిన పిల్లి", "కొండపిండిగొట్టు",
  "నేతిబీరకాయ", "కొట్టినపిండి", "కొమ్ములు తిరిగినవారు", "పెదచెవినిబెట్టు",
  "ముక్కుపచ్చలారని", "మేకవన్నెపులి", "మోసలక్రిన్నీరు", "రెండునాలుకలు",
  "నోటికి తాళంవేయు", "చేతికి ఎముకలేనోడు", "తెగదాకా లాగొద్దు", "తీగకు కాయబరువా",
  "ఎంగిలిచేత్తో కాకినికొట్టడు", "తేనెలో నీటిబొట్టు", "కుండ బద్దలుకొట్టినట్టు", "అరచేతిలో వైకుంఠం",
];

// Book page 171 (PDF/app P180) — final page of the book: కొన్ని తెలంగాణ
// పదాలు (Telangana dialect word glossary) and కొన్ని మన జాతీయాలు
// (traditional Telugu idioms) — factual reference lists.
export function C6TeluguCh18Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="space-y-3">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">కొన్ని తెలంగాణ పదాలు</h3>
        <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60 bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-amber-100">
                <th className="border border-[#8b7a58]/30 px-3 py-2">తెలంగాణ పదం</th>
                <th className="border border-[#8b7a58]/30 px-3 py-2">అర్థం</th>
              </tr>
            </thead>
            <tbody>
              {DIALECT_WORDS.map(([word, meaning], i) => (
                <tr key={word} className={i % 2 === 0 ? "bg-white" : "bg-amber-50/40"}>
                  <td className="border border-[#8b7a58]/30 px-3 py-2 font-semibold text-[#765f31]">{word}</td>
                  <td className="border border-[#8b7a58]/30 px-3 py-2">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">కొన్ని మన జాతీయాలు</h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 rounded-md border border-[#8b7a58]/60 bg-white p-4 sm:grid-cols-2">
          {IDIOMS.map((idiom, i) => (
            <p key={idiom}>
              {i + 1}. {idiom}
            </p>
          ))}
        </div>
      </section>

      <p className="pt-4 text-center text-sm font-semibold italic text-foreground/50">
        — తెలుగు, 6వ తరగతి పాఠ్యపుస్తకం సమాప్తం —
      </p>
    </div>
  );
}
