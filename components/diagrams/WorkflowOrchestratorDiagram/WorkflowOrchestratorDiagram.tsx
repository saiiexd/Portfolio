'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  Play,
  GitBranch,
  Database,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'
import styles from './WorkflowOrchestratorDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function WorkflowOrchestratorDiagram({ mode = 'full' }: Props) {
  const [activeStage, setActiveStage] = useState<
    'stage-1' | 'stage-2' | 'stage-3' | 'stage-4'
  >('stage-2')
  const [isExecuting, setIsExecuting] = useState(false)

  const triggerExecution = () => {
    setIsExecuting(true)
    setActiveStage('stage-1')
    setTimeout(() => setActiveStage('stage-2'), 900)
    setTimeout(() => setActiveStage('stage-3'), 1800)
    setTimeout(() => {
      setActiveStage('stage-4')
      setIsExecuting(false)
    }, 2700)
  }

  return (
    <div className={`${styles.canvas} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* Header bar */}
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <span className={styles.statusPulse} />
          <span className={styles.titleText}>TOPOLOGICAL DAG ORCHESTRATOR</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.badge}>KAHN SCHEDULER</span>
          <span className={styles.badge}>POSTGRES CHECKPOINTS</span>
        </div>
      </div>

      {/* Main SVG Graph */}
      <div className={styles.diagramContainer}>
        <svg
          viewBox="0 0 760 260"
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Workflow Orchestrator DAG Architecture"
        >
          <defs>
            <linearGradient id="dagLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#555555" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <filter id="dagGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connectors */}
          <path
            d="M 140 130 C 180 130, 210 70, 270 70"
            fill="none"
            stroke="url(#dagLine)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 140 130 C 180 130, 210 190, 270 190"
            fill="none"
            stroke="url(#dagLine)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 430 70 C 490 70, 500 130, 560 130"
            fill="none"
            stroke="url(#dagLine)"
            strokeWidth="2.5"
          />
          <path
            d="M 430 190 C 490 190, 500 130, 560 130"
            fill="none"
            stroke="url(#dagLine)"
            strokeWidth="2.5"
          />

          {/* Animated data pulses */}
          <circle r="4" fill="#38E1D2" filter="url(#dagGlow)">
            <animateMotion
              path="M 140 130 C 180 130, 210 70, 270 70 L 430 70 C 490 70, 500 130, 560 130"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#0052FF" filter="url(#dagGlow)">
            <animateMotion
              path="M 140 130 C 180 130, 210 190, 270 190 L 430 190 C 490 190, 500 130, 560 130"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Node 1: Ingestion */}
          <g
            className={`${styles.nodeGroup} ${activeStage === 'stage-1' ? styles.active : ''}`}
            onClick={() => setActiveStage('stage-1')}
          >
            <rect
              x="20"
              y="95"
              width="120"
              height="70"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="80" y="125" textAnchor="middle" className={styles.nodeTitle}>
              DAG Ingestion
            </text>
            <text x="80" y="145" textAnchor="middle" className={styles.nodeSub}>
              Validation &amp; Parse
            </text>
          </g>

          {/* Node 2A: Branch A */}
          <g
            className={`${styles.nodeGroup} ${activeStage === 'stage-2' ? styles.active : ''}`}
            onClick={() => setActiveStage('stage-2')}
          >
            <rect
              x="270"
              y="35"
              width="160"
              height="70"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="350" y="65" textAnchor="middle" className={styles.nodeTitle}>
              Branch A: Feature Matrix
            </text>
            <text x="350" y="85" textAnchor="middle" className={styles.nodeSub}>
              Worker Pool #1 · Async
            </text>
          </g>

          {/* Node 2B: Branch B */}
          <g
            className={`${styles.nodeGroup} ${activeStage === 'stage-2' ? styles.active : ''}`}
            onClick={() => setActiveStage('stage-2')}
          >
            <rect
              x="270"
              y="155"
              width="160"
              height="70"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="350" y="185" textAnchor="middle" className={styles.nodeTitle}>
              Branch B: Anomaly Check
            </text>
            <text x="350" y="205" textAnchor="middle" className={styles.nodeSub}>
              Worker Pool #2 · Isolation
            </text>
          </g>

          {/* Node 3: Synthesis & Checkpoint */}
          <g
            className={`${styles.nodeGroup} ${activeStage === 'stage-3' || activeStage === 'stage-4' ? styles.active : ''}`}
            onClick={() => setActiveStage('stage-3')}
          >
            <rect
              x="560"
              y="95"
              width="170"
              height="70"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="645" y="125" textAnchor="middle" className={styles.nodeTitle}>
              State Checkpoint
            </text>
            <text x="645" y="145" textAnchor="middle" className={styles.nodeSub}>
              PostgreSQL · ACID Commit
            </text>
          </g>
        </svg>
      </div>

      {/* Telemetry Footer Controls */}
      {mode === 'full' && (
        <div className={styles.telemetryFooter}>
          <div className={styles.telemetryInfo}>
            <div className={styles.infoCol}>
              <span className={styles.infoLabel}>Active Topological State:</span>
              <span className={styles.infoValue}>
                {activeStage === 'stage-1' && 'Stage 1: Parsing YAML Workflow Spec'}
                {activeStage === 'stage-2' &&
                  'Stage 2: Concurrent Branch Execution (Pools #1 & #2)'}
                {activeStage === 'stage-3' &&
                  'Stage 3: Topological Join & Dependency Validation'}
                {activeStage === 'stage-4' &&
                  'Stage 4: State Checkpoint Committed to PostgreSQL'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={styles.simButton}
            onClick={triggerExecution}
            disabled={isExecuting}
          >
            <RefreshCw size={13} className={isExecuting ? styles.spin : ''} />
            <span>{isExecuting ? 'Dispatching Stages...' : 'Replay DAG Execution'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
