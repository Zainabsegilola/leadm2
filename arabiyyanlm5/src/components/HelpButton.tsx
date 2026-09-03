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
        className="interactive flex h-9 w-9 items-center justify-center rounded-full border text-sm"
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
                Arabiyyan aims to make learning Arabic easy.
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
                genuinely care about(Qur&rsquo;an , hadeeth, Seerah and other short stories/videos)
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

The timer at the top right tracks how many hours you&rsquo;ve spent studying in total.
It is said that it takes 10,000 hours to master a skill. Don&rsquo;t worry! The FSI says it takes 2,200 hours to get fluent in Arabic. 
              </p>
            </Section>
 <Section title="Study Steps">
              <p className="whitespace-pre-line">
                1. Click the green book Icon in the centre of the page or the study tab
2.Click Overview: Here you see the short passage in English first, then Arabic+ English then Arabic. There are instructions on each page on what to do.
3. Click on Sentence 1. You will be taken to phase 1 which is the Arabic text broken down word by word with its audio and translation. This is the most important phase for beginners. You need to do lots and lots of listening. This helps you subconsciously acquire grammar.
4. Each phase has a set of Instructions. Make sure to follow them. You can always do more reps if you need to. More not less.
6. After going through the learning phases for a sentence, you can either go to the next sentences or come back tomorrow
7. After you complete the learning phases for a sentence , It will appear in the review section. Try and say the full sentence in Arabic without checking. Grade your answers accordingly, it will be scheduled according to your answer and will show up for review at an optimal time.
8.In case you are not a beginner don&rsquo;t worry you can use the overview section only if you feel you do not need, the breakdown. More features are coming Insha Allah with separate routines for beginners and intermediate learners.
9. The listen section is there for you to listen to your lesson or sentences. You can set the sentence of passage to loop as much as you want.
10. A good study routine will be to go through the learning phases in the morning, then come back in the evening,Go through the review tab to see how much you recall, then listen to the passage a few times on loop. You could set it to loop while you do chores or wind  down for the evening.
              </p>
              <p>
                Tracking is awareness, awareness is decisions and decisions are what lead to  
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
