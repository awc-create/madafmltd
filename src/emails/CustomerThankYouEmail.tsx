/* eslint-disable @next/next/no-img-element */
import * as React from "react";

type Props = {
  name: string;
  subject: string;
  subService: string;
  postcode: string;
  phone: string;
};

const meta: Record<string, { icon: string; color: string }> = {
  Electrical: { icon: "⚡", color: "#f59e0b" },
  "Cooling Systems": { icon: "❄️", color: "#3b82f6" },
  Security: { icon: "🔒", color: "#ef4444" },
};

export function CustomerThankYouEmail(p: Props) {
  const m = meta[p.subject] ?? { icon: "📌", color: "#3b82f6" };
  const logo = "https://madafmltd.co.uk/assets/logo/logo.png";

  return (
    <div
      style={{
        fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,Arial",
        background: "#fff",
      }}
    >
      <div style={{ background: m.color, color: "#fff", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={logo}
            alt="Mada Facility Management"
            width="150"
            height="34"
            style={{ display: "block", height: "34px", width: "150px" }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              {m.icon} Thanks — we’ve received your request
            </div>
            <div style={{ opacity: 0.92, marginTop: 2 }}>
              Service: <strong>{p.subject}</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, color: "#1a3c56" }}>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Hi <strong>{p.name}</strong>, thank you for contacting Mada Facility
          Management. We’ve received your request and will get back to you as
          soon as possible.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            background: "#f7fafc",
            border: "1px solid rgba(26,60,86,0.10)",
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Summary</div>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", fontWeight: 800, width: 140 }}>
                  Postcode
                </td>
                <td>{p.postcode}</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", fontWeight: 800 }}>
                  Sub-service
                </td>
                <td>{p.subService || "-"}</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", fontWeight: 800 }}>Phone</td>
                <td>{p.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 12, fontSize: 12, color: "rgba(26,60,86,0.7)" }}>
          If you need to add anything, reply to this email and we’ll pick it up.
        </p>

        <a
          href="https://madafmltd.co.uk/contact"
          style={{
            display: "inline-block",
            marginTop: 10,
            padding: "10px 12px",
            borderRadius: 12,
            background: m.color,
            color: "#fff",
            fontWeight: 900,
            textDecoration: "none",
          }}
        >
          View contact page →
        </a>
      </div>
    </div>
  );
}
