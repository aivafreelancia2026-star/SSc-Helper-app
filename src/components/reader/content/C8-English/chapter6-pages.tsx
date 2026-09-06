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
    title: "Art and Culture",
    subtitle: "Unit 6 overview",
    gallery: [
      { emoji: "🎭", label: "Folk arts" },
      { emoji: "🧵", label: "Handloom" },
      { emoji: "🏺", label: "Pottery" },
      { emoji: "🎶", label: "Music" }
    ],
    sections: [
      {
        title: "Readings in this unit",
        body: "This unit explores how art forms, crafts, poetry, and music carry memory, skill, and community identity.",
        items: ["Reading A: The Story of Ikat", "Reading B: The Earthen Goblet", "Reading C: Maestro with a Mission"]
      },
      {
        title: "Theme preview",
        body: "Students think about how traditional artists preserve culture and how everyday objects can hold history."
      }
    ],
    tip: "Culture is not only found in museums; it also lives in festivals, clothes, songs, tools, and local skills."
  },
  2: {
    title: "Look and Discuss",
    subtitle: "Arts around us",
    gallery: [
      { emoji: "🪆", label: "Dolls and toys" },
      { emoji: "📿", label: "Bead work" },
      { emoji: "🪔", label: "Festival idols" },
      { emoji: "💃", label: "Dance form" }
    ],
    sections: [
      {
        title: "Picture discussion",
        body: "The opening page shows crafts, ornaments, festival objects, and dance. These can be used to discuss local markets, celebrations, and community traditions.",
        items: [
          "Name the art or craft forms you can identify.",
          "Say where people usually find or use them.",
          "Explain why handicrafts and dance forms are part of culture."
        ]
      },
      {
        title: "Oral discourse",
        body: "Prepare a short talk on art and cultural forms of your area. Include examples, occasions, materials, and the people who practise them."
      }
    ],
    tip: "A good talk moves from familiar local examples to a clear reason why they matter."
  },
  3: {
    title: "Reading A: The Story of Ikat",
    subtitle: "A classroom becomes colourful",
    sections: [
      {
        title: "Context",
        body: "The narrative begins in a classroom. The students expect an ordinary period, but Janaki teacher enters with bundles of cloth and turns the class into a lively lesson on textiles."
      },
      {
        title: "What the fabrics do",
        body: "The bright rumals and shawls catch everyone's attention. The students ask questions, and the teacher introduces Ikat as a textile tradition connected with Andhra Pradesh."
      },
      {
        title: "First clues",
        body: "Students connect the patterns to familiar saris and identify Pochampally in Nalgonda district. The discussion moves from a cloth pattern to the larger story of handlooms."
      }
    ],
    tip: "In a narrative lesson, notice how curiosity leads the students from observation to history."
  },
  4: {
    title: "Handlooms and Heritage",
    subtitle: "Names, places, and weaving",
    sections: [
      {
        title: "Main idea",
        body: "Janaki teacher explains that handlooms are operated by hand and have been used to weave cloth for centuries. Her serious mood shows concern that people may forget this heritage."
      },
      {
        title: "Ikat names",
        body: "The fabric tradition is known by different names in different languages and regions. Students learn that one art form can travel across places and still keep local meanings."
      },
      {
        title: "Weaving terms",
        body: "Two important weaving words are introduced.",
        items: ["Warp: threads stretched lengthwise.", "Weft: threads crossing widthwise."]
      }
    ],
    tip: "Use the idea of a graph to remember warp and weft: two directions crossing to make a pattern."
  },
  5: {
    title: "Tie and Dye Process",
    subtitle: "How pattern appears before weaving",
    gallery: [
      { emoji: "🧶", label: "Thread bundles" },
      { emoji: "🪢", label: "Knots" },
      { emoji: "🎨", label: "Dye" },
      { emoji: "▦", label: "Motif plan" }
    ],
    sections: [
      {
        title: "Process summary",
        body: "The teacher explains that threads are sorted, divided into bundles, tied at planned points, dipped in colour, and then opened. The tied areas help create the final design."
      },
      {
        title: "Skill behind the craft",
        body: "The process requires counting, measuring, planning repeats, and matching colours. The students realise that weaving includes careful calculation."
      },
      {
        title: "Think",
        body: "Discuss why a traditional craft can be both artistic and mathematical."
      }
    ],
    tip: "A motif is a repeated design element; in Ikat, the motif must be planned before the cloth is woven."
  },
  6: {
    title: "Chitiki Rumal",
    subtitle: "Dots, names, and trade",
    sections: [
      {
        title: "Meaning clue",
        body: "The class connects small colour dots on threads with the Telugu word linked to a small quantity. This helps them understand why the cloth is called chitiki rumal."
      },
      {
        title: "Use of the cloth",
        body: "The text mentions the rumal as a headgear and shoulder cloth used by working people and traders. It shows how a fabric can be practical, decorative, and cultural."
      },
      {
        title: "History question",
        body: "The teacher points out that Ikat's exact movement between regions is not fully settled. This makes students see craft history as a living inquiry, not just a fixed answer."
      }
    ],
    tip: "When a text raises an unresolved historical question, write what is known and what is still uncertain."
  },
  7: {
    title: "Reading A Wrap-up",
    subtitle: "Culture woven into cloth",
    sections: [
      {
        title: "Ending idea",
        body: "The class becomes deeply attentive as the teacher connects Ikat to trade, sacred knots, regional influence, and shared cultural stories."
      },
      {
        title: "Glossary focus",
        body: "Use these words to discuss the narrative.",
        items: ["mandatory", "drab", "pelt", "giggled", "babble", "pensive", "intersect", "headgear", "jubilant", "resolve", "vibrant", "compelling"]
      },
      {
        title: "Comprehension",
        body: "Answer questions about the story's main theme, the use of chitiki rumal, the teacher's silence, the effect of the patola sari, and the part of the story you liked most."
      }
    ],
    tip: "A thematic answer should connect the story events to the larger value: preserving handloom heritage."
  },
  8: {
    title: "Homonyms",
    subtitle: "Same spelling, different meanings",
    sections: [
      {
        title: "Vocabulary idea",
        body: "Homonyms have the same spelling but different meanings. The page uses examples such as class and minutes to show how context changes meaning."
      },
      {
        title: "Dictionary task",
        body: "Find meanings for homonym pairs and use them in original sentences.",
        items: ["fair as an adjective and fair as a noun", "mind as a noun and mind as a verb", "quiet as an adjective and quiet as a noun"]
      },
      {
        title: "Practice",
        body: "Write two sentences for each word so that the two meanings are clear."
      }
    ],
    tip: "For homonyms, the surrounding words are your best clue."
  },
  9: {
    title: "Homophones",
    subtitle: "Same sound, different spelling",
    sections: [
      {
        title: "Vocabulary idea",
        body: "Homophones sound alike but have different spellings and meanings. The page contrasts examples like some and sum."
      },
      {
        title: "Correction task",
        body: "Replace incorrect underlined words in a short passage with the correct homophones.",
        items: ["no -> know", "blew -> blue", "one -> won", "price -> prize", "write -> right", "not -> knot", "died -> dyed"]
      },
      {
        title: "Grammar preview",
        body: "The page also begins a lesson on reporting what someone said, using examples from the Ikat narrative."
      }
    ],
    tip: "A homophone exercise is exact-answer practice, but the sentence meaning must guide the spelling."
  },
  10: {
    title: "Reported Speech",
    subtitle: "Questions and tense changes",
    sections: [
      {
        title: "Reporting clauses",
        body: "The grammar explanation separates the reporting clause from the reported clause. Students learn how direct questions can become reported statements."
      },
      {
        title: "Common changes",
        body: "When the reporting verb is in the past tense, pronouns, demonstratives, verb forms, and modals may change.",
        items: ["are -> were", "can -> could", "may -> might", "will -> would", "must -> had to", "these -> those"]
      },
      {
        title: "Conversation practice",
        body: "Rewrite a short conversation between Ramya and a weaver in reported speech. Keep the meaning, but change question order and tense where needed."
      }
    ],
    tip: "In reported questions, use statement word order after if, whether, or a question word."
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} page summary carefully.`,
    `Complete one response from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one new idea you learned from this page."
  ];
}

export function C8EnglishChapter6Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Class 8 English - Unit 6</p>
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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-ch6-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
