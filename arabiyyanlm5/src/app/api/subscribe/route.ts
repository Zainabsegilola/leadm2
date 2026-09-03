import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// Subscribe endpoint.
//
// If KIT_API_KEY and KIT_FORM_ID are set (see README.md, "Connecting a real
// email provider"), new emails are sent to Kit (formerly ConvertKit). If
// they aren't set, this just logs the email — so local development and
// testing still work before you've connected a real provider.
// ============================================================================

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;

    if (apiKey && formId) {
      const res = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({ email_address: email }),
      });

      if (!res.ok) {
        // Don't block the learner's access over an email-provider hiccup —
        // just log it so you can investigate.
        console.error("[Arabiyyan] Kit subscribe failed:", res.status, await res.text());
      }
    } else {
      console.log("[Arabiyyan] new lead (no email provider configured yet):", email);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
