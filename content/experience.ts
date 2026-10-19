// =============================================================================
// EXPERIENCE & EDUCATION — Content data
//
// ⚠️  IMPORTANT: All experience entries are PROVISIONAL.
// Emplay/Futurense entry is OMITTED pending confidentiality confirmation.
// Do not add it until explicitly permitted.
// =============================================================================
import type { ExperienceItem, EducationItem } from '@/types'

// ── Experience ────────────────────────────────────────────────────────────────

export const EXPERIENCE: ExperienceItem[] = [
  // TODO: Add verified experience entries here.
  // The Emplay/Futurense internship is blocked pending confidentiality check.
  // Only add entries for which you can verify the role, dates, company name,
  // and individual contributions without NDA or publication restrictions.
  //
  // Example structure (do not publish until verified):
  // {
  //   id: 'emplay-futurense',
  //   company: 'Emplay / Futurense',        // ← BLOCKED — confidentiality unconfirmed
  //   companyUrl: undefined,
  //   role: '[Role title]',
  //   type: 'internship',
  //   startDate: 'YYYY-MM',
  //   endDate: 'YYYY-MM',
  //   location: '[Location]',
  //   contributions: ['[Verified bullet 1]', '[Verified bullet 2]'],
  //   techStack: [],
  //   confidential: true,
  // },
]

// ── Education ─────────────────────────────────────────────────────────────────

export const EDUCATION: EducationItem[] = [
  {
    id: 'lpu',
    institution: 'Lovely Professional University',
    institutionUrl: 'https://www.lpu.in',
    degree: 'B.Tech',
    field: 'Computer Science and Engineering',
    specialisation: 'AI and Data Engineering',
    startDate: '2023-08',
    endDate: '2027-05', // Expected graduation 2027
    location: 'Phagwara, Punjab, India',
    relevantCoursework: [
      // [UNVERIFIED] — Add actual relevant courses
      'Machine Learning',
      'Deep Learning',
      'Data Engineering',
      'Distributed Systems',
      'Database Management Systems',
    ],
    cgpa: '7.46',
  },
]
