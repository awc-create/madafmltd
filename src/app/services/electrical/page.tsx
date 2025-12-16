import React from 'react';

import Head from "next/head";
import ElectricalClient from "./ElectricalClient";

export const metadata = {
  title: "Certified Electrical Services | MadaAirCon London",
  description:
    "Professional electrical services across London & England: wiring, panel upgrades, emergency call‑outs, smart home setups & more—NAPIT, NICEIC & ECS certified.",
  keywords:
    "electrical services London, rewiring, panel upgrades, emergency electrician, smart home installation, network cabling",
};

export default function ElectricalPage() {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://www.madaaircon.co.uk/services/electrical"
        />
      </Head>
      <ElectricalClient />
    </>
  );
}
