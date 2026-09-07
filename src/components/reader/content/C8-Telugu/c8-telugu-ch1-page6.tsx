"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh1Page6() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch1-p16-answers");
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
      localStorage.setItem("c8-telugu-ch1-p16-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  const mcqs = [
    {
      id: "p16-mcq-a",
      question: "అ) 'చెట్టు' అను పదానికి సరిపోయేపదం.",
      options: [
        { label: "ఎ) తరువు", value: "ఎ" },
        { label: "బి) గురువు", value: "బి" },
        { label: "సి) ఫలం", value: "సి" },
        { label: "డి) గుణం", value: "డి" },
      ],
    },
    {
      id: "p16-mcq-b",
      question: "ఆ) త్యాగానికి గురువులు ఎవరు?",
      options: [
        { label: "ఎ) మానవులు", value: "ఎ" },
        { label: "బి) చెట్లు", value: "బి" },
        { label: "సి) పక్షులు", value: "సి" },
        { label: "డి) జంతువులు", value: "డి" },
      ],
    },
    {
      id: "p16-mcq-c",
      question: "ఇ) తనువును చీల్చి యిచ్చేవి",
      options: [
        { label: "ఎ) మేఘాలు", value: "ఎ" },
        { label: "బి) నదులు", value: "బి" },
        { label: "సి) చెట్లు", value: "సి" },
        { label: "డి) పక్షులు", value: "డి" },
      ],
    },
    {
      id: "p16-mcq-d",
      question: "ఈ) చచ్చుట పదానికి వ్యతిరేకార్థం",
      options: [
        { label: "ఎ) పెరుగుట", value: "ఎ" },
        { label: "బి) తరుగుట", value: "బి" },
        { label: "సి) బ్రతుకుట", value: "సి" },
        { label: "డి) మేల్కొనుట", value: "డి" },
      ],
    },
    {
      id: "p16-mcq-e",
      question: "ఉ) పై పద్యానికి తగిన శీర్షిక",
      options: [
        { label: "ఎ) భారం", value: "ఎ" },
        { label: "బి) ప్రాణం", value: "బి" },
        { label: "సి) యోగం", value: "సి" },
        { label: "డి) త్యాగం", value: "డి" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Header Section */}
      <div className="flex justify-between items-start">
        {/* Title Box */}
        <div className="flex-1 flex justify-center pt-8">
          <div className="border-[3px] border-[#2f2b66] bg-white shadow-[6px_6px_0px_#cdcce3] px-10 py-2 inline-block">
            <h1 className="text-3xl font-bold text-[#e6007e]">ఇవి చేయండి</h1>
          </div>
        </div>

        {/* QR Code */}
        <div className="w-[100px] flex-shrink-0 flex flex-col items-center border border-black p-1">
          <div className="w-full aspect-square relative mb-1">
            <Image 
              src="/c8-t-ch1-p16-qr.png"
              alt="QR Code"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Section I */}
      <div className="space-y-6">
        <div className="flex">
          <div className="bg-[#2f2b66] text-white px-4 py-1.5 font-bold text-xl mr-0.5">I</div>
          <div className="bg-[#2f2b66] text-white px-6 py-1.5 font-bold text-lg flex-1">
            విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
          </div>
        </div>
        
        <div className="space-y-6 px-4">
          <div className="space-y-2">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">1.</span>
              <p className="font-bold text-[#e6007e]">త్యాగం అంటే ఏమిటి? త్యాగంలోని గొప్పతనం ఏమిటి?</p>
            </div>
            <textarea
              className="w-full h-24 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] ml-6 shadow-inner resize-none bg-yellow-50/50"
              placeholder="మీ జవాబు ఇక్కడ రాయండి..."
              value={answers["p16-sec1-q1"] || ""}
              onChange={(e) => handleAnswerChange("p16-sec1-q1", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">2.</span>
              <p className="font-bold text-[#e6007e]">ఇతరులకోసం, సమాజంకోసం త్యాగం చేసిన వారి గురించి చెప్పండి.</p>
            </div>
            <textarea
              className="w-full h-24 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] ml-6 shadow-inner resize-none bg-yellow-50/50"
              placeholder="మీ జవాబు ఇక్కడ రాయండి..."
              value={answers["p16-sec1-q2"] || ""}
              onChange={(e) => handleAnswerChange("p16-sec1-q2", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section II */}
      <div className="space-y-6">
        <div className="flex">
          <div className="bg-[#2f2b66] text-white px-4 py-1.5 font-bold text-xl mr-0.5">II</div>
          <div className="bg-[#2f2b66] text-white px-6 py-1.5 font-bold text-lg flex-1">
            ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం
          </div>
        </div>

        <div className="space-y-8 px-4">
          {/* Question II.1 */}
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">1.</span>
              <p className="font-bold text-[#e6007e]">కింది వాక్యాల ఆధారంగా పాఠంలోని పద్యపాదాలను గుర్తించి రాయండి.</p>
            </div>

            <div className="space-y-4 ml-6 font-medium">
              {[
                { id: "p16-sec2-q1-a", label: "అ) ధర్మం జగత్తుకంతటికీ మేలు చేయాలి" },
                { id: "p16-sec2-q1-b", label: "ఆ) ఈ పక్షి నాకు ప్రకృతి సహజంగా ఏర్పడిన ఆహారం" },
                { id: "p16-sec2-q1-c", label: "ఇ) ఆశ్రయించిన వారిని విడిచిపెట్టడం ధర్మమవుతుందా చెప్పు" }
              ].map((q) => (
                <div key={q.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="whitespace-nowrap">{q.label}</span>
                  <input
                    type="text"
                    className="flex-1 border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question II.2 */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">2.</span>
              <p className="font-bold text-[#e6007e]">కింది పద్యాన్ని చదివి ఇచ్చిన ప్రశ్నలకు సరిపోయే జవాబును గుర్తించండి.</p>
            </div>

            <div className="ml-8 text-gray-700 italic">
              బ్రతికి నన్నినాళ్ళు ఫలము లిచ్చుటెగాదు<br/>
              చచ్చిగూడ చీల్చియిచ్చు తనువు<br/>
              త్యాగభావమునకు తరువులే గురువులు<br/>
              లలిత సుగుణజాల తెలుగుబాల.
            </div>

            {/* MCQs */}
            <div className="space-y-8 ml-6 pt-2">
              {mcqs.map((mcq) => (
                <div key={mcq.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-[#2f2b66]">{mcq.question}</p>
                    <div className="flex items-center gap-1 font-bold text-lg text-[#2f2b66]">
                      <span>(</span>
                      <span className="w-8 text-center text-[#e6007e]">{answers[mcq.id] || "\u00A0"}</span>
                      <span>)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
                    {mcq.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswerChange(mcq.id, opt.value)}
                        className={`text-left px-3 py-1.5 rounded transition-all ${
                          answers[mcq.id] === opt.value
                            ? "bg-[#2f2b66] text-white shadow-md font-bold"
                            : "hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
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
          7
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
