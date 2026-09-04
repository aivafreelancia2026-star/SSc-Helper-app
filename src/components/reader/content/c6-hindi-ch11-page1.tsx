"use client";

import Image from "next/image";

export function C6HindiCh11Page1() {
  const paragraph1 = [
    "हमारे गाँव में एक",
    "उद्यान है। इसका मुख्य द्वार",
    "बहुत सुंदर है। यहाँ रंग-बिरंगे फूल",
    "हैं। कई प्रकार के वृक्ष हैं। हरी पत्तियों",
    "और फूलों से भरी हुई वृक्षों की",
    "डालियाँ बहुत सुंदर लगती हैं। गर्मी",
    "में हम इनकी छाया में बैठते",
    "हैं। माली गड्ढे"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-4 md:p-8 pb-4">
        
        {/* Header Area with Title and QR */}
        <div className="flex justify-between items-center bg-[#e5ead5] p-4 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            11. उद्यान
          </h1>
          <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow">
             {/* Mock QR Code for visual fidelity */}
             <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=M5T1J2')] bg-cover bg-center rounded-sm border border-slate-200"></div>
             <div className="font-mono text-xs font-bold text-slate-600 mt-1 tracking-widest">M5T1J2</div>
          </div>
        </div>

        {/* Main Interactive Story Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white mt-4 flex flex-col md:flex-row min-h-[800px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/original_page_56.png" 
               alt="Original textbook page 56 illustration of a garden" 
               fill 
               className="object-contain md:object-left drop-shadow-sm"
               priority
             />
             {/* Subtle gradient to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/40 to-transparent md:w-2/3 ml-auto"></div>
           </div>

           {/* Text Content Overlay (Right Side) */}
           <div className="relative z-10 w-full md:w-1/2 ml-auto flex flex-col justify-center p-6 md:p-12 mt-12 md:mt-0">
             
             <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50">
               
               {/* Paragraph 1 */}
               <div className="flex flex-col gap-2 text-right md:text-left mb-6">
                 {paragraph1.map((line, index) => (
                   <p 
                     key={`p1-${index}`} 
                     className="text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors"
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                   >
                     {line}
                   </p>
                 ))}
               </div>

             </div>

             {/* Slogan */}
             <div className="mt-8 bg-green-50/90 backdrop-blur-sm p-4 rounded-xl border-l-4 border-green-500 shadow-sm text-center md:text-left self-end md:self-start ml-auto md:ml-0 md:-ml-8 md:mt-auto md:mb-12">
               <p className="text-xl md:text-2xl font-bold text-green-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 पेड़-पौधे लगाएँ - प्रदूषण मिटाएँ।
               </p>
             </div>

           </div>
           
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">56</div>
        <span>उद्यान</span>
      </div>

    </div>
  );
}
