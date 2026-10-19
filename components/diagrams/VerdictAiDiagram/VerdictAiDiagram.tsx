'use client'

import { useState } from 'react'
import {
  TrendingUp,
  Newspaper,
  ShieldAlert,
  SlidersHorizontal,
  FileText,
  Activity,
} from 'lucide-react'
import styles from './VerdictAiDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

type AgentKey = 'financial' | 'news' | 'critic' | 'refiner' | 'writer'

interface AgentMeta {
  name: string
  file: string
  role: string
  tools: string[]
  input: string
  output: string
  description: string
}

const AGENTS: Record<AgentKey, AgentMeta> = {
  financial: {
    name: 'Financial Analysis Agent',
    file: 'backend/app/agents/financial_agent.py',
    role: 'Extracts historical fundamentals, revenue trajectory, valuation multiples, and cash flow statement health.',
    tools: ['yfinance API', 'get_financial_metrics', 'balance_sheet_parser'],
    input: 'Ticker Symbol (e.g. AAPL, MSFT)',
    output: 'Structured financial scorecard with margins & debt profile',
    description:
      'Queries balance sheet, income statement, and valuation metrics via yfinance to formulate fundamental ratio inputs.',
  },
  news: {
    name: 'News & Sentiment Agent',
    file: 'backend/app/agents/news_agent.py',
    role: 'Scrapes recent market news, press releases, and macroeconomic context with sentiment extraction.',
    tools: ['Tavily Search API', 'Google News Scraper', 'article_summarizer'],
    input: 'Company Name & Industry Keywords',
    output: 'Top 10 curated articles with timestamped sentiment scores',
    description:
      'Scrapes top news sources and regulatory filings, extracting bullish/bearish market narratives with citations.',
  },
  critic: {
    name: 'Critic Agent (Adversarial)',
    file: 'backend/app/agents/critic_agent.py',
    role: 'Stress-tests findings from financial and news agents; identifies blind spots and downward valuation risks.',
    tools: ['LLM Prompt Critique Harness', 'risk_factor_evaluator'],
    input: 'Financial scorecard + News summary',
    output: 'Adversarial counter-arguments and downside risk catalogue',
    description:
      'Applies adversarial reasoning to challenge optimistic management guidance, highlighting debt covenants and sector headwinds.',
  },
  refiner: {
    name: 'Refiner Agent (Synthesizer)',
    file: 'backend/app/agents/refiner_agent.py',
    role: 'Reconciles bullish metrics against critic objections to reach a calibrated, evidence-backed verdict.',
    tools: ['LangGraph state reducer', 'consensus_calibrator'],
    input: 'Raw fundamental data + Critic objections',
    output: 'Balanced analytical consensus matrix',
    description:
      'Balances quantitative multiples against qualitative risks, resolving conflicting evidence into a structured investment thesis.',
  },
  writer: {
    name: 'Dossier Writer Agent',
    file: 'backend/app/agents/writer_agent.py',
    role: 'Compiles final comprehensive equity research report in markdown format with citations.',
    tools: ['Report Compiler', 'Markdown Generator'],
    input: 'Refined consensus matrix + Source citations',
    output: 'Final Equity Research Dossier (.md / PDF)',
    description:
      'Formats the verified synthesis into an institutional-grade investment research memo with complete source links.',
  },
}

export default function VerdictAiDiagram({ mode = 'full' }: Props) {
  const [activeAgent, setActiveAgent] = useState<AgentKey>('financial')
  const agent = AGENTS[activeAgent]

  return (
    <div className={`${styles.canvas} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header Bar ── */}
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <span className={styles.statusPulse} />
          <span className={styles.titleText}>
            VERDICT AI · 5-AGENT LANGGRAPH ORCHESTRATION
          </span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.badge}>LangGraph Workflow</span>
          <span className={styles.badge}>yfinance + Tavily</span>
          <span className={styles.badge}>FastAPI Sink</span>
        </div>
      </div>

      {/* ── Architecture SVG Flow ── */}
      <div className={styles.diagramContainer}>
        <svg
          viewBox="0 0 760 270"
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Verdict AI 5-Agent LangGraph Architecture"
        >
          <defs>
            <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#454545" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connectors from Ingestion to Evaluators */}
          <path
            d="M 170 60 C 220 60, 240 135, 290 135"
            fill="none"
            stroke="url(#flowGrad1)"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path
            d="M 170 210 C 220 210, 240 135, 290 135"
            fill="none"
            stroke="url(#flowGrad1)"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path d="M 430 135 L 470 135" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M 610 135 L 640 135" fill="none" stroke="#ffffff" strokeWidth="2" />

          {/* Node 1: Financial Agent */}
          <g
            className={`${styles.agentNode} ${activeAgent === 'financial' ? styles.active : ''}`}
            onClick={() => setActiveAgent('financial')}
          >
            <rect
              x="20"
              y="25"
              width="150"
              height="70"
              rx="6"
              className={styles.nodeBox}
            />
            <text x="95" y="52" textAnchor="middle" className={styles.nodeTitle}>
              financial_agent
            </text>
            <text x="95" y="72" textAnchor="middle" className={styles.nodeSub}>
              yfinance Fundamentals
            </text>
          </g>

          {/* Node 2: News Agent */}
          <g
            className={`${styles.agentNode} ${activeAgent === 'news' ? styles.active : ''}`}
            onClick={() => setActiveAgent('news')}
          >
            <rect
              x="20"
              y="175"
              width="150"
              height="70"
              rx="6"
              className={styles.nodeBox}
            />
            <text x="95" y="202" textAnchor="middle" className={styles.nodeTitle}>
              news_agent
            </text>
            <text x="95" y="222" textAnchor="middle" className={styles.nodeSub}>
              Tavily Sentiment Search
            </text>
          </g>

          {/* Node 3: Critic Agent */}
          <g
            className={`${styles.agentNode} ${activeAgent === 'critic' ? styles.active : ''}`}
            onClick={() => setActiveAgent('critic')}
          >
            <rect
              x="290"
              y="100"
              width="140"
              height="70"
              rx="6"
              className={styles.nodeBox}
            />
            <text x="360" y="127" textAnchor="middle" className={styles.nodeTitle}>
              critic_agent
            </text>
            <text x="360" y="147" textAnchor="middle" className={styles.nodeSub}>
              Adversarial Stress Test
            </text>
          </g>

          {/* Node 4: Refiner Agent */}
          <g
            className={`${styles.agentNode} ${activeAgent === 'refiner' ? styles.active : ''}`}
            onClick={() => setActiveAgent('refiner')}
          >
            <rect
              x="470"
              y="100"
              width="140"
              height="70"
              rx="6"
              className={styles.nodeBox}
            />
            <text x="540" y="127" textAnchor="middle" className={styles.nodeTitle}>
              refiner_agent
            </text>
            <text x="540" y="147" textAnchor="middle" className={styles.nodeSub}>
              Consensus Calibrator
            </text>
          </g>

          {/* Node 5: Writer Agent */}
          <g
            className={`${styles.agentNode} ${activeAgent === 'writer' ? styles.active : ''}`}
            onClick={() => setActiveAgent('writer')}
          >
            <rect
              x="640"
              y="95"
              width="105"
              height="80"
              rx="6"
              className={styles.nodeBox}
            />
            <text x="692" y="132" textAnchor="middle" className={styles.nodeTitle}>
              writer_agent
            </text>
            <text x="692" y="152" textAnchor="middle" className={styles.nodeSub}>
              Dossier Report
            </text>
          </g>
        </svg>
      </div>

      {/* ── Interactive Agent Inspector ── */}
      {mode === 'full' && (
        <div className={styles.telemetryFooter}>
          <div className={styles.inspectorTabs}>
            {(['financial', 'news', 'critic', 'refiner', 'writer'] as AgentKey[]).map(
              (k) => (
                <button
                  key={k}
                  type="button"
                  className={`${styles.tabBtn} ${activeAgent === k ? styles.tabActive : ''}`}
                  onClick={() => setActiveAgent(k)}
                >
                  {k}_agent.py
                </button>
              ),
            )}
          </div>

          <div className={styles.inspectorCard}>
            <div className={styles.cardHeader}>
              <span className={styles.agentHeading}>{agent.name}</span>
              <span className={styles.agentFile}>{agent.file}</span>
            </div>
            <p className={styles.agentDesc}>{agent.description}</p>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>TOOLS &amp; APIS:</span>
                <span className={styles.metaVal}>{agent.tools.join(', ')}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>INPUT:</span>
                <span className={styles.metaVal}>{agent.input}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>OUTPUT:</span>
                <span className={styles.metaVal}>{agent.output}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
