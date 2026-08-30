// ============================================================================
// Arabiyyan — core content & progress types
//
// Everything the app renders is derived from a `Lesson` object. To add a new
// lesson in the future you only need to create a new file in `src/data/lessons`
// that matches this shape (plus the matching audio files) and register it in
// `src/data/lessons/index.ts`. No component code needs to change.
// ============================================================================

export interface WordInfo {
  /** The Arabic word exactly as it appears in the sentence (with harakat). */
  surface: string;
  /** The three-letter (or more) root, e.g. "ش ف ي" */
  root?: string;
  /** Short plain-English meaning of the word in this context. */
  meaning: string;
  /** How the word is functioning in this specific sentence. */
  usageNote?: string;
  /** Other words built from the same root, or close synonyms. */
  relatedWords?: string[];
  /** A short example sentence using the word, with translation. */
  example?: { arabic: string; english: string };
}

export interface GlossToken {
  /** The Arabic surface form of this token, in reading order. */
  arabic: string;
  /** A short word-for-word gloss shown beneath the token in Phase 1. */
  gloss: string;
  /** Optional link into the detailed word-info table (defaults to `arabic`). */
  wordInfoKey?: string;
}

export interface Sentence {
  id: string; // e.g. "s1"
  order: number; // 1-indexed position in the lesson
  arabic: string; // full sentence, fully diacritized
  english: string; // natural English translation
  /** Word-by-word gloss tokens, left-to-right in Arabic reading order. */
  gloss: GlossToken[];
  /** Detailed info for any word worth explaining, keyed by the Arabic surface form. */
  words: Record<string, WordInfo>;
  audio: {
    full: string; // path to this sentence's own audio file
  };
}

export interface Lesson {
  id: string; // e.g. "fi-al-asal-shifa"
  title: { arabic: string; english: string };
  sentences: Sentence[];
  audio: {
    fullPassage: string;
  };
}

// ----------------------------------------------------------------------------
// Progress / study-state types (persisted locally, structured so a future
// account-sync backend can adopt the same shape).
// ----------------------------------------------------------------------------

export type StudyPhase = 1 | 2 | 3;

export interface SentenceProgress {
  /** True once the learner has pressed "Mark Sentence as Studied" at least once. */
  studied: boolean;
}

export type ReviewGrade = "forgot" | "difficult" | "remembered";

export interface ReviewState {
  /**
   * True once this sentence has entered the SRS system. A sentence enters
   * exactly once (when first marked studied) and stays `inReview: true`
   * forever after — restudying the phases never touches this again.
   */
  inReview: boolean;
  /** ISO date string the sentence next becomes due. Undefined = not yet scheduled. */
  due?: string;
  intervalDays: number;
  lastGrade?: ReviewGrade;
  isNew: boolean;
  reviewsCompleted: number;
}

export interface LessonProgress {
  lessonId: string;
  sentences: Record<string, SentenceProgress>; // key = sentence id
  review: Record<string, ReviewState>; // key = sentence id
  highlightedWords: string[]; // words the learner marked "don't know" (Arabic surface forms)
  notes: string;
  startedAt?: string;
  completedAt?: string;
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  studied: boolean;
}

export interface AppState {
  schemaVersion: 1;
  email?: string;
  totalStudySeconds: number;
  heatmap: Record<string, boolean>; // date string -> studied
  lessons: Record<string, LessonProgress>;
}
