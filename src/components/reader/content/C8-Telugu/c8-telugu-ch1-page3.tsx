"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const QUESTIONS = [
  { id: "q1", text: "సత్యధర్మ నిర్మలుడని శిబి చక్రవర్తిని ఎందుకన్నారు?" },
  { id: "q2", text: "“ధర్మువు సర్వంబునకు హితంబుగ వలయున్” దీనిపై మీ అభిప్రాయాన్ని చెప్పండి." },
  { id: "q3", text: "ఆశ్రితులను ఎందుకు విడిచి పెట్టరాదు?" },
  { id: "q4", text: "ఏ సందర్భంలో ఇతరులు మిమ్మల్ని ఆశ్రయిస్తారు?" },
];

export function C8TeluguCh1Page3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch1-p3-answers");
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
      localStorage.setItem("c8-telugu-ch1-p3-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-loose text-[#1e1b4b] pt-4" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Half (Text Overlay) */}
      <div className="w-full space-y-6">
        
        {/* Pravesika */}
        <div className="relative pt-6 max-w-3xl mx-auto">
          {/* Dark Blue Title Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-12 py-1.5 rounded-full font-bold text-sm z-10 shadow-md">
            ప్రవేశిక
          </div>
          
          <div className="bg-[#ecebf4] rounded-lg p-6 pt-8 text-justify font-medium text-gray-800 shadow-sm">
            మన ప్రాచీనసాహిత్యంలో నైతికవిలువలకు ఎంతో ప్రాధాన్యం ఉన్నది. భారత, రామాయణాలు ఉత్తములైన రాజుల కథలను వివరిస్తాయి. వారిలో శిబిచక్రవర్తి త్యాగగుణానికి తార్కాణంగా నిలుస్తాడు. తనను ఆశ్రయించిన ఒక పావురాన్ని డేగ నుండి రక్షించడానికి తన ప్రాణాలను సైతం లెక్కచేయడు. అది ఎట్లానో తెలుసుకుందాం.
          </div>
        </div>

        {/* Section I */}
        <div className="text-center font-bold text-2xl pt-2">I</div>

        {/* Poems Container */}
        <div className="space-y-6 pl-4 sm:pl-12 pr-4 text-[14.5px]">
          {/* Poem 1 */}
          <div className="flex gap-4">
            <div className="font-bold text-gray-500 whitespace-nowrap">ఆ॥</div>
            <div className="flex-1 flex justify-between items-end">
              <div>
                నిన్ను సత్య ధర్మ నిర్మలుఁగా విందు<br/>
                నట్టి నీకు బాడియయ్య? యిప్పు<br/>
                డతి బుభుక్షితుండనై యున్న నాకు నా<br/>
                హార విఘ్న మిట్టులాచరింప?
              </div>
              <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 1</div>
            </div>
          </div>

          {/* Poem 2 (Vachanam) */}
          <div className="flex gap-4">
            <div className="font-bold text-gray-500 whitespace-nowrap">వ॥</div>
            <div className="flex-1 flex justify-between items-end text-justify">
              <div>
                సర్వ భూతంబులు నాహారంబున జీవించి వర్ధిల్లు, నిదినాకు, భక్ష్యంబు గానినాఁడు బుభుక్షావేదనంచేసి ప్రాణ వియోగంబగు, నట్లయిన నా పుత్రులు భార్యయు జీవింపనేర, రొక్క కపోతంబు రక్షించి పెక్కు జీవులకు హింస సేయుట ధర్మవిరోధంబు
              </div>
              <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 2</div>
            </div>
          </div>

          {/* Poem 3 */}
          <div className="flex gap-4">
            <div className="font-bold text-[#e6007e] flex items-center gap-1 whitespace-nowrap">
              <span className="text-lg">🌸</span> క॥
            </div>
            <div className="flex-1 flex justify-between items-end">
              <div className="pl-6">
                ధర్మజ్ఞులైన పురుషులు<br/>
                ధర్మువునకు బాధసేయు ధర్మువునైనన్<br/>
                ధర్మముగా మదిఁ దలఁపరు<br/>
                ధర్మువు సర్వంబునకు హితంబుగ వలయున్
              </div>
              <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 3</div>
            </div>
          </div>

          {/* Poem 4 (Vachanam) */}
          <div className="flex gap-4">
            <div className="font-bold text-gray-500 whitespace-nowrap pl-8">వ॥</div>
            <div className="flex-1 flex justify-between items-end text-justify">
              <div>
                ఇక్కపోతంబు నాకు వేదవిహితంబైన యాహారంబు. <br/>
                ‘శ్యేనః కపోతాన్ ఖాదయన్తి’ యను వేదవచనంబు<br/>
                గలదు గావున దీని నాకు నాహారంబుగా నిమ్మనిన<br/>
                దానికి శిబి యిట్లనియె
              </div>
              <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 4</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Half: Split Layout (Image on Left, Questions on Right) */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch pt-4">
        
        {/* Left Side: Illustration */}
        <div className="w-full md:w-[45%] relative min-h-[350px] md:min-h-full rounded-2xl overflow-hidden bg-white">
          <Image 
            src="/c8-t-ch1-p13-bottom.png"
            alt="Shibi Chakravarthy Illustration"
            fill
            className="object-cover object-left"
            unoptimized
          />
        </div>

        {/* Right Side: Questions Card */}
        <div className="w-full md:w-[55%] flex flex-col pt-6">
          <div className="relative flex-1 border border-purple-100 rounded-2xl p-6 pt-1 bg-[#ecebf4] shadow-sm">
            
            {/* Title Badge styling embedded to float slightly out */}
            <div className="flex justify-center -mt-5 mb-4">
              <div className="bg-[#2f2b66] text-white px-6 py-1.5 rounded-full font-bold text-sm shadow-md flex items-center gap-2">
                <span>ఆలోచించండి-చెప్పండి</span>
              </div>
            </div>

            <div className="space-y-4">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="text-[#e6007e] text-lg mt-0.5 flex-shrink-0 leading-none">❖</div>
                    <label htmlFor={q.id} className="font-bold text-[#1e1b4b] italic block leading-snug">
                      {q.text}
                    </label>
                  </div>
                  {/* Using single-line inputs to save space and fit all 4 without scrolling */}
                  <input
                    type="text"
                    id={q.id}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    className="w-full rounded border border-gray-300 bg-white/80 px-3 py-1.5 text-sm focus:border-[#2f2b66] focus:outline-none focus:ring-1 focus:ring-[#2f2b66]/50 shadow-inner"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-4 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          4
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
