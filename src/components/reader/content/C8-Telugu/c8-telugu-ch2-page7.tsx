"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh2Page7() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p25-answers");
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
      localStorage.setItem("c8-telugu-ch2-p25-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Section: Illustration & Text Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
        
        {/* Left Column: Illustration */}
        <div className="w-full md:w-3/5 relative aspect-[32/25] mt-2 overflow-hidden">
          <Image
            src="/c8-t-ch2-p25-customs.png"
            alt="Customs Officer checking passengers"
            fill
            className="object-contain object-left-top"
            unoptimized
          />
        </div>

        {/* Right Column: Text */}
        <div className="w-full md:w-2/5 space-y-4 text-justify pt-2 text-[16px] leading-[2.1] text-[#4a4a4a]">
          <p>
            వచ్చినారు. ప్యాసింజర్ల
            పాస్‌పోర్టులను ఇతర
            కాగితాలను చెక్ చేయటం
            మొదలు పెట్టినారు. కొందరికి
            దిగటానికి పర్మిషన్ ఇవ్వలేదు.
            నాకు గుండె జల్లుమన్నది. నా
            గతి ఏమి అవుతుందో అని.
            ఫార్వెట్ గారు మహా
            సంతోషముతో తనకు పర్మిషన్
            దొరుకుతుందని వెళ్ళినారు. కాని
            వారికి కూడా ఎందుకో పర్మిషన్
            దొరకలేదు. నాకు చమటలు
            పట్టినవి. కాని పైకి మాత్రం
          </p>
        </div>
      </div>

      {/* Middle Paragraphs */}
      <div className="space-y-4 indent-12 text-justify">
        <p>
          ధైర్యంగానే ఉన్నా. నేను శేర్వాణీ, పైజామాలో ఉన్నా. నా వంతు వచ్చింది. నా పాస్‌పోర్టు చూసిన పోలీసు అధికారి “మీరు
          స్టడీస్ కొరకు వచ్చినారా?” అని అడిగినారు. నేను అవునని చెప్పినాను. ఆలస్యం లేకుండా, ఇంకా ఏమీ అడగకుండానే
          “పర్మిటెడ్” అని స్టాంపు వేసినారు.
        </p>
        <p>
          నేను బయటకు వచ్చినారు. బయట గ్రేట్ బ్రిటన్ దృశ్యం చూస్తూ నిలబడిపోయినాను. పట్టరాని సంతోషం వచ్చింది.
          దేవుడు సాధ్యం కాదనుకొన్నదాన్ని సాధ్యం చేసినాడు. నేను ఎక్కడ? గ్రేట్ బ్రిటన్‌కు పైసాలేకుండా రావటమెక్కడ?
          ఈశ్వరుడు నన్ను రక్షించినాడు - బ్రిటన్‌లోని సుందర దృశ్యాలను చూసి, సమీపంలోని పడవలను చూసి దేవునికి కృతజ్ఞతా
          వందనాలు చేసితిని. ఫార్వెట్ గారికి కూడా దిగటానికి పర్మిషన్ దొరికింది. సురేశ్ బాబుకు గూడా పర్మిషన్ దొరికింది.
          సురేశ్‌బాబు సాహాయ్యం లేకుండానే అతని డబ్బుతో అవసరం లేకుండానే నాకు పర్మిషన్ దొరికినందుకు అతడు ఆశ్చర్యపడినాడు.
          మేము పడవనుండి దిగేసరకు సూర్యాస్తమయం అయింది. నవంబర్ నెల. చాలా చలి. సామాను దింపటానికి కూలివారులేరు.
          నా సందుగ చాలా పెద్దది. అందరు తమ తమ సామాన్లు వెతుకుతూ ఉండిరి. కొందరు భారతీయ స్నేహితులు నాకు
          సాహాయ్యం చేసిరి. నా సామాను పడవ దిగింది. ఈశ్వరుని కటాక్షము వలన వంటాయన కొడుకునైన బీద టీచరును,
          సరిపడడబ్బు వెంట లేకుండా 22 పౌండ్లతో, శేర్వాణీ పైజామా తొడుగకొని గ్రేట్ బ్రిటన్‌లోని స్కాట్లాండ్ భూమిపైన
          అడుగుపెట్టితిని.
        </p>
      </div>

      {/* Bottom Section: ఆలోచించండి-చెప్పండి Box */}
      <div className="w-full max-w-[480px] mx-auto border border-[#b2a1c7] rounded-xl bg-[#f2eef6] p-6 pt-10 relative mt-12 mb-8">
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
            { id: "p25-q1", text: "రచయితకు సురేశ్‌బాబు సహాయం లేకుండానే పర్మిషన్ దొరకడానికి కారణం ఏమై ఉంటుంది?" },
            { id: "p25-q2", text: "ఏయే సందర్భాల్లో మీరు దేవునికి కృతజ్ఞతలు తెలుపుకుంటారో తెల్పండి." }
          ].map((q) => (
            <div key={q.id} className="flex gap-3 items-start">
              <span className="text-[#e6007e] text-xl leading-none mt-1">♦</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#1e1b4b] text-[15px] leading-snug">{q.text}</p>
                <textarea
                  className="w-full h-20 border border-[#d1c4e0] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[14px] italic text-gray-700"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          16
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
