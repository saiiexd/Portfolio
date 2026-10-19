'use client'

import { useState } from 'react'
import styles from './FraudDetectionFlow.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function FraudDetectionFlow({ mode = 'full' }: Props) {
  const [activeTx, setActiveTx] = useState<'legit' | 'fraud'>('fraud')

  const txData = {
    legit: {
      id: 'tx_sample_a8',
      amount: 'Verified Transaction',
      merchant: 'Domestic Merchant',
      velocity: 'Baseline Velocity',
      geoDelta: 'Consistent Location',
      riskScore: 0.05,
      verdict: 'APPROVED',
      action: 'Direct Settlement',
      latency: 'Low Latency',
    },
    fraud: {
      id: 'tx_sample_x9',
      amount: 'Anomalous Transaction',
      merchant: 'High-Risk Merchant',
      velocity: 'Velocity Surge',
      geoDelta: 'IP Geolocation Delta',
      riskScore: 0.92,
      verdict: 'BLOCKED',
      action: 'Trigger Verification Challenge',
      latency: 'Online Evaluation',
    },
  }[activeTx]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── Real-Time Streaming Header ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>STREAMING FRAUD DETECTION PIPELINE</span>
          <span className={styles.engineTag}>
            Kafka · PySpark · Scikit-learn · PostgreSQL
          </span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>EVENT BROKER</span>
            <span className={styles.statVal}>Apache Kafka</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>STREAM ENGINE</span>
            <span className={styles.statVal}>PySpark Structured Streaming</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>DECISION SINK</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              PostgreSQL + DLQ
            </span>
          </span>
        </div>
      </div>

      {/* ── Architecture Pipeline Grid ── */}
      <div className={styles.pipelineBody}>
        {/* Stage 1: Ingestion */}
        <div className={styles.pipeStage}>
          <div className={styles.stageTop}>
            <span className={styles.stageNum}>STAGE 01</span>
            <span className={styles.stagePill}>EVENT INGESTION</span>
          </div>
          <div className={styles.stageTitle}>Transaction Stream</div>
          <div className={styles.streamPayload}>
            <div className={styles.payloadRow}>
              <span>Tx ID:</span>
              <code>{txData.id}</code>
            </div>
            <div className={styles.payloadRow}>
              <span>Amount:</span>
              <span className={styles.amountText}>{txData.amount}</span>
            </div>
            <div className={styles.payloadRow}>
              <span>Merchant:</span>
              <span className={styles.textMuted}>{txData.merchant}</span>
            </div>
          </div>
        </div>

        {/* Stage 2: Feature Engineering */}
        <div className={styles.pipeStage}>
          <div className={styles.stageTop}>
            <span className={styles.stageNum}>STAGE 02</span>
            <span className={styles.goldPill}>FEATURE CACHE</span>
          </div>
          <div className={styles.stageTitle}>Sliding Window Features</div>
          <div className={styles.featureList}>
            <div className={styles.featItem}>
              <span className={styles.featKey}>Velocity (10m):</span>
              <span className={activeTx === 'fraud' ? styles.featAlert : styles.featOk}>
                {txData.velocity}
              </span>
            </div>
            <div className={styles.featItem}>
              <span className={styles.featKey}>Geo Anomaly:</span>
              <span className={activeTx === 'fraud' ? styles.featAlert : styles.featOk}>
                {txData.geoDelta}
              </span>
            </div>
            <div className={styles.featItem}>
              <span className={styles.featKey}>Device Hash:</span>
              <code>sha256_match: {activeTx === 'fraud' ? 'False' : 'True'}</code>
            </div>
          </div>
        </div>

        {/* Stage 3: Inference */}
        <div className={styles.pipeStage}>
          <div className={styles.stageTop}>
            <span className={styles.stageNum}>STAGE 03</span>
            <span className={styles.stagePill}>ML INFERENCE</span>
          </div>
          <div className={styles.stageTitle}>Random Forest / GBDT</div>
          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeHeader}>
              <span>Risk Probability</span>
              <span
                className={activeTx === 'fraud' ? styles.scoreRed : styles.scoreGreen}
              >
                {(txData.riskScore * 100).toFixed(0)}%
              </span>
            </div>
            <div className={styles.riskTrack}>
              <div
                className={`${styles.riskFill} ${activeTx === 'fraud' ? styles.fillRed : styles.fillGreen}`}
                style={{ width: `${txData.riskScore * 100}%` }}
              />
            </div>
            <div className={styles.thresholdMarks}>
              <span>0.0 (Legit)</span>
              <span className={styles.threshLine}>Thresh: 0.75</span>
              <span>1.0 (Fraud)</span>
            </div>
          </div>
        </div>

        {/* Stage 4: Decision & Action */}
        <div
          className={`${styles.pipeStage} ${activeTx === 'fraud' ? styles.stageAlert : styles.stageSuccess}`}
        >
          <div className={styles.stageTop}>
            <span className={styles.stageNum}>STAGE 04</span>
            <span className={activeTx === 'fraud' ? styles.redPill : styles.tealPill}>
              DECISION SINK
            </span>
          </div>
          <div className={styles.stageTitle}>Action Trigger</div>
          <div className={styles.verdictBox}>
            <div
              className={
                activeTx === 'fraud' ? styles.verdictBlocked : styles.verdictApproved
              }
            >
              {txData.verdict}
            </div>
            <p className={styles.actionNote}>{txData.action}</p>
            <span className={styles.execSpeed}>Inference Time: {txData.latency}</span>
          </div>
        </div>
      </div>

      {/* ── Transaction Simulator Selector (Full View) ── */}
      {mode === 'full' && (
        <div className={styles.simBar}>
          <span className={styles.simLabel}>STREAM SIMULATION TRIGGER:</span>
          <div className={styles.simBtns}>
            <button
              type="button"
              className={`${styles.simBtn} ${activeTx === 'legit' ? styles.simActiveGreen : ''}`}
              onClick={() => setActiveTx('legit')}
            >
              Simulate Verified Transaction ($34.50 Local Grocery)
            </button>
            <button
              type="button"
              className={`${styles.simBtn} ${activeTx === 'fraud' ? styles.simActiveRed : ''}`}
              onClick={() => setActiveTx('fraud')}
            >
              Simulate High-Velocity Outlier ($2,850 Cross-Border IP)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
