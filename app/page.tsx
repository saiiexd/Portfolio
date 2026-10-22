'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/Icon/BrandIcons'
import Badge from '@/components/atoms/Badge/Badge'
import Button from '@/components/atoms/Button/Button'
import { getFeaturedProjects } from '@/content/projects'
import { SITE_CONFIG, RESUME_PATH } from '@/lib/constants'
import { categoryLabel } from '@/lib/utils'
import ProjectDiagram from '@/components/diagrams/ProjectDiagram'
import LivingNetworkCanvas from '@/components/molecules/LivingNetwork/LivingNetworkCanvas'
import LivingNetworkDossier from '@/components/molecules/LivingNetwork/LivingNetworkDossier'
import type { ProjectData } from '@/types'
import styles from './HeroSection.module.scss'

export default function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

  // Exactly 3 Flagship Engineering Projects across different disciplines
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <div className={styles.homeContainer}>
      {/* ── 01: Hero Section ────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Engineering Identity">
        <div className={styles.sectionInner}>
          <div className={styles.heroGrid}>
            {/* Left: Oversized Typography & Introduction */}
            <div className={styles.heroMain}>
              <div className={styles.nameOverline}>
                <span>SAI VENKAT</span>
                <span className={styles.subTag}>SYSTEMS &amp; AI ENGINEER</span>
              </div>

              <h1 className={styles.heroHeadline}>
                <span className={styles.headlineLine}>BUILD THINGS</span>
                <span className={styles.headlineLine}>THAT WORK.</span>
              </h1>

              <p className={styles.heroPositioning}>
                AI systems. Distributed platforms. Real-time streaming infrastructure.
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
                  Explore Projects ↘
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

            {/* Right: Integrated Monochrome Portrait */}
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
                  <span className={styles.captionTitle}>SAI VENKAT // 2027</span>
                  <span className={styles.captionRole}>HYDERABAD, INDIA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centerpiece: Interactive Living Network Stage */}
          <div className={styles.livingNetworkStage}>
            <div className={styles.stageCanvasBox}>
              <LivingNetworkCanvas
                onSelectProject={(p) => {
                  setSelectedProject(p)
                  setSelectedDomain(null)
                }}
                onSelectDomain={(d) => {
                  setSelectedDomain(d)
                  setSelectedProject(null)
                }}
                selectedProjectId={selectedProject?.slug}
                selectedDomainId={selectedDomain}
                mode="hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Living Network Dossier Modal */}
      <LivingNetworkDossier
        project={selectedProject}
        domainCategory={selectedDomain}
        onClose={() => {
          setSelectedProject(null)
          setSelectedDomain(null)
        }}
      />

      {/* ── 02: Selected Work (3 Featured Projects) ─────────────────────── */}
      <section
        id="selected-work"
        className={styles.workSection}
        aria-labelledby="work-heading"
      >
        <div className={styles.sectionInner}>
          <div className={styles.workHeader}>
            <div className={styles.workHeaderLeft}>
              <span className={styles.workOverline}>Selected Work ↘</span>
              <h2 id="work-heading" className={styles.workTitle}>
                Featured Engineering Systems
              </h2>
            </div>
            <div className={styles.workHeaderRight}>
              <p className={styles.workIntro}>
                Three verified platforms spanning deterministic LLM evaluation,
                distributed queue concurrency, and real-time Kafka event streaming.
              </p>
              <Link
                href="/projects"
                className={styles.archiveHeaderLink}
                data-cursor="ALL 12"
              >
                <span>Complete Archive (12 Systems) →</span>
              </Link>
            </div>
          </div>

          <div className={styles.workExhibitionList}>
            {featuredProjects.map((project, idx) => (
              <article key={project.slug} className={styles.exhibitionRow}>
                {/* Meta Column */}
                <div className={styles.exhibitionMetaCol}>
                  <div className={styles.rowIndexWrap}>
                    <span className={styles.rowIndex}>0{idx + 1} ↘</span>
                    <Badge variant="category">{categoryLabel(project.category)}</Badge>
                  </div>
                  <span className={styles.rowYear}>{project.year}</span>
                </div>

                {/* Content Column */}
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

                  <div className={styles.exhibitionBottomRow}>
                    <div className={styles.exhibitionTags}>
                      {project.techStack.slice(0, 4).map((tech) => (
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
                        <span>Explore Case Study</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Visual Preview Column */}
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
              <span className={styles.archiveBannerOverline}>COMPLETE CATALOG</span>
              <h3 className={styles.archiveBannerTitle}>
                Explore All 12 Verified Systems &amp; Architectures
              </h3>
              <p className={styles.archiveBannerSub}>
                Every project is verified against real source code, schema migrations, and
                test suites.
              </p>
            </div>
            <Link
              href="/projects"
              className={styles.archiveBannerBtn}
              data-cursor="ARCHIVE ↗"
            >
              <span>Access Systems Archive (12)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 03: Engineering Focus (Compact 3 Domains) ───────────────────── */}
      <section className={styles.focusSection} aria-labelledby="focus-heading">
        <div className={styles.sectionInner}>
          <div className={styles.focusHeader}>
            <span className={styles.focusOverline}>Domains // Focus ↘</span>
            <h2 id="focus-heading" className={styles.focusTitle}>
              Engineering Focus
            </h2>
            <p className={styles.focusSubtext}>
              Core technical disciplines explored through authentic software
              implementations.
            </p>
          </div>

          <div className={styles.focusGrid}>
            {/* Domain 1: AI & GenAI */}
            <div className={styles.focusCard}>
              <span className={styles.focusIndex}>01 // DOMAIN</span>
              <h3 className={styles.focusCardTitle}>AI &amp; GenAI</h3>
              <p className={styles.focusCardDesc}>
                Deterministic evaluation harnesses measuring exact match, normalized
                semantic similarity, model-based arbitration, and multi-agent debate
                workflows.
              </p>
              <div className={styles.focusCardTags}>
                <span>Python 3.13</span>
                <span>FastAPI</span>
                <span>LangGraph</span>
                <span>pgvector</span>
              </div>
              <Link
                href="/projects?category=llm-genai"
                className={styles.focusCardLink}
                data-cursor="EXPLORE"
              >
                <span>Explore AI Systems (4)</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Domain 2: Distributed Systems */}
            <div className={styles.focusCard}>
              <span className={styles.focusIndex}>02 // DOMAIN</span>
              <h3 className={styles.focusCardTitle}>Distributed Systems</h3>
              <p className={styles.focusCardDesc}>
                Fault-tolerant asynchronous execution engines, Redis Streams consumer
                groups with Go worker pools, and topological DAG scheduling.
              </p>
              <div className={styles.focusCardTags}>
                <span>Go 1.22</span>
                <span>Redis Streams</span>
                <span>SQLite</span>
                <span>Docker</span>
              </div>
              <Link
                href="/projects?category=backend-systems"
                className={styles.focusCardLink}
                data-cursor="EXPLORE"
              >
                <span>Explore Distributed Systems (3)</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Domain 3: Data Engineering & ML */}
            <div className={styles.focusCard}>
              <span className={styles.focusIndex}>03 // DOMAIN</span>
              <h3 className={styles.focusCardTitle}>Data &amp; Machine Learning</h3>
              <p className={styles.focusCardDesc}>
                Real-time event streaming with Apache Kafka, PySpark Structured Streaming
                window aggregations, astronomical transient detection, and relational
                warehousing.
              </p>
              <div className={styles.focusCardTags}>
                <span>Apache Kafka</span>
                <span>PySpark</span>
                <span>PostgreSQL</span>
                <span>LightGBM</span>
              </div>
              <Link
                href="/projects?category=ml-data"
                className={styles.focusCardLink}
                data-cursor="EXPLORE"
              >
                <span>Explore Data &amp; ML Systems (5)</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: Experience & Education ──────────────────────────────────── */}
      <section className={styles.ledgerSection} aria-labelledby="ledger-heading">
        <div className={styles.sectionInner}>
          <div className={styles.ledgerHeader}>
            <span className={styles.ledgerOverline}>Background ↘</span>
            <h2 id="ledger-heading" className={styles.ledgerTitle}>
              Education &amp; Experience
            </h2>
          </div>

          <div className={styles.ledgerTable}>
            {/* Entry 1: Education */}
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
                  Coursework in distributed computing, machine learning, database
                  internals, and large-scale data systems. Cumulative GPA:{' '}
                  <strong>7.46</strong>.
                </p>
              </div>
            </div>

            {/* Entry 2: Open Source Engineering */}
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerTimeCol}>
                <span className={styles.ledgerTime}>2024 — PRESENT</span>
                <span className={styles.ledgerBadge}>OPEN SOURCE ARCHITECTURE</span>
              </div>
              <div className={styles.ledgerMainCol}>
                <h3 className={styles.ledgerOrg}>
                  Systems Architecture &amp; Engineering
                </h3>
                <p className={styles.ledgerDegree}>
                  AI/ML Engineer · Distributed Systems · Data Platform Engineer
                </p>
                <p className={styles.ledgerDetail}>
                  Architected, benchmarked, and maintained 12 public codebases spanning
                  deterministic LLM evaluation, Redis Streams worker queues, topological
                  DAG workflow schedulers, and Kafka event pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: Contact Panel ───────────────────────────────────────────── */}
      <section className={styles.finaleSection} aria-labelledby="finale-heading">
        <div className={styles.sectionInner}>
          <div className={styles.finaleCard}>
            <div className={styles.finaleTop}>
              <span className={styles.finaleOverline}>CONTACT ↘</span>
              <h2 id="finale-heading" className={styles.finaleTitle}>
                Let&apos;s engineer something extraordinary.
              </h2>
              <p className={styles.finaleDesc}>
                Open for 2027 software engineering, AI systems, and backend infrastructure
                roles.
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
