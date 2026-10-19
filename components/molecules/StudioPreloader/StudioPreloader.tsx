'use client'

import { useEffect, useState } from 'react'
import styles from './StudioPreloader.module.scss'

export default function StudioPreloader() {
  const [percent, setPercent] = useState(0)
  const [complete, setComplete] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Check session storage or reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const hasSeenPreloader = sessionStorage.getItem('sai_preloader_shown')

    if (prefersReducedMotion || hasSeenPreloader) {
      const frameId = requestAnimationFrame(() => setHidden(true))
      return () => cancelAnimationFrame(frameId)
    }

    // Fast, rhythmic counter
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 12
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setPercent(100)
        setTimeout(() => {
          setComplete(true)
          sessionStorage.setItem('sai_preloader_shown', 'true')
          setTimeout(() => setHidden(true), 600)
        }, 150)
      } else {
        setPercent(current)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [])

  if (hidden) return null

  return (
    <div
      className={`${styles.preloader} ${complete ? styles.exit : ''}`}
      aria-hidden="true"
    >
      <div className={styles.preloaderInner}>
        <div className={styles.topMeta}>
          <span className={styles.systemTag}>SYSTEM_KERNEL // INIT</span>
          <span className={styles.locationTag}>HYDERABAD, IN</span>
        </div>

        <div className={styles.titleWrap}>
          <span className={styles.titleLine}>SAI VENKAT</span>
          <span className={styles.subLine}>AI &amp; DATA PLATFORM SYSTEMS</span>
        </div>

        <div className={styles.counterRow}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
          </div>
          <span className={styles.percentText}>{String(percent).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
