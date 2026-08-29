"use client";

import { use, useRef } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { PassageAudioPlayer, PassageAudioHandle } from "@/components/PassageAudioPlayer";
import { getLesson } from "@/data/lessons";
import { markStudiedToday } from "@/lib/storage";

export default function ListenPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLesson(lessonId);
  const audioRef = useRef<PassageAudioHandle>(null);

  if (!lesson) return null;

  const items = [
    { key: "full", src: lesson.audio.fullPassage, label: "Full passage" },
    ...lesson.sentences.map((s) => ({ key: s.id, src: s.audio.full, label: `Sentence ${s.order}` })),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center gap-10 px-6 pb-24">
        <div className="text-center">
          <p className="font-arabic text-3xl mb-1">{lesson.title.arabic}</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {lesson.title.english}
          </p>
        </div>

        <div onClick={() => markStudiedToday()}>
          <PassageAudioPlayer ref={audioRef} items={items} />
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <button
            onClick={() => audioRef.current?.play("full")}
            style={{ color: "var(--muted-dim)" }}
          >
            Full passage
          </button>
          {lesson.sentences.map((s) => (
            <button
              key={s.id}
              onClick={() => audioRef.current?.play(s.id)}
              style={{ color: "var(--muted-dim)" }}
            >
              {s.order}
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
