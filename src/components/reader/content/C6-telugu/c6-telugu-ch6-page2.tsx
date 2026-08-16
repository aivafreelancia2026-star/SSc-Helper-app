import Image from "next/image";
import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const TASKS = [
  "పాఠంలోని బొమ్మలు చూడండి. పాఠం ముందున్న ప్రవేశిక చదవండి.",
  "పాఠాన్ని చదవండి. అర్థంకాని పదాలకింద గీతలు గీయండి.",
  "అర్థంకాని పదాలను, వాక్యాలను గురించి మీ మిత్రులతో చర్చించండి.",
  "పాఠ్యపుస్తకం చివరన ఉన్న పదాలు - అర్థాలు పట్టిక చూసి తెలియని పదాలకు అర్థాలు తెలుసుకోండి.",
];

export function C6TeluguCh6Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పాఠ్యభాగ వివరాలు</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          ఈ పాఠం కావ్య ప్రక్రియకు చెందినది. కావ్యం అనగా వర్ణనతో కూడిన కవిత్వం. మహాకవి పోతన జీవితం ఆధారంగా డా॥
          వానమామలై వరదాచార్యులు రచించిన పోతన చరిత్రము అనే మహాకావ్యంలోనిది ఈ పాఠ్యభాగం.
        </p>
      </section>

      <section className="grid gap-4 rounded-sm border border-pink-300 bg-pink-50/50 p-5 md:grid-cols-[170px_1fr]">
        <Image src="/assets/textbooks/c6-telugu/ch6/page-64-poet.webp" alt="డా॥ వానమామలై వరదాచార్యులు చిత్రం" width={160} height={200} className="mx-auto h-auto w-full max-w-[160px] rounded-[12px] border border-border/60 bg-white shadow-sm" />
        <div>
          <h3 className="mb-3 inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">కవి పరిచయం</h3>
          <TeluguAnswerBox
            question="డా॥ వానమామలై వరదాచార్యులు గురించి ఈ పేజీలో తెలిసిన విషయాలు రాయండి."
            storageKey="c6-telugu-ch6-page2-poet"
            quickWords={["వరదాచార్యులు", "పోతన చరిత్రము", "కవి", "రచనలు", "విద్వాంసుడు"]}
          />
        </div>
      </section>

      <ReadingTaskChecklist title="విద్యార్థులకు సూచనలు" tasks={TASKS} storageKey="c6-telugu-ch6-page2-tasks" />

      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">ప్రవేశిక</h3>
        <p className="px-6 py-5 text-lg leading-loose">
          పోతనను కూడ రామలక్ష్మణులతో పోలుస్తారు. అతని బాల్యంలోనే కనిపించిన భక్తి, కవిత్వం, మేధస్సును తెలుసుకుందాం.
        </p>
      </section>
    </div>
  );
}
