import React from 'react';

import type { Metadata } from "next";
import "@/styles/Global.scss";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Madaaircon Website",
  description: "Electrical & Cooling Systems Contracting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="background-wrapper" />
        <Navbar />
        {/* Hero outside .container for true full-bleed */}
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
