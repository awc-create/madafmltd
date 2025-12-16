//  src/components/home/review/ReviewSlider.tsx
"use client";
import React from 'react';
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ReviewSlider.module.scss";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: "Yusuf",
    rating: 5,
    review: "Excellent service! The team was professional and efficient.",
  },
  {
    name: "Sarah Johnson",
    rating: 4,
    review: "Very satisfied with the installation. Highly recommend!",
  },
  {
    name: "Ayaan Ali",
    rating: 5,
    review: "The technicians were punctual and did a fantastic job.",
  },
  {
    name: "Mohamed Yusuf",
    rating: 4,
    review: "Great quality and friendly staff—would use their services again!",
  },
];

const ReviewSlider: React.FC = () => {
  const reduce = useReducedMotion();

  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={i < rating ? "mdi:star" : "mdi:star-outline"}
        width="24"
        height="24"
        style={{ color: "#FFD700" }}
        aria-hidden="true"
      />
    ));

  return (
    <motion.section
      className={styles.reviewSection}
      aria-labelledby="reviews-heading"
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.h2
        id="reviews-heading"
        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        What Our Clients Say
      </motion.h2>

      <Slider {...settings} className={styles.slider}>
        {reviews.map((r, idx) => (
          <motion.div
            key={idx}
            className={styles.reviewBox}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className={styles.stars}>{renderStars(r.rating)}</div>
            <p className={styles.reviewText}>&quot;{r.review}&quot;</p>
            <p className={styles.reviewerName}>— {r.name}</p>
          </motion.div>
        ))}
      </Slider>
    </motion.section>
  );
};

export default ReviewSlider;
