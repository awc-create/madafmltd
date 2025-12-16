// src/app/services/cooling/page.tsx
import React from 'react';

import Head from "next/head";
import CoolingClient from "./CoolingClient";

export const metadata = {
  title: "Cooling Systems Installation & Service | MadaAirCon London",
  description:
    "Refrigeration, air conditioning, AHUs and air source heat pumps installed and serviced across London and England by F‑Gas & MCS certified engineers.",
  keywords:
    "air conditioning installation London, F‑Gas engineer, commercial refrigeration, AHU service, heat pump installation",
};

export default function CoolingPage() {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://www.madaaircon.co.uk/services/cooling"
        />
      </Head>
      <CoolingClient />
    </>
  );
}
