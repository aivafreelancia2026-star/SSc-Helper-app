import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const ANTONYM_ITEMS_2 = [
  { sentence: "సీత జాడ తెలియక విషాదంలో ఉన్న రాముడికి ఆమె జాడ చెప్పి హనుమంతుడు .................. కలిగించాడు.", underline: "విషాదంలో" },
  { sentence: "దుర్మార్గుల వల్ల సమాజానికి చెడు జరుగుతుంది. ఐతే గొప్పవాళ్ళ వల్ల సమాజానికి .................. జరుగుతుంది.", underline: "చెడు" },
];

const SYNONYM_ITEMS = [
  { sentence: "మా బడి మా ఇంటికి తూర్పు దిక్కున ఉన్నది.", underline: "దిక్కున" },
  { sentence: "మా తాత పులిహోర ఆరగించాడు.", underline: "ఆరగించాడు" },
  { sentence: "అప్పు కట్టలేదని రాజయ్య భూమిని బ్యాంక్‌వాళ్ళు జప్తు చేశారు.", underline: "జప్తు" },
  { sentence: "ప్రజల సేవకై తపించిన రాజులు చరిత్రకెక్కారు.", underline: "రాజులు" },
  { sentence: "నా శిరస్సు వంచి నీకు నమస్కారం చేస్తున్నాను.", underline: "శిరస్సు" },
];

const IDIOMS = ["అల్లారుముద్దుగా", "చిలుకపలుకులు", "ఆరునూరైనా"];
const DVANDVA_ITEMS = ["తల్లిదండ్రులు", "తోడునీడలు", "భీమార్జునులు", "కాయగూరలు", "ఆటపాటలు"];

// Book page 106 (PDF/app P115) — antonyms continue, then synonyms,
// idiom own-sentences, and Section VI's dvandva-samasam విగ్రహవాక్యం
// exercise begins.
export function C6TeluguCh10Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          {ANTONYM_ITEMS_2.map((item, i) => (
            <TeluguAnswerBox
              key={item.sentence}
              question={`${String.fromCharCode(3081 + i)}. ${item.sentence} (గీత: ${item.underline})`}
              storageKey={`c6-telugu-ch10-page13-antonym-${i + 1}`}
              quickWords={["ఆనందం", "మేలు"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది వాక్యాల్లో గీత గీసిన పదాలకు అదే అర్థం వచ్చే పదాలను రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">
            ఉదా॥ కొంతమంది చిన్నతనం నుండే యోగాసనాలు సాధన చేస్తారు. జ: అభ్యాసం (గీత: సాధన)
          </p>
          {SYNONYM_ITEMS.map((item, i) => (
            <TeluguAnswerBox
              key={item.sentence}
              question={`${String.fromCharCode(3077 + i)}. ${item.sentence} (గీత: ${item.underline})`}
              storageKey={`c6-telugu-ch10-page13-synonym-${i + 1}`}
              quickWords={["అర్థం"]}
            />
          ))}

          <p className="font-semibold text-pink-600">3. కింది జాతీయాలతో సొంత వాక్యాలు రాయండి.</p>
          {IDIOMS.map((idiom, i) => (
            <TeluguAnswerBox
              key={idiom}
              question={`${String.fromCharCode(3077 + i)}. ${idiom} =`}
              storageKey={`c6-telugu-ch10-page13-idiom-${i + 1}`}
              quickWords={[idiom]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">VI. భాషను గురించి తెలుసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ద్వంద్వసమాస పదాలకు విగ్రహవాక్యాలు రాయండి.</p>
          {DVANDVA_ITEMS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word} =`}
              storageKey={`c6-telugu-ch10-page13-dvandva-${i + 1}`}
              quickWords={["తల్లి", "దండ్రి", "తోడు", "నీడ"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
