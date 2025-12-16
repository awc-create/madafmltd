// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { render } from "@react-email/render";

import { InternalContactEmail } from "@/emails/InternalContactEmail";
import { CustomerThankYouEmail } from "@/emails/CustomerThankYouEmail";

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
    const RESEND_TO = process.env.RESEND_TO?.trim();
    const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO?.trim();

    if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
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

    // Import inside handler (prevents build-time crash)
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    const submittedAt = new Date();
    const subject = body.subject?.trim() || "General";
    const subService = body.subService?.trim() || "-";
    const postcode = body.postcode?.trim() || "-";
    const phone = body.phone?.trim() || "-";

    // ✅ IMPORTANT: await render() if it returns Promise<string>
    const internalHtml = await render(
      InternalContactEmail({
        name: body.name,
        email: body.email,
        phone,
        postcode,
        subject,
        subService,
        message: body.message,
        submittedAt,
      })
    );

    const customerHtml = await render(
      CustomerThankYouEmail({
        name: body.name,
        subject,
        subService,
        postcode,
        phone,
      })
    );

    // 1) Send to your inbox
    const internalRes = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO,
      replyTo: RESEND_REPLY_TO || body.email,
      subject: `New ${subject} enquiry (${postcode})`,
      html: internalHtml,
    });

    if (internalRes.error) {
      console.error("Resend internal send error:", internalRes.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // 2) Send confirmation to customer
    const customerRes = await resend.emails.send({
      from: RESEND_FROM,
      to: body.email,
      replyTo: RESEND_REPLY_TO || RESEND_TO,
      subject: `We’ve received your request (${subject})`,
      html: customerHtml,
    });

    if (customerRes.error) {
      console.error("Resend customer send error:", customerRes.error);
      // Don’t fail the whole request if internal email succeeded
      return NextResponse.json({ ok: true, customerEmailSent: false });
    }

    return NextResponse.json({ ok: true, customerEmailSent: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
