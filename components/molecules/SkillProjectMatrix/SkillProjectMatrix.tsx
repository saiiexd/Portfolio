'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Code2,
  Layers,
  Cpu,
  Database,
} from 'lucide-react'
import { GithubIcon } from '@/components/atoms/Icon/BrandIcons'
import Badge from '@/components/atoms/Badge/Badge'
import { PROJECTS } from '@/content/projects'
import styles from './SkillProjectMatrix.module.scss'

interface SkillDefinition {
  id: string
  name: string
  category: 'ai' | 'distributed' | 'data' | 'ml'
  headline: string
  description: string
  verifiedEvidence: string[]
  primaryStack: string[]
  projectSlugs: string[]
}

const SKILL_DEFINITIONS: SkillDefinition[] = [
  {
    id: 'model-evaluation',
    name: 'LLM Reliability & Evaluation Harnesses',
    category: 'ai',
    headline: 'Deterministic Evaluation, Pluggable Criteria & Diagnostic Analysis',
    description:
      'Designing decoupled evaluation runners that benchmark model outputs against deterministic datasets without flaky external network calls. Implements pluggable semantic and exact evaluators with failure classification taxonomies.',
    verifiedEvidence: [
      'Custom ModelAdapter interface with deterministic MockAdapter for zero-network testing',
      'Pluggable criteria: ExactMatchEvaluator, NormalizedSimilarityEvaluator, BertScoreBackend, LLMJudge',
      'Diagnostic modules analyzing perturbation robustness and evidence extraction fidelity',
      'Automated test suites in Pytest validating runner ordering and failure isolation',
    ],
    primaryStack: ['Python 3.13', 'Pytest', 'BERTScore', 'JSON Schema'],
    projectSlugs: ['llm-eval-platform'],
  },
  {
    id: 'distributed-queueing',
    name: 'Distributed Queueing & Worker Pools',
    category: 'distributed',
    headline: 'Redis Streams Consumer Groups, Go Daemons & Dead-Letter Quarantine',
    description:
      'Architecting fault-tolerant asynchronous processing platforms using Redis Streams consumer groups, concurrent Go worker daemons, Pending Entries List (PEL) tracking, and deterministic retry mechanisms.',
    verifiedEvidence: [
      'FastAPI control plane publishing task payloads to Redis Streams via XADD',
      'Go worker pool consuming via XREADGROUP with PEL failover recovery and XACK',
      'Exponential backoff retry scheduling with automated Dead-Letter Queue (DLQ) routing',
      'PostgreSQL task metadata persistence and Prometheus metric instrumentation',
    ],
    primaryStack: ['Go 1.22', 'Redis Streams', 'FastAPI', 'PostgreSQL 16', 'Docker'],
    projectSlugs: ['distributed-task-queue'],
  },
  {
    id: 'dag-orchestration',
    name: 'Topological DAG Scheduling & Workflows',
    category: 'distributed',
    headline: 'Kahn Topological Ordering, AsyncIO Concurrency & ACID State Checkpoints',
    description:
      'Building directed acyclic graph (DAG) execution engines that compute dependency orderings dynamically, execute independent branches concurrently, and persist resilient state checkpoints.',
    verifiedEvidence: [
      'Topological sorting and cycle detection implemented via Kahn algorithm',
      'Concurrent async stage dispatch using AsyncIO worker pools with branch isolation',
      'Resilient workflow state checkpoints committed to PostgreSQL with ACID semantics',
      'Distributed execution tracing instrumented with OpenTelemetry spans',
    ],
    primaryStack: ['Python 3.11', 'NetworkX', 'AsyncIO', 'PostgreSQL', 'OpenTelemetry'],
    projectSlugs: ['workflow-orchestrator'],
  },
  {
    id: 'stream-processing',
    name: 'Real-Time Event Streaming & Ingestion',
    category: 'data',
    headline: 'Apache Kafka Partitioning, PySpark Windowing & Two-Gate Deduplication',
    description:
      'Engineering high-throughput streaming pipelines that consume live transaction topics, execute rolling feature calculations in PySpark, and guarantee idempotency through distributed Redis locks.',
    verifiedEvidence: [
      'Kafka KRaft-mode partitioned topic ingestion with manual offset acknowledgement',
      'PySpark Structured Streaming tumbling and sliding window feature aggregations',
      'Two-gate deduplication: Redis distributed mutex (30s TTL) + database unique status',
      'Dead-letter queue isolation for poison-pill transactions via dlq_handler.py',
    ],
    primaryStack: ['Apache Kafka', 'PySpark Streaming', 'Redis 7', 'PostgreSQL 16'],
    projectSlugs: ['real-time-fraud-detection', 'distributed-event-streaming'],
  },
  {
    id: 'multi-agent-systems',
    name: 'Multi-Agent Consensus & Adversarial Workflows',
    category: 'ai',
    headline: 'LangGraph State Graphs, Tool Calling & Adversarial Critique',
    description:
      'Coordinating specialized LLM agents in structured state machines where bull analysts, bear critics, and risk arbiters debate fundamental evidence before compiling structured investment research.',
    verifiedEvidence: [
      '5-node LangGraph state graph: financial_agent, news_agent, critic_agent, refiner_agent, writer_agent',
      'Dynamic financial metrics retrieval via yfinance and live news search via Tavily',
      'Adversarial stress-testing challenging guidance and identifying downside risks',
      'Structured Markdown dossier compilation with verifiable source citations',
    ],
    primaryStack: ['LangGraph', 'yfinance API', 'Tavily Search', 'FastAPI', 'Pydantic'],
    projectSlugs: ['verdict-ai'],
  },
  {
    id: 'vector-retrieval',
    name: 'Vector Embeddings & Semantic Search',
    category: 'ai',
    headline:
      'PostgreSQL pgvector HNSW Indexing & First-Principles NumPy Matrix Dot Products',
    description:
      'Implementing both production-grade vector search with PostgreSQL pgvector and first-principles in-memory dense vector search using pure NumPy linear algebra.',
    verifiedEvidence: [
      'PostgreSQL 16 pgvector HNSW indexing (vector_cosine_ops) over 1536-dim embeddings',
      'First-principles RAG calculating cosine similarity via dot(Q, M.T) / (norm(Q) * norm(M))',
      'Sliding window chunking with character overlap boundaries preserving contextual integrity',
      'Grounded answer generation using Cohere Command-R+ with cited tokens',
    ],
    primaryStack: ['pgvector', 'NumPy', 'Cohere API', 'OpenAI Embeddings', 'FastAPI'],
    projectSlugs: ['ai-workspace', 'rag-from-scratch'],
  },
  {
    id: 'astronomical-ml',
    name: 'Transit Photometry & Scientific ML',
    category: 'ml',
    headline: 'BLS Light-Curve Folding, Tree Ensembles & SHAP Explainability',
    description:
      'Processing NASA Kepler and TESS astronomical mission datasets, folding transit light curves using Box Least Squares (BLS), and classifying candidate exoplanets with interpretable tree ensembles.',
    verifiedEvidence: [
      'NASA Exoplanet Archive transit photometry preprocessing and BLS period folding',
      'Random Forest, Gradient Boosting, and HistGradientBoosting regression ensembles',
      'SHAP (SHapley Additive exPlanations) attribution quantifying feature importance',
      'Orbital transit geometry simulation and phase-folded normalized flux curves',
    ],
    primaryStack: ['Scikit-learn', 'Astropy', 'SHAP', 'Pandas', 'Streamlit'],
    projectSlugs: ['exointel'],
  },
  {
    id: 'relational-analytics',
    name: 'Relational Analytics & Demand Forecasting',
    category: 'data',
    headline: 'Native PostgreSQL Analytical Views, RFM Modeling & Prophet Horizons',
    description:
      'Transforming high-volume transactional data with native PostgreSQL SQL views to calculate customer RFM scores, cohort retention curves, and 30-day operational demand forecasts.',
    verifiedEvidence: [
      'Native PostgreSQL views (view_monthly_metrics, view_customer_rfm_inputs, view_cohort_analysis)',
      'Customer RFM recency, frequency, and monetary scoring directly in SQL',
      'Additive Prophet decomposition with weekly Fourier terms for 30-day demand forecasts',
      'Interactive Streamlit dashboards and FastAPI endpoints serving structured JSON KPIs',
    ],
    primaryStack: ['PostgreSQL 16', 'Prophet', 'FastAPI', 'Pandas', 'Streamlit'],
    projectSlugs: ['business-analytics', 'retail-analytics'],
  },
  {
    id: 'airgapped-cv',
    name: 'Air-Gapped Computer Vision & OCR',
    category: 'data',
    headline: 'OpenCV Gaussian Adaptive Binarization & Local Tesseract Execution',
    description:
      'Building privacy-first, zero-cloud-egress document text extraction pipelines utilizing local OpenCV image preprocessing and native CPU Tesseract 5 OCR execution.',
    verifiedEvidence: [
      'Gaussian blur (5x5) and adaptive thresholding via cv2.adaptiveThreshold (Gaussian C)',
      '100% offline, air-gapped execution eliminating external network calls or cloud APIs',
      'Local tesseract.exe process invocation via pytesseract wrapper with bounding boxes',
      'Streamlit document inspector and structured JSON schema serialization',
    ],
    primaryStack: ['OpenCV', 'PyTesseract', 'Tesseract 5 Local', 'Streamlit'],
    projectSlugs: ['offline-ocr'],
  },
]

export default function SkillProjectMatrix() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('model-evaluation')

  const activeSkill =
    SKILL_DEFINITIONS.find((s) => s.id === selectedSkillId) || SKILL_DEFINITIONS[0]

  const connectedProjects = PROJECTS.filter((p) =>
    activeSkill.projectSlugs.includes(p.slug),
  )

  return (
    <div className={styles.matrixWrapper}>
      {/* ── Left Column: Interactive Capability Index ── */}
      <div className={styles.skillsNavCol}>
        <div className={styles.colHeader}>
          <Terminal size={14} className={styles.colHeaderIcon} />
          <span className={styles.colHeaderLabel}>ENGINEERING CAPABILITY INDEX</span>
        </div>

        <div
          className={styles.skillList}
          role="tablist"
          aria-label="Engineering Capabilities"
        >
          {SKILL_DEFINITIONS.map((skill, idx) => {
            const isSelected = skill.id === selectedSkillId
            return (
              <button
                key={skill.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`${styles.skillBtn} ${isSelected ? styles.skillBtnActive : ''}`}
                onClick={() => setSelectedSkillId(skill.id)}
                data-cursor="INSPECT"
              >
                <div className={styles.skillBtnTop}>
                  <span className={styles.skillIndex}>
                    {String(idx + 1).padStart(2, '0')} {'//'}
                  </span>
                  <span className={styles.skillBadge}>
                    {skill.category.toUpperCase()}
                  </span>
                </div>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillProjectCount}>
                  {skill.projectSlugs.length} Verified System
                  {skill.projectSlugs.length > 1 ? 's' : ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Right Column: Verified Implementation Evidence & Connected Projects ── */}
      <div className={styles.evidenceDetailCol}>
        {/* Selected Skill Header */}
        <div className={styles.evidenceHeader}>
          <div className={styles.metaRow}>
            <span className={styles.metaCode}>
              CAPABILITY // {activeSkill.id.toUpperCase()}
            </span>
            <span className={styles.metaDivider}>·</span>
            <span className={styles.metaDomain}>
              {activeSkill.category.toUpperCase()} PLATFORM
            </span>
          </div>

          <h3 className={styles.skillHeading}>{activeSkill.name}</h3>
          <p className={styles.skillHeadline}>{activeSkill.headline}</p>
          <p className={styles.skillDescription}>{activeSkill.description}</p>

          {/* Primary Technologies */}
          <div className={styles.techPillRow}>
            {activeSkill.primaryStack.map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Verified Code Evidence */}
        <div className={styles.evidenceSection}>
          <div className={styles.sectionHeader}>
            <Code2 size={14} className={styles.sectionIcon} />
            <span className={styles.sectionTitle}>VERIFIED CODEBASE EVIDENCE</span>
          </div>

          <div className={styles.evidenceGrid}>
            {activeSkill.verifiedEvidence.map((evidence, idx) => (
              <div key={idx} className={styles.evidenceCard}>
                <CheckCircle2 size={13} className={styles.checkIcon} />
                <span className={styles.evidenceText}>{evidence}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Implemented Projects */}
        <div className={styles.connectedProjectsSection}>
          <div className={styles.sectionHeader}>
            <Layers size={14} className={styles.sectionIcon} />
            <span className={styles.sectionTitle}>
              DEMONSTRATED IN VERIFIED REPOSITORIES ({connectedProjects.length})
            </span>
          </div>

          <div className={styles.projectsGrid}>
            {connectedProjects.map((proj) => (
              <article key={proj.slug} className={styles.projectCard}>
                <div className={styles.cardTop}>
                  <Badge variant="category">{proj.category}</Badge>
                  <span className={styles.cardYear}>{proj.year}</span>
                </div>

                <h4 className={styles.cardTitle}>
                  <Link
                    href={`/projects/${proj.slug}`}
                    className={styles.titleLink}
                    data-cursor="CASE STUDY"
                  >
                    {proj.title}
                  </Link>
                </h4>

                <p className={styles.cardDesc}>{proj.shortDescription}</p>

                <div className={styles.cardActions}>
                  <Link
                    href={`/projects/${proj.slug}`}
                    className={styles.caseStudyBtn}
                    data-cursor="CASE STUDY"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight size={13} />
                  </Link>

                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubBtn}
                      data-cursor="GITHUB ↗"
                    >
                      <GithubIcon size={13} />
                      <span>Source</span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
