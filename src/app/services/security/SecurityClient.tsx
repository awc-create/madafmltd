// src/app/services/security/SecurityClient.tsx (FULL)
// Changes: wrap Buttons with <span className={styles.primaryWrap}>…</span> so this page controls the accent (security red).

"use client";

import React, { useId, useMemo, useState } from "react";
import Button from "@/components/button/Button";
import styles from "./Security.module.scss";
import { Icon } from "@iconify/react";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    title: "CCTV Installation",
    description:
      "Professional fitting and configuration of third-party CCTV systems for real-time remote viewing and reliable 24/7 surveillance.",
    icon: "mdi:cctv",
  },
  {
    title: "Intercom Setup",
    description:
      "Expert installation of audio and video intercom systems — integrating with your existing door or gate hardware.",
    icon: "mdi:intercom",
  },
  {
    title: "Smart Lock Integration",
    description:
      "Installation and programming of smart locks and access control hardware from leading manufacturers.",
    icon: "mdi:lock-smart",
  },
  {
    title: "Motion Sensor Placement",
    description:
      "Precise positioning and setup of motion detectors — integrated into your CCTV or alarm system for instant alerts.",
    icon: "mdi:motion-sensor",
  },
  {
    title: "Fire Alarm Commissioning",
    description:
      "Commissioning and testing of fire, smoke and CO detectors to support compliance and reliable early warnings.",
    icon: "mdi:fire-alarm",
  },
  {
    title: "Alarm System Configuration",
    description:
      "Professional setup of alarm panels and sirens — with mobile alert integration and tidy commissioning.",
    icon: "mdi:alarm-light",
  },
] as const;

const FAQS = [
  {
    q: "Can you install my existing CCTV cameras?",
    a: "Absolutely — we’ll mount, wire and configure your current CCTV hardware for live and recorded access via the appropriate apps.",
  },
  {
    q: "Do intercoms need internet?",
    a: "Audio-only intercoms can work offline. Video or IP-based systems typically need a network connection, which we can also supply and set up.",
  },
  {
    q: "Will my smart lock work with my phone?",
    a: "Yes — we integrate leading smart-lock brands so you can lock/unlock via smartphone, keypad or fob depending on your preference.",
  },
] as const;

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SecurityClient() {
  const reduce = useReducedMotion();
  const uid = useId();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const container: Variants = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.08 } },
    }),
    []
  );

  const fadeUp: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 14 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
    }),
    [reduce]
  );

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero} aria-labelledby="security-title">
        <motion.div className={styles.heroInner} variants={fadeUp} initial="hidden" animate="show">
          <p className={styles.eyebrow}>Security</p>

          <h1 id="security-title" className={styles.title}>
            Security System Installation
          </h1>

          <p className={styles.lead}>
            Expert fitting and configuration of CCTV, intercoms, alarms and smart locks. We install cleanly, wire
            properly, and commission systems for reliable day-to-day use.
          </p>

          <div className={styles.heroCtas}>
            <span className={styles.primaryWrap}>
              <Button text="Request a Quote" href="/contact" variant="primary" />
            </span>

            <a className={styles.secondaryLink} href="/services">
              View all services
            </a>
          </div>

          <div className={styles.trustRow} aria-label="Key trust points">
            <span className={styles.trustPill}>CCTV • Intercoms</span>
            <span className={styles.trustPill}>Alarms • Smart locks</span>
            <span className={styles.trustPill}>Neat installs</span>
            <span className={styles.trustPill}>Commissioned & tested</span>
          </div>
        </motion.div>
      </header>

      {/* SERVICES */}
      <section className={styles.section} aria-labelledby="security-services">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.sectionHead}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 id="security-services" className={styles.sectionTitle}>
              What we can help with
            </h2>
            <p className={styles.muted}>
              Installation, setup and configuration — focused on reliability, tidy cabling and clear handover.
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {SERVICES.map((svc) => (
              <motion.article key={svc.title} className={styles.card} variants={fadeUp}>
                <div className={styles.cardTop}>
                  <span className={styles.iconBadge} aria-hidden="true">
                    <Icon icon={svc.icon} width="20" height="20" />
                  </span>
                  <h3 className={styles.cardTitle}>{svc.title}</h3>
                </div>
                <p className={styles.cardDesc}>{svc.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} aria-labelledby="security-faq">
        <div className={styles.sectionInner}>
          <motion.h2
            id="security-faq"
            className={styles.sectionTitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Security FAQs
          </motion.h2>

          <div className={styles.faq}>
            {FAQS.map((item, idx) => {
              const open = openFaq === idx;
              const panelId = `${uid}-faq-${idx}`;

              return (
                <motion.div
                  key={item.q}
                  className={`${styles.faqItem} ${open ? styles.open : ""}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <button
                    type="button"
                    className={styles.faqButton}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(open ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true">
                      {open ? "–" : "+"}
                    </span>
                  </button>

                  <motion.div
                    id={panelId}
                    className={styles.faqPanel}
                    role="region"
                    initial={false}
                    animate={open ? "open" : "collapsed"}
                    variants={{
                      open: { height: "auto", opacity: 1 },
                      collapsed: { height: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                  >
                    <p className={styles.faqAnswer}>{item.a}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.bottomCta}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className={styles.bottomTitle}>Want a secure setup done properly?</h2>
            <p className={styles.bottomText}>
              Tell us what you have (or what you’re considering) and we’ll recommend the cleanest install approach.
            </p>
            <span className={styles.primaryWrap}>
              <Button text="Contact Us" href="/contact" variant="primary" />
            </span>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
