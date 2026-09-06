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
    title: "Women Empowerment",
    subtitle: "Unit 7 overview",
    gallery: [
      { emoji: "📚", label: "Education" },
      { emoji: "⚖️", label: "Justice" },
      { emoji: "🩺", label: "Service" },
      { emoji: "🏅", label: "Achievement" }
    ],
    sections: [
      {
        title: "Readings in this unit",
        body: "This unit discusses education, independence, self-respect, courage, and the social conditions that shape women's lives.",
        items: ["Reading A: Bonsai Life - Part I", "Reading B: Bonsai Life - Part II", "Reading C: I Can Take Care of Myself"]
      },
      {
        title: "Theme preview",
        body: "Students compare how opportunity changes a person's life and how confidence grows when people are allowed to learn, work, and decide."
      }
    ],
    tip: "Empowerment means having the knowledge, confidence, freedom, and support to make choices."
  },
  2: {
    title: "Look and Discuss",
    subtitle: "What makes a woman empowered?",
    gallery: [
      { emoji: "👩‍🏫", label: "Teacher" },
      { emoji: "👩‍🚀", label: "Astronaut" },
      { emoji: "👩‍⚖️", label: "Lawyer" },
      { emoji: "🎤", label: "Singer" }
    ],
    sections: [
      {
        title: "Picture discussion",
        body: "The unit opener shows women in public service, sports, education, science, music, and other fields. Use the pictures to discuss achievement and social support.",
        items: ["Identify the people or professions shown.", "Share what you know about one woman achiever.", "Explain what qualities and opportunities make a woman empowered."]
      },
      {
        title: "Debate",
        body: "Prepare points for and against the statement that education leads to the empowerment of women."
      }
    ],
    tip: "A strong debate point includes an example, not only an opinion."
  },
  3: {
    title: "Reading A: Bonsai Life - Part I",
    subtitle: "A letter and a visit",
    sections: [
      {
        title: "Opening mood",
        body: "The narrator feels excited whenever letters arrive because they connect her with family. An unexpected letter from her elder sister creates curiosity and slight worry."
      },
      {
        title: "Family visit",
        body: "Akkayya and her husband plan to visit the narrator in the city for the first time after many years. Their arrival becomes a chance to compare two different lives."
      },
      {
        title: "Education contrast",
        body: "The narrator remembers that her sister was not allowed to continue schooling, while she herself benefited from a father whose attitude changed with time."
      }
    ],
    tip: "Notice how a personal letter becomes the entry point into a larger social theme."
  },
  4: {
    title: "Two Sisters, Two Paths",
    subtitle: "Education, work, and dependence",
    sections: [
      {
        title: "Akkayya's life",
        body: "Because Akkayya was not educated, she married into village life and became dependent on her husband for money and decisions."
      },
      {
        title: "Narrator's life",
        body: "The narrator is educated, employed, and financially independent, but she also faces the burden of office work and household expectations."
      },
      {
        title: "Shared concern",
        body: "Akkayya wants her daughter to study further because she knows the limits created by lack of education."
      }
    ],
    tip: "The story avoids a simple contrast: both sisters face difficulties, but education gives the narrator more choices."
  },
  5: {
    title: "Part I Review",
    subtitle: "Glossary and comprehension",
    sections: [
      {
        title: "Glossary focus",
        body: "Use these words to discuss the first part of the story.",
        items: ["exhaustion", "vanish", "mutter", "savour", "elated", "sumptuous", "wretched", "uphill", "dignified"]
      },
      {
        title: "True or false",
        body: "Check statements about the narrator receiving letters, the visitors' arrival, her husband's reaction, Akkayya's interest in studies, and traditional food."
      },
      {
        title: "Comprehension",
        body: "Answer why letters excite the narrator, what changed in her father's attitude, why Akkayya wants her daughter to attend college, and how the narrator is more fortunate."
      }
    ],
    tip: "Open-ended answers should explain cause and effect, not just repeat one sentence."
  },
  6: {
    title: "Reading B: Bonsai Life - Part II",
    subtitle: "The bonsai comparison begins",
    gallery: [
      { emoji: "🌳", label: "Full tree" },
      { emoji: "🪴", label: "Bonsai" },
      { emoji: "🏡", label: "Home" },
      { emoji: "🌧️", label: "Storm" }
    ],
    sections: [
      {
        title: "Past pain",
        body: "Part II explains that Akkayya wanted to study, but her father stopped her education because she was a girl. This decision shaped her adult life."
      },
      {
        title: "Balcony scene",
        body: "When Akkayya sees small trees growing in pots, she feels sorry for them. The narrator explains bonsai as an art, but Akkayya sees confinement."
      },
      {
        title: "Key symbol",
        body: "The bonsai tree becomes a symbol for a life kept small by restrictions."
      }
    ],
    tip: "A symbol is an object that points to a bigger idea."
  },
  7: {
    title: "Storm and Realisation",
    subtitle: "The bonsai metaphor deepens",
    sections: [
      {
        title: "Dust storm",
        body: "A sudden storm makes the narrator bring the bonsai and flowerpots inside. Akkayya notices a full-grown tree outside giving shelter and standing strong."
      },
      {
        title: "Akkayya's insight",
        body: "She compares the delicate bonsai with a restricted woman's life. A full-grown tree, like a free person, can protect others and withstand hardship."
      },
      {
        title: "Narrator's change",
        body: "Akkayya's words touch the narrator, and she feels an urge to free the bonsai trees from their pots."
      }
    ],
    tip: "The turning point occurs when the narrator sees the bonsai through Akkayya's experience."
  },
  8: {
    title: "Author and Vocabulary",
    subtitle: "Abburi Chayadevi and key words",
    sections: [
      {
        title: "About the author",
        body: "Abburi Chayadevi was a feminist writer known for stories and essays that explored women's lives, feelings, and social realities."
      },
      {
        title: "Glossary focus",
        body: "Use these words from Part II to discuss the story's meaning.",
        items: ["adept", "drudgery", "perplex", "nought", "rage", "stunted", "canopy", "respite", "squall"]
      },
      {
        title: "Reason practice",
        body: "Complete statements giving more than one reason: girls should be educated like boys, and fully grown trees are more useful."
      }
    ],
    tip: "Reason statements are clearer when each point begins with because."
  },
  9: {
    title: "Bonsai Life Comprehension",
    subtitle: "Questions and comparison",
    sections: [
      {
        title: "Comprehension",
        body: "Answer why Akkayya was perplexed, how a bonsai is reared, what similarities exist between the bonsai and the housewife, and what made the narrator want to free the bonsai."
      },
      {
        title: "Central theme",
        body: "The story criticises social restrictions that keep women dependent and underdeveloped, while supporting education and freedom."
      },
      {
        title: "Comparison table",
        body: "Make a list of activities done by a homemaker and a working woman. Think about work, care, responsibility, and recognition."
      }
    ],
    tip: "When comparing, avoid treating one role as easy; focus on work, choice, and respect."
  },
  10: {
    title: "Idioms and Phrase Meanings",
    subtitle: "Meaning from context",
    sections: [
      {
        title: "Phrase practice",
        body: "Choose the most suitable meanings for phrases from the story.",
        items: ["keep the washerman's account: manage a simple household account", "uphill task: a difficult job", "grass is greener on the other side: others may seem better placed than us"]
      },
      {
        title: "Context clues",
        body: "The story's phrases carry social meaning. Read the surrounding situation before choosing an answer."
      },
      {
        title: "Reflection",
        body: "Write a short paragraph on how education can change confidence, choices, and dignity."
      }
    ],
    tip: "Idioms often cannot be understood word by word; look for the idea in the whole sentence."
  },
  11: {
    title: "Similes and Idioms",
    subtitle: "Figurative language practice",
    sections: [
      {
        title: "Simile practice",
        body: "The page gives familiar similes and asks students to use them in original sentences.",
        items: ["bright like a full moon", "sleep like a log", "eat like a bird", "beautiful like a rose", "sweet like honey"]
      },
      {
        title: "Idiom building",
        body: "Students combine words from circles to form idioms and then use them in their own sentences."
      },
      {
        title: "Meaning in use",
        body: "The example fish out of water shows that an idiom has a meaning beyond its individual words."
      }
    ],
    tip: "A good figurative sentence should fit the situation naturally, not sound pasted in."
  },
  12: {
    title: "Subject and Predicate",
    subtitle: "Grammar practice",
    sections: [
      {
        title: "Grammar idea",
        body: "Every complete sentence has a subject and a predicate. The subject names who or what the sentence is about; the predicate tells something about the subject."
      },
      {
        title: "Identification practice",
        body: "Students circle subjects and underline predicates in short sentences before applying the same skill to a paragraph from Bonsai Life."
      },
      {
        title: "Paragraph link",
        body: "The exercise reuses the story events: Akkayya's visit, the food she brought, her praise of Ammalu, the bonsai plants, and the lesson about freedom."
      }
    ],
    tip: "Ask who or what first; the rest of the sentence usually gives the predicate."
  },
  13: {
    title: "Poster Writing",
    subtitle: "Handicrafts exhibition task",
    sections: [
      {
        title: "Poster features",
        body: "The model poster announces a handicrafts exhibition-cum-sale and includes the organiser, event, date, time, venue, chief guest, entry fee, and invitation."
      },
      {
        title: "Writing task",
        body: "Students prepare a new poster for a dance performance by Aarthi using the given details."
      },
      {
        title: "Design choices",
        body: "A poster should make important details easy to notice through clear layout, short lines, and strong event information."
      }
    ],
    tip: "Poster writing rewards clarity: who, what, when, where, and why should be visible quickly."
  },
  14: {
    title: "Listening Debate",
    subtitle: "Girl child education",
    sections: [
      {
        title: "Listening focus",
        body: "Students listen to a debate on whether education of the girl child is a burden."
      },
      {
        title: "Table completion",
        body: "The task asks students to record arguments for and against the proposition from different speakers."
      },
      {
        title: "Critical response",
        body: "After listening, students should separate opinion from reason and notice which arguments support equality and empowerment."
      }
    ],
    tip: "During a debate, write down key reasons, not every sentence."
  },
  15: {
    title: "Reading C: I Can Take Care of Myself",
    subtitle: "The search for power",
    gallery: [
      { emoji: "☀️", label: "Sun" },
      { emoji: "🌧️", label: "Rain" },
      { emoji: "⛰️", label: "Mountain" },
      { emoji: "🪱", label: "Earthworm" }
    ],
    sections: [
      {
        title: "Story opening",
        body: "A mother rat wants her daughter to marry the most powerful being she can find. She first asks the sun, then rain, then mountain, and then learns about the earthworm's importance."
      },
      {
        title: "Power chain",
        body: "Each being points to another form of strength. The story shows that power is not only size, brightness, or wealth; usefulness and support also matter."
      },
      {
        title: "Theme connection",
        body: "The reading continues the unit theme by questioning the idea that a girl must depend on someone powerful to be safe."
      }
    ],
    tip: "Folktales often teach by repeating a pattern and changing the lesson at the end."
  },
  16: {
    title: "The Daughter's Answer",
    subtitle: "Independence and inner strength",
    sections: [
      {
        title: "Main lesson",
        body: "The daughter says that the best protection is learning to protect oneself. She wants to become strong, work hard, and support herself and those she loves."
      },
      {
        title: "True power",
        body: "The daughter rejects dependence on another person's power, position, or prosperity. She values the power within oneself."
      },
      {
        title: "Comprehension",
        body: "Students answer what is important for living well, which skills help a person become independent, and whether they agree with the daughter."
      }
    ],
    tip: "When agreeing or disagreeing, include a reason and one example from life or the story."
  },
  17: {
    title: "Study Skills: IMR Data",
    subtitle: "Reading bar diagrams",
    sections: [
      {
        title: "Data reading",
        body: "Students observe bar diagrams showing male and female infant mortality rates in India from 1990 to 2008."
      },
      {
        title: "Questions to answer",
        body: "The questions ask students to compare male and female IMR, identify sudden changes, explain gaps, and think about why IMR decreased over time."
      },
      {
        title: "Analytical report",
        body: "In group work, students discuss the data and write a report on infant mortality rates in India."
      }
    ],
    tip: "For a graph report, mention the trend first, then support it with years and comparisons."
  },
  18: {
    title: "Oral Activity, Project, and Self Assessment",
    subtitle: "Unit 7 wrap-up",
    sections: [
      {
        title: "Oral activity",
        body: "Students debate whether reservation in education, employment, and legislature will empower women. They also discuss statements about truth, obedience, distractions, and advertising."
      },
      {
        title: "Project work",
        body: "Students interview female family or neighbourhood members about education, employment, and opinions on girls taking up jobs, then prepare a report on woman empowerment."
      },
      {
        title: "Self assessment and safety",
        body: "The final page asks students to review their understanding of the unit and includes personal body safety rules about clothing, touching, talking, saying no, going away, and telling a safe adult."
      }
    ],
    tip: "A project report should use interview information respectfully and connect it to the unit theme."
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} page summary carefully.`,
    `Complete one response from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one new idea you learned from this page."
  ];
}

export function C8EnglishChapter7Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-lime-200 bg-lime-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-lime-700">Class 8 English - Unit 7</p>
        <h1 className="font-heading text-2xl font-bold text-lime-950">{content.title}</h1>
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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-ch7-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
