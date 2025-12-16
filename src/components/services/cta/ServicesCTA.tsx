'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/button/Button';
import styles from './ServicesCTA.module.scss';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicesCTA() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="services-cta-title">
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className={styles.card}
        >
          <h2 id="services-cta-title">Ready to get started?</h2>
          <p>
            Tell us what you need and we’ll come back with a clear plan and a quote.
            Fast response, no hassle.
          </p>
          <Button text="Request a Quote" href="/contact" variant="primary" />
        </motion.div>
      </div>
    </section>
  );
}
