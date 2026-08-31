import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

type Section = {
  title: string;
  body: string;
  items?: string[];
};

const PAGE_CONTENT: Record<number, { title: string; subtitle: string; sections: Section[]; gallery?: { emoji: string; label: string }[]; tip?: string }> = {
  1: {
    title: "Social Issues",
    subtitle: "Unit opener: home and homelessness",
    gallery: [
      { emoji: "🏠", label: "Home" },
      { emoji: "🛣️", label: "Street life" },
      { emoji: "🥣", label: "Hunger" },
      { emoji: "🧒", label: "Childhood" },
      { emoji: "🤲", label: "Care" },
      { emoji: "⚖️", label: "Justice" }
    ],
    sections: [
      {
        title: "Think about the saying",
        body: "The unit begins with the idea that home is the happiest place. It asks students to think about children who do not have that security.",
        items: [
          "What does the sentence mean?",
          "Do you agree or disagree with the view? Why?",
          "Do you like your home? Give a reason."
        ]
      },
      {
        title: "Oral discourse",
        body: "Talk about the feelings of a homeless child. Focus on safety, hunger, loneliness, and hope."
      }
    ],
    tip: "Sensitive topics need thoughtful language. Speak with empathy, not pity."
  },
  2: {
    title: "Reading A: Oliver Asks for More",
    subtitle: "Introducing Oliver Twist",
    sections: [
      {
        title: "Context",
        body: "This extract is from Charles Dickens's novel Oliver Twist. Oliver is an orphan boy brought into a children's home where adults hold power over him."
      },
      {
        title: "First impressions",
        body: "As the scene opens, Oliver is frightened before a group of officials. Notice how the adults treat him and how little control he has.",
        items: ["Who is Oliver?", "Why is he afraid?", "What does the board represent in the scene?"]
      }
    ],
    tip: "Dickens often criticises society by showing how powerful people treat the poor."
  },
  3: {
    title: "The Workhouse System",
    subtitle: "Reading for social criticism",
    sections: [
      {
        title: "What happens",
        body: "Oliver is sent into a harsh institution. The boys receive very little food, and the officials speak as if poverty is a fault."
      },
      {
        title: "Comprehension",
        body: "Answer after reading the textbook page.",
        items: [
          "What decision changes Oliver's life?",
          "How are the poor treated in the workhouse?",
          "What details show that the boys are hungry?"
        ]
      }
    ]
  },
  4: {
    title: "Hunger and Courage",
    subtitle: "The request for more food",
    sections: [
      {
        title: "Key moment",
        body: "The boys are so hungry that they decide someone must ask for more food. Oliver is chosen, and his small request shocks the adults."
      },
      {
        title: "Discuss",
        body: "Think about why a simple request becomes a serious act in this setting.",
        items: [
          "Was Oliver greedy or desperate? Explain.",
          "Why are the adults horrified?",
          "What does this scene reveal about injustice?"
        ]
      }
    ],
    tip: "A powerful scene often turns an ordinary action into a moral question."
  },
  5: {
    title: "Character and Tone",
    subtitle: "Understanding Dickens's humour and seriousness",
    sections: [
      {
        title: "Character map",
        body: "Oliver appears timid but brave. The officials appear confident, comfortable, and disconnected from the children's suffering."
      },
      {
        title: "Tone",
        body: "The narration can sound humorous, but the situation is serious. This contrast helps expose cruelty in a memorable way.",
        items: ["Find one detail that shows fear.", "Find one detail that shows hunger.", "Find one detail that makes the officials look foolish."]
      }
    ]
  }
};

export function C8EnglishChapter2Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-fuchsia-200 bg-fuchsia-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-700">Class 8 English - Unit 2</p>
        <h1 className="font-heading text-2xl font-bold text-fuchsia-950">{content.title}</h1>
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
