"use client";

import { PassageAudioHandle } from "./PassageAudioPlayer";

export function SentenceQuickSelect({
  audioRef,
  sentences,
}: {
  audioRef: React.RefObject<PassageAudioHandle | null>;
  sentences: { id: string; order: number }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 text-xs">
      <button
        onClick={() => audioRef.current?.play("full")}
        className="interactive hover-emerald"
        style={{ color: "var(--muted-dim)" }}
      >
        Full passage
      </button>
      {sentences.map((s) => (
        <button
          key={s.id}
          onClick={() => audioRef.current?.play(s.id)}
          className="interactive hover-emerald"
          style={{ color: "var(--muted-dim)" }}
        >
          {s.order}
        </button>
      ))}
    </div>
  );
}
