// =============================================================================
// TYPES — Shared TypeScript interfaces and types
// All content data shapes are defined here, separate from presentation.
// =============================================================================

// ── Site & Navigation ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  author: string
  email: string
  github: string
  linkedin: string
  twitter?: string
  ogImage: string
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type ProjectCategory = 'llm-genai' | 'backend-systems' | 'ml-data' | 'analytics'

export type ProjectStatus =
  | 'prototype' // Local working implementation, not production
  | 'in-progress' // Actively being developed
  | 'complete' // Implementation finished, not deployed
  | 'deployed' // Publicly accessible

export interface TechDecision {
  decision: string
  rationale: string
}

export interface ProjectData {
  slug: string
  title: string
  shortDescription: string // 1–2 sentence summary for cards
  category: ProjectCategory
  year: string
  status: ProjectStatus
  techStack: string[]
  featured: boolean
  problem: string // Problem statement
  contribution: string // Verified scope of personal contribution
  architectureDescription: string // Text description of architecture/approach
  keyDecisions: TechDecision[] // 3–5 engineering decisions with rationale
  results: string // Evidence-backed outcomes (verified only)
  limitations: string // Honest limitations section
  repoUrl?: string // GitHub URL — omit if private/unconfirmed
  demoUrl?: string // Live demo URL — omit if none
  diagramComponent?: string // Name of diagram component to render
  coverImage?: string // Path to cover image in /public/images/projects/
  pipelineSteps?: string[] // Key sequential pipeline stages for architectural summary
}

// ── Experience ────────────────────────────────────────────────────────────────

export type ExperienceType = 'internship' | 'employment' | 'freelance' | 'research'

export interface ExperienceItem {
  id: string
  company: string
  companyUrl?: string
  role: string
  type: ExperienceType
  startDate: string // YYYY-MM
  endDate: string | 'present' // YYYY-MM or 'present'
  location: string
  contributions: string[] // Verified bullet points — no fabricated metrics
  techStack: string[]
  confidential: boolean // If true, details are restricted
}

// ── Education ─────────────────────────────────────────────────────────────────

export interface EducationItem {
  id: string
  institution: string
  institutionUrl?: string
  degree: string
  field: string
  specialisation?: string
  startDate: string // YYYY-MM
  endDate: string // YYYY-MM
  location: string
  relevantCoursework?: string[]
  cgpa?: string // Only include if accurate and you're comfortable sharing
}

// ── Technical Focus Areas ─────────────────────────────────────────────────────

export interface TechFocusArea {
  id: string
  label: string
  description: string
  tools: string[]
}

// ── Contact Form ──────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  botField?: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
