"use client";

import { Fragment, use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { PassageAudioPlayer, PassageAudioHandle } from "@/components/PassageAudioPlayer";
import { SentenceQuickSelect } from "@/components/SentenceQuickSelect";
import { PromptSuggestions } from "@/components/PromptSuggestions";
import { getLesson } from "@/data/lessons";
import { getLessonProgress, saveLessonProgress } from "@/lib/storage";
import { LessonProgress } from "@/lib/types";

type Page = 1 | 2 | 3;
const PAGE_LABELS: Record<Page, string> = {
  1: "Meaning",
  2: "Meaning + Arabic",
  3: "Arabic",
};

export default function OverviewPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLesson(lessonId);
  const router = useRouter();

  const [page, setPage] = useState<Page>(1);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [notes, setNotes] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const audioRef = useRef<PassageAudioHandle>(null);

  useEffect(() => {
    if (!lesson) return;
    const p = getLessonProgress(lesson.id, lesson.sentences.map((s) => s.id));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    setProgress(p);
    setNotes(p.notes);
  }, [lesson]);

  if (!lesson) return null;

  const highlighted = new Set(progress?.highlightedWords ?? []);

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

  function saveNotes(value: string) {
    setNotes(value);
    if (!progress) return;
    const updated = { ...progress, notes: value };
    setProgress(updated);
    saveLessonProgress(updated);
  }

  const audioItems = [
    { key: "full", src: lesson.audio.fullPassage, label: "Full passage" },
    ...lesson.sentences.map((s) => ({ key: s.id, src: s.audio.full, label: `Sentence ${s.order}` })),
  ];

  function renderArabicWords(arabic: string) {
    return arabic.split(" ").map((word, i) => (
      <button
        key={i}
        onClick={(e) => {
          e.stopPropagation();
          toggleHighlight(word);
        }}
        className="interactive font-arabic px-0.5 transition-colors"
        style={{ color: highlighted.has(word) ? "var(--danger)" : "var(--foreground)" }}
      >
        {word}
      </button>
    ));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 pb-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => router.push(`/study/${lesson.id}`)}
            className="interactive hover-emerald mb-6 text-xs"
            style={{ color: "var(--muted)" }}
          >
            ← Lesson
          </button>

          <div className="mb-10 flex justify-center gap-8 border-b" style={{ borderColor: "var(--hairline)" }}>
            {([1, 2, 3] as Page[]).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="interactive hover-emerald pb-3 text-sm"
                style={{
                  color: page === p ? "var(--foreground)" : "var(--muted-dim)",
                  borderBottom: page === p ? "2px solid var(--emerald)" : "2px solid transparent",
                }}
              >
                {PAGE_LABELS[p]}
              </button>
            ))}
          </div>

          {/* PAGE 1 — English only: establish the gist before any Arabic appears. */}
          {page === 1 && (
            <div className="mx-auto max-w-xl space-y-5">
              {lesson.sentences.map((s) => (
                <p key={s.id} className="text-lg leading-relaxed">
                  {s.english}
                </p>
              ))}
              <p className="pt-4 text-xs" style={{ color: "var(--muted-dim)" }}>
                Read it once or twice to get the general gist — what is this passage talking about? You don&rsquo;t
                need a perfect, word-for-word translation yet.
              </p>
            </div>
          )}

          {/* PAGE 2 — English and Arabic together, with correspondence highlighting. */}
          {page === 2 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {lesson.sentences.map((s, i) => {
                  const isHovered = hoveredIndex === i;
                  const blockStyle = {
                    background: isHovered ? "var(--emerald-dim)" : "transparent",
                    borderRadius: "0.5rem",
                  };
                  return (
                    <Fragment key={s.id}>
                      <div
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="px-3 py-2 transition-colors"
                        style={blockStyle}
                      >
                        <p className="text-base leading-relaxed">{s.english}</p>
                      </div>
                      <div
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => audioRef.current?.play(s.id)}
                        className="cursor-pointer px-3 py-2 transition-colors"
                        dir="rtl"
                        style={blockStyle}
                      >
                        <p className="font-arabic text-2xl leading-loose">
                          {renderArabicWords(s.arabic)}
                        </p>
                      </div>
                    </Fragment>
                  );
                })}
              </div>

              <p className="text-center text-xs" style={{ color: "var(--muted-dim)" }}>
                Hover a sentence to see its match on the other side. Tap to the left of the Arabic sentence to
                hear its audio.
              </p>

              <div className="flex flex-col items-center gap-4">
                <PassageAudioPlayer ref={audioRef} items={audioItems} />
                <SentenceQuickSelect audioRef={audioRef} sentences={lesson.sentences} />
              </div>
            </div>
          )}

          {/* PAGE 3 — Arabic only. */}
          {page === 3 && (
            <div className="mx-auto max-w-2xl space-y-10">
              <div className="space-y-6" dir="rtl">
                {lesson.sentences.map((s) => (
                  <p
                    key={s.id}
                    onClick={() => audioRef.current?.play(s.id)}
                    className="sentence-tap font-arabic cursor-pointer text-3xl leading-loose px-3 py-2"
                  >
                    {renderArabicWords(s.arabic)}
                  </p>
                ))}
              </div>
              <p className="text-center text-xs" style={{ color: "var(--muted-dim)" }}>
                Tap to the left of a sentence to hear it. Tap a word to mark it red — &ldquo;I don&rsquo;t know
                this yet.&rdquo;
              </p>
              <div className="flex flex-col items-center gap-4">
                <PassageAudioPlayer ref={audioRef} items={audioItems} />
                <SentenceQuickSelect audioRef={audioRef} sentences={lesson.sentences} />
              </div>
            </div>
          )}

          <div className="mx-auto mt-14 max-w-xl">
            <h3 className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
              Notes &amp; questions
            </h3>
            <textarea
              value={notes}
              onChange={(e) => saveNotes(e.target.value)}
              placeholder="Grammar questions, vocabulary you want to look into, anything unclear…"
              rows={4}
              className="w-full rounded-lg border bg-transparent p-3 text-sm outline-none"
              style={{ borderColor: "var(--hairline)" }}
            />
            <PromptSuggestions />
          </div>
        </div>
      </main>
    </div>
  );
}
