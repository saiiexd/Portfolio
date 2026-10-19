'use client'

import { useState } from 'react'
import { FileUp, Scissors, Binary, Sparkles, CheckCircle2 } from 'lucide-react'
import styles from './RagFirstPrinciplesDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function RagFirstPrinciplesDiagram({ mode = 'full' }: Props) {
  const [activeStep, setActiveStep] = useState<number>(3)
  const [selectedK, setSelectedK] = useState<number>(3)

  const retrievedChunks = [
    {
      id: 'chunk_04',
      similarity: '0.892',
      text: '...Raft achieves consensus via leader election and log replication...',
      selected: true,
    },
    {
      id: 'chunk_12',
      similarity: '0.841',
      text: '...heartbeat interval is configured to 150ms to detect network partition...',
      selected: true,
    },
    {
      id: 'chunk_09',
      similarity: '0.785',
      text: '...split-brain scenarios are prevented using majority quorum voting...',
      selected: selectedK >= 3,
    },
  ]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Telemetry ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>FIRST-PRINCIPLES RAG PIPELINE</span>
          <span className={styles.versionTag}>NumPy Matrix · Cohere API · PyPDF</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SIMILARITY ENGINE</span>
            <span className={styles.statVal}>Pure NumPy Dot Product</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>VECTOR DB</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              Zero Abstraction (In-Memory)
            </span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>EMBEDDING MODEL</span>
            <span className={styles.statVal}>Cohere embed-v3 (1024-dim)</span>
          </span>
        </div>
      </div>

      {/* ── Architecture Nodes ── */}
      <div className={styles.pipelineCanvas}>
        <div className={styles.stageGrid}>
          {/* Node 1: PyPDF Extraction */}
          <div
            className={`${styles.nodeCard} ${activeStep === 1 ? styles.activeCard : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>01</span>
              <FileUp size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>PDF Extraction</div>
            <p className={styles.nodeDesc}>
              Raw document ingestion & character normalization
            </p>
            <div className={styles.nodeMeta}>PyPDF Parser</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 2: Sliding Window Chunking */}
          <div
            className={`${styles.nodeCard} ${activeStep === 2 ? styles.activeCard : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>02</span>
              <Scissors size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Chunking with Overlap</div>
            <p className={styles.nodeDesc}>
              500 char windows with 50 char overlap boundaries
            </p>
            <div className={styles.nodeMeta}>Preserves Context</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 3: NumPy Cosine Matrix */}
          <div
            className={`${styles.nodeCard} ${activeStep === 3 ? styles.activeCard : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>03</span>
              <Binary size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>NumPy Matrix Search</div>
            <p className={styles.nodeDesc}>
              dot(Q, M.T) / (norm(Q) * norm(M)) matrix ranking
            </p>
            <div className={styles.nodeMeta}>O(N · D) In-Memory</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 4: Cohere Command-R+ Generation */}
          <div
            className={`${styles.nodeCard} ${activeStep === 4 ? styles.activeCard : ''}`}
            onClick={() => setActiveStep(4)}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>04</span>
              <Sparkles size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Grounded Synthesis</div>
            <p className={styles.nodeDesc}>
              Cohere Command-R+ generation with cited tokens
            </p>
            <div className={styles.nodeMeta}>Zero Hallucination Guard</div>
          </div>
        </div>
      </div>

      {/* ── Interactive Cosine Inspection Pane ── */}
      {mode === 'full' && (
        <div className={styles.inspectionPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              NUMPY COSINE MATRIX SIMILARITY RESULTS
            </span>
            <div className={styles.kControls}>
              <span className={styles.kLabel}>TOP-K CHUNKS:</span>
              <button
                type="button"
                className={`${styles.kBtn} ${selectedK === 2 ? styles.kActive : ''}`}
                onClick={() => setSelectedK(2)}
              >
                k = 2
              </button>
              <button
                type="button"
                className={`${styles.kBtn} ${selectedK === 3 ? styles.kActive : ''}`}
                onClick={() => setSelectedK(3)}
              >
                k = 3
              </button>
            </div>
          </div>

          <div className={styles.chunksList}>
            {retrievedChunks.slice(0, selectedK).map((chunk, idx) => (
              <div key={idx} className={styles.chunkItem}>
                <div className={styles.chunkHeader}>
                  <div className={styles.chunkRank}>
                    <CheckCircle2 size={13} className={styles.rankIcon} />
                    <span className={styles.chunkId}>{chunk.id}</span>
                  </div>
                  <span className={styles.scorePill}>Cosine: {chunk.similarity}</span>
                </div>
                <p className={styles.chunkSnippet}>{chunk.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
