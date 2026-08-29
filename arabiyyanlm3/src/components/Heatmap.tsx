"use client";

import { useEffect, useState } from "react";
import { loadState, todayKey } from "@/lib/storage";

// 60-day rolling window of overall study consistency (not tied to any one
// lesson's ~30-day review/mastery cycle).
const TOTAL_DAYS = 60;

function buildGrid(studiedDays: Record<string, boolean>) {
  const days: { date: string; studied: boolean }[] = [];
  const today = new Date();
  for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    days.push({ date: key, studied: Boolean(studiedDays[key]) });
  }
  // Group into columns of 7 (weeks)
  const weeks: { date: string; studied: boolean }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function Heatmap() {
  const [weeks, setWeeks] = useState<{ date: string; studied: boolean }[][]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    setWeeks(buildGrid(loadState().heatmap));
  }, []);

  if (weeks.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                title={day.date}
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{
                  background: day.studied ? "var(--emerald)" : "var(--hairline)",
                  opacity: day.date === todayKey() && !day.studied ? 0.6 : 1,
                  outline: day.date === todayKey() ? "1px solid var(--muted-dim)" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-[11px]" style={{ color: "var(--muted-dim)" }}>
        You&rsquo;ve been coming back.
      </p>
    </div>
  );
}
