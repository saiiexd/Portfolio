import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import styles from './contact.module.scss'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Sai Venkat — open to AI/ML Engineer, Applied AI, and Data Engineering roles.',
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <p className={styles.overline}>Communications &amp; Enquiries</p>
          <h1 className={styles.heading}>Initiate Contact</h1>
          <p className={styles.lead}>
            Open to engineering conversations, technical interviews, and collaborations in
            AI/ML evaluation, distributed data systems, and applied machine learning.
          </p>
        </header>

        {/* Client Interface */}
        <ContactClient />
      </div>
    </div>
  )
}
