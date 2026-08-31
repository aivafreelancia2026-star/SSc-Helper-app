import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

type Section = {
  title: string;
  body: string;
  items?: string[];
};

const PAGE_CONTENT: Record<number, { title: string; subtitle: string; sections: Section[]; gallery?: { emoji: string; label: string }[]; tip?: string }> = {
  1: {
    title: "Humanity",
    subtitle: "Unit opener: kindness and compassion",
    gallery: [
      { emoji: "🤲", label: "Helping hands" },
      { emoji: "🥣", label: "Food shared" },
      { emoji: "🧒", label: "A child helper" },
      { emoji: "🧑", label: "A person in need" },
      { emoji: "💬", label: "Kind words" },
      { emoji: "🌱", label: "Hope" }
    ],
    sections: [
      {
        title: "Look and answer",
        body: "The unit opens with a picture of one person helping another. Use it to discuss kindness, dignity, and social responsibility.",
        items: [
          "What do you notice in the picture?",
          "What might the man in the picture be feeling?",
          "Have you seen people helping others? Narrate one incident."
        ]
      },
      {
        title: "Oral discourse",
        body: "Narrate an incident you witnessed where people helped others. Include who needed help, who helped, and what changed after the help."
      }
    ],
    tip: "A humane response protects a person's dignity while offering help."
  },
  2: {
    title: "Reading A: The Selfish Giant",
    subtitle: "Part I begins",
    sections: [
      {
        title: "Drama setup",
        body: "The reading is presented like a play. An older version of the giant speaks to the audience while the earlier action appears behind him."
      },
      {
        title: "Character contrast",
        body: "The title character owns a beautiful garden but does not want to share it with children. This creates the central conflict.",
        items: ["Who speaks to the audience?", "What kind of place is the garden?", "Why do the children like it?", "What selfish decision does the giant make?"]
      }
    ],
    tip: "In a play, stage directions tell us actions and mood, not just dialogue."
  },
  3: {
    title: "No Place to Play",
    subtitle: "Children outside the wall",
    sections: [
      {
        title: "What the picture shows",
        body: "The children lose access to the garden and are forced into unsafe or unpleasant spaces. Their comments reveal disappointment and fear."
      },
      {
        title: "Discuss",
        body: "Think about why a play space matters for children.",
        items: [
          "How do the children react after the wall is built?",
          "What does the wall symbolise?",
          "Why is the garden more than just land?",
          "How does the picture help you understand the scene?"
        ]
      }
    ]
  },
  4: {
    title: "Winter in the Garden",
    subtitle: "Selfishness changes the setting",
    sections: [
      {
        title: "Symbolism",
        body: "After the children are kept out, the garden loses warmth and life. The cold weather reflects the owner's selfish heart."
      },
      {
        title: "Personification",
        body: "The seasons and weather are treated like characters. This makes nature respond to human behaviour in a dramatic way.",
        items: ["Spring", "Summer", "Autumn", "Snow", "Frost", "North Wind", "Hail"]
      }
    ],
    tip: "When nature mirrors a character's feelings, it often signals a moral change in the story."
  },
  5: {
    title: "Reading for Performance",
    subtitle: "Voice, action, and mood",
    sections: [
      {
        title: "Stage reading",
        body: "Read the scene aloud by assigning roles. Use voice changes to show anger, fear, sadness, and regret."
      },
      {
        title: "Performance notes",
        body: "Prepare a short scene without copying long lines. Focus on movement and expression.",
        items: [
          "The children approach the garden happily.",
          "The wall separates them from joy.",
          "The garden becomes cold and silent.",
          "The owner wonders why warmth has gone away."
        ]
      },
      {
        title: "Theme link",
        body: "The first part shows that selfishness can make even a beautiful place lifeless. Humanity begins when we make room for others."
      }
    ]
  }
};

export function C8EnglishChapter3Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Class 8 English - Unit 3</p>
        <h1 className="font-heading text-2xl font-bold text-emerald-950">{content.title}</h1>
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
