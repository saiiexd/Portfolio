'use client'

import styles from './AnalyticsDashboardPreview.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function AnalyticsDashboardPreview({ mode = 'full' }: Props) {
  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── Pipeline Header ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>ANALYTICS &amp; DECISION INTELLIGENCE</span>
          <span className={styles.illustrativeTag}>Kimball Star Schema Pipeline</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>MODELING</span>
            <span className={styles.statVal}>dbt core</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>DATABASE</span>
            <span className={styles.statVal}>SQL / PostgreSQL</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SEGMENTATION</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>RFM Quintiles</span>
          </span>
        </div>
      </div>

      {/* ── Architecture Pipeline Flow ── */}
      <div className={styles.pipelineBody}>
        <div className={styles.stagesGrid}>
          {/* Stage 1 */}
          <div className={styles.stageCard}>
            <div className={styles.stageIndex}>01 / INGESTION</div>
            <h4 className={styles.stageTitle}>Raw Operational Tables</h4>
            <p className={styles.stageDesc}>
              Raw transactional tables for orders, line-items, customer accounts, and
              product catalog records.
            </p>
            <div className={styles.stageTags}>
              <span>raw_orders</span>
              <span>raw_customers</span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className={styles.stageCard}>
            <div className={styles.stageIndex}>02 / STAGING (DBT)</div>
            <h4 className={styles.stageTitle}>Cleansing &amp; Typing</h4>
            <p className={styles.stageDesc}>
              Modular dbt view models enforcing primary key uniqueness, timestamp
              standardization, and type casting.
            </p>
            <div className={styles.stageTags}>
              <span>stg_orders</span>
              <span>stg_customers</span>
            </div>
          </div>

          {/* Stage 3 */}
          <div className={styles.stageCard}>
            <div className={styles.stageIndex}>03 / MARTS (STAR SCHEMA)</div>
            <h4 className={styles.stageTitle}>Dimensions &amp; Facts</h4>
            <p className={styles.stageDesc}>
              Kimball dimensional modeling building centralized fact tables and
              surrogate-keyed dimension entities.
            </p>
            <div className={styles.stageTags}>
              <span>fct_orders</span>
              <span>dim_customers</span>
            </div>
          </div>

          {/* Stage 4 */}
          <div className={styles.stageCard}>
            <div className={styles.stageIndex}>04 / DECISION LAYER</div>
            <h4 className={styles.stageTitle}>RFM &amp; Cohort Analysis</h4>
            <p className={styles.stageDesc}>
              Windowed SQL aggregations calculating customer retention curves and
              quintile-based behavioral scores.
            </p>
            <div className={styles.stageTags}>
              <span>cohort_retention</span>
              <span>rfm_tiers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
