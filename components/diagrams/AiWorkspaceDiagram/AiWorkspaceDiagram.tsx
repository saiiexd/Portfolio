'use client'

import { useState } from 'react'
import { FileText, Cpu, Database, Search, ArrowRight, CheckCircle2 } from 'lucide-react'
import styles from './AiWorkspaceDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function AiWorkspaceDiagram({ mode = 'full' }: Props) {
  const [activeQuery, setActiveQuery] = useState<'consensus' | 'latency'>('consensus')
  const [selectedNode, setSelectedNode] = useState<number>(3)

  const queries = {
    consensus: {
      text: 'Query: "distributed consensus guarantees & leader election"',
      topMatch: 'doc_distributed_raft_spec.md (Chunk #04)',
      similarity: '0.884',
      latency: '38ms',
      chunks: [
        { title: 'doc_distributed_raft_spec.md', sim: '0.884', tag: 'Direct Match' },
        { title: 'architecture_overview.md', sim: '0.812', tag: 'Context' },
        { title: 'meeting_notes_2024_03.md', sim: '0.741', tag: 'Reference' },
      ],
    },
    latency: {
      text: 'Query: "p95 tail latency optimizations in Redis Streams"',
      topMatch: 'perf_benchmark_report.md (Chunk #12)',
      similarity: '0.918',
      latency: '42ms',
      chunks: [
        { title: 'perf_benchmark_report.md', sim: '0.918', tag: 'Direct Match' },
        { title: 'task_queue_benchmarks.md', sim: '0.865', tag: 'Benchmark' },
        { title: 'worker_pool_sizing.md', sim: '0.789', tag: 'Reference' },
      ],
    },
  }[activeQuery]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Telemetry ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>AI PERSONAL WORKSPACE</span>
          <span className={styles.versionTag}>pgvector · FastAPI · Next.js 15</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>STORAGE ENGINE</span>
            <span className={styles.statVal}>PostgreSQL + pgvector</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>INDEX TYPE</span>
            <span className={styles.statVal}>HNSW (Cosine Distance)</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>BACKGROUND TASKS</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              FastAPI Async Tasks
            </span>
          </span>
        </div>
      </div>

      {/* ── Visual Architecture Canvas ── */}
      <div className={styles.pipelineCanvas}>
        <div className={styles.stageGrid}>
          {/* Stage 1: Ingestion */}
          <div
            className={`${styles.nodeCard} ${selectedNode === 1 ? styles.nodeActive : ''}`}
            onClick={() => setSelectedNode(1)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>01</span>
              <FileText size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Ingestion & Parsing</div>
            <p className={styles.nodeDesc}>Markdown notes, rich text, technical docs</p>
            <div className={styles.nodeMeta}>Next.js 15 + FastAPI</div>
          </div>

          <div className={styles.flowArrow}>
            <ArrowRight size={14} />
          </div>

          {/* Stage 2: Embeddings */}
          <div
            className={`${styles.nodeCard} ${selectedNode === 2 ? styles.nodeActive : ''}`}
            onClick={() => setSelectedNode(2)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>02</span>
              <Cpu size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Embedding Vectorizer</div>
            <p className={styles.nodeDesc}>OpenAI text-embedding-3-small vectorizer</p>
            <div className={styles.nodeMeta}>FastAPI BackgroundTask</div>
          </div>

          <div className={styles.flowArrow}>
            <ArrowRight size={14} />
          </div>

          {/* Stage 3: pgvector Storage */}
          <div
            className={`${styles.nodeCard} ${selectedNode === 3 ? styles.nodeActive : ''}`}
            onClick={() => setSelectedNode(3)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>03</span>
              <Database size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>pgvector Store</div>
            <p className={styles.nodeDesc}>1536-dim dense vectors with HNSW index</p>
            <div className={styles.nodeMeta}>PostgreSQL 16 Relational</div>
          </div>

          <div className={styles.flowArrow}>
            <ArrowRight size={14} />
          </div>

          {/* Stage 4: Semantic Retrieval */}
          <div
            className={`${styles.nodeCard} ${selectedNode === 4 ? styles.nodeActive : ''}`}
            onClick={() => setSelectedNode(4)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>04</span>
              <Search size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Semantic Search</div>
            <p className={styles.nodeDesc}>
              Cosine distance ranking with grounded citations
            </p>
            <div className={styles.nodeMeta}>Sub-50ms Retrieval</div>
          </div>
        </div>
      </div>

      {/* ── Interactive Inspection Pane ── */}
      {mode === 'full' && (
        <div className={styles.inspectionPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              INTERACTIVE VECTOR SEARCH QUERY HARNESS
            </span>
            <div className={styles.queryTabs}>
              <button
                type="button"
                className={`${styles.queryBtn} ${activeQuery === 'consensus' ? styles.activeTab : ''}`}
                onClick={() => setActiveQuery('consensus')}
              >
                Query A: Consensus
              </button>
              <button
                type="button"
                className={`${styles.queryBtn} ${activeQuery === 'latency' ? styles.activeTab : ''}`}
                onClick={() => setActiveQuery('latency')}
              >
                Query B: Redis Latency
              </button>
            </div>
          </div>

          <div className={styles.queryDisplay}>
            <div className={styles.queryInputBar}>
              <span className={styles.promptSign}>&gt;</span>
              <span className={styles.queryText}>{queries.text}</span>
              <span className={styles.latencyBadge}>p95: {queries.latency}</span>
            </div>

            <div className={styles.chunksList}>
              {queries.chunks.map((chunk, idx) => (
                <div key={idx} className={styles.chunkRow}>
                  <div className={styles.chunkLeft}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.chunkTitle}>{chunk.title}</span>
                    <span className={styles.chunkTag}>{chunk.tag}</span>
                  </div>
                  <div className={styles.chunkRight}>
                    <span className={styles.simLabel}>Cosine Sim:</span>
                    <span className={styles.simValue}>{chunk.sim}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
