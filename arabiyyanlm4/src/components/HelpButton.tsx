"use client";

import { useState } from "react";

const FEEDBACK_EMAIL = "admin@ummmujaahid.com";

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="How to use Arabiyyan"
        className="interactive flex h-7 w-7 items-center justify-center rounded-full border text-xs"
        style={{ borderColor: "var(--hairline)", color: "var(--muted)" }}
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto p-6 sm:items-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-10 w-full max-w-xl rounded-2xl border p-8"
            style={{ background: "var(--surface)", borderColor: "var(--hairline)" }}
          >
            <div className="mb-8 flex items-start justify-between">
              <h2 className="text-lg font-medium">How Arabiyyan works</h2>
              <button onClick={() => setOpen(false)} className="interactive" style={{ color: "var(--muted)" }}>
                ✕
              </button>
            </div>

            {/* Why Arabiyyan */}
            <Section title="Why Arabiyyan?">
              <p>
                Many Arabic learners spend years studying grammar, believing that more grammar
                knowledge alone will lead to better comprehension and speaking. 
                the language itself.
              </p>
              <p>
                Real comprehension comes from repeated exposure to Arabic you can actually
                understand. 
              </p>
              <p>
                Arabiyyan aims to make learning Arabic easy(er).
              </p>
            </Section>

            <Section title="Listening">
              <p>
                Lots of Listening .Returning to the same understandable material helps you gradually pick up how
                words sound, how they connect, sentence patterns, and rhythm.
              </p>
         
            </Section>

            <Section title="Texts you actually care about">
              <p>
                Studying can feel like a chore when the material feels disconnected from anything
                you personally want to understand. Arabiyyan is built around texts learners
                genuinely care about(Qur'an , hadeeth, Seerah and other short stories/videos)
              </p>
            </Section>

            <Section title="Consistency and review">
              <p>
                Arabiyyan uses
                spaced repetition to help you review your material.
              </p>
              <p>
                Tracking is awareness, awareness is decisions and decisions are what lead to change. 
The heat map is there to show you how many days you showed up to study Arabic. 

The timer at the top right tracks how many hours you've spent studying in total.
It is said that it takes 10,000 hours to master a skill. Don't worry! The FSI says it takes 2,200 hours to get fluent in Arabic. 
              </p>
            </Section>

            {/* How to complete your initial study session */}
            <Section title="How to complete your initial study session">
              <ol className="list-decimal space-y-2.5 pl-4">
                <li>
                  <b>Open the lesson.</b> From the home screen, click the lesson in the centre.
                </li>
                <li>
                  <b>Start with the Overview.</b> On the first page, read the passage in English
                  once or twice ( just to get the general meaning)
                </li>
                <li>
                  <b>Connect the meaning with the Arabic.</b> On the second page, read English and
                  Arabic together while listening. Repeat the audio 2-3 times and follow the text or repeat as much as you like.
                </li>
                <li>
                  <b></b> On the third page, Read the Arabic by itself(once or twice is okay)
                  notice how much you already recognise.
                </li>
                <li>
                </li>
                <li>
                  <b>Study Sentence 1.</b> In Phase 1(read the study instructions there)
                </li>
                <li>
                  <b>Try without the support.</b> In Phase 2,(read the study instructions there)
                </li>
                <li>
                  <b>Recall the Arabic.</b> In Phase 3(read the study instructions there)
                </li>
                <li>
                  <b>When you go through all three phases of a lesson/sentence, you can mark it as studied and it will go to the review section.If you study a sentence in the morning you can go to the review section in the evening to see if you recall what you studied.</b> You will be shown the English version and asked to say it in Arabic, the sentence will be shown to you again based on your answer using spaced repetition
                </li>
                <li>
                  <b>Review your sentences.</b> Once studied, a sentence enters Review. Check in
                  regularly — you won&rsquo;t always have something due, and that&rsquo;s normal. When a
                  card appears, recall it before revealing the answer, then grade yourself
                  honestly: Forgot, Difficult, or Remembered.
                </li>
              </ol>
              <p className="pt-3" style={{ color: "var(--muted-dim)" }}>
                If you&rsquo;re not studying a new sentence, go to the Review section and test yourself on
                the sentences you&rsquo;ve already studied. New review cards appear automatically as you study.
              </p>
            </Section>

            <Section title="The timer">
              <p>
                The number in the top-right is your total active study time. It pauses when you
                leave the tab
              </p>
            </Section>

            <Section title="The heatmap">
              <p>
                The heatmap shows which days you&rsquo;ve studied, so you can notice your own
                consistency. 
              </p>
            </Section>

            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--hairline)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-dim)" }}>
                This is an early sample of what we hope Arabiyyan becomes. If you have feedback or
                ideas, we&rsquo;d genuinely like to hear them —{" "}
                <a href={`mailto:${FEEDBACK_EMAIL}`} className="underline" style={{ color: "var(--muted)" }}>
                  {FEEDBACK_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h3 className="mb-2 text-sm font-medium" style={{ color: "var(--emerald-glow)" }}>
        {title}
      </h3>
      <div className="space-y-2.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {children}
      </div>
    </section>
  );
}
