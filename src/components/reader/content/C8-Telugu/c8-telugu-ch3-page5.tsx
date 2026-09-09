"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh3Page5() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch3-p35-answers");
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
      localStorage.setItem("c8-telugu-ch3-p35-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Section: సారాంశం */}
      <div className="relative border border-[#d1c4e0] rounded-xl p-6 pt-10 mt-6 bg-[#ebe6f2] shadow-sm max-w-[95%] mx-auto">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-12 py-1.5 rounded-full whitespace-nowrap shadow-md">
          <h2 className="font-bold text-[16px]">సారాంశం</h2>
        </div>
        
        <div className="space-y-4 pt-2 text-justify text-[#4a4a4a] leading-[1.8]">
          <p className="indent-12">
            బిజ్జలుడు దండనాయకుడైన బండారి బసవన్నను పిలిపించాడు. “మా ధనాన్ని అప్పగించి పోవటంలో
            తప్పేమీ లేదు. ఇక చాలు మీ ప్రధాని పదవి. నన్నెవరు దండించలేరనే ధీమాతో ఖజానా అంతా ఖాళీ చేశావు.
            ఇతరుల ధనాన్ని ఆశించనని ప్రతిజ్ఞ చేశావు కదా! మరి ఎట్లా దొంగిలించావు? ఎక్కువ మాటలు ఎందుకు గానీ
            నిన్ను ఏమయిన అనడానికి నాకు భయం కలుగుతున్నది. మా సొమ్ము మాకిచ్చి మీరిక దయచేయవచ్చు”
            అన్నాడు. అప్పుడు మంత్రి బసవన చిరునవ్వుతో “పరమశివుని పట్ల భక్తి అనే కల్పవృక్షం మాకు అండగా
            ఉండగా, శంకరునిపై భక్తి అనే బంగారు పర్వతం (మేరు పర్వతం) నా ఆధీనంలో ఉండగా, పరమేశ్వరుని భక్తి
            అనే చింతామణి నా చెంత ఉండగా, శంభుని భక్తి అనే కామధేనువు నన్ను కనిపెట్టి ఉండగా నా వంటి భక్తుడు
            ఇతరుల ధనాన్ని ఆశిస్తాడా? సింహం ఎక్కడైనా గడ్డి మేస్తుందా?
          </p>
          <p className="indent-12">
            పాల సముద్రంలో క్రీడించే హంస మడుగులలో నీరు తాగుతుందా? మామిడి పండ్లను తినే చిలుక
            బూరుగ చెట్టు పండ్లను కన్నెత్తి ఐనా చూస్తుందా? నిండు పున్నమి నాటి వెన్నెలను తాగే చకోరపక్షి చీకటిని
            ఆస్వాదిస్తుందా? తామరపూల సుగంధంలో విహరించే తుమ్మెద ఉమ్మెత్త పూలకోసం పరుగులు తీస్తుందా?
            ఏనుగు పిల్ల పంది పాలు తాగడానికి తహతహలాడుతుందా? నీకు విచక్షణ లేకపోతే నేనేం చేయాలి? శివభక్తుల
            ఇండ్ల సంప్రదాయం నీకేం తెలుసు? స్వామి సొమ్ము స్వామికే ఇచ్చాను. ఇతరుల ధనంతో నాకేం పని? మీ ధనం
            కోసం నేను చేయి చాపను. నేను న్యాయం తప్పను. నీకు నా మీద నమ్మకం లేకపోతే నీ సొమ్ము లెక్క చూసుకో”
            అని పలికాడు. ధనాగారంలోని పెట్టెలన్నీ తెప్పించి తాళాలు తీసి బిజ్జలుడి ముందే వాటి మూతలు తీయించారు.
            అప్పుడు బిజ్జలుడు చూసుకుంటే పెట్టెల నిండ మాడలు (బంగారు నాణేలు) తళతళలాడుతున్నాయి. లెక్కపెట్టి
            చూడగా ఉండవలసిన వాటికన్న ఎక్కుவனே ఉన్నాయి.
          </p>
        </div>
      </div>

      {/* Middle Section: ఇవి చేయండి & QR */}
      <div className="flex flex-col items-center gap-6 pt-4">
        <div className="border-[3px] border-[#2f2b66] shadow-[4px_4px_0_#d1c4e0] px-10 py-2 bg-white">
          <h2 className="text-[#e6007e] font-bold text-2xl tracking-wide">ఇవి చేయండి</h2>
        </div>
        
        <div className="flex justify-end w-[90%] md:w-[70%]">
          <div className="border-2 border-black p-2 bg-white flex flex-col items-center">
            <div className="w-[80px] h-[80px] relative">
              <Image
                src="/c8-t-ch3-p5-qr.png"
                alt="QR Code W2S3E8"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="font-bold text-sm tracking-widest mt-1">W2S3E8</p>
          </div>
        </div>
      </div>

      {/* Section I */}
      <div className="space-y-6 pt-4 pl-4 md:pl-12">
        <div className="flex items-center gap-4 border-b-2 border-[#2f2b66] pb-2 max-w-[500px]">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-xl px-3 py-1">
            I
          </div>
          <h2 className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1 flex-1">
            విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
          </h2>
        </div>
        
        <div className="space-y-6 pl-4 md:pl-8 text-[#4a4a4a]">
          {/* Question 1 */}
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">1.</span>
            <div className="flex-1 space-y-2">
              <p className="font-bold text-[#e6007e]">
                'అచంచల భక్తి పారవశ్యం కల్గిన వాళ్ళు ధనాశకు లోనుకారు' - దీని గురించి మీ అభిప్రాయం చెప్పండి.
              </p>
              <textarea
                className="w-full max-w-2xl h-28 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                value={answers["q-i-1"] || ""}
                onChange={(e) => handleAnswerChange("q-i-1", e.target.value)}
              />
            </div>
          </div>
          
          {/* Question 2 */}
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e]">2.</span>
            <p className="font-bold text-[#e6007e]">ద్విపదను రాగయుక్తంగా పాడండి.</p>
          </div>
        </div>
      </div>

      {/* Section II */}
      <div className="space-y-6 pt-8 pl-4 md:pl-12">
        <div className="flex items-center gap-4 border-b-2 border-[#2f2b66] pb-2 max-w-[600px]">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-xl px-2 py-1">
            II
          </div>
          <h2 className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1 flex-1">
            ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం
          </h2>
        </div>
        
        <div className="space-y-8 pl-4 md:pl-8 text-[#4a4a4a]">
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">1.</span>
            <div className="flex-1 space-y-6">
              <p className="font-bold text-[#e6007e]">
                పాఠంలో కింది భావాలున్న పాదాలను గుర్తించండి. వీటిని ఎవరు ఎవరితో అన్నారో చెప్పండి.
              </p>
              
              <div className="space-y-6 max-w-2xl">
                <div className="flex gap-3">
                  <span className="font-bold pt-2">అ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">మా ధనాన్ని అప్పగించి వెళ్ళు.</p>
                    <input
                      type="text"
                      className="w-full border-b border-[#2f2b66] border-dashed bg-transparent p-2 focus:outline-none focus:border-solid"
                      placeholder="ఎవరు ఎవరితో అన్నారో ఇక్కడ రాయండి..."
                      value={answers["q-ii-a"] || ""}
                      onChange={(e) => handleAnswerChange("q-ii-a", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold pt-2">ఆ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">తామర పూల వాసనలో విహరించే తుమ్మెద ఉమ్మెత్త పూలను ఎట్లా ఆస్వాదిస్తుంది?</p>
                    <input
                      type="text"
                      className="w-full border-b border-[#2f2b66] border-dashed bg-transparent p-2 focus:outline-none focus:border-solid"
                      placeholder="ఎవరు ఎవరితో అన్నారో ఇక్కడ రాయండి..."
                      value={answers["q-ii-b"] || ""}
                      onChange={(e) => handleAnswerChange("q-ii-b", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold pt-2">ఇ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">సింహం ఎక్కడైనా గడ్డిమేస్తుందా?</p>
                    <input
                      type="text"
                      className="w-full border-b border-[#2f2b66] border-dashed bg-transparent p-2 focus:outline-none focus:border-solid"
                      placeholder="ఎవరు ఎవరితో అన్నారో ఇక్కడ రాయండి..."
                      value={answers["q-ii-c"] || ""}
                      onChange={(e) => handleAnswerChange("q-ii-c", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          26
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
