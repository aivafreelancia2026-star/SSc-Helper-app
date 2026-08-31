import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "పై బొమ్మలో మీకు ఎవరెవరు కనిపిస్తున్నారు?",
  "వారు ఏం చేస్తున్నారు?",
  "వారు చేసే పనులవల్ల ఎవరికి మేలు జరుగుతుంది?",
  "మీరు ఎవరికి, ఎప్పుడు, ఏ సందర్భంలో సహాయం చేశారు?",
];

// Book page 64 (PDF P73) — Chapter 7 title page: "ఉడుత సాయం" (The Squirrel's
// Help) by గోన బుద్ధారెడ్డి, a దwipada episode from Ranganatha Ramayanam's
// యుద్ధకాండ (the bridge-building episode). Illustration is a family
// helping-each-other scene — represented with an emoji stand-in per this
// app's policy, not the actual textbook photo.
export function C6TeluguCh7Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50/60">
        <div className="grid grid-cols-[88px_1fr] bg-[#765f31] text-white">
          <div className="flex items-center justify-center border-r-8 border-amber-50 py-5 text-6xl font-bold">7</div>
          <div className="flex flex-col justify-center px-6 py-5 text-center">
            <h2 className="font-heading text-4xl font-bold">ఉడుత సాయం</h2>
            <p className="mt-2 text-lg font-semibold">గోన బుద్ధారెడ్డి</p>
          </div>
        </div>
      </section>

      <h3 className="inline-block bg-pink-600 px-5 py-2 text-lg font-bold text-white">
        బొమ్మను చూడండి - ఆలోచించండి - మాట్లాడండి
      </h3>
      <FigureNote
        emoji="🧹👨‍👩‍👧🐿️🚸"
        caption="ఇంటిపనుల్లో ఒకరికొకరు సాయం చేసుకునే కుటుంబం — తుడవడం, బట్టలు ఉతకడం, రోడ్డు దాటడంలో సాయం చేయడం చూపే చిత్రం"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-4 py-2 text-lg font-bold text-white">ప్రశ్నలు</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch7-page1-q${index + 1}`}
              quickWords={["సాయం", "కుటుంబం", "పని", "అందరికీ", "మేలు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-cyan-600 bg-cyan-50/40">
        <h3 className="bg-cyan-600 px-5 py-2 text-lg font-bold text-white">పాఠం ఉద్దేశం</h3>
        <p className="px-5 py-4">
          రావణుడు సీతను లంకకు ఎత్తుకుని పోతాడు. సీతను తిరిగి తీసుకుని వచ్చుటకు రావణునితో రాముడు యుద్ధం
          చేయాలనుకున్నాడు. అందుకోసం సముద్రంపై వారధిని నిర్మించమని వానరసైన్యాన్ని ఆదేశించాడు. నలుడు నిర్మాణ
          కార్యక్రమంలో దిట్ట. అతనికి వానరులు రాళ్ళు, చెట్లు, గుట్టలను తెచ్చి ఇస్తున్నారు. ఆ సమయంలో ఒక ఉడుత
          ఎట్లా సాయం చేయబూనిందో ఈ పాఠంలో చదువుతాం. ద్విపదను పిల్లలకు పరిచయం చేయడం, ప్రాచీన సాహిత్యంపట్ల
          అభిరుచిని కల్పించడం, అడుగంతైనా ఇతరులకు శక్తిమేరకు సహాయం చేయాలనే ఆలోచన కల్పించడం ఈ పాఠం ఉద్దేశం.
        </p>
      </section>
    </div>
  );
}
