"use client";

import { useState } from "react";

export function StudyInstructions({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-sm text-center">
      <button
        onClick={() => setOpen((o) => !o)}
        className="interactive hover-emerald text-xs underline"
        style={{ color: "var(--muted)" }}
      >
        {open ? "Hide instructions" : "How to study this section"}
      </button>

      {open && (
        <div
          className="mt-3 space-y-2 rounded-lg border p-4 text-left text-xs leading-relaxed"
          style={{ borderColor: "var(--hairline)", color: "var(--muted)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
