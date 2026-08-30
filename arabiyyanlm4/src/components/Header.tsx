"use client";

import Link from "next/link";
import { useStudyTimer } from "@/lib/useStudyTimer";
import { HelpButton } from "./HelpButton";

export function Header() {
  const { formatted } = useStudyTimer();

  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-10">
      <Link
        href="/"
        className="interactive-lg font-arabic text-2xl tracking-wide inline-block"
        style={{ color: "var(--foreground)" }}
      >
        عَرَبِيًّا
      </Link>
      <div className="flex items-center gap-4">
        <span
          className="text-xs tabular-nums tracking-wider"
          style={{ color: "var(--muted-dim)" }}
          title="Total active study time"
        >
          {formatted}
        </span>
        <HelpButton />
      </div>
    </header>
  );
}
