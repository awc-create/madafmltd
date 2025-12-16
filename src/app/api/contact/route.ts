// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // TODO: send email (Resend/SMTP) or store in DB
  return NextResponse.json({ ok: true });
}
