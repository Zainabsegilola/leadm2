"use client";

import Link from "next/link";
import { Lesson } from "@/lib/types";

export function LessonBook({ lesson }: { lesson: Lesson }) {
  return (
    <Link
      href={`/study/${lesson.id}`}
      className="group flex flex-col items-center gap-6 rounded-2xl px-10 py-12 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 48 48"
        fill="none"
        className="transition-all duration-300 group-hover:scale-[1.03]"
        style={{
          filter: "drop-shadow(0 0 14px var(--emerald-dim))",
        }}
      >
        <path
          d="M8 8c4 0 7 1 8 3v26c-1-2-4-3-8-3V8Z"
          stroke="var(--emerald-glow)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M40 8c-4 0-7 1-8 3v26c1-2 4-3 8-3V8Z"
          stroke="var(--emerald-glow)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M16 11v26" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="1" />
      </svg>

      <div className="text-center">
        <p className="font-arabic text-3xl mb-2 leading-relaxed" style={{ color: "var(--foreground)" }}>
          {lesson.title.arabic}
        </p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {lesson.title.english}
        </p>
      </div>
    </Link>
  );
}
