'use client'

import { useState } from 'react'
import { Mail, Download, Copy, Check, Clock, MapPin, Globe } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/Icon/BrandIcons'
import { SITE_CONFIG, RESUME_PATH } from '@/lib/constants'
import ContactForm from '@/components/organisms/ContactForm/ContactForm'
import styles from './contact.module.scss'

export default function ContactClient() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className={styles.layout}>
      {/* Left: Direct channels & technical availability */}
      <aside className={styles.sidebar} aria-label="Direct contact options">
        <div className={styles.availabilityBox}>
          <div className={styles.statusPill}>
            <span className={styles.livePulse} />
            <span className={styles.availText}>AVAILABLE FOR IMMEDIATE DISCUSSION</span>
          </div>
          <p className={styles.availDesc}>
            Open to AI/ML Engineer, Applied AI / GenAI, and Data Engineering roles (Class
            of 2027).
          </p>
          <div className={styles.locationPills}>
            <span className={styles.locPill}>
              <MapPin size={12} /> India (Open to Remote / Relocation)
            </span>
            <span className={styles.locPill}>
              <Clock size={12} /> IST (UTC+5:30)
            </span>
          </div>
        </div>

        <div className={styles.directLinks}>
          <h2 className={styles.sidebarHeading}>Direct Channels</h2>

          {/* Copyable & Clickable Email Card */}
          <div className={styles.emailCard}>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className={styles.emailLeft}
              title={`Compose email to ${SITE_CONFIG.email}`}
              aria-label={`Send email to ${SITE_CONFIG.email}`}
            >
              <span className={styles.directLinkIcon}>
                <Mail size={18} aria-hidden="true" />
              </span>
              <div className={styles.emailMeta}>
                <span className={styles.directLinkLabel}>Official Recruiter Email</span>
                <span className={styles.directLinkValue}>{SITE_CONFIG.email} ↗</span>
              </div>
            </a>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directLink}
            aria-label="GitHub profile (opens in new tab)"
          >
            <span className={styles.directLinkIcon}>
              <GithubIcon size={18} aria-hidden="true" />
            </span>
            <span className={styles.directLinkContent}>
              <span className={styles.directLinkLabel}>GitHub</span>
              <span className={styles.directLinkValue}>github.com/saiiexd ↗</span>
            </span>
          </a>

          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directLink}
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <span className={styles.directLinkIcon}>
              <LinkedinIcon size={18} aria-hidden="true" />
            </span>
            <span className={styles.directLinkContent}>
              <span className={styles.directLinkLabel}>LinkedIn</span>
              <span className={styles.directLinkValue}>
                linkedin.com/in/sai-venkat-a14436284 ↗
              </span>
            </span>
          </a>

          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directLink}
            aria-label="Download résumé PDF (opens in new tab)"
          >
            <span className={styles.directLinkIcon}>
              <Download size={18} aria-hidden="true" />
            </span>
            <span className={styles.directLinkContent}>
              <span className={styles.directLinkLabel}>Curriculum Vitae</span>
              <span className={styles.directLinkValue}>Download PDF</span>
            </span>
          </a>
        </div>

        <div className={styles.note}>
          <p>
            Response turnaround is typically 1–2 business days. For urgent technical
            discussions, email with a clear subject header is recommended.
          </p>
        </div>
      </aside>

      {/* Right: Message dispatch form */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <h2 className={styles.sidebarHeading}>Transmit Message</h2>
          <span className={styles.secureBadge}>End-to-End Delivery</span>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
