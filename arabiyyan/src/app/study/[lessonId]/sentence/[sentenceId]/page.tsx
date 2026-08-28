"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { AudioPlayer } from "@/components/AudioPlayer";
import { GlossGrid } from "@/components/GlossGrid";
import { getLesson } from "@/data/lessons";
import { getLessonProgress, saveLessonProgress, markStudiedToday, markSentenceStudied } from "@/lib/storage";
import { LessonProgress, StudyPhase } from "@/lib/types";

export default function SentencePage({
  params,
}: {
  params: Promise<{ lessonId: string; sentenceId: string }>;
}) {
  const { lessonId, sentenceId } = use(params);
  const lesson = getLesson(lessonId);
  const router = useRouter();

  const sentence = lesson?.sentences.find((s) => s.id === sentenceId);
  const sentenceIndex = lesson?.sentences.findIndex((s) => s.id === sentenceId) ?? -1;

  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [phase, setPhase] = useState<StudyPhase>(1);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    if (lesson) setProgress(getLessonProgress(lesson.id, lesson.sentences.map((s) => s.id)));
    setPhase(1);
    setRevealed(false);
  }, [lesson, sentenceId]);

  const highlighted = useMemo(() => new Set(progress?.highlightedWords ?? []), [progress]);

  if (!lesson || !sentence) return null;

  const studied = Boolean(progress?.sentences[sentence.id]?.studied);

  function toggleHighlight(word: string) {
    if (!progress) return;
    const already = progress.highlightedWords.includes(word);
    const updated: LessonProgress = {
      ...progress,
      highlightedWords: already
        ? progress.highlightedWords.filter((w) => w !== word)
        : [...progress.highlightedWords, word],
    };
    setProgress(updated);
    saveLessonProgress(updated);
  }

  function markStudied() {
    if (!progress || !sentence) return;
    const updated = markSentenceStudied(progress, sentence.id);
    setProgress(updated);
    saveLessonProgress(updated);
    markStudiedToday();
  }

  function goToPhase(p: StudyPhase) {
    setPhase(p);
    setRevealed(false);
  }

  function next() {
    if (phase < 3) {
      goToPhase((phase + 1) as StudyPhase);
      return;
    }
    const nextSentence = lesson!.sentences[sentenceIndex + 1];
    if (nextSentence) {
      router.push(`/study/${lesson!.id}/sentence/${nextSentence.id}`);
    } else {
      router.push(`/study/${lesson!.id}/review`);
    }
  }

  function back() {
    if (phase > 1) {
      goToPhase((phase - 1) as StudyPhase);
      return;
    }
    if (sentenceIndex === 0) {
      router.push(`/study/${lesson!.id}/overview`);
    } else {
      router.push(`/study/${lesson!.id}/sentence/${lesson!.sentences[sentenceIndex - 1].id}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-xl">
          <Link
            href={`/study/${lesson.id}`}
            className="mb-6 inline-block text-xs"
            style={{ color: "var(--muted)" }}
          >
            ← Sentence {sentence.order} of {lesson.sentences.length}
          </Link>

          <div className="mb-10 flex items-center gap-6">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => goToPhase(p as StudyPhase)}
                className="text-sm"
                style={{
                  color: phase === p ? "var(--emerald-glow)" : "var(--muted-dim)",
                }}
              >
                Phase {p}
              </button>
            ))}
          </div>

          {phase === 1 && (
            <div className="space-y-8">
              <GlossGrid
                tokens={sentence.gloss}
                englishSentence={sentence.english}
                arabicSentence={sentence.arabic}
                words={sentence.words}
                highlighted={highlighted}
                onToggleHighlight={toggleHighlight}
              />
              <div className="flex justify-center">
                <AudioPlayer key={sentence.audio.full} src={sentence.audio.full} loopLabel="this sentence" />
              </div>
            </div>
          )}

          {phase === 2 && (
            <div className="space-y-10 text-center">
              <p className="font-arabic text-4xl leading-loose" dir="rtl">
                {sentence.arabic}
              </p>
              <div className="flex justify-center">
                <AudioPlayer key={sentence.audio.full} src={sentence.audio.full} loopLabel="this sentence" />
              </div>
            </div>
          )}

          {phase === 3 && (
            <div className="space-y-8">
              <GlossGrid
                tokens={sentence.gloss}
                englishSentence={sentence.english}
                arabicSentence={sentence.arabic}
                words={sentence.words}
                highlighted={highlighted}
                recall
                revealed={revealed}
                onReveal={() => setRevealed(true)}
              />

              {revealed && (
                <div className="flex justify-center">
                  <AudioPlayer key={sentence.audio.full} src={sentence.audio.full} loopLabel="this sentence" />
                </div>
              )}

              <div className="text-center pt-2">
                {studied ? (
                  <span className="text-sm" style={{ color: "var(--emerald-glow)" }}>
                    ✓ Studied
                  </span>
                ) : (
                  <button
                    onClick={markStudied}
                    className="text-sm underline"
                    style={{ color: "var(--emerald-glow)" }}
                  >
                    Mark Sentence as Studied
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="mt-16 flex justify-between">
            <button onClick={back} className="text-sm" style={{ color: "var(--muted)" }}>
              Back
            </button>
            <button onClick={next} className="text-sm" style={{ color: "var(--emerald-glow)" }}>
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
