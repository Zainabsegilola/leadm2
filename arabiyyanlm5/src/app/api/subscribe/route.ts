import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// Subscribe endpoint.
//
// If KIT_API_KEY and KIT_FORM_ID are set (see README.md, "Connecting a real
// email provider"), new emails are sent to Kit. This is a two-step process
// because Kit's API requires a subscriber to already exist as a record
// before it can be attached to a specific form:
//   1. POST /v4/subscribers        -> creates (or finds) the subscriber
//   2. POST /v4/forms/{id}/subscribers/{subscriber_id} -> attaches them to
//      this form, which also triggers that form's own opt-in flow
//      (single or double, whichever you've set up in Kit).
//
// If the env vars aren't set, this just logs the email — so local
// development and testing still work before you've connected a real
// provider.
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
      const createRes = await fetch("https://api.kit.com/v4/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({ email_address: email }),
      });

      if (!createRes.ok) {
        console.error("[Arabiyyan] Kit create-subscriber failed:", createRes.status, await createRes.text());
      } else {
        const { subscriber } = await createRes.json();

        const attachRes = await fetch(
          `https://api.kit.com/v4/forms/${formId}/subscribers/${subscriber.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Kit-Api-Key": apiKey,
            },
            body: JSON.stringify({}),
          }
        );

        if (!attachRes.ok) {
          console.error("[Arabiyyan] Kit attach-to-form failed:", attachRes.status, await attachRes.text());
        }
      }
    } else {
      console.log("[Arabiyyan] new lead (no email provider configured yet):", email);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
