'use client'

import { useState } from 'react'
import styles from './EvalPipelineDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function EvalPipelineDiagram({ mode = 'full' }: Props) {
  const [activeStage, setActiveStage] = useState<
    'retrieval' | 'generation' | 'eval' | 'metrics'
  >('eval')
  const [activeExperiment, setActiveExperiment] = useState<'prompt-a' | 'prompt-b'>(
    'prompt-b',
  )

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Architecture Context ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>RAGAS EVALUATION HARNESS</span>
          <span className={styles.versionTag}>Deterministic Pipeline</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>FRAMEWORK</span>
            <span className={styles.statVal}>RAG Triad</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>ORCHESTRATION</span>
            <span className={styles.statVal}>FastAPI Async</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>EVALUATION DIMENSIONS</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>3 Stages</span>
          </span>
        </div>
      </div>

      {/* ── Pipeline Architecture Visual (SVG & Interactive Nodes) ── */}
      <div className={styles.pipelineCanvas}>
        <svg
          viewBox="0 0 880 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgCanvas}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
              <stop offset="50%" stopColor="#bdbdbd" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connectors */}
          <path
            d="M 170 130 C 230 130, 240 130, 300 130"
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className={styles.dashLine}
          />
          <path
            d="M 430 130 C 470 130, 480 75, 520 75"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />
          <path
            d="M 430 130 C 470 130, 480 130, 520 130"
            stroke="var(--color-border-accent)"
            strokeWidth="1.5"
          />
          <path
            d="M 430 130 C 470 130, 480 185, 520 185"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />
          <path
            d="M 680 75 C 715 75, 725 130, 750 130"
            stroke="url(#tealGrad)"
            strokeWidth="1.5"
          />
          <path d="M 680 130 L 750 130" stroke="url(#tealGrad)" strokeWidth="1.5" />
          <path
            d="M 680 185 C 715 185, 725 130, 750 130"
            stroke="url(#tealGrad)"
            strokeWidth="1.5"
          />

          {/* Animated Stream Pulses */}
          <circle r="3.5" fill="#ffffff" filter="url(#glowEffect)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 170 130 L 300 130" />
          </circle>
          <circle r="3.5" fill="#bdbdbd" filter="url(#glowEffect)">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              path="M 430 130 C 470 130, 480 130, 520 130 L 680 130 L 750 130"
            />
          </circle>
        </svg>

        {/* ── HTML Nodes Layer ── */}
        <div className={styles.nodesOverlay}>
          {/* Node 1: Query & Context */}
          <div
            className={`${styles.pipelineCard} ${styles.nodeQuery} ${
              activeStage === 'retrieval' ? styles.activeNode : ''
            }`}
            onClick={() => setActiveStage('retrieval')}
          >
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>01</span>
              <span className={styles.stageTag}>RETRIEVAL</span>
            </div>
            <div className={styles.cardTitle}>Prompt + Vector Chunks</div>
            <div className={styles.nodeMeta}>
              <span>k = 5 Chunks</span>
              <span className={styles.metaBadge}>Cos: 0.84</span>
            </div>
          </div>

          {/* Node 2: Model Inference */}
          <div
            className={`${styles.pipelineCard} ${styles.nodeInference} ${
              activeStage === 'generation' ? styles.activeNode : ''
            }`}
            onClick={() => setActiveStage('generation')}
          >
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>02</span>
              <span className={styles.stageTag}>GENERATION</span>
            </div>
            <div className={styles.cardTitle}>LLM Generation Engine</div>
            <div className={styles.nodeMeta}>
              <span>Candidate Output</span>
              <span className={styles.tempBadge}>T = 0.2</span>
            </div>
          </div>

          {/* Node 3: The Evaluation Triad */}
          <div className={styles.triadGroup}>
            <div
              className={`${styles.evalMiniCard} ${
                activeStage === 'eval' ? styles.activeNode : ''
              }`}
              onClick={() => setActiveStage('eval')}
            >
              <div className={styles.evalTop}>
                <span className={styles.evalMetric}>Faithfulness</span>
                <span className={styles.evalScore}>0.94</span>
              </div>
              <div className={styles.evalBar}>
                <div className={styles.evalFill} style={{ width: '94%' }} />
              </div>
            </div>

            <div
              className={`${styles.evalMiniCard} ${
                activeStage === 'eval' ? styles.activeNode : ''
              }`}
              onClick={() => setActiveStage('eval')}
            >
              <div className={styles.evalTop}>
                <span className={styles.evalMetric}>Answer Relevance</span>
                <span className={styles.evalScore}>0.89</span>
              </div>
              <div className={styles.evalBar}>
                <div className={styles.evalFill} style={{ width: '89%' }} />
              </div>
            </div>

            <div
              className={`${styles.evalMiniCard} ${
                activeStage === 'eval' ? styles.activeNode : ''
              }`}
              onClick={() => setActiveStage('eval')}
            >
              <div className={styles.evalTop}>
                <span className={styles.evalMetric}>Context Groundedness</span>
                <span className={styles.evalScore}>0.92</span>
              </div>
              <div className={styles.evalBar}>
                <div className={styles.evalFill} style={{ width: '92%' }} />
              </div>
            </div>
          </div>

          {/* Node 4: Decision & Telemetry */}
          <div
            className={`${styles.pipelineCard} ${styles.nodeOutput} ${
              activeStage === 'metrics' ? styles.activeNode : ''
            }`}
            onClick={() => setActiveStage('metrics')}
          >
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>04</span>
              <span className={`${styles.stageTag} ${styles.tealTag}`}>DECISION</span>
            </div>
            <div className={styles.cardTitle}>Hallucination Guard</div>
            <div className={styles.verdict}>
              <span className={styles.passIndicator}>VERIFIED GROUNDED</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Experiment Comparison Section (Phase Evaluation Details) ── */}
      {mode === 'full' && (
        <div className={styles.experimentPane}>
          <div className={styles.experimentHeader}>
            <div className={styles.tabHeading}>A/B PROMPT COMPARISON RUN</div>
            <div className={styles.toggleTabs}>
              <button
                type="button"
                className={`${styles.tabBtn} ${
                  activeExperiment === 'prompt-a' ? styles.activeTab : ''
                }`}
                onClick={() => setActiveExperiment('prompt-a')}
              >
                Run #104 (Zero-Shot Baseline)
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${
                  activeExperiment === 'prompt-b' ? styles.activeTab : ''
                }`}
                onClick={() => setActiveExperiment('prompt-b')}
              >
                Run #118 (Few-Shot + Grounding Guardrail) ★
              </button>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>FAITHFULNESS SCORE</div>
              <div className={styles.metricValue}>
                {activeExperiment === 'prompt-a' ? '0.73' : '0.94'}
                <span
                  className={
                    activeExperiment === 'prompt-b' ? styles.deltaUp : styles.deltaDown
                  }
                >
                  {activeExperiment === 'prompt-b' ? '+28.7%' : 'Baseline'}
                </span>
              </div>
              <p className={styles.metricSub}>
                Claims directly attributed to context document chunks
              </p>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>ANSWER RELEVANCE</div>
              <div className={styles.metricValue}>
                {activeExperiment === 'prompt-a' ? '0.78' : '0.91'}
                <span
                  className={
                    activeExperiment === 'prompt-b' ? styles.deltaUp : styles.deltaDown
                  }
                >
                  {activeExperiment === 'prompt-b' ? '+16.6%' : 'Baseline'}
                </span>
              </div>
              <p className={styles.metricSub}>
                Cosine semantic similarity between query intent & generated answer
              </p>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>HALLUCINATION RATE</div>
              <div className={styles.metricValue}>
                {activeExperiment === 'prompt-a' ? '18.4%' : '2.1%'}
                <span
                  className={
                    activeExperiment === 'prompt-b' ? styles.deltaUp : styles.deltaDown
                  }
                >
                  {activeExperiment === 'prompt-b' ? '-88.5%' : 'High Risk'}
                </span>
              </div>
              <p className={styles.metricSub}>
                Unsupported entity and numerical claims detected by referee model
              </p>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>AVG P95 LATENCY</div>
              <div className={styles.metricValue}>
                {activeExperiment === 'prompt-a' ? '1.24s' : '1.38s'}
                <span className={styles.neutral}>
                  {activeExperiment === 'prompt-b' ? '+140ms' : 'Fast'}
                </span>
              </div>
              <p className={styles.metricSub}>
                End-to-end evaluation overhead per transaction sample
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
