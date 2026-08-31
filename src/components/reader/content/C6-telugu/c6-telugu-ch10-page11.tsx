import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const IDIOM_CONTEXT = ["అల్లారుముద్దుగా", "కడుపుల పెట్టుకొని కాపాడుట", "చిలుకపలుకులు", "కాలంచేయుట", "ఆరునూరైనా"];
const CHARACTERS = ["నవాంభోజరాజు", "బాలనాగమ్మ", "మాయల ఫకీరు", "బాలవద్దిరాజు", "గండభేరుండ పక్షి", "లక్ష్మీదేవమ్మ", "మాణిక్యాలదేవి"];

// Book page 104 (PDF/app P113) — "ఇవి చేయండి" begins: reflection prompts,
// then locating idioms in context and a character-trait table.
export function C6TeluguCh10Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <h3 className="inline-block rounded-full bg-pink-100 px-6 py-2 text-lg font-bold text-pink-700">
        ఇవి చేయండి
      </h3>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. 'బాలనాగమ్మ' కథను విన్నారు కదా! ఈ కథలో మీకు ఆసక్తి కలిగించిన సంఘటన ఏదో చెప్పండి?"
            storageKey="c6-telugu-ch10-page11-interest"
            quickWords={["బాలనాగమ్మ", "సాహసం", "చిలుక"]}
          />
          <TeluguAnswerBox
            question="2. మీకు తెలిసిన జానపదకథను చెప్పండి."
            storageKey="c6-telugu-ch10-page11-known-story"
            quickWords={["జానపదకథ", "కథ"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది జాతీయాలను పాఠంలో ఏ సందర్భంలో ఉపయోగించారో రాయండి.</p>
          {IDIOM_CONTEXT.map((idiom, i) => (
            <TeluguAnswerBox
              key={idiom}
              question={`${String.fromCharCode(3077 + i)}. ${idiom}`}
              storageKey={`c6-telugu-ch10-page11-idiom-${i + 1}`}
              quickWords={["సందర్భం", "పాఠం"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. పాఠం ఆధారంగా ఎవరు ఎటువంటివారో కింది పట్టికలో రాయండి.</p>
          <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#765f31] text-white">
                  <th className="border border-white/30 px-3 py-2">పాత్రలు</th>
                  <th className="border border-white/30 px-3 py-2">పాత్రల స్వభావం తెలిపే పదాలు</th>
                </tr>
              </thead>
              <tbody>
                {CHARACTERS.map((name, i) => (
                  <tr key={name} className={i % 2 === 0 ? "bg-amber-50/50" : "bg-white"}>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 font-semibold">{name}</td>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 text-foreground/30">…</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TeluguAnswerBox
            question="పై పాత్రల స్వభావాన్ని తెలిపే పదాలను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch10-page11-character-traits"
            quickWords={["ధైర్యవంతుడు", "దయగలది", "క్రూరుడు", "మాయావి"]}
          />
        </div>
      </section>
    </div>
  );
}
