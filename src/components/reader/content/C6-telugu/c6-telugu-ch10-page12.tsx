import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SHORT_ANSWERS = [
  "నవాంభోజరాజు మారుమనువుకు ఒప్పుకోలేదు కదా! ఐనా బంధువులు, మంత్రులు మొదలైన వారు ఏమని నచ్చజెప్పి ఒప్పించి ఉంటారు?",
  "అడవిలో దిక్కులేని పక్షుల తీరుగ తిరుగుతున్న లక్ష్మీదేవమ్మ పిల్లలను మేనమామ వద్దిరాజు ఇంటికి తీసుకొని పోయాడు కదా! అతడు ఆ పిల్లలను ఇంటికి తీసుకొనిపోకపోతే ఏం జరిగి ఉండేదో ఊహించి రాయండి.",
  "బాలవద్దిరాజుకు కట్టెసాము, కత్తిసాము, విలువిద్య మొదలైన విద్యలు వస్తాయి కదా! మీకు చదువుతోపాటు ఏయే విద్యలు వస్తాయి? అందులో మీకు బాగా ఇష్టమైన విద్య ఏది?",
  "బాలవద్దిరాజు సప్తసముద్రాలు దాటి మాయల ఫకీరు ప్రాణాలున్న చిలుకను పట్టుకున్నాడు కదా! ఆ చిలుకను దొరికిన చోటనే చంపకుండా ఫకీరు దగ్గరకు ఎందుకు తీసుకొనిపోయి ఉంటాడో రాయండి?",
];

const ANTONYM_ITEMS = [
  { sentence: "కొడుకు పుట్టినందుకు సంతోషపడ్డారు. కాని అతడు ప్రయోజకుడు కానందుకు ..................", underline: "సంతోషపడ్డారు" },
  { sentence: "సుఖము కోరుకుంటే దేన్నీ సాధించలేము. కాని .................. తో దేన్నైనా సాధించవచ్చు.", underline: "సుఖము" },
  { sentence: "మంచివాళ్ళు మేలు చేయాలని చూస్తే, చెడ్డవాళ్ళు .................. చేయాలని చూస్తారు.", underline: "మేలు" },
];

// Book page 105 (PDF/app P114) — Section III (short answers + a 10-
// sentence summary essay), Section IV (imagined-dialogue creative
// writing), and Section V's antonym exercise begins (3 of 5 items;
// continued next page).
export function C6TeluguCh10Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {SHORT_ANSWERS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch10-page12-short-${i + 1}`}
              quickWords={["బాలనాగమ్మ", "బాలవద్దిరాజు", "ఫకీరు"]}
            />
          ))}
          <p className="font-semibold text-pink-600">2. కింది ప్రశ్నలకు పది వాక్యాల్లో జవాబులు రాయండి.</p>
          <TeluguAnswerBox
            question="అ. బాలనాగమ్మ కథను సొంతమాటల్లో రాయండి."
            storageKey="c6-telugu-ch10-page12-summary"
            quickWords={["రాజు", "రాణి", "ఫకీరు", "చిలుక", "సాహసం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <TeluguAnswerBox
          question="'సాయంత్రం గండభేరుండ పక్షులు రాంగనే .............' అనే భాగం ఆధారంగా గండభేరుండ పక్షి పిల్లలు, గండభేరుండ పక్షులు, బాలవద్దిరాజు మధ్య జరిగిన సంభాషణలను ఊహించి రాయండి."
          storageKey="c6-telugu-ch10-page12-dialogue"
          quickWords={["గండభేరుండ పక్షి", "బాలవద్దిరాజు", "సంభాషణ"]}
        />
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. కింది వాక్యాల్లోని గీతగీసిన పదాలకు వ్యతిరేకార్థకపదాలను ఖాళీలలో రాయండి.
          </p>
          {ANTONYM_ITEMS.map((item, i) => (
            <TeluguAnswerBox
              key={item.sentence}
              question={`${String.fromCharCode(3077 + i)}. ${item.sentence} (గీత: ${item.underline})`}
              storageKey={`c6-telugu-ch10-page12-antonym-${i + 1}`}
              quickWords={["సంతోషం", "బాధ", "సుఖం", "కష్టం", "మేలు", "కీడు"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
