"use client";
import React from 'react';

import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ✅ Footer Links */}
        <div className={styles.footerLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* ✅ Social Media Icons */}
        {/* <div className={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/twitter.svg" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/instagram.svg" alt="Instagram" />
          </a>
        </div> */}

        {/* ✅ Copyright */}
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Madaaircon. All rights reserved.
        </p>
        {/* ✅ Website Credit - AWC */}
        <p className={styles.awcCredit}>
          Website created by{" "}
          <a
            href="https://adaptiveworks.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWC
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
