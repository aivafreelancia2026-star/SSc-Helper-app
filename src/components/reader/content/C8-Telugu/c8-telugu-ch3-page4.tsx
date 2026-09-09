"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh3Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch3-p34-answers");
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
      localStorage.setItem("c8-telugu-ch3-p34-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Roman Numeral II */}
      <div className="flex justify-center text-[#2f2b66] mb-8">
        <span className="font-serif font-bold text-2xl">II</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative pb-24 md:pb-0">
        
        {/* Left Column: Poem Part 1 */}
        <div className="flex-1 space-y-6">
          <div className="pl-4 md:pl-12 text-[#2a87b8] font-bold leading-[2.2] text-[16px] space-y-2">
            <p>క్షీరాబ్ధి లోపలఁ గ్రీడించు హంస</p>
            <p>గోరునే పడియల నీరు ద్రావంగఁ?</p>
            <p>జూత ఫలంబులు సుంబించు చిలుక</p>
            <p>బ్రాతి బూరుగ మ్రాని పండ్లఁ గన్గానునె?</p>
            <p>రాకామల జ్యోత్స్నఁ ద్రావు చకోర</p>
            <p>మాకాంక్ష సేయునే చీకటిఁ ద్రావ</p>
            <p>విరిదమ్మి వాసన విహరించుతేఁటి</p>
            <p>పరిగొని సుడియునే బబ్బిలి విరుల?</p>
            <p>నెఱుఁగునే యల దిగ్గజేంద్రంబు కొదమ</p>
            <p>యెఱపంది చను సీక? నెఱుఁగవు గాక</p>
            <p>యెరుదగు లింగ సదర్భుల యిండ్ల</p>
            <p>వరవుడ నా కొక సరకేయర్థంబు</p>
            <p>పుడమీశ! మీధనంబునకుఁ జేసాఁప</p>
            <p>నొడయుల కిచ్చితి నొడయులధనము</p>
            <p>పాదిగదతిఁగిన భక్తుండఁగాను</p>
          </div>
        </div>

        {/* Right Column: Poem Part 2 & Illustration */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="pl-4 md:pl-8 text-[#2a87b8] font-bold leading-[2.2] text-[16px] space-y-2">
            <p>గాదేని ముడుపు లెక్కలు సూడు" మనుచు</p>
            <p>దట్టుఁడు బసవన దండనాయఁకుఁడు</p>
            <p>పెట్టెలు ముందటఁ బెట్టి తాళములు</p>
            <p>పుచ్చుడు మాడ లుప్పొంగుచుఁ జూడ</p>
            <p>నచ్చెరువై లెక్క కగ్గలంబున్న</p>
          </div>

          <div className="w-full h-[550px] relative mt-4 z-0">
            <Image
              src="/c8-t-ch3-p4-shiva-basava.png"
              alt="Lord Shiva, Bandari Basavanna, and Animals"
              fill
              className="object-contain object-top"
              unoptimized
            />
          </div>
        </div>

        {/* Bottom Left Section: ఆలోచించండి-చెప్పండి */}
        <div className="w-full md:w-[450px] absolute bottom-0 md:bottom-24 left-0 md:left-4 z-10">
          <div className="relative border border-[#d1c4e0] rounded-xl p-6 pt-10 bg-[#ebe6f2] shadow-md opacity-95">
            <div className="absolute -top-5 left-8 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full whitespace-nowrap shadow-md flex items-center gap-2">
              <span className="text-xl">👩🏽</span>
              <h2 className="font-bold text-[16px]">ఆలోచించండి-చెప్పండి</h2>
              <span className="text-xl">👦🏽</span>
            </div>
            
            <div className="space-y-6 pt-2 text-[#4a4a4a]">
              
              {/* Question 1 */}
              <div className="flex gap-3 items-start">
                <span className="text-[#e6007e] font-bold mt-1 text-lg leading-none">♦</span>
                <div className="flex-1 space-y-2">
                  <p className="font-bold text-[#1e1b4b]">
                    శివ భక్తులను హంస, చిలుక, చకోరం,
                    తుమ్మెదలతో కవి ఎందుకు పోల్చి
                    ఉంటాడు?
                  </p>
                  <textarea
                    className="w-full h-24 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[15px]"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers["think-say-3"] || ""}
                    onChange={(e) => handleAnswerChange("think-say-3", e.target.value)}
                  />
                </div>
              </div>

              {/* Question 2 */}
              <div className="flex gap-3 items-start">
                <span className="text-[#e6007e] font-bold mt-1 text-lg leading-none">♦</span>
                <div className="flex-1 space-y-2">
                  <p className="font-bold text-[#1e1b4b]">
                    "ఒడయుల కిచ్చితి నొడయుల ధనము"
                    అనడంలో అర్థం ఏమై ఉంటుంది?
                  </p>
                  <textarea
                    className="w-full h-20 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[15px]"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers["think-say-4"] || ""}
                    onChange={(e) => handleAnswerChange("think-say-4", e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          25
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
