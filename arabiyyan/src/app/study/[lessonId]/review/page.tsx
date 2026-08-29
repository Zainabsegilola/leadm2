"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AudioPlayer } from "@/components/AudioPlayer";
import { getLesson } from "@/data/lessons";
import { getLessonProgress, saveLessonProgress, markStudiedToday } from "@/lib/storage";
import { LessonProgress, ReviewGrade, Sentence } from "@/lib/types";
import { countDueAndNew, gradeReview, isDue, isProgrammeComplete } from "@/lib/srs";

export default function ReviewPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLesson(lessonId);

  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [queue, setQueue] = useState<Sentence[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!lesson) return;
    const p = getLessonProgress(lesson.id, lesson.sentences.map((s) => s.id));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    setProgress(p);
    setQueue(
      lesson.sentences.filter((s) => {
        const r = p.review[s.id];
        return r.inReview && (r.isNew || isDue(r));
      })
    );
  }, [lesson]);

  const allProgrammesComplete = useMemo(() => {
    if (!progress || !lesson) return false;
    const sentences = lesson.sentences;
    const rev = progress.review;
    return sentences.every((s) => isProgrammeComplete(rev[s.id]));
  }, [progress, lesson]);

  if (!lesson) return null;

  const current = queue[0];

  const { due, isNew } = progress
    ? countDueAndNew(lesson.sentences.map((s) => progress.review[s.id]))
    : { due: 0, isNew: 0 };

  function grade(sentenceId: string, g: ReviewGrade) {
    if (!progress) return;
    const updatedReview = {
      ...progress.review,
      [sentenceId]: gradeReview(progress.review[sentenceId], g),
    };
    const updated = { ...progress, review: updatedReview };
    setProgress(updated);
    saveLessonProgress(updated);
    markStudiedToday();
    setRevealed(false);
    setQueue((q) => q.slice(1));
  }

  function restartLesson() {
    if (!progress || !lesson) return;
    const reset: LessonProgress = {
      ...progress,
      sentences: Object.fromEntries(lesson.sentences.map((s) => [s.id, { studied: false }])),
      review: Object.fromEntries(
        lesson.sentences.map((s) => [
          s.id,
          { inReview: false, isNew: false, intervalDays: 0, reviewsCompleted: 0 },
        ])
      ),
    };
    setProgress(reset);
    saveLessonProgress(reset);
    setQueue([]);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 pb-20 sm:px-10">
        <div className="mx-auto max-w-xl">
          <Link
            href={`/study/${lesson.id}`}
            className="mb-6 inline-block text-xs"
            style={{ color: "var(--muted)" }}
          >
            ← Lesson
          </Link>

          {allProgrammesComplete ? (
            <div className="mt-16 space-y-6 text-center">
              <p className="text-lg" style={{ color: "var(--emerald-glow)" }}>
                You&rsquo;ve completed the 30-day review programme for this passage.
              </p>
              <button
                onClick={restartLesson}
                className="rounded-full px-5 py-2 text-sm"
                style={{ background: "var(--emerald-dim)", color: "var(--emerald-glow)" }}
              >
                Restart this lesson
              </button>
            </div>
          ) : (
            <>
              <p className="mb-10 text-sm" style={{ color: "var(--muted)" }}>
                Due: {due} · New: {isNew}
              </p>

              {current ? (
                <div className="space-y-8 text-center">
                  <p className="text-xl">{current.english}</p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Say the Arabic out loud before revealing it.
                  </p>

                  {revealed ? (
                    <div className="space-y-4">
                      <p className="font-arabic text-4xl leading-loose" dir="rtl">
                        {current.arabic}
                      </p>
                      <div className="flex justify-center">
                        <AudioPlayer key={current.audio.full} src={current.audio.full} loopLabel="this sentence" />
                      </div>

                      <div className="mt-8 flex justify-center gap-3">
                        <GradeButton label="Forgot" onClick={() => grade(current.id, "forgot")} />
                        <GradeButton label="Difficult" onClick={() => grade(current.id, "difficult")} />
                        <GradeButton
                          label="Remembered"
                          emphasis
                          onClick={() => grade(current.id, "remembered")}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRevealed(true)}
                      className="rounded-full px-5 py-2 text-sm"
                      style={{ background: "var(--emerald-dim)", color: "var(--emerald-glow)" }}
                    >
                      Reveal
                    </button>
                  )}
                </div>
              ) : (
                <p className="mt-16 text-center text-sm" style={{ color: "var(--muted)" }}>
                  Nothing due for review right now. Come back tomorrow.
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function GradeButton({
  label,
  onClick,
  emphasis,
}: {
  label: string;
  onClick: () => void;
  emphasis?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm"
      style={{
        background: emphasis ? "var(--emerald)" : "transparent",
        color: emphasis ? "#04150d" : "var(--muted)",
        border: emphasis ? "none" : "1px solid var(--hairline)",
      }}
    >
      {label}
    </button>
  );
}
