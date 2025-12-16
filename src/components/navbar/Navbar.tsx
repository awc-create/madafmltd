"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Navbar.module.scss";

const SERVICES = [
  { label: "Cooling", href: "/services/cooling" },
  { label: "Electrical", href: "/services/electrical" },
  { label: "Security", href: "/services/security" },
];

type ThemeKey = "default" | "cooling" | "electrical" | "security";

function themeFromPath(pathname: string): ThemeKey {
  const p = (pathname || "").toLowerCase();

  if (p.startsWith("/services/cooling")) return "cooling";
  if (p.startsWith("/services/electrical")) return "electrical";
  if (p.startsWith("/services/security")) return "security";

  // optional: if you're on /services but not a leaf page
  if (p.startsWith("/services")) return "cooling";

  return "default";
}

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  // Theme derived from current route
  const theme = useMemo(() => themeFromPath(pathname), [pathname]);

  // Escape key closes mobile drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className={styles.navbar} data-theme={theme}>
      <div className={styles.inner}>
        {/* LOGO */}
        <Link href="/" onClick={closeAll} className={styles.logo}>
          <Image
            src="/assets/logo/logo.png"
            alt="Mada Facility Management Ltd"
            width={190}
            height={44}
            priority
            className={styles.logoImg}
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className={styles.desktopLinks}>
          {/* Services dropdown – hover only, no arrow */}
          <div className={styles.servicesDropdown}>
            <Link href="/services" className={styles.servicesLink}>
              Services
            </Link>

            <div className={styles.dropdownMenu} role="menu" aria-label="Services">
              {SERVICES.map((s) => (
                <Link key={s.href} role="menuitem" href={s.href}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          className={styles.hamburger}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon icon={mobileOpen ? "mdi:close" : "mdi:menu"} width="28" height="28" />
        </button>
      </div>

      {/* BACKDROP */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Close menu backdrop"
            onClick={closeAll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className={styles.mobileNav}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            <div className={styles.drawerHeader}>
              <Image
                src="/assets/logo/logo.png"
                alt="Mada Facility Management Ltd"
                width={150}
                height={36}
                priority
                className={styles.logoImg}
              />
              <button onClick={closeAll} className={styles.closeBtn} aria-label="Close menu">
                <Icon icon="mdi:close" width="24" height="24" />
              </button>
            </div>

            <ul className={styles.mobileList}>
              {/* Services accordion */}
              <li className={styles.servicesItem}>
                <div className={styles.servicesRow}>
                  <Link href="/services" onClick={closeAll} className={styles.mobileTopLink}>
                    Services
                  </Link>

                  <button
                    type="button"
                    className={styles.servicesToggle}
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-submenu"
                    aria-label="Toggle services submenu"
                  >
                    <Icon
                      icon={mobileServicesOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                      width="20"
                      height="20"
                    />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.ul
                      id="mobile-services-submenu"
                      className={styles.mobileSubList}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {SERVICES.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} onClick={closeAll}>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link href="/about" onClick={closeAll} className={styles.mobileTopLink}>
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" onClick={closeAll} className={styles.mobileTopLink}>
                  Contact
                </Link>
              </li>
            </ul>

            <div className={styles.drawerFooter}>
              <a href="tel:07908833222" aria-label="Call us">
                <Icon icon="mdi:phone" width="24" height="24" />
              </a>
              <a href="mailto:localmaintenance75@gmail.com" aria-label="Email us">
                <Icon icon="mdi:email" width="24" height="24" />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}
