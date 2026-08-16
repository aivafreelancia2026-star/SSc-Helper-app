"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const STARTER_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hi, I am SSC Helper AI. Ask me a doubt from the page you are reading.",
  },
];

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(STARTER_MESSAGES);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "assistant",
        text: "AI page-reading is being connected. Your message is saved in this chat for now.",
      },
    ]);
    setDraft("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open SSC Helper AI chat"
        className="fixed right-4 z-30 flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-[18px] bg-[#020817] shadow-[6px_6px_14px_rgba(79,70,229,0.28),-4px_-4px_10px_rgba(255,255,255,0.65)] transition-transform duration-150 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        style={{ bottom: "calc(5.25rem + env(safe-area-inset-bottom))" }}
      >
        <Image
          src="/assets/brand/ssc-helper-icon.png"
          alt=""
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-heading"
          className="fixed inset-0 z-40 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-4"
        >
          <div className="absolute inset-0 bg-foreground/35 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <section className="relative flex max-h-[82vh] w-full max-w-md flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/95 shadow-[12px_12px_28px_rgba(79,70,229,0.18),-8px_-8px_20px_rgba(255,255,255,0.8)]">
            <header className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
              <div className="h-11 w-11 overflow-hidden rounded-[16px] bg-[#020817]">
                <Image
                  src="/assets/brand/ssc-helper-icon.png"
                  alt=""
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="ai-chat-heading" className="font-heading text-lg font-bold text-foreground">
                  SSC Helper AI
                </h2>
                <p className="text-xs font-semibold text-foreground/55">Page tutor chat</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI chat"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[82%] rounded-[20px] px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-primary text-on-primary"
                        : "border border-border/60 bg-muted text-foreground/75"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="border-t border-border/60 bg-white/90 p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about this page..."
                  className="min-h-12 flex-1 rounded-[18px] border-2 border-border bg-white/80 px-4 text-sm text-foreground outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="cursor-pointer rounded-[18px] bg-accent px-4 font-heading text-sm font-bold text-on-primary shadow-[0_4px_0_#c2410c] transition-all active:translate-y-1 active:shadow-[0_1px_0_#c2410c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
