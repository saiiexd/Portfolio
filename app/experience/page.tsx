import type { Metadata } from 'next'
import Link from 'next/link'
import { EDUCATION, EXPERIENCE } from '@/content/experience'
import { formatDateRange, categoryLabel } from '@/lib/utils'
import Badge from '@/components/atoms/Badge/Badge'
import styles from './experience.module.scss'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Experience and education history of Sai Venkat — AI/ML and Data Engineering.',
}

export default function ExperiencePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.overline}>Background</p>
          <h1 className={styles.heading}>Experience</h1>
        </header>

        {/* Experience section */}
        {EXPERIENCE.length > 0 ? (
          <section aria-labelledby="work-heading">
            <h2 id="work-heading" className={styles.sectionTitle}>
              Work
            </h2>
            <div className={styles.timeline}>
              {EXPERIENCE.map((item) => (
                <div key={item.id} className={styles.entry}>
                  <div className={styles.entryDate}>
                    <span className={styles.dateRange}>
                      {formatDateRange(item.startDate, item.endDate)}
                    </span>
                    <span className={styles.entryType}>{item.type}</span>
                  </div>
                  <div className={styles.entryContent}>
                    <h3 className={styles.entryRole}>{item.role}</h3>
                    <p className={styles.entryCompany}>
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                      {' · '}
                      {item.location}
                    </p>
                    {!item.confidential && (
                      <ul className={styles.contributions}>
                        {item.contributions.map((c, i) => (
                          <li key={i} className={styles.contribution}>
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className={styles.techStack}>
                      {item.techStack.map((tech) => (
                        <Badge key={tech} variant="tech">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section aria-labelledby="work-heading">
            <h2 id="work-heading" className={styles.sectionTitle}>
              Work
            </h2>
            <p className={styles.emptyNote}>
              Work experience entries will be added after confidentiality and content
              verification is complete. See the <Link href="/about">About page</Link> for
              background.
            </p>
          </section>
        )}

        {/* Education section */}
        <section aria-labelledby="education-heading" className={styles.educationSection}>
          <h2 id="education-heading" className={styles.sectionTitle}>
            Education
          </h2>
          <div className={styles.timeline}>
            {EDUCATION.map((item) => (
              <div key={item.id} className={styles.entry}>
                <div className={styles.entryDate}>
                  <span className={styles.dateRange}>
                    {formatDateRange(item.startDate, item.endDate)}
                  </span>
                </div>
                <div className={styles.entryContent}>
                  <h3 className={styles.entryRole}>
                    {item.degree} in {item.field}
                  </h3>
                  {item.specialisation && (
                    <p className={styles.specialisation}>
                      Specialisation: {item.specialisation}
                    </p>
                  )}
                  <p className={styles.entryCompany}>
                    {item.institutionUrl ? (
                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.institution}
                      </a>
                    ) : (
                      item.institution
                    )}
                    {' · '}
                    {item.location}
                  </p>
                  {item.cgpa && <p className={styles.cgpa}>CGPA: {item.cgpa}</p>}
                  {item.relevantCoursework && (
                    <div className={styles.coursework}>
                      <p className={styles.courseworkLabel}>Relevant coursework:</p>
                      <div className={styles.techStack}>
                        {item.relevantCoursework.map((course) => (
                          <Badge key={course} variant="tech">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
