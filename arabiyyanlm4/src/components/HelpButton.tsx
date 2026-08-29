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
                knowledge alone will lead to better comprehension and speaking. Grammar can help —
                but knowing explanations about a language is different from becoming familiar with
                the language itself.
              </p>
              <p>
                Real comprehension comes from repeated exposure to Arabic you can actually
                understand. One reason many learners stay at a low beginner level is that they
                spend far more time analysing Arabic than listening to and understanding it.
              </p>
              <p>
                Arabiyyan aims to make Arabic easier to understand, so you can spend more time
                actually engaging with it — not avoiding grammar, but using it when it helps, then
                repeatedly experiencing the language itself.
              </p>
            </Section>

            <Section title="Listening and comprehension">
              <p>
                Listening is central here. You&rsquo;re not meant to see a sentence once and move
                on — returning to the same understandable material helps you gradually pick up how
                words sound, how they connect, sentence patterns, and rhythm.
              </p>
              <p>The aim is to make listening easy to begin, easy to repeat, and easy to return to.</p>
            </Section>

            <Section title="Texts you actually care about">
              <p>
                Studying can feel like a chore when the material feels disconnected from anything
                you personally want to understand. Arabiyyan is built around texts learners
                genuinely care about — learn from Arabic you actually want to understand.
              </p>
            </Section>

            <Section title="Consistency and review">
              <p>
                Learning something once doesn&rsquo;t mean remembering it forever. Arabiyyan uses
                spaced repetition and simple progress tracking to make returning to material
                easier, reminding you to revisit sentences at useful intervals.
              </p>
              <p>
                The heatmap and timer aren&rsquo;t there to create pressure or streak anxiety —
                they&rsquo;re simple ways to notice that small, repeated effort adds up.
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
                  once or twice — just get the general meaning, don&rsquo;t try to memorise it.
                </li>
                <li>
                  <b>Connect the meaning with the Arabic.</b> On the second page, read English and
                  Arabic together while listening. Repeat the audio as much as you like.
                </li>
                <li>
                  <b>Look at the Arabic by itself.</b> On the third page, read and listen again —
                  notice how much you already recognise. No test, no pressure.
                </li>
                <li>
                  <b>Mark words you don&rsquo;t know</b> in red as you go. Lots of red as a beginner
                  isn&rsquo;t failure — it&rsquo;s just where you&rsquo;re starting from.
                </li>
                <li>
                  <b>Study Sentence 1.</b> In Phase 1, use the gloss to connect English and Arabic,
                  listen as much as you find useful, and check word info when you need it.
                </li>
                <li>
                  <b>Try without the support.</b> In Phase 2, see how much you recognise without
                  English. If you need help, go back to Phase 1 — that&rsquo;s part of learning, not
                  failure.
                </li>
                <li>
                  <b>Recall the Arabic.</b> In Phase 3, try to say the full sentence using the
                  English and first-letter cues before revealing the answer. When you feel you&rsquo;ve
                  done your initial study, mark the sentence as studied — it enters your review
                  system.
                </li>
                <li>
                  <b>Continue at your own pace.</b> All four sentences in one sitting, or one a day —
                  both are fine. Consistency matters more than speed.
                </li>
                <li>
                  <b>Review your sentences.</b> Once studied, a sentence enters Review. Check in
                  regularly — you won&rsquo;t always have something due, and that&rsquo;s normal. When a
                  card appears, try to recall it before revealing the answer, then grade yourself
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
                leave the tab, so it reflects genuine time spent with the app — not a competition,
                just a way to see your accumulated effort.
              </p>
            </Section>

            <Section title="The heatmap">
              <p>
                The heatmap shows which days you&rsquo;ve studied, so you can notice your own
                consistency. A missed day isn&rsquo;t failure — it&rsquo;s just a normal part of
                learning. The point is to encourage you to come back, not to pressure you.
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
