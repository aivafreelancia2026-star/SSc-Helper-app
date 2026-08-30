import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "7" }, { value: "Back" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "8" }, { value: "Head" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "9" }, { value: "Shoulder" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "10" }, { value: "Elbow" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "11" }, { value: "Upper jaw" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh14Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 1 continued */}
      <FillInTable
        title="Table 1 (continued)"
        columns={["S. No.", "Body Part", "Rotates Partially/Completely", "Bends (Yes/No)", "Lifts up, down (Yes/No)", "Moves back and front (Yes/No)"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch14-table1-continued"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            All these movement are done with the help of certain parts of our body that lie beneath our
            skin. We cannot see these parts directly but we can get a sense of their movement under our
            skin. Can you guess the names of these bodyparts?
          </p>

          {/* Do you know? Box */}
          <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-2 text-emerald-800 mb-2">
              <span className="text-base font-bold">💡</span>
              <p className="font-heading text-sm font-bold tracking-tight">Do you know?</p>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed">
              We can perform different types of movements with the help of muscles and bones. They are
              situated inside the body. We can&apos;t see and study them as we see our hair, skin, eyes,
              nose, ears etc.
            </p>
          </div>

          <p className="text-xs pt-2">
            Now, let us observe how muscles and bones help in movements in our body. For this, if we observe
            carefully our body from the outside how internal parts work. In addition, if you observe the
            pictures of bones and muscles you will be able to understand the movements of the body more
            clearly.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            14.2. Muscles
          </h2>
          <p className="text-xs">
            Observe walking or running cow, bull or horse, you can see some fleshy structures moving beneath
            their skin, usually around the shoulders and hips. These tender fleshy structures are called
            <strong> muscles.</strong>
          </p>
          <p className="text-xs">
            We shall perform some experiments to find out how these muscles help the various parts of the
            body to move. We shall also see some of the activities that these muscles perform in the body.
          </p>

          <h3 className="font-heading text-sm font-bold text-emerald-805 pt-2">
            Activity-2 : Touch your shoulder
          </h3>
          <p className="text-xs">
            Make the left arm fist, bend the arm at the elbow and touch your shoulder with the fist. Also
            touch your upper arm with the right, as shown in Fig. 1, a bulging part can be observed inside
            your upper arm.
          </p>
          <p className="text-xs">
            &apos;This is a muscle. The muscle bulges due to contraction. When contracted, muscle becomes
            shorter, stiffer and thicker.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Snails and slugs travel at speeds that vary from slow (0.013 m/s) to very slow (0.0028 m/s).</TipBox>
      </div>
    </div>
  );
}
