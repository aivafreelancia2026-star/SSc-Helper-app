import { FigureNote } from "@/components/reader/figure-note";

// Book page 98 (PDF/app P107) — story continues: the children (including
// young Balanagamma) survive in the forest; Balanagamma grows up caring
// and devoted.
export function C6TeluguCh10Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          అడవిలో కష్టాలు పడుతూనే పిల్లలు పెరిగి పెద్దవాళ్ళు అవుతారు. బాలనాగమ్మ దయగల, భక్తిగల యువతిగా
          ఎదుగుతుంది — ఆమె స్వభావాన్ని, ఆచార వ్యవహారాలను కథ ఇక్కడ చూపిస్తుంది.
        </p>
      </section>

      <FigureNote emoji="🌸🍎🙏" caption="పూలు, పండ్లు పళ్ళెంలో మోసుకెళ్తున్న బాలనాగమ్మ చిత్రం" />
    </div>
  );
}
