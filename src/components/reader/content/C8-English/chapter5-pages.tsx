import { IconGallery } from "@/components/reader/icon-gallery";
import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
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
  },
  6: {
    title: "Part II: Finding Architecture",
    subtitle: "Chance, drawing, and discovery",
    sections: [
      {
        title: "What happens",
        body: "Hafeez's route into architecture begins unexpectedly through language choices, a visit to an architect's office, and his ability to understand drawings."
      },
      {
        title: "Talent spotted",
        body: "He notices a problem in a window drawing and then proves that he can draw and design quickly. This helps others see his hidden ability."
      },
      {
        title: "Discuss",
        body: "Explain how practical observation can reveal a talent that marks alone may not show."
      }
    ],
    tip: "The treasure within is the ability a person may not recognise until the right situation appears."
  },
  7: {
    title: "Design Thinking",
    subtitle: "Spatial memory and school experiences",
    gallery: [
      { emoji: "🏢", label: "Architecture" },
      { emoji: "✏️", label: "Sketching" },
      { emoji: "🧠", label: "Visual memory" },
      { emoji: "🏫", label: "School memory" }
    ],
    sections: [
      {
        title: "Hafeez's strengths",
        body: "He understands plans, sections, and design shapes almost naturally. He connects this skill to childhood games, sketching, and practical problem-solving."
      },
      {
        title: "Teacher's role",
        body: "A teacher notices his sketches and predicts that he may become an architect. This shows how encouragement can help students value their abilities."
      },
      {
        title: "Glossary focus",
        body: "Use these words to discuss Part II.",
        items: ["stumbled on", "architecture", "offbeat", "calling", "cakewalk", "defied", "instinctively", "ammunition", "curriculum", "contention", "spontaneously"]
      }
    ],
    tip: "A helpful teacher sees possibility, not only mistakes."
  },
  8: {
    title: "Learning Beyond Marks",
    subtitle: "Abilities, interests, and confidence",
    sections: [
      {
        title: "Interview ideas",
        body: "Hafeez explains that he was not interested in many school subjects, but he learned from life, games, design problems, and observation."
      },
      {
        title: "Big question",
        body: "The interview suggests that giftedness and learning difficulty may sometimes appear together. Discuss this idea carefully and respectfully."
      },
      {
        title: "Reflect",
        body: "Write about one ability that is not measured well by ordinary tests."
      }
    ],
    tip: "Do not reduce a person's ability to one subject or one exam result."
  },
  9: {
    title: "Architecture as Applied Thinking",
    subtitle: "Clients, sketches, and mathematics",
    sections: [
      {
        title: "Present-day work",
        body: "Hafeez says he studies a client's taste by observing how the person speaks, dresses, and behaves. He then sketches quickly and passes the idea to his team."
      },
      {
        title: "His view of mathematics",
        body: "For him, design combines construction, psychology, sociology, and calculation. The subject he once disliked becomes meaningful when connected to real work."
      },
      {
        title: "Comprehension",
        body: "Answer why he could not join the police or army, what made him become an architect, and how his experiences support the idea of hidden talent."
      }
    ],
    tip: "A subject may feel different when it is connected to a real purpose."
  },
  10: {
    title: "Vocabulary Practice",
    subtitle: "Meaning shades and word combinations",
    sections: [
      {
        title: "Meaning from context",
        body: "Study words such as interested, absorbed, rapt, engrossed, and fascinated. They all relate to attention, but each has a slightly different force."
      },
      {
        title: "Word combinations",
        body: "Practise natural combinations with adjectives such as terrible, ugly, sweet, difficult, funny, horrible, and ordinary."
      },
      {
        title: "Use in sentences",
        body: "Choose four combinations and write original sentences that make the meaning clear."
      }
    ],
    tip: "Vocabulary grows faster when you learn which words naturally go together."
  },
  11: {
    title: "One Word, Many Meanings",
    subtitle: "Board and present",
    sections: [
      {
        title: "Multiple meanings",
        body: "The word board can work as a noun or a verb. Its meaning changes with context, such as a piece of wood, a decision group, a stage, meals, or getting onto a vehicle."
      },
      {
        title: "Practice with present",
        body: "Read the paragraph and identify different meanings of present as adjective, verb, noun, or phrase."
      },
      {
        title: "Dictionary work",
        body: "Find other words from the text or elsewhere that can be both nouns and verbs, then write their meanings."
      }
    ],
    tip: "Context is the clue that tells you which meaning of a familiar word is being used."
  },
  12: {
    title: "Past Habits and Compere Writing",
    subtitle: "Used to, would, and stage script",
    sections: [
      {
        title: "Grammar",
        body: "Used to and would can describe repeated actions or habits in the past. Find more examples from the interview and write about what you normally did in Class VII."
      },
      {
        title: "Writing task",
        body: "Prepare a compering script for a Children's Day programme where Hafeez Contractor is invited as chief guest."
      },
      {
        title: "Biographical notes",
        body: "Use short facts about his education, career beginnings, architectural practice, and professional roles to introduce him."
      }
    ],
    tip: "A compere connects events smoothly while keeping the audience informed and interested."
  },
  13: {
    title: "Compering and Listening",
    subtitle: "Programme order and highlights",
    sections: [
      {
        title: "Features of compering",
        body: "Arrange the programme, present background, highlight people and events, add brief reflections, use polite expressions, and follow stage conventions."
      },
      {
        title: "Listening task",
        body: "Listen to a compering script for Teachers' Day and answer how it begins, how events are arranged, what the highlights are, and how it concludes."
      }
    ],
    tip: "Good compering sounds natural but is carefully organised."
  },
  14: {
    title: "Reading C: They Literally Build the Nation",
    subtitle: "Civil engineering overview",
    gallery: [
      { emoji: "🏗️", label: "Construction" },
      { emoji: "🌉", label: "Bridge" },
      { emoji: "🚇", label: "Rail system" },
      { emoji: "🛣️", label: "Highway" },
      { emoji: "💧", label: "Water systems" }
    ],
    sections: [
      {
        title: "Main idea",
        body: "The essay explains that civil engineering is a broad field connected with infrastructure such as roads, railways, airports, bridges, water supply, buildings, and public works."
      },
      {
        title: "Changing role",
        body: "Civil engineers now guide clients, handle regulations, plan costs and schedules, and coordinate complex projects instead of only preparing drawings."
      }
    ],
    tip: "An expository essay explains a subject with facts, examples, and categories."
  },
  15: {
    title: "Civil Engineering Branches",
    subtitle: "Glossary and comprehension",
    sections: [
      {
        title: "Branches and roles",
        body: "Civil engineering includes environmental, structural, highway, construction management, and quantity surveying roles. Each branch supports public life in a different way."
      },
      {
        title: "Glossary focus",
        body: "Use these terms to explain the essay.",
        items: ["disciplines", "exaggeration", "sophisticated", "stringent", "client", "multifaceted", "offshore", "compliance", "internship", "procurement"]
      },
      {
        title: "Comprehension",
        body: "Answer questions about planned constructions, branches of civil engineering, the title, client guidance, and whether civil engineering is challenging."
      }
    ],
    tip: "For a tree diagram, put the main field at the centre and branches around it with short feature notes."
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} page summary carefully.`,
    `Complete one response from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one new idea you learned from this page."
  ];
}

export function C8EnglishChapter5Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-ch5-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
