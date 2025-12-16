import React from 'react';

import Head from "next/head";
import FAQClient from "./FAQClient";

export const metadata = {
  title: "FAQ | Mada Facility Management Ltd",
  description:
    "Frequently Asked Questions about our electrical, cooling and security installation services across London & the UK.",
  keywords:
    "electrical services FAQ, air conditioning maintenance FAQ, security system installation FAQ, emergency electrician, F‑Gas certified, CCTV installation, smart home setup",
};

export default function FAQPage() {
  const faqsJsonLd = [
    {
      "@type": "Question",
      name: "Do you offer emergency electrical call‑outs?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes—our NAPIT & NICEIC‑registered electricians respond 24/7 to urgent electrical breakdowns and safety issues.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a full home rewire cost in London?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A typical 3‑bedroom semi‑detached home rewiring starts from around £3,500–£5,000 depending on layout and finish choices.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I service my air conditioning?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We recommend bi‑annual maintenance (pre‑season checks) to maintain efficiency, prolong lifespan and comply with F‑Gas regulations.",
      },
    },
    {
      "@type": "Question",
      name: "Which air conditioning brands do you install?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We install all major brands—Daikin, Mitsubishi Electric, Fujitsu, Samsung—ensuring the best fit for your efficiency needs.",
      },
    },
    {
      "@type": "Question",
      name: "Can you install my existing CCTV hardware?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Absolutely—we’ll mount, wire and configure your current CCTV cameras for live & recorded access via leading mobile apps.",
      },
    },
    {
      "@type": "Question",
      name: "Do your intercom systems require internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Audio‑only intercoms work offline; video or IP‑based intercoms need network connectivity, which we can also install.",
      },
    },
    {
      "@type": "Question",
      name: "Are your cooling engineers F‑Gas certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes—all our cooling engineers hold up‑to‑date F‑Gas & MCS qualifications for legal compliance and safe refrigerant handling.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a smart home electrical setup?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Smart home setup covers smart lighting, Wi‑Fi enabled sockets, automated heating controls and integration with Alexa/Google Home.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer warranties on installations?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes—all our installations come with a minimum 2‑year workmanship warranty and manufacturer warranties up to 10 years.",
      },
    },
    {
      "@type": "Question",
      name: "Which areas do you serve in London & the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We cover all Greater London boroughs and offer nationwide electrical and cooling services via our partner network.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book a service or request a quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Simply use our online contact form, email us at info@madaaircon.co.uk or call 020‑1234‑5678 for a free, no‑obligation quote.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide landlord electrical safety certificates?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes—we’re qualified to carry out EICRs (Electrical Installation Condition Reports) for HMO and private rentals.",
      },
    },
  ];

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.madaaircon.co.uk/faq" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqsJsonLd,
          }) }}
        />
      </Head>
      <FAQClient />
    </>
  );
}
