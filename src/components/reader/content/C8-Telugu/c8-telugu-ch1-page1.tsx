"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const QUESTIONS = [
  { id: "q1", text: "1. దధీచి ఎవరు?" },
  { id: "q2", text: "2. దధీచి చేసిన త్యాగం ఏమిటి? ఎందుకు?" },
  { id: "q3", text: "3. త్యాగం అంటే ఏమిటి?" },
  { id: "q4", text: "4. మీకు తెలిసిన త్యాగమూర్తుల పేర్లను తెలపండి." },
];

export function C8TeluguCh1Page1() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch1-p1-answers");
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
      localStorage.setItem("c8-telugu-ch1-p1-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b]" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Chapter Header */}
      <div className="bg-[#e4e1e8] p-3 rounded-lg">
        <div className="flex bg-[#2f2b66] text-white rounded-lg shadow-sm overflow-hidden h-28 relative">
          {/* Big Number "1" */}
          <div className="w-24 bg-[#2f2b66] border-r border-white/20 flex items-center justify-center font-heading text-6xl font-bold">
            1
          </div>
          
          {/* Title & Author */}
          <div className="flex-1 flex flex-col justify-center items-center relative border-r-2 border-white">
            <h1 className="text-3xl sm:text-4xl font-bold pt-2 tracking-wide">
              త్యాగనిరతి
            </h1>
            <div className="absolute bottom-2 right-4 text-sm font-semibold italic text-white/90">
              - నన్నయ
            </div>
            {/* White separator line inside title block */}
            <div className="w-full h-px bg-white/30 absolute bottom-8 left-0"></div>
          </div>

          {/* QR Code Block */}
          <div className="w-28 bg-white flex flex-col items-center justify-center border-l-2 border-[#2f2b66]">
            {/* Simulated QR Code using emoji grid */}
            <div className="grid grid-cols-4 gap-1 p-1">
              {[...Array(16)].map((_, i) => (
                <div key={i} className={`w-3 h-3 ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`}></div>
              ))}
            </div>
            <div className="mt-1 font-bold text-black tracking-widest text-xs">
              D2W1F4
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Read & Think */}
      <div className="relative pt-6">
        {/* Cyan Title Badge */}
        <div className="absolute top-0 left-0 bg-[#00a3e0] text-white px-6 py-1.5 rounded-full font-bold text-sm z-10 shadow-md">
          చదవండి - ఆలోచించి చెప్పండి
        </div>
        
        {/* Cyan Outlined Box */}
        <div className="border border-[#00a3e0] rounded-xl rounded-tl-none p-6 pt-8 bg-blue-50/30">
          <p className="indent-8 text-justify font-medium leading-loose text-gray-800">
            దధీచి మహా తపశ్శాలి. చ్యవన మహర్షి పుత్రుడు. ఒకప్పుడు రాక్షసులు దేవతల అస్త్రాలను గుంజుకొంటుండగా వాటిని దాచిపెట్టుమని దధీచికి దేవతలు ఇచ్చిపోయారు. కానీ ఎంతకాలమైనా వారు రాకపోయేసరికి దధీచి వారి అస్త్రాలను నీరుగా మార్చి తాగాడు. అటు తర్వాత దేవతలు మా అస్త్రాలు మాకిమ్మన్నారు. అప్పుడు ఆ అస్త్రాలు తన ఎముకలను పట్టి ఉన్నందువల్ల యోగాగ్నితో తన శరీరాన్ని దహించుకొని అస్థికలను తీసుకోమ్మన్నాడు. అట్లా దధీచి ఎముకల నుండి ఇంద్రుని వజ్రాయుధం రూపొందింది.
          </p>
        </div>
      </div>

      {/* Section 2: Questions */}
      <div className="relative pt-6">
        {/* Dark Blue Title Badge */}
        <div className="absolute top-0 left-6 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full font-bold text-sm z-10 shadow-md">
          ప్రశ్నలు
        </div>
        
        {/* Dark Blue Outlined Box */}
        <div className="border border-[#2f2b66] rounded-xl rounded-tl-none p-6 pt-8 bg-gray-50/50 space-y-5">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="space-y-2">
              <label htmlFor={q.id} className="font-bold text-gray-800 italic block">
                {q.text}
              </label>
              <textarea
                id={q.id}
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                className="w-full resize-none rounded-lg border border-gray-300 bg-white/80 p-3 text-sm focus:border-[#2f2b66] focus:outline-none focus:ring-1 focus:ring-[#2f2b66]/50 shadow-inner"
                rows={2}
                style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Background */}
      <div className="relative pt-6">
        {/* Pink Title Badge */}
        <div className="absolute top-0 left-6 bg-[#e6007e] text-white px-8 py-1.5 rounded-full font-bold text-sm z-10 shadow-md">
          పాఠం నేపథ్యం
        </div>
        
        {/* Pink Outlined Box */}
        <div className="border border-[#e6007e] rounded-xl rounded-tl-none p-6 pt-8 bg-pink-50/20">
          <p className="indent-8 text-justify font-medium leading-loose text-gray-800">
            పూర్వకాలంలో శిబి భృగుతుంగ పర్వతంపై యజ్ఞం చేశాడు. అప్పుడు ఇంద్రుడు, అగ్నిదేవుడు శిబిచక్రవర్తి గుణగణాలను పరీక్షించాలనుకున్నారు. అగ్ని పావురంగా మారాడు. ఇంద్రుడు డేగరూపం ధరించాడు. డేగంటే భయంతో పావురం శిబిచక్రవర్తి వద్దకు వచ్చి శరణు కోరింది.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          2
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
