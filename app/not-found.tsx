import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './not-found.module.scss'

export const metadata: Metadata = { title: '404 — Page not found' }

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>Page not found</h1>
        <p className={styles.text}>This page doesn&apos;t exist or has moved.</p>
        <Link href="/" className={styles.link}>
          Go to homepage <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
