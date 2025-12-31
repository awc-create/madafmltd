'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@iconify/react';
import styles from './CallOutPricing.module.scss';

type ThemeKey = 'cooling' | 'electrical' | 'security';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function splitPriceNote(text?: string | null) {
  if (!text) return { main: '—', note: undefined as string | undefined };
  const i = text.indexOf('(');
  if (i === -1) return { main: text.trim(), note: undefined };
  return { main: text.slice(0, i).trim(), note: text.slice(i).trim() };
}

const CARD_META: Record<ThemeKey, { title: string; badge: string; icon: string; desc: string }> = {
  cooling: {
    title: 'HVAC / Air Conditioning',
    badge: 'F-Gas',
    icon: 'mdi:snowflake',
    desc: 'Cooling diagnostics, repairs and emergency support for homes and businesses.',
  },
  electrical: {
    title: 'Electrical Call-Outs',
    badge: '24/7',
    icon: 'mdi:flash',
    desc: 'Urgent fault-finding and emergency call-outs, with compliant, documented work.',
  },
  security: {
    title: 'Security / CCTV / Fire',
    badge: 'Commercial',
    icon: 'mdi:shield-check',
    desc: 'CCTV, access, alarms and fire systems — rapid response and tidy handover.',
  },
};

/**
 * Uniform rows:
 * - Standard
 * - Out-of-hours / evenings
 * - Parts
 * - Final row (diff per service)
 */
type BlockKey = 'standard' | 'ooh' | 'parts' | 'final';

type Block = {
  label: string;
  value: string | null;
};

const BLOCKS: Record<ThemeKey, Record<BlockKey, Block>> = {
  cooling: {
    standard: { label: 'Weekday Mon-Fri (9am–5pm)', value: '£40 – £120 (diagnosis + first hour)' },
    ooh: { label: 'Emergency / Out-of-hours (5pm–9pm)', value: '£130 – £190+ (first hour/visit)' },
    parts: { label: 'Parts', value: 'Charged separately (confirmed before fitting)' },
    final: { label: 'Additional labour (after first hour)', value: '£30 – £90+/hr (billed in 30-min increments)' },
  },
  electrical: {
    standard: { label: 'Weekday Mon-Fri (8am–5pm)', value: '£70 – £120 (diagnosis + first hour)' },
    ooh: { label: 'Emergency / Out-of-hours (5pm–9pm)', value: '£125 – £155' },
    parts: { label: 'Parts', value: 'Charged separately (confirmed before fitting)' },
    final: { label: 'Late night / weekends / bank holidays', value: '£145 – £175+' },
  },
  security: {
    standard: { label: 'Weekday Mon-Fri (8am–5pm)', value: '£120 – £190+ (+30 mins labour)' },
    ooh: { label: 'Emergency / Out-of-hours (5pm–9pm)', value: '£240 – £300+ (+30 mins labour)' },
    parts: { label: 'Parts', value: 'Charged separately (confirmed before fitting)' },
    final: { label: 'Additional labour', value: '£30 – £80+ per 30 mins (or part thereof)' },
  },
};

export default function CalloutPricing() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.wrap} aria-label="Emergency call-out pricing">
      <div className={styles.inner}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          Emergency Call-Out Pricing
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.05 }}
        >
          Transparent ranges for urgent call-outs. Final costs depend on the issue and any parts required — we’ll confirm
          before proceeding.
        </motion.p>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
        >
          {(['cooling', 'electrical', 'security'] as ThemeKey[]).map((theme) => {
            const meta = CARD_META[theme];
            const b = BLOCKS[theme];

            return (
              <motion.div
                key={theme}
                className={styles.card}
                data-theme={theme}
                whileHover={reduce ? {} : { y: -6, scale: 1.01 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                {/* ===== Header: fixed structure ===== */}
                <div className={styles.header}>
                  <div className={styles.headTop}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon icon={meta.icon} width="18" height="18" />
                    </span>

                    <span className={styles.h3}>{meta.title}</span>

                    <span className={styles.badge}>{meta.badge}</span>
                  </div>

                  <p className={styles.desc}>{meta.desc}</p>
                </div>

                <div className={styles.hr} aria-hidden="true" />

                {/* ===== Standard ===== */}
                <div className={styles.row}>
                  <span className={styles.rowLabel}>{b.standard.label}</span>
                  <span className={styles.rowValueWrap}>
                    {(() => {
                      const { main, note } = splitPriceNote(b.standard.value);
                      return (
                        <>
                          <strong className={styles.rowValue}>{main}</strong>
                          {note && <span className={styles.note}>{note}</span>}
                        </>
                      );
                    })()}
                  </span>
                </div>

                <div className={styles.sep} aria-hidden="true" />

                {/* ===== Out-of-hours / evenings ===== */}
                <div className={styles.row}>
                  <span className={styles.rowLabel}>{b.ooh.label}</span>
                  <span className={styles.rowValueWrap}>
                    {(() => {
                      const { main, note } = splitPriceNote(b.ooh.value);
                      return (
                        <>
                          <strong className={styles.rowValue}>{main}</strong>
                          {note && <span className={styles.note}>{note}</span>}
                        </>
                      );
                    })()}
                  </span>
                </div>

                <div className={styles.sep} aria-hidden="true" />

                {/* ===== Parts ===== */}
                <div className={styles.row}>
                  <span className={styles.rowLabel}>{b.parts.label}</span>
                  <span className={styles.rowValueWrap}>
                    {(() => {
                      if (b.parts.value === null) return <strong className={`${styles.rowValue} ${styles.empty}`}>—</strong>;
                      const { main, note } = splitPriceNote(b.parts.value);
                      return (
                        <>
                          <strong className={styles.rowValue}>{main}</strong>
                          {note && <span className={styles.note}>{note}</span>}
                        </>
                      );
                    })()}
                  </span>
                </div>

                <div className={styles.sep} aria-hidden="true" />

                {/* ===== Final row (diff per service) ===== */}
                <div className={`${styles.row} ${styles.finalRow}`}>
                  <span className={styles.rowLabel}>{b.final.label}</span>
                  <span className={styles.rowValueWrap}>
                    {(() => {
                      const { main, note } = splitPriceNote(b.final.value);
                      return (
                        <>
                          <strong className={styles.rowValue}>{main}</strong>
                          {note && <span className={styles.note}>{note}</span>}
                        </>
                      );
                    })()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className={styles.actions}>
          <a className={styles.primary} href="/call-out-pricing" aria-label="View full call-out pricing">
            View full pricing
          </a>
          <a className={styles.secondary} href="/contact" aria-label="Request an emergency call-out">
            Request a call-out
          </a>
        </div>
      </div>
    </section>
  );
}
