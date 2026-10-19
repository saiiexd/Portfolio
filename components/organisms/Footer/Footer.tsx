import Link from 'next/link'
import { Mail, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/Icon/BrandIcons'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'
import styles from './Footer.module.scss'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Identity */}
          <div className={styles.identity}>
            <p className={styles.name}>Sai Venkat</p>
            <p className={styles.bio}>AI/ML &amp; Data Engineer · LPU, India</p>
          </div>

          {/* Nav columns */}
          <div className={styles.navColumns}>
            <div className={styles.navColumn}>
              <p className={styles.columnHeading}>Pages</p>
              <nav aria-label="Footer navigation">
                <ul role="list">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.footerLink}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className={styles.navColumn}>
              <p className={styles.columnHeading}>Connect</p>
              <ul role="list">
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className={styles.footerLink}>
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    GitHub <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Sai Venkat. All rights reserved.
          </p>
          <div className={styles.socialIcons}>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className={styles.socialIcon}
              aria-label="Send email"
            >
              <Mail size={16} />
            </a>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub profile (opens in new tab)"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <LinkedinIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
