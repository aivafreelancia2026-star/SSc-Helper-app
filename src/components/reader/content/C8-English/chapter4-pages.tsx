import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

type Section = {
  title: string;
  body: string;
  items?: string[];
};

const PAGE_CONTENT: Record<number, { title: string; subtitle: string; sections: Section[]; gallery?: { emoji: string; label: string }[]; tip?: string }> = {
  1: {
    title: "Science and Technology",
    subtitle: "Unit 4 overview",
    gallery: [
      { emoji: "🤖", label: "Robotics" },
      { emoji: "🚀", label: "Space travel" },
      { emoji: "💻", label: "Digital classroom" },
      { emoji: "🧑‍🚀", label: "Space science" },
      { emoji: "🎮", label: "Computer games" }
    ],
    sections: [
      {
        title: "Readings in this unit",
        body: "This unit explores future classrooms, young people's relationship with technology, and the excitement and risk of digital games.",
        items: ["Reading A: The Fun They Had", "Reading B: Preteen Pretext", "Reading C: The Computer Game"]
      },
      {
        title: "Theme preview",
        body: "Science and technology can make life faster and more powerful, but students should also ask how it affects learning, relationships, and responsibility."
      }
    ],
    tip: "When discussing technology, balance benefits with possible problems."
  },
  2: {
    title: "Look and Discuss",
    subtitle: "Pictures of modern science",
    gallery: [
      { emoji: "🤖", label: "Robot" },
      { emoji: "🚀", label: "Rocket launch" },
      { emoji: "🏫", label: "Smart classroom" },
      { emoji: "🛰️", label: "Space exploration" }
    ],
    sections: [
      {
        title: "Picture discussion",
        body: "The opening page shows machines, space travel, and technology-assisted learning. Use the pictures to speak about progress and its effects on society.",
        items: ["What do you see in these pictures?", "What do these pictures tell us about the present and future?", "Which technology helps students most? Give a reason."]
      },
      {
        title: "Oral discourse",
        body: "Debate whether development in science and technology will always lead to disasters. Prepare points for both support and opposition."
      }
    ],
    tip: "A strong debate answer uses examples, not just opinion."
  }
};

export function C8EnglishChapter4Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-cyan-200 bg-cyan-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Class 8 English - Unit 4</p>
        <h1 className="font-heading text-2xl font-bold text-cyan-950">{content.title}</h1>
        <p className="mt-1 text-foreground/65">{content.subtitle}</p>
      </div>

      {content.gallery && <IconGallery items={content.gallery} caption="Textbook picture represented with emoji stand-ins." />}

      {content.sections.map((section) => (
        <section key={section.title} className="rounded-[14px] border border-border/60 bg-white/75 p-4 shadow-sm">
          <h2 className="font-heading text-base font-bold text-primary">{section.title}</h2>
          <p className="mt-2">{section.body}</p>
          {section.items && (
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
        </section>
      ))}

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
