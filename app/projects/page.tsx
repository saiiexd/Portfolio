import type { Metadata } from 'next'
import { getAllProjects } from '@/content/projects'
import ProjectsArchiveClient from './ProjectsArchiveClient'
import styles from './projects.module.scss'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Systems built, evaluated and shipped by Sai Venkat — LLM evaluation pipelines, distributed task queues, real-time ML inference, and analytical systems.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <p className={styles.overline}>Engineering Portfolio</p>
          <h1 className={styles.heading}>Systems &amp; Architecture</h1>
          <p className={styles.subtext}>
            Comprehensive technical archive of production and research architectures,
            evaluation frameworks, and streaming pipelines.
          </p>
        </header>

        {/* Filterable Archive with Live Interactive Previews */}
        <ProjectsArchiveClient initialProjects={projects} />
      </div>
    </div>
  )
}
