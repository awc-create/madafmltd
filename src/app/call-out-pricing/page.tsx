import React from 'react';
import Head from 'next/head';
import CallOutPricing from './CallOutPricing';

export const metadata = {
  title: 'Emergency Call-Out Pricing | Mada Facility Management Ltd',
  description:
    'Transparent emergency call-out pricing for electrical, HVAC/air conditioning, and security systems across London & the UK.',
  keywords:
    'call out pricing, emergency electrician, HVAC call out, air conditioning repair, CCTV call out, fire alarm call out, London, UK',
  alternates: { canonical: 'https://madafmltd.co.uk/call-out-pricing' },
};

export default function CallOutPricingPage() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://madafmltd.co.uk/call-out-pricing" />
      </Head>
      <CallOutPricing />
    </>
  );
}
