"use client";

import React, { useId, useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import styles from "./Cooling.module.scss";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    title: "Refrigeration",
    description:
      "We supply, install, and maintain commercial refrigeration systems including working fridges, display fridges, and ice makers.",
  },
  {
    title: "Air Conditioning",
    description:
      "Split systems, cassette units, wall-mounted or underfloor air conditioning systems — designed for optimal cooling efficiency.",
  },
  {
    title: "Air Handling Units",
    description:
      "Install and service AHUs for controlled ventilation and efficient air circulation in commercial and industrial spaces.",
  },
  {
    title: "Air Source Heat Pumps",
    description:
      "We install, maintain, and repair ASHP systems, providing efficient heating and cooling all year round.",
  },
] as const;

const FAQS = [
  {
    q: "Do you offer emergency AC repairs?",
    a: "Yes — our engineers respond 24/7 for breakdowns, refrigerant leaks or compressor faults.",
  },
  {
    q: "How often should I service my air conditioning?",
    a: "We recommend bi-annual maintenance (pre-season checks) to optimise efficiency and lifespan.",
  },
  {
    q: "Are you F-Gas and MCS certified?",
    a: "Absolutely — all our cooling engineers hold up-to-date F-Gas & MCS qualifications for legal compliance.",
  },
] as const;

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CoolingClient() {
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
      <header className={styles.hero} aria-labelledby="cooling-title">
        <motion.div
          className={styles.heroInner}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className={styles.eyebrow}>Cooling Systems</p>

          <h1 id="cooling-title" className={styles.title}>
            Commercial &amp; Residential Cooling Experts Across London &amp; England
          </h1>

          <p className={styles.lead}>
            Installation, maintenance and rapid breakdown support — covering refrigeration, air
            conditioning, AHUs and air source heat pumps. Fully compliant, F-Gas &amp; MCS certified.
          </p>

          <div className={styles.heroCtas}>
            <Button
              text="Request a Quote"
              href="/contact"
              variant="primary"
              aria-label="Request a quote for cooling systems"
            />
            <a className={styles.secondaryLink} href="/services">
              View all services
            </a>
          </div>

          <div className={styles.trustRow} aria-label="Key trust points">
            <span className={styles.trustPill}>F-Gas certified</span>
            <span className={styles.trustPill}>Commercial &amp; domestic</span>
            <span className={styles.trustPill}>Install • Maintain • Repair</span>
            <span className={styles.trustPill}>Fast callouts</span>
          </div>
        </motion.div>
      </header>

      {/* COMMERCIAL FOCUS (NEW) */}
      <section className={styles.section} aria-labelledby="commercial-focus">
        <div className={styles.sectionInner}>
          <motion.h2
            id="commercial-focus"
            className={styles.sectionTitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Commercial callouts
          </motion.h2>

          <motion.div
            className={styles.commercialGrid}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Commercial Fridge Repair */}
            <motion.article className={styles.commercialCard} variants={fadeUp}>
              <div className={styles.commercialCopy}>
                <p className={styles.kicker}>Since 2004</p>
                <h3 className={styles.commercialTitle}>Commercial Fridge Repair London</h3>
                <p className={styles.commercialLead}>
                  When a commercial fridge fails, stock and service feel the pressure.
                  We respond fast with qualified F-Gas engineers to keep trade moving.
                </p>

                <ul className={styles.bullets}>
                  <li>24/7 emergency response available</li>
                  <li>Leak detection, compressor faults, controls &amp; parts</li>
                  <li>Planned maintenance to reduce breakdowns</li>
                </ul>

                <div className={styles.inlineCta}>
                  <Button text="Book a Callout" href="/contact" variant="primary" />
                  <span className={styles.note}>Commercial sites • shops • cafés • restaurants</span>
                </div>
              </div>

              <div className={styles.commercialMedia} aria-hidden="true">
                <Image
                  src="/assets/commercial-fridge.png"
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  style={{ objectFit: "contain" }}
                  priority={false}
                />
              </div>
            </motion.article>

            {/* Commercial Air Conditioning */}
            <motion.article className={styles.commercialCard} variants={fadeUp}>
              <div className={styles.commercialCopy}>
                <p className={styles.kicker}>Commercial AC</p>
                <h3 className={styles.commercialTitle}>Commercial Air Conditioning</h3>
                <p className={styles.commercialLead}>
                  Design, install and maintain reliable cooling for offices, retail, restaurants
                  and industrial spaces — with efficiency and compliance built in.
                </p>

                <ul className={styles.bullets}>
                  <li>VRF / split / cassette systems</li>
                  <li>Filter cleans, gas checks &amp; performance servicing</li>
                  <li>Breakdown diagnosis &amp; repair</li>
                </ul>

                <div className={styles.inlineCta}>
                  <Button text="Request a Quote" href="/contact" variant="primary" />
                  <span className={styles.note}>Install • maintain • repair</span>
                </div>
              </div>

              <div className={styles.commercialMedia} aria-hidden="true">
                <Image
                  src="/assets/commercial-ac.png"
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className={styles.section} aria-labelledby="cooling-services">
        <div className={styles.sectionInner}>
          <motion.h2
            id="cooling-services"
            className={styles.sectionTitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            What we cover
          </motion.h2>

          <motion.div
            className={styles.grid}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {SERVICES.map((svc) => (
              <motion.article key={svc.title} className={styles.card} variants={fadeUp}>
                <h3 className={styles.cardTitle}>{svc.title}</h3>
                <p className={styles.cardDesc}>{svc.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className={styles.section} aria-labelledby="cooling-certs">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.panel}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 id="cooling-certs" className={styles.sectionTitle}>
              Certifications
            </h2>

            <p className={styles.muted}>
              We work to recognised standards and keep qualifications current for compliance and safety.
            </p>

            <div className={styles.certGrid}>
              <a
                className={styles.certItem}
                href="https://www.fgasregister.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/fgas-certification-logo.png"
                  alt="F-Gas Certification"
                  width={160}
                  height={80}
                  loading="lazy"
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.cityandguilds.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/city-and-guilds-certification-logo.png"
                  alt="City & Guilds Certification"
                  width={160}
                  height={80}
                  loading="lazy"
                />
              </a>

              <a
                className={styles.certItem}
                href="https://mcscertified.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/mcs-certification-logo.png"
                  alt="MCS Certification"
                  width={160}
                  height={80}
                  loading="lazy"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} aria-labelledby="cooling-faq">
        <div className={styles.sectionInner}>
          <motion.h2
            id="cooling-faq"
            className={styles.sectionTitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Cooling FAQs
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
              Tell us what system you have and what’s happening — we’ll advise on next steps and arrange a visit.
            </p>
            <Button text="Contact Us" href="/contact" variant="primary" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
