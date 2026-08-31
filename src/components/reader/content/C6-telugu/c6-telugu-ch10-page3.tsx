import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'కంటికి రెప్పలా కాపాడుకోవడం' అంటే ఏమనుకుంటున్నారు?",
  "'మాట నిలబెట్టుకోవడం' అనే మాటను ఎట్లా అర్థం చేసుకున్నారు?",
  "'తల్లిదండ్రులు లేని పిల్లలు' ఎట్లా ఆగమై పోతారు?",
];

// Book page 96 (PDF/app P105) — story continues: King Navambhojaraju and
// Queen Lakshmidevamma are introduced further, and their happy family
// life together, before the trouble that drives the plot begins.
export function C6TeluguCh10Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          నవాంభోజరాజు, లక్ష్మీదేవమ్మలు ఎంతో ప్రేమగా జీవించేవారు. వారికి పిల్లలు కలిగి, కంటికి రెప్పలా
          కాపాడుకుంటూ పెంచుకుంటారు. రాజదంపతుల అన్యోన్యతను, వారి కుటుంబ సంతోషాన్ని కథ ఇక్కడ
          వర్ణిస్తుంది — ఇదే ముందు ముందు జరగబోయే కథకు నేపథ్యం అవుతుంది.
        </p>
      </section>

      <FigureNote emoji="👑👸💐" caption="రాణి లక్ష్మీదేవమ్మ చిత్రం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch10-page3-discuss-${i + 1}`}
              quickWords={["తల్లిదండ్రులు", "ప్రేమ", "కాపాడుకోవడం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
