import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, AlertTriangle } from 'lucide-react'
import { GithubIcon } from '@/components/atoms/Icon/BrandIcons'
import { getProjectBySlug, getAllSlugs } from '@/content/projects'
import { categoryLabel, formatDate } from '@/lib/utils'
import Badge from '@/components/atoms/Badge/Badge'
import ProjectDiagram from '@/components/diagrams/ProjectDiagram'
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
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Sai Venkat`,
      description: project.shortDescription,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const hasUnverifiedContent =
    project.problem.startsWith('[UNVERIFIED]') ||
    project.contribution.startsWith('[UNVERIFIED]')

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        {/* Back link */}
        <Link href="/projects" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          All Projects
        </Link>

        {/* Unverified content warning (dev/staging only) */}
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

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <Badge variant="category">{categoryLabel(project.category)}</Badge>
            <span className={styles.year}>{project.year}</span>
            <span className={styles.status}>{project.status}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.lead}>{project.shortDescription}</p>

          {/* Tech stack */}
          <div className={styles.techStack}>
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className={styles.links}>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <GithubIcon size={16} aria-hidden="true" />
                View repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
              </a>
            )}
          </div>
        </header>

        {/* Architecture & Engineering Diagram */}
        <section
          className={styles.diagramSection}
          aria-label="System architecture diagram"
        >
          <ProjectDiagram
            componentName={project.diagramComponent}
            slug={project.slug}
            mode="full"
          />
        </section>

        {/* Case study body */}
        <div className={styles.body}>
          {/* Problem */}
          <section className={styles.section} aria-labelledby="problem-heading">
            <h2 id="problem-heading" className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>01</span>
              The Problem
            </h2>
            <p className={styles.sectionText}>{project.problem}</p>
          </section>

          {/* Contribution */}
          <section className={styles.section} aria-labelledby="contribution-heading">
            <h2 id="contribution-heading" className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>02</span>
              My Contribution
            </h2>
            <p className={styles.sectionText}>{project.contribution}</p>
          </section>

          {/* Architecture */}
          <section className={styles.section} aria-labelledby="architecture-heading">
            <h2 id="architecture-heading" className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>03</span>
              Architecture &amp; Approach
            </h2>
            <p className={styles.sectionText}>{project.architectureDescription}</p>
          </section>

          {/* Key Decisions */}
          <section className={styles.section} aria-labelledby="decisions-heading">
            <h2 id="decisions-heading" className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>04</span>
              Key Engineering Decisions
            </h2>
            <div className={styles.decisions}>
              {project.keyDecisions.map((d, i) => (
                <div key={i} className={styles.decision}>
                  <h3 className={styles.decisionTitle}>{d.decision}</h3>
                  <p className={styles.decisionRationale}>{d.rationale}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Results */}
          <section className={styles.section} aria-labelledby="results-heading">
            <h2 id="results-heading" className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>05</span>
              Evidence &amp; Results
            </h2>
            <p className={styles.sectionText}>{project.results}</p>
          </section>

          {/* Limitations */}
          <section className={styles.section} aria-labelledby="limitations-heading">
            <h2 id="limitations-heading" className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>06</span>
              Limitations &amp; Open Questions
            </h2>
            <p className={styles.sectionText}>{project.limitations}</p>
          </section>
        </div>
      </div>
    </article>
  )
}
