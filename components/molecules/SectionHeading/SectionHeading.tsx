import { cn } from '@/lib/utils'
import styles from './SectionHeading.module.scss'

interface SectionHeadingProps {
  overline?: string // Small monospace label above heading
  heading: string // Main heading text
  subtext?: string // Optional supporting sentence
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  overline,
  heading,
  subtext,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(styles.wrapper, styles[align], className)}>
      {overline && (
        <p className={styles.overline} aria-hidden="true">
          {overline}
        </p>
      )}
      <h2 className={styles.heading}>{heading}</h2>
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </div>
  )
}
