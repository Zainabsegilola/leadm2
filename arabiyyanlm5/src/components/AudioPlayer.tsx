"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [0.5, 0.7, 1, 1.2, 1.5];

/**
 * The single, standard audio control set used everywhere in Arabiyyan:
 * Play/Pause · 1x · 1.2x · 1.5x · Loop.
 *
 * `loopLabel` is shown only for accessibility; the visible control is just
 * a small "loop" icon toggle so it reads consistently whether it's looping
 * a single sentence or the full passage.
 */
export function AudioPlayer({ src, loopLabel = "this audio" }: { src: string; loopLabel?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play().catch(() => setMissing(true));
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setMissing(true)}
      />

      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
        className="interactive flex h-10 w-10 items-center justify-center rounded-full transition-colors"
        style={{ background: "var(--emerald-dim)", color: "var(--emerald-glow)" }}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="4" width="5" height="16" rx="1" />
            <rect x="14" y="4" width="5" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4.5v15l13-7.5-13-7.5Z" />
          </svg>
        )}
      </button>

      <div className="flex gap-1">
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className="interactive rounded-full px-2.5 py-1 text-[11px] tabular-nums transition-colors"
            style={{
              background: speed === s ? "var(--emerald-dim)" : "transparent",
              color: speed === s ? "var(--emerald-glow)" : "var(--muted-dim)",
            }}
          >
            {s}×
          </button>
        ))}
      </div>

      <button
        onClick={() => setLoop((l) => !l)}
        aria-label={loop ? `Stop looping ${loopLabel}` : `Loop ${loopLabel}`}
        aria-pressed={loop}
        className="interactive flex h-8 w-8 items-center justify-center rounded-full"
        style={{ color: loop ? "var(--emerald-glow)" : "var(--muted-dim)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M17 2.1 21 6l-4 3.9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 21.9 3 18l4-3.9" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </button>

      {missing && (
        <span className="text-[11px]" style={{ color: "var(--muted-dim)" }}>
          Audio not added yet
        </span>
      )}
    </div>
  );
}
