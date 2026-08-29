"use client";

import { useState } from "react";

const PROMPTS = [
  {
    title: "Understanding a word",
    text: "You are an expert Arabic teacher. I am a beginner/intermediate Arabic learner. I do not understand what this word means in this context: [WORD]. Please explain its meaning simply and give me a few short example sentences that help me understand how it is used.",
  },
  {
    title: "Understanding a verb",
    text: "You are an expert Arabic teacher. I am a [BEGINNER/INTERMEDIATE] Arabic learner. I do not understand this verb and its usage: [VERB]. Please explain its root, basic meaning, and how it is used in this context. Give me a few simple example sentences with English translations.",
  },
  {
    title: "Grammar confusion",
    text: "You are an expert Arabic teacher. I am a [BEGINNER/INTERMEDIATE] Arabic learner. I am confused about this part of the sentence: [TEXT/QUESTION]. Please explain it simply using examples. Focus on helping me understand the sentence rather than giving me an unnecessarily complicated grammar lecture.",
  },
];

export function PromptSuggestions() {
  const [open, setOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function copy(text: string, i: number) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  }

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="interactive hover-emerald text-xs underline"
        style={{ color: "var(--muted)" }}
      >
        {open ? "Hide" : "Stuck? Copy a prompt to ask ChatGPT"}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {PROMPTS.map((p, i) => (
            <div key={p.title} className="rounded-lg border p-3" style={{ borderColor: "var(--hairline)" }}>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: "var(--emerald-glow)" }}>
                  {p.title}
                </p>
                <button
                  onClick={() => copy(p.text, i)}
                  className="interactive hover-emerald text-[11px]"
                  style={{ color: "var(--muted)" }}
                >
                  {copiedIndex === i ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted-dim)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
