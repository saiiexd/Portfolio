'use client'

import { useState } from 'react'
import { Server, Layers, ShieldCheck, AlertOctagon, CheckCircle2 } from 'lucide-react'
import styles from './DistributedStreamingDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function DistributedStreamingDiagram({ mode = 'full' }: Props) {
  const [scenario, setScenario] = useState<'normal' | 'dlq'>('normal')
  const [selectedPartition, setSelectedPartition] = useState<number>(0)

  const scenarioData = {
    normal: {
      eventId: 'evt_fin_9824_ok',
      topic: 'transactions.incoming',
      partition: 'P0',
      offset: '481,209',
      dedupStatus: 'Lock Acquired (Redis 30s TTL)',
      postgresAction: 'State Committed -> STATUS: SETTLED',
      commitAction: 'Offset Manually Committed (auto_commit=False)',
      dlqRouting: 'BYPASSED',
      isDlq: false,
    },
    dlq: {
      eventId: 'evt_fin_9825_corrupt',
      topic: 'transactions.incoming',
      partition: 'P1',
      offset: '481,210',
      dedupStatus: 'Lock Acquired -> Payload Validation FAILED',
      postgresAction: 'Rollback Transaction -> STATUS: CORRUPTED',
      commitAction: 'Offset Committed (Poison-Pill Isolated)',
      dlqRouting: 'FORWARDED -> transactions.dlq',
      isDlq: true,
    },
  }[scenario]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Telemetry ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>DISTRIBUTED EVENT STREAMING ENGINE</span>
          <span className={styles.versionTag}>Kafka KRaft · Redis Lock · PostgreSQL</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>CLUSTER MODE</span>
            <span className={styles.statVal}>Apache Kafka (KRaft)</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>IDEMPOTENCY</span>
            <span className={styles.statVal}>Two-Gate (Redis + DB)</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>OFFSET COMMIT</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              Manual Explicit
            </span>
          </span>
        </div>
      </div>

      {/* ── Visual Architecture Nodes ── */}
      <div className={styles.pipelineCanvas}>
        <div className={styles.stageGrid}>
          {/* Node 1: Producer Gateway */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>01</span>
              <Server size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>FastAPI Ingestion</div>
            <p className={styles.nodeDesc}>
              Event validation & partitioned topic dispatch
            </p>
            <div className={styles.nodeMeta}>transactions.incoming</div>
          </div>

          <div className={styles.streamLine} />

          {/* Node 2: Kafka KRaft Partitions */}
          <div className={`${styles.nodeCard} ${styles.partitionCard}`}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>02</span>
              <Layers size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Kafka KRaft Broker</div>
            <div className={styles.partitionSelector}>
              {[0, 1, 2].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.partBtn} ${selectedPartition === p ? styles.partActive : ''}`}
                  onClick={() => setSelectedPartition(p)}
                >
                  P{p}
                </button>
              ))}
            </div>
            <div className={styles.nodeMeta}>Zero Zookeeper Overhead</div>
          </div>

          <div className={styles.streamLine} />

          {/* Node 3: Two-Gate Deduplication */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>03</span>
              <ShieldCheck size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Two-Gate Idempotency</div>
            <p className={styles.nodeDesc}>
              Redis distributed mutex + relational unique status
            </p>
            <div className={styles.nodeMeta}>TTL 30s Key Lock</div>
          </div>

          <div className={styles.streamLine} />

          {/* Node 4: Consumer Settlement & DLQ */}
          <div
            className={`${styles.nodeCard} ${scenarioData.isDlq ? styles.dlqActive : ''}`}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>04</span>
              {scenarioData.isDlq ? (
                <AlertOctagon size={14} className={styles.dlqIcon} />
              ) : (
                <CheckCircle2 size={14} className={styles.nodeIcon} />
              )}
            </div>
            <div className={styles.nodeTitle}>State Commit & DLQ</div>
            <p className={styles.nodeDesc}>
              {scenarioData.isDlq
                ? 'Poison-pill routed to DLQ'
                : 'PostgreSQL settled & offset committed'}
            </p>
            <div className={styles.nodeMeta}>
              {scenarioData.isDlq ? 'transactions.dlq' : 'Offset Committed'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Scenario Toggle Pane ── */}
      {mode === 'full' && (
        <div className={styles.inspectionPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              STREAM EXECUTION TRACE & RECOVERY HARNESS
            </span>
            <div className={styles.scenarioTabs}>
              <button
                type="button"
                className={`${styles.scenarioBtn} ${scenario === 'normal' ? styles.activeTab : ''}`}
                onClick={() => setScenario('normal')}
              >
                Scenario A: Valid Event (Settled)
              </button>
              <button
                type="button"
                className={`${styles.scenarioBtn} ${scenario === 'dlq' ? styles.activeDlqTab : ''}`}
                onClick={() => setScenario('dlq')}
              >
                Scenario B: Poison Pill (DLQ Isolation) ★
              </button>
            </div>
          </div>

          <div className={styles.traceGrid}>
            <div className={styles.traceItem}>
              <span className={styles.traceKey}>EVENT ID</span>
              <span className={styles.traceValMono}>{scenarioData.eventId}</span>
            </div>
            <div className={styles.traceItem}>
              <span className={styles.traceKey}>TOPIC / OFFSET</span>
              <span className={styles.traceValMono}>
                {scenarioData.topic} [P{selectedPartition}:{scenarioData.offset}]
              </span>
            </div>
            <div className={styles.traceItem}>
              <span className={styles.traceKey}>DEDUPLICATION GATE</span>
              <span className={styles.traceVal}>{scenarioData.dedupStatus}</span>
            </div>
            <div className={styles.traceItem}>
              <span className={styles.traceKey}>DATABASE ACTION</span>
              <span className={styles.traceVal}>{scenarioData.postgresAction}</span>
            </div>
            <div className={styles.traceItem}>
              <span className={styles.traceKey}>OFFSET COMMIT</span>
              <span className={styles.traceVal}>{scenarioData.commitAction}</span>
            </div>
            <div className={styles.traceItem}>
              <span className={styles.traceKey}>DEAD-LETTER ROUTE</span>
              <span
                className={`${styles.traceVal} ${scenarioData.isDlq ? styles.dlqHighlight : ''}`}
              >
                {scenarioData.dlqRouting}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
