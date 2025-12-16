// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { InternalContactEmail } from "@/emails/InternalContactEmail";
import { CustomerThankYouEmail } from "@/emails/CustomerThankYouEmail";

export const runtime = "nodejs"; // important on some platforms

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const submittedAt = new Date();

    const from = process.env.RESEND_FROM!;
    const toInternal = process.env.RESEND_TO!;
    const replyTo = process.env.RESEND_REPLY_TO || body.email;

    // 1) Internal email to you
    await resend.emails.send({
      from,
      to: toInternal,
      replyTo,
      subject: `New contact request: ${body.subject || "General"} • ${body.postcode || "-"}`,
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

    // 2) Thank-you email to customer
    await resend.emails.send({
      from,
      to: body.email,
      replyTo: toInternal, // customer replies go to you
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
