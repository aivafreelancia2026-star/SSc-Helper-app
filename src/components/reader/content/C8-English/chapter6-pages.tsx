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
  },
  11: {
    title: "Reading B: The Earthen Goblet",
    subtitle: "Poem summary and imagery",
    gallery: [
      { emoji: "🏺", label: "Earthen goblet" },
      { emoji: "👐", label: "Potter's hands" },
      { emoji: "🌱", label: "Clay and earth" },
      { emoji: "🌸", label: "Flower memory" }
    ],
    sections: [
      {
        title: "Poem idea",
        body: "The poem imagines a goblet speaking about its life. It remembers being part of the earth and feels sorrow about being shaped into an object."
      },
      {
        title: "Speaker and feeling",
        body: "The goblet is treated like a living speaker. Its voice creates sympathy for clay, earth, flowers, and the natural world."
      },
      {
        title: "Poet note",
        body: "Harindranath Chattopadhyay was a poet, dramatist, actor, musician, and public figure. His short biographical note helps students connect the poem to a creative personality."
      }
    ],
    tip: "For poems, explain feelings and images in your own words instead of copying lines."
  },
  12: {
    title: "Poem Comprehension",
    subtitle: "Feelings, speaker, and literary devices",
    sections: [
      {
        title: "Glossary focus",
        body: "Use these words from the poem to discuss the speaker's experience.",
        items: ["twirl", "fatal", "captive"]
      },
      {
        title: "Comprehension",
        body: "Answer questions about who speaks in the poem, what the flower means to the goblet, whether the poem is tender toward earth or object, and which life the goblet prefers."
      },
      {
        title: "Literary devices",
        body: "The page introduces devices such as tone, genre, satire, point of view, metaphor, and simile. Use them as tools to analyse how a poem creates meaning."
      }
    ],
    tip: "Point of view matters here because the object speaks like a person."
  },
  13: {
    title: "Reading C: Maestro with a Mission",
    subtitle: "Vempati Chinna Satyam and Kuchipudi",
    gallery: [
      { emoji: "💃", label: "Kuchipudi" },
      { emoji: "🎭", label: "Dance drama" },
      { emoji: "🚶", label: "Journey" },
      { emoji: "🏛️", label: "Classical art" }
    ],
    sections: [
      {
        title: "Opening situation",
        body: "The reading begins with a young man leaving home with very little money but a powerful dream: to raise the status of the Kuchipudi dance form."
      },
      {
        title: "Art form background",
        body: "Kuchipudi began in the village of the same name. The text explains how it moved from temple and street performance toward wider classical recognition."
      },
      {
        title: "Early transformation",
        body: "Earlier, men performed many roles, including female roles. Later gurus enriched the form and opened space for women to perform different roles too."
      }
    ],
    tip: "A biographical profile often begins with a striking incident that reveals the person's purpose."
  },
  14: {
    title: "Hardship and Training",
    subtitle: "From insult to determination",
    sections: [
      {
        title: "Challenges",
        body: "Satyam faces humiliation, poverty, family responsibility, and uncertainty. These hardships make his commitment to Kuchipudi more remarkable."
      },
      {
        title: "Teachers and inspiration",
        body: "He learns from respected gurus and develops serious interest in the difficult aspects of the style. Their encouragement helps him continue."
      },
      {
        title: "Film connection",
        body: "He also contributes to Telugu cinema as a dance director, but his larger aim remains the revival and popularisation of Kuchipudi."
      }
    ],
    tip: "When writing about a life, connect difficulty with the choice or value it reveals."
  },
  15: {
    title: "Kuchipudi Art Academy",
    subtitle: "Work, recognition, and influence",
    sections: [
      {
        title: "Institution building",
        body: "Vempati Chinna Satyam establishes Kuchipudi Art Academy in Madras in 1963 to train dancers and spread the art form."
      },
      {
        title: "Major contributions",
        body: "He composes and choreographs many solo items and dance dramas. His works travel widely and bring recognition to Kuchipudi."
      },
      {
        title: "Communication",
        body: "The text highlights his ability to communicate fine details of dance to both experts and ordinary viewers."
      }
    ],
    tip: "A maestro is not only a performer; a maestro teaches, shapes, and preserves an art."
  },
  16: {
    title: "Awards and Legacy",
    subtitle: "Why he is called a maestro",
    sections: [
      {
        title: "Honours",
        body: "The profile lists several awards and honours, including national recognition, university honours, and cultural fellowships."
      },
      {
        title: "Disciples",
        body: "His students include well-known dancers and performers. Their pride in learning from him shows the strength of his influence."
      },
      {
        title: "Central idea",
        body: "The reading presents Dr. Vempati as a central inspiration in the rise of Kuchipudi as a respected classical dance form in modern India."
      }
    ],
    tip: "In a profile, awards are supporting details; the main idea is the person's lasting contribution."
  },
  17: {
    title: "Reading C Review",
    subtitle: "Glossary and comprehension",
    sections: [
      {
        title: "Glossary focus",
        body: "Use these words and expressions to discuss Dr. Vempati's life and work.",
        items: ["passion", "choreography", "ardent", "oblivion", "carve a niche", "reverent", "nuance", "connoisseur", "coveted", "stupendous"]
      },
      {
        title: "Comprehension",
        body: "Answer questions about whether Satyam succeeded, why he kept silent before the station master, how his departure helped Kuchipudi, and why the title Dr. Vempati is appropriate."
      },
      {
        title: "Evidence practice",
        body: "For each answer, support your view with one event, achievement, or quality from the profile."
      }
    ],
    tip: "Opinion questions are stronger when they include evidence from the text."
  },
  18: {
    title: "Biographical Sketch",
    subtitle: "Writing about S. P. Balasubrahmanyam",
    sections: [
      {
        title: "Writing task",
        body: "Use the given details about S. P. Balasubrahmanyam to prepare a biographical sketch in connected paragraphs."
      },
      {
        title: "Details to organise",
        body: "Group the notes into birth, education, entry into films, achievements, other roles, and awards."
      },
      {
        title: "Listening task",
        body: "Listen to the news bulletin and answer questions about the highlights, the art and culture policy programme, and benefits for weavers."
      }
    ],
    tip: "A biographical sketch should sound like a paragraph, not a copied list of facts."
  },
  19: {
    title: "Study Skills and Project Work",
    subtitle: "Tree diagrams and artist interviews",
    sections: [
      {
        title: "Tree diagram",
        body: "The study skill shows how information about dance forms can be converted into a tree diagram. Students then organise musical instruments in the same way."
      },
      {
        title: "Instrument groups",
        body: "Classify instruments by type, such as wind, stringed, and percussion, then place examples under each branch."
      },
      {
        title: "Project work",
        body: "Interview a local performing artist such as a singer, dancer, or craftsperson. Collect details about birthplace, teacher, reasons for choosing the art, support, financial status, and message."
      }
    ],
    tip: "A tree diagram helps turn a paragraph into a quick visual memory map."
  },
  20: {
    title: "Self Assessment and Email Writing",
    subtitle: "Unit reflection and digital communication",
    sections: [
      {
        title: "Self assessment",
        body: "Review whether you understood the three readings, vocabulary work, reported speech, editing, study skills, listening, and project work."
      },
      {
        title: "Email writing",
        body: "The reference note explains that email is a way to send digital messages. It identifies fields such as to, subject, message, attachment, and send."
      },
      {
        title: "Practice",
        body: "Draft a short email inviting a friend to a school cultural programme. Include recipient, subject, greeting, message, closing, and sender name."
      }
    ],
    tip: "A clear email has a useful subject line and a message that is polite, brief, and complete."
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
