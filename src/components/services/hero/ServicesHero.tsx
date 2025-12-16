'use client';

import { motion, type Variants, useReducedMotion } from 'framer-motion';
import styles from './ServicesHero.module.scss';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicesHero() {
  const reduce = useReducedMotion();

  const wrap: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  };

  return (
    <header className={styles.hero} aria-labelledby="services-hero-title">
      <div className={styles.inner}>
        <motion.div variants={wrap} initial="hidden" animate="show">
          <p className={styles.eyebrow}>Our Services</p>

          <h1 id="services-hero-title" className={styles.title}>
            Expert solutions for homes &amp; businesses.
          </h1>

          <p className={styles.lead}>
            Electrical, cooling, and security services delivered by qualified engineers — with clear
            communication and dependable workmanship.
          </p>
        </motion.div>
      </div>
    </header>
  );
}
