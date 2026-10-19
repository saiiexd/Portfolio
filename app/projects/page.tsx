import type { Metadata } from 'next'
import { getAllProjects } from '@/content/projects'
import ProjectsArchiveClient from './ProjectsArchiveClient'
import styles from './projects.module.scss'

export const metadata: Metadata = {
  title: 'Systems & Architecture Archive',
  description:
    'Comprehensive engineering archive of 12 production architectures, distributed systems, streaming engines, and GenAI evaluation platforms authored by Sai Venkat.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Editorial Telemetry Ribbon */}
        <div className={styles.telemetryRibbon}>
          <div className={styles.telemetryLeft}>
            <span className={styles.pulseDot} />
            <span className={styles.telemetryTag}>REPERTORY INDEX // 12 SYSTEMS</span>
          </div>
          <div className={styles.telemetryRight}>
            <span className={styles.telemetryItem}>STATUS: VERIFIED CODEBASES</span>
            <span className={styles.telemetryDivider}>|</span>
            <span className={styles.telemetryItem}>SAI VENKAT · 2024</span>
          </div>
        </div>

        {/* Editorial Header */}
        <header className={styles.header}>
          <p className={styles.overline}>ENGINEERING ARCHIVE</p>
          <h1 className={styles.heading}>
            SYSTEMS &amp;
            <br />
            ARCHITECTURE.
          </h1>
          <p className={styles.subtext}>
            Systematic index of 12 verified software architectures, distributed event
            pipelines, evaluation frameworks, and analytical platforms. Every system
            documented corresponds to an authentic codebase with verified algorithms,
            schemas, and tests.
          </p>
        </header>

        {/* Filterable Editorial Archive */}
        <ProjectsArchiveClient initialProjects={projects} />
      </div>
    </div>
  )
}
