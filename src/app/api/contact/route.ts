// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  name: string;
  email: string;
  phone?: string;
  postcode?: string;
  subject?: string;
  subService?: string;
  message: string;
};

function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.includes("@");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Body | null;

    if (!body?.name || !isEmail(body.email) || !body?.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
    const RESEND_FROM = process.env.RESEND_FROM?.trim();
    const RESEND_TO = process.env.RESEND_TO?.trim(); // your inbox
    const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO?.trim();

    // If you want customer confirmations later, you can add RESEND_CUSTOMER_ENABLED etc.
    if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
      // IMPORTANT: don't throw during build; return a clear server error instead.
      console.error("Contact API misconfigured:", {
        hasKey: !!RESEND_API_KEY,
        hasFrom: !!RESEND_FROM,
        hasTo: !!RESEND_TO,
      });
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Import Resend *inside* the handler so build/collect doesn't explode.
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    const submittedAt = new Date();
    const subject = body.subject?.trim() || "General";
    const subService = body.subService?.trim() || "-";
    const postcode = body.postcode?.trim() || "-";
    const phone = body.phone?.trim() || "-";

    // Plain HTML (no React template dependency) — safest to get working first.
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
        <h2>New contact request</h2>
        <p><strong>Service:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Sub-service:</strong> ${escapeHtml(subService)}</p>
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Postcode:</strong> ${escapeHtml(postcode)}</p>
        <p><strong>Submitted:</strong> ${submittedAt.toLocaleString("en-GB")}</p>
        <hr/>
        <pre style="white-space:pre-wrap;line-height:1.5">${escapeHtml(
          body.message
        )}</pre>
      </div>
    `;

    const sendRes = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO,
      replyTo: RESEND_REPLY_TO || body.email, // or always customer email
      subject: `New ${subject} enquiry (${postcode})`,
      html,
    });

    if (sendRes.error) {
      console.error("Resend send error:", sendRes.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
