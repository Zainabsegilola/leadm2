// ============================================================================
// A small, deliberately simple spaced-repetition scheduler.
//
// This is NOT a full Anki-style algorithm (no ease factors, no fuzzing). The
// brief for Arabiyyan asks specifically for something understandable that
// reliably carries a learner through ~30 days on a four-sentence passage —
// so we use a short, fixed sequence of intervals per grade instead.
// ============================================================================

import { ReviewGrade, ReviewState } from "./types";

// Interval (in days) to wait after each successive "remembered" grade.
// A sentence graded "remembered" enough times exceeds 30 days, which is
// treated as the lesson's review programme being complete for that sentence.
const REMEMBERED_STEPS = [1, 3, 7, 14, 30];

export const PROGRAMME_LENGTH_DAYS = 30;

export function gradeReview(state: ReviewState, grade: ReviewGrade, now: Date = new Date()): ReviewState {
  let intervalDays: number;

  if (grade === "forgot") {
    // Reset — come back tomorrow and get more repetition.
    intervalDays = 1;
  } else if (grade === "difficult") {
    // Come back relatively soon, but a little further than a fresh reset.
    intervalDays = Math.max(2, Math.round(state.intervalDays * 1.3) || 2);
  } else {
    // "remembered" — move to the next, longer step.
    const currentStepIndex = REMEMBERED_STEPS.indexOf(state.intervalDays);
    const nextStep =
      currentStepIndex >= 0 && currentStepIndex < REMEMBERED_STEPS.length - 1
        ? REMEMBERED_STEPS[currentStepIndex + 1]
        : REMEMBERED_STEPS[0];
    intervalDays = state.intervalDays === 0 ? REMEMBERED_STEPS[0] : nextStep;
  }

  const due = new Date(now);
  due.setDate(due.getDate() + intervalDays);

  return {
    inReview: true,
    intervalDays,
    due: due.toISOString(),
    lastGrade: grade,
    isNew: false,
    reviewsCompleted: state.reviewsCompleted + 1,
  };
}

export function isDue(state: ReviewState, now: Date = new Date()): boolean {
  if (!state.inReview) return false; // not yet studied — not part of the review system at all
  if (state.isNew) return false; // "new" cards are counted separately, not "due"
  if (!state.due) return true;
  return new Date(state.due).getTime() <= now.getTime();
}

export function isProgrammeComplete(state: ReviewState): boolean {
  return (
    state.inReview &&
    !state.isNew &&
    state.intervalDays >= PROGRAMME_LENGTH_DAYS &&
    state.lastGrade === "remembered"
  );
}

export function countDueAndNew(states: ReviewState[], now: Date = new Date()) {
  const due = states.filter((s) => s.inReview && !s.isNew && isDue(s, now)).length;
  const isNew = states.filter((s) => s.inReview && s.isNew).length;
  return { due, isNew };
}
