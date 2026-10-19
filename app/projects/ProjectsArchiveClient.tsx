'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Badge from '@/components/atoms/Badge/Badge'
import ArchitectureFlow from '@/components/molecules/ArchitectureFlow/ArchitectureFlow'
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
        aria-label="Filter projects by technical domain"
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
            >
              <span>{cat.label}</span>
              <span className={styles.countBadge}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* ── Editorial Project Grid ── */}
      <div className={styles.grid}>
        {filteredProjects.map((project, idx) => (
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
                <Link href={`/projects/${project.slug}`} className={styles.titleLink}>
                  {project.title}
                </Link>
              </h2>
              <p className={styles.description}>{project.shortDescription}</p>
            </div>

            {/* Architecture Pipeline Flow */}
            {project.pipelineSteps && project.pipelineSteps.length > 0 && (
              <div className={styles.visualBox}>
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
              </div>

              <div className={styles.actionsGroup}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.viewLink}
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
                    aria-label={`Open ${project.title} GitHub repository (opens in new tab)`}
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
