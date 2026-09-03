// ============================================================================
// Persistence layer.
//
// Everything goes through this one module. Today it reads/writes
// window.localStorage. If Arabiyyan later gets accounts + cloud sync, only
// this file needs to change (e.g. swap the two functions below for API
// calls) — every component that calls `loadState` / `saveState` /
// `getLessonProgress` etc. stays the same.
// ============================================================================

import { AppState, LessonProgress, ReviewState, SentenceProgress } from "./types";

const STORAGE_KEY = "arabiyyan:v1";

function emptyState(): AppState {
  return {
    schemaVersion: 1,
    totalStudySeconds: 0,
    heatmap: {},
    lessons: {},
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as AppState;
    // Defensive merge in case older/newer shapes are missing fields.
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable (private browsing etc). Fail silently —
    // studying still works, it just won't persist between visits.
  }
}

export function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function markStudiedToday(): void {
  const state = loadState();
  state.heatmap[todayKey()] = true;
  saveState(state);
}

export function addStudySeconds(seconds: number): void {
  if (seconds <= 0) return;
  const state = loadState();
  state.totalStudySeconds += seconds;
  saveState(state);
}

function emptySentenceProgress(): SentenceProgress {
  return { studied: false };
}

function emptyReviewState(): ReviewState {
  return { inReview: false, intervalDays: 0, isNew: false, reviewsCompleted: 0 };
}

/**
 * The ONLY place a sentence is allowed to enter the SRS system. Safe to call
 * repeatedly — if the sentence is already studied, this is a no-op, so
 * restudying Phases 1-3 as many times as the learner wants never creates a
 * duplicate review card.
 */
export function markSentenceStudied(progress: LessonProgress, sentenceId: string): LessonProgress {
  const already = progress.sentences[sentenceId]?.studied;
  if (already) return progress;

  return {
    ...progress,
    sentences: {
      ...progress.sentences,
      [sentenceId]: { studied: true },
    },
    review: {
      ...progress.review,
      [sentenceId]: { inReview: true, isNew: true, intervalDays: 0, reviewsCompleted: 0 },
    },
  };
}

export function getLessonProgress(lessonId: string, sentenceIds: string[]): LessonProgress {
  const state = loadState();
  const existing = state.lessons[lessonId];
  if (existing) return existing;
  const fresh: LessonProgress = {
    lessonId,
    sentences: Object.fromEntries(sentenceIds.map((id) => [id, emptySentenceProgress()])),
    review: Object.fromEntries(sentenceIds.map((id) => [id, emptyReviewState()])),
    highlightedWords: [],
    notes: "",
  };
  return fresh;
}

export function saveLessonProgress(progress: LessonProgress): void {
  const state = loadState();
  state.lessons[progress.lessonId] = progress;
  saveState(state);
}

export function setEmail(email: string): void {
  const state = loadState();
  state.email = email;
  saveState(state);
}

export function hasAccess(): boolean {
  const state = loadState();
  return Boolean(state.email);
}
