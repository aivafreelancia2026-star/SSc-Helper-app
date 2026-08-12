import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [
    { value: "Change observed when brought close to one pole of the bar magnet." },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ],
  [
    { value: "Change observed when brought close to other pole of the bar magnet." },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ],
];

export function C6ScienceCh2Page7() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">
        Activity-8: Finding out whether the given object is a magnet or not.
      </h2>
      <p>
        You have been given three objects of same size, shape and colour. Now using bar magnet, you
        have to find which one among them is a magnet, which is made up of a magnetic material or a
        non-magnetic material. Bring three objects one after the other close to one pole of the bar
        magnet and observe whether they get attracted or repelled or neither repelled nor
        attracted. Record your observation in table 2. After that bring those objects close to the
        other pole of the bar magnet in the same way and record your observations.
      </p>

      <FillInTable
        title="Table 2"
        columns={["Observation", "Object - 1 (Attracted / Repelled / Not effected)", "Object - 2 (Attracted / Repelled / Not effected)", "Object - 3 (Attracted / Repelled / Not effected)"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch2-table2"
      />

      <p>What do you conclude by comparing the recorded observations?</p>
      <p>By the above observations we conclude the following:</p>
      <p>
        If an object is attracted by one pole of the bar magnet and repelled by its other pole,
        then you can say that it is a magnet.
      </p>
      <p>
        If an object is attracted by both the poles of a bar magnet and not repelled by any pole,
        then you can say that it is not a magnet but a magnetic material.
      </p>
      <p>
        If an object is neither attracted nor repelled by the poles of the magnet, then you can say
        that it is a non-magnetic material.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-9: Make your own magnet</h2>
      <p>
        Take an iron nail and place it on a table. (Make sure that the nail neither attracted by
        magnet earlier). Take a bar magnet and place one of its poles near one edge of the nail.
        Without lifting the bar magnet, move it along the length of the iron nail till you reach the
        other end. Then lift the bar magnet, bring it to the first end of the nail and move along
        the length again as shown in Fig. 9. Repeat this process 20-30 times. (Always move the
        magnet in one direction, don&apos;t drag the magnet back and forth.)
      </p>

      <TipBox>The compass was used hundreds of years ago by chinese sailors.</TipBox>
    </div>
  );
}
