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
  },
  3: {
    title: "Reading A: The Fun They Had",
    subtitle: "A real book in the future",
    sections: [
      {
        title: "Story opening",
        body: "Margie writes in her diary that Tommy has found a real printed book. To children used to screens, paper pages feel strange and old-fashioned."
      },
      {
        title: "Compare",
        body: "Notice how the children compare a printed book with telebooks on a screen.",
        items: [
          "What surprises Margie and Tommy about the old book?",
          "Why does Tommy think throwing away a paper book is wasteful?",
          "What does Margie's reaction to the word school tell us about her feelings?"
        ]
      }
    ],
    tip: "Science fiction often makes ordinary things look unusual by placing them in a future world."
  },
  4: {
    title: "Margie's Mechanical Teacher",
    subtitle: "Learning through machines",
    gallery: [
      { emoji: "🖥️", label: "Screen lessons" },
      { emoji: "🤖", label: "Mechanical teacher" },
      { emoji: "📝", label: "Tests" },
      { emoji: "🔧", label: "Inspector" }
    ],
    sections: [
      {
        title: "What happens",
        body: "Margie's mechanical teacher keeps giving her tests in geography, and her performance gets worse. Her mother calls the County Inspector to repair the machine."
      },
      {
        title: "Think about learning",
        body: "The scene raises questions about machines, testing, and how students feel when technology controls learning.",
        items: [
          "Why is Margie unhappy with school?",
          "What role does the County Inspector play?",
          "How does the illustration show a technology-based classroom?"
        ]
      }
    ],
    tip: "A futuristic setting can still show familiar feelings like frustration, pressure, and curiosity."
  },
  5: {
    title: "Old School, New School",
    subtitle: "A conversation about teachers",
    sections: [
      {
        title: "Tommy explains",
        body: "Tommy tells Margie that old schools had human teachers and special buildings where children learned together. Margie finds this difficult to imagine."
      },
      {
        title: "Discussion prompts",
        body: "Use Tommy and Margie's conversation to compare two models of education.",
        items: [
          "How is Margie's school different from the old kind of school?",
          "Why does Tommy speak as if he knows more about the past?",
          "What advantages might a human teacher have?",
          "What advantages might a mechanical teacher have?"
        ]
      }
    ],
    tip: "Comparison answers are clearer when you use two columns: future school and old school."
  },
  6: {
    title: "The Fun They Had Ends",
    subtitle: "Margie imagines old schools",
    sections: [
      {
        title: "Story close",
        body: "Margie returns to her schoolroom, but her mind stays with the old book. She imagines children learning together, helping one another, and enjoying a shared school day."
      },
      {
        title: "Reflect",
        body: "Answer these after reading the ending.",
        items: [
          "Why does Margie want to continue reading the old book?",
          "How is her home school different from the school she imagines?",
          "Why is the title The Fun They Had meaningful?"
        ]
      }
    ],
    tip: "The ending contrasts efficient machine learning with the warmth of learning together."
  },
  7: {
    title: "About Isaac Asimov",
    subtitle: "Author note and glossary",
    sections: [
      {
        title: "Author note",
        body: "Isaac Asimov was an American writer famous for science fiction. His stories often use future settings to ask thoughtful questions about people, machines, and society."
      },
      {
        title: "Glossary focus",
        body: "Use these words to discuss the story clearly.",
        items: ["crinkly", "telebooks", "attic", "scornful", "slot", "disappointed", "geared", "loftily", "regular teacher", "nonchalantly", "mechanical"]
      },
      {
        title: "Comprehension begins",
        body: "Start with factual answers: what Margie wrote in her diary and what she found strange about the old book."
      }
    ],
    tip: "Science-fiction vocabulary often mixes ordinary words with imagined technology."
  },
  8: {
    title: "Comprehension and Vocabulary",
    subtitle: "Reviewing Reading A",
    sections: [
      {
        title: "Comprehension",
        body: "Answer in complete sentences, using the story's contrast between the future classroom and the old school.",
        items: [
          "Why was Margie disappointed?",
          "Why did she think the old school must have been fun?",
          "Do you agree that the old school was better than the future school? Give reasons.",
          "What kind of school would you like after thirty years?",
          "What does the expression about teachers being people suggest?"
        ]
      },
      {
        title: "Fill in the blanks",
        body: "Practise using words such as slots, loftily, dispute, screamed, and scornful in suitable contexts."
      },
      {
        title: "Opposites",
        body: "Find opposites from the story for words such as serious, scarce, idle, agree, create, and knowingly."
      }
    ],
    tip: "Vocabulary practice is strongest when you reuse the word in a new sentence of your own."
  },
  9: {
    title: "Adjective Order",
    subtitle: "Size, shape, and noun description",
    sections: [
      {
        title: "Grammar idea",
        body: "When more than one adjective comes before a noun, English usually keeps a natural order. The lesson focuses on adjectives of size and shape."
      },
      {
        title: "Practice",
        body: "Choose two adjectives of size and shape and place them before each noun.",
        items: ["table", "pencil", "room", "chapathi", "cat"]
      }
    ],
    tip: "Try saying the phrase aloud. Natural adjective order often sounds smoother."
  },
  10: {
    title: "Adverbs of Manner",
    subtitle: "How an action is done",
    sections: [
      {
        title: "Grammar idea",
        body: "Adverbs of manner tell how an action is performed. In the story, words such as carefully and loftily describe the way someone speaks or acts."
      },
      {
        title: "Practice",
        body: "Pick verbs and adverbs from the story or elsewhere, then use them in original sentences.",
        items: ["speak politely", "walk slowly", "read carefully", "answer quickly", "listen patiently"]
      },
      {
        title: "Fill in the blanks",
        body: "Use adverbs such as nonchalantly, quickly, completely, sorrowfully, awfully, carefully, and differently where they fit best."
      }
    ],
    tip: "Most manner adverbs answer the question how?"
  },
  11: {
    title: "Relative Clauses",
    subtitle: "Adding information about nouns",
    sections: [
      {
        title: "Grammar idea",
        body: "A relative clause gives extra information about a person, place, time, or thing. It often begins with who, where, when, which, or that."
      },
      {
        title: "Underline the clause",
        body: "Identify the relative clause in sentences from the story and notice the noun it describes."
      },
      {
        title: "Combine sentences",
        body: "Join pairs of sentences using where, who, which, or that. Check that the new sentence is clear and not repetitive."
      }
    ],
    tip: "Relative clauses behave like adjectives because they describe or identify nouns."
  },
  12: {
    title: "Editing and Letter Writing",
    subtitle: "Accuracy and future classrooms",
    sections: [
      {
        title: "Editing",
        body: "Read the short passage carefully. Each numbered sentence has one error, so correct tense, preposition, agreement, or word form as needed."
      },
      {
        title: "Letter task",
        body: "Write a reply imagining classrooms thirty years from now. Use ideas such as e-library, robot teacher, online evaluation, e-screen, and e-mail."
      },
      {
        title: "Writing checklist",
        body: "Include place, date, greeting, body, closing, and signature. Keep the reply friendly and organised."
      }
    ],
    tip: "In a reply letter, answer the friend's idea first, then add your own imagination."
  },
  13: {
    title: "Listening and Study Skills",
    subtitle: "Space message and school posters",
    sections: [
      {
        title: "Listening task",
        body: "Listen to a message from Sunita Williams and answer questions about its topic, place, occasion, family influence, and the role of the Upanishads."
      },
      {
        title: "Study skills",
        body: "Read school posters carefully and identify information such as school name, location, facilities, values, and target audience."
      }
    ],
    tip: "Poster reading means scanning for headings, features, address, and purpose."
  },
  14: {
    title: "Comparing School Posters",
    subtitle: "Choosing with reasons",
    sections: [
      {
        title: "Poster comparison",
        body: "Compare two schools by looking at their facilities, values, activities, and learning promises. Decide which one suits your aspiration."
      },
      {
        title: "Opinion writing",
        body: "Write which school you would like to join and why. Support your choice with two or three details from the posters."
      },
      {
        title: "Multiple intelligences",
        body: "The page introduces different kinds of intelligence: linguistic, logical, spatial, bodily, musical, interpersonal, intrapersonal, naturalistic, and spiritual."
      }
    ],
    tip: "A good opinion paragraph gives a choice, reasons, and a closing sentence."
  },
  15: {
    title: "Reading B: Preteen Pretext",
    subtitle: "Poem about phones and family",
    gallery: [
      { emoji: "📱", label: "Phone" },
      { emoji: "💬", label: "Messages" },
      { emoji: "👩‍👧", label: "Parent and child" },
      { emoji: "🏠", label: "Home" }
    ],
    sections: [
      {
        title: "Poem overview",
        body: "The poem looks at a preteen's phone use from a parent's point of view. It shows both the convenience of technology and the worry that real conversation may reduce."
      },
      {
        title: "Key ideas",
        body: "Track the mixed feelings in the poem.",
        items: [
          "The phone keeps the child connected.",
          "Messages and calls make family routines easier.",
          "The parent still wonders whether face-to-face talk is being lost."
        ]
      },
      {
        title: "Image stand-in",
        body: "A phone and a home scene represent digital contact inside family life."
      }
    ],
    tip: "When studying a poem, notice the speaker's attitude as much as the subject."
  },
  16: {
    title: "Preteen Pretext Review",
    subtitle: "Glossary and comprehension",
    sections: [
      {
        title: "Glossary focus",
        body: "Use the poem's vocabulary to talk about phone habits, family routines, and feelings.",
        items: ["jitters", "emitting", "bluish", "grin", "elevate", "pile", "exhale", "chores", "alibis", "tether", "grandiose"]
      },
      {
        title: "Comprehension",
        body: "Answer these questions without copying the poem.",
        items: [
          "Who is likely to be the speaker of the poem?",
          "What attitude is shown near the beginning of the poem?",
          "How are cell phones useful according to the poem?",
          "What does the final question make us think about?"
        ]
      },
      {
        title: "Life link",
        body: "Discuss how speaking to parents, friends, and teachers can help us share thoughts, feelings, and problems."
      }
    ],
    tip: "A poem can praise a thing and question it at the same time."
  },
  17: {
    title: "Reading C: The Computer Game",
    subtitle: "A quiz show play",
    sections: [
      {
        title: "Drama setup",
        body: "The play is set in a television studio. A human contestant competes against a computer named MT2 in a game show."
      },
      {
        title: "Characters",
        body: "Identify each role and predict how the contest may create humour.",
        items: ["Gary Lopez: host", "Joan Robinson: human player", "MT2: computer player", "Noisemakers: buzz-in signals", "Audience children: supporters"]
      },
      {
        title: "Opening conflict",
        body: "The computer begins strongly because it can calculate and recall precise information very quickly."
      }
    ],
    gallery: [
      { emoji: "🎙️", label: "Game host" },
      { emoji: "🤖", label: "Computer contestant" },
      { emoji: "🏆", label: "Quiz contest" }
    ],
    tip: "In a play, stage directions and tone tell us how the scene should feel."
  },
  18: {
    title: "Beating the Computer",
    subtitle: "Thinking beyond programmed forms",
    sections: [
      {
        title: "Turning point",
        body: "Joan realises that the computer may fail when a question is not asked in the exact form it expects. A child helps by asking in a command-like way."
      },
      {
        title: "Discuss",
        body: "Use the scene to compare human flexibility with machine programming.",
        items: [
          "Why does the computer fail to follow the question?",
          "How does Joan use intelligence differently from MT2?",
          "What makes the scene funny?",
          "What does the play suggest about depending only on machines?"
        ]
      }
    ],
    tip: "Human intelligence includes creativity, context, and quick adaptation."
  },
  19: {
    title: "The Computer Game Activities",
    subtitle: "Comprehension and dialogue writing",
    sections: [
      {
        title: "Comprehension",
        body: "Answer the textbook questions about the quiz master, the winner, the boy's support, the computer's failure, and your own possible question."
      },
      {
        title: "Writing",
        body: "Imagine that you own a robot that starts doing something different from your command. Create a funny dialogue between you and the robot."
      },
      {
        title: "Performance",
        body: "Use short lines, clear stage actions, and expressive voice changes when presenting the dialogue."
      }
    ],
    tip: "Funny dialogue often comes from a mismatch between what someone says and what someone understands."
  },
  20: {
    title: "Unit 4 Wrap-up",
    subtitle: "Project work and self-assessment",
    sections: [
      {
        title: "Mobile comparison project",
        body: "Compare four mobile phones by features such as screen size, battery, keyboard, camera, sound, price, and internet support. Choose one and explain why."
      },
      {
        title: "Self-assessment",
        body: "Review whether you understood the readings, vocabulary, relative clauses, reply letter, school posters, listening task, and project work."
      },
      {
        title: "Unit reflection",
        body: "Write a short paragraph on how technology can help people while still needing wise human use."
      }
    ],
    tip: "When comparing products, choose according to need, not only according to the longest feature list."
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} page summary carefully.`,
    `Complete one response from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one new idea you learned from this page."
  ];
}

export function C8EnglishChapter4Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-ch4-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
