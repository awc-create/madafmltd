import * as React from "react";
import { InternalContactEmail } from "@/emails/InternalContactEmail";
import { CustomerThankYouEmail } from "@/emails/CustomerThankYouEmail";

export default function EmailPreviewPage() {
  const sample = {
    name: "Test Customer",
    email: "test.customer@example.com",
    phone: "07908 833 222",
    postcode: "SW1A 1AA",
    subject: "Cooling Systems",
    subService: "Commercial Fridge Repair",
    message:
      "Hi, our display fridge has stopped cooling. Need an urgent callout today if possible.",
    submittedAt: new Date(),
  };

  return (
    <main style={{ padding: 24, background: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 18 }}>
        <div>
          <h2 style={{ margin: "0 0 10px" }}>Internal email (to you)</h2>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            <InternalContactEmail {...sample} />
          </div>
        </div>

        <div>
          <h2 style={{ margin: "0 0 10px" }}>Customer email (thank you)</h2>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            <CustomerThankYouEmail {...sample} />
          </div>
        </div>
      </div>
    </main>
  );
}
