type Payload = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  subject: string;
  subService: string;
  message: string;
};

type Env = {
  RESEND_API_KEY: string;
  RESEND_FROM: string;     // e.g. "Mada Facility Management <no-reply@madafmltd.co.uk>"
  RESEND_TO: string;       // e.g. "madafmltd@gmail.com"
  SITE_URL: string;        // e.g. "https://madafmltd.co.uk"
  ALLOWED_ORIGIN: string;  // e.g. "https://madafmltd.co.uk"
};

const serviceMeta: Record<string, { icon: string; color: string }> = {
  Electrical: { icon: "⚡", color: "#f59e0b" },
  "Cooling Systems": { icon: "❄️", color: "#3b82f6" },
  Security: { icon: "🔒", color: "#ef4444" },
};

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeText(v: unknown, max = 2000) {
  return String(v ?? "").trim().slice(0, max);
}

function corsHeaders(origin: string, allowedOrigin: string) {
  const ok = origin === allowedOrigin;
  return {
    "Access-Control-Allow-Origin": ok ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function internalEmailHTML(p: Payload, siteUrl: string) {
  const meta = serviceMeta[p.subject] ?? { icon: "📌", color: "#3b82f6" };
  const logoUrl = `${siteUrl}/assets/logo/logo.png`;

  return `
  <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;border:1px solid #e6e6e6;border-radius:14px;overflow:hidden;background:#fff;">
    <div style="background:${meta.color};padding:16px;color:#fff;">
      <div style="display:flex;align-items:center;gap:12px;">
        <img src="${logoUrl}" alt="Mada Facility Management" height="34" style="display:block" />
        <div>
          <div style="font-size:18px;font-weight:900;">${meta.icon} New service request</div>
          <div style="opacity:0.92;margin-top:2px;">${p.subject} • ${p.postcode}</div>
        </div>
      </div>
    </div>

    <div style="padding:16px;color:#1a3c56;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;font-weight:800;width:140px;">Name</td><td>${p.name}</td></tr>
        <tr><td style="padding:6px 0;font-weight:800;">Email</td><td>${p.email}</td></tr>
        <tr><td style="padding:6px 0;font-weight:800;">Phone</td><td>${p.phone}</td></tr>
        <tr><td style="padding:6px 0;font-weight:800;">Postcode</td><td>${p.postcode}</td></tr>
        <tr><td style="padding:6px 0;font-weight:800;">Service</td><td>${p.subject}</td></tr>
        <tr><td style="padding:6px 0;font-weight:800;">Sub-service</td><td>${p.subService || "-"}</td></tr>
      </table>

      <div style="margin-top:14px;padding:12px;border-radius:10px;background:#f7fafc;border:1px solid rgba(26,60,86,0.10);">
        <div style="font-weight:900;margin-bottom:8px;">Message</div>
        <div style="white-space:pre-wrap;line-height:1.6;color:#243b53;">${p.message}</div>
      </div>

      <p style="margin-top:12px;font-size:12px;color:rgba(26,60,86,0.7);">
        Reply-to will be set to the customer’s email.
      </p>
    </div>
  </div>`;
}

function customerEmailHTML(p: Payload, siteUrl: string) {
  const meta = serviceMeta[p.subject] ?? { icon: "📌", color: "#3b82f6" };
  const logoUrl = `${siteUrl}/assets/logo/logo.png`;

  return `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e6e6e6;border-radius:14px;overflow:hidden;background:#fff;">
    <div style="background:${meta.color};padding:16px;color:#fff;">
      <div style="display:flex;align-items:center;gap:12px;">
        <img src="${logoUrl}" alt="Mada Facility Management" height="34" style="display:block" />
        <div>
          <div style="font-size:18px;font-weight:900;">${meta.icon} Thanks — we’ve received your request</div>
          <div style="opacity:0.92;margin-top:2px;">Service: <strong>${p.subject}</strong></div>
        </div>
      </div>
    </div>

    <div style="padding:16px;color:#1a3c56;">
      <p style="margin:0;line-height:1.6;">
        Hi <strong>${p.name}</strong>, thank you for contacting Mada Facility Management.
        We’ve received your request and will get back to you as soon as possible.
      </p>

      <div style="margin-top:12px;padding:12px;border-radius:10px;background:#f7fafc;border:1px solid rgba(26,60,86,0.10);">
        <div style="font-weight:900;margin-bottom:8px;">Summary</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;font-weight:800;width:140px;">Postcode</td><td>${p.postcode}</td></tr>
          <tr><td style="padding:6px 0;font-weight:800;">Sub-service</td><td>${p.subService || "-"}</td></tr>
          <tr><td style="padding:6px 0;font-weight:800;">Phone</td><td>${p.phone}</td></tr>
        </table>
      </div>

      <p style="margin-top:12px;font-size:12px;color:rgba(26,60,86,0.7);">
        If you need to add anything, reply to this email.
      </p>

      <a href="${siteUrl}/contact"
         style="display:inline-block;margin-top:10px;padding:10px 12px;border-radius:12px;background:${meta.color};color:#fff;font-weight:900;text-decoration:none;">
        View contact page →
      </a>
    </div>
  </div>`;
}

async function sendResendEmail(
  env: Env,
  args: { to: string | string[]; subject: string; html: string; replyTo?: string }
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      reply_to: args.replyTo,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
}

const handler = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (req.method !== "POST") {
      return new Response("Not found", { status: 404, headers: cors });
    }

    try {
      const raw = (await req.json()) as Partial<Payload>;

      const payload: Payload = {
        name: safeText(raw.name, 120),
        email: safeText(raw.email, 160),
        phone: safeText(raw.phone, 40),
        postcode: safeText(raw.postcode, 24),
        subject: safeText(raw.subject, 60),
        subService: safeText(raw.subService, 100),
        message: safeText(raw.message, 2000),
      };

      if (
        !payload.name ||
        !payload.email ||
        !payload.phone ||
        !payload.postcode ||
        !payload.subject ||
        !payload.message
      ) {
        return new Response(JSON.stringify({ error: "Missing required fields." }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...cors },
        });
      }

      if (!isEmail(payload.email)) {
        return new Response(JSON.stringify({ error: "Invalid email address." }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...cors },
        });
      }

      const meta = serviceMeta[payload.subject] ?? { icon: "📌", color: "#3b82f6" };

      const internalHtml = internalEmailHTML(payload, env.SITE_URL);
      const customerHtml = customerEmailHTML(payload, env.SITE_URL);

      const internalTo = env.RESEND_TO.split(",").map((s) => s.trim()).filter(Boolean);
      const replyToForCustomer = internalTo[0] || env.RESEND_TO;

      await Promise.all([
        sendResendEmail(env, {
          to: internalTo,
          subject: `${meta.icon} New Service Request — ${payload.subject} (${payload.postcode})`,
          html: internalHtml,
          replyTo: payload.email,
        }),
        sendResendEmail(env, {
          to: payload.email,
          subject: `${meta.icon} Thanks — we received your request (${payload.subject})`,
          html: customerHtml,
          replyTo: replyToForCustomer,
        }),
      ]);

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...cors },
      });
    } catch (err) {
      // ✅ fixes "e unused" and gives you logs in Cloudflare
      console.error("Contact worker error:", err);

      return new Response(JSON.stringify({ error: "Server error." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }
  },
};

export default handler;
