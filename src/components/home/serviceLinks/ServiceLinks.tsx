"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ServiceLinks.module.scss";

type ThemeKey = "cooling" | "electrical" | "security";

type ServiceLink = {
  id: ThemeKey;
  title: string;
  href: string;
  icon: string;
  popular?: boolean;
  bullets: string[];
};

type CSSVars = React.CSSProperties & {
  "--accent"?: string;
};

const SERVICES: ServiceLink[] = [
  {
    id: "electrical",
    title: "Electrical Contracting",
    href: "/services/electrical",
    icon: "fluent-color:lightbulb-filament-48",
    bullets: ["Wiring & rewiring", "Panel upgrades", "Testing & inspection", "24/7 emergency callouts"],
  },
  {
    id: "cooling",
    title: "Cooling Systems",
    href: "/services/cooling",
    icon: "mdi:air-conditioner",
    popular: true,
    bullets: ["Commercial fridge repair", "Air conditioning install & servicing", "Planned maintenance", "24/7 emergency response"],
  },
  {
    id: "security",
    title: "Security Solutions",
    href: "/services/security",
    icon: "mdi:security",
    bullets: ["CCTV installation", "Alarm & access control setup", "Intercom systems", "Fire alarm commissioning"],
  },
];

function themeVars(theme: ThemeKey): CSSVars {
  switch (theme) {
    case "cooling":
      return { "--accent": "#3b82f6" };
    case "electrical":
      return { "--accent": "#f59e0b" };
    case "security":
      return { "--accent": "#ef4444" };
    default:
      return {};
  }
}

export default function ServiceLinks() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="service-links-heading">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <motion.header
            className={styles.header}
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.eyebrow}>Our services</p>
            <h2 id="service-links-heading" className={styles.title}>
              Popular service areas
            </h2>
            <p className={styles.sub}>
              A quick snapshot of what customers book most — tap a service to see full coverage and pricing guidance.
            </p>

            <Link href="/services" className={styles.allCta}>
              View all services →
            </Link>
          </motion.header>

          <div className={styles.list}>
            {SERVICES.map((svc) => (
              <motion.article
                key={svc.id}
                className={styles.row}
                style={themeVars(svc.id)}
                whileHover={reduce ? undefined : { y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className={styles.bar} aria-hidden="true" />

                <div className={styles.iconWrap} aria-hidden="true">
                  <Icon icon={svc.icon} width={26} height={26} />
                </div>

                <div className={styles.content}>
                  <div className={styles.topLine}>
                    <h3 className={styles.name}>{svc.title}</h3>
                    {svc.popular && <span className={styles.popular}>Most popular</span>}
                  </div>

                  <ul className={styles.bullets}>
                    {svc.bullets.map((b) => (
                      <li key={b}>
                        <Icon icon="mdi:check" width={16} height={16} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={svc.href} className={styles.link}>
                    View service →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
