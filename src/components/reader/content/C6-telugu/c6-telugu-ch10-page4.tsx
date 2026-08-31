import { FigureNote } from "@/components/reader/figure-note";

// Book page 97 (PDF/app P106) — Section II: the king remarries after
// Lakshmidevamma's passing; the new queen Manikyaladevi mistreats the
// children and has them sent away to the forest.
export function C6TeluguCh10Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II</h3>
        <p className="px-5 py-4">
          కథలో మలుపు వస్తుంది — రాజు మరో వివాహం చేసుకుంటాడు. కొత్త రాణి మాణిక్యాలదేవి పిల్లల పట్ల
          క్రూరంగా ప్రవర్తిస్తుంది, వారిని ఇబ్బందిపెడుతుంది. చివరికి ఆమె కుట్రవల్ల పిల్లలను అడవిలోకి
          పంపించివేస్తారు — దిక్కులేని స్థితిలో వారు అడవిలో తిరుగాడాల్సి వస్తుంది.
        </p>
      </section>

      <FigureNote emoji="👹💀🦴" caption="పుర్రెల దండ ధరించి, పుర్రెల కర్ర పట్టుకున్న దుష్టపాత్ర చిత్రం" />
    </div>
  );
}
