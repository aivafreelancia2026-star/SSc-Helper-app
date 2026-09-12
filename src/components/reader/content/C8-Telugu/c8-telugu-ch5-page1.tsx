"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh5Page1() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: ""
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem("c8-telugu-ch5-p1-answers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    localStorage.setItem("c8-telugu-ch5-p1-answers", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Chapter Banner */}
      <div className="bg-[#d1cce0] p-3 rounded-lg w-full max-w-3xl mx-auto mb-8">
        <div className="flex bg-[#2f2b66] rounded-xl overflow-hidden shadow-lg h-36">
          {/* Chapter Number */}
          <div className="w-1/5 border-r border-[#6b5b95] flex items-center justify-center p-4">
            <span className="text-white text-8xl font-serif font-bold tracking-tighter" style={{ fontFamily: "'Georgia', serif", textShadow: "4px 4px 8px rgba(0,0,0,0.5)" }}>5</span>
          </div>
          
          {/* Chapter Title */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-white relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md tracking-wide">శతక సుధ</h1>
            <div className="w-full h-px bg-white/40 mb-2"></div>
            <p className="self-end text-lg md:text-xl font-bold italic tracking-wide">- శతక కవులు</p>
          </div>
          
          {/* QR Code Area */}
          <div className="w-[120px] bg-[#d1cce0] p-1.5 border-l border-[#6b5b95] flex items-center justify-center shrink-0">
            <div className="bg-white p-2 h-full w-full rounded flex flex-col items-center justify-center shadow-inner">
              <div className="relative w-full aspect-square bg-gray-200">
                <Image 
                  src="/assets/images/c8-telugu/ch5/qr_v3j8j8.png"
                  alt="QR Code"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span className="text-black font-bold text-[10px] mt-1 tracking-widest">V3J8J8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Read and Think Section */}
      <div className="pt-4 relative z-0">
        <div className="border border-[#00a2e8] rounded-xl p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(0,162,232,0.15)] bg-white ml-4">
          <div className="absolute top-0 left-8 bg-[#00a2e8] text-white px-6 py-1.5 rounded-full font-bold shadow-sm">
            చదువండి - ఆలోచించి చెప్పండి
          </div>
          
          <div className="space-y-4 pt-2">
            <p className="indent-8 font-semibold">యాదగిరీశుని వేడుకొంటూ తిరువాయిపాటి వేంకటకవి రచించిన కింది పద్యాన్ని చదువండి.</p>
            
            <div className="pl-12 space-y-2 text-[#2f2b66] font-medium pt-2">
              <p>వాదము చేయఁగా నరులు వాక్య పరుండని యెగ్గు చేతురున్</p>
              <p>మోదముతో భుజించునెడ ముందుగఁ బిల్తురు తిండిపోతుగా,</p>
              <p>ఏదియుఁ బల్కకున్నయెడ నీతఁడు మూగని యెంచుచుందుగా,</p>
              <p>నీ దయగల్గఁగా సుఖము నేర్పును యాదగిరీంద్ర మ్రొక్కెదన్.</p>
            </div>
            
            <p className="text-right font-bold pt-2 pr-8 text-[#1e1b4b]">
              - శ్రీ యాదగిరీంద్ర శతకం
            </p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="pt-6 relative z-0">
        <div className="border border-[#6b5b95] rounded-xl p-6 md:p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(107,91,149,0.15)] bg-[#f8f9fc] ml-4">
          <div className="absolute top-2 left-8 bg-[#2f2b66] text-white px-6 py-1.5 rounded-full font-bold shadow-sm">
            ప్రశ్నలు
          </div>
          
          <div className="space-y-6 pt-2">
            {[
              { id: "q1", text: "1. ఈ పద్యం ఏ శతకం లోనిది? కవి ఎవరు?" },
              { id: "q2", text: "2. ఈ పద్యాన్ని చదివినప్పుడు మీరేం గ్రహించారు?" },
              { id: "q3", text: "3. కవులు శతకపద్యాలు ఎందుకు రాస్తారు?" },
              { id: "q4", text: "4. ఈ పద్యంలోని మకుటం ఏమిటి?" },
              { id: "q5", text: "5. మీకు తెలిసిన కొన్ని శతకాల మకుటాలను చెప్పండి." }
            ].map((q) => (
              <div key={q.id} className="space-y-2 pl-4">
                <p className="font-semibold">{q.text}</p>
                <textarea
                  className="w-full min-h-[60px] p-3 border border-black/20 rounded-lg outline-none focus:ring-2 focus:ring-[#6b5b95] bg-white resize-y"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                ></textarea>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Objective Section */}
      <div className="pt-6 relative z-0">
        <div className="border border-[#e6007e] rounded-xl p-6 md:p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(230,0,126,0.15)] bg-pink-50/30 ml-4">
          <div className="absolute top-2 left-8 bg-[#e6007e] text-white px-6 py-1.5 rounded-full font-bold shadow-sm">
            పాఠం ఉద్దేశం
          </div>
          
          <p className="indent-12 text-justify pt-2">
            శతకపద్యాలు సమాజంలోని పోకడలను తెలుపుతాయి. వాటి ఆధారంగా విద్యార్థుల్లో నైతిక 
            విలువలను పెంపొందింపజేసి ఉత్తమ పౌరులుగా తయారుజేయడమే ఈ పాఠ్యాంశ ఉద్దేశం.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4 clear-both">
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          44
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
