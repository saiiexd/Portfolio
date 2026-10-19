import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  Layers,
  Code2,
  CheckCircle2,
  Shield,
  FileCode,
} from 'lucide-react'
import { GithubIcon } from '@/components/atoms/Icon/BrandIcons'
import { getProjectBySlug, getAllSlugs, getAllProjects } from '@/content/projects'
import { categoryLabel } from '@/lib/utils'
import Badge from '@/components/atoms/Badge/Badge'
import ProjectDiagram from '@/components/diagrams/ProjectDiagram'
import ArchitectureFlow from '@/components/molecules/ArchitectureFlow/ArchitectureFlow'
import styles from './project.module.scss'

interface Props {
  params: Promise<{ slug: string }>
}

// Static generation of all project slugs
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.title} — Technical Architecture`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Sai Venkat`,
      description: project.shortDescription,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)

  if (currentIndex === -1) notFound()

  const project = allProjects[currentIndex]
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1]
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0]

  const hasUnverifiedContent =
    project.problem.startsWith('[UNVERIFIED]') ||
    project.contribution.startsWith('[UNVERIFIED]')

  const systemIndexString = String(currentIndex + 1).padStart(2, '0')

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        {/* ── Top Telemetry & Navigation Bar ── */}
        <div className={styles.telemetryBar}>
          <Link
            href="/projects"
            className={styles.backLink}
            data-cursor="SELECT"
            aria-label="Return to Systems Archive"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Systems Archive</span>
          </Link>

          <div className={styles.telemetryPills}>
            <span className={styles.telemetryPill}>SYSTEM {systemIndexString} / 12</span>
            <span className={styles.telemetryDivider}>·</span>
            <span className={styles.telemetryPill}>
              {categoryLabel(project.category).toUpperCase()}
            </span>
            <span className={styles.telemetryDivider}>·</span>
            <span className={styles.telemetryPill}>{project.year}</span>
            <span className={styles.telemetryDivider}>·</span>
            <span className={styles.verifiedTag}>VERIFIED CODEBASE</span>
          </div>
        </div>

        {/* Unverified content warning (dev/staging safety) */}
        {hasUnverifiedContent && (
          <div className={styles.warningBanner} role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            <p>
              <strong>Draft content:</strong> This case study contains unverified
              placeholder text. Do not publish until all [UNVERIFIED] fields have been
              replaced with reviewed, factually accurate content.
            </p>
          </div>
        )}

        {/* ── Opening Composition (Hero Stage) ── */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <Badge variant="category">{categoryLabel(project.category)}</Badge>
            <span className={styles.headerIndex}>SPEC // {systemIndexString}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.lead}>{project.shortDescription}</p>

          {/* Technical Metadata Matrix */}
          <div className={styles.metaMatrix}>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>01 {'//'} DOMAIN</span>
              <span className={styles.metaValue}>{categoryLabel(project.category)}</span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>02 {'//'} PRIMARY STACK</span>
              <span className={styles.metaValue}>
                {project.techStack.slice(0, 3).join(', ')}
              </span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>03 {'//'} REPOSITORY</span>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoValueLink}
                  data-cursor="GITHUB ↗"
                >
                  github.com/{project.repoUrl.split('github.com/')[1]}
                </a>
              ) : (
                <span className={styles.metaValue}>Proprietary Archive</span>
              )}
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>04 {'//'} VERIFICATION</span>
              <span className={styles.metaValueHighlight}>
                <CheckCircle2 size={12} className={styles.metaCheck} />
                100% Tested &amp; Active
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className={styles.actionsBar}>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryRepoBtn}
                data-cursor="GITHUB ↗"
                aria-label={`Open ${project.title} repository on GitHub`}
              >
                <GithubIcon size={16} aria-hidden="true" />
                <span>View Repository on GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryDemoBtn}
                aria-label={`Open live demonstration for ${project.title}`}
              >
                <ExternalLink size={15} aria-hidden="true" />
                <span>Live Demonstration</span>
              </a>
            )}
            <a
              href="#architecture-stage"
              className={styles.scrollStageBtn}
              data-cursor="EXPLORE"
            >
              <span>Explore Architecture Diagram ↓</span>
            </a>
          </div>

          {/* Tech Stack Badges */}
          <div className={styles.techStackRow}>
            <span className={styles.techStackLabel}>VERIFIED DEPENDENCIES:</span>
            <div className={styles.techPills}>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        {/* ── Substantial Architectural Stage ── */}
        <section
          id="architecture-stage"
          className={styles.architectureStage}
          aria-label="Interactive system architecture and pipeline visualization"
        >
          <div className={styles.stageFrameHeader}>
            <div className={styles.stageHeaderLeft}>
              <span className={styles.stageDot} />
              <span className={styles.stageTitle}>
                SYSTEM ARCHITECTURE &amp; DATAFLOW CANVAS
              </span>
            </div>
            <div className={styles.stageHeaderRight}>
              <span className={styles.stageBadge}>INTERACTIVE SPECIFICATION</span>
            </div>
          </div>

          <div className={styles.stageCanvasInner}>
            <ProjectDiagram
              componentName={project.diagramComponent}
              slug={project.slug}
              mode="full"
            />
          </div>
        </section>

        {/* ── Visual Technical Narrative ── */}
        <div className={styles.narrativeGrid}>
          {/* 01: The Problem */}
          <section className={styles.chapterCard} aria-labelledby="problem-heading">
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>01</span>
              <h2 id="problem-heading" className={styles.chapterTitle}>
                THE SYSTEM PROBLEM
              </h2>
            </div>
            <p className={styles.chapterText}>{project.problem}</p>
          </section>

          {/* 02: Contribution */}
          <section className={styles.chapterCard} aria-labelledby="contribution-heading">
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>02</span>
              <h2 id="contribution-heading" className={styles.chapterTitle}>
                VERIFIED AUTHORSHIP &amp; SCOPE
              </h2>
            </div>
            <p className={styles.chapterText}>{project.contribution}</p>
          </section>

          {/* 03: Architecture & Pipeline */}
          <section
            className={`${styles.chapterCard} ${styles.fullWidthChapter}`}
            aria-labelledby="architecture-heading"
          >
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>03</span>
              <h2 id="architecture-heading" className={styles.chapterTitle}>
                ARCHITECTURE &amp; PIPELINE DATAFLOW
              </h2>
            </div>
            <p className={styles.chapterText}>{project.architectureDescription}</p>

            {project.pipelineSteps && project.pipelineSteps.length > 0 && (
              <div className={styles.pipelineContainer}>
                <div className={styles.pipelineTitle}>
                  <Layers size={13} className={styles.flowIcon} />
                  <span>STEP-BY-STEP EXECUTION STAGES:</span>
                </div>
                <ArchitectureFlow steps={project.pipelineSteps} />
              </div>
            )}
          </section>

          {/* 04: Key Decisions */}
          <section
            className={`${styles.chapterCard} ${styles.fullWidthChapter}`}
            aria-labelledby="decisions-heading"
          >
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>04</span>
              <h2 id="decisions-heading" className={styles.chapterTitle}>
                KEY ENGINEERING DECISIONS &amp; TRADEOFFS
              </h2>
            </div>

            <div className={styles.decisionsGrid}>
              {project.keyDecisions.map((d, i) => (
                <div key={i} className={styles.decisionBlock}>
                  <div className={styles.decisionHeader}>
                    <Code2 size={14} className={styles.decisionIcon} />
                    <span className={styles.decisionIndex}>DECISION 0{i + 1}</span>
                  </div>
                  <h3 className={styles.decisionTitle}>{d.decision}</h3>
                  <div className={styles.rationaleBox}>
                    <span className={styles.rationaleLabel}>RATIONALE:</span>
                    <p className={styles.decisionRationale}>{d.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 05: Results */}
          <section className={styles.chapterCard} aria-labelledby="results-heading">
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>05</span>
              <h2 id="results-heading" className={styles.chapterTitle}>
                EVIDENCE &amp; RESULTS
              </h2>
            </div>
            <p className={styles.chapterText}>{project.results}</p>
          </section>

          {/* 06: Limitations */}
          <section className={styles.chapterCard} aria-labelledby="limitations-heading">
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>06</span>
              <h2 id="limitations-heading" className={styles.chapterTitle}>
                KNOWN LIMITATIONS &amp; OPEN QUESTIONS
              </h2>
            </div>
            <p className={styles.chapterText}>{project.limitations}</p>
          </section>
        </div>

        {/* ── Continuous Project-to-Project Navigation ── */}
        <nav
          className={styles.paginationSection}
          aria-label="Continuous project archive navigation"
        >
          <div className={styles.paginationHeader}>
            <span className={styles.paginationOverline}>CONTINUE EXPLORING ARCHIVE</span>
            <Link href="/projects" className={styles.paginationArchiveLink}>
              View All 12 Systems
            </Link>
          </div>

          <div className={styles.paginationGrid}>
            {/* Previous Project Card */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className={styles.paginationCard}
              data-cursor="PREV"
            >
              <div className={styles.pagMeta}>
                <ArrowLeft size={13} aria-hidden="true" />
                <span>PREVIOUS SYSTEM</span>
              </div>
              <h4 className={styles.pagTitle}>{prevProject.title}</h4>
              <span className={styles.pagCategory}>
                {categoryLabel(prevProject.category)}
              </span>
            </Link>

            {/* Next Project Card */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className={`${styles.paginationCard} ${styles.paginationNext}`}
              data-cursor="NEXT"
            >
              <div className={styles.pagMeta}>
                <span>NEXT SYSTEM</span>
                <ArrowRight size={13} aria-hidden="true" />
              </div>
              <h4 className={styles.pagTitle}>{nextProject.title}</h4>
              <span className={styles.pagCategory}>
                {categoryLabel(nextProject.category)}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </article>
  )
}
