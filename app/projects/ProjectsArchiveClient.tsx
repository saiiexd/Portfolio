'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Cpu, Layers } from 'lucide-react'
import Badge from '@/components/atoms/Badge/Badge'
import ArchitectureFlow from '@/components/molecules/ArchitectureFlow/ArchitectureFlow'
import ProjectDiagram from '@/components/diagrams/ProjectDiagram'
import { PROJECT_CATEGORIES } from '@/lib/constants'
import { categoryLabel } from '@/lib/utils'
import type { ProjectData } from '@/types'
import styles from './projects.module.scss'

interface Props {
  initialProjects: ProjectData[]
}

export default function ProjectsArchiveClient({ initialProjects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return initialProjects
    return initialProjects.filter((p) => p.category === selectedCategory)
  }, [initialProjects, selectedCategory])

  return (
    <div className={styles.archiveWrapper}>
      {/* ── Category Filter Tabs ── */}
      <div
        className={styles.filterBar}
        role="tablist"
        aria-label="Filter systems by technical domain"
      >
        {PROJECT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value
          const count =
            cat.value === 'all'
              ? initialProjects.length
              : initialProjects.filter((p) => p.category === cat.value).length

          return (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`${styles.filterBtn} ${isSelected ? styles.filterActive : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
              data-cursor="SELECT"
            >
              <span>{cat.label}</span>
              <span className={styles.countBadge}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* ── Editorial Project Flow ── */}
      <div className={styles.editorialStream}>
        {filteredProjects.map((project, idx) => {
          // Flagship presentation for index 0 and index 3 in 'all' view, or the first item when filtered
          const isFlagship =
            (selectedCategory === 'all' && (idx === 0 || idx === 3 || idx === 8)) ||
            (selectedCategory !== 'all' && idx === 0)

          if (isFlagship) {
            return (
              <article key={project.slug} className={styles.flagshipFeature}>
                <div className={styles.flagshipContent}>
                  <div className={styles.flagshipHeader}>
                    <div className={styles.flagshipMeta}>
                      <span className={styles.indexWatermark}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <Badge variant="category">{categoryLabel(project.category)}</Badge>
                      <span className={styles.flagshipBadge}>FLAGSHIP ARCHITECTURE</span>
                    </div>
                    <span className={styles.year}>{project.year}</span>
                  </div>

                  <h2 className={styles.flagshipTitle}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.titleLink}
                      data-cursor="CASE STUDY"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className={styles.flagshipDesc}>{project.shortDescription}</p>

                  {/* Verified Tech Pills */}
                  <div className={styles.tags}>
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className={styles.flagshipActions}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.primaryAction}
                      data-cursor="CASE STUDY"
                      aria-label={`Explore ${project.title} case study`}
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryAction}
                        data-cursor="GITHUB ↗"
                        aria-label={`Open ${project.title} repository on GitHub`}
                      >
                        <span>GitHub Source</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Live Interactive Architectural Visual Stage */}
                <div className={styles.flagshipVisual}>
                  <div className={styles.visualStageWrapper}>
                    <ProjectDiagram
                      componentName={project.diagramComponent}
                      slug={project.slug}
                      mode="preview"
                    />
                  </div>
                </div>
              </article>
            )
          }

          // Asymmetric Standard / Paired Card Presentation
          return (
            <article key={project.slug} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardTopLeft}>
                  <span className={styles.indexNum}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Badge variant="category">{categoryLabel(project.category)}</Badge>
                </div>
                <span className={styles.year}>{project.year}</span>
              </div>

              <div className={styles.cardHead}>
                <h2 className={styles.title}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.titleLink}
                    data-cursor="CASE STUDY"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className={styles.description}>{project.shortDescription}</p>
              </div>

              {/* Architecture Pipeline Flow or Micro Diagram */}
              {project.pipelineSteps && project.pipelineSteps.length > 0 && (
                <div className={styles.visualBox}>
                  <div className={styles.pipelineHeader}>
                    <Layers size={11} className={styles.flowIcon} />
                    <span>SYSTEM EXECUTION FLOW</span>
                  </div>
                  <ArchitectureFlow steps={project.pipelineSteps} />
                </div>
              )}

              <div className={styles.cardBottom}>
                <div className={styles.tags}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="tech">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={styles.moreTechBadge}>
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className={styles.actionsGroup}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.viewLink}
                    data-cursor="CASE STUDY"
                    aria-label={`View ${project.title} case study`}
                  >
                    <span>Case Study</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLink}
                      data-cursor="GITHUB ↗"
                      aria-label={`Open ${project.title} GitHub repository`}
                    >
                      <span>GitHub</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
