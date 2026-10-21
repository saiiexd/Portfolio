'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  X,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Cpu,
  Shield,
} from 'lucide-react'
import { GithubIcon } from '@/components/atoms/Icon/BrandIcons'
import Badge from '@/components/atoms/Badge/Badge'
import ArchitectureFlow from '@/components/molecules/ArchitectureFlow/ArchitectureFlow'
import ProjectDiagram from '@/components/diagrams/ProjectDiagram'
import { categoryLabel } from '@/lib/utils'
import type { ProjectData } from '@/types'
import styles from './LivingNetworkDossier.module.scss'

interface Props {
  project: ProjectData | null
  domainCategory?: string | null
  onClose: () => void
}

const DOMAIN_DETAILS: Record<
  string,
  { title: string; subtitle: string; description: string; corePatterns: string[] }
> = {
  'llm-genai': {
    title: 'Applied AI & LLM Systems',
    subtitle: 'Deterministic Evaluation, Pluggable Criteria & Multi-Agent Consensus',
    description:
      'Rigorous evaluation harnesses measuring exact match, normalized semantic similarity, and model-based arbitration alongside multi-agent adversarial debate workflows.',
    corePatterns: [
      'Deterministic Test Cases & Mock Adapters',
      'Pluggable Criteria Evaluators (ExactMatch, BERTScore, LLM Judge)',
      'LangGraph Adversarial Consensus Protocols',
      'In-Memory Dense Vector Retrieval',
    ],
  },
  'backend-systems': {
    title: 'Distributed Systems & Backend Platforms',
    subtitle: 'Consumer Groups, Topological Schedulers & ACID State Checkpoints',
    description:
      'Fault-tolerant asynchronous execution systems utilizing Redis Streams consumer groups, concurrent Go worker daemons, and DAG engines with topological scheduling.',
    corePatterns: [
      'Redis Streams Consumer Groups (XREADGROUP, XACK)',
      'PEL Tracking & Worker Heartbeat Monitoring',
      'Kahn Algorithm Topological Schedulers',
      'PostgreSQL ACID State Checkpointing',
    ],
  },
  'ml-data': {
    title: 'ML Pipelines & Real-Time Streaming',
    subtitle: 'PySpark Structured Streaming, Astronomical Photometry & Online Inference',
    description:
      'High-throughput event streaming architectures processing live Kafka events with PySpark windowing, combined with photometric transit feature extraction and SHAP explainability.',
    corePatterns: [
      'Apache Kafka Partitioned Ingestion',
      'PySpark Structured Streaming Window Aggregation',
      'NASA Kepler/TESS Transit Light-Curve Folding',
      'Tree Ensemble Classifiers & SHAP Explainability',
    ],
  },
  analytics: {
    title: 'Data Platforms & Computer Vision',
    subtitle:
      'PostgreSQL Analytical Views, Air-Gapped OCR & Operational Demand Forecasting',
    description:
      'Relational data transformation engines computing RFM and cohort decay curves in native SQL, air-gapped OpenCV binarization pipelines, and additive Prophet time-series forecasts.',
    corePatterns: [
      'PostgreSQL Native Analytical SQL Views',
      'RFM Customer Segmentation & Cohort Decay Curves',
      'OpenCV Gaussian Adaptive Binarization (cv2.adaptiveThreshold)',
      'Local Tesseract 5 OCR Execution (Zero Cloud Egress)',
    ],
  },
}

export default function LivingNetworkDossier({
  project,
  domainCategory,
  onClose,
}: Props) {
  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project && !domainCategory) return null

  // If a domain hub is selected:
  if (!project && domainCategory) {
    const domain = DOMAIN_DETAILS[domainCategory] || DOMAIN_DETAILS['llm-genai']
    return (
      <div
        className={styles.dossierOverlay}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.dossierPanel} onClick={(e) => e.stopPropagation()}>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderLeft}>
              <span className={styles.telemetryTag}>DOMAIN DOSSIER</span>
              <span className={styles.telemetryDivider}>{'//'}</span>
              <span className={styles.domainCode}>{domainCategory.toUpperCase()}</span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close Domain Dossier"
            >
              <X size={15} />
            </button>
          </div>

          <div className={styles.panelBody}>
            <h3 className={styles.domainTitle}>{domain.title}</h3>
            <p className={styles.domainSubtitle}>{domain.subtitle}</p>
            <p className={styles.domainDesc}>{domain.description}</p>

            <div className={styles.patternSection}>
              <span className={styles.sectionLabel}>VERIFIED ARCHITECTURAL PATTERNS</span>
              <div className={styles.patternGrid}>
                {domain.corePatterns.map((pat, idx) => (
                  <div key={idx} className={styles.patternCard}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span>{pat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actionRow}>
              <Link
                href={`/projects?category=${domainCategory}`}
                className={styles.primaryActionBtn}
                onClick={onClose}
              >
                <span>Filter Archive by {categoryLabel(domainCategory)}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If a project node is selected:
  if (!project) return null

  return (
    <div
      className={styles.dossierOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.dossierPanel} onClick={(e) => e.stopPropagation()}>
        {/* Panel Header */}
        <div className={styles.panelHeader}>
          <div className={styles.panelHeaderLeft}>
            <span className={styles.telemetryTag}>SYSTEM DOSSIER</span>
            <span className={styles.telemetryDivider}>{'//'}</span>
            <Badge variant="category">{categoryLabel(project.category)}</Badge>
            <span className={styles.telemetryDivider}>{'//'}</span>
            <span className={styles.verifiedStamp}>
              <CheckCircle2 size={11} />
              SOURCE VERIFIED
            </span>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close Project Dossier"
          >
            <X size={15} />
          </button>
        </div>

        {/* Panel Body */}
        <div className={styles.panelBody}>
          <div className={styles.projectIdentity}>
            <span className={styles.yearTag}>{project.year}</span>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.shortDescription}</p>
          </div>

          {/* System Dataflow */}
          {project.pipelineSteps && project.pipelineSteps.length > 0 && (
            <div className={styles.dataflowSection}>
              <span className={styles.sectionLabel}>SYSTEM EXECUTION PATH</span>
              <ArchitectureFlow steps={project.pipelineSteps} />
            </div>
          )}

          {/* Verified Tech Stack */}
          <div className={styles.techSection}>
            <span className={styles.sectionLabel}>
              VERIFIED DEPENDENCIES &amp; ENGINES
            </span>
            <div className={styles.techPills}>
              {project.techStack.map((t) => (
                <Badge key={t} variant="tech">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Diagram Preview */}
          <div className={styles.diagramSection}>
            <span className={styles.sectionLabel}>ACTIVE TOPOLOGY PREVIEW</span>
            <div className={styles.diagramWrap}>
              <ProjectDiagram
                componentName={project.diagramComponent}
                slug={project.slug}
                mode="preview"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className={styles.actionRow}>
            <Link
              href={`/projects/${project.slug}`}
              className={styles.primaryActionBtn}
              onClick={onClose}
            >
              <span>Launch Full Technical Case Study</span>
              <ArrowRight size={14} />
            </Link>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryActionBtn}
              >
                <GithubIcon size={14} />
                <span>View Source Code</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
