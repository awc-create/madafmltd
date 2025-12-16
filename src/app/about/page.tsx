import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Mada Facility Management Ltd | London Electrical & Cooling Specialists",
  description:
    "Mada Facility Management Ltd is a leading London electrical contractor & F-Gas certified cooling specialist. Learn about our expert team, accreditations, and commitment to sustainability.",
  keywords: [
    "London electrical contractor",
    "cooling systems specialist",
    "F-Gas engineer",
    "sustainable HVAC",
    "NAPIT electrician",
    "facility management UK",
  ],
  alternates: {
    canonical: "https://www.madaaircon.co.uk/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
