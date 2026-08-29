"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProgressBar } from "@/components/ProgressBar";
import { getLesson } from "@/data/lessons";
import { getLessonProgress } from "@/lib/storage";
import { LessonProgress } from "@/lib/types";
import { countDueAndNew, isProgrammeComplete } from "@/lib/srs";

export default function LessonPathPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLesson(lessonId);
  const [progress, setProgress] = useState<LessonProgress | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    if (lesson) setProgress(getLessonProgress(lesson.id, lesson.sentences.map((s) => s.id)));
  }, [lesson]);

  if (!lesson) return null;

  const studiedCount = progress
    ? lesson.sentences.filter((s) => progress.sentences[s.id]?.studied).length
    : 0;
  const allStudied = studiedCount === lesson.sentences.length;

  // A sentence enters review the moment it's individually marked studied —
  // Review is never locked behind finishing every sentence in the lesson.
  const { due, isNew } = progress
    ? countDueAndNew(lesson.sentences.map((s) => progress.review[s.id]))
    : { due: 0, isNew: 0 };
  const anyInReview = progress
    ? lesson.sentences.some((s) => progress.review[s.id]?.inReview)
    : false;
  const reviewFullyComplete = progress
    ? lesson.sentences.every((s) => isProgrammeComplete(progress.review[s.id]))
    : false;

  const progressValue = (studiedCount + (allStudied ? 1 : 0)) / (lesson.sentences.length + 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-md">
          <div className="mb-10">
            <p className="font-arabic text-2xl mb-1">{lesson.title.arabic}</p>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              {lesson.title.english}
            </p>
            <ProgressBar value={progressValue} />
          </div>

          {allStudied ? (
            <p className="mb-8 text-sm" style={{ color: "var(--emerald-glow)" }}>
              Congratulations — you have completed this lesson.
            </p>
          ) : null}

          <ol className="flex flex-col divide-y" style={{ borderColor: "var(--hairline)" }}>
            <PathItem
              href={`/study/${lesson.id}/overview`}
              label="Overview"
              done={Boolean(progress)}
              subdued={false}
            />
            {lesson.sentences.map((s) => (
              <PathItem
                key={s.id}
                href={`/study/${lesson.id}/sentence/${s.id}`}
                label={`Sentence ${s.order}`}
                done={Boolean(progress?.sentences[s.id]?.studied)}
              />
            ))}
            <PathItem
              href={`/study/${lesson.id}/review`}
              label="Review"
              done={reviewFullyComplete}
              subdued={!anyInReview}
              trailing={
                anyInReview ? (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    Due {due} · New {isNew}
                  </span>
                ) : undefined
              }
            />
          </ol>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function PathItem({
  href,
  label,
  done,
  subdued,
  trailing,
}: {
  href: string;
  label: string;
  done: boolean;
  subdued?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between py-4"
        style={{ opacity: subdued ? 0.5 : 1 }}
      >
        <span className="text-[15px]">{label}</span>
        <div className="flex items-center gap-3">
          {trailing}
          {done && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </Link>
    </li>
  );
}
