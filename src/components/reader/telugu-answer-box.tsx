"use client";

import { useEffect, useRef, useState } from "react";
import { useScore } from "@/components/score-provider";
import {
  getStoredTeluguInputMode,
  TELUGU_INPUT_MODE_EVENT,
  type TeluguInputMode,
} from "@/components/language-input-preference";

const VOWELS = ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"];
const CONSONANTS = [
  "క",
  "ఖ",
  "గ",
  "ఘ",
  "చ",
  "ఛ",
  "జ",
  "ఝ",
  "ట",
  "ఠ",
  "డ",
  "ఢ",
  "ణ",
  "త",
  "థ",
  "ద",
  "ధ",
  "న",
  "ప",
  "ఫ",
  "బ",
  "భ",
  "మ",
  "య",
  "ర",
  "ల",
  "వ",
  "శ",
  "ష",
  "స",
  "హ",
  "ళ",
];
const MARKS = ["ా", "ి", "ీ", "ు", "ూ", "ృ", "ె", "ే", "ై", "ొ", "ో", "ౌ", "్", "ం", "ః", "౦", "౧", "౨", "౩"];
const QUICK_WORDS = ["సైనికులు", "రైతులు", "దేశం", "సేవ", "జై జవాన్", "వందనం", "నినాదాలు", "పిల్లలు"];

const VOWEL_SIGNS: Record<string, string> = {
  aa: "ా",
  a: "",
  ii: "ీ",
  ee: "ీ",
  i: "ి",
  uu: "ూ",
  oo: "ూ",
  u: "ు",
  e: "ె",
  E: "ే",
  ae: "ే",
  ai: "ై",
  o: "ొ",
  O: "ో",
  oa: "ో",
  au: "ౌ",
};

const INDEPENDENT_VOWELS: Record<string, string> = {
  aa: "ఆ",
  a: "అ",
  ii: "ఈ",
  ee: "ఈ",
  i: "ఇ",
  uu: "ఊ",
  oo: "ఊ",
  u: "ఉ",
  e: "ఎ",
  E: "ఏ",
  ae: "ఏ",
  ai: "ఐ",
  o: "ఒ",
  O: "ఓ",
  oa: "ఓ",
  au: "ఔ",
};

const CONSONANT_MAP: Record<string, string> = {
  ksh: "క్ష",
  kh: "ఖ",
  gh: "ఘ",
  ch: "చ",
  c: "క",
  jh: "ఝ",
  th: "థ",
  dh: "ధ",
  ph: "ఫ",
  bh: "భ",
  sh: "శ",
  Sh: "ష",
  ng: "ంగ",
  ny: "ఞ",
  k: "క",
  g: "గ",
  j: "జ",
  T: "ట",
  D: "డ",
  N: "ణ",
  t: "త",
  d: "ద",
  n: "న",
  p: "ప",
  b: "బ",
  m: "మ",
  y: "య",
  r: "ర",
  l: "ల",
  v: "వ",
  w: "వ",
  s: "స",
  h: "హ",
  L: "ళ",
};

const SORTED_CONSONANTS = Object.keys(CONSONANT_MAP).sort((a, b) => b.length - a.length);
const SORTED_VOWELS = Object.keys(INDEPENDENT_VOWELS).sort((a, b) => b.length - a.length);

function insertAtCursor(value: string, insert: string, start: number, end: number) {
  return `${value.slice(0, start)}${insert}${value.slice(end)}`;
}

function transliterateWord(word: string): string {
  let output = "";
  let index = 0;

  while (index < word.length) {
    const remaining = word.slice(index);
    const consonantKey = SORTED_CONSONANTS.find((key) => remaining.startsWith(key));

    if (consonantKey) {
      const consonant = CONSONANT_MAP[consonantKey];
      index += consonantKey.length;
      const vowelKey = SORTED_VOWELS.find((key) => word.slice(index).startsWith(key));

      if (vowelKey) {
        output += consonant + VOWEL_SIGNS[vowelKey];
        index += vowelKey.length;
      } else {
        output += consonant + "్";
      }
      continue;
    }

    const vowelKey = SORTED_VOWELS.find((key) => remaining.startsWith(key));
    if (vowelKey) {
      output += INDEPENDENT_VOWELS[vowelKey];
      index += vowelKey.length;
      continue;
    }

    output += word[index];
    index += 1;
  }

  return output;
}

function transliterateEnglishToTelugu(value: string): string {
  return value.replace(/[A-Za-z]+/g, (word) => transliterateWord(word));
}

export function TeluguAnswerBox({
  question,
  storageKey,
  quickWords = QUICK_WORDS,
}: {
  question: string;
  storageKey: string;
  quickWords?: string[];
}) {
  const { addPoints } = useScore();
  const [answer, setAnswer] = useState("");
  const [englishDraft, setEnglishDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const [awarded, setAwarded] = useState(false);
  const [inputMode, setInputMode] = useState<TeluguInputMode>("typing");
  const [showKeypad, setShowKeypad] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setAnswer(localStorage.getItem(`${storageKey}-answer`) ?? "");
    setAwarded(localStorage.getItem(`${storageKey}-awarded`) === "1");
  }, [storageKey]);

  useEffect(() => {
    setInputMode(getStoredTeluguInputMode());

    function handleInputModeChange() {
      setInputMode(getStoredTeluguInputMode());
    }

    window.addEventListener(TELUGU_INPUT_MODE_EVENT, handleInputModeChange);
    window.addEventListener("storage", handleInputModeChange);
    return () => {
      window.removeEventListener(TELUGU_INPUT_MODE_EVENT, handleInputModeChange);
      window.removeEventListener("storage", handleInputModeChange);
    };
  }, []);

  useEffect(() => {
    setShowKeypad(inputMode === "keypad-only");
  }, [inputMode]);

  function updateAnswer(next: string) {
    setAnswer(next);
    setSaved(false);
    localStorage.setItem(`${storageKey}-answer`, next);
  }

  function addText(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) {
      updateAnswer(answer + text);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = insertAtCursor(answer, text, start, end);
    updateAnswer(next);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    });
  }

  function backspace() {
    const textarea = textareaRef.current;
    if (!textarea) return updateAnswer(answer.slice(0, -1));

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === 0 && end === 0) return;

    const deleteStart = start === end ? start - 1 : start;
    const next = `${answer.slice(0, deleteStart)}${answer.slice(end)}`;
    updateAnswer(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(deleteStart, deleteStart);
    });
  }

  function saveAnswer() {
    const trimmed = answer.trim();
    if (!trimmed) return;

    localStorage.setItem(`${storageKey}-answer`, trimmed);
    setAnswer(trimmed);
    setSaved(true);

    if (!awarded) {
      addPoints(1);
      localStorage.setItem(`${storageKey}-awarded`, "1");
      setAwarded(true);
    }
  }

  function convertEnglishDraft() {
    const converted = transliterateEnglishToTelugu(englishDraft.trim());
    if (!converted) return;
    addText(`${converted} `);
    setEnglishDraft("");
  }

  return (
    <div className="space-y-3 rounded-[16px] border border-border/70 bg-white/85 p-4 shadow-sm">
      <p className="text-base font-semibold leading-relaxed text-foreground">{question}</p>

      <textarea
        ref={textareaRef}
        value={answer}
        onChange={(event) => updateAnswer(event.target.value)}
        rows={3}
        inputMode="text"
        lang="te"
        readOnly={inputMode === "keypad-only"}
        placeholder={inputMode === "keypad-only" ? "క్రింద ఉన్న తెలుగు కీప్యాడ్ వాడండి" : "ఇక్కడ సమాధానం రాయండి"}
        className="min-h-24 w-full resize-y rounded-[12px] border border-border/70 bg-white px-3 py-2 text-lg leading-loose text-foreground outline-none focus:border-primary"
      />
      {inputMode === "keypad-only" && (
        <p className="text-xs font-semibold text-primary">Telugu keypad only mode is enabled from Profile.</p>
      )}

      {inputMode !== "keypad-only" && (
        <div className="space-y-2 rounded-[12px] border border-amber-200 bg-amber-50/70 p-3">
          <p className="text-sm font-bold text-amber-900">English to Telugu</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={englishDraft}
              onChange={(event) => setEnglishDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  convertEnglishDraft();
                }
              }}
              placeholder="Example: jai jawan"
              className="min-h-10 flex-1 rounded-[10px] border border-amber-200 bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={convertEnglishDraft}
              disabled={!englishDraft.trim()}
              className="rounded-[10px] bg-amber-600 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Convert
            </button>
          </div>
          <p className="text-xs text-foreground/60">This helps PC users type Telugu without installing a Telugu keyboard.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {quickWords.map((word) => (
          <button
            key={word}
            type="button"
            onClick={() => addText(`${word} `)}
            className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowKeypad((current) => !current)}
          aria-expanded={showKeypad}
          className="rounded-[12px] border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-900"
        >
          {showKeypad ? "Hide Telugu keypad" : "Show Telugu keypad"}
        </button>

        {showKeypad && (
          <div className="space-y-2 rounded-[12px] border border-cyan-200 bg-cyan-50/60 p-3">
            <p className="text-sm font-bold text-cyan-800">తెలుగు కీప్యాడ్</p>
            {[VOWELS, CONSONANTS, MARKS].map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-wrap gap-1.5">
                {group.map((letter) => (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => addText(letter)}
                    className="flex h-10 min-w-10 items-center justify-center rounded-[10px] border border-cyan-200 bg-white px-2 text-lg font-semibold text-foreground shadow-sm"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => addText(" ")}
                className="rounded-[10px] border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold"
              >
                Space
              </button>
              <button
                type="button"
                onClick={backspace}
                className="rounded-[10px] border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold"
              >
                Backspace
              </button>
              <button
                type="button"
                onClick={() => addText("।")}
                className="rounded-[10px] border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold"
              >
                ।
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-foreground/60">
          {awarded ? "ఈ ప్రశ్నకు పాయింట్ జమైంది." : "సమాధానం సేవ్ చేస్తే 1 పాయింట్ వస్తుంది."}
        </p>
        <button
          type="button"
          onClick={saveAnswer}
          disabled={!answer.trim()}
          className="rounded-[12px] bg-primary px-4 py-2 text-sm font-bold text-on-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saved ? "Saved" : "Save Answer"}
        </button>
      </div>
    </div>
  );
}
