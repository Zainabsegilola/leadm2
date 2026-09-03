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
    arabic: "فِي الْعَسَلِ شِفَاءٌ",
    english: "In Honey There Is Healing",
  },
  audio: {
    fullPassage: "/audio/fi-al-asal-shifa/full-passage.mp3",
  },
  sentences: [
    {
      id: "s1",
      order: 1,
      arabic: "فِي الْعَسَلِ شِفَاءٌ لِلنَّاسِ",
      english: "In honey there is healing for people.",
      gloss: [
        { arabic: "فِي", gloss: "in" },
        { arabic: "الْعَسَلِ", gloss: "the-honey" },
        { arabic: "شِفَاءٌ", gloss: "healing" },
        { arabic: "لِلنَّاسِ", gloss: "for-the-people" },
      ],
      words: {
        "الْعَسَلِ": {
          surface: "الْعَسَلِ",
          root: "ع س ل",
          meaning: "honey",
          usageNote: "Definite noun in the genitive case, following the preposition في (in).",
          relatedWords: ["عَسَّال (beekeeper)"],
          example: { arabic: "أُحِبُّ الْعَسَلَ كَثِيرًا", english: "I love honey a lot." },
        },
        "شِفَاءٌ": {
          surface: "شِفَاءٌ",
          root: "ش ف ي",
          meaning: "healing / a cure",
          usageNote: "Indefinite noun, the subject of the sentence (grammatically, what 'exists' in the honey).",
          relatedWords: ["يَشْفِي (he heals)", "شَافٍ (healer / curing)"],
          example: { arabic: "طَلَبْتُ الشِّفَاءَ مِنَ اللهِ", english: "I asked God for healing." },
        },
        "لِلنَّاسِ": {
          surface: "لِلنَّاسِ",
          root: "ن و س",
          meaning: "for the people",
          usageNote: "لِ (for) + النَّاس (the people), contracted together.",
        },
      },
      audio: { full: "/audio/fi-al-asal-shifa/sentence-1.mp3" },
    },
    {
      id: "s2",
      order: 2,
      arabic: "النَّحْلُ يَصْنَعُ الْعَسَلَ مِنَ الزُّهُورِ",
      english: "Bees make honey from flowers.",
      gloss: [
        { arabic: "النَّحْلُ", gloss: "the-bees" },
        { arabic: "يَصْنَعُ", gloss: "makes" },
        { arabic: "الْعَسَلَ", gloss: "the-honey" },
        { arabic: "مِنَ", gloss: "from" },
        { arabic: "الزُّهُورِ", gloss: "the-flowers" },
      ],
      words: {
        "النَّحْلُ": {
          surface: "النَّحْلُ",
          root: "ن ح ل",
          meaning: "bees (collective noun)",
          usageNote: "Subject of the sentence — refers to bees as a group, not one bee.",
        },
        "يَصْنَعُ": {
          surface: "يَصْنَعُ",
          root: "ص ن ع",
          meaning: "makes / manufactures",
          usageNote: "Present-tense verb, third person masculine — matches النَّحْلُ.",
          relatedWords: ["صَنْعَة (a craft)", "مَصْنَع (a factory)"],
          example: { arabic: "هُوَ يَصْنَعُ كُرْسِيًّا", english: "He is making a chair." },
        },
        "الزُّهُورِ": {
          surface: "الزُّهُورِ",
          root: "ز ه ر",
          meaning: "flowers",
          usageNote: "Plural of زَهْرَة (a flower), genitive after مِنَ (from).",
        },
      },
      audio: { full: "/audio/fi-al-asal-shifa/sentence-2.mp3" },
    },
    {
      id: "s3",
      order: 3,
      arabic: "يَأْكُلُ النَّاسُ الْعَسَلَ لِلصِّحَّةِ",
      english: "People eat honey for their health.",
      gloss: [
        { arabic: "يَأْكُلُ", gloss: "eats" },
        { arabic: "النَّاسُ", gloss: "the-people" },
        { arabic: "الْعَسَلَ", gloss: "the-honey" },
        { arabic: "لِلصِّحَّةِ", gloss: "for-the-health" },
      ],
      words: {
        "يَأْكُلُ": {
          surface: "يَأْكُلُ",
          root: "أ ك ل",
          meaning: "eats",
          usageNote: "Present-tense verb, third person — here used with a plural subject (النَّاسُ).",
        },
        "لِلصِّحَّةِ": {
          surface: "لِلصِّحَّةِ",
          root: "ص ح ح",
          meaning: "for health",
          usageNote: "لِ (for) + الصِّحَّة (the health).",
          relatedWords: ["صَحِيح (correct / healthy)"],
        },
      },
      audio: { full: "/audio/fi-al-asal-shifa/sentence-3.mp3" },
    },
    {
      id: "s4",
      order: 4,
      arabic: "الْعَسَلُ حُلْوٌ وَمُفِيدٌ جِدًّا",
      english: "Honey is sweet and very beneficial.",
      gloss: [
        { arabic: "الْعَسَلُ", gloss: "the-honey" },
        { arabic: "حُلْوٌ", gloss: "sweet" },
        { arabic: "وَ", gloss: "and" },
        { arabic: "مُفِيدٌ", gloss: "beneficial" },
        { arabic: "جِدًّا", gloss: "very" },
      ],
      words: {
        "حُلْوٌ": {
          surface: "حُلْوٌ",
          root: "ح ل و",
          meaning: "sweet",
          usageNote: "Adjective describing الْعَسَلُ (masculine, matches in gender).",
        },
        "مُفِيدٌ": {
          surface: "مُفِيدٌ",
          root: "ف ي د",
          meaning: "useful / beneficial",
          relatedWords: ["فَائِدَة (a benefit)"],
          example: { arabic: "هَذَا الْكِتَابُ مُفِيدٌ", english: "This book is useful." },
        },
        "جِدًّا": {
          surface: "جِدًّا",
          root: "ج د د",
          meaning: "very / greatly",
          usageNote: "An adverb placed after the adjective it intensifies.",
        },
      },
      audio: { full: "/audio/fi-al-asal-shifa/sentence-4.mp3" },
    },
  ],
};
