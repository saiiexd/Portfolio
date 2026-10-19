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
import styles from './HeroSection.module.scss'

export default function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  // 3 Strongest Verified Projects on the Homepage
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <div className={styles.homeContainer}>
      {/* ── 01: Hero Section ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.sectionInner}>
          <div className={styles.heroInner}>
            {/* Left: Oversized Typography & Readable Intro */}
            <div className={styles.heroContent}>
              <h1 className={styles.heroHeadline}>Build things that work.</h1>

              <p className={styles.heroPositioning}>
                AI systems. Data engineering. Backend infrastructure.
              </p>

              <p className={styles.heroBio}>
                Computer science engineering student specializing in AI and Data
                Engineering at Lovely Professional University (Class of 2027). I build
                deterministic evaluation harnesses for language models, fault-tolerant
                distributed systems, and real-time streaming pipelines.
              </p>

              {/* Only Two Primary Actions */}
              <div className={styles.heroCtas}>
                <Button
                  as="a"
                  href="#selected-projects"
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight size={18} />}
                >
                  View Projects
                </Button>
                <Button
                  as="a"
                  href={RESUME_PATH}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  iconLeft={<Download size={16} />}
                >
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Right: Black-and-White Portrait */}
            <div className={styles.portraitWrapper}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/sai-venkat-portrait.png"
                  alt="Sai Venkat — AI/ML and Data Engineer monochrome portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 440px"
                  className={styles.portraitImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: Selected Projects (3 Strongest Projects) ────────────────── */}
      <section
        id="selected-projects"
        className={styles.projectsSection}
        aria-labelledby="projects-heading"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderContent}>
              <span className={styles.sectionOverline}>Selected Work</span>
              <h2 id="projects-heading" className={styles.sectionTitle}>
                Featured Systems
              </h2>
              <p className={styles.sectionSubtext}>
                Three flagship implementations engineered for evaluation rigor,
                distributed concurrency, and streaming throughput.
              </p>
            </div>
            <Link href="/projects" className={styles.headerArchiveLink}>
              View All 12 Projects
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.projectsList}>
            {featuredProjects.map((project, i) => (
              <article key={project.slug} className={styles.projectCard}>
                <div className={styles.projectCardTop}>
                  <div className={styles.projectCardIndexGroup}>
                    <span className={styles.projectCardIndex}>0{i + 1}</span>
                    <Badge variant="category">{categoryLabel(project.category)}</Badge>
                  </div>
                  <span className={styles.projectCardYear}>{project.year}</span>
                </div>

                <div className={styles.projectCardContent}>
                  <div className={styles.projectCardInfo}>
                    <h3 className={styles.projectCardTitle}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.projectCardTitleLink}
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className={styles.projectCardDesc}>{project.shortDescription}</p>

                    <div className={styles.projectCardTags}>
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="tech">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className={styles.projectCardActions}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.projectCardBtn}
                        aria-label={`Read case study for ${project.title}`}
                      >
                        <span>Case Study</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectCardSecondaryLink}
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <span>GitHub</span>
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={styles.projectCardVisual}>
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

          <div className={styles.archiveCtaRow}>
            <Link href="/projects" className={styles.archiveFullBtn}>
              Browse All 12 Repositories in the Archive
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 03: Technical Expertise (Merged Focus Areas & Principles) ───── */}
      <section className={styles.expertiseSection} aria-labelledby="expertise-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderContent}>
            <span className={styles.sectionOverline}>Capabilities</span>
            <h2 id="expertise-heading" className={styles.sectionTitle}>
              Technical Expertise
            </h2>
            <p className={styles.sectionSubtext}>
              Core disciplines where I build systems, run empirical benchmarks, and write
              production code.
            </p>
          </div>

          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseCol}>
              <span className={styles.expertiseColIndex}>01</span>
              <h3 className={styles.expertiseColTitle}>AI &amp; Evaluation Systems</h3>
              <p className={styles.expertiseColDesc}>
                Deterministic evaluation harnesses using the RAG Triad framework
                (faithfulness, relevance, groundedness). Benchmarking hallucination
                scoring, prompt variance, and retrieval regression testing in CI/CD.
              </p>
              <div className={styles.expertiseTags}>
                <span className={styles.expertiseTag}>RAGAS</span>
                <span className={styles.expertiseTag}>LangChain</span>
                <span className={styles.expertiseTag}>HuggingFace</span>
                <span className={styles.expertiseTag}>Vector Stores</span>
              </div>
            </div>

            <div className={styles.expertiseCol}>
              <span className={styles.expertiseColIndex}>02</span>
              <h3 className={styles.expertiseColTitle}>
                Distributed Backend &amp; Concurrency
              </h3>
              <p className={styles.expertiseColDesc}>
                Fault-tolerant asynchronous job processing using Redis Streams and Celery.
                Implementing finite-state machines, exponential backoff retries, and
                dead-letter quarantine vaults with idempotent execution.
              </p>
              <div className={styles.expertiseTags}>
                <span className={styles.expertiseTag}>FastAPI</span>
                <span className={styles.expertiseTag}>Redis Streams</span>
                <span className={styles.expertiseTag}>PostgreSQL</span>
                <span className={styles.expertiseTag}>Docker</span>
              </div>
            </div>

            <div className={styles.expertiseCol}>
              <span className={styles.expertiseColIndex}>03</span>
              <h3 className={styles.expertiseColTitle}>
                Data Engineering &amp; Streaming
              </h3>
              <p className={styles.expertiseColDesc}>
                Sliding-window feature engineering, low-latency real-time inference
                pipelines, and dimensional data modeling with dbt and SQL for cohort and
                behavioral decision intelligence.
              </p>
              <div className={styles.expertiseTags}>
                <span className={styles.expertiseTag}>Scikit-learn</span>
                <span className={styles.expertiseTag}>dbt core</span>
                <span className={styles.expertiseTag}>SQL</span>
                <span className={styles.expertiseTag}>Pandas</span>
              </div>
            </div>
          </div>

          <div className={styles.principlesBar}>
            <span className={styles.principlesLabel}>Engineering Philosophy</span>
            <p className={styles.principlesText}>
              Systems over silos. Prioritizing reproducible evaluation harnesses,
              deterministic benchmarking, and fault-tolerant distributed infrastructure
              over unverified black-box claims.
            </p>
          </div>
        </div>
      </section>

      {/* ── 04: Experience & Education Timeline ─────────────────────────── */}
      <section className={styles.timelineSection} aria-labelledby="timeline-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderContent}>
            <span className={styles.sectionOverline}>Background</span>
            <h2 id="timeline-heading" className={styles.sectionTitle}>
              Education &amp; Experience
            </h2>
            <p className={styles.sectionSubtext}>
              Academic trajectory and technical systems engineering.
            </p>
          </div>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineCard}>
              <span className={styles.timelineDate}>2023 — 2027 (Expected)</span>
              <h3 className={styles.timelineTitle}>Lovely Professional University</h3>
              <p className={styles.timelineSubtitle}>
                B.Tech in Computer Science and Engineering (AI &amp; Data Engineering)
              </p>
              <p className={styles.timelineBody}>
                Specialization in artificial intelligence algorithms, distributed systems,
                and large-scale data engineering. Cumulative GPA: 7.46.
              </p>
              <div className={styles.timelineMetaPills}>
                <span className={styles.timelinePill}>Phagwara, Punjab</span>
                <span className={styles.timelinePill}>
                  Data Structures &amp; Algorithms
                </span>
                <span className={styles.timelinePill}>Distributed Systems</span>
                <span className={styles.timelinePill}>Machine Learning</span>
              </div>
            </div>

            <div className={styles.timelineCard}>
              <span className={styles.timelineDate}>2024 — Present</span>
              <h3 className={styles.timelineTitle}>
                Systems Architecture &amp; Projects
              </h3>
              <p className={styles.timelineSubtitle}>
                AI/ML Engineer · Applied AI / GenAI · Data Platform Engineer
              </p>
              <p className={styles.timelineBody}>
                Independent design and implementation of distributed architectures,
                deterministic LLM evaluation harnesses, and event streaming pipelines with
                complete documentation and open-source repositories.
              </p>
              <div className={styles.timelineMetaPills}>
                <span className={styles.timelinePill}>19 Repositories</span>
                <span className={styles.timelinePill}>Open-Source Code</span>
                <span className={styles.timelinePill}>Available for Roles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: Minimal Contact Section ─────────────────────────────────── */}
      <section className={styles.contactSection} aria-labelledby="contact-heading">
        <div className={styles.sectionInner}>
          <div className={styles.contactBox}>
            <div className={styles.contactContent}>
              <h2 id="contact-heading" className={styles.contactTitle}>
                Let&apos;s build things that work.
              </h2>
              <p className={styles.contactSub}>
                Available for AI/ML Engineer, Applied AI / GenAI, and Data Platform roles
                (Class of 2027). Response turnaround is typically within 1 business day.
              </p>
            </div>

            <div className={styles.contactActionsGroup}>
              <a href={`mailto:${SITE_CONFIG.email}`} className={styles.emailDirectBtn}>
                <span>{SITE_CONFIG.email}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <button
                type="button"
                className={styles.copyEmailSnippet}
                onClick={copyEmail}
                aria-label="Copy official email to clipboard"
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Email Copied' : 'Click to copy address'}</span>
              </button>

              <div className={styles.socialRow}>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialRowLink}
                  aria-label="GitHub profile"
                >
                  <GithubIcon size={14} aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <span>·</span>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialRowLink}
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon size={14} aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <span>·</span>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialRowLink}
                  aria-label="Download Résumé"
                >
                  <Download size={14} aria-hidden="true" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
