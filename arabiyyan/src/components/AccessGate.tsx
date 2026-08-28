"use client";

import { useEffect, useState } from "react";
import { hasAccess, setEmail } from "@/lib/storage";

export function AccessGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [granted, setGranted] = useState(false);
  const [email, setEmailInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating client-only localStorage state on mount
    setGranted(hasAccess());
    setChecked(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder network call — wire this up to your real email provider
      // (see src/app/api/subscribe/route.ts).
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {
        // Non-fatal: the learner still gets access even if the network call
        // fails, since the API route is a placeholder for now.
      });
      setEmail(email);
      setGranted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!checked) return null;

  if (!granted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-arabic text-4xl text-emerald-glow mb-2" style={{ color: "var(--emerald-glow)" }}>
            عَرَبِيًّا
          </h1>
          <p className="text-lg text-foreground mb-1">Arabiyyan</p>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            One real Arabic passage. Understand it, hear it, keep it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full rounded-lg bg-transparent border px-4 py-3 text-sm outline-none focus:ring-1"
              style={{ borderColor: "var(--hairline)" }}
            />
            {error && (
              <p className="text-sm" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-60"
              style={{ background: "var(--emerald)", color: "#04150d" }}
            >
              {submitting ? "One moment…" : "Start the lesson"}
            </button>
          </form>

          <p className="mt-6 text-xs leading-relaxed" style={{ color: "var(--muted-dim)" }}>
            Your study progress is stored on this device only. No account, no password.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
