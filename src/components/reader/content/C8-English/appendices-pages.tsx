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
    title: "Texts for Listening - Part 1",
    subtitle: "Appendix I - Units 1 to 3",
    gallery: [
      { emoji: "📻", label: "Radio" },
      { emoji: "👂", label: "Listening" }
    ],
    sections: [
      {
        title: "Unit 1: An Announcement on the Radio",
        body: "A missing person announcement for a thirteen-year-old boy named Prashanth, last seen in blue trousers and a pink T-shirt in Thiruvananthapuram."
      },
      {
        title: "Unit 2: Homeless Child",
        body: "A poignant poem about a pale and thin ten-year-old boy living on the pavements without parents, shoes, or a bed, exposed to child labour and starvation."
      },
      {
        title: "Unit 3: Lal Bagh (Start)",
        body: "A speech about the famous Lal Bagh botanical garden in Bangalore, originally commissioned by Hyder Ali in 1760 and completed by Tipu Sultan."
      }
    ],
    tip: "When listening to announcements, pay attention to specific details like names, locations, and descriptions."
  },
  2: {
    title: "Texts for Listening - Part 2",
    subtitle: "Appendix I - Units 3 to 5",
    gallery: [
      { emoji: "🌺", label: "Garden" },
      { emoji: "🚀", label: "Space" }
    ],
    sections: [
      {
        title: "Unit 3: Lal Bagh (Continued)",
        body: "Details about the garden's 1,000 species of flora, the Glass House modeled on London's Crystal Palace, a 300-year-old Christmas Tree, the Rose Garden, and the giant Electronic Quartz Flower clock."
      },
      {
        title: "Unit 4: Message from Space",
        body: "A Diwali message from astronaut Sunitha Williams sent from the International Space Station, sharing her reflections on reading the Upanishads in space."
      },
      {
        title: "Unit 5: Compering (Start)",
        body: "A script for hosting a Teacher's Day programme, beginning with welcomes, acknowledging Dr. Sarvepalli Radhakrishnan's birth anniversary, and an opening prayer."
      }
    ],
    tip: "Compering (hosting) requires a confident voice and a clear structure to guide the audience through an event."
  },
  3: {
    title: "Texts for Listening - Part 3",
    subtitle: "Appendix I - Units 5 to 6",
    sections: [
      {
        title: "Unit 5: Compering (Continued)",
        body: "The script continues with the host inviting the Chief Guest and Headmaster, announcing a skit, a group dance by class IX, and finally inviting Ms. Aparna to propose a vote of thanks."
      },
      {
        title: "Unit 6: The News",
        body: "An All India Radio news bulletin announcing the Telangana State Government's new art & cultural policy to boost handicrafts and arts like Dimsa, Burrakatha, and Oggukatha."
      },
      {
        title: "News details",
        body: "The news mentions 51 new cultural centres and interest-free loans for handloom weavers in Narayanpet, Pochampalli, Kothakota, Gadwala, and Siricilla."
      }
    ],
    tip: "A news bulletin usually starts with headlines, gives the details, and ends by repeating the main headlines."
  },
  4: {
    title: "Texts for Listening - Part 4",
    subtitle: "Appendix I - Units 7 to 8",
    sections: [
      {
        title: "Unit 7: Debate on Girl Child Education",
        body: "Speaker 1 argues that educating a girl is a financial burden for poor families because she will eventually marry and leave. Speaker 2 counters this, arguing that an educated girl becomes an equal partner, shares responsibilities, and brings a positive attitude change."
      },
      {
        title: "Unit 8: An Announcement in a School",
        body: "An announcement inviting students and teachers of classes VIII and IX to join an 'Enrolment Drive Programme' to find out-of-school children in nearby slums over 3 days."
      }
    ],
    tip: "In a debate, noticing how a speaker responds to their opponent's points (rebuttal) is just as important as their opening argument."
  },
  5: {
    title: "About the Textbook",
    subtitle: "Appendix II - Goals and Outcomes",
    gallery: [
      { emoji: "📖", label: "Textbook" },
      { emoji: "🎯", label: "Goals" }
    ],
    sections: [
      {
        title: "The Goals",
        body: "The textbook aims to help students attain basic proficiency in natural language learning and develop linguistic competence for abstract thought."
      },
      {
        title: "Learning Outcomes",
        body: "Classroom transactions focus on Listening and Speaking, Reading Comprehension, Vocabulary, Grammar, Conventions of Writing, and Creative Expression."
      },
      {
        title: "Features of the Textbook",
        body: "Units are thematically organized with passages for listening and reading, and integrate listening, speaking, reading, and writing skills."
      }
    ],
    tip: "Understanding the goals of a textbook helps you know what skills you are actually practicing in each exercise."
  },
  6: {
    title: "Components of a Unit",
    subtitle: "Appendix II - Structure of lessons",
    sections: [
      {
        title: "Face Sheet & Reading",
        body: "Each unit starts with a Trigger (picture/quotation) to generate genuine interest. This is followed by three reading texts (A, B, C) of different genres like stories, interviews, and essays."
      },
      {
        title: "Vocabulary and Grammar",
        body: "These sections contain contextually designed exercises to explore language, find synonyms, use idioms, and identify grammatical errors."
      },
      {
        title: "Writing, Study Skills & Listening",
        body: "Tasks involve writing narratives, letters, and essays. Study skills improve interpreting non-verbal data like pie charts and dictionaries. Listening exercises improve speaking and listening competencies."
      }
    ],
    tip: "Language isn't just rules; the textbook uses stories, poems, and charts to teach English in real-life contexts."
  },
  7: {
    title: "Activities and Assessment",
    subtitle: "Appendix II - Formative Assessment",
    sections: [
      {
        title: "Oral Activity & Project",
        body: "Units contain oral discourses (debates, speeches) and projects that require students to find resources, analyze data, and present findings."
      },
      {
        title: "The Assessment",
        body: "Assessment is continuous and comprehensive (CCE), evaluating individuals, peers, and groups to compare strengths and modify learning without rote memorization."
      },
      {
        title: "Formative Assessment Guidelines",
        body: "Formative assessment is based on 4 tools (20 marks total): 1. Read and Reflect, 2. Written Works, 3. Project Work, and 4. Slip Test."
      }
    ],
    tip: "Continuous Comprehensive Evaluation (CCE) means you are graded on your overall understanding and participation throughout the year, not just one final exam."
  },
  8: {
    title: "Assessment Details",
    subtitle: "Appendix II - Summative Assessment",
    sections: [
      {
        title: "Formative Details",
        body: "Read and Reflect evaluates reading beyond the textbook. Written Works checks well-formed sentences. Projects evaluate planning, execution, and presentation. Slip Tests are unannounced tests on targeted discourses."
      },
      {
        title: "Summative Assessment",
        body: "A 100-mark test at the end of every term (20 marks from Formative, 80 from Written). It evaluates Oral performance (10), Reading comprehension (25), Vocabulary and grammar (20), Conventions of writing (5), and Creative writing (20)."
      }
    ],
    tip: "Notice that reading comprehension and creative writing hold the most weight in your summative written test."
  },
  9: {
    title: "Discourses and Indicators - Part 1",
    subtitle: "Appendix II - Targeted writing styles",
    sections: [
      {
        title: "Major and Minor Discourses",
        body: "Major discourses include Stories, Conversations, Biographies, Essays, and Letters. Minor discourses include Messages, Notices, Diaries, Profiles, and Posters."
      },
      {
        title: "Conversations & Descriptions",
        body: "Conversations need 10-12 exchanges with proper sequence and social norms. Descriptions need vivid images, variety in sentence forms, and cohesive devices."
      },
      {
        title: "Narrative & Letters",
        body: "Narratives need a sequence of events, sensory details, and characterization. Letters need appropriate format, layout, conventions, and language suited to the context."
      }
    ],
    tip: "A 'discourse' is just a formal word for a specific type of communication, like a letter or a speech."
  },
  10: {
    title: "Discourses and Indicators - Part 2",
    subtitle: "Appendix II - More writing styles",
    sections: [
      {
        title: "Performances",
        body: "Drama/Skit requires stage directions, dramatic conflict, and reference to costumes. Choreography involves identifying themes, actions for the chorus, and proper script layout. Compeering needs sequential arrangement and polite expressions."
      },
      {
        title: "Speeches & Debates",
        body: "Speeches need argumentative/persuasive language and voice modulation. Debates require presenting arguments in order, citing evidence, and rebutting opponents respectfully."
      },
      {
        title: "News Reports & Reviews",
        body: "News reports need appropriate headlines, lead sentences (the five W's), and reported speech. Reviews highlight specific features of a story or film and express personal impressions."
      }
    ],
    tip: "When writing a news report, always remember the five W's: Who, What, When, Where, and Why."
  },
  11: {
    title: "Learning Outcomes",
    subtitle: "Appendix II - What the learner achieves",
    gallery: [
      { emoji: "🏆", label: "Achievement" },
      { emoji: "📈", label: "Progress" }
    ],
    sections: [
      {
        title: "Participation and Speech",
        body: "Learners should be able to participate in debates, deliver speeches, introduce guests, interview people, and act in role plays or skits while maintaining politeness and using appropriate vocabulary."
      },
      {
        title: "Reading and Grammar",
        body: "Learners will read and analyze various texts (excerpts, fairy tales, reports), refer to dictionaries, and accurately use grammar (clauses, active/passive voice, reported speech, tenses)."
      },
      {
        title: "Writing Skills",
        body: "Learners will write coherent paragraphs, e-mails, messages, diaries, scripts for choreography, and letters with a proper beginning, middle, and end, using appropriate punctuation."
      }
    ],
    tip: "These outcomes represent the skills you will carry with you into high school and beyond."
  },
  12: {
    title: "Note to the Students",
    subtitle: "Appendix II - Final advice",
    sections: [
      {
        title: "Active Participation",
        body: "The textbook demands active participation. You are expected to express your ideas freely, share with your classmates, and take turns in groups."
      },
      {
        title: "Independent Work",
        body: "Brainstorm writing tasks in class, but attempt them individually. Most exams will be text-independent, so you will get unseen texts to answer tasks. Guides and question banks won't be much use!"
      },
      {
        title: "Improving Language",
        body: "Improve by interacting in English, reading stories/newspapers, and watching English TV. If you can't express ideas in English yet, share them in your mother tongue first, then decide how to say it in English."
      }
    ],
    tip: "Language is learned by using it, not just memorizing it. Don't be afraid to make mistakes!"
  }
};

function getPageTasks(content: { title: string; sections: Section[] }) {
  return [
    `Read the ${content.title} summary carefully.`,
    `Review the main ideas from the ${content.sections[0]?.title ?? "first"} section.`,
    "Say or write one thing you learned or found interesting on this page."
  ];
}

export function C8EnglishAppendicesPage({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];
  const tasks = getPageTasks(content);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-gray-200 bg-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-700">Class 8 English - Appendices</p>
        <h1 className="font-heading text-2xl font-bold text-gray-950">{content.title}</h1>
        <p className="mt-1 text-foreground/65">{content.subtitle}</p>
      </div>

      {content.gallery && <IconGallery items={content.gallery} caption="Appendix topics represented with emoji stand-ins." />}

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

      <ReadingTaskChecklist title="Page Activity" tasks={tasks} storageKey={`c8-english-appendices-page${page}-activity`} />

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
