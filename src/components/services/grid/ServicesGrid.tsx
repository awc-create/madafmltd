'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import styles from './ServicesGrid.module.scss';
import { SERVICES, type ServiceItem } from '../data';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ThemeKey = ServiceItem['id'];

type CSSVars = React.CSSProperties & {
  '--accent'?: string;
};

function themeVars(theme: ThemeKey): CSSVars {
  switch (theme) {
    case 'cooling':
      return { '--accent': 'var(--svc-cooling)' };
    case 'electrical':
      return { '--accent': 'var(--svc-electrical)' };
    case 'security':
      return { '--accent': 'var(--svc-security)' };
    default:
      return {};
  }
}

export default function ServicesGrid() {
  const reduce = useReducedMotion();

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  };

  return (
    <section className={styles.section} aria-labelledby="services-grid-title">
      <div className={styles.inner}>
        <h2 id="services-grid-title" className={styles.heading}>
          Choose a service
        </h2>

        <motion.div
          className={styles.grid}
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {SERVICES.map((s) => {
            const theme: ThemeKey = s.id;

            return (
              <motion.article
                key={s.id}
                id={s.id}
                className={styles.card}
                data-theme={theme}
                style={themeVars(theme)}
                variants={card}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className={styles.top}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon icon={s.icon} width="34" height="34" />
                  </div>
                  <h3 className={styles.title}>{s.title}</h3>
                </div>

                <p className={styles.desc}>{s.description}</p>

                <ul className={styles.list}>
                  {s.subServices.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link className={styles.cta} href={s.href} aria-label={`Learn more about ${s.title}`}>
                  Learn More
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
