import Image from "next/image";
import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const TASKS = [
  "పాఠంలోని శతక పద్యాలను పెంపొందించి చదవండి.",
  "పద్యాలలోని విషయాన్ని ఊహించండి.",
  "అర్థంకాని పదాలకు మీ మిత్రులతో చర్చించి అర్థాలు తెలుసుకోండి.",
];

const POETS = [
  {
    title: "సుమతీ శతకం - బద్దెన",
    image: "/assets/textbooks/c6-telugu/ch5/page-52-sumathi.webp",
    alt: "బద్దెన కవి చిత్రం",
    prompt: "సుమతీ శతకం గురించి ఈ పేజీలో తెలిసిన విషయాలు రాయండి.",
  },
  {
    title: "శ్రీకాళహస్తీశ్వర శతకం - ధూర్జటి",
    image: "/assets/textbooks/c6-telugu/ch5/page-52-krishnasastri.webp",
    alt: "ధూర్జటి కవి చిత్రం",
    prompt: "ధూర్జటి గురించి ఈ పేజీలో తెలిసిన విషయాలు రాయండి.",
  },
];

export function C6TeluguCh5Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-6 pb-6 pt-5 text-lg leading-loose">
          విద్యార్థుల్లో నైతిక విలువలు పెంపొందించడం, వాటిని ఉత్తమ పోకడలుగా ఎరిగేటట్లు చేయడం ఈ పాఠ్యభాగ ఉద్దేశం.
        </p>
      </section>

      <ReadingTaskChecklist title="విద్యార్థులకు సూచనలు" tasks={TASKS} storageKey="c6-telugu-ch5-page2-tasks" />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాఠ్యభాగ వివరాలు</h3>
        <p className="px-6 pb-5 pt-4 text-lg leading-loose">
          ఈ పాఠం శతక ప్రక్రియకు చెందినది. శతకం అంటే నూరు పద్యాలు కలిగి ఉండే కవితా ప్రక్రియ. ఈ పాఠంలో సుమతీ,
          శ్రీకాళహస్తీశ్వర, కుమారీ, సుభాషిత రత్నావళి, ప్రభుతయ, గాంధీశత, భరతసింహ, భవ్యచరిత శతకాల పద్యాలను
          పరిచయం చేస్తున్నారు.
        </p>
      </section>

      <section className="rounded-sm border border-pink-300 bg-pink-50/50">
        <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">కవి పరిచయాలు</h3>
        <div className="space-y-5 px-5 pb-5 pt-4">
          {POETS.map((poet, index) => (
            <div key={poet.title} className="grid gap-4 rounded-[14px] bg-white/80 p-4 md:grid-cols-[150px_1fr]">
              <Image
                src={poet.image}
                alt={poet.alt}
                width={155}
                height={185}
                className="mx-auto h-auto w-full max-w-[155px] rounded-[12px] border border-border/60 bg-white shadow-sm"
              />
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-red-600">
                  {index + 1}. {poet.title}
                </h4>
                <TeluguAnswerBox
                  question={poet.prompt}
                  storageKey={`c6-telugu-ch5-page2-poet-${index + 1}`}
                  quickWords={["శతకం", "కవి", "పద్యాలు", "నైతిక విలువలు", "సుమతీ", "ధూర్జటి"]}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
