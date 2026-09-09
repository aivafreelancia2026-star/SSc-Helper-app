"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const QUESTIONS = [
  { id: "p14-q1", text: "డేగ తన ఆకలిని తీర్చుకోవడానికి శిబి మాంసాన్ని ఎందుకు కోరింది?" },
  { id: "p14-q2", text: "“అనుగ్రహించితి మహా విహగోత్తమ’ అని శిబిచక్రవర్తి అనటాన్ని మీరెట్లా అర్థం చేసుకున్నారు?" },
  { id: "p14-q3", text: "శిబిచక్రవర్తి పావురాన్ని రక్షించడానికి ప్రాణత్యాగానికి పూనుకున్నాడు కదా! త్యాగం ఆవశ్యకత ఏమిటి?" },
];

export function C8TeluguCh1Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch1-p14-answers");
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
      localStorage.setItem("c8-telugu-ch1-p14-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-loose text-[#1e1b4b] pt-4" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Half: Verses 5-10 */}
      <div className="w-full space-y-8 px-2 sm:px-6">
        
        {/* Poem 5 */}
        <div className="flex gap-4">
          <div className="font-bold text-[#e6007e] flex items-center gap-1 whitespace-nowrap">
            <span className="text-lg">🌸</span> తే॥
          </div>
          <div className="flex-1 flex justify-between items-end">
            <div className="pl-4">
              ప్రాణభయమున వచ్చి యిప్పక్షి నన్ను<br/>
              నాశ్రయించె నాశ్రితునెట్టి యధముఁడయిన<br/>
              విడువఁడనినను నేనెట్లు విడుతు దీని?<br/>
              నాశ్రిత త్యాగమిది ధర్మవగునె? చెప్పుమ
            </div>
            <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 5</div>
          </div>
        </div>

        {/* Section II Header */}
        <div className="text-center font-bold text-2xl pt-2 pb-2">II</div>

        {/* Poem 6 (Vachanam) */}
        <div className="flex gap-4">
          <div className="font-bold text-gray-500 whitespace-nowrap">వ॥</div>
          <div className="flex-1 flex justify-between items-end text-justify">
            <div>
              నీవు పక్షివయ్యును ధర్మమెఱింగినట్లు పలికితి, శరణాగత పరిత్యాగంబు కంటె మిక్కిలి యధర్మం బొండెద్ది? నీయాఁకలి దీననకాని యొంట నుపశమింపదే? నీ యత్నం బాహారార్థం బేని యిప్పు డివ్వనంబున మృగ మహిష వరాహ ఖగ మాంసంబులు దీనికంటె మిక్కిలిగాఁ బెట్టెద, నిక్కపోతంబు వలని యాగ్రహం బుడుగుము, దీని నేనెట్లును విడువ’ ననిన శ్యేనం బిట్లనియె...
            </div>
            <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 6</div>
          </div>
        </div>

        {/* Poem 7 */}
        <div className="flex gap-4">
          <div className="font-bold text-gray-500 whitespace-nowrap">ఆ॥</div>
          <div className="flex-1 flex justify-between items-end">
            <div className="pl-4">
              నాకు విహిత భక్షణంబుది; యిప్పక్షిఁ<br/>
              బూని కావ నీకు బుద్ధియేని<br/>
              యవని నాథ! దీని యంత నీ మాంసంబు<br/>
              తూచి నాకుఁ బెట్టు తొలగ కిపుడ
            </div>
            <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 7</div>
          </div>
        </div>

        {/* Poem 8 */}
        <div className="flex gap-4">
          <div className="font-bold text-[#e6007e] flex items-center gap-1 whitespace-nowrap">
            <span className="text-lg">🌸</span> చ॥
          </div>
          <div className="flex-1 flex justify-between items-end">
            <div className="pl-4">
              అనిన ‘ననుగ్రహించితి మహా విహగోత్తమ’ యంచు సంతసం<br/>
              బున శిబి తత్క్షణంబ యసి పుత్రిక నాత్మశరీర కర్తనం<br/>
              బనఘుఁడు సేసి చేసి తన యంగమునం గల మాంసమెల్లఁ బె<br/>
              ట్టినను గపోతభాగమ కడిందిగ డిందుచు నుండె నత్తులన్
            </div>
            <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 8</div>
          </div>
        </div>

        {/* Poem 9 */}
        <div className="flex gap-4">
          <div className="font-bold text-gray-500 whitespace-nowrap">క॥</div>
          <div className="flex-1 flex justify-between items-end">
            <div className="pl-4">
              దానికి నచ్చెరువడి ధర<br/>
              ణీ నాథుఁడు తనువు నందు నెత్తురు దొరుఁగం<br/>
              దాన తుల యెక్కె నంతన్<br/>
              వాని గుణోన్నతికి మెచ్చి వాసవ దహనుల్
            </div>
            <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 9</div>
          </div>
        </div>

        {/* Poem 10 (Vachanam) */}
        <div className="flex gap-4">
          <div className="font-bold text-gray-500 whitespace-nowrap">వ॥</div>
          <div className="flex-1 flex justify-between items-end text-justify">
            <div>
              శ్యేనకపోత రూపంబులు విడిచి నిజరూపంబులఁ జూపి ‘నీధైర్య శౌర్యాది గుణంబు లనన్యసాధారణంబులు గావున నీకీర్తి నిత్యంబై శబ్ద బ్రహ్మంబు గలయంత కాలంబు వర్ధిల్లుచుండు’మని శిబికి వరంబిచ్చి యింద్రాగ్నులు చనిరి.
            </div>
            <div className="font-bold text-gray-500 pl-4 whitespace-nowrap">... 10</div>
          </div>
        </div>

      </div>

      {/* Bottom Half: Split Layout (Questions on Left, Image on Right) */}
      <div className="flex flex-col-reverse md:flex-row gap-6 items-stretch pt-8 pb-4 px-2">
        
        {/* Left Side: Questions Card */}
        <div className="w-full md:w-[60%] flex flex-col pt-6">
          <div className="relative flex-1 border border-purple-100 rounded-2xl p-6 pt-1 bg-[#ecebf4] shadow-sm">
            
            {/* Title Badge styling embedded to float slightly out */}
            <div className="flex justify-center -mt-5 mb-4">
              <div className="bg-[#2f2b66] text-white px-6 py-1.5 rounded-full font-bold text-sm shadow-md flex items-center gap-2">
                <span>ఆలోచించండి-చెప్పండి</span>
              </div>
            </div>

            <div className="space-y-5">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="text-[#e6007e] text-lg mt-0.5 flex-shrink-0 leading-none">❖</div>
                    <label htmlFor={q.id} className="font-bold text-[#1e1b4b] italic block leading-snug">
                      {q.text}
                    </label>
                  </div>
                  {/* Single-line inputs to ensure everything fits perfectly in the block */}
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

        {/* Right Side: Eagle Illustration */}
        <div className="w-full md:w-[40%] relative min-h-[300px] md:min-h-[400px] flex items-center justify-center">
          <div className="relative w-[280px] h-[350px]">
            <Image 
              src="/eagle-cropped.png"
              alt="Eagle Illustration"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center pt-6 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          5
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
