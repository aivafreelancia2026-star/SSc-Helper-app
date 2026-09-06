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
    title: "Unit 8: Gratitude",
    subtitle: "Unit 8 overview",
    gallery: [
      { emoji: "🙏", label: "Thankfulness" },
      { emoji: "🌼", label: "Giving" },
      { emoji: "💖", label: "Gratitude" }
    ],
    sections: [
      {
        title: "Readings in this unit",
        body: "This unit focuses on thankfulness, selfless service, and honoring those who have helped us and others.",
        items: ["Reading A: Dr. Dwarakanath Kotnis", "Reading B: Be Thankful (Poem)", "Reading C: The Dead Rat"]
      },
      {
        title: "Theme preview",
        body: "Students will explore stories of self-sacrifice for humanity, finding gratitude even in hardships, and how cleverness and respect can turn small opportunities into great success."
      }
    ],
    tip: "Gratitude is more than saying 'thank you'; it's about recognizing the value of others in our lives."
  },
  2: {
    title: "Look and Discuss",
    subtitle: "Mother Teresa and service",
    gallery: [
      { emoji: "🕊️", label: "Peace" },
      { emoji: "🌍", label: "Humanity" },
      { emoji: "🤝", label: "Service" }
    ],
    sections: [
      {
        title: "Picture discussion",
        body: "The page shows Mother Teresa receiving the 1979 Nobel Peace Prize.",
        items: ["Why do you think Mother Teresa was awarded the Nobel Peace Prize?", "Do you know any Indian who served in another country and is still honoured there?"]
      },
      {
        title: "Oral Discourse",
        body: "Talk on: 'Mention different ways to express our gratitude towards the people who serve the society.'"
      }
    ],
    tip: "Think of practical ways we can show respect to frontline workers and volunteers today."
  },
  3: {
    title: "Reading A: Dr. Dwarakanath Kotnis",
    subtitle: "A doctor's selfless mission",
    gallery: [
      { emoji: "🩺", label: "Doctor" },
      { emoji: "🇮🇳", label: "India" },
      { emoji: "🇨🇳", label: "China" }
    ],
    sections: [
      {
        title: "A hero in China",
        body: "Dr. Dwarakanath Kotnis enjoys immense adulation and respect in China for his selfless service as a battlefront doctor during the Second Sino-Japanese War."
      },
      {
        title: "Early life and mission",
        body: "Born in 1910 in Sholapur, Maharashtra, he dreamt of becoming a doctor. In 1937, after a request from General Zhu De to Jawaharlal Nehru, Netaji Subhash Chandra Bose sent a medical team of five doctors, including Dr. Kotnis, to China."
      },
      {
        title: "Staying back",
        body: "After the war, all other doctors returned to India except Dr. Kotnis, who decided to stay back and serve at the military base in North China."
      }
    ],
    tip: "Dr. Kotnis put his duty as a doctor and human being above his personal comfort."
  },
  4: {
    title: "Service and Sacrifice",
    subtitle: "Life in China",
    sections: [
      {
        title: "Marriage and work",
        body: "He met Guo Qinglan, a Chinese nurse, and they married in 1941, naming their son 'Yin Hua' (India-China). He served as the first president of the Bethune International Peace Hospital."
      },
      {
        title: "Tireless dedication",
        body: "During a battle in 1940, Dr. Kotnis performed operations for 72 hours non-stop and his team did 50 operations daily for a fortnight. He also helped control a plague."
      },
      {
        title: "Passing away and legacy",
        body: "The severe stresses of frontline military life took a toll on him, and he died of epilepsy in 1942 at just 32 years old. He was buried in the Heroes Courtyard, Nanquan Village. Both India and China have honoured him with stamps."
      }
    ],
    tip: "Notice how 'Yin Hua' combines the identities of both his homeland and his adopted home."
  },
  5: {
    title: "Honoured Memories",
    subtitle: "A legacy of friendship",
    sections: [
      {
        title: "A lasting bond",
        body: "His family maintained deep ties with China. His wife, Mrs. Kotnis, lived a long life and was a regular honoured guest at many high-level diplomatic functions between China and India."
      },
      {
        title: "Tragic losses",
        body: "Dr. Kotnis's son, Yin Hua, tragically passed away when he was just 25. Despite this, Mrs. Kotnis maintained her connection with India, visiting frequently."
      },
      {
        title: "Veneration in China",
        body: "In China, textbooks recount his story to children, and a Beijing hospital even created a medical team in his memory."
      }
    ],
    tip: "Dr. Kotnis became a bridge of friendship between two massive nations."
  },
  6: {
    title: "An Unknown Hero at Home",
    subtitle: "Dr. Kotnis Ki Amar Kahani",
    gallery: [
      { emoji: "🎬", label: "Cinema" },
      { emoji: "📖", label: "Biography" }
    ],
    sections: [
      {
        title: "Forgotten in India?",
        body: "While he is a hero in China, few in his birth country knew about him. His sister Vatsala noted this contrast."
      },
      {
        title: "Bringing his story to light",
        body: "He became famous in his hometown after the publication of his biography 'One Who Never Returned' in 1945 and the classic 1946 Bollywood movie 'Dr. Kotnis Ki Amar Kahani', directed by V. Shantaram."
      },
      {
        title: "Symbol of ties",
        body: "Today, he remains an evergreen symbol of the human relationship between the people of India and China, known widely thanks to the movie and comic books."
      }
    ],
    tip: "Art and literature (like films and biographies) play a huge role in preserving history."
  },
  7: {
    title: "Reviewing Dr. Kotnis",
    subtitle: "Glossary and comprehension",
    sections: [
      {
        title: "Glossary focus",
        body: "Use these words to better understand the text.",
        items: ["adulation", "vivacious", "virulent", "shy away", "epilepsy", "revered", "commemorate", "venerated", "septuagenarian", "memorabilia"]
      },
      {
        title: "Comprehension questions",
        body: "Answer questions about why Dr. Kotnis went to China, his contributions there, his decision to stay, and how the Chinese show their gratitude."
      },
      {
        title: "Biographical details",
        body: "Fill in a form detailing his name, year of birth, place of birth, occupation, nationality, wife's name, positions held, honours given, and date of death."
      }
    ],
    tip: "A biographical profile summarizes the most important facts of a person's life."
  },
  8: {
    title: "Vocabulary: Semantic Mapping",
    subtitle: "Words related to 'doctor'",
    gallery: [
      { emoji: "🏥", label: "Hospital" },
      { emoji: "💉", label: "Treatment" }
    ],
    sections: [
      {
        title: "Word classification",
        body: "Classify words like neurologist, MBBS, syringe, treatment, clinic, ambulance, into categories like profession, specialization, qualification, dress code, tools, place of work, etc."
      },
      {
        title: "Semantic mapping",
        body: "Mapping meanings through words is called semantic mapping. A set of words related in meaning belongs to the same semantic field (e.g., bus, driver, conductor, ticket)."
      },
      {
        title: "Practice",
        body: "Write four words that belong to semantic fields like 'space', 'business', 'occupation', and 'travel'."
      }
    ],
    tip: "Creating a semantic map helps you learn and remember groups of related vocabulary."
  },
  9: {
    title: "Idioms and Grammar",
    subtitle: "Expressions with 'heart' and conjunctions",
    sections: [
      {
        title: "Heart expressions",
        body: "Learn what 'lose heart' and 'eat your heart out' mean. Match expressions like 'have a heart', 'broken heart', 'heavy heart', and 'heart of stone' with their meanings."
      },
      {
        title: "Coordinating Conjunctions",
        body: "Conjunctions that join parts of a sentence that are equal in importance (and, but, or, yet, so)."
      },
      {
        title: "Subordinating Conjunctions",
        body: "Words that join a dependent clause to a main clause (when, before, after, since, while, as, till, if, though, because, etc.)."
      }
    ],
    tip: "FANBOYS is a common way to remember coordinating conjunctions: For, And, Nor, But, Or, Yet, So."
  },
  10: {
    title: "Sentences and Clauses",
    subtitle: "Compound and complex sentences",
    sections: [
      {
        title: "Compound sentences",
        body: "A sentence consisting of two or more main clauses combined with coordinate conjunctions (e.g., Dr. Kotnis was a doctor and Guo was a nurse)."
      },
      {
        title: "Complex sentences",
        body: "A sentence consisting of one main clause and one or more subordinate clauses (e.g., I could not stop laughing when he told jokes)."
      },
      {
        title: "Editing task",
        body: "Read a passage about Tenali Rama Krishna and identify errors in grammar, verb forms, and word choices."
      }
    ],
    tip: "A main clause can stand alone as a complete sentence; a subordinate clause cannot."
  },
  11: {
    title: "Writing: Headlines",
    subtitle: "Developing news headlines",
    gallery: [
      { emoji: "📰", label: "News" },
      { emoji: "🗞️", label: "Headlines" }
    ],
    sections: [
      {
        title: "Rules for headlines",
        body: "A headline is the critical first impression. They often contain noun phrases with no verbs, drop auxiliary verbs and articles, use simple tenses, and omit full-stops."
      },
      {
        title: "Examples",
        body: "Observe examples like 'Prime Minister's advice' or 'Andhra Pradesh State Board Examination results declared'."
      },
      {
        title: "Practice task",
        body: "Write a headline for a news report about the alarming rise in missing people and police stepping up tracing measures in Hyderabad."
      }
    ],
    tip: "Good headlines are short, punchy, and tell you exactly what the main idea is."
  },
  12: {
    title: "News and Discussion",
    subtitle: "Headlines and Old Age Homes",
    sections: [
      {
        title: "More headlines",
        body: "Write headlines for paragraphs about a 'Blue Moon' rising, and a new technology that charges cell phones using body heat."
      },
      {
        title: "Look at the picture",
        body: "A picture shows students visiting and serving in an old age home, interacting with the elderly residents."
      },
      {
        title: "Discussion points",
        body: "Discuss why old people go to old age homes, the conditions that force them there, and how those conditions differ from living at home."
      }
    ],
    tip: "When discussing sensitive topics, try to show empathy and understand different perspectives."
  },
  13: {
    title: "Article and Oral Activity",
    subtitle: "Writing and expressing thanks",
    sections: [
      {
        title: "Article writing",
        body: "Write an article based on hints about old age homes: what they are, why people go there, their facilities, and a comparison with home facilities."
      },
      {
        title: "Listening task",
        body: "Listen to an announcement by a Headmaster about a mission and answer questions regarding the special guests and what students are asked to do."
      },
      {
        title: "Vote of Thanks",
        body: "Prepare a 'Vote of Thanks' for an Enrolment Drive Programme. Include an introduction, thank the participants and guests for their service, and request future extensions of their service."
      }
    ],
    tip: "A Vote of Thanks is a formal way to express public gratitude at the end of an event."
  },
  14: {
    title: "Reading B: Be Thankful",
    subtitle: "Finding gratitude in everything",
    gallery: [
      { emoji: "📜", label: "Poetry" },
      { emoji: "🌅", label: "Optimism" },
      { emoji: "💪", label: "Strength" }
    ],
    sections: [
      {
        title: "A different perspective",
        body: "The poem encourages us to be thankful even for things we usually complain about: not knowing something, difficult times, limitations, mistakes, and being tired."
      },
      {
        title: "Growth through adversity",
        body: "Mistakes teach valuable lessons. Difficulties help you grow. Troubles can become blessings if you find a way to be thankful for them."
      },
      {
        title: "Comprehension",
        body: "Identify the different situations the poet depicts where we need to be thankful, and discuss whether you agree with the poet's ideas."
      }
    ],
    tip: "Gratitude can turn a negative situation into a positive one by changing how you view it."
  },
  15: {
    title: "Reading C: The Dead Rat",
    subtitle: "A story of cleverness",
    gallery: [
      { emoji: "🐀", label: "Rat" },
      { emoji: "💰", label: "Merchant" }
    ],
    sections: [
      {
        title: "Madananka the vagabond",
        body: "In Ujjain, a young merchant named Madananka became a vagabond. He abandoned his pregnant wife and mother. His wife gave birth to a son, Ratnanka."
      },
      {
        title: "A grandmother's advice",
        body: "Ratnanka's grandmother tells him they have no money left and advises him to visit a wealthy, generous merchant named Yakshadatta to borrow money to start a business."
      },
      {
        title: "The strange capital",
        body: "Yakshadatta laughs at Ratnanka's request and sarcastically offers him a dead rat lying in the street as 'capital', saying an intelligent man can fetch millions with it."
      }
    ],
    tip: "In folk tales, a seemingly worthless object often becomes the key to great fortune."
  },
  16: {
    title: "Trading Up",
    subtitle: "From a rat to gold coins",
    sections: [
      {
        title: "The first trade",
        body: "Ratnanka takes the dead rat and sells it to a merchant trying to tame a cat, receiving a handful of bengalgram in return."
      },
      {
        title: "Serving the woodcutters",
        body: "He soaks the gram, offers it and cold water to thirsty woodcutters in the forest, and receives firewood in return. He sells the firewood for two rupees."
      },
      {
        title: "Expanding the business",
        body: "He reinvests the money to buy more bengalgram and repeats the process. Eventually, due to incessant rains, there's a scarcity of firewood, and he sells his large stock for a hundred gold coins."
      }
    ],
    tip: "Ratnanka's success came from spotting a need (thirsty woodcutters) and providing a service."
  },
  17: {
    title: "The Golden Rat",
    subtitle: "Repaying a debt with gratitude",
    sections: [
      {
        title: "A leading merchant",
        body: "With his gold coins, Ratnanka opens a firewood stall, then deals in timber, cloth, grain, and diamonds, rapidly becoming a millionaire."
      },
      {
        title: "A grand procession",
        body: "He has a rat made of solid gold, with ruby eyes and a diamond chain, and carries it in a grand procession to Yakshadatta's house."
      },
      {
        title: "Expressing thanks",
        body: "Ratnanka presents the golden rat to Yakshadatta to repay his debt, acknowledging that the dead rat and Yakshadatta's wise words were the capital that made him rich."
      }
    ],
    tip: "Ratnanka's grand gesture shows that true gratitude never forgets where success started."
  },
  18: {
    title: "Reviewing The Dead Rat",
    subtitle: "Glossary, Comprehension, Study Skills",
    sections: [
      {
        title: "Glossary focus",
        body: "Review words like vagabond, abscond, stroll, generosity, eke out, menace, and incessant."
      },
      {
        title: "Comprehension questions",
        body: "Discuss Ratnanka's cleverness, how he traded firewood for gold, and how he showed his profound gratitude to Yakshadatta."
      },
      {
        title: "Study Skills",
        body: "Read the biographical write-up on Dr. Kotnis again and construct a timeline of his life events (e.g., 1910 - Born, 1976 - Memorial hall built)."
      }
    ],
    tip: "A timeline organizes historical events in chronological (time) order."
  },
  19: {
    title: "Unit 8 Wrap-up",
    subtitle: "Project work and Self Assessment",
    gallery: [
      { emoji: "📋", label: "Project" },
      { emoji: "✅", label: "Checklist" }
    ],
    sections: [
      {
        title: "Project work",
        body: "Visit any five old people in your locality and interview them using a questionnaire covering their name, age, gender, social background, who takes care of them, health conditions, and support needed. Present a report."
      },
      {
        title: "Self Assessment",
        body: "Review your understanding of the unit. Can you understand the readings, use semantic mapping, identify conjunctions, write news headlines, write an article, and prepare a vote of thanks?"
      }
    ],
    tip: "Projects connect the lessons you learn in the textbook with the real world around you."
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} page summary carefully.`,
    `Complete one response from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one new idea you learned from this page."
  ];
}

export function C8EnglishChapter8Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-blue-200 bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Class 8 English - Unit 8</p>
        <h1 className="font-heading text-2xl font-bold text-blue-950">{content.title}</h1>
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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-ch8-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
