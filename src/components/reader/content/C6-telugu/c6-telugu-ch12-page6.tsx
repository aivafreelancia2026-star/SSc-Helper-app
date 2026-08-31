import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'సెల్‌టవర్లు పక్షులకే కాక మానవులకు కూడా శాపం' ఎందుకో చెప్పండి.",
  "వివిధ రకాల పొగలను పీల్చడం వలన మానవుడు ఎట్లాంటి సమస్యలను ఎదుర్కొంటున్నాడు?",
  "శబ్దకాలుష్యం ఎన్ని విధాలుగా జరుగుతున్నది?",
];

// Book page 123 (PDF/app P132) — conversation continues: noise pollution
// from vehicles, factories, and loud music affecting health and hearing.
export function C6TeluguCh12Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          వాహనాలు, కర్మాగారాలు, పెద్దపెద్ద డీజే సౌండ్లు మొదలైనవాటి వల్ల కలిగే శబ్దకాలుష్యం
          మనుషుల ఆరోగ్యాన్ని, వినికిడి శక్తిని ఎట్లా దెబ్బతీస్తుందో కుటుంబం చర్చించుకుంటుంది.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch12-page6-discuss-${i + 1}`}
              quickWords={["సెల్‌టవర్", "పొగ", "శబ్దకాలుష్యం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
