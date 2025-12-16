// src/components/home/services/Services.tsx
'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Button from '@/components/button/Button';
import styles from './Services.module.scss';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    id: 'electrical',
    title: 'Electrical Contracting',
    description:
      'Certified electricians offering 24/7 emergency repairs, rewiring, lighting upgrades, and smart home installations across London & the UK.',
    icon: 'fluent-color:lightbulb-filament-48',
    iconColor: '#f59e0b',
    href: '/services/electrical',
  },
  {
    id: 'cooling',
    title: 'Cooling Systems',
    description:
      'F-Gas certified cooling engineers specializing in energy-efficient air conditioning installation, maintenance & repair for homes and businesses.',
    icon: 'mdi:air-conditioner',
    iconColor: '#3b82f6',
    href: '/services/cooling',
  },
  {
    id: 'security',
    title: 'Security Solutions',
    description:
      'Advanced CCTV, alarm and access control installations to protect residential and commercial properties throughout London & the UK.',
    icon: 'mdi:security',
    iconColor: '#ef4444',
    href: '/services/security',
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  const wrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  };

  return (
    <section className={styles.servicesSection} aria-labelledby="services-heading">
      <motion.h2
        id="services-heading"
        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        What We Provide
      </motion.h2>

      <motion.div
        className={styles.grid}
        variants={wrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {services.map((svc) => (
          <motion.article
            key={svc.id}
            className={styles.card}
            variants={card}
            whileHover={reduce ? undefined : { y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className={styles.iconCircle} style={{ background: svc.iconColor + '20' }}>
              <Icon icon={svc.icon} width={48} height={48} style={{ color: svc.iconColor }} aria-hidden="true" />
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.description}</p>

            <Button
              text="Learn More"
              href={svc.href}
              variant="primary"
              aria-label={`Learn more about ${svc.title.toLowerCase()}`}
              className={styles.button}
            />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
