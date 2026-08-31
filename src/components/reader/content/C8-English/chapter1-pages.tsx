import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

type Section = {
  title: string;
  body: string;
  items?: string[];
};

const PAGE_CONTENT: Record<number, { title: string; subtitle: string; sections: Section[]; gallery?: { emoji: string; label: string }[]; tip?: string }> = {
  1: {
    title: "Family",
    subtitle: "Unit opener: small and joint families",
    gallery: [
      { emoji: "👨‍👩‍👧‍👦", label: "Small family" },
      { emoji: "🏡", label: "Joint family" },
      { emoji: "👵", label: "Elders" },
      { emoji: "🧒", label: "Children" },
      { emoji: "🤝", label: "Care" },
      { emoji: "🗣️", label: "Discussion" }
    ],
    sections: [
      {
        title: "Look and discuss",
        body: "The opening picture invites students to compare family types and speak about affection, support, privacy, and responsibility.",
        items: [
          "What do you observe in the pictures?",
          "What type of families do we find in present society? Why?",
          "Which family do you like? Give a reason."
        ]
      },
      {
        title: "Oral discourse",
        body: "Debate whether small families are happy families. Support your view with examples from daily life."
      }
    ],
    tip: "A good debate answer gives a point, a reason, and a short example."
  },
  2: {
    title: "Reading A: The Tattered Blanket",
    subtitle: "Before reading and first impressions",
    sections: [
      {
        title: "Theme preview",
        body: "The story asks us to think about how a family treats an elderly member who needs comfort, patience, and respect."
      },
      {
        title: "Predict",
        body: "Use the title to predict the mood of the story.",
        items: ["Who might own the blanket?", "Why might it be tattered?", "What family problem could the blanket reveal?"]
      }
    ],
    tip: "Prediction is not guessing wildly; it uses clues from the title, picture, and first lines."
  },
  3: {
    title: "Story Development",
    subtitle: "Reading for character and conflict",
    sections: [
      {
        title: "Read closely",
        body: "Notice how the home atmosphere changes when people speak about the old man. Their words and actions reveal the conflict."
      },
      {
        title: "Comprehension",
        body: "Answer in your own words.",
        items: [
          "What does the old man need from his family?",
          "Which character seems most impatient?",
          "How does the setting make the old man feel?"
        ]
      }
    ]
  },
  4: {
    title: "Character Feelings",
    subtitle: "Understanding what is unsaid",
    sections: [
      {
        title: "Infer",
        body: "Some feelings in a story are not directly explained. We understand them from gestures, silence, and repeated behaviour.",
        items: ["Find a moment of neglect.", "Find a moment of hesitation.", "Find a moment that could have been kinder."]
      },
      {
        title: "Write",
        body: "Write three diary lines from the old man's point of view. Keep the language original."
      }
    ],
    tip: "Inference answers should include the clue that helped you decide."
  },
  5: {
    title: "Vocabulary",
    subtitle: "Words connected to care and dignity",
    sections: [
      {
        title: "Meaning from context",
        body: "Match these words to their meanings, then use any three in fresh sentences.",
        items: ["tattered: old and torn", "affection: warm love and care", "reluctant: not willing", "dignity: self-respect", "burden: something felt as a load"]
      },
      {
        title: "Word work",
        body: "Group the words into positive and negative feelings. Explain your grouping orally."
      }
    ]
  },
  6: {
    title: "Reading A: Reflection",
    subtitle: "From events to values",
    sections: [
      {
        title: "Think deeper",
        body: "The story is not only about one blanket. It is about how love should appear in everyday family behaviour.",
        items: ["What should younger people learn from the story?", "How can families protect the dignity of elders?", "What would you change in the story's ending?"]
      },
      {
        title: "Moral focus",
        body: "Care for elders is a responsibility shaped by gratitude, not a favour done for praise."
      }
    ]
  },
  7: {
    title: "Language Focus",
    subtitle: "Phrases and noun phrases",
    sections: [
      {
        title: "Phrases",
        body: "A phrase is a group of words that works as a unit. It may name a person, describe a thing, or show an action idea.",
        items: ["look after", "care for", "put away", "a warm blanket", "an old family house"]
      },
      {
        title: "Practice",
        body: "Use each phrase in a sentence connected to family life."
      }
    ],
    tip: "A noun phrase can be one word or a group of words built around a noun."
  },
  8: {
    title: "Writing",
    subtitle: "Short essay on family",
    sections: [
      {
        title: "Essay frame",
        body: "Plan before writing.",
        items: ["Introduce the family type.", "Describe two advantages.", "Mention one challenge.", "End with a balanced opinion."]
      },
      {
        title: "Suggested topic",
        body: "The Family I Value. Use examples from your own observation and avoid copying lines from the textbook."
      }
    ]
  },
  9: {
    title: "Reading B: My Mother",
    subtitle: "Poem appreciation without transcription",
    sections: [
      {
        title: "Central feeling",
        body: "The poem celebrates a mother's patient love, care, sacrifice, and emotional strength."
      },
      {
        title: "Discuss",
        body: "Read the poem in the book, then answer.",
        items: ["What qualities of a mother are highlighted?", "Which image feels most tender?", "How can children show gratitude at home?"]
      }
    ],
    tip: "In poetry, sound and image often carry feeling as much as meaning does."
  },
  10: {
    title: "Poetry Skills",
    subtitle: "Imagery, tone, and performance",
    sections: [
      {
        title: "Notice",
        body: "Look for repeated feelings, gentle descriptions, and images that make a mother's care visible."
      },
      {
        title: "Choreography",
        body: "Plan simple gestures for care, worry, comfort, and thankfulness. Keep the performance respectful."
      }
    ]
  },
  11: {
    title: "Reading C: Letter to a Friend",
    subtitle: "Memory, city life, and friendship",
    sections: [
      {
        title: "Summary",
        body: "The letter contrasts joyful childhood memories with a busier city life where the writer feels distance from old friendships and simpler pleasures."
      },
      {
        title: "Compare",
        body: "Make two columns: village memories and city life. Add details after reading the letter."
      }
    ],
    tip: "A friendly letter needs warmth, a clear reason for writing, and a natural closing."
  },
  12: {
    title: "Letter Format",
    subtitle: "Organising a friendly letter",
    sections: [
      {
        title: "Parts of a letter",
        body: "Arrange your letter clearly.",
        items: ["Address and date", "Greeting", "Body", "Closing", "Signature"]
      },
      {
        title: "Practice",
        body: "Write to a friend inviting them to spend holidays with you. Include one shared memory."
      }
    ]
  },
  13: {
    title: "Comprehension",
    subtitle: "Questions from Letter to a Friend",
    sections: [
      {
        title: "Answer the following",
        body: "Use complete sentences and your own wording.",
        items: [
          "How did Suresh and Ramesh spend their childhood?",
          "Why did Ramesh's family move to the city?",
          "What change do you observe in Ramesh?",
          "Do you think Ramesh is happy in the city? Why?",
          "What made Ramesh write to Suresh?"
        ]
      }
    ]
  },
  14: {
    title: "Project and Self Assessment",
    subtitle: "Reviewing Unit 1",
    sections: [
      {
        title: "Project work",
        body: "Observe any five families in your neighbourhood and note advantages and disadvantages of living in joint and nuclear families."
      },
      {
        title: "Self check",
        body: "Reflect honestly on your learning.",
        items: ["I understood all three readings.", "I practised vocabulary and phrases.", "I can write a short essay and a friendly letter.", "I can speak about family types with reasons."]
      }
    ],
    tip: "Self assessment is useful only when it is honest. Mark what needs more practice."
  }
};

export function C8EnglishChapter1Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-teal-200 bg-teal-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Class 8 English · Unit 1</p>
        <h1 className="font-heading text-2xl font-bold text-teal-950">{content.title}</h1>
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
