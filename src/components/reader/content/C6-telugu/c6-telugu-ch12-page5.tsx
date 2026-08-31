import { FigureNote } from "@/components/reader/figure-note";

// Book page 122 (PDF/app P131) — Section II: the conversation turns to
// cell-phone tower radiation killing birds like sparrows, and factory
// pollution.
export function C6TeluguCh12Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II</h3>
        <p className="px-5 py-4">
          సెల్‌ఫోన్ టవర్ల నుండి వెలువడే రేడియేషన్ వల్ల పిచ్చుకల వంటి పక్షులు చనిపోతున్నాయని, అలాగే
          కర్మాగారాల నుండి వచ్చే కాలుష్యం కూడా పర్యావరణానికి పెద్ద ముప్పుగా మారుతున్నదని కుటుంబం
          చర్చించుకుంటుంది.
        </p>
      </section>

      <FigureNote emoji="👴👵🧒👧" caption="తాతయ్య నర్సయ్య, అమ్మమ్మ అన్నమ్మ తమ మనుమడు గోపాల్, మనుమరాలు లక్ష్మితో మాట్లాడుతున్న దృశ్యం" />
    </div>
  );
}
