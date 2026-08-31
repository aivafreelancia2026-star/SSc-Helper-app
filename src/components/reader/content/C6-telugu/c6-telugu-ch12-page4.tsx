import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'అడవి జంతువులు పల్లె బాట పట్టాయి' దీనికి గల కారణాలు చెప్పండి.",
  "'చెరువులే గ్రామాలకు మూలాధారాలు' దీనిపై మీ అభిప్రాయం చెప్పండి.",
  "మనిషి ఆశే అనర్థాలకు కారణం. దీనిని సమర్థిస్తూ నాలుగు వాక్యాలను చెప్పండి.",
];

// Book page 121 (PDF/app P130) — conversation continues: humans cutting
// forests for timber and expanding villages leaves animals with nowhere
// to go; lakes are drying up and water is getting polluted too.
export function C6TeluguCh12Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          కలప కోసం, ఊళ్ళు విస్తరించడం కోసం మనుషులు అడవులను నరికేస్తున్నారని, దాంతో జంతువులకు
          నివసించడానికి స్థలం లేకుండా పోతున్నదని నర్సయ్య వివరిస్తాడు. చెరువులు కూడా ఎండిపోతున్నాయని,
          నీరు కలుషితమవుతున్నదని కుటుంబం మాట్లాడుకుంటుంది.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch12-page4-discuss-${i + 1}`}
              quickWords={["అడవి", "చెరువు", "ఆశ"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
