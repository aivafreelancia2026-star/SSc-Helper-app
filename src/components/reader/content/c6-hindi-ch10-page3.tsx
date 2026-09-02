"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh10Page3() {
  const [circledLetters, setCircledLetters] = useState<Record<number, boolean>>({});
  const [tableInputs, setTableInputs] = useState<Record<string, string>>({
    'म्म': 'निम्मी'
  });

  const dvityaksharList = ["च्च", "म्म", "ल्ल", "य्य", "न्न", "त्त", "स्स", "ब्ब", "ट्ट", "क्क"];
  const tableRows = ["क्क", "च्च", "ट्ट", "त्त", "द्द", "न्न", "म्म", "ब्ब", "प्य", "य्य", "ल्ल", "व्य", "स्स"];

  const toggleCircle = (index: number) => {
    setCircledLetters(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleTableInputChange = (prefix: string, value: string) => {
    setTableInputs(prev => ({
      ...prev,
      [prefix]: value
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Header Image (Optional, to show they can replace the whole page if they want) */}
          {/* We will build it natively to be interactive instead of just an image */}

          {/* Section 1: सुनो-बोलो */}
          <section className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-3 bg-[#e4eed4] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
              <span className="text-2xl">🗣️</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                सुनो-बोलो
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 pl-4 md:pl-8 mt-2">
              <div className="flex gap-4 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-600">1.</span>
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  छुट्टी के दिन आप क्या-क्या करते हैं?
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-600">2.</span>
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  रामू काका ने रस्सी से झूला बाँधा। इसी तरह रस्सी से कौन-कौन से खेल खेल सकते हैं?
                </p>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-slate-200" />

          {/* Section 2: पढ़ो */}
          <section className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-3 bg-[#d5e8db] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
                <span className="text-2xl">📖</span>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  पढ़ो
                </h2>
              </div>
              <div className="hidden md:block text-5xl animate-bounce">🥭</div>
            </div>
            
            <div className="flex flex-col gap-4 pl-4 md:pl-8">
              <div className="flex gap-4 items-center">
                <span className="text-lg md:text-xl font-bold text-slate-600">1.</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  बच्चे क्या खाना चाहते थे?
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-lg md:text-xl font-bold text-slate-600">2.</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  झूले से कौन गिर गई?
                </p>
              </div>
            </div>

            {/* Activity (अ) */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(अ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नीचे दिए गए द्वित्वाक्षर पाठ में पहचानिए और उन पर <span className="inline-block w-6 h-6 rounded-full border-2 border-slate-800 mx-1 align-middle"></span> लगाइए।
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 p-6 bg-white rounded-xl shadow-inner border-2 border-slate-100 ml-0 md:ml-12 justify-center md:justify-start">
                {dvityaksharList.map((letter, idx) => (
                  <button
                    key={`letter-${idx}`}
                    onClick={() => toggleCircle(idx)}
                    className={`text-2xl font-bold w-16 h-16 flex items-center justify-center transition-all duration-300 ${
                      circledLetters[idx] 
                        ? 'text-red-600 border-4 border-red-500 rounded-full scale-110 bg-red-50' 
                        : 'text-slate-700 hover:bg-slate-100 rounded-lg hover:scale-105'
                    }`}
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity (आ) */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(आ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  पाठ में आए द्वित्वाक्षर वाले शब्द तालिका में सही जगह लिखिए।
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start ml-0 md:ml-12">
                
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-sm border border-yellow-600 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {tableRows.map((row, idx) => (
                        <tr key={`row-${idx}`} className="border-b border-yellow-600 last:border-0">
                          <td className="w-1/3 p-3 text-lg font-bold text-slate-700 border-r border-yellow-600 text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                            {row}
                          </td>
                          <td className="w-2/3 p-0">
                            <input
                              type="text"
                              value={tableInputs[row] || ""}
                              onChange={(e) => handleTableInputChange(row, e.target.value)}
                              className="w-full h-full p-3 text-lg text-slate-800 focus:outline-none focus:bg-yellow-50 transition-colors"
                              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                              placeholder={row === 'म्म' ? '' : '...'}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Decorative Icon replacing the original clipped image */}
                <div className="hidden md:flex w-1/3 justify-center items-center sticky top-32">
                   <div className="flex flex-col items-center bg-blue-50/50 p-8 rounded-full shadow-inner border border-blue-100">
                     <div className="text-[100px] drop-shadow-lg transform -rotate-6 transition-transform hover:rotate-0 hover:scale-110 duration-300">
                       📝
                     </div>
                     <div className="text-xl font-bold text-slate-500 mt-4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                       अभ्यास करें
                     </div>
                   </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 3: विचार-विमर्श */}
          <section className="mt-8 bg-yellow-50 rounded-2xl border border-yellow-400 p-6 shadow-sm relative">
            <div className="absolute -top-5 left-6 bg-yellow-100 p-2 rounded-full border border-yellow-400 text-3xl">
              💭
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 ml-12" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              विचार-विमर्श
            </h3>
            <p className="text-lg text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              अपना दुःख, दर्द, निराशा, समस्या अपने साथी, दोस्त या माता-पिता या अध्यापक को बताइए। ऐसा करने से हमारा दुःख कम हो सकता है और समस्या का समाधान भी मिल जाता है। आप अपना दुःख-दर्द किसे बताते हैं?
            </p>
            <textarea 
              className="w-full mt-4 p-4 rounded-xl border border-yellow-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
              rows={3}
              placeholder="अपने विचार यहाँ लिखें..."
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            ></textarea>
          </section>
          
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">52</div>
        <span>चुक्की और जब्बार</span>
      </div>

    </div>
  );
}
