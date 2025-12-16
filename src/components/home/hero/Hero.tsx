'use client';

import Head from 'next/head';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Button from '@/components/button/Button';
import styles from './Hero.module.scss';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/room-hero.webp" as="image" type="image/webp" />
      </Head>

      <header className={styles.hero} role="banner" aria-label="Homepage Hero">
        <div className={styles.imageWrapper} aria-hidden="true">
          <motion.div
            className={styles.imageMotion}
            initial={{ scale: 1.06 }}
            animate={{ scale: reduce ? 1.06 : 1.12 }}
            transition={{ duration: 14, ease: EASE_OUT }}
          >
            <Image
              src="/assets/room-hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        <div className={styles.overlay} />

        <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
          <motion.p className={styles.eyebrow} variants={item}>
            London &amp; UK • 24/7 Emergency • F-Gas Certified
          </motion.p>

          <motion.h1 variants={item}>
            Certified Electricians &amp; F-Gas Air Conditioning Engineers in London &amp; the UK
          </motion.h1>

          <motion.p variants={item}>
            Certified electricians and F-Gas cooling specialists providing 24/7 emergency electrical repairs,
            energy-efficient air conditioning installations, preventative maintenance, and smart home upgrades.
          </motion.p>

          <motion.div variants={item} className={styles.buttonRow}>
            <Button text="Learn More" href="/services" aria-label="Learn more about our services" />
            <a className={styles.secondaryCta} href="/contact" aria-label="Request a call back">
              Request a Call Back
            </a>
          </motion.div>

          <motion.div variants={item} className={styles.trustRow} aria-label="Key trust points">
            <span className={styles.trustPill}>Same-day callouts</span>
            <span className={styles.trustPill}>Residential &amp; commercial</span>
            <span className={styles.trustPill}>Install • Maintain • Repair</span>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.scrollDown}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85, y: reduce ? 0 : [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: EASE_OUT }}
        >
          <Icon icon="mdi:chevron-down" />
        </motion.div>
      </header>
    </>
  );
}
