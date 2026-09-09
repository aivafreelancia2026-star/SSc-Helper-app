"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh3Page1() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch3-p31-answers");
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
      localStorage.setItem("c8-telugu-ch3-p31-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Chapter Header */}
      <div className="bg-[#d1c9db] p-4 md:p-6 mb-8 mt-4 rounded-md">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#2f2b66] p-4 rounded-xl text-white shadow-lg relative overflow-hidden">
          
          <div className="flex items-center gap-6 z-10 w-full">
            {/* Number Circle */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-full text-[#2f2b66] flex items-center justify-center font-serif font-bold text-5xl md:text-6xl shrink-0 shadow-inner">
              3
            </div>
            
            {/* Title & Subtitle */}
            <div className="flex-1 border-l-2 border-white/30 pl-6 pb-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-wider pt-2 text-[#f8f5fb]">బండారి బసవన్న</h1>
              <div className="w-full h-[1px] bg-white/30 my-2"></div>
              <p className="text-right text-lg md:text-xl font-bold pr-4 italic text-[#ebd9e4]">- పాల్కురికి సోమనాథుడు</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white p-2 rounded-lg shrink-0 z-10 flex flex-col items-center">
            <div className="w-[80px] h-[80px] relative">
              <Image
                src="/c8-t-ch3-p1-qr.png"
                alt="QR Code A5B4J1"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-[#2f2b66] font-bold text-xs tracking-widest mt-1">A5B4J1</p>
          </div>
        </div>
      </div>

      {/* Section 1: చదువండి - ఆలోచించి చెప్పండి */}
      <div className="space-y-4 pt-4">
        <div className="bg-[#00a3e0] text-white w-fit px-6 py-2 rounded-full rounded-bl-none shadow-md">
          <h2 className="font-bold text-lg">చదువండి - ఆలోచించి చెప్పండి</h2>
        </div>
        
        <div className="border border-[#00a3e0] rounded-xl rounded-tl-none p-6 md:p-8 bg-white shadow-sm ml-2 md:ml-6 text-justify text-[#4a4a4a] leading-[1.8]">
          <p className="indent-12">
            గోల్కొండ పాలకుడు అబుల్ హసన్ తానాషా. ఇతని పాలనా కాలంలో భద్రాచలం
            తహశీల్దార్‌గా కంచర్ల గోపన్న ఉండేవాడు. ఆయన శ్రీరామభక్తుడు. ప్రజలనుండి వసూలుచేసిన
            సుమారు ఆరులక్షల రూపాయల పన్నుతో భద్రాచలంలో రామాలయాన్ని నిర్మించాడు. సీతారాములకు
            విలువైన నగలు చేయించాడు. ప్రభుత్వ సొమ్ము దుర్వినియోగం చేశాడనే నెపంతో గోపన్నను
            కారాగారంలో బంధించారు. గోపన్న తన కీర్తనలతో శ్రీరాముడిని వేడుకొన్నాడు. శ్రీరాముడే తానాషాకు
            ఆ సొమ్ము చెల్లించి బంధవిముక్తుడిని చేశాడు.
          </p>
        </div>
      </div>

      {/* Section 2: ప్రశ్నలు */}
      <div className="space-y-4 pt-6">
        <div className="bg-[#433b70] text-white w-fit px-6 py-2 rounded-full rounded-bl-none shadow-md ml-6 md:ml-12">
          <h2 className="font-bold text-lg">ప్రశ్నలు</h2>
        </div>
        
        <div className="border border-[#b2a1c7] rounded-xl rounded-tl-none p-6 md:p-8 bg-[#f8f5fb] shadow-sm ml-8 md:ml-16 space-y-6">
          {[
            { id: "ch3-s1-q1", num: "1.", text: "కంచర్ల గోపన్న ఎవరు?" },
            { id: "ch3-s1-q2", num: "2.", text: "అతనిపై మోపిన అభియోగమేమిటి?" },
            { id: "ch3-s1-q3", num: "3.", text: "గోపన్న ఎట్లా బంధ విముక్తుడయ్యాడు?" },
            { id: "ch3-s1-q4", num: "4.", text: "గోపన్న వంటి భక్తులను గురించి మీకు తెలుసా?" }
          ].map((q) => (
            <div key={q.id} className="flex gap-4 items-start">
              <span className="font-bold text-[#433b70] pt-1">{q.num}</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#4a4a4a] pt-1">{q.text}</p>
                <textarea
                  className="w-full h-20 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[15px]"
                  placeholder="జవాబు రాయండి..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: పాఠం నేపథ్యం, ఉద్దేశం */}
      <div className="space-y-4 pt-8">
        <div className="bg-[#e6007e] text-white w-fit px-6 py-2 rounded-full rounded-bl-none shadow-md">
          <h2 className="font-bold text-lg">పాఠం నేపథ్యం, ఉద్దేశం</h2>
        </div>
        
        <div className="border border-[#e6007e] rounded-xl rounded-tl-none p-6 md:p-8 bg-[#fef5f9] shadow-sm ml-2 md:ml-6 text-justify text-[#4a4a4a] leading-[1.8] space-y-4">
          <p className="indent-12">
            బిజ్జలుడి కొలువులో బండారి బసవన్న దండనాయకుడుగా ఉన్నాడు. ఇతడు గొప్ప శివభక్తుడు.
            ఒకరోజు ఒక జంగమయ్య బసవన్న దగ్గరకు వచ్చి "నాకు ఈ క్షణంలో ఇంత ధనం కావాలి.
            లేకపోతే మీ సపర్యలు స్వీకరించను" అన్నాడు. అప్పుడు బసవన్న కోశాగారంలోని పేటికల్లో ఉన్న
            మాడలను (బంగారు నాణేలు) జంగమయ్యకు సమర్పించాడు. అది చూసిన ఇతర మంత్రులు
            బిజ్జలుడి దగ్గరకు పోయి బసవన్న రాజద్రోహం చేశాడని చెప్పారు.
          </p>
          <p className="indent-12 text-[#e6007e] font-bold">
            బసవన్న ఔదార్య బుద్ధి, భక్తితత్త్వం తెలియజేయటం ఈ పాఠం ఉద్దేశం.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          22
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
