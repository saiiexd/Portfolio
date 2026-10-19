'use client'

import { useState } from 'react'
import styles from './TaskQueueDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function TaskQueueDiagram({ mode = 'full' }: Props) {
  const [jobScenario, setJobScenario] = useState<'normal' | 'failure'>('normal')
  const [activeWorker, setActiveWorker] = useState<number>(1)

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── Control Telemetry Header ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>DISTRIBUTED QUEUE COORDINATION</span>
          <span className={styles.techTag}>FastAPI · Redis · Celery</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>MESSAGE BROKER</span>
            <span className={styles.statVal}>Redis Streams</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>EXECUTION MODEL</span>
            <span className={styles.statVal}>Consumer Groups</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>DELIVERY GUARANTEE</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>At-Least-Once</span>
          </span>
        </div>
      </div>

      {/* ── Architecture Diagram Canvas ── */}
      <div className={styles.diagramCanvas}>
        <svg
          viewBox="0 0 880 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgCanvas}
        >
          <defs>
            <linearGradient id="queueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#111111" />
              <stop offset="100%" stopColor="#777777" />
            </linearGradient>
            <linearGradient id="dlqGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#454545" />
              <stop offset="100%" stopColor="#111111" />
            </linearGradient>
          </defs>

          {/* API to Broker */}
          <path
            d="M 180 130 L 280 130"
            stroke="var(--color-border-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Broker to Workers */}
          <path
            d="M 460 130 C 500 130, 500 70, 540 70"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />
          <path
            d="M 460 130 L 540 130"
            stroke="var(--color-border-accent)"
            strokeWidth="1.5"
          />
          <path
            d="M 460 130 C 500 130, 500 190, 540 190"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />

          {/* Worker to Success Result Store */}
          <path
            d="M 680 70 C 720 70, 730 110, 760 110"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />
          <path d="M 680 130 L 760 110" stroke="var(--color-ink)" strokeWidth="1.5" />

          {/* Worker Failure Retry / DLQ Path */}
          <path
            d="M 610 190 C 610 240, 480 240, 400 170"
            stroke={
              jobScenario === 'failure' ? 'var(--color-ink)' : 'var(--color-border-muted)'
            }
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className={jobScenario === 'failure' ? styles.alertPath : ''}
          />
          <path
            d="M 680 190 C 720 190, 730 190, 760 190"
            stroke={
              jobScenario === 'failure' ? 'var(--color-ink)' : 'var(--color-border)'
            }
            strokeWidth="1.5"
          />
        </svg>

        {/* ── HTML Nodes Overlay ── */}
        <div className={styles.nodesOverlay}>
          {/* Node 1: Control Plane */}
          <div className={styles.stageCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNum}>01</span>
              <span className={styles.cardPill}>CONTROL PLANE</span>
            </div>
            <div className={styles.cardTitle}>FastAPI Gateway</div>
            <div className={styles.subMeta}>
              <code>POST /tasks/v1</code>
              <span className={styles.badgeSuccess}>Auth 200</span>
            </div>
          </div>

          {/* Node 2: Coordination / Broker */}
          <div className={`${styles.stageCard} ${styles.brokerCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNum}>02</span>
              <span className={styles.goldPill}>REDIS STREAMS</span>
            </div>
            <div className={styles.cardTitle}>Message Broker & Sets</div>
            <div className={styles.brokerMetrics}>
              <div className={styles.metricRow}>
                <span>Consumer Group:</span>
                <code>compute_workers</code>
              </div>
              <div className={styles.metricRow}>
                <span>Pending ACK:</span>
                <span className={styles.numberVal}>14 jobs</span>
              </div>
            </div>
          </div>

          {/* Node 3: Worker Concurrency Pool */}
          <div className={styles.workerPool}>
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className={`${styles.workerRow} ${activeWorker === id ? styles.activeWorker : ''}`}
                onClick={() => setActiveWorker(id)}
              >
                <div className={styles.workerStatus}>
                  <span className={id === 3 ? styles.idleDot : styles.activeDot} />
                  <span className={styles.workerTitle}>Worker #{id}</span>
                </div>
                <span className={styles.workerTask}>
                  {id === 1
                    ? 'Embedding Indexing'
                    : id === 2
                      ? 'Batch Resizing'
                      : 'Idle (Standby)'}
                </span>
                <span className={styles.workerLoad}>{id === 3 ? '0%' : '74%'}</span>
              </div>
            ))}
          </div>

          {/* Node 4: Sinks (Result DB & DLQ) */}
          <div className={styles.sinksGroup}>
            <div className={`${styles.sinkCard} ${styles.successSink}`}>
              <div className={styles.sinkTop}>
                <span className={styles.tealDot} />
                <span className={styles.sinkLabel}>RESULT BACKEND</span>
              </div>
              <div className={styles.sinkTitle}>PostgreSQL / Redis</div>
              <span className={styles.stateDone}>STATUS: ACKNOWLEDGED</span>
            </div>

            <div
              className={`${styles.sinkCard} ${styles.dlqSink} ${jobScenario === 'failure' ? styles.dlqActive : ''}`}
            >
              <div className={styles.sinkTop}>
                <span className={styles.redDot} />
                <span className={styles.sinkLabel}>DEAD-LETTER QUEUE</span>
              </div>
              <div className={styles.sinkTitle}>DLQ: Quarantine Vault</div>
              <span className={styles.retryInfo}>Max 3 Retries Exhausted</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Scenario Trigger (Full View) ── */}
      {mode === 'full' && (
        <div className={styles.scenarioBar}>
          <div className={styles.scenarioDesc}>
            <span className={styles.label}>INTERACTIVE ARCHITECTURE SIMULATOR:</span>
            <span>
              Observe how jobs traverse workers, handle idempotency, and route to DLQ on
              failure.
            </span>
          </div>
          <div className={styles.btnRow}>
            <button
              type="button"
              className={`${styles.scenarioBtn} ${jobScenario === 'normal' ? styles.btnActive : ''}`}
              onClick={() => setJobScenario('normal')}
            >
              Simulate Normal Execution (ACK)
            </button>
            <button
              type="button"
              className={`${styles.scenarioBtn} ${styles.alertBtn} ${jobScenario === 'failure' ? styles.btnActiveAlert : ''}`}
              onClick={() => setJobScenario('failure')}
            >
              Simulate Failure &amp; DLQ Circuit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
