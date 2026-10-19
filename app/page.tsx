'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, ArrowUpRight, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/Icon/BrandIcons'
import Badge from '@/components/atoms/Badge/Badge'
import Button from '@/components/atoms/Button/Button'
import { getFeaturedProjects } from '@/content/projects'
import { SITE_CONFIG, RESUME_PATH } from '@/lib/constants'
import { categoryLabel } from '@/lib/utils'
import ProjectDiagram from '@/components/diagrams/ProjectDiagram'
import TopologyCanvas from '@/components/diagrams/TopologyCanvas/TopologyCanvas'
import ArchitectureFlow from '@/components/molecules/ArchitectureFlow/ArchitectureFlow'
import LaboratoryExplorer from '@/components/molecules/LaboratoryExplorer/LaboratoryExplorer'
import styles from './HeroSection.module.scss'

export default function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  // 4 Flagship Engineering Projects
  const featuredProjects = getFeaturedProjects().slice(0, 4)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <div className={styles.homeContainer}>
      {/* ── 01: Hero Section (Zajno-Inspired Cinematic Composition) ─────── */}
      <section className={styles.hero} aria-label="Engineering Identity">
        {/* Top Telemetry Header Ribbon */}
        <div className={styles.telemetryBar}>
          <div className={styles.telemetryInner}>
            <span className={styles.telemetryItem}>
              <span className={styles.statusDot} />
              SYSTEM_STATUS: NOMINAL
            </span>
            <span className={styles.telemetryDivider}>{'//'}</span>
            <span className={styles.telemetryItem}>
              COORDINATES: 17.3850° N, 78.4867° E (HYDERABAD)
            </span>
            <span className={styles.telemetryDivider}>{'//'}</span>
            <span className={styles.telemetryItem}>
              ROLE: AI &amp; DATA PLATFORM ENGINEER
            </span>
            <span className={styles.telemetryDivider}>{'//'}</span>
            <span className={styles.telemetryItem}>
              AVAILABILITY: OPEN FOR 2027 ROLES
            </span>
          </div>
        </div>

        <div className={styles.sectionInner}>
          <div className={styles.heroGrid}>
            {/* Left: Oversized Kinetic Typography & Core Thesis */}
            <div className={styles.heroMain}>
              <div className={styles.nameOverline}>
                <span>SAI VENKAT</span>
                <span className={styles.subTag}>ENGINEERING PORTFOLIO</span>
              </div>

              <h1 className={styles.heroHeadline}>
                <span className={styles.headlineLine}>BUILD THINGS</span>
                <span className={styles.headlineLine}>THAT WORK.</span>
              </h1>

              <p className={styles.heroPositioning}>
                AI systems. Fault-tolerant distributed platforms. Real-time streaming
                infrastructure.
              </p>

              <p className={styles.heroBio}>
                Computer science engineering student specializing in AI and Data
                Engineering at Lovely Professional University (Class of 2027, GPA: 7.46).
                I build deterministic evaluation harnesses for language models, concurrent
                distributed task queues in Go and Python, and low-latency event streaming
                pipelines with Apache Kafka.
              </p>

              <div className={styles.heroCtas}>
                <Button
                  as="a"
                  href="#selected-work"
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight size={16} />}
                  data-cursor="EXPLORE"
                >
                  Explore Systems ↘
                </Button>
                <Button
                  as="a"
                  href={RESUME_PATH}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  iconLeft={<Download size={15} />}
                  data-cursor="RESUME ↓"
                >
                  Download Résumé
                </Button>
              </div>
            </div>

            {/* Right: Integrated Portrait & Interactive 3D Topology */}
            <div className={styles.visualStage}>
              <div className={styles.visualCanvasFrame}>
                <TopologyCanvas />
                <div className={styles.canvasLegend}>
                  <span className={styles.legendDot} />
                  <span>INTERACTIVE NEURAL LATTICE // THREE.JS</span>
                </div>
              </div>

              <div className={styles.portraitComposition}>
                <div className={styles.portraitCard}>
                  <div className={styles.portraitFrame}>
                    <Image
                      src="/images/sai-venkat-portrait.png"
                      alt="Sai Venkat monochrome engineering portrait"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 360px"
                      className={styles.portraitImg}
                    />
                  </div>
                  <div className={styles.portraitCaption}>
                    <span className={styles.captionTitle}>SAI VENKAT</span>
                    <span className={styles.captionRole}>CLASS OF 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: Selected Work Showcase (Zajno Exhibition Layout) ───────── */}
      <section
        id="selected-work"
        className={styles.workSection}
        aria-labelledby="work-heading"
      >
        <div className={styles.sectionInner}>
          {/* Editorial Section Header */}
          <div className={styles.workHeader}>
            <div className={styles.workHeaderLeft}>
              <span className={styles.workOverline}>Work ↘</span>
              <h2 id="work-heading" className={styles.workTitle}>
                Featured Engineering Systems
              </h2>
            </div>
            <div className={styles.workHeaderRight}>
              <p className={styles.workIntro}>
                A curated sequence of verified platforms engineered for evaluation rigor,
                distributed concurrency, topological workflow dispatch, and streaming
                anomaly detection.
              </p>
              <Link
                href="/projects"
                className={styles.archiveHeaderLink}
                data-cursor="ALL 12"
              >
                <span>View Complete Archive (12 Repositories)</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Exhibition List */}
          <div className={styles.workExhibitionList}>
            {featuredProjects.map((project, idx) => (
              <article key={project.slug} className={styles.exhibitionRow}>
                {/* Row Meta Column */}
                <div className={styles.exhibitionMetaCol}>
                  <div className={styles.rowIndexWrap}>
                    <span className={styles.rowIndex}>0{idx + 1} ↘</span>
                    <Badge variant="category">{categoryLabel(project.category)}</Badge>
                  </div>
                  <span className={styles.rowYear}>{project.year}</span>
                </div>

                {/* Content & Action Column */}
                <div className={styles.exhibitionBodyCol}>
                  <div className={styles.titleWrap}>
                    <h3 className={styles.exhibitionTitle}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.exhibitionTitleLink}
                        data-cursor="CASE STUDY"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className={styles.exhibitionDesc}>{project.shortDescription}</p>
                  </div>

                  {/* Architecture Dataflow */}
                  {project.pipelineSteps && project.pipelineSteps.length > 0 && (
                    <div className={styles.architectureFlowBox}>
                      <span className={styles.flowLabel}>SYSTEM DATAFLOW</span>
                      <ArchitectureFlow steps={project.pipelineSteps} />
                    </div>
                  )}

                  {/* Tags & Action Buttons */}
                  <div className={styles.exhibitionBottomRow}>
                    <div className={styles.exhibitionTags}>
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="tech">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className={styles.exhibitionActions}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.caseStudyLink}
                        data-cursor="CASE STUDY"
                      >
                        <span>Case Study</span>
                        <ArrowRight size={13} />
                      </Link>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.repoLink}
                          data-cursor="GITHUB ↗"
                        >
                          <span>GitHub</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Visual Preview Stage */}
                <div className={styles.exhibitionVisualCol}>
                  <div className={styles.visualCardStage}>
                    <ProjectDiagram
                      componentName={project.diagramComponent}
                      slug={project.slug}
                      mode="preview"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Full Archive Gateway Banner */}
          <div className={styles.archiveBanner}>
            <div className={styles.archiveBannerContent}>
              <span className={styles.archiveBannerOverline}>REPOSITORY ARCHIVE</span>
              <h3 className={styles.archiveBannerTitle}>
                Explore the Complete 12-System Engineering Catalog
              </h3>
              <p className={styles.archiveBannerSub}>
                Every public repository is verified against real source code,
                dependencies, and architecture diagrams.
              </p>
            </div>
            <Link
              href="/projects"
              className={styles.archiveBannerBtn}
              data-cursor="ARCHIVE ↗"
            >
              <span>Access All 12 Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 03: Interactive Systems Laboratory ─────────────────────────── */}
      <section className={styles.labSection} aria-labelledby="lab-heading">
        <div className={styles.sectionInner}>
          <div className={styles.labHeader}>
            <span className={styles.labOverline}>Capabilities ↘</span>
            <h2 id="lab-heading" className={styles.labTitle}>
              Systems Laboratory
            </h2>
            <p className={styles.labSubtext}>
              Interactive architectural exploration across my primary engineering
              disciplines. Inspect verified implementation patterns directly.
            </p>
          </div>

          <LaboratoryExplorer />
        </div>
      </section>

      {/* ── 04: Engineering Ledger (Experience & Academics) ────────────── */}
      <section className={styles.ledgerSection} aria-labelledby="ledger-heading">
        <div className={styles.sectionInner}>
          <div className={styles.ledgerHeader}>
            <span className={styles.ledgerOverline}>Background ↘</span>
            <h2 id="ledger-heading" className={styles.ledgerTitle}>
              Engineering Ledger
            </h2>
          </div>

          <div className={styles.ledgerTable}>
            {/* Row 1: University */}
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerTimeCol}>
                <span className={styles.ledgerTime}>2023 — 2027</span>
                <span className={styles.ledgerBadge}>EXPECTED GRADUATION</span>
              </div>
              <div className={styles.ledgerMainCol}>
                <h3 className={styles.ledgerOrg}>Lovely Professional University</h3>
                <p className={styles.ledgerDegree}>
                  B.Tech in Computer Science and Engineering (AI &amp; Data Engineering)
                </p>
                <p className={styles.ledgerDetail}>
                  Focus on distributed systems, machine learning algorithms, database
                  internals, and large-scale data platforms. Cumulative GPA:{' '}
                  <strong>7.46</strong>.
                </p>
                <div className={styles.ledgerPills}>
                  <span>Phagwara, Punjab</span>
                  <span>Data Structures &amp; Algorithms</span>
                  <span>Distributed Systems</span>
                  <span>Machine Learning</span>
                </div>
              </div>
            </div>

            {/* Row 2: Systems Architecture */}
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerTimeCol}>
                <span className={styles.ledgerTime}>2024 — PRESENT</span>
                <span className={styles.ledgerBadge}>OPEN SOURCE WORK</span>
              </div>
              <div className={styles.ledgerMainCol}>
                <h3 className={styles.ledgerOrg}>
                  Systems Architecture &amp; Engineering
                </h3>
                <p className={styles.ledgerDegree}>
                  AI/ML Engineer · Distributed Systems · Data Platform Engineer
                </p>
                <p className={styles.ledgerDetail}>
                  Independent design, implementation, and benchmarking of 12 full-stack
                  engineering systems: evaluation harnesses, Redis Streams task queues,
                  topological workflow engines, and Kafka KRaft event pipelines.
                </p>
                <div className={styles.ledgerPills}>
                  <span>19 GitHub Repositories</span>
                  <span>Apache Kafka</span>
                  <span>Redis Streams</span>
                  <span>Python &amp; Go</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: Cinematic Contact Finale ──────────────────────────────── */}
      <section className={styles.finaleSection} aria-labelledby="finale-heading">
        <div className={styles.sectionInner}>
          <div className={styles.finaleCard}>
            <div className={styles.finaleTop}>
              <span className={styles.finaleOverline}>CONTACT // CO-ENGINEER ↘</span>
              <h2 id="finale-heading" className={styles.finaleTitle}>
                Let&apos;s engineer something extraordinary.
              </h2>
              <p className={styles.finaleDesc}>
                Actively interviewing for AI/ML Engineer, Applied AI, and Data Platform
                roles (Class of 2027). Response turnaround is typically within 1 business
                day.
              </p>
            </div>

            <div className={styles.finaleActions}>
              <div className={styles.emailRow}>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className={styles.emailPill}
                  data-cursor="EMAIL ✉"
                >
                  <span>{SITE_CONFIG.email}</span>
                  <ArrowRight size={18} />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className={styles.copyPill}
                  aria-label="Copy official email to clipboard"
                  data-cursor="COPY"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email'}</span>
                </button>
              </div>

              <div className={styles.socialBar}>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  data-cursor="GITHUB ↗"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <span className={styles.socialDivider}>·</span>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  data-cursor="LINKEDIN ↗"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
                <span className={styles.socialDivider}>·</span>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  data-cursor="RESUME ↓"
                >
                  <Download size={15} />
                  <span>Official Résumé</span>
                </a>
                <span className={styles.socialDivider}>·</span>
                <Link href="/contact" className={styles.socialBtn} data-cursor="FORM">
                  <span>Send Direct Message →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
