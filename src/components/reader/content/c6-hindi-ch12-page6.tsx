"use client";

import Image from "next/image";

export function C6HindiCh12Page6() {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white mt-4 flex flex-col min-h-[900px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full bg-[#f8fae5]">
             <Image 
               src="/original_page_65.png" 
               alt="Original textbook page 65 - Hand Shadows" 
               fill 
               className="object-contain md:object-center drop-shadow-sm p-4 md:p-8"
               priority
             />
             {/* Subtle gradient to ensure text readability if needed */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80"></div>
           </div>

           {/* Text Content Overlay */}
           <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12">
             
             {/* Top Text Box */}
             <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-[#e3d5ca]/50 mb-auto mt-4 max-w-3xl mx-auto w-full text-center">
               
               <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-6 drop-shadow-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 परछाइयाँ ही परछाइयाँ
               </h1>
               
               <p className="text-xl md:text-2xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 परछाइयाँ देखिए। नाम बताइए।
               </p>
               
             </div>

             {/* Transparent Spacer for Illustration */}
             <div className="flex-1 min-h-[500px] md:min-h-[700px]"></div>

             {/* Bottom Text Box */}
             <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-[#e3d5ca]/50 mt-auto max-w-3xl mx-auto w-full mb-4 text-center">
               
               <p className="text-xl md:text-2xl text-slate-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 इसी तरह की कुछ और परछाइयाँ बनाइए।
               </p>
               
             </div>

           </div>
           
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">65</div>
        <span>बच्चे चले क्रिकेट खेलने</span>
      </div>

    </div>
  );
}
