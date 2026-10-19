import type { Metadata } from 'next'
import Image from 'next/image'
import styles from './about.module.scss'
import { TECH_FOCUS_AREAS, SITE_CONFIG, RESUME_PATH } from '@/lib/constants'
import Button from '@/components/atoms/Button/Button'
import { Download, ArrowRight, ShieldCheck, Cpu, Database } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/Icon/BrandIcons'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Sai Venkat — AI/ML and Data Engineering student at Lovely Professional University (Class of 2027) specialising in evaluation harnesses, asynchronous worker systems, and data pipelines.',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <p className={styles.overline}>02 / ENGINEERING PROFILE</p>
          <h1 className={styles.heading}>Sai Venkat</h1>
          <p className={styles.subheading}>
            AI/ML &amp; Data Engineer · B.Tech CSE (AI &amp; Data Engineering) · LPU
            (2023–2027)
          </p>
        </header>

        {/* Profile Hero / Monochrome Portrait Integration */}
        <div className={styles.profileHero}>
          <div className={styles.portraitContainer}>
            <div className={styles.portraitFrame}>
              <Image
                src="/images/sai-venkat-portrait.png"
                alt="Sai Venkat monochrome portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 280px"
                className={styles.portraitImg}
              />
            </div>
            <div className={styles.portraitMeta}>
              <span>SAI VENKAT</span>
              <span>CLASS OF 2027</span>
            </div>
          </div>

          <div className={styles.heroSummary}>
            <h2 className={styles.summaryTitle}>
              Building verifiable, fault-tolerant machine intelligence.
            </h2>
            <p className={styles.summaryText}>
              I approach AI and data engineering not as an exercise in black-box
              prompting, but as an empirical discipline requiring reproducible evaluation,
              robust data pipelines, and fault-tolerant distributed infrastructure.
            </p>
            <div className={styles.attributePills}>
              <span className={styles.attrPill}>
                <Cpu size={14} /> Systems Over Silos
              </span>
              <span className={styles.attrPill}>
                <ShieldCheck size={14} /> Evaluation Rigor
              </span>
              <span className={styles.attrPill}>
                <Database size={14} /> Streaming &amp; ETL
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <section className={styles.bio} aria-labelledby="bio-heading">
          <h2 id="bio-heading" className={styles.sectionTitle}>
            Engineering Philosophy &amp; Focus
          </h2>
          <div className={styles.bioGrid}>
            <div className={styles.bioBlock}>
              <h3 className={styles.blockHeading}>01 / Evaluation-First LLM Systems</h3>
              <p className={styles.bioParagraph}>
                Modern language model applications frequently fail in production not
                because of foundation model capability, but because of unmeasured
                hallucinations, retrieval drift, and lack of systematic regression
                testing. My work focuses on building deterministic evaluation harnesses
                using the RAG Triad framework (faithfulness, relevance, and groundedness)
                to benchmark prompt variations and pipeline architectures with empirical
                evidence.
              </p>
            </div>

            <div className={styles.bioBlock}>
              <h3 className={styles.blockHeading}>
                02 / Reliable Distributed Infrastructure
              </h3>
              <p className={styles.bioParagraph}>
                Machine learning workflows require robust background execution. I build
                asynchronous architectures using FastAPI, Redis Streams, and worker pools
                incorporating finite-state machines, exponential backoff retries, and
                dead-letter queues to guarantee at-least-once processing without blocking
                user-facing APIs.
              </p>
            </div>

            <div className={styles.bioBlock}>
              <h3 className={styles.blockHeading}>03 / Academic Specialisation</h3>
              <p className={styles.bioParagraph}>
                Pursuing B.Tech in Computer Science and Engineering with a specialisation
                in Artificial Intelligence and Data Engineering at Lovely Professional
                University, Phagwara, Punjab. Expected graduation: 2027. Cumulative GPA:
                7.46. Target roles include AI/ML Engineer, Applied AI / GenAI Engineer,
                and Data Platform Engineer.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Focus Areas */}
        <section className={styles.areasSection} aria-labelledby="areas-heading">
          <h2 id="areas-heading" className={styles.sectionTitle}>
            Technical Competencies
          </h2>
          <div className={styles.areasGrid}>
            {TECH_FOCUS_AREAS.map((area) => (
              <div key={area.id} className={styles.areaCard}>
                <h3 className={styles.areaLabel}>{area.label}</h3>
                <p className={styles.areaDesc}>{area.description}</p>
                <div className={styles.areaTools}>
                  {area.tools.map((tool) => (
                    <span key={tool} className={styles.tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBanner}>
            <div>
              <h3 className={styles.ctaHeading}>
                Interested in reviewing technical code?
              </h3>
              <p className={styles.ctaText}>
                Explore the project case studies, examine the architecture diagrams, or
                review my curriculum vitae.
              </p>
            </div>
            <div className={styles.ctas}>
              <Button
                as="a"
                href="/projects"
                variant="primary"
                iconRight={<ArrowRight size={16} />}
              >
                View Projects
              </Button>
              <Button
                as="a"
                href={RESUME_PATH}
                variant="secondary"
                target="_blank"
                iconLeft={<Download size={16} />}
              >
                Download CV
              </Button>
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
