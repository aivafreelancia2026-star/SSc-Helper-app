import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'రామసక్కని' దృశ్యం చెరువు దగ్గర ఏయే సందర్భాలలో కనిపిస్తుంది?",
  "చెరువు నీటిని శ్రమజీవుల చెమటతో పోల్చడం జరిగింది. ఎందుకు?",
];

// Book page 79 (PDF/app P88) — narration continues (the lake's usefulness
// in towns too), discussion box, then Section III opens with the lake's
// pollution problem beginning (thematic summary only — the imagery of
// factory waste and idol immersion pollution is described, not
// transcribed).
export function C6TeluguCh8Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          పల్లెల్లోనే కాదు పట్నాల్లో కూడా తన సేవలకు లోటు లేదని చెరువు చెప్పుకుంటుంది — నగరాల్లోని
          చెరువులు కూడా అక్కడి ప్రజలకు ఎంతో ఉపయోగపడతాయని వివరిస్తుంది.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch8-page6-discuss-${i + 1}`}
              quickWords={["చెరువు", "శ్రమజీవులు", "చెమట", "నీరు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III — మారుతున్న పరిస్థితి</h3>
        <p className="px-5 py-4">
          ఇన్ని సేవలు చేస్తున్నా, ఈమధ్య తన పరిస్థితి బాగాలేదని చెరువు బాధపడుతుంది. ముఖ్యంగా వినాయక
          చవితి వచ్చినప్పుడు రసాయనిక రంగులతో తయారైన విగ్రహాలు వందల సంఖ్యలో తనలో నిమజ్జనం చేయడం వల్ల
          తనకు కలిగే నష్టాన్ని వివరిస్తుంది.
        </p>
      </section>

      <FigureNote
        emoji="🏭☠️🐟💀"
        caption="కర్మాగారాల నుండి చెరువులోకి కాలుష్య వ్యర్థాలు, చనిపోయిన చేపలు, విగ్రహ నిమజ్జనం వల్ల కలుషితమవుతున్న దృశ్యం"
      />
    </div>
  );
}
