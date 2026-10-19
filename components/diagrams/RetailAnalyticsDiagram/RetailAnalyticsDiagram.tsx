'use client'

import { useState } from 'react'
import { ShoppingCart, Database, TrendingUp, BarChart3, CheckCircle2 } from 'lucide-react'
import styles from './RetailAnalyticsDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function RetailAnalyticsDiagram({ mode = 'full' }: Props) {
  const [horizon, setHorizon] = useState<'30d' | '90d'>('30d')

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Telemetry ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>RETAIL FORECASTING & INTELLIGENCE</span>
          <span className={styles.versionTag}>Prophet · PostgreSQL · FastAPI</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>FORECAST MODEL</span>
            <span className={styles.statVal}>Additive Prophet Decomp</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SEASONALITY</span>
            <span className={styles.statVal}>Weekly + Holiday Cyclical</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>DATA ENGINE</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              PostgreSQL Star Schema
            </span>
          </span>
        </div>
      </div>

      {/* ── Architecture Nodes ── */}
      <div className={styles.pipelineCanvas}>
        <div className={styles.stageGrid}>
          {/* Node 1: Ingestion */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>01</span>
              <ShoppingCart size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Transaction Ingestion</div>
            <p className={styles.nodeDesc}>
              Raw POS registers, SKUs, and customer orders
            </p>
            <div className={styles.nodeMeta}>Pandas ETL Pipeline</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 2: PostgreSQL */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>02</span>
              <Database size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Relational Storage</div>
            <p className={styles.nodeDesc}>
              Aggregated sales views and inventory balances
            </p>
            <div className={styles.nodeMeta}>PostgreSQL Views</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 3: Prophet Forecasting */}
          <div className={`${styles.nodeCard} ${styles.activeCard}`}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>03</span>
              <TrendingUp size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Prophet Model</div>
            <p className={styles.nodeDesc}>
              Non-linear trend estimation with confidence bounds
            </p>
            <div className={styles.nodeMeta}>Time-Series Decomposition</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 4: Streamlit Dashboard */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>04</span>
              <BarChart3 size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Executive Analytics</div>
            <p className={styles.nodeDesc}>
              Streamlit dashboards & reorder threshold triggers
            </p>
            <div className={styles.nodeMeta}>FastAPI + Plotly</div>
          </div>
        </div>
      </div>

      {/* ── Interactive Demand Forecast Pane ── */}
      {mode === 'full' && (
        <div className={styles.inspectionPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              TIME-SERIES INVENTORY DEMAND PROJECTION
            </span>
            <div className={styles.horizonTabs}>
              <button
                type="button"
                className={`${styles.horizonBtn} ${horizon === '30d' ? styles.activeTab : ''}`}
                onClick={() => setHorizon('30d')}
              >
                30-Day Window (Operational)
              </button>
              <button
                type="button"
                className={`${styles.horizonBtn} ${horizon === '90d' ? styles.activeTab : ''}`}
                onClick={() => setHorizon('90d')}
              >
                90-Day Window (Quarterly Planning)
              </button>
            </div>
          </div>

          <div className={styles.forecastGrid}>
            <div className={styles.forecastCard}>
              <span className={styles.cardHeader}>PROJECTED DEMAND UNITS</span>
              <div className={styles.cardValRow}>
                <span className={styles.cardVal}>
                  {horizon === '30d' ? '4,820' : '15,400'}
                </span>
                <span className={styles.cardUnit}>SKUs</span>
              </div>
              <span className={styles.cardSub}>95% Confidence Interval [±4.2%]</span>
            </div>

            <div className={styles.forecastCard}>
              <span className={styles.cardHeader}>WEEKEND DEMAND UPLIFT</span>
              <div className={styles.cardValRow}>
                <span className={styles.cardVal}>+28.4%</span>
                <span className={styles.cardUnit}>Seasonal</span>
              </div>
              <span className={styles.cardSub}>Detected by weekly Fourier terms</span>
            </div>

            <div className={styles.forecastCard}>
              <span className={styles.cardHeader}>REORDER TRIGGER DATE</span>
              <div className={styles.cardValRow}>
                <span className={styles.cardValMono}>Day 18</span>
                <span className={styles.cardUnit}>Lead time: 5d</span>
              </div>
              <span className={styles.cardSub}>Safety stock threshold: 600 units</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
