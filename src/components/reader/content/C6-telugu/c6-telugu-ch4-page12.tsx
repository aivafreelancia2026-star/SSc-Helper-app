import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";
import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";

const SPECIAL_LETTERS = [
  "ప్రథమా విభక్తి: డు, ము, వు, లు",
  "ద్వితీయా విభక్తి: ని(న్), ను(న్), ల(న్), కూర్చి, గురించి",
  "తృతీయా విభక్తి: చేత(న్), చే(న్), తోడ(న్), తో(న్)",
  "చతుర్థీ విభక్తి: కొరకు(న్), కై (కోసం)",
  "పంచమి విభక్తి: వలన(న్), కంటే(న్), పట్టి",
  "షష్ఠీ విభక్తి: కి(న్), కు(న్), యొక్క, లో(న్), లోపల(న్)",
  "సప్తమీ విభక్తి: అందు(న్), న(న్)",
  "సంబోధనప్రథమావిభక్తి: ఓ, ఓరీ, ఓయి, ఓసి",
];

const SELF_CHECK = [
  "దర్శించిన స్థలాల గురించి వివరించగలను.",
  "అపరిచిత అంశాన్ని చదివి ప్రశ్నలకు జవాబులు రాయగలను.",
  "‘యాత్రలు విజ్ఞానాభివృద్ధికి దోహదపడతాయి’ అనే అంశాన్ని సమర్థిస్తూ రాయగలను.",
  "నేను చూసిన యాత్రావిశేషాలను వివరిస్తూ మిత్రునికి లేఖ రాయగలను.",
];

export function C6TeluguCh4Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-pink-600 px-5 py-2 text-center text-lg font-bold text-white">విభక్తి ప్రత్యయాలు</h3>
        <div className="grid gap-3 px-5 py-5 md:grid-cols-2">
          {SPECIAL_LETTERS.map((item) => (
            <p key={item} className="rounded-[12px] border border-border/60 bg-white/80 px-4 py-3 text-base leading-loose">
              {item}
            </p>
          ))}
        </div>
        <div className="px-5 pb-5">
          <TeluguAnswerBox
            question="2. పాఠంలో 5, 6, 7 పేజాలు చదివి వివిధ విభక్తులను పదాలను వెతికి రాయండి."
            storageKey="c6-telugu-ch4-page12-vibhakti"
            quickWords={["ప్రథమా", "ద్వితీయా", "తృతీయా", "చతుర్థీ", "పంచమి", "షష్ఠీ"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-[#f4efe4]">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="px-5 py-5">
          <TeluguAnswerBox
            question="పాఠంలో రామప్పగుడి, గుడ్యాలకోట, వరంగల్‌కోట, చార్మినార్, సాలార్‌జంగ్ మ్యూజియం మొదలైన వాటి గురించి తెలుసుకున్నారు కదా! వీడియోలో ఏదైనా ఒకదాని గురించి పూర్తి వివరాలు సేకరించండి. నివేదిక రాసి చదివి వినిపించండి."
            storageKey="c6-telugu-ch4-page12-project"
            quickWords={["రామప్పగుడి", "వరంగల్‌కోట", "చార్మినార్", "మ్యూజియం", "నివేదిక"]}
          />
        </div>
      </section>

      <ReadingTaskChecklist
        title="నేనివి చేయగలనా?"
        tasks={SELF_CHECK}
        storageKey="c6-telugu-ch4-page12-self-check"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white text-center">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">సూక్తి</h3>
        <p className="px-5 py-5 text-xl font-bold leading-loose">
          ఉదారచరితానాం తు వసుధైవ కుటుంబకమ్! విశాలహృదయం గలవారికి ఈ భూమండలమంతా తమ కుటుంబమే.
        </p>
      </section>
    </div>
  );
}
