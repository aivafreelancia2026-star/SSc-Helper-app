"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh2Page11() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p29-answers");
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
      localStorage.setItem("c8-telugu-ch2-p29-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Section: Questions and Definition Box */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start pt-4 pl-4 md:pl-8">
        
        {/* Left: Questions */}
        <div className="flex-1 space-y-6">
          {[
            { id: "top-q1", text: "పూర్వపదం చివర ఉన్న అచ్చు ఏది?" },
            { id: "top-q2", text: "పరపదం మొదట ఉన్న అచ్చు ఏది?" },
            { id: "top-q3", text: "పూర్వపదం చివరి అచ్చుకు పరపదం మొదటి అచ్చు కలిస్తే ఏం ఏర్పడింది?" }
          ].map((q) => (
            <div key={q.id} className="space-y-2">
              <p className="text-[#4a4a4a]">{q.text}</p>
              <input
                type="text"
                className="w-full max-w-[300px] border-b border-gray-400 p-1 focus:outline-none focus:border-[#e6007e] bg-transparent text-[15px] italic text-[#3e3470]"
                placeholder="జవాబు రాయండి..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Right: Definition Box */}
        <div className="w-full md:w-[320px] shrink-0 bg-[#ebe6f2] rounded-xl p-5 border border-[#d1c4e0] shadow-sm text-[#4a4a4a] text-[15px] leading-relaxed text-center">
          <p>
            సంధిని విడదీసినపుడు ఏర్పడే రెండు పదాలలో మొదటి పదాన్ని 'పూర్వపదం', రెండవ పదాన్ని 'పరపదం' అని అంటారు.
          </p>
        </div>
      </div>

      {/* Grammar Explanation */}
      <div className="space-y-6 pl-4 md:pl-8 pt-4 text-[#4a4a4a]">
        <p className="indent-12 text-justify">
          పై ఉదాహరణలు చూసినప్పుడు మొదటి పదం చివరన 'అ' అచ్చు ఉంటుంది. రెండవ పదం మొదట అ, ఏ, ఒ
          మొదలైన అచ్చులు ఉన్నాయి. సంధి జరిగినప్పుడు మొదటి పదం చివరి అచ్చు 'అ' లోపించి రెండో పదం మొదటి
          అచ్చు వచ్చి చేరితే కింది విధంగా ఉంటాయి.
        </p>

        <div className="space-y-5 pl-4 md:pl-8">
          <div className="flex gap-4 items-start">
            <span className="font-bold w-[25px]">(i)</span>
            <p>రామయ్య &rarr; లాంటి పదాల్లో సంధి ఎప్పుడూ అవుతుంది. (నిత్యం)</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-bold w-[25px]">(ii)</span>
            <p>మేనత్త, మేనయత్త &rarr; లాంటి పదాల్లో సంధి జరగవచ్చు, జరుగకపోవచ్చు. (వైకల్పికం)</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-bold w-[25px]">(iii)</span>
            <p>సెలయేరు &rarr; లాంటి పదాలు 'సెలెరు' లాగా మారకుండా 'సెలయేరు' లాగానే ఉంటాయి. (నిషేధం)</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-bold w-[25px]">(iv)</span>
            <p>ఒకానొక &rarr; లాంటి పదాలు 'ఒకొక'లాగా మారకుండా మరోరూపంలోకి అంటే 'ఒకానొక'లాగా మారుతాయి. (అన్యకార్యం)</p>
          </div>
        </div>

        <p className="pt-2 text-[14px]">
          (మొదటి పదం చివరి అచ్చు పూర్వ స్వరం. రెండోపదం మొదటి అచ్చు పరస్వరం.)
        </p>

        <p className="text-[#1e1b4b] font-bold">
          'అ' కు అచ్చులు (అ, ఆ, ఇ, ఈ, ఉ, ఊ, ఎ, ఏ, ఐ, ఒ, ఓ, ఔ) పరమైతే ఏర్పడే సంధి 'అత్వసంధి'.
        </p>
      </div>

      {/* Banner Rule */}
      <div className="flex justify-center pt-2">
        <div className="bg-[#ebd9e4] border border-[#d1c4e0] rounded-full px-8 py-2 shadow-sm text-center">
          <span className="font-bold text-[#1e1b4b]">
            అత్తు ( అత్తు అంటే హ్రస్వమైన 'అ' ) నకు అచ్చు పరమైనప్పుడు సంధి బహుళముగానగు.
          </span>
        </div>
      </div>

      {/* Question 3: Combining Words */}
      <div className="flex flex-col md:flex-row gap-8 items-start pt-6 pl-4 md:pl-8">
        
        {/* Left: Questions */}
        <div className="flex-1 space-y-6">
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">3.</span>
            <div className="flex-1 space-y-5">
              <p className="text-[#e6007e] font-bold">కింది పదాలను కలిపి రాయండి. ఏం జరిగిందో చెప్పండి.</p>
              
              <div className="space-y-4 pt-2 text-[#4a4a4a]">
                <div className="flex items-center gap-4">
                  <p className="w-[150px]">ఉదా : తగిన + అంత</p>
                  <span>=</span>
                  <p className="pl-4">తగినంత</p>
                </div>

                {[
                  { id: "sec6-q3-a", prefix: "అ)", word: "చాలిన + అంత" },
                  { id: "sec6-q3-aa", prefix: "ఆ)", word: "సీత + అమ్మ" },
                  { id: "sec6-q3-i", prefix: "ఇ)", word: "అక్కడ + ఇక్కడ" },
                  { id: "sec6-q3-ii", prefix: "ఈ)", word: "అందక + ఉండెను" },
                  { id: "sec6-q3-u", prefix: "ఉ)", word: "చెప్పుట + ఎట్లు" },
                  { id: "sec6-q3-uu", prefix: "ఊ)", word: "రాక + ఏమి" }
                ].map((q) => (
                  <div key={q.id} className="flex items-center gap-4">
                    <p className="w-[150px]">{q.prefix} {q.word}</p>
                    <span>=</span>
                    <input
                      type="text"
                      className="w-[200px] border-b border-gray-400 p-1 focus:outline-none focus:border-[#e6007e] bg-transparent text-[15px] italic text-[#3e3470]"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Definition Box */}
        <div className="w-full md:w-[280px] shrink-0 bg-[#ebe6f2] rounded-xl p-6 border border-[#d1c4e0] shadow-sm text-[#4a4a4a] text-[15px] leading-relaxed mt-10 md:mt-0 md:mr-16">
          <p className="font-bold text-[#1e1b4b] mb-2">బహుళం :</p>
          <p>
            సంధి నిత్యంగా, వైకల్పికంగా,
            నిషేధంగా, అన్యకార్యంగా
            జరుగడాన్ని 'బహుళం'
            అంటారు.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          20
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
