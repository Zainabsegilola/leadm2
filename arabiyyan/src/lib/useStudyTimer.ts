"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { addStudySeconds, loadState, markStudiedToday } from "./storage";

function formatSeconds(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * Tracks total study time across the whole app session (persisted), only
 * while the tab is visible and focused. On unmount / tab hide / blur, the
 * accumulated seconds are flushed to storage.
 */
export function useStudyTimer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const pendingSeconds = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const flush = useCallback(() => {
    if (pendingSeconds.current > 0) {
      addStudySeconds(pendingSeconds.current);
      markStudiedToday();
      pendingSeconds.current = 0;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    setTotalSeconds(loadState().totalStudySeconds);

    const isActive = () => document.visibilityState === "visible" && document.hasFocus();

    const tick = () => {
      if (isActive()) {
        pendingSeconds.current += 1;
        setTotalSeconds((t) => t + 1);
        // Flush periodically so a crash/close doesn't lose much progress.
        if (pendingSeconds.current >= 15) flush();
      }
    };

    tickRef.current = setInterval(tick, 1000);

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") flush();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", flush);
    window.addEventListener("beforeunload", flush);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", flush);
      window.removeEventListener("beforeunload", flush);
      flush();
    };
  }, [flush]);

  return { totalSeconds, formatted: formatSeconds(totalSeconds) };
}
