// src/app/services/electrical/ElectricalClient.tsx (FULL)
// Changes: wrap Buttons with <span className={styles.primaryWrap}>…</span> so page controls colour theme.

"use client";

import React, { useId, useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import styles from "./Electrical.module.scss";
import { Icon } from "@iconify/react";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    title: "Wiring & Rewiring",
    description: "Complete wiring installations, upgrades, and safety checks for homes and businesses.",
    icon: "mdi:lightning-bolt",
  },
  {
    title: "Panel Upgrades",
    description: "Modernize outdated electrical panels to meet today’s safety standards and energy demands.",
    icon: "mdi:breaker",
  },
  {
    title: "24/7 Emergency Call-Outs",
    description: "Round-the-clock emergency support for all electrical issues.",
    icon: "mdi:clock-alert",
  },
  {
    title: "Testing & Inspection",
    description: "Certified inspections for landlords, businesses, and residential customers.",
    icon: "mdi:clipboard-check-outline",
  },
  {
    title: "Smart Home Setup",
    description: "Installation and configuration of smart lighting, sockets, and home automation systems.",
    icon: "mdi:home-automation",
  },
  {
    title: "Network Cabling",
    description: "Setup of CAT3, CAT5e, CAT6 network infrastructure for homes and businesses.",
    icon: "mdi:ethernet",
  },
  {
    title: "Fiber Optic (Coming Soon)",
    description: "High-speed fiber optic installations for modern homes and offices.",
    icon: "mdi:fiber-optic",
  },
] as const;

const FAQS = [
  {
    q: "What accreditations do your electricians hold?",
    a: "All our engineers are NAPIT & NICEIC registered, with ECS gold cards for full compliance.",
  },
  {
    q: "Do you offer emergency call-outs?",
    a: "Yes — our team is available 24/7 for urgent electrical breakdowns and safety concerns.",
  },
  {
    q: "Can you install smart home systems?",
    a: "Absolutely — we integrate lighting, sockets, heating controls and more via top smart-home platforms.",
  },
] as const;

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ElectricalClient() {
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
      <header className={styles.hero} aria-labelledby="electrical-title">
        <motion.div className={styles.heroInner} variants={fadeUp} initial="hidden" animate="show">
          <p className={styles.eyebrow}>Electrical</p>

          <h1 id="electrical-title" className={styles.title}>
            Certified Electrical Services
          </h1>

          <p className={styles.lead}>
            From full rewires and panel upgrades to smart home automation and 24/7 emergency call-outs — our accredited
            electricians deliver safe, reliable work for homes, offices and industrial sites.
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
            <span className={styles.trustPill}>NAPIT / NICEIC</span>
            <span className={styles.trustPill}>ECS certified</span>
            <span className={styles.trustPill}>Domestic &amp; commercial</span>
            <span className={styles.trustPill}>24/7 callouts</span>
          </div>
        </motion.div>
      </header>

      {/* SERVICES GRID */}
      <section className={styles.section} aria-labelledby="electrical-services">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.sectionHead}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 id="electrical-services" className={styles.sectionTitle}>
              What we can help with
            </h2>
            <p className={styles.muted}>
              Clear, compliant electrical work — done properly, documented, and built to last.
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

      {/* CERTIFICATIONS */}
      <section className={styles.section} aria-labelledby="electrical-certs">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.panel}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 id="electrical-certs" className={styles.sectionTitle}>
              Certifications
            </h2>

            <p className={styles.muted}>
              We work to recognised standards and keep qualifications current for compliance and safety.
            </p>

            <div className={styles.certGrid}>
              <a className={styles.certItem} href="https://www.napit.org.uk/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/napit-certification-logo.png"
                  alt="NAPIT Certification"
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </a>

              <a className={styles.certItem} href="https://www.niceic.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/niceic-certification-logo.png"
                  alt="NICEIC Certification"
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </a>

              <a className={styles.certItem} href="https://www.ecscard.org.uk/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/ecs-certification-logo.png"
                  alt="ECS Certification"
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.electricalsafetyfirst.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/electrical-safety-first-certification-logo.png"
                  alt="Electrical Safety First"
                  width={220}
                  height={100}
                  loading="lazy"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} aria-labelledby="electrical-faq">
        <div className={styles.sectionInner}>
          <motion.h2
            id="electrical-faq"
            className={styles.sectionTitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Electrical FAQs
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
            <h2 className={styles.bottomTitle}>Need a quote or urgent support?</h2>
            <p className={styles.bottomText}>
              Tell us what you need and where you’re based — we’ll advise on next steps and arrange a visit.
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
