import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

type Section = {
  title: string;
  body: string;
  items?: string[];
};

const PAGE_CONTENT: Record<number, { title: string; subtitle: string; sections: Section[]; gallery?: { emoji: string; label: string }[]; tip?: string }> = {
  1: {
    title: "Education and Career",
    subtitle: "Unit 5 overview",
    gallery: [
      { emoji: "🎓", label: "Education" },
      { emoji: "🩺", label: "Medicine" },
      { emoji: "🧑‍🔬", label: "Science" },
      { emoji: "🏸", label: "Sports" },
      { emoji: "🏛️", label: "Public service" }
    ],
    sections: [
      {
        title: "Readings in this unit",
        body: "This unit connects education, ambition, talent, career choices, and the dignity of work.",
        items: ["Reading A: The Treasure Within - Part I", "Reading B: The Treasure Within - Part II", "Reading C: They Literally Build the Nation"]
      },
      {
        title: "Theme preview",
        body: "The unit asks students to think about how people discover their abilities and choose meaningful work."
      }
    ],
    tip: "A career is not only a job; it is a path shaped by interests, effort, and opportunities."
  },
  2: {
    title: "Look and Discuss",
    subtitle: "Ambition and role models",
    sections: [
      {
        title: "Picture discussion",
        body: "The opening pictures show famous achievers from education, science, public life, and sports. Use them to talk about fields of work and personal ambition.",
        items: [
          "Identify the persons shown in the pictures.",
          "Which field does each person belong to?",
          "Would you like to be like any one of them? Name the field you like."
        ]
      },
      {
        title: "Oral discourse",
        body: "Prepare a short talk on the ambition of your life. Mention the field, reason, preparation, and qualities needed."
      }
    ],
    tip: "A clear ambition speech says what you want, why you want it, and how you will work for it."
  },
  3: {
    title: "Reading A: The Treasure Within",
    subtitle: "Interview with Hafeez Contractor",
    sections: [
      {
        title: "Context",
        body: "The reading is an interview with architect Hafeez Contractor. In Part I, he recalls his school life, difficulties with examinations, and the moment a principal's words affected him deeply."
      },
      {
        title: "Early school memories",
        body: "Hafeez says he lost interest in study after the early classes. He enjoyed games and mischief more than academics, but later realised he had to take responsibility."
      },
      {
        title: "Think",
        body: "Notice how one caring warning from an adult can change a student's direction."
      }
    ],
    tip: "An interview reveals character through questions, answers, and memories."
  },
  4: {
    title: "School Days and Interests",
    subtitle: "Part I continues",
    sections: [
      {
        title: "Hafeez's strengths",
        body: "Although he struggled with routine academics, Hafeez had strong interests in sports, visual memory, practical observation, and planning games."
      },
      {
        title: "Glossary focus",
        body: "Use these words from the interview to discuss his experiences.",
        items: ["nightmare", "psyche", "caning", "chor police", "strategies", "academics", "book"]
      },
      {
        title: "Character study",
        body: "Write two columns: what Hafeez disliked in school and what he was good at."
      }
    ],
    tip: "A student may struggle in one kind of task and still have valuable abilities in another."
  },
  5: {
    title: "Part I Review and Part II Begins",
    subtitle: "From school memories to architecture",
    sections: [
      {
        title: "Comprehension",
        body: "Answer questions about Hafeez's nightmare, the principal's influence, his year away from the field, his distractions, and what he preferred to academics."
      },
      {
        title: "Part II preview",
        body: "The interview continues with how Hafeez entered architecture even though his marks did not seem to point naturally toward that field."
      },
      {
        title: "Career turn",
        body: "He considers other paths, including the Army and police, before moving towards college and eventually architecture."
      }
    ],
    tip: "Career paths are not always straight; sometimes interests become clear through detours."
  }
};

export function C8EnglishChapter5Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-rose-200 bg-rose-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Class 8 English - Unit 5</p>
        <h1 className="font-heading text-2xl font-bold text-rose-950">{content.title}</h1>
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
