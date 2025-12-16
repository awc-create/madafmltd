// src/app/contact/page.tsx
import React from 'react';

import Head from "next/head";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Mada Facility Management Ltd",
  description:
    "Get in touch with Mada Facility Management Ltd for expert electrical, cooling and security services across London & the UK.",
  keywords:
    "contact, electrical services, cooling systems, security installation, emergency electrician London",
  alternates: { canonical: "https://madafmltd.co.uk/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://www.madafacilitymanagement.co.uk/contact"
        />
      </Head>
      <ContactForm />
    </>
  );
}
