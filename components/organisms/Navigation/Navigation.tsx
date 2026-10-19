'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Menu, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SITE_CONFIG, RESUME_PATH } from '@/lib/constants'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Detect scroll for nav background blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      // Focus first nav link when menu opens
      const firstLink = mobileMenuRef.current?.querySelector('a')
      firstLink?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  return (
    <>
      <header className={cn(styles.header, isScrolled && styles.scrolled)} role="banner">
        <div className={styles.inner}>
          {/* Logo / Wordmark */}
          <Link href="/" className={styles.logo} aria-label="Sai Venkat — Home">
            <span className={styles.logoName}>SV</span>
            <span className={styles.logoDot} aria-hidden="true">
              .
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className={styles.desktopNav}>
            <ul className={styles.navList} role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      styles.navLink,
                      pathname === item.href && styles.active,
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className={styles.desktopCta}>
            <Link
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeLink}
              aria-label="Download Résumé (opens in new tab)"
            >
              <Download size={14} aria-hidden="true" />
              <span>Résumé</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={styles.overlay}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              className={styles.drawer}
              initial={shouldReduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
            >
              <nav aria-label="Mobile navigation">
                <ul className={styles.mobileNavList} role="list">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.05 + i * 0.06,
                        duration: shouldReduceMotion ? 0 : 0.3,
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          styles.mobileNavLink,
                          pathname === item.href && styles.active,
                        )}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        <span className={styles.mobileIndex}>0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer links */}
              <div className={styles.drawerFooter}>
                <Link
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.drawerResumeLink}
                >
                  <Download size={14} aria-hidden="true" />
                  Download Résumé
                </Link>
                <div className={styles.drawerSocials}>
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    GitHub
                  </a>
                  <a
                    href={SITE_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
