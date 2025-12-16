import type { Metadata } from "next";
import SecurityClient from "./SecurityClient";

export const metadata: Metadata = {
  title:
    "Security System Installations London | CCTV, Alarms, Intercoms | MadaAirCon",
  description:
    "Install smart security systems for homes and businesses across London. CCTV, intercoms, motion detectors, fire alarms & more by MadaAirCon.",
  keywords: [
    "CCTV installation London",
    "intercom systems",
    "smart locks",
    "motion detectors",
    "fire alarms",
    "security systems UK",
  ],
  alternates: {
    canonical: "https://www.madaaircon.co.uk/services/security",
  },
};

export default function SecurityPage() {
  return <SecurityClient />;
}
