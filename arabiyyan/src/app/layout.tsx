import type { Metadata } from "next";
import { AccessGate } from "@/components/AccessGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arabiyyan — Learn Arabic through real texts",
  description:
    "Understand a real Arabic passage, listen to it, recall it, and keep it — over 30 days.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        <AccessGate>{children}</AccessGate>
      </body>
    </html>
  );
}
