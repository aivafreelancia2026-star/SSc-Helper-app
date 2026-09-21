"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh4Page1() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch4-p39-answers");
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
      localStorage.setItem("c8-telugu-ch4-p39-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Chapter Header */}
      <div className="relative border border-[#d1c4e0] bg-[#ebe6f2] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm mx-auto max-w-[95%]">
        
        {/* Left Side: Number & Title */}
        <div className="flex gap-4 items-stretch">
          <div className="bg-[#2f2b66] text-white flex items-center justify-center w-16 md:w-24 rounded-lg shadow-inner">
            <span className="font-serif font-bold text-4xl md:text-6xl italic">4</span>
          </div>
          
          <div className="flex-1">
            <div className="bg-[#2f2b66] text-white rounded-lg px-6 py-4 md:py-6 flex items-center shadow-inner h-full border-b-[6px] border-white/20">
              <h1 className="font-bold text-2xl md:text-4xl tracking-wide">అసామాన్యులు</h1>
            </div>
          </div>
        </div>
        
        {/* Right Side: QR Code */}
        <div className="flex justify-center md:justify-end shrink-0">
          <div className="bg-white border-2 border-black p-2 flex flex-col items-center">
            <div className="w-[85px] h-[85px] relative">
              <Image
                src="/c8-t-ch4-p1-qr.png"
                alt="QR Code W7W4P9"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="font-bold text-sm tracking-widest mt-1">W7W4P9</p>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="pt-6 relative">
        <div className="absolute top-2 left-4 md:left-8 z-10 bg-[#00a3e0] text-white font-bold px-6 py-2 rounded-full shadow-md text-lg">
          బొమ్మను చూడండి - ఆలోచించి చెప్పండి
        </div>

        <div className="w-full h-[350px] md:h-[450px] relative mt-10 rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
          <Image
            src="/c8-t-ch4-p1-illustration.png"
            alt="People working in their professions, including garbage collection and street cleaning"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Bottom Section: Questions & Purpose */}
      <div className="flex flex-col md:flex-row gap-8 pt-8">
        
        {/* Left Column: ప్రశ్నలు (Questions) */}
        <div className="flex-1 relative border border-[#b3d4f0] rounded-xl p-6 pt-10 bg-[#f4f9fd] shadow-sm">
          <div className="absolute -top-5 left-6 bg-[#2f2b66] text-white px-8 py-2 rounded-full shadow-md">
            <h2 className="font-bold text-[16px]">ప్రశ్నలు</h2>
          </div>
          
          <div className="space-y-6 pt-2 text-[#4a4a4a]">
            
            <div className="flex gap-3 items-start">
              <span className="font-bold text-[#e6007e]">1.</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#1e1b4b]">
                  బొమ్మను చూడండి, వాళ్ళు ఏం చేస్తున్నారు?
                </p>
                <textarea
                  className="w-full h-20 border border-[#b3d4f0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#2f2b66] shadow-inner resize-none bg-white text-[15px]"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers["q1"] || ""}
                  onChange={(e) => handleAnswerChange("q1", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="font-bold text-[#e6007e]">2.</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#1e1b4b]">
                  అట్లా చెత్తను ఎత్తిపోసే వారు లేకుంటే ఏమవుతుంది?
                </p>
                <textarea
                  className="w-full h-24 border border-[#b3d4f0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#2f2b66] shadow-inner resize-none bg-white text-[15px]"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers["q2"] || ""}
                  onChange={(e) => handleAnswerChange("q2", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="font-bold text-[#e6007e]">3.</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#1e1b4b]">
                  ఇట్లా మనకు సేవలు చేసేవారు ఇంకా ఎవరెవరున్నారు? వారి గొప్పదనమేమిటి?
                </p>
                <textarea
                  className="w-full h-24 border border-[#b3d4f0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#2f2b66] shadow-inner resize-none bg-white text-[15px]"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers["q3"] || ""}
                  onChange={(e) => handleAnswerChange("q3", e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: పాఠం ఉద్దేశం (Purpose of the Lesson) */}
        <div className="flex-1 relative border border-[#f08bb1] rounded-xl p-6 pt-10 bg-[#fff5f8] shadow-sm self-start">
          <div className="absolute -top-5 left-6 bg-[#e6007e] text-white px-8 py-2 rounded-full shadow-md">
            <h2 className="font-bold text-[16px]">పాఠం ఉద్దేశం</h2>
          </div>
          
          <div className="text-justify text-[#4a4a4a] leading-[2.0] pt-2">
            <p className="indent-12">
              అన్ని వృత్తుల సమష్టి సహకారంతో సమాజం కొనసాగుతుంది. వృత్తులు సమాజసేవలో తమవంతు పాత్రను
              పోషిస్తాయి. దేశాభివృద్ధికి మూలస్తంభాలుగా నిలిచినవి వృత్తులే! అయినా వాటికి ఆదరణ కరువైంది. వివిధ
              వృత్తులవారిపట్ల గౌరవాన్ని, శ్రమ విలువను పెంపొందించడమే ఈ పాఠం ఉద్దేశం.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          30
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
