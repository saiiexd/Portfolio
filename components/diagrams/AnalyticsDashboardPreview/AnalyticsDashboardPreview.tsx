'use client'

import { useState } from 'react'
import { Database, Table, BarChart2, Layers, CheckCircle2 } from 'lucide-react'
import styles from './AnalyticsDashboardPreview.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

type SqlViewType = 'monthly' | 'rfm' | 'cohort'

export default function AnalyticsDashboardPreview({ mode = 'full' }: Props) {
  const [activeView, setActiveView] = useState<SqlViewType>('monthly')

  const viewData = {
    monthly: {
      viewName: 'view_monthly_metrics',
      grain: 'One record per calendar month (YYYY-MM)',
      description:
        'Aggregates net sales, gross profit, gross margin percentage, order volume, and repeat customer counts from view_valid_sales.',
      columns: [
        { name: 'calendar_month', type: 'VARCHAR(7)', role: 'Time Dimension' },
        { name: 'total_net_sales', type: 'NUMERIC(12,2)', role: 'Revenue KPI' },
        { name: 'total_gross_profit', type: 'NUMERIC(12,2)', role: 'Margin KPI' },
        { name: 'average_gross_margin', type: 'NUMERIC(6,4)', role: 'Profitability' },
        { name: 'repeat_customer_count', type: 'INTEGER', role: 'Retention' },
      ],
      sampleRows: [
        {
          month: '2024-01',
          revenue: '$148,290.00',
          margin: '42.8%',
          orders: '1,240',
          repeats: '312',
        },
        {
          month: '2024-02',
          revenue: '$162,450.00',
          margin: '44.1%',
          orders: '1,380',
          repeats: '389',
        },
        {
          month: '2024-03',
          revenue: '$189,110.00',
          margin: '45.6%',
          orders: '1,590',
          repeats: '462',
        },
      ],
    },
    rfm: {
      viewName: 'view_customer_rfm_inputs',
      grain: 'One record per unique customer_id',
      description:
        'Calculates recency days from maximum order reference date, cumulative order frequency, and lifetime net monetary value.',
      columns: [
        { name: 'customer_id', type: 'VARCHAR(50)', role: 'Entity Key' },
        {
          name: 'recency_days',
          type: 'INTEGER',
          role: 'Recency (Days since last order)',
        },
        { name: 'frequency', type: 'INTEGER', role: 'Frequency (Total valid orders)' },
        {
          name: 'monetary_value',
          type: 'NUMERIC(12,2)',
          role: 'Monetary (Lifetime Net Sales)',
        },
        { name: 'monetary_profit', type: 'NUMERIC(12,2)', role: 'Profitability' },
      ],
      sampleRows: [
        {
          month: 'CUST-00918',
          revenue: '$14,250.00',
          margin: '12d (High Recency)',
          orders: '28 orders',
          repeats: 'Tier: Champion',
        },
        {
          month: 'CUST-00421',
          revenue: '$8,190.00',
          margin: '45d (Active)',
          orders: '14 orders',
          repeats: 'Tier: Loyalist',
        },
        {
          month: 'CUST-01104',
          revenue: '$1,420.00',
          margin: '142d (At-Risk)',
          orders: '3 orders',
          repeats: 'Tier: At-Risk',
        },
      ],
    },
    cohort: {
      viewName: 'view_cohort_analysis',
      grain: 'One record per Cohort Month and subsequent Month Offset',
      description:
        'Tracks customer first-purchase date against subsequent activity months to measure user retention decay curves.',
      columns: [
        { name: 'cohort_month', type: 'VARCHAR(7)', role: 'First Purchase Month' },
        { name: 'cohort_size', type: 'INTEGER', role: 'Initial Acquired Base' },
        { name: 'month_offset', type: 'INTEGER', role: 'Months Elapsed (0, 1, 2...)' },
        { name: 'active_customers', type: 'INTEGER', role: 'Retained Base' },
        { name: 'total_revenue', type: 'NUMERIC(12,2)', role: 'Period Revenue' },
      ],
      sampleRows: [
        {
          month: '2024-01 (M+0)',
          revenue: '$45,200.00',
          margin: '100% Retained',
          orders: '420 users',
          repeats: 'Base Cohort',
        },
        {
          month: '2024-01 (M+1)',
          revenue: '$19,840.00',
          margin: '43.8% Retained',
          orders: '184 users',
          repeats: 'Decay Step 1',
        },
        {
          month: '2024-01 (M+2)',
          revenue: '$14,110.00',
          margin: '31.2% Retained',
          orders: '131 users',
          repeats: 'Decay Step 2',
        },
      ],
    },
  }[activeView]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Telemetry ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>
            BUSINESS ANALYTICS &amp; DECISION INTELLIGENCE
          </span>
          <span className={styles.versionTag}>
            PostgreSQL Views · FastAPI · Streamlit
          </span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>DATABASE</span>
            <span className={styles.statVal}>PostgreSQL 16 Relational</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SQL VIEWS</span>
            <span className={styles.statVal}>Native PostgreSQL (Zero dbt)</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SEGMENTATION</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>RFM + Cohorts</span>
          </span>
        </div>
      </div>

      {/* ── 4-Stage Architectural Flow ── */}
      <div className={styles.pipelineBody}>
        <div className={styles.stagesGrid}>
          {/* Stage 1: Relational Tables */}
          <div className={styles.stageCard}>
            <div className={styles.stageTop}>
              <span className={styles.stageIndex}>01 / SCHEMA</span>
              <Database size={13} className={styles.cardIcon} />
            </div>
            <h4 className={styles.stageTitle}>Relational Tables</h4>
            <p className={styles.stageDesc}>
              Normalized PostgreSQL schema with primary and foreign key constraints on
              transactions.
            </p>
            <div className={styles.stageTags}>
              <span>orders</span>
              <span>order_items</span>
              <span>customers</span>
              <span>products</span>
            </div>
          </div>

          <div className={styles.flowArrow} />

          {/* Stage 2: Cleaned Sales View */}
          <div className={styles.stageCard}>
            <div className={styles.stageTop}>
              <span className={styles.stageIndex}>02 / BASE VIEW</span>
              <Table size={13} className={styles.cardIcon} />
            </div>
            <h4 className={styles.stageTitle}>view_valid_sales</h4>
            <p className={styles.stageDesc}>
              Single source of truth joining order items, orders, products, and customer
              segments, excluding returns.
            </p>
            <div className={styles.stageTags}>
              <span>inner_joins</span>
              <span>status_filter</span>
              <span>net_sales</span>
            </div>
          </div>

          <div className={styles.flowArrow} />

          {/* Stage 3: Analytical SQL Views */}
          <div className={`${styles.stageCard} ${styles.stageActive}`}>
            <div className={styles.stageTop}>
              <span className={styles.stageIndex}>03 / AGGREGATION</span>
              <Layers size={13} className={styles.cardIcon} />
            </div>
            <h4 className={styles.stageTitle}>Analytical Views</h4>
            <p className={styles.stageDesc}>
              Pre-computed database views for monthly trends, customer RFM metrics, and
              cohort retention decay.
            </p>
            <div className={styles.stageTags}>
              <span>view_monthly</span>
              <span>view_rfm</span>
              <span>view_cohort</span>
            </div>
          </div>

          <div className={styles.flowArrow} />

          {/* Stage 4: API & Visuals */}
          <div className={styles.stageCard}>
            <div className={styles.stageTop}>
              <span className={styles.stageIndex}>04 / PRESENTATION</span>
              <BarChart2 size={13} className={styles.cardIcon} />
            </div>
            <h4 className={styles.stageTitle}>FastAPI &amp; Streamlit</h4>
            <p className={styles.stageDesc}>
              RESTful API endpoints serving aggregated view payloads to interactive Plotly
              dashboard charts.
            </p>
            <div className={styles.stageTags}>
              <span>/api/monthly</span>
              <span>/api/rfm</span>
              <span>Streamlit</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive SQL View Schema Inspector ── */}
      {mode === 'full' && (
        <div className={styles.inspectorSection}>
          <div className={styles.inspectorHeader}>
            <span className={styles.inspectorTitle}>
              POSTGRESQL ANALYTICAL SQL VIEW INSPECTOR
            </span>
            <div className={styles.viewTabs}>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeView === 'monthly' ? styles.tabActive : ''}`}
                onClick={() => setActiveView('monthly')}
              >
                view_monthly_metrics
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeView === 'rfm' ? styles.tabActive : ''}`}
                onClick={() => setActiveView('rfm')}
              >
                view_customer_rfm_inputs
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeView === 'cohort' ? styles.tabActive : ''}`}
                onClick={() => setActiveView('cohort')}
              >
                view_cohort_analysis
              </button>
            </div>
          </div>

          <div className={styles.viewDetails}>
            <div className={styles.metaRow}>
              <div>
                <span className={styles.metaLabel}>VIEW NAME:</span>
                <span className={styles.metaValMono}>{viewData.viewName}</span>
              </div>
              <div>
                <span className={styles.metaLabel}>ANALYTICAL GRAIN:</span>
                <span className={styles.metaVal}>{viewData.grain}</span>
              </div>
            </div>

            <p className={styles.viewDescription}>{viewData.description}</p>

            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>IDENTIFIER / MONTH</th>
                    <th>NET REVENUE</th>
                    <th>GROSS MARGIN / RECENCY</th>
                    <th>VOLUME / ORDERS</th>
                    <th>SEGMENT / TIER</th>
                  </tr>
                </thead>
                <tbody>
                  {viewData.sampleRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.monoCell}>{row.month}</td>
                      <td>{row.revenue}</td>
                      <td>{row.margin}</td>
                      <td>{row.orders}</td>
                      <td>
                        <span className={styles.tagPill}>{row.repeats}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
