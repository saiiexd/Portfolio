import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import Button from '@/components/atoms/Button/Button'
import { RESUME_PATH } from '@/lib/constants'
import styles from './resume.module.scss'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of Sai Venkat — AI/ML and Data Engineering.',
}

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.overline}>Document</p>
          <h1 className={styles.heading}>Résumé</h1>
          <div className={styles.actions}>
            <Button
              as="a"
              href={RESUME_PATH}
              variant="primary"
              target="_blank"
              iconLeft={<Download size={16} />}
            >
              Download PDF
            </Button>
          </div>
        </header>

        {/* PDF embed */}
        <div className={styles.pdfWrapper}>
          {/* TODO: Add resume.pdf to /public/resume.pdf */}
          <iframe
            src={RESUME_PATH}
            className={styles.pdfFrame}
            title="Sai Venkat — Résumé"
            aria-label="Resume PDF viewer"
          />
        </div>
      </div>
    </div>
  )
}
