"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh2Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p22-answers");
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAnswerChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    try {
      localStorage.setItem("c8-telugu-ch2-p22-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Paragraphs */}
      <div className="space-y-4 indent-12 text-justify">
        <p>
          మా కాన్వాయ్‌లో 50-60 నౌకలు ఉండే. ప్రతి పడవపైన 'Life Boats' ఉండేవి. పడవ కెప్టెన్ మొదలగు ఆఫీసర్లు
          వచ్చి, మమ్ములను సరిగా ఉన్నామా అని ఇన్‌స్పెక్ట్ చేసి, తరువాత అందరిని పంపేవారు. బొంబాయిలో పడవ ఎక్కిన
          తరువాత కూడా, కొన్నిదినాల వరకు పడవ అక్కడనే ఉండింది. మమ్ములను దిగనివ్వలేదు. మా క్యాబిన్‌లో ఆరు బెర్తులు
          ఉండె. మా పడవలోని అటెండెంట్లు భారతీయులే. వారు ఉండే డెక్ వేరే. వారు తినే డెక్ వేరే.
        </p>
        <p>
          పడవ చిన్నది కాదు, చాల పెద్దదీ కాదు. కొత్త వారికి సముద్రరోగము వస్తుంది. సముద్రం ప్రశాంతంగా ఉంటే ఈ
          జబ్బురాదు. దీనికి డబ్బు తీసుకోకుండానే పడవవారు మందులు ఇస్తారు. సముద్రం సరిగా లేకుంటే ఈ జబ్బు వస్తుంది.
          తల తిరుగుతుంది. తల నొస్తుంది. కక్కు వస్తుంది. కండ్లు తిరుగుతవి. ఆ సమయంలో పక్కపైన పడుకొని ఉంటారు.
        </p>
        <p>
          పడవలో హాస్పిటల్ కూడా ఉంటది. డబ్బు తీసుకోకుండానే సామాన్య రోగాలకు మందులు ఇస్తారు. రోగులు
          లేవలేకుంటే డాక్టర్లు, నర్సులు క్యాబిన్‌కి వస్తారు. మందులు క్యాబిన్‌కు పంపుతారు. పోష్టు ఆఫీసు కూడా ఉంటుంది.
          తరువాతి రేవు రాకముందే పోస్టులో జాబులు వేయమని నోటీసు పెట్టుతారు. మనకు జాబువస్తే క్యాబిన్‌కు పంపుతారు.
        </p>
      </div>

      {/* Two Column Layout: Text + Think/Say Box */}
      <div className="flex flex-col md:flex-row gap-6 items-start mt-8">
        
        {/* Left Column Text */}
        <div className="flex-1 space-y-4 indent-12 text-justify">
          <p>
            టెలిగ్రాఫ్ ఆఫీసు (వైర్‌లెస్) కూడా ఉంటుంది. మనకు
            టెలిగ్రాములు వస్తే ఇస్తారు. మనం కూడా టెలిగ్రాములు
            ఇవ్వవచ్చు. పడవలో “రిసెప్షన్‌రూం” కూడా ఉంటుంది.
            అది రాత్రి పగలు ఖుల్లా ఉంటుంది. మనకు కావలసిన
            విషయాలన్నీ తెలుపుతారు. పడవలో దుకాణము కూడా
            ఉంటుంది. అన్ని వస్తువులు దొరుకుతవి.
          </p>
        </div>

        {/* Right Column: ఆలోచించండి-చెప్పండి Box */}
        <div className="w-full md:w-[320px] shrink-0 border border-[#b2a1c7] rounded-xl bg-[#f2eef6] p-4 pt-10 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[160px] h-[45px]">
            <Image
              src="/c8-t-ch2-p22-think-say.png"
              alt="ఆలోచించండి-చెప్పండి"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          
          <div className="space-y-6 mt-2">
            {[
              { id: "p22-q1", text: "వాహనాలు కాన్వాయ్‌గా వెళ్ళడం ఎప్పుడైనా చూశారా? దేని కొరకు అట్లా వెళ్తాయి?" },
              { id: "p22-q2", text: "సైరన్ లేదా అలారం ఎందుకు మోగిస్తారు?" },
              { id: "p22-q3", text: "దూర ప్రయాణాలకు ఎట్లా సిద్ధం కావాలి?" }
            ].map((q) => (
              <div key={q.id} className="flex gap-2 items-start">
                <span className="text-[#e6007e] text-xl leading-none mt-1">♦</span>
                <div className="flex-1 space-y-2">
                  <p className="font-bold text-[#1e1b4b] text-[14px] leading-snug">{q.text}</p>
                  <textarea
                    className="w-full h-16 border border-[#d1c4e0] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[14px] italic text-gray-700"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section II */}
      <div className="flex flex-col items-center pt-8">
        <h2 className="text-3xl font-bold font-serif mb-6 text-[#1e1b4b]">II</h2>
        
        <div className="w-full space-y-4 indent-12 text-justify">
          <p>
            పడవపైన రేడియోలు ప్రతి డెక్ పైన లౌడు స్పీకర్లతో కనెక్టు చేయబడి ఉంటవి. పడవవారు రేడియో వార్తలు
            అప్పటికప్పుడు టైపు చేయించి, సైక్లోస్టైల్ కాపీలు లాంజ్‌లో పెట్టించేవారు. పీరియాడికల్స్ కూడా లాంజ్‌లో పెట్టేవారు.
            లాంజ్‌లోని ఫర్నీచర్ గొప్ప ధనవంతుల ఇండ్లలో ఉండేటటువంటివి ఉంటవి. ఫ్లోరు పైన గొప్ప విలువైన తివాసీలు
            మరియు మఖ్మల్ (వెల్వెట్) తివాసీలు ఉంటవి. కంఫర్టబుల్ సోఫాలు మరియు మెత్తటి కుర్చీలు ఉంటవి. అందరూ
            కూర్చొని స్నేహితులతో మాట్లాడుతూ ఉంటారు. కొందరు చదువుతూ ఉంటారు.
          </p>
          <p>
            చిన్న పిల్లలకు నర్సరీ సెక్షన్ మరియు కిండర్ గార్డెన్ సెక్షను ఉంటవి. తల్లిదండ్రులు వెంటలేకుండా ప్రయాణం చేసే
            పసి పిల్లలు కూడా ఉండిరి. అటువంటి పిల్లల బాధ్యత పడవవారే తీసుకుంటారు. పడవలో లైబ్రరీకూడా ఉంది. పుస్తకాలను
            మన క్యాబిన్‌కు చదువుకోవటానికి ఇచ్చేవారు. ఔట్‌డోర్ గేమ్స్ కూడా ఉంటవి. పడవలో ప్రయాణీకులు ఆడుతుండేవారు.
            చివరిదినం టూర్నమెంట్స్ పెట్టించి, గెలిచినవారికి బహుమతులు ఇచ్చేవారు. స్విమ్మింగ్ పూల్స్ ఉంటవి. ఈతల పోటీలు
            జరుగుతూ ఉంటవి. డెక్‌పైన ఓపెన్ ఏర్‌లో రాత్రి ఎందరో పడ్కుండేవారు.
          </p>
          <p>
            మా పడవలో పాశ్చాత్యులు చాలా ఉండిరి. భారతీయులు చాలా తక్కువగా ఉండిరి. పాశ్చాత్యులలో బ్రిటీష్‌వారే
            ఎక్కువగా ఉండిరి. బ్రిటీష్‌వారు ఎవరూ కాని నాకు తెలియదు. దగ్గర నుంచి చూడటం, వారి దగ్గర అంత క్లోజుగా కూర్చుని
            వారి భాష వినటం అదే మొదటిసారి. వారి ఉచ్ఛారణ సరిగా తెలిసేదికాదు. నా ఉచ్ఛారణ వారికి తెలిసేది కాదు. కాని వారు
            భారతదేశంలో ఉన్నవారు కాబట్టి, నా ఉచ్ఛారణ తెలుసుకొనేవారు. నాకు వారి మాటలు తెలుసుకోవటం చాలా శ్రమ
            అయ్యేది.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          13
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
