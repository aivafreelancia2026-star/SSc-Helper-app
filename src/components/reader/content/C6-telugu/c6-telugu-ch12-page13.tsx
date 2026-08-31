import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const POS_BLANKS = [
  "రాధ గుడికి వెళ్ళి .................... కొట్టింది.",
  "అమ్మ చేసిన పాయసం .................... గా ఉన్నది.",
  "గోపాలు డాక్టరే కాదు, .................... యాక్టరు కూడా.",
  "నవీన్ బాసరకు ......... సరస్వతీ దేవిని దర్శించుకున్నాడు.",
  "రవి ఉరుకుతూ కిందపడి ............! అని అరిచాడు.",
];

const SELF_CHECK = [
  "'పర్యావరణ పరిరక్షణ ప్రతి ఒక్కరి బాధ్యత' అనే అంశాన్ని సమర్థిస్తూ మాట్లాడగలను.",
  "అపరిచితమైన పేరాను చదివి పట్టికను పూరించగలను.",
  "ఇచ్చిన అంశాన్ని విశ్లేషిస్తూ రాయగలను.",
  "ఇచ్చిన అంశానికి సంబంధించి పోస్టర్ తయారుచేయగలను.",
];

// Book page 130 (PDF/app P139) — final page of Chapter 12: parts-of-
// speech fill-blanks, project work, self-assessment, closing maxim.
export function C6TeluguCh12Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">5. కింది ఇచ్చిన పదాలతో ఖాళీలను పూరించండి. భాషాభాగాల పేర్లను రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">
            (పదాలు: అతను, కమ్మగా, కొబ్బరికాయ, వెళ్ళి, అబ్బా) — ఉదా: శంకర్ పామును చూసి అమ్మో! అంటూ
            పరుగెత్తాడు (అవ్యయం)
          </p>
          {POS_BLANKS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}) ${q} ( )`}
              storageKey={`c6-telugu-ch12-page13-pos-${i + 1}`}
              quickWords={["నామవాచకం", "క్రియ", "అవ్యయం"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>
            పర్యావరణానికి సంబంధించిన పాటలను, కవితలను లేదా గేయాలను సేకరించండి. నివేదిక రాసి తరగతిలో
            ప్రదర్శించండి. (లేదా) అడవులు / పశువులు / పక్షులు / చెరువులు / నేలతల్లి / బావుల
            గొప్పతనాన్ని తెలిపే వ్యాసాలను సేకరించి నివేదిక రాసి తరగతిలో ప్రదర్శించండి.
          </p>
          <TeluguAnswerBox
            question="మీ నివేదికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch12-page13-project"
            quickWords={["పర్యావరణం", "నివేదిక"]}
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
            చెఱపబోకు నీరు చెఱువు బావినదుల కోటి జీవులెల్ల కోలుకోవు జలము సుద్దిగుండ జాడ్యముల్తొలగును
            వినర వినర ఓరి! విశ్వనరుడ!
          </p>
        </div>
      </section>
    </div>
  );
}
