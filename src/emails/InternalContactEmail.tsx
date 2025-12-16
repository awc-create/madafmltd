/* eslint-disable @next/next/no-img-element */
import * as React from "react";

type Props = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  subject: string;
  subService: string;
  message: string;
  submittedAt: Date;
};

const meta: Record<string, { icon: string; color: string }> = {
  Electrical: { icon: "⚡", color: "#f59e0b" },
  "Cooling Systems": { icon: "❄️", color: "#3b82f6" },
  Security: { icon: "🔒", color: "#ef4444" },
};

export function InternalContactEmail(p: Props) {
  const m = meta[p.subject] ?? { icon: "📌", color: "#3b82f6" };
  const logo = "https://madafmltd.co.uk/assets/logo/logo.png";

  const submittedAtStr = p.submittedAt.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

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
              {m.icon} New service request
            </div>
            <div style={{ opacity: 0.92, marginTop: 2 }}>
              {p.subject} • {p.postcode}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, color: "#1a3c56" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800, width: 140 }}>
                Name
              </td>
              <td>{p.name}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800 }}>Email</td>
              <td>{p.email}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800 }}>Phone</td>
              <td>{p.phone}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800 }}>Postcode</td>
              <td>{p.postcode}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800 }}>Service</td>
              <td>{p.subject}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800 }}>Sub-service</td>
              <td>{p.subService || "-"}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", fontWeight: 800 }}>Submitted</td>
              <td>{submittedAtStr}</td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 10,
            background: "#f7fafc",
            border: "1px solid rgba(26,60,86,0.10)",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {p.message}
        </div>

        <p style={{ marginTop: 12, fontSize: 12, color: "rgba(26,60,86,0.7)" }}>
          Reply directly to this email to contact the customer.
        </p>
      </div>
    </div>
  );
}
