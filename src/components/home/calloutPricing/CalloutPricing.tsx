'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Button from '@/components/button/Button';
import styles from './CalloutPricing.module.scss';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ThemeKey = 'cooling' | 'electrical' | 'security';

const MotionArticle = motion.article;

function themeMeta(theme: ThemeKey) {
  switch (theme) {
    case 'electrical':
      return { label: 'Electrical', badge: '24/7' };
    case 'security':
      return { label: 'Security / CCTV / Fire', badge: 'Commercial' };
    case 'cooling':
    default:
      return { label: 'HVAC / Air Conditioning', badge: 'F-Gas' };
  }
}

export default function CalloutPricing() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  };

  const cards: Array<{
    theme: ThemeKey;
    desc: string;
    rowsTop: Array<{ left: string; right: string }>;
    parts: { left: string; right: string; sub?: string };
    final: { left: string; right: string; muted?: boolean };
  }> = [
    {
      theme: 'cooling',
      desc: 'Cooling diagnostics, repairs and emergency support for homes and businesses.',
      rowsTop: [
        { left: 'Weekday Mon–Fri (9am–5pm)', right: '£40 – £120' },
        { left: 'Emergency / Out-of-hours (5pm–9pm)', right: '£130 – £190+' },
      ],
      parts: {
        left: 'Parts',
        right: 'Charged separately',
        sub: '(confirmed before fitting)',
      },
      final: { left: 'Additional labour (after first hour)', right: '£30 – £90+/hr', muted: true },
    },
    {
      theme: 'electrical',
      desc: 'Urgent fault-finding and emergency call-outs, with compliant, documented work.',
      rowsTop: [
        { left: 'Weekday Mon–Fri (8am–5pm)', right: '£70 – £120' },
        { left: 'Emergency / Out-of-hours (5pm–9pm)', right: '£125 – £155' },
      ],
      parts: {
        left: 'Parts',
        right: 'Charged separately',
        sub: '(confirmed before fitting)',
      },
      final: { left: 'Late night / weekends / bank holidays', right: '£145 – £175+' },
    },
    {
      theme: 'security',
      desc: 'CCTV, access, alarms and fire systems — rapid response and tidy handover.',
      rowsTop: [
        { left: 'Weekday Mon–Fri (8am–5pm)', right: '£120 – £190+' },
        { left: 'Emergency / Out-of-hours (5pm–9pm)', right: '£240 – £300+' },
      ],
      parts: {
        left: 'Parts',
        right: 'Charged separately',
        sub: '(confirmed before fitting)',
      },
      final: { left: 'Additional labour', right: '£30 – £80+/30m', muted: true },
    },
  ];

  return (
    <section className={styles.wrap} aria-label="Emergency Call-Out Pricing">
      <motion.div
        className={styles.inner}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.p className={styles.eyebrow} variants={item}>
          Transparent pricing for urgent call-outs
        </motion.p>

        <motion.h2 className={styles.title} variants={item}>
          Emergency Call-Out Pricing
        </motion.h2>

        <motion.p className={styles.sub} variants={item}>
          For emergencies, it helps to know the call-out ranges upfront. Final costs depend on the issue and any parts
          required — we’ll always confirm before proceeding.
        </motion.p>

        <motion.div className={styles.grid} variants={item}>
          {cards.map((c) => {
            const meta = themeMeta(c.theme);

            return (
              <MotionArticle
                key={c.theme}
                className={styles.card}
                data-theme={c.theme}
                whileHover={reduce ? {} : { y: -6, scale: 1.01 }}
                whileTap={reduce ? {} : { scale: 0.99 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                {/* ===== TOP: title + pill + desc + accent line (fixed height) ===== */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>
                    <h3>{meta.label}</h3>
                    <span className={styles.badge}>{meta.badge}</span>
                  </div>

                  <p className={styles.cardDesc}>{c.desc}</p>

                  <div className={styles.accentLine} aria-hidden="true" />
                </div>

                {/* ===== BODY: Standard → OOH → Parts → Final (uniform) ===== */}
                <div className={styles.body}>
                  {/* Standard */}
                  <div className={styles.block}>
                    <div className={styles.blockDivider} aria-hidden="true" />
                    <div className={styles.row}>
                      <span className={styles.left}>{c.rowsTop[0].left}</span>
                      <strong className={styles.right}>{c.rowsTop[0].right}</strong>
                    </div>
                  </div>

                  {/* Out-of-hours */}
                  <div className={styles.block}>
                    <div className={styles.blockDivider} aria-hidden="true" />
                    <div className={styles.row}>
                      <span className={styles.left}>{c.rowsTop[1].left}</span>
                      <strong className={styles.right}>{c.rowsTop[1].right}</strong>
                    </div>
                  </div>

                  {/* Parts (two-line right side) */}
                  <div className={styles.block}>
                    <div className={styles.blockDivider} aria-hidden="true" />
                    <div className={styles.row}>
                      <span className={styles.left}>{c.parts.left}</span>
                      <span className={styles.partsRight}>
                        <strong className={styles.right}>{c.parts.right}</strong>
                        {c.parts.sub && <span className={styles.subRight}>{c.parts.sub}</span>}
                      </span>
                    </div>
                  </div>

                  {/* Final (differs per service) */}
                  <div className={`${styles.block} ${styles.blockFinal}`}>
                    <div className={styles.blockDivider} aria-hidden="true" />
                    <div className={`${styles.row} ${c.final.muted ? styles.rowMuted : ''}`}>
                      <span className={styles.left}>{c.final.left}</span>
                      <strong className={styles.right}>{c.final.right}</strong>
                    </div>
                  </div>
                </div>
              </MotionArticle>
            );
          })}
        </motion.div>

        <motion.div className={styles.actions} variants={item}>
          <Button
            text="View Emergency Call-Out Prices"
            href="/call-out-pricing"
            aria-label="View emergency call-out pricing"
          />
          <a className={styles.secondary} href="/contact" aria-label="Request an emergency call-out">
            Request a Call-Out
          </a>
        </motion.div>

        <motion.p className={styles.note} variants={item}>
          Parts are charged separately. Emergency rates apply evenings, weekends and bank holidays.
        </motion.p>
      </motion.div>
    </section>
  );
}
