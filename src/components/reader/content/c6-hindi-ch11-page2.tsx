"use client";

import Image from "next/image";

export function C6HindiCh11Page2() {
  const paragraph1 = [
    "खोदकर पौधे लगाता है।",
    "यहाँ हर दिन पेड़ों पर तोते,",
    "मैना और कई पक्षी आकर",
    "बैठते हैं। उद्यान के बीच में एक",
    "फव्वारा भी है। बच्चे यहाँ बड़े",
    "आनंद के साथ खेलते हैं।",
    "सच है, ऐसे ही उद्यानों से",
    "राष्ट्र की शोभा बढ़ती",
    "है।"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Interactive Story Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white mt-4 flex flex-col md:flex-row min-h-[800px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/original_page_57.png" 
               alt="Original textbook page 57 illustration of a garden with a fountain" 
               fill 
               className="object-contain md:object-right drop-shadow-sm"
               priority
             />
             {/* Subtle gradient to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent md:w-2/3 mr-auto"></div>
           </div>

           {/* Text Content Overlay (Left Side) */}
           <div className="relative z-10 w-full md:w-[45%] mr-auto flex flex-col justify-center p-6 md:p-12 mt-12 md:mt-0">
             
             <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50">
               
               {/* Paragraph 1 */}
               <div className="flex flex-col gap-2 text-left mb-6">
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
             <div className="mt-8 bg-[#e8eed9]/90 backdrop-blur-sm p-4 rounded-xl border-l-4 border-[#8ca948] shadow-sm text-center md:text-left self-start mt-auto mb-4 md:mb-12">
               <p className="text-xl md:text-2xl font-bold text-[#5c7216]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 पेड़-पौधे लगाओ - देश को हरा-भरा बनाओ।
               </p>
             </div>

           </div>
           
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">57</div>
        <span>उद्यान</span>
      </div>

    </div>
  );
}
