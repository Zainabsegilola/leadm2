import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// Placeholder subscribe endpoint.
//
// Right now this just logs the email server-side. To connect a real email
// provider, replace the body of this handler with a call to their API, e.g.:
//
//   await fetch("https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
//   });
//
// Store real API keys in Vercel's Environment Variables, never in this file.
// ============================================================================

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }
    console.log("[Arabiyyan] new lead:", email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
