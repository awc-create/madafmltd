"use client";

import Image from "next/image";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import styles from "./About.module.scss";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutClient() {
  const reduce = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <main className={styles.page}>
      {/* HERO (glass panel) */}
      <header className={styles.hero} aria-labelledby="about-title">
        <motion.div
          className={styles.heroInner}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className={styles.eyebrow}>About Mada Facility Management</p>

          <h1 id="about-title" className={styles.title}>
            Electrical &amp; cooling specialists built on compliance,
            workmanship and reliability.
          </h1>

          <p className={styles.lead}>
            We design, install and maintain high-efficiency electrical and
            cooling systems for residential, commercial and industrial projects
            — with a strong focus on safety, documentation and long-term
            performance.
          </p>

          <div className={styles.heroGrid}>
            <div className={styles.heroLogo}>
              <Image
                src="/assets/logo/logo-full.png"
                alt="Mada Facility Management Ltd Logo"
                width={420}
                height={420}
                priority
              />
            </div>

            <div className={styles.heroPills} aria-label="Highlights">
              <span className={styles.pill}>NAPIT • NICEIC • ECS</span>
              <span className={styles.pill}>Commercial &amp; domestic</span>
              <span className={styles.pill}>Install • Maintain • Repair</span>
              <span className={styles.pill}>Clear reporting</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* FOUNDER + VALUES (two panels) */}
      <section className={styles.section} aria-labelledby="founder-title">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.twoCol}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.article className={styles.panel} variants={fadeUp}>
              <h2 id="founder-title" className={styles.h2}>
                Meet the Founder &amp; Engineer
              </h2>
              <p className={styles.p}>
                I’m a NAPIT, NICEIC &amp; ECS-registered engineer with 15 years
                of hands-on experience. From complex rewires to smart home
                setups and air-conditioning installs, I handle projects
                personally — end-to-end.
              </p>

              <div className={styles.statsRow} aria-label="Quick stats">
                <div className={styles.stat}>
                  <span className={styles.statNum}>15+</span>
                  <span className={styles.statLabel}>Years experience</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>UK-wide</span>
                  <span className={styles.statLabel}>Coverage</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>24/7</span>
                  <span className={styles.statLabel}>Support options</span>
                </div>
              </div>
            </motion.article>

            <motion.article className={styles.panelWarm} variants={fadeUp}>
              <h2 className={styles.h2}>Core Values</h2>
              <ul className={styles.values}>
                <li>
                  <strong>Safety first:</strong> tested, compliant work on every
                  job.
                </li>
                <li>
                  <strong>Sustainability:</strong> energy-efficient designs and
                  sensible solutions.
                </li>
                <li>
                  <strong>Reliability:</strong> clear communication, clean
                  installs, dependable aftercare.
                </li>
              </ul>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className={styles.section} aria-labelledby="about-certs">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.panel}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 id="about-certs" className={styles.h2Center}>
              Certifications & Accreditations
            </h2>

            <p className={styles.muted}>
              We work to recognised UK standards and keep all qualifications
              current for compliance, safety and peace of mind.
            </p>

            <div className={styles.certGrid}>
              <a
                className={styles.certItem}
                href="https://www.napit.org.uk/"
                target="_blank"
              >
                <Image
                  src="/images/napit-certification-logo.png"
                  alt="NAPIT Certification"
                  width={160}
                  height={80}
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.niceic.com/"
                target="_blank"
              >
                <Image
                  src="/images/niceic-certification-logo.png"
                  alt="NICEIC Approved Contractor"
                  width={160}
                  height={80}
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.ecscard.org.uk/"
                target="_blank"
              >
                <Image
                  src="/images/ecs-certification-logo.png"
                  alt="ECS Certification"
                  width={160}
                  height={80}
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.electricalsafetyfirst.org.uk/"
                target="_blank"
              >
                <Image
                  src="/images/electrical-safety-first-certification-logo.png"
                  alt="Electrical Safety First"
                  width={160}
                  height={80}
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.cityandguilds.com/"
                target="_blank"
              >
                <Image
                  src="/images/city-and-guilds-certification-logo.png"
                  alt="City & Guilds Certification"
                  width={160}
                  height={80}
                />
              </a>

              <a
                className={styles.certItem}
                href="https://www.fgasregister.com/"
                target="_blank"
              >
                <Image
                  src="/images/fgas-certification-logo.png"
                  alt="F-Gas Certification"
                  width={160}
                  height={80}
                />
              </a>

              <a
                className={styles.certItem}
                href="https://mcscertified.com/"
                target="_blank"
              >
                <Image
                  src="/images/mcs-certification-logo.png"
                  alt="MCS Certification"
                  width={160}
                  height={80}
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA (dark panel like your bottom CTA) */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.bottomCta}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className={styles.bottomTitle}>Work with an expert</h2>
            <p className={styles.bottomText}>
              Tell us what you need — we’ll advise the best approach and provide
              a clear, compliant quote.
            </p>
            <a className={styles.ctaButton} href="/contact">
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
