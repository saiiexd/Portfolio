'use client'

import { useState } from 'react'
import {
  Users,
  Bot,
  MessageSquare,
  Scale,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from 'lucide-react'
import styles from './VerdictAiDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function VerdictAiDiagram({ mode = 'full' }: Props) {
  const [activePersona, setActivePersona] = useState<'bull' | 'bear' | 'risk'>('bull')

  return (
    <div className={`${styles.canvas} ${mode === 'preview' ? styles.previewMode : ''}`}>
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <span className={styles.statusPulse} />
          <span className={styles.titleText}>MULTI-AGENT ADVERSARIAL CONSENSUS</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.badge}>AUTONOMOUS DEBATE</span>
          <span className={styles.badge}>EVIDENCE-BACKED DOSSIER</span>
        </div>
      </div>

      <div className={styles.diagramContainer}>
        <svg
          viewBox="0 0 760 250"
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Multi-Agent Consensus Architecture"
        >
          <defs>
            <linearGradient id="agentConnBull" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#454545" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="agentConnBear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#777777" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="agentConnRisk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bdbdbd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Connectors to Central Arbiter */}
          <path
            d="M 180 55 C 260 55, 300 125, 380 125"
            fill="none"
            stroke="url(#agentConnBull)"
            strokeWidth="2.5"
          />
          <path
            d="M 180 125 L 380 125"
            fill="none"
            stroke="url(#agentConnRisk)"
            strokeWidth="2.5"
          />
          <path
            d="M 180 195 C 260 195, 300 125, 380 125"
            fill="none"
            stroke="url(#agentConnBear)"
            strokeWidth="2.5"
          />

          {/* Connection to Output Dossier */}
          <path
            d="M 540 125 L 620 125"
            fill="none"
            stroke="#0052FF"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />

          {/* Agent 1: Bull */}
          <g
            className={`${styles.agentNode} ${activePersona === 'bull' ? styles.activeBull : ''}`}
            onClick={() => setActivePersona('bull')}
          >
            <rect
              x="20"
              y="25"
              width="160"
              height="60"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="100" y="50" textAnchor="middle" className={styles.agentTitle}>
              Bull Analyst Agent
            </text>
            <text x="100" y="70" textAnchor="middle" className={styles.agentSub}>
              Upside Thesis · TAM
            </text>
          </g>

          {/* Agent 2: Risk Arbitrageur */}
          <g
            className={`${styles.agentNode} ${activePersona === 'risk' ? styles.activeRisk : ''}`}
            onClick={() => setActivePersona('risk')}
          >
            <rect
              x="20"
              y="95"
              width="160"
              height="60"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="100" y="120" textAnchor="middle" className={styles.agentTitle}>
              Risk Arbiter Agent
            </text>
            <text x="100" y="140" textAnchor="middle" className={styles.agentSub}>
              VaR · Factor Exposure
            </text>
          </g>

          {/* Agent 3: Bear Critic */}
          <g
            className={`${styles.agentNode} ${activePersona === 'bear' ? styles.activeBear : ''}`}
            onClick={() => setActivePersona('bear')}
          >
            <rect
              x="20"
              y="165"
              width="160"
              height="60"
              rx="10"
              className={styles.nodeBox}
            />
            <text x="100" y="190" textAnchor="middle" className={styles.agentTitle}>
              Bear Critic Agent
            </text>
            <text x="100" y="210" textAnchor="middle" className={styles.agentSub}>
              Downside &amp; Audit Risk
            </text>
          </g>

          {/* Central Consensus Core */}
          <g className={styles.centerNode}>
            <rect
              x="380"
              y="75"
              width="160"
              height="100"
              rx="14"
              className={styles.centerBox}
            />
            <text x="460" y="115" textAnchor="middle" className={styles.centerTitle}>
              Synthesis Engine
            </text>
            <text x="460" y="135" textAnchor="middle" className={styles.centerSub}>
              Adversarial Rounds (3x)
            </text>
            <text x="460" y="155" textAnchor="middle" className={styles.centerSub2}>
              Citation Verification
            </text>
          </g>

          {/* Output Dossier */}
          <g className={styles.outputNode}>
            <rect
              x="620"
              y="85"
              width="120"
              height="80"
              rx="10"
              className={styles.outputBox}
            />
            <text x="680" y="120" textAnchor="middle" className={styles.outputTitle}>
              Consensus Dossier
            </text>
            <text x="680" y="145" textAnchor="middle" className={styles.outputSub}>
              Confidence: 89.4%
            </text>
          </g>
        </svg>
      </div>

      {mode === 'full' && (
        <div className={styles.telemetryFooter}>
          <div className={styles.personaCard}>
            <span className={styles.personaLabel}>Inspected Agent Debate Stream:</span>
            <span className={styles.personaText}>
              {activePersona === 'bull' &&
                'Bull Persona: Citing 10-K gross margin inflection and customer expansion.'}
              {activePersona === 'bear' &&
                'Bear Persona: Challenging debt maturity concentration and working capital drag.'}
              {activePersona === 'risk' &&
                'Risk Persona: Evaluating scenario sensitivity under 50bps rate volatility.'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
