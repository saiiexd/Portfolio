'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Layers, Activity, Database } from 'lucide-react'
import ArchitectureFlow from '@/components/molecules/ArchitectureFlow/ArchitectureFlow'
import styles from './LaboratoryExplorer.module.scss'

interface LabTab {
  id: string
  label: string
  title: string
  discipline: string
  icon: typeof Cpu
  summary: string
  codeSnippet: string
  flowSteps: string[]
  verifiedRepo: string
  repoUrl: string
  caseStudyUrl: string
}

const LAB_TABS: LabTab[] = [
  {
    id: 'eval',
    label: '01 // EVALUATION',
    title: 'Deterministic LLM Evaluation & Regression Diagnostics',
    discipline: 'AI Reliability Engineering',
    icon: Cpu,
    summary:
      'Engineered an empirical testing harness evaluating language model reliability under constrained compute. Evaluates outputs across structured criteria (exact match, normalized similarity, BERTScore, and LLM judge) with automated failure diagnostics.',
    codeSnippet: `# LLM Judge Evaluation Runner
class CriteriaEvaluator:
    def __init__(self, criteria: Sequence[EvaluationCriteria]):
        self.criteria = list(criteria)
        self.diagnostics = DiagnosticAnalyzer()

    async def evaluate_dataset(self, dataset: EvaluationDataset) -> EvaluationResult:
        scores = await asyncio.gather(*[
            self._score_item(item) for item in dataset.items
        ])
        return self.diagnostics.aggregate(scores)`,
    flowSteps: [
      'Benchmark Datasets',
      'Model Adapters',
      'LLM Judge & Criteria',
      'Reliability Metrics',
    ],
    verifiedRepo: 'saiiexd/llm-reliability-and-evaluation-platform',
    repoUrl: 'https://github.com/saiiexd/llm-reliability-and-evaluation-platform',
    caseStudyUrl: '/projects/llm-eval-platform',
  },
  {
    id: 'distributed',
    label: '02 // DISTRIBUTED',
    title: 'Hybrid FastAPI & Go Concurrency with Redis Streams',
    discipline: 'Distributed Systems & Concurrency',
    icon: Layers,
    summary:
      'Architected a distributed asynchronous execution engine combining a FastAPI Python control plane with a concurrent Go worker daemon. Leverages Redis Streams consumer groups for Pending Entries List (PEL) tracking and dead-letter recovery.',
    codeSnippet: `// Go Worker Consumer Loop (go-redis/v9)
func (w *Worker) ProcessStream(ctx context.Context) error {
    streams, err := w.client.XReadGroup(ctx, &redis.XReadGroupArgs{
        Group:    "workers",
        Consumer: w.id,
        Streams:  []string{"jobs", ">"},
        Count:    10,
        Block:    time.Second * 2,
    }).Result()
    // State machine dispatch with exponential backoff & DLQ
    return w.handleBatch(streams)
}`,
    flowSteps: [
      'FastAPI Ingestion',
      'Redis Streams PEL',
      'Go Worker Daemon',
      'State Machine & DLQ',
    ],
    verifiedRepo: 'saiiexd/distributed-task-queue',
    repoUrl: 'https://github.com/saiiexd/distributed-task-queue',
    caseStudyUrl: '/projects/distributed-task-queue',
  },
  {
    id: 'streaming',
    label: '03 // STREAMING',
    title: 'Kafka KRaft Event Ingestion & Sliding Window Anomaly Detection',
    discipline: 'Real-Time Streaming Systems',
    icon: Activity,
    summary:
      'Constructed a low-latency streaming pipeline screening financial transactions. Integrates Apache Kafka (KRaft mode), Redis sliding-window velocity feature caching, and Scikit-learn inference with MLflow experiment tracking.',
    codeSnippet: `# Sliding Window Velocity Calculation in Redis
async def get_velocity_features(r: Redis, user_id: str, tx_time: float):
    key = f"tx:velocity:{user_id}"
    cutoff_10m = tx_time - 600
    cutoff_1h = tx_time - 3600
    
    # Atomic sliding window query via sorted sets
    pipe = r.pipeline()
    pipe.zcount(key, cutoff_10m, tx_time)
    pipe.zcount(key, cutoff_1h, tx_time)
    v_10m, v_1h = await pipe.execute()
    return {"count_10m": v_10m, "count_1h": v_1h}`,
    flowSteps: [
      'Kafka Event Stream',
      'Redis Sliding Window',
      'Scikit-learn Model',
      'Tri-State Routing',
    ],
    verifiedRepo: 'saiiexd/real-time-fraud-detection',
    repoUrl: 'https://github.com/saiiexd/real-time-fraud-detection',
    caseStudyUrl: '/projects/real-time-fraud-detection',
  },
  {
    id: 'analytics',
    label: '04 // ANALYTICS',
    title: 'Relational Modeling, Cohort Retention & Decision Support',
    discipline: 'Data Platforms & Decision Intelligence',
    icon: Database,
    summary:
      'Designed an end-to-end analytics platform transforming raw transaction records into relational tables and pre-computed PostgreSQL analytical views for customer retention curves, product margin health, and RFM segmentation.',
    codeSnippet: `-- Analytical SQL View: Customer Cohort Retention
CREATE OR REPLACE VIEW view_customer_cohorts AS
WITH user_first_order AS (
    SELECT customer_id, DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM fct_orders GROUP BY customer_id
)
SELECT 
    u.cohort_month,
    DATE_TRUNC('month', o.order_date) AS order_month,
    COUNT(DISTINCT o.customer_id) AS active_users
FROM fct_orders o
JOIN user_first_order u ON o.customer_id = u.customer_id
GROUP BY 1, 2;`,
    flowSteps: [
      'Raw Ingestion',
      'PostgreSQL Relational',
      'Cohort & RFM Views',
      'FastAPI & Streamlit',
    ],
    verifiedRepo: 'saiiexd/business-analytics-decision-intelligence',
    repoUrl: 'https://github.com/saiiexd/business-analytics-decision-intelligence',
    caseStudyUrl: '/projects/business-analytics',
  },
]

export default function LaboratoryExplorer() {
  const [activeTabId, setActiveTabId] = useState('eval')

  const activeTab = LAB_TABS.find((t) => t.id === activeTabId) || LAB_TABS[0]
  const IconComponent = activeTab.icon

  return (
    <div className={styles.explorerWrapper}>
      {/* Tab Navigation */}
      <div className={styles.tabNav} role="tablist">
        {LAB_TABS.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
              onClick={() => setActiveTabId(tab.id)}
              data-cursor="SELECT"
            >
              <span className={styles.tabIndicator}>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Exhibition Stage */}
      <div className={styles.stage}>
        <div className={styles.stageMeta}>
          <div className={styles.stageTitleRow}>
            <div className={styles.iconBadge}>
              <IconComponent size={18} strokeWidth={2} />
            </div>
            <div>
              <span className={styles.disciplineLabel}>{activeTab.discipline}</span>
              <h3 className={styles.stageTitle}>{activeTab.title}</h3>
            </div>
          </div>
          <p className={styles.stageSummary}>{activeTab.summary}</p>

          <div className={styles.flowSection}>
            <span className={styles.flowHeading}>EXECUTION ARCHITECTURE PIPELINE</span>
            <ArchitectureFlow steps={activeTab.flowSteps} />
          </div>

          <div className={styles.stageActions}>
            <Link
              href={activeTab.caseStudyUrl}
              className={styles.caseStudyAction}
              data-cursor="CASE STUDY"
            >
              <span>Explore Architecture Case Study</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href={activeTab.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoAction}
              data-cursor="CODE ↗"
            >
              <span>{activeTab.verifiedRepo}</span>
              <span className={styles.extIcon}>↗</span>
            </a>
          </div>
        </div>

        {/* Code Viewport Stage */}
        <div className={styles.codeStage}>
          <div className={styles.codeHeader}>
            <div className={styles.windowDots}>
              <span />
              <span />
              <span />
            </div>
            <span className={styles.codeFilename}>{activeTab.id}.impl.verified</span>
          </div>
          <pre className={styles.codeBlock}>
            <code>{activeTab.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
