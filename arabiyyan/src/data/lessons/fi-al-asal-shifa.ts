import { Lesson } from "@/lib/types";

// ============================================================================
// SAMPLE CONTENT — replace with your real sentences, glosses, word info and
// audio file paths. See README.md → "Adding your lesson content" for the
// exact steps. The four sentences below exist only so the app has something
// real to render while you build out your own material.
// ============================================================================

export const fiAlAsalShifa: Lesson = {
  id: "fi-al-asal-shifa",

  title: {
    arabic: "فِي العَسَلِ شِفَاءٌ",
    english: "There is healing in honey.",
  },

  audio: {
    fullPassage: "/audio/fi-al-asal-shifa/full-passage.mp3",
  },

  sentences: [
    // ========================================================================
    // SENTENCE 1
    // ========================================================================
    {
      id: "s1",
      order: 1,

      arabic: "فِي العَسَلِ شِفَاءٌ",
      english: "There is healing in honey.",

      gloss: [
        { arabic: "فِي", gloss: "in" },
        { arabic: "ال-عَسَلِ", gloss: "the-honey" },
        { arabic: "شِفَاءٌ", gloss: "(a) healing" },
      ],

      words: {},

      audio: {
        full: "/audio/fi-al-asal-shifa/sentence-1.mp3",
      },
    },

    // ========================================================================
    // SENTENCE 2
    // ========================================================================
    {
      id: "s2",
      order: 2,

      arabic: "أَمَرِيضٌ أَنْتَ؟",
      english: "Are you ill?",

      gloss: [
        { arabic: "أَ", gloss: "are?" },
        { arabic: "مَرِيضٌ", gloss: "sick" },
        { arabic: "أَنْتَ", gloss: "you" },
      ],

      words: {},

      audio: {
        full: "/audio/fi-al-asal-shifa/sentence-2.mp3",
      },
    },

    // ========================================================================
    // SENTENCE 3
    // ========================================================================
    {
      id: "s3",
      order: 3,

      arabic: "نَعَمْ، أَشْعُرُ بِآلامٍ شَدِيدَةٍ فِي بَطْنِي",
      english: "Yes, I feel a severe pain in my stomach.",

      gloss: [
        { arabic: "نَعَمْ", gloss: "yes" },
        { arabic: "أَشْعُرُ", gloss: "I-feel" },
        { arabic: "بِ-آلامٍ", gloss: "with-pains" },
        { arabic: "شَدِيدَةٍ", gloss: "severe" },
        { arabic: "فِي", gloss: "in" },
        { arabic: "بَطْن-ي", gloss: "my-stomach" },
      ],

      words: {},

      audio: {
        full: "/audio/fi-al-asal-shifa/sentence-3.mp3",
      },
    },

    // ========================================================================
    // SENTENCE 4
    // ========================================================================
    {
      id: "s4",
      order: 4,

      arabic: "هَلْ ذَهَبْتَ إِلَى الطَّبِيبِ؟!",
      english: "Have you gone to the doctor?!",

      gloss: [
        { arabic: "هَلْ", gloss: "did?" },
        { arabic: "ذَهَبْ-تَ", gloss: "you-went" },
        { arabic: "إِلَى", gloss: "to" },
        { arabic: "ال-طَّبِيبِ", gloss: "the-doctor" },
      ],

      words: {},

      audio: {
        full: "/audio/fi-al-asal-shifa/sentence-4.mp3",
      },
    },
  ],
};