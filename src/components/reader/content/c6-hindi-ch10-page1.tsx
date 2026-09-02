"use client";

import Image from "next/image";

export function C6HindiCh10Page1() {
  const storyLines = [
    "छुट्टी का",
    "दिन था। बच्चे आम",
    "खाना चाहते थे। मुन्नी",
    "सभी बच्चों के साथ अपने",
    "रामू काका के घर गई। वे",
    "बच्चों को बहुत चाहते",
    "थे।"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      {/* Top Header */}
      <div className="p-4 md:p-8 pb-4">
        <div className="flex justify-between items-start mb-6">
          
          {/* Chapter Title Badge */}
          <div className="bg-[#e4eed4] rounded-xl py-3 px-6 shadow-sm border border-[#c1d9a5] flex items-center gap-4">
             <div className="bg-white px-4 py-1 rounded-lg border border-[#c1d9a5] font-bold text-slate-800 text-lg md:text-xl" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
               इकाई - IV
             </div>
             <h1 className="text-2xl md:text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
               10. चुक्की और जब्बार
             </h1>
          </div>

          {/* QR Code Placeholder */}
          <div className="flex flex-col items-center bg-white border-2 border-slate-300 rounded-lg p-1 shadow-sm shrink-0">
             <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=F2D2W5')] bg-cover bg-center rounded-sm border border-slate-200"></div>
             <div className="font-mono text-xs font-bold text-slate-600 mt-1 tracking-widest">F2D2W5</div>
          </div>
        </div>

        {/* Main Interactive Story Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#f8f9fa] mt-4 flex flex-col md:flex-row min-h-[600px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/mango_tree_kids.jpg" 
               alt="Children catching mangoes from a tree" 
               fill 
               className="object-cover object-left md:object-center"
               priority
             />
             {/* Gradient overlay to make text readable on smaller screens where image covers everything */}
             <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-white/90 via-white/50 to-transparent"></div>
           </div>

           {/* Text Content Overlay */}
           <div className="relative z-10 w-full md:w-1/2 ml-auto flex flex-col justify-center p-8 md:p-12 mt-40 md:mt-0">
             
             <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/50 transform transition-transform hover:scale-[1.02]">
               <div className="flex flex-col gap-3 text-right md:text-left">
                 {storyLines.map((line, index) => (
                   <p 
                     key={index} 
                     className="text-2xl md:text-4xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors"
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                   >
                     {line}
                   </p>
                 ))}
               </div>
               
               {/* Decorative floating mangoes */}
               <div className="absolute -top-6 -right-6 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🥭</div>
               <div className="absolute -bottom-6 -left-6 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🥭</div>
             </div>

           </div>
           
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">50</div>
        <span>चुक्की और जब्बार</span>
      </div>

    </div>
  );
}
