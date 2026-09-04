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
  },
  6: {
    title: "After Oliver's Request",
    subtitle: "Author note and glossary",
    sections: [
      {
        title: "What changes",
        body: "After Oliver asks for more food, the adults treat his hunger as disobedience. The response shows how harsh institutions can blame children instead of helping them."
      },
      {
        title: "About Charles Dickens",
        body: "Dickens wrote about social problems and human suffering. His own difficult childhood helped him notice the struggles of poor children and workers."
      },
      {
        title: "Glossary practice",
        body: "Use these words in short sentences connected to the story.",
        items: ["beadle", "parish", "gruel", "voracious", "stupified", "confinement", "apprentice"]
      }
    ],
    tip: "When a story has a glossary, reread the page after learning the new words. The scene becomes clearer."
  },
  7: {
    title: "Comprehension",
    subtitle: "Questions from Oliver Asks for More",
    sections: [
      {
        title: "Answer in your own words",
        body: "These questions check both factual understanding and inference.",
        items: [
          "How did Oliver feel when he appeared before the board?",
          "Why did Oliver tremble and cry in the white-washed room?",
          "What kind of people were the board members? Justify your opinion.",
          "What differences do you notice between the children and the master?",
          "How do you look at Oliver's request for more food?",
          "What happened to Oliver at the end of the story?",
          "How would you help children who face problems like Oliver?"
        ]
      },
      {
        title: "Vocabulary focus",
        body: "A compound adjective joins words to describe a noun more exactly, as in descriptions of appearance, behaviour, or place."
      }
    ]
  },
  8: {
    title: "Compound Adjectives",
    subtitle: "Vocabulary exercise",
    sections: [
      {
        title: "Learn the pattern",
        body: "Compound adjectives often use hyphens and come before the noun they describe.",
        items: ["red-faced gentleman", "right-handed batsman", "kind-hearted person", "Mumbai-based NGO", "mind-blowing records"]
      },
      {
        title: "Fill in the blanks",
        body: "Choose suitable compound adjectives from the lesson box.",
        items: ["soft-spoken", "brand-new", "old-fashioned", "well-mannered", "deep-rooted"]
      }
    ],
    tip: "Use compound adjectives only when they make the description sharper."
  },
  9: {
    title: "Yes/No Questions",
    subtitle: "Grammar from the story",
    sections: [
      {
        title: "Rule",
        body: "To change a statement into a yes/no question, place the helping verb before the subject. If there is no helping verb, use do, does, or did."
      },
      {
        title: "Practice",
        body: "Change the statements into yes/no questions.",
        items: [
          "Oliver was frightened at the sight of so many gentlemen.",
          "You are an orphan.",
          "You say your prayers every night.",
          "Mr. Bumble rushed into the room.",
          "They can devour the big bowl."
        ]
      }
    ]
  },
  10: {
    title: "Question Tags and Editing",
    subtitle: "Confirmation and correction",
    sections: [
      {
        title: "Question tags",
        body: "A question tag is added at the end of a statement to ask for confirmation. Positive statements usually take negative tags, and negative statements usually take positive tags.",
        items: ["The weather is good, isn't it?", "You have met me before, haven't you?", "We enjoy such occasions, don't we?"]
      },
      {
        title: "Editing skill",
        body: "Read each numbered sentence carefully. Check prepositions, verb agreement, articles, and word forms."
      }
    ],
    tip: "For editing, fix one error at a time. Rushing usually creates new mistakes."
  },
  11: {
    title: "Writing and Reading B",
    subtitle: "Diary writing and The Cry of Children",
    sections: [
      {
        title: "Diary writing",
        body: "The textbook connects Oliver's loneliness with diary writing. A diary entry may include personal feelings, unusual events, reflections, and future hopes."
      },
      {
        title: "Write as Oliver",
        body: "Imagine Oliver has returned to his bed after facing the board. Write a diary entry about fear, hunger, confusion, and hope."
      },
      {
        title: "Reading B preview",
        body: "The poem The Cry of Children presents tired working children whose bodies and spirits are worn down by labour. Read it in the textbook and focus on mood and imagery.",
        items: ["What makes the children tired?", "What images show suffering?", "Why is the poem part of a unit on social issues?"]
      }
    ],
    tip: "For poetry, describe the feeling in your own words before analysing lines."
  },
  12: {
    title: "Poem Comprehension",
    subtitle: "The Cry of Children and Reading C",
    sections: [
      {
        title: "Answer after reading",
        body: "The poem presents child labour as painful, exhausting, and unjust. These questions help you connect imagery with the poet's attitude.",
        items: [
          "What kind of places are the children working in?",
          "What does the flower image suggest about childhood?",
          "How does hard work affect the children?",
          "Do children enjoy themselves when engaged in work?",
          "What is the poet's attitude towards child labour?"
        ]
      },
      {
        title: "Reading C preview",
        body: "Reaching the Unreached presents children who are pushed into labour by poverty, family crisis, and lack of protection."
      }
    ]
  },
  13: {
    title: "Reaching the Unreached",
    subtitle: "Children, labour, and rescue",
    sections: [
      {
        title: "Article summary",
        body: "The article describes children who leave school or home and end up in difficult work. It also shows how neighbours, rescue teams, helplines, and child-rights organisations can help."
      },
      {
        title: "Key ideas",
        body: "Track each child's age, reason for work, type of work, and the support they receive.",
        items: ["poverty", "domestic violence", "school dropout", "child labour", "rescue", "rehabilitation"]
      }
    ],
    tip: "When reading an article, separate facts about people from facts about organisations."
  },
  14: {
    title: "CRY and SOS",
    subtitle: "Organisations that support children",
    sections: [
      {
        title: "CRY",
        body: "Child Rights and You works with communities and partner organisations so that children can claim their rights instead of depending only on charity."
      },
      {
        title: "SOS Children's Villages",
        body: "SOS supports children and families through care, advocacy, family strengthening, and direct support when a child cannot safely remain at home."
      },
      {
        title: "Comprehension",
        body: "Answer in complete sentences.",
        items: ["Who rescued the two children?", "What is the role of CRY?", "Whom can children report abuse to?", "How does SOS work?"]
      }
    ]
  },
  15: {
    title: "Study Skills",
    subtitle: "Making notes from a passage",
    sections: [
      {
        title: "Why make notes?",
        body: "Notes help you reduce a long passage into headings, subpoints, and important details. They are useful for revision and presentations."
      },
      {
        title: "Note-making steps",
        body: "Use a clear title and arrange ideas logically.",
        items: ["Read the passage once for meaning.", "Underline key ideas.", "Choose short headings.", "Write subpoints in brief phrases.", "Avoid copying every sentence."]
      },
      {
        title: "Task",
        body: "Read the CRY passage again and make notes on its work, method, and impact."
      }
    ],
    tip: "Good notes are shorter than the passage but still preserve the structure of the idea."
  },
  16: {
    title: "Project and Self Assessment",
    subtitle: "Completing Unit 2",
    sections: [
      {
        title: "Project profile",
        body: "Collect information about one child worker respectfully and safely. Do not pressure anyone to share personal details.",
        items: ["Age", "Gender", "Nature of work", "Wages", "Working hours", "Reason for work", "School history", "Willingness to join school"]
      },
      {
        title: "Group analysis",
        body: "Discuss why children take up jobs, how they are paid, and how many wish to leave work and join school."
      },
      {
        title: "Self check",
        body: "Review whether you understood the three readings, vocabulary, yes/no questions, question tags, diary writing, note-making, listening, and project work."
      }
    ],
    tip: "For real-life project work about children, protect privacy and speak to a trusted adult or teacher first."
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} page summary carefully.`,
    `Complete one response from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one new idea you learned from this page."
  ];
}

export function C8EnglishChapter2Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-ch2-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
