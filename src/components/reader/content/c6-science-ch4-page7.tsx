import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE4_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "use beak" }, { value: "hens scratch the ground with feet and eat worms, crows don't" }],
  [{ value: "2." }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "3." }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh4Page7() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <ol className="list-decimal space-y-1.5 pl-5">
        <li>The reason for the beaks of birds being different is to make it easy to recognize them.</li>
        <li>There is no reason for the difference, it just happens.</li>
        <li>The beaks of birds are different because they eat different kinds of food.</li>
      </ol>

      <p>Again look at Fig. 4 and try to answer:</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Which two of the given birds (sparrow, duck, eagle, pegion) would eat the same kind of food according to you?</li>
        <li>Why do you think they might eat the same kind of food?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">4.4.1. Picking food with beak</h2>
      <p>
        <strong>Activity-3:</strong> We see hens and crows in our surroundings searching for food.
        Do you find any similarities, and dissimilarities in the way and type of food eaten by hen
        and crow? What are they? Write your observations in table 4.
      </p>

      <FillInTable
        title="Table 4"
        columns={["S.No.", "Similarities", "Dissimilarities"]}
        rows={TABLE4_ROWS}
        storageKey="c6-science-ch4-table4"
      />

      <p>
        Woodpeckers have a long and strong beak. By using it they remove layers of bark and eat
        ants and worms which lie under the bark of a tree. Crane has a long beak to catch fish in
        water. Have you ever seen eagles? They have strong hooked beaks to tear flesh off animals.
      </p>
      <p>
        Parrot, which eats fruits and cracks nuts, has a hooked beak, while the crow doesn&apos;t
        have it. Not only the beak, there are other parts as well that are different to suit the
        type of food eaten by a bird.
      </p>
      <p>
        Eagles would need sharp claws along with strong hooked beaks to tear flesh, while the
        humming bird that sucks nectar would need a long thin beak and does not need sharp claws.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-4: Picture Collection</h2>
      <p>
        Prepare a scrapbooklet on birds and their food habits. Collect pictures of different birds.
        Write the way in which each bird gets its food.
      </p>

      <CalloutBox title="Do you know?">
        Crows that live in our surroundings usually eat waste, rotten food material, dead animals
        etc. They keep our surroundings clean in this manner. So they are called natural
        scavengers. Vultures also belong to this category.
      </CalloutBox>

      <TipBox>Animals are heterotrophs, they can not produce their own food.</TipBox>
    </div>
  );
}
