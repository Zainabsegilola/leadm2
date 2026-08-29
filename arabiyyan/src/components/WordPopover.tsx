"use client";

import { useEffect, useRef, useState } from "react";
import { WordInfo } from "@/lib/types";

export function WordPopover({
  word,
  info,
  highlighted,
  onToggleHighlight,
  size = "text-3xl sm:text-4xl",
}: {
  word: string;
  info?: WordInfo;
  highlighted?: boolean;
  onToggleHighlight?: () => void;
  /** Tailwind text-size classes — smaller inside a word-by-word gloss grid, larger for a standalone sentence. */
  size?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function onClickAway(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickAway);
    return () => document.removeEventListener("click", onClickAway);
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`font-arabic leading-loose transition-colors px-0.5 ${size}`}
        style={{ color: highlighted ? "var(--danger)" : "var(--foreground)" }}
      >
        {word}
      </button>

      {open && info && (
        <div
          className="absolute z-20 mt-2 w-64 -translate-x-1/2 rounded-xl border p-4 text-left shadow-xl"
          style={{
            left: "50%",
            direction: "ltr",
            background: "var(--surface)",
            borderColor: "var(--hairline)",
          }}
        >
          <p className="font-arabic text-xl mb-1" style={{ color: "var(--emerald-glow)" }}>
            {info.surface}
          </p>
          {info.root && (
            <p className="text-[11px] mb-2" style={{ color: "var(--muted-dim)" }}>
              Root: {info.root}
            </p>
          )}
          <p className="text-sm mb-2">{info.meaning}</p>
          {info.usageNote && (
            <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
              {info.usageNote}
            </p>
          )}
          {info.example && (
            <div className="mb-2 rounded-lg p-2" style={{ background: "var(--emerald-dim)" }}>
              <p className="font-arabic text-lg" style={{ color: "var(--foreground)" }}>
                {info.example.arabic}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {info.example.english}
              </p>
            </div>
          )}
          {info.relatedWords && info.relatedWords.length > 0 && (
            <p className="text-xs" style={{ color: "var(--muted-dim)" }}>
              Related: {info.relatedWords.join(", ")}
            </p>
          )}

          {onToggleHighlight && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleHighlight();
              }}
              className="mt-3 text-xs underline"
              style={{ color: highlighted ? "var(--muted)" : "var(--danger)" }}
            >
              {highlighted ? "Mark as known" : "I don't know this word yet"}
            </button>
          )}
        </div>
      )}
    </span>
  );
}
