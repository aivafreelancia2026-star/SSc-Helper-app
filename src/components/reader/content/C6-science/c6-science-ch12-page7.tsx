import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE3_ROWS: TableCell[][] = Array.from({ length: 5 }, () => [
  { value: "", editable: true },
  { value: "", editable: true },
]);

export function C6ScienceCh12Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Using the above definitions, can you group the objects you observed in Table-2 as
            conductors and insulators? Make a list of objects and group them as conductors and
            insulators and write in table-3.
          </p>

          <FillInTable
            title="Table 3"
            columns={["Conductors", "Insulators"]}
            rows={TABLE3_ROWS}
            storageKey="c6-science-ch12-table3"
          />

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            12.7. The story of bulb :
          </h2>
          <p className="text-xs">
            The story of invention of bulb is very interesting. We may think that a bulb is a very
            simple gadget, just press a switch and it lights up. But do you know that many scientists
            worked hard for many years before the first successful bulb was made? One of them was
            Thomas Alva Edison who ultimately succeeded in making the first bulb.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig9.png"
              alt="Fig. 9 — Thomas Alva Edison portrait"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9: Thomas Alva Edison
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            From childhood, Edison was of an inquisitive nature and he learned science by performing
            experiments himself. You will be amazed to know that in his lifetime he invented more than
            one thousand inventions.
          </p>
          <p className="text-xs">
            Even an intelligent scientist like Edison had to work hard for many years before he could make
            a bulb that worked. First of all, he passed electricity through a thin, thread-like platinum
            wire. He noticed that the wire did give out light after being heated, but it burned out after only
            a few seconds. Edison then thought that if the air surrounding the wire coil was removed then,
            perhaps, the wire would not burn out so quickly.
          </p>

          <div className="flex items-center gap-4 bg-sky-50 border border-sky-100 rounded-xl p-3 max-w-[200px] mx-auto shadow-xs">
            <img
              src="/assets/images/C6-science/ch12_edison_bulb.png"
              alt="Edison's first primitive bulb sketch"
              className="max-w-[45px] h-auto rounded"
            />
            <div className="text-[10px] text-sky-950 font-medium leading-tight">
              Edison&apos;s first bulb
            </div>
          </div>

          <p className="text-xs">
            He made a glass casing and fitted a filament of platinum wire in it. He then removed all the air
            from within the glass casing. He passed an electric current through the wire and, to his delight, the
            bulb lit up and continued to glow for eight long minutes. With this achievement he felt happy and began
            experimenting with different materials while searching for a better choice of filament. He tried cotton
            thread coated with soot. This filament burned continuously for 45 hours.
          </p>
          <p className="text-xs">
            One summer day he saw a man fanning himself with a bamboo fan. An idea striked his curious mind -
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Building on his earlier discoveries, Michael Faraday (1791-1867) invented the electric generator.</TipBox>
      </div>
    </div>
  );
}
