// src/app/contact/ContactForm.tsx
"use client";

import React, { useMemo, useState } from "react";
import styles from "./Contact.module.scss";
import { serviceOptions } from "@/lib/serviceOptions";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";

const MotionA = motion.a;

type ThemeKey = "cooling" | "electrical" | "security";

function themeFromSubject(subject: string): ThemeKey {
  const s = subject.toLowerCase();

  if (s.includes("cooling") || s.includes("hvac") || s.includes("refriger"))
    return "cooling";
  if (s.includes("elect") || s.includes("wiring") || s.includes("panel"))
    return "electrical";
  if (s.includes("secur") || s.includes("cctv") || s.includes("alarm"))
    return "security";

  // default
  return "cooling";
}

const ContactForm: React.FC = () => {
  const reduce = useReducedMotion();

  const [subServices, setSubServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    subject: "",
    subService: "",
    message: "",
  });

  const theme = themeFromSubject(formData.subject || "");

  const quickMotion = useMemo(
    () => ({
      whileHover: reduce ? {} : { y: -2, scale: 1.01 },
      whileTap: reduce ? {} : { scale: 0.99 },
      transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] as const },
    }),
    [reduce]
  );

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = e.target.value;
    const nextSubs = serviceOptions[service] || [];

    setSubServices(nextSubs);
    setFormData((prev) => ({
      ...prev,
      subject: service,
      subService: nextSubs[0] ?? "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Your request has been sent.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        subject: "",
        subService: "",
        message: "",
      });
      setSubServices([]);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.contactContainer} data-theme={theme}>
      <h1>Contact Us</h1>

      <div className={styles.quickActions} aria-label="Quick contact options">
        <MotionA
          {...quickMotion}
          href="tel:+447908833222"
          aria-label="Call us"
          className={styles.quickLink}
        >
          <span className={`${styles.icon} ${styles.phone}`} aria-hidden="true">
            <Icon icon="mdi:phone" width="18" height="18" />
          </span>
          Call
        </MotionA>

        <MotionA
          {...quickMotion}
          href="https://wa.me/447908833222"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
          className={`${styles.quickLink} ${styles.whatsAppBoost}`}
        >
          <span
            className={`${styles.icon} ${styles.whatsapp}`}
            aria-hidden="true"
          >
            <Icon icon="mdi:whatsapp" width="18" height="18" />
          </span>
          WhatsApp
        </MotionA>

        <MotionA
          {...quickMotion}
          href="mailto:localmaintenance75@gmail.com"
          aria-label="Email us"
          className={`${styles.quickLink} ${styles.emailOnlyDesktop}`}
        >
          <span className={`${styles.icon} ${styles.email}`} aria-hidden="true">
            <Icon icon="mdi:email-outline" width="18" height="18" />
          </span>
          Email
        </MotionA>
      </div>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name *</label>
          <input id="name" name="name" required value={formData.name} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Phone Number (UK) *</label>
          <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label htmlFor="postcode">Postcode (UK) *</label>
          <input id="postcode" name="postcode" required value={formData.postcode} onChange={handleChange} />
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="subject">Service *</label>
          <select id="subject" name="subject" required value={formData.subject} onChange={handleServiceChange}>
            <option value="" disabled>
              Select a service
            </option>
            {Object.keys(serviceOptions).map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {subServices.length > 0 && (
          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor="subService">Sub-Service *</label>
            <select id="subService" name="subService" required value={formData.subService} onChange={handleChange}>
              {subServices.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Briefly describe the issue or installation required…"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Request
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
