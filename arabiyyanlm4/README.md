# Arabiyyan

A calm, focused web app for studying one real Arabic passage deeply — understand it, listen to it, recall it, and keep it over 30 days. Built as a free lead-magnet experience for the Arabiyyan brand.

Live concept: **one lesson, four sentences** (`فِي الْعَسَلِ شِفَاءٌ` — "In Honey There Is Healing"), studied through a 3-phase flow per sentence, then reviewed with a simple spaced-repetition system.

---

## 1. Tech stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- No database, no auth provider — study progress lives in the browser's `localStorage`
- Deploys straight to **Vercel**

Why this stack: it's the most mainstream, well-supported combination for a project you'll keep extending, and it deploys to Vercel with zero configuration.

---

## 2. Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. You'll land on the email-gate screen — enter any email to get into the study experience (see §5 for wiring this up to a real email provider).

To type-check and lint before committing:

```bash
npm run lint
npm run build
```

---

## 3. Project structure

```
src/
  app/
    page.tsx                        Home screen (book + heatmap)
    layout.tsx                      Root layout, fonts, email gate
    study/[lessonId]/page.tsx       Vertical lesson path (Overview -> S1-S4 -> Review)
    study/[lessonId]/overview/      Overview: English/Arabic tabs, highlighting, notes
    study/[lessonId]/sentence/[sentenceId]/   3-phase study flow for one sentence
    study/[lessonId]/review/        Flashcard review + spaced repetition
    listen/[lessonId]/              Distraction-free listening screen
    api/subscribe/route.ts          Placeholder email-capture endpoint
  components/                       Reusable UI: Header, BottomNav, AudioPlayer,
                                     WordPopover, Heatmap, LessonBook, HelpButton, etc.
  data/lessons/
    fi-al-asal-shifa.ts             THIS is where your real lesson content lives
    index.ts                        Registry - add new lessons here
  lib/
    types.ts                        All content & progress types (single source of truth)
    storage.ts                      localStorage read/write - the ONLY file that talks
                                     to storage. Swap this later for a real backend.
    srs.ts                          The spaced-repetition scheduler
    useStudyTimer.ts                Active-time study timer hook
public/audio/fi-al-asal-shifa/      Your audio files go here
```

The app is intentionally **data-driven**: every screen renders from the `Lesson` object in `src/data/lessons/`. Nothing about a specific sentence is hard-coded into a component.

---

## 4. Adding your real lesson content

Open `src/data/lessons/fi-al-asal-shifa.ts`. Everything you need to replace is in one file:

1. **`title`** - the Arabic/English title shown on the home screen.
2. **`sentences`** - an array of 4 (or however many you want) sentence objects:
   - `arabic` - the fully diacritized sentence.
   - `english` - the natural translation.
   - `gloss` - an array of `{ arabic, gloss }` word tokens, in reading order, for the word-by-word breakdown shown in Phase 1.
   - `words` - a lookup table (keyed by the exact Arabic surface form) of the detailed word-info card: root, meaning, usage note, related words, and an example sentence. You don't need an entry for every word - only the ones worth explaining.
   - `audio.full` - the path to that sentence's audio file (see §5).
3. **`audio.fullPassage`** - the path to the full-passage recording.

To add a **second lesson** later: copy this file, give it a new `id`, fill in your content, then register it in `src/data/lessons/index.ts`. The home screen currently shows the first registered lesson; when you're ready to support multiple lessons on the home screen, that's a small, contained change to `src/app/page.tsx`.

---

## 5. Adding your audio files

Drop your recordings into:

```
public/audio/fi-al-asal-shifa/
  full-passage.mp3
  sentence-1.mp3
  sentence-2.mp3
  sentence-3.mp3
  sentence-4.mp3
```

The lesson data already points at these exact paths. Until a file exists, the audio player quietly shows "Audio not added yet" instead of breaking.

**No text-to-speech is used anywhere** - every audio control expects a real recording.

---

## 6. Connecting a real email provider

Right now, `src/app/api/subscribe/route.ts` just logs the email address to the server console - it's a placeholder so the access-gate form has somewhere real to submit to.

To wire it up to (for example) ConvertKit, Mailchimp, or Beehiiv:

1. Get an API key from your provider and add it in Vercel under **Project Settings -> Environment Variables** (never commit it to the repo).
2. Replace the body of the `POST` handler in `route.ts` with a `fetch` call to that provider's subscribe endpoint. There's a commented example already in the file.

The learner still gets into the study experience even if this call fails - email capture is a bonus, not a blocker, for Version 1.

---

## 7. How progress is stored

All study state (phase completion, review scheduling, heatmap, notes, highlighted words, total study time) lives in a single `localStorage` key (`arabiyyan:v1`), managed entirely through `src/lib/storage.ts`.

This is deliberate: if you later add accounts and cloud sync, you only need to change the functions in that one file (e.g. swap `localStorage.getItem` for an API call) - every page and component that calls `getLessonProgress()`, `saveLessonProgress()`, etc. stays exactly the same.

---

## 8. Uploading to GitHub

```bash
cd arabiyyan
git init
git add .
git commit -m "Initial Arabiyyan build"
git branch -M main
git remote add origin https://github.com/<your-username>/arabiyyan.git
git push -u origin main
```

---

## 9. Deploying on Vercel

1. Go to https://vercel.com/new and import the GitHub repo you just pushed.
2. Leave the framework preset on **Next.js** - Vercel detects it automatically.
3. Add any environment variables (e.g. your email provider's API key) under **Environment Variables** before deploying.
4. Click **Deploy**. Vercel will give you a live URL immediately, and redeploy automatically on every push to `main`.

---

## 10. What's deliberately NOT built yet (see the spec for why)

- No user accounts or cloud sync - progress is per-device by design for V1.
- No AI/chat answers to learner questions (the Notes area is structured so this can be added later without a rewrite).
- No additional lessons, vocabulary cards, or verb drills.
- No gamification - no streaks, points, or badges.

Adding any of these later should mean *adding* files (a new lesson, a new component), not rewriting what's here.
