"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DEFAULT_LESSON = "fi-al-asal-shifa";

export function BottomNav() {
  const pathname = usePathname();
  const isStudy = pathname?.startsWith("/study");
  const isListen = pathname?.startsWith("/listen");

  const itemStyle = (active?: boolean) => ({
    color: active ? "var(--emerald-glow)" : "var(--muted)",
  });

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t"
      style={{ borderColor: "var(--hairline)", background: "var(--background)" }}
    >
      <div className="mx-auto flex max-w-md items-center justify-center gap-16 py-4">
        <Link
          href={`/study/${DEFAULT_LESSON}`}
          className="flex flex-col items-center gap-1 text-xs"
          style={itemStyle(isStudy)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" />
            <path d="M20 5.5C20 4.67 19.33 4 18.5 4H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" />
          </svg>
          Study
        </Link>
        <Link
          href={`/listen/${DEFAULT_LESSON}`}
          className="flex flex-col items-center gap-1 text-xs"
          style={itemStyle(isListen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 13a8 8 0 0 1 16 0" />
            <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
            <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
          </svg>
          Listen
        </Link>
      </div>
    </nav>
  );
}
