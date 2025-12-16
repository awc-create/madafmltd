// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { InternalContactEmail } from "@/emails/InternalContactEmail";
import { CustomerThankYouEmail } from "@/emails/CustomerThankYouEmail";

export const runtime = "nodejs";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null; // don't throw at import/build time
  return new Resend(key);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      // this is a runtime config problem (env not injected on server)
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const submittedAt = new Date();

    const from = process.env.RESEND_FROM;
    const toInternal = process.env.RESEND_TO;

    if (!from || !toInternal) {
      return NextResponse.json(
        { error: "Missing RESEND_FROM / RESEND_TO" },
        { status: 500 }
      );
    }

    const replyTo = process.env.RESEND_REPLY_TO || body.email;

    // Internal email
    await resend.emails.send({
      from,
      to: toInternal,
      replyTo,
      subject: `New contact request: ${body.subject || "General"} • ${
        body.postcode || "-"
      }`,
      react: InternalContactEmail({
        name: body.name,
        email: body.email,
        phone: body.phone || "-",
        postcode: body.postcode || "-",
        subject: body.subject || "General",
        subService: body.subService || "",
        message: body.message,
        submittedAt,
      }),
    });

    // Customer thank-you email
    await resend.emails.send({
      from,
      to: body.email,
      replyTo: toInternal,
      subject: "Thanks — we’ve received your request",
      react: CustomerThankYouEmail({
        name: body.name,
        subject: body.subject || "General",
        subService: body.subService || "",
        postcode: body.postcode || "-",
        phone: body.phone || "-",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
