import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

type Section = {
  title: string;
  body: string;
  items?: string[];
};

const PAGE_CONTENT: Record<number, { title: string; subtitle: string; sections: Section[]; gallery?: { emoji: string; label: string }[]; tip?: string }> = {
  1: {
    title: "Humanity",
    subtitle: "Unit opener: kindness and compassion",
    gallery: [
      { emoji: "🤲", label: "Helping hands" },
      { emoji: "🥣", label: "Food shared" },
      { emoji: "🧒", label: "A child helper" },
      { emoji: "🧑", label: "A person in need" },
      { emoji: "💬", label: "Kind words" },
      { emoji: "🌱", label: "Hope" }
    ],
    sections: [
      {
        title: "Look and answer",
        body: "The unit opens with a picture of one person helping another. Use it to discuss kindness, dignity, and social responsibility.",
        items: [
          "What do you notice in the picture?",
          "What might the man in the picture be feeling?",
          "Have you seen people helping others? Narrate one incident."
        ]
      },
      {
        title: "Oral discourse",
        body: "Narrate an incident you witnessed where people helped others. Include who needed help, who helped, and what changed after the help."
      }
    ],
    tip: "A humane response protects a person's dignity while offering help."
  },
  2: {
    title: "Reading A: The Selfish Giant",
    subtitle: "Part I begins",
    sections: [
      {
        title: "Drama setup",
        body: "The reading is presented like a play. An older version of the giant speaks to the audience while the earlier action appears behind him."
      },
      {
        title: "Character contrast",
        body: "The title character owns a beautiful garden but does not want to share it with children. This creates the central conflict.",
        items: ["Who speaks to the audience?", "What kind of place is the garden?", "Why do the children like it?", "What selfish decision does the giant make?"]
      }
    ],
    tip: "In a play, stage directions tell us actions and mood, not just dialogue."
  },
  3: {
    title: "No Place to Play",
    subtitle: "Children outside the wall",
    sections: [
      {
        title: "What the picture shows",
        body: "The children lose access to the garden and are forced into unsafe or unpleasant spaces. Their comments reveal disappointment and fear."
      },
      {
        title: "Discuss",
        body: "Think about why a play space matters for children.",
        items: [
          "How do the children react after the wall is built?",
          "What does the wall symbolise?",
          "Why is the garden more than just land?",
          "How does the picture help you understand the scene?"
        ]
      }
    ]
  },
  4: {
    title: "Winter in the Garden",
    subtitle: "Selfishness changes the setting",
    sections: [
      {
        title: "Symbolism",
        body: "After the children are kept out, the garden loses warmth and life. The cold weather reflects the owner's selfish heart."
      },
      {
        title: "Personification",
        body: "The seasons and weather are treated like characters. This makes nature respond to human behaviour in a dramatic way.",
        items: ["Spring", "Summer", "Autumn", "Snow", "Frost", "North Wind", "Hail"]
      }
    ],
    tip: "When nature mirrors a character's feelings, it often signals a moral change in the story."
  },
  5: {
    title: "Reading for Performance",
    subtitle: "Voice, action, and mood",
    sections: [
      {
        title: "Stage reading",
        body: "Read the scene aloud by assigning roles. Use voice changes to show anger, fear, sadness, and regret."
      },
      {
        title: "Performance notes",
        body: "Prepare a short scene without copying long lines. Focus on movement and expression.",
        items: [
          "The children approach the garden happily.",
          "The wall separates them from joy.",
          "The garden becomes cold and silent.",
          "The owner wonders why warmth has gone away."
        ]
      },
      {
        title: "Theme link",
        body: "The first part shows that selfishness can make even a beautiful place lifeless. Humanity begins when we make room for others."
      }
    ]
  },
  6: {
    title: "Glossary and Comprehension",
    subtitle: "Reviewing The Selfish Giant Part I",
    sections: [
      {
        title: "Vocabulary from the play",
        body: "Use the glossary words to describe the garden, the wall, and the cold season that enters the story.",
        items: ["springtime", "delicate blossoms", "castle", "trespassers", "whispering", "scatter", "cloak", "delightful"]
      },
      {
        title: "Comprehension",
        body: "Answer these questions after reading Part I.",
        items: [
          "What are the major characters in the play?",
          "Why are the children named by shapes or appearances?",
          "How can you say that the giant was selfish?",
          "Who stayed with the giant, and what do their names suggest?"
        ]
      }
    ],
    tip: "Names like Snow, Frost, and North Wind help turn weather into living stage characters."
  },
  7: {
    title: "Reading B: The Selfish Giant",
    subtitle: "Part II begins",
    sections: [
      {
        title: "Change in atmosphere",
        body: "Part II begins with sound, fragrance, and signs of spring. The garden changes because children have returned."
      },
      {
        title: "Character change",
        body: "The giant notices a small child who cannot climb a tree. This moment softens his heart and begins his transformation.",
        items: [
          "What does the bird song suggest?",
          "Why is one corner still winter?",
          "What does the small child need?",
          "What does the giant realise?"
        ]
      }
    ],
    tip: "A turning point is the moment when a character begins to change."
  },
  8: {
    title: "Kindness Restores the Garden",
    subtitle: "From regret to action",
    sections: [
      {
        title: "What the giant does",
        body: "The giant understands that his selfishness kept joy away. He decides to help the little child and open the garden to children."
      },
      {
        title: "Symbol work",
        body: "Connect each image with an idea.",
        items: ["Wall: separation", "Garden: shared joy", "Winter: selfishness", "Spring: kindness", "Child: innocence and love"]
      }
    ],
    tip: "In this story, nature changes when the giant's heart changes."
  },
  9: {
    title: "A Shared Garden",
    subtitle: "Children return",
    sections: [
      {
        title: "After the wall falls",
        body: "The garden becomes a place of play again. The children thank the giant, and he begins to value them more than the flowers."
      },
      {
        title: "Discuss",
        body: "Use evidence from the play to explain the giant's new attitude.",
        items: [
          "Why do the children return?",
          "How do they describe the garden after the change?",
          "Why does the giant remember the little child?",
          "What does he mean by seeing children as the most beautiful flowers?"
        ]
      }
    ]
  },
  10: {
    title: "Ending and Author Note",
    subtitle: "Love, wonder, and Oscar Wilde",
    sections: [
      {
        title: "Ending",
        body: "The final scene gives the story a spiritual and emotional close. The once-selfish character has learned love, humility, and welcome."
      },
      {
        title: "About Oscar Wilde",
        body: "Oscar Wilde was an Irish writer known for plays, stories, wit, and memorable moral tales for children."
      },
      {
        title: "Reflect",
        body: "Write a short paragraph on how the giant changes from ownership to generosity.",
        items: ["What was he like at first?", "What made him change?", "How did his actions prove the change?"]
      }
    ],
    tip: "A strong character paragraph uses before, turning point, and after."
  },
  11: {
    title: "Part II Review",
    subtitle: "Glossary and comprehension",
    sections: [
      {
        title: "Glossary focus",
        body: "Use the new words from Part II to describe sound, movement, weakness, and kindness in the play.",
        items: ["linnet bird", "hail", "cease", "twittering", "sneeze", "feeble", "hath", "thee", "slay", "art", "thou"]
      },
      {
        title: "Comprehension",
        body: "Answer these in your own words after rereading the second part.",
        items: [
          "How is the little child different from the other children?",
          "How does the narrator show that spring has arrived?",
          "Which figurative expressions make the garden feel alive?",
          "What is the main theme of the play?"
        ]
      }
    ],
    tip: "For theme questions, move beyond events and explain the larger idea about human behaviour."
  },
  12: {
    title: "Check Your Understanding",
    subtitle: "Multiple choice and phrasal verbs",
    sections: [
      {
        title: "Choose the best answer",
        body: "Use the context of the play to select the correct option.",
        items: [
          "The images of flowers and peach blossoms point to the arrival of spring.",
          "The giant observes children playing in the garden.",
          "He recognises spring through the song of a linnet bird.",
          "The little boy shows affection by reaching towards the giant.",
          "The delighted exclamation about the garden is spoken by the giant."
        ]
      },
      {
        title: "Phrasal verb",
        body: "In the sentence about blossoms, broke out means came out or appeared suddenly. Make your own sentences with break out, break down, break into, and break up."
      }
    ],
    tip: "A phrasal verb often changes meaning when the small word after the verb changes."
  },
  13: {
    title: "Vocabulary Practice",
    subtitle: "Antonyms and similar meanings",
    sections: [
      {
        title: "Opposites",
        body: "Find suitable antonyms from the play or from your vocabulary.",
        items: ["hell", "foe", "started", "uncovered", "nearest"]
      },
      {
        title: "Sounds of speaking and crying",
        body: "Match each word with the kind of sound it suggests. Then use any four in short sentences.",
        items: ["scream", "whisper", "yell", "roar", "groan", "weep", "shriek", "babble", "wail", "twitter"]
      }
    ],
    tip: "Precise sound words help a reader imagine volume, emotion, and situation."
  },
  14: {
    title: "Word Meaning and Grammar",
    subtitle: "Context clues and gerunds",
    sections: [
      {
        title: "Choose the meaning",
        body: "Explain these words using clues from the sentences in the play.",
        items: ["trespassers", "roared", "blossoms", "rattled"]
      },
      {
        title: "Gerunds",
        body: "A gerund is an -ing form used like a noun. Compare an action in progress with an -ing word used as the subject or object of a sentence.",
        items: [
          "The wind ceased roaring.",
          "The child did not notice the giant coming.",
          "Swimming is good for health.",
          "I enjoy reading plays aloud."
        ]
      }
    ],
    tip: "Ask whether the -ing word names an activity. If it does, it may be acting as a gerund."
  },
  15: {
    title: "Language Activities",
    subtitle: "Gerunds, notices, speaking, and summary",
    sections: [
      {
        title: "Identify gerunds",
        body: "Underline the -ing forms and decide which ones are used as nouns.",
        items: [
          "The children were whispering outside the wall.",
          "Why is spring late in coming?",
          "Walking every day keeps the body active."
        ]
      },
      {
        title: "Writing notices",
        body: "Write one-line notices for places such as hospitals, banks, schools, public parks, and homes. Keep the language brief, clear, and polite."
      },
      {
        title: "Listening and speaking",
        body: "Listen for details about a garden, then speak about a garden you have visited. Mention its location, what made it special, and how people used the space."
      },
      {
        title: "Study skill",
        body: "Summarise the play by separating main ideas from supporting details. Keep only the ideas needed to explain the change in the giant."
      }
    ],
    tip: "A summary is shorter than the original, but it should still preserve the main movement of the story."
  },
  16: {
    title: "Reading C: The Garden Within",
    subtitle: "Poem study without full transcription",
    sections: [
      {
        title: "Poem overview",
        body: "The poem presents the heart as a garden where good qualities can grow. It links beauty, hope, gratitude, and personal goals."
      },
      {
        title: "Glossary focus",
        body: "Use these words to discuss the poem's images and feelings.",
        items: ["in fits and starts", "petal", "bestowed", "bower", "nutritious", "reaps", "spirit", "gratitude", "goal"]
      },
      {
        title: "Image stand-in",
        body: "A seedling growing from soil suggests inner growth, care, and hope."
      }
    ],
    gallery: [
      { emoji: "🌱", label: "Inner growth" },
      { emoji: "💚", label: "Kind heart" },
      { emoji: "🎯", label: "Goal" },
      { emoji: "🙏", label: "Gratitude" }
    ],
    tip: "For poems, focus on images and ideas instead of retelling every line."
  },
  17: {
    title: "Poem Comprehension",
    subtitle: "Central idea and figures of speech",
    sections: [
      {
        title: "Answer in your own words",
        body: "Use short evidence-based responses for these questions.",
        items: [
          "What is the central idea of the poem?",
          "Which features of the inner garden are mentioned in the first stanza?",
          "What is the poet's mood: sad, hopeful, or thankful?",
          "Explain gratitude as it is used in the poem."
        ]
      },
      {
        title: "Figures of speech",
        body: "Identify how comparison and human qualities make language more powerful.",
        items: [
          "Simile: a direct comparison using like or as.",
          "Metaphor: one thing is described as another to show shared qualities.",
          "Personification: a non-human thing is given human qualities."
        ]
      }
    ],
    tip: "A figure of speech is useful only when you can explain what effect it creates."
  },
  18: {
    title: "Unit 3 Wrap-up",
    subtitle: "Project work and self-assessment",
    sections: [
      {
        title: "A garden of qualities",
        body: "Reflect on personal qualities and ask family members or friends to identify qualities they see in themselves. Add more qualities if needed.",
        items: ["encouraging", "hard working", "friendly", "generous", "careful", "punctual", "sensitive", "confident", "trustworthy", "compassionate"]
      },
      {
        title: "Self-assessment",
        body: "Review the unit honestly. Check whether you understood the readings, vocabulary, gerunds, notice writing, oral activity, listening task, summary work, and project."
      },
      {
        title: "Unit reflection",
        body: "Write three sentences about how this unit connects kindness in stories with kindness in real life."
      }
    ],
    tip: "Self-assessment works best when it leads to one clear next step for improvement."
  }
};

export function C8EnglishChapter3Page({ page }: { page: number }) {
  const content = PAGE_CONTENT[page];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Class 8 English - Unit 3</p>
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

      {content.tip && <TipBox>{content.tip}</TipBox>}
    </div>
  );
}
