import { ArrowRight } from 'lucide-react'
import styles from './ArchitectureFlow.module.scss'

interface Props {
  steps: string[]
  className?: string
}

export default function ArchitectureFlow({ steps, className }: Props) {
  if (!steps || steps.length === 0) return null

  return (
    <div
      className={`${styles.flowContainer} ${className || ''}`}
      aria-label="System Architecture Execution Flow"
    >
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'contents' }}>
          <div className={styles.stepNode} title={step}>
            <span className={styles.stepIndex}>0{idx + 1}</span>
            <span className={styles.stepLabel}>{step}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={styles.connector} aria-hidden="true">
              <ArrowRight size={11} strokeWidth={2} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
