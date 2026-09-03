"use client";

import { GlossToken, WordInfo } from "@/lib/types";
import { WordPopover } from "./WordPopover";

interface GlossGridProps {
  tokens: GlossToken[];
  englishSentence: string;
  arabicSentence: string;
  words: Record<string, WordInfo>;
  highlighted: Set<string>;
  onToggleHighlight?: (word: string) => void;
  /** Phase 3 recall mode: row 2 shows only first letters, row 4 is hidden until revealed. */
  recall?: boolean;
  revealed?: boolean;
  onReveal?: () => void;
}

export function GlossGrid({
  tokens,
  englishSentence,
  arabicSentence,
  words,
  highlighted,
  onToggleHighlight,
  recall = false,
  revealed = true,
  onReveal,
}: GlossGridProps) {
  return (
    <div className="space-y-8">
      {/* Row 1 (English literal equivalents) + Row 2 (Arabic words / first-letter cues) */}
      <div dir="rtl" className="flex flex-wrap justify-center gap-x-5 gap-y-4">
        {tokens.map((token, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span
              className="text-base sm:text-lg leading-tight"
              style={{ color: "var(--foreground)" }}
              dir="ltr"
            >
              {token.gloss}
            </span>
            {recall ? (
              <span className="font-arabic text-sm sm:text-base tracking-wide" style={{ color: "var(--muted)" }}>
                {token.arabic.trim()[0]}
              </span>
            ) : (
              <WordPopover
                word={token.arabic}
                info={words[token.wordInfoKey ?? token.arabic]}
                highlighted={highlighted.has(token.arabic)}
                onToggleHighlight={onToggleHighlight ? () => onToggleHighlight(token.arabic) : undefined}
                size="text-sm sm:text-base"
              />
            )}
          </div>
        ))}
      </div>

      {/* Row 3: complete English meaning, centred */}
      <p className="text-center text-base sm:text-lg" style={{ color: "var(--muted)" }}>
        {englishSentence}
      </p>

      {/* Row 4: complete Arabic sentence — same size as the per-word Arabic in
          Row 3 above. This is intentionally NOT a large heading: the four
          rows should read as one balanced study structure, not "gloss, then
          a big sentence." */}
      {recall ? (
        revealed ? (
          <div className="space-y-3 text-center">
            <p className="font-arabic text-sm sm:text-base leading-relaxed" dir="rtl">
              {arabicSentence}
            </p>
            <button onClick={onReveal} className="interactive hover-emerald text-xs underline" style={{ color: "var(--muted)" }}>
              Hide Answer
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={onReveal}
              className="interactive rounded-full px-5 py-2 text-sm"
              style={{ background: "var(--emerald-dim)", color: "var(--emerald-glow)" }}
            >
              Reveal Answer
            </button>
          </div>
        )
      ) : (
        <p className="font-arabic text-sm sm:text-base text-center leading-relaxed" dir="rtl">
          {arabicSentence}
        </p>
      )}
    </div>
  );
}
